import { onCall, HttpsError } from 'firebase-functions/v2/https';
import { z } from 'zod';
import Stripe from 'stripe';
import type { Request, Response } from 'express';
import { db } from '../lib/admin';
import { requireAuth } from '../lib/httpsError';
import { STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET } from '../lib/secrets';

function getStripeClient(): Stripe {
  return new Stripe(STRIPE_SECRET_KEY.value(), { apiVersion: '2025-02-24.acacia' });
}

const schema = z.object({
  orderIds: z.array(z.string()).min(1),
  successUrl: z.string().url(),
  cancelUrl: z.string().url(),
});

/** Builds a single Checkout Session covering every order in the cart (all orders must share one currency). */
export const createStripeCheckoutSession = onCall({ secrets: [STRIPE_SECRET_KEY] }, async (request) => {
  requireAuth(request.auth);
  const input = schema.parse(request.data);

  const orderRefs = input.orderIds.map((id) => db.collection('orders').doc(id));
  const orderSnaps = await Promise.all(orderRefs.map((ref) => ref.get()));

  const orders = orderSnaps.map((snap, i) => {
    if (!snap.exists) throw new HttpsError('not-found', `Order ${input.orderIds[i]} not found.`);
    const data = snap.data()!;
    if (data.status !== 'pending') throw new HttpsError('failed-precondition', `Order ${input.orderIds[i]} is not pending.`);
    return data;
  });

  const currency = orders[0].currency;
  if (!orders.every((o) => o.currency === currency)) {
    throw new HttpsError('failed-precondition', 'All cart items must use the same currency to check out together.');
  }

  const stripe = getStripeClient();
  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: orders.map((order) => ({
      price_data: {
        currency: currency.toLowerCase(),
        unit_amount: Math.round(order.amount * 100),
        product_data: { name: `Oriesup service ${order.serviceId}` },
      },
      quantity: 1,
    })),
    metadata: { orderIds: JSON.stringify(input.orderIds) },
    success_url: input.successUrl,
    cancel_url: input.cancelUrl,
  });

  const batch = db.batch();
  orderRefs.forEach((ref) => batch.update(ref, { providerRef: session.id, status: 'processing' }));
  await batch.commit();

  return { sessionUrl: session.url };
});

/** Mounted at /api/stripe/webhook by the Express app in index.ts. Requires the raw body for signature verification. */
export async function stripeWebhookHandler(req: Request, res: Response) {
  const signature = req.headers['stripe-signature'];
  if (!signature) {
    res.status(400).send('Missing stripe-signature header');
    return;
  }

  const stripe = getStripeClient();
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(req.body, signature, STRIPE_WEBHOOK_SECRET.value());
  } catch (err) {
    res.status(400).send(`Webhook signature verification failed: ${(err as Error).message}`);
    return;
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const orderIdsRaw = session.metadata?.orderIds;
    if (orderIdsRaw) {
      const orderIds: string[] = JSON.parse(orderIdsRaw);
      const batch = db.batch();
      orderIds.forEach((orderId) => batch.update(db.collection('orders').doc(orderId), { status: 'confirmed' }));
      await batch.commit();
    }
  }

  res.status(200).send({ received: true });
}
