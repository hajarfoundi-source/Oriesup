import { onCall, HttpsError } from 'firebase-functions/v2/https';
import { customAlphabet } from 'nanoid';
import { z } from 'zod';
import { db, auth } from '../lib/admin';
import { requireRole, parseInput } from '../lib/httpsError';
import { localeSchema } from '../lib/localeSchema';
import type { InviteTokenDoc, StudentDoc, UserDoc } from '@oriesup/shared-types';

const nanoid = customAlphabet('0123456789abcdefghijklmnopqrstuvwxyz', 12);
const randomPassword = customAlphabet('ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789', 16);

/**
 * The callable-functions client SDK encodes `undefined` as `null` on the wire
 * (see @firebase/functions encode()), which a plain z.string().optional() rejects.
 * Accept null too and normalize it back to undefined.
 */
const optionalString = z
  .string()
  .nullable()
  .optional()
  .transform((v) => v ?? undefined);

const studentInput = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  contactEmail: z
    .string()
    .email()
    .nullable()
    .optional()
    .transform((v) => v ?? undefined),
  contactPhone: optionalString,
  gradeLevel: optionalString,
  classSection: optionalString,
  locale: localeSchema,
});

const schema = z.object({
  students: z.array(studentInput).min(1).max(500),
});

/**
 * School staff (or admin) bulk-registers a student roster. Students created this way
 * don't necessarily have a real email at creation time, so we mint an internal
 * non-deliverable sign-in address and a one-time activation token the school can hand
 * out (printed slip / QR / email if available) via activateStudentAccount.
 */
export const bulkAddStudents = onCall(async (request) => {
  const auth_ = requireRole(request.auth, 'admin', 'school');
  const input = parseInput(schema, request.data);

  const schoolId = auth_.token.role === 'admin' ? (request.data?.schoolId as string | undefined) : (auth_.token.schoolId as string);
  if (!schoolId) throw new HttpsError('invalid-argument', 'schoolId is required for admin-initiated bulk add.');

  const results: Array<{ uid: string; activationToken: string; activationUrl: string }> = [];

  const schoolSnap = await db.collection('schools').doc(schoolId).get();
  if (!schoolSnap.exists) throw new HttpsError('not-found', 'School not found.');
  const slug = schoolSnap.data()!.slug as string;

  for (const s of input.students) {
    const userRecord = await auth.createUser({
      email: s.contactEmail ?? undefined,
      password: randomPassword(),
      displayName: `${s.firstName} ${s.lastName}`,
    });
    await auth.setCustomUserClaims(userRecord.uid, { role: 'student', schoolId });

    const studentDoc: StudentDoc = {
      schoolId,
      firstName: s.firstName,
      lastName: s.lastName,
      contactEmail: s.contactEmail,
      contactPhone: s.contactPhone,
      status: 'pending_activation',
      gradeLevel: s.gradeLevel,
      classSection: s.classSection,
      locale: s.locale,
      createdAt: Date.now(),
    };
    const userDoc: UserDoc = {
      role: 'student',
      schoolId,
      displayName: `${s.firstName} ${s.lastName}`,
      email: s.contactEmail,
      contactPhone: s.contactPhone,
      createdAt: Date.now(),
    };

    const activationToken = nanoid();
    const inviteDoc: InviteTokenDoc = {
      schoolId,
      createdBy: auth_.uid,
      expiresAt: Date.now() + 90 * 24 * 60 * 60 * 1000,
      maxUses: 1,
      usedCount: 0,
      active: true,
      studentUid: userRecord.uid,
      createdAt: Date.now(),
    };

    const batch = db.batch();
    batch.set(db.collection('schools').doc(schoolId).collection('students').doc(userRecord.uid), studentDoc);
    batch.set(db.collection('users').doc(userRecord.uid), userDoc);
    batch.set(db.collection('inviteTokens').doc(activationToken), inviteDoc);
    await batch.commit();

    results.push({ uid: userRecord.uid, activationToken, activationUrl: `/s/${slug}/activate/${activationToken}` });
  }

  return { created: results };
});
