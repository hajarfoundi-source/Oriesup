import express from 'express';
import { onRequest } from 'firebase-functions/v2/https';
import { stripeWebhookHandler } from './payments/stripe';
import { cmiNotifyHandler, cmiReturnHandler } from './payments/cmi';
import { STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET, CMI_STORE_KEY } from './lib/secrets';

const app = express();

// Stripe webhook needs the raw body for signature verification, so it must be
// registered before any express.json() body parser touches this route.
app.post('/stripe/webhook', express.raw({ type: 'application/json' }), (req, res) => {
  void stripeWebhookHandler(req, res);
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/cmi/notify', (req, res) => {
  void cmiNotifyHandler(req, res);
});
app.get('/cmi/return', (req, res) => {
  void cmiReturnHandler(req, res);
});
app.post('/cmi/return', (req, res) => {
  void cmiReturnHandler(req, res);
});

export const api = onRequest({ secrets: [STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET, CMI_STORE_KEY] }, app);
