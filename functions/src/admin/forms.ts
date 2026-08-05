import { onCall, HttpsError } from 'firebase-functions/v2/https';
import { z } from 'zod';
import { db } from '../lib/admin';
import { requireRole } from '../lib/httpsError';
import type { FormDoc, FormSubmissionDoc } from '@oriesup/shared-types';

const fieldSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  type: z.enum(['text', 'textarea', 'select', 'date']),
  required: z.boolean(),
  // The callable-functions client SDK encodes `undefined` as `null` on the wire
  // (see @firebase/functions encode()) — accept null too and normalize it away.
  options: z
    .array(z.string())
    .nullable()
    .optional()
    .transform((v) => v ?? undefined),
});

const formSchema = z.object({
  serviceId: z.string().min(1),
  category: z.enum(['university_application', 'scholarship_application', 'language_test_prep', 'other']),
  title: z.string().min(1),
  description: z.string().default(''),
  fields: z.array(fieldSchema).min(1),
});

/** Admin-only: defines a fillable form (university/scholarship application, test-prep checklist, etc.) tied to a service. */
export const createForm = onCall(async (request) => {
  requireRole(request.auth, 'admin');
  const input = formSchema.parse(request.data);

  const serviceSnap = await db.collection('services').doc(input.serviceId).get();
  if (!serviceSnap.exists) throw new HttpsError('not-found', 'Service not found.');

  const doc: FormDoc = { ...input, active: true, createdAt: Date.now() };
  const ref = await db.collection('forms').add(doc);
  return { formId: ref.id };
});

export const updateForm = onCall(async (request) => {
  requireRole(request.auth, 'admin');
  const { formId, ...rest } = z.object({ formId: z.string() }).passthrough().parse(request.data);
  const input = formSchema.partial().extend({ active: z.boolean().optional() }).parse(rest);
  await db.collection('forms').doc(formId).update(input);
  return { ok: true };
});

const reviewSchema = z.object({
  submissionId: z.string(),
  status: z.enum(['in_review', 'approved', 'changes_requested']),
  reviewNote: z
    .string()
    .nullable()
    .optional()
    .transform((v) => v ?? undefined),
});

/** Admin or the submission's own school staff may review a submitted form. */
export const reviewFormSubmission = onCall(async (request) => {
  const auth = requireRole(request.auth, 'admin', 'school');
  const input = reviewSchema.parse(request.data);

  const ref = db.collection('formSubmissions').doc(input.submissionId);
  const snap = await ref.get();
  if (!snap.exists) throw new HttpsError('not-found', 'Submission not found.');
  const submission = snap.data() as FormSubmissionDoc;

  if (auth.token.role === 'school' && auth.token.schoolId !== submission.schoolId) {
    throw new HttpsError('permission-denied', "You can only review your own school's submissions.");
  }

  await ref.update({
    status: input.status,
    reviewNote: input.reviewNote ?? null,
    reviewedAt: Date.now(),
    reviewedBy: auth.uid,
  });
  return { ok: true };
});
