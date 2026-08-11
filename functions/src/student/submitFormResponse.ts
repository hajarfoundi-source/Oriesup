import { onCall, HttpsError } from 'firebase-functions/v2/https';
import { z } from 'zod';
import { db } from '../lib/admin';
import { requireRole, parseInput } from '../lib/httpsError';
import type { FormDoc, FormSubmissionDoc } from '@oriesup/shared-types';

const schema = z.object({
  formId: z.string(),
  answers: z.record(z.string(), z.string()),
});

/**
 * Student-only. A form is only fillable once the student (or their school) is entitled
 * to the service it belongs to — re-checked server-side, never trusted from the client.
 * Re-submitting overwrites the previous answers and resets review status.
 */
export const submitFormResponse = onCall(async (request) => {
  const auth = requireRole(request.auth, 'student');
  const input = parseInput(schema, request.data);
  const schoolId = auth.token.schoolId as string;

  const formSnap = await db.collection('forms').doc(input.formId).get();
  if (!formSnap.exists || !(formSnap.data() as FormDoc).active) {
    throw new HttpsError('not-found', 'Form not found or inactive.');
  }
  const form = formSnap.data() as FormDoc;

  const [schoolEntitlement, studentEntitlement] = await Promise.all([
    db.collection('schools').doc(schoolId).collection('entitlements').doc(form.serviceId).get(),
    db.collection('schools').doc(schoolId).collection('students').doc(auth.uid).collection('entitlements').doc(form.serviceId).get(),
  ]);
  if (!schoolEntitlement.exists && !studentEntitlement.exists) {
    throw new HttpsError('permission-denied', "You don't have access to this form yet.");
  }

  for (const field of form.fields) {
    if (field.required && !input.answers[field.id]?.trim()) {
      throw new HttpsError('invalid-argument', `"${field.label}" is required.`);
    }
  }

  const existingSnap = await db
    .collection('formSubmissions')
    .where('formId', '==', input.formId)
    .where('studentId', '==', auth.uid)
    .limit(1)
    .get();

  const payload: FormSubmissionDoc = {
    formId: input.formId,
    serviceId: form.serviceId,
    schoolId,
    studentId: auth.uid,
    answers: input.answers,
    status: 'submitted',
    submittedAt: Date.now(),
  };

  if (!existingSnap.empty) {
    const ref = existingSnap.docs[0].ref;
    await ref.update({ ...payload, reviewNote: null, reviewedAt: null, reviewedBy: null });
    return { ok: true, submissionId: ref.id };
  }

  const ref = await db.collection('formSubmissions').add(payload);
  return { ok: true, submissionId: ref.id };
});
