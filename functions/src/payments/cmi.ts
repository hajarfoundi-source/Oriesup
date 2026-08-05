import { onCall, HttpsError } from 'firebase-functions/v2/https';
import { z } from 'zod';
import crypto from 'crypto';
import type { Request, Response } from 'express';
import { db } from '../lib/admin';
import { requireAuth } from '../lib/httpsError';
import { CMI_STORE_KEY } from '../lib/secrets';

/**
 * SPIKE STUB — not wired to real CMI (Centre Monetique Interbancaire) yet.
 * CMI's exact hosted-page field names, hash/signature algorithm, and required
 * headers vary by acquiring bank and integration package. Do NOT treat the field
 * names or hash construction below as final — replace once a real merchant
 * integration guide + sandbox credentials are available. This exists so the
 * order -> entitlement pipeline shape is provable end-to-end today with a stand-in.
 */

const schema = z.object({
  orderId: z.string(),
  returnUrl: z.string().url(),
});

export const createCmiPaymentRequest = onCall({ secrets: [CMI_STORE_KEY] }, async (request) => {
  requireAuth(request.auth);
  const input = schema.parse(request.data);

  const orderRef = db.collection('orders').doc(input.orderId);
  const orderSnap = await orderRef.get();
  if (!orderSnap.exists) throw new HttpsError('not-found', 'Order not found.');
  const order = orderSnap.data()!;
  if (order.status !== 'pending') throw new HttpsError('failed-precondition', 'Order is not pending.');

  // PLACEHOLDER field set / hash — replace with CMI's actual spec.
  const fields: Record<string, string> = {
    clientid: process.env.CMI_MERCHANT_ID ?? 'TBD',
    oid: input.orderId,
    amount: order.amount.toFixed(2),
    currency: order.currency,
    okUrl: input.returnUrl,
    failUrl: input.returnUrl,
  };
  const hash = crypto
    .createHmac('sha512', CMI_STORE_KEY.value())
    .update(Object.values(fields).join('|'))
    .digest('base64');

  await orderRef.update({ status: 'processing', providerRef: input.orderId });
  return { actionUrl: 'https://payment.cmi.co.ma/fim/est3Dgate', fields: { ...fields, HASH: hash } };
});

/** Browser-redirect return — NOT trusted as source of truth, just shows a "processing" UI. */
export async function cmiReturnHandler(_req: Request, res: Response) {
  res.status(200).send('Payment processing — please wait for confirmation.');
}

/** Server-to-server notification — the actually-trusted confirmation path, once real signature verification is implemented. */
export async function cmiNotifyHandler(req: Request, res: Response) {
  const orderId = req.body?.oid as string | undefined;
  if (!orderId) {
    res.status(400).send('Missing order id');
    return;
  }
  // TODO(spike): verify CMI's response hash/signature before trusting this callback.
  await db.collection('orders').doc(orderId).update({ status: 'confirmed' });
  res.status(200).send('OK');
}
