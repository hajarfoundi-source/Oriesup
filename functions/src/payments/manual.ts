import { onCall, HttpsError } from 'firebase-functions/v2/https';
import { z } from 'zod';
import { db } from '../lib/admin';
import { requireRole } from '../lib/httpsError';

const schema = z.object({
  orderId: z.string(),
  reference: z.string().min(1),
  note: z.string().optional(),
});

/** Platform-admin-only: marks a cash/bank-transfer order as paid, with an audit trail. */
export const confirmManualPayment = onCall(async (request) => {
  const auth = requireRole(request.auth, 'admin');
  const input = schema.parse(request.data);

  const orderRef = db.collection('orders').doc(input.orderId);
  const orderSnap = await orderRef.get();
  if (!orderSnap.exists) throw new HttpsError('not-found', 'Order not found.');
  const order = orderSnap.data()!;
  if (order.method !== 'manual') throw new HttpsError('failed-precondition', 'Order is not a manual-payment order.');
  if (order.status === 'confirmed') throw new HttpsError('failed-precondition', 'Order is already confirmed.');

  await orderRef.update({
    status: 'confirmed',
    confirmedBy: auth.uid,
    confirmedAt: Date.now(),
    providerRef: input.reference,
    note: input.note ?? null,
  });

  return { ok: true };
});
