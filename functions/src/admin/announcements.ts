import { onCall, HttpsError } from 'firebase-functions/v2/https';
import { z } from 'zod';
import { db } from '../lib/admin';
import { requireRole, parseInput } from '../lib/httpsError';
import type { AnnouncementDoc } from '@oriesup/shared-types';

const localizedText = z.object({ fr: z.string().min(1), ar: z.string().optional(), en: z.string().optional() });

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

const schema = z.object({
  title: localizedText,
  body: localizedText,
  imageUrl: optionalString,
  linkedServiceId: optionalString,
});

/** Admin-only: platform-wide announcement broadcast to every student's (and school's) dashboard. */
export const createAnnouncement = onCall(async (request) => {
  const auth = requireRole(request.auth, 'admin');
  const input = parseInput(schema, request.data);

  if (input.linkedServiceId) {
    const serviceSnap = await db.collection('services').doc(input.linkedServiceId).get();
    if (!serviceSnap.exists) throw new HttpsError('not-found', 'Linked service not found.');
  }

  const doc: AnnouncementDoc = { ...input, createdBy: auth.uid, createdAt: Date.now(), active: true };
  const ref = await db.collection('announcements').add(doc);
  return { announcementId: ref.id };
});
