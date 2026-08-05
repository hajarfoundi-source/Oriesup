import { onCall, HttpsError } from 'firebase-functions/v2/https';
import { z } from 'zod';
import { db } from '../lib/admin';
import { requireRole } from '../lib/httpsError';
import type { OrderDoc } from '@oriesup/shared-types';

const schema = z.object({
  schoolId: z.string(),
  studentId: z.string(),
  serviceId: z.string(),
  note: z.string().optional(),
});

/**
 * Platform-admin-only: unlocks a service for a student without checkout (e.g. payment
 * collected outside the app). Records it as a confirmed manual order — same audit trail,
 * analytics, and onOrderConfirmed entitlement-granting path as any other purchase.
 */
export const adminGrantEntitlement = onCall(async (request) => {
  const auth = requireRole(request.auth, 'admin');
  const input = schema.parse(request.data);

  const studentRef = db.collection('schools').doc(input.schoolId).collection('students').doc(input.studentId);
  const studentSnap = await studentRef.get();
  if (!studentSnap.exists) throw new HttpsError('not-found', 'Student not found.');

  const serviceSnap = await db.collection('services').doc(input.serviceId).get();
  if (!serviceSnap.exists) throw new HttpsError('not-found', 'Service not found.');
  const service = serviceSnap.data()!;

  const existingEntitlement = await studentRef.collection('entitlements').doc(input.serviceId).get();
  if (existingEntitlement.exists) {
    throw new HttpsError('failed-precondition', 'Student already has access to this service.');
  }

  const order: OrderDoc = {
    buyerType: 'student',
    schoolId: input.schoolId,
    studentId: input.studentId,
    serviceId: input.serviceId,
    amount: service.price,
    currency: service.currency,
    method: 'manual',
    status: 'pending',
    createdAt: Date.now(),
  };
  const ref = await db.collection('orders').add(order);
  await ref.update({
    status: 'confirmed',
    confirmedBy: auth.uid,
    confirmedAt: Date.now(),
    providerRef: 'admin-grant',
    note: input.note ?? 'Accès débloqué manuellement par un administrateur',
  });

  return { ok: true, orderId: ref.id };
});
