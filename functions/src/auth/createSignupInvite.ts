import { onCall, HttpsError } from 'firebase-functions/v2/https';
import { customAlphabet } from 'nanoid';
import { z } from 'zod';
import { db } from '../lib/admin';
import { requireRole, parseInput } from '../lib/httpsError';
import type { InviteTokenDoc } from '@oriesup/shared-types';

const nanoid = customAlphabet('0123456789abcdefghijklmnopqrstuvwxyz', 12);

const schema = z.object({
  expiresInDays: z.number().min(1).max(365).default(30),
  maxUses: z.number().min(1).max(10000).default(1000),
});

/** Called by school staff (or admin) to mint a shareable multi-use student signup link. */
export const createSignupInvite = onCall(async (request) => {
  const auth = requireRole(request.auth, 'admin', 'school');
  const input = parseInput(schema, request.data);

  const schoolId = auth.token.role === 'admin' ? (request.data?.schoolId as string | undefined) : (auth.token.schoolId as string);
  if (!schoolId) throw new HttpsError('invalid-argument', 'schoolId is required for admin-initiated invites.');

  const schoolSnap = await db.collection('schools').doc(schoolId).get();
  if (!schoolSnap.exists) throw new HttpsError('not-found', 'School not found.');

  const token = nanoid();
  const doc: InviteTokenDoc = {
    schoolId,
    createdBy: auth.uid,
    expiresAt: Date.now() + input.expiresInDays * 24 * 60 * 60 * 1000,
    maxUses: input.maxUses,
    usedCount: 0,
    active: true,
    createdAt: Date.now(),
  };
  await db.collection('inviteTokens').doc(token).set(doc);

  const slug = schoolSnap.data()!.slug as string;
  return { token, joinUrl: `/s/${slug}/join/${token}` };
});
