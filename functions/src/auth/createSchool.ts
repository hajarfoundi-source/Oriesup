import { onCall, HttpsError } from 'firebase-functions/v2/https';
import { z } from 'zod';
import { db, auth } from '../lib/admin';
import { requireRole, parseInput } from '../lib/httpsError';
import { localeSchema } from '../lib/localeSchema';
import { DEFAULT_BRANDING, type SchoolDoc, type UserDoc } from '@oriesup/shared-types';

const schema = z.object({
  slug: z.string().min(2).max(64).regex(/^[a-z0-9-]+$/, 'slug must be lowercase letters, numbers, hyphens'),
  name: z.string().min(1),
  contactEmail: z.string().email(),
  contactPassword: z.string().min(8),
  contactDisplayName: z.string().min(1),
  defaultLocale: localeSchema,
});

/** Admin-only: provisions a new school tenant plus its first staff login. */
export const createSchool = onCall(async (request) => {
  requireRole(request.auth, 'admin');
  const input = parseInput(schema, request.data);

  const existingSlug = await db.collection('schools').where('slug', '==', input.slug).limit(1).get();
  if (!existingSlug.empty) {
    throw new HttpsError('already-exists', `Slug "${input.slug}" is already in use.`);
  }

  const schoolRef = db.collection('schools').doc();
  const schoolId = schoolRef.id;

  const userRecord = await auth.createUser({
    email: input.contactEmail,
    password: input.contactPassword,
    displayName: input.contactDisplayName,
  });
  await auth.setCustomUserClaims(userRecord.uid, { role: 'school', schoolId });

  const school: SchoolDoc = {
    slug: input.slug,
    name: input.name,
    logoUrl: '',
    branding: DEFAULT_BRANDING,
    defaultLocale: input.defaultLocale,
    active: true,
    createdAt: Date.now(),
  };
  const userDoc: UserDoc = {
    role: 'school',
    schoolId,
    displayName: input.contactDisplayName,
    email: input.contactEmail,
    createdAt: Date.now(),
  };

  const batch = db.batch();
  batch.set(schoolRef, school);
  batch.set(schoolRef.collection('staff').doc(userRecord.uid), { role: 'owner', displayName: input.contactDisplayName, email: input.contactEmail, createdAt: Date.now() });
  batch.set(db.collection('users').doc(userRecord.uid), userDoc);
  await batch.commit();

  return { schoolId, staffUid: userRecord.uid };
});
