import { onCall, HttpsError } from 'firebase-functions/v2/https';
import { z } from 'zod';
import { db } from '../lib/admin';
import { requireRole, parseInput } from '../lib/httpsError';
import type { OrderDoc } from '@oriesup/shared-types';

const schema = z.object({
  serviceId: z.string(),
  buyerType: z.enum(['school', 'student']),
  studentId: z.string().optional(),
  method: z.enum(['stripe', 'cmi', 'manual']),
});

/**
 * Any authenticated school/student. The price is always looked up server-side from
 * the `services` catalog — the client never supplies (or can influence) the amount.
 */
export const createOrder = onCall(async (request) => {
  const auth = requireRole(request.auth, 'school', 'student');
  const input = parseInput(schema, request.data);

  const schoolId = auth.token.schoolId as string;
  if (input.buyerType === 'student' && auth.token.role === 'student' && input.studentId && input.studentId !== auth.uid) {
    throw new HttpsError('permission-denied', 'Students may only purchase for themselves.');
  }
  if (input.buyerType === 'school' && auth.token.role !== 'school') {
    throw new HttpsError('permission-denied', 'Only school staff can purchase a school-wide entitlement.');
  }

  if (auth.token.role === 'student') {
    const studentSnap = await db.collection('schools').doc(schoolId).collection('students').doc(auth.uid).get();
    if (!studentSnap.exists || !studentSnap.data()!.profileComplete) {
      throw new HttpsError('failed-precondition', 'Complete your profile before registering for a service.');
    }
  }

  const serviceSnap = await db.collection('services').doc(input.serviceId).get();
  if (!serviceSnap.exists || !serviceSnap.data()!.active) {
    throw new HttpsError('not-found', 'Service not found or inactive.');
  }
  const service = serviceSnap.data()!;

  const order: OrderDoc = {
    buyerType: input.buyerType,
    schoolId,
    studentId: input.buyerType === 'student' ? (auth.token.role === 'student' ? auth.uid : input.studentId) : undefined,
    serviceId: input.serviceId,
    amount: service.price,
    currency: service.currency,
    method: input.method,
    status: 'pending',
    createdAt: Date.now(),
  };

  const ref = await db.collection('orders').add(order);
  return { orderId: ref.id, amount: order.amount, currency: order.currency };
});
