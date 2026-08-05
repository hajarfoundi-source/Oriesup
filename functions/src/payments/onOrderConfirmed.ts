import { onDocumentUpdated } from 'firebase-functions/v2/firestore';
import { db } from '../lib/admin';
import type { EntitlementDoc, OrderDoc } from '@oriesup/shared-types';

/** Grants the appropriate entitlement (school-wide or per-student) the moment an order flips to 'confirmed'. */
export const onOrderConfirmed = onDocumentUpdated('orders/{orderId}', async (event) => {
  const before = event.data?.before.data() as OrderDoc | undefined;
  const after = event.data?.after.data() as OrderDoc | undefined;
  if (!before || !after) return;
  if (before.status === 'confirmed' || after.status !== 'confirmed') return;

  const orderId = event.params.orderId;
  const entitlement: EntitlementDoc = { grantedAt: Date.now(), orderId };

  if (after.buyerType === 'school') {
    await db.collection('schools').doc(after.schoolId).collection('entitlements').doc(after.serviceId).set(entitlement);
  } else if (after.studentId) {
    await db
      .collection('schools').doc(after.schoolId)
      .collection('students').doc(after.studentId)
      .collection('entitlements').doc(after.serviceId)
      .set(entitlement);
  }
});
