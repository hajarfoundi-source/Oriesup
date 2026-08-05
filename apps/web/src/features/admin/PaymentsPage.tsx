import { useEffect, useState } from 'react';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { db } from '../../lib/firebaseClient';
import { Card } from '../../components/Card';
import { TextField } from '../../components/TextField';
import { Button } from '../../components/Button';
import { confirmManualPayment } from '../../lib/api';
import type { OrderDoc } from '@oriesup/shared-types';

interface OrderRow extends OrderDoc {
  id: string;
}

export function PaymentsPage() {
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [references, setReferences] = useState<Record<string, string>>({});
  const [busyId, setBusyId] = useState<string | null>(null);

  async function refresh() {
    const snap = await getDocs(
      query(collection(db, 'orders'), where('method', '==', 'manual'), where('status', '==', 'pending'), orderBy('createdAt', 'desc'))
    );
    setOrders(snap.docs.map((d) => ({ id: d.id, ...(d.data() as OrderDoc) })));
  }

  useEffect(() => {
    refresh();
  }, []);

  async function handleConfirm(orderId: string) {
    setBusyId(orderId);
    try {
      await confirmManualPayment({ orderId, reference: references[orderId] || 'manual' });
      await refresh();
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Paiements manuels en attente</h1>
      <div className="space-y-3">
        {orders.map((o) => (
          <Card key={o.id} className="flex items-center justify-between gap-4">
            <div>
              <p className="font-semibold">
                {o.amount} {o.currency} — {o.buyerType === 'school' ? 'École' : 'Élève'}
              </p>
              <p className="text-sm text-neutral-500">Service: {o.serviceId} · École: {o.schoolId}</p>
            </div>
            <div className="flex items-center gap-2">
              <TextField
                label=""
                placeholder="Référence"
                className="w-40"
                value={references[o.id] ?? ''}
                onChange={(e) => setReferences({ ...references, [o.id]: e.target.value })}
              />
              <Button onClick={() => handleConfirm(o.id)} disabled={busyId === o.id}>
                Confirmer
              </Button>
            </div>
          </Card>
        ))}
        {orders.length === 0 && <p className="text-neutral-500">Aucun paiement manuel en attente.</p>}
      </div>
    </div>
  );
}
