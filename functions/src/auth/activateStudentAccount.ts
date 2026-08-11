import { onCall, HttpsError } from 'firebase-functions/v2/https';
import { z } from 'zod';
import { db, auth } from '../lib/admin';
import { parseInput } from '../lib/httpsError';

const schema = z.object({
  activationToken: z.string().min(4),
  email: z.string().email(),
  newPassword: z.string().min(8),
});

/**
 * Public callable used by a bulk-added student to claim their account: sets a real
 * email + password on the Auth user created by bulkAddStudents, then flips the
 * student doc to 'active'. Single-use, tied to a specific uid.
 */
export const activateStudentAccount = onCall(async (request) => {
  const input = parseInput(schema, request.data);
  const inviteRef = db.collection('inviteTokens').doc(input.activationToken);

  const { schoolId, studentUid } = await db.runTransaction(async (tx) => {
    const snap = await tx.get(inviteRef);
    if (!snap.exists) throw new HttpsError('not-found', 'Invalid activation link.');
    const invite = snap.data()!;
    if (!invite.active || !invite.studentUid) {
      throw new HttpsError('failed-precondition', 'This activation link is no longer valid.');
    }
    if (invite.expiresAt < Date.now()) throw new HttpsError('failed-precondition', 'This activation link has expired.');
    tx.update(inviteRef, { active: false, usedCount: invite.usedCount + 1 });
    return { schoolId: invite.schoolId as string, studentUid: invite.studentUid as string };
  });

  await auth.updateUser(studentUid, { email: input.email, password: input.newPassword });

  await db.collection('schools').doc(schoolId).collection('students').doc(studentUid).update({
    status: 'active',
    contactEmail: input.email,
  });

  const customToken = await auth.createCustomToken(studentUid);
  return { customToken, schoolId };
});
