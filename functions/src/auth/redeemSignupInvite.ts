import { onCall, HttpsError } from 'firebase-functions/v2/https';
import { z } from 'zod';
import { db, auth } from '../lib/admin';
import { localeSchema } from '../lib/localeSchema';
import { parseInput } from '../lib/httpsError';
import type { StudentDoc, UserDoc } from '@oriesup/shared-types';

const schema = z.object({
  token: z.string().min(4),
  email: z.string().email(),
  password: z.string().min(8),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  locale: localeSchema,
});

/**
 * Public callable (no auth required — the invite token itself is the credential).
 * Creates the student's Firebase Auth account, sets custom claims, writes Firestore
 * docs, then returns a custom token so the client can sign in with fresh claims
 * immediately (avoids the "claims need a token refresh" gotcha).
 */
export const redeemSignupInvite = onCall(async (request) => {
  const input = parseInput(schema, request.data);

  const inviteRef = db.collection('inviteTokens').doc(input.token);

  const { schoolId } = await db.runTransaction(async (tx) => {
    const inviteSnap = await tx.get(inviteRef);
    if (!inviteSnap.exists) throw new HttpsError('not-found', 'Invalid invite link.');
    const invite = inviteSnap.data()!;
    if (!invite.active) throw new HttpsError('failed-precondition', 'This invite link is no longer active.');
    if (invite.expiresAt < Date.now()) throw new HttpsError('failed-precondition', 'This invite link has expired.');
    if (invite.usedCount >= invite.maxUses) throw new HttpsError('resource-exhausted', 'This invite link has reached its usage limit.');

    const usedCount = invite.usedCount + 1;
    tx.update(inviteRef, {
      usedCount,
      active: usedCount < invite.maxUses,
    });
    return { schoolId: invite.schoolId as string };
  });

  const userRecord = await auth.createUser({
    email: input.email,
    password: input.password,
    displayName: `${input.firstName} ${input.lastName}`,
  });
  await auth.setCustomUserClaims(userRecord.uid, { role: 'student', schoolId });

  const studentDoc: StudentDoc = {
    schoolId,
    firstName: input.firstName,
    lastName: input.lastName,
    contactEmail: input.email,
    status: 'active',
    locale: input.locale,
    createdAt: Date.now(),
  };
  const userDoc: UserDoc = {
    role: 'student',
    schoolId,
    displayName: `${input.firstName} ${input.lastName}`,
    email: input.email,
    createdAt: Date.now(),
  };

  const batch = db.batch();
  batch.set(db.collection('schools').doc(schoolId).collection('students').doc(userRecord.uid), studentDoc);
  batch.set(db.collection('users').doc(userRecord.uid), userDoc);
  await batch.commit();

  const customToken = await auth.createCustomToken(userRecord.uid);
  return { customToken, schoolId };
});
