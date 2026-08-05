import { onCall, HttpsError } from 'firebase-functions/v2/https';
import { z } from 'zod';
import { db } from '../lib/admin';
import { requireRole } from '../lib/httpsError';
import type { ProgramDoc, ServiceDoc, UniversityDoc } from '@oriesup/shared-types';

const localizedText = z.object({ fr: z.string().min(1), ar: z.string().optional(), en: z.string().optional() });
const localizedTextOptional = z.object({ fr: z.string().default(''), ar: z.string().optional(), en: z.string().optional() });

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

const serviceSchema = z.object({
  name: localizedText,
  description: localizedText,
  process: z.array(localizedTextOptional).default([]),
  advantages: z.array(localizedTextOptional).default([]),
  notes: localizedTextOptional.default({ fr: '' }),
  price: z.number().min(0),
  currency: z.string().default('MAD'),
  universityIds: z.array(z.string()).default([]),
});

/** Admin-only: create a purchasable service (a priced bundle of universities). */
export const createService = onCall(async (request) => {
  requireRole(request.auth, 'admin');
  const input = serviceSchema.parse(request.data);
  const doc: ServiceDoc = { ...input, active: true };
  const ref = await db.collection('services').add(doc);
  return { serviceId: ref.id };
});

export const updateService = onCall(async (request) => {
  requireRole(request.auth, 'admin');
  const { serviceId, ...rest } = z.object({ serviceId: z.string() }).passthrough().parse(request.data);
  const input = serviceSchema.partial().parse(rest);
  await db.collection('services').doc(serviceId).update(input);
  return { ok: true };
});

const universitySchema = z.object({
  name: localizedText,
  city: optionalString,
  website: optionalString,
  type: optionalString,
});

/** Admin-only: create a university entry in the global catalog. */
export const createUniversity = onCall(async (request) => {
  requireRole(request.auth, 'admin');
  const input = universitySchema.parse(request.data);
  const doc: UniversityDoc = { ...input, logoUrl: '' };
  const ref = await db.collection('universities').add(doc);
  return { universityId: ref.id };
});

const programSchema = z.object({
  universityId: z.string(),
  name: localizedText,
  description: localizedText,
  degreeLevel: optionalString,
  riasecTags: z.array(z.enum(['R', 'I', 'A', 'S', 'E', 'C'])).min(1),
});

/** Admin-only: create a program under a university, tagged with RIASEC dimensions. */
export const createProgram = onCall(async (request) => {
  requireRole(request.auth, 'admin');
  const { universityId, ...rest } = programSchema.parse(request.data);
  const universitySnap = await db.collection('universities').doc(universityId).get();
  if (!universitySnap.exists) throw new HttpsError('not-found', 'University not found.');

  const doc: ProgramDoc = rest;
  const ref = await db.collection('universities').doc(universityId).collection('programs').add(doc);
  return { programId: ref.id };
});
