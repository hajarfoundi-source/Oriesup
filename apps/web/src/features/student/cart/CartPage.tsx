import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../lib/firebaseClient';
import { Card } from '../../../components/Card';
import { Button } from '../../../components/Button';
import { useCart } from './CartContext';
import { useProfileComplete } from '../useProfileComplete';
import { createOrder, createStripeCheckoutSession } from '../../../lib/api';
import { resolveLocalizedText, type Locale, type ServiceDoc } from '@oriesup/shared-types';

interface ServiceRow extends ServiceDoc {
  id: string;
}

export function CartPage() {
  const { schoolSlug } = useParams<{ schoolSlug: string }>();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { serviceIds, removeFromCart, clearCart } = useCart();
  const profileComplete = useProfileComplete();

  const [services, setServices] = useState<ServiceRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const snaps = await Promise.all(serviceIds.map((id) => getDoc(doc(db, 'services', id))));
      setServices(snaps.filter((s) => s.exists()).map((s) => ({ id: s.id, ...(s.data() as ServiceDoc) })));
      setLoading(false);
    })();
  }, [serviceIds]);

  const total = services.reduce((sum, s) => sum + s.price, 0);
  const currency = services[0]?.currency ?? '';

  async function checkout(method: 'stripe' | 'manual') {
    if (!profileComplete) {
      navigate(`/s/${schoolSlug}/student/profile?redirect=/s/${schoolSlug}/student/cart`);
      return;
    }
    setError(null);
    setBusy(true);
    try {
      const orders = await Promise.all(
        services.map((s) => createOrder({ serviceId: s.id, buyerType: 'student', method }))
      );

      if (method === 'stripe') {
        const origin = window.location.origin;
        const session = await createStripeCheckoutSession({
          orderIds: orders.map((o) => o.orderId),
          successUrl: `${origin}/s/${schoolSlug}/student?payment=success`,
          cancelUrl: `${origin}/s/${schoolSlug}/student/cart?payment=cancelled`,
        });
        clearCart();
        window.location.href = session.sessionUrl;
      } else {
        clearCart();
        setConfirmation(t('student.cart.pendingManual'));
      }
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setBusy(false);
    }
  }

  if (loading) return <p className="text-neutral-500">{t('common.loading')}</p>;

  if (confirmation) {
    return (
      <Card className="mx-auto max-w-lg text-center">
        <p className="font-semibold">{t('student.cart.registeredTitle')}</p>
        <p className="mt-2 text-sm text-neutral-600">{confirmation}</p>
      </Card>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <h1 className="text-2xl font-bold">{t('student.cart.title')}</h1>

      {services.length === 0 && <p className="text-neutral-500">{t('student.cart.empty')}</p>}

      <div className="space-y-3">
        {services.map((s) => (
          <Card key={s.id} className="flex items-center justify-between">
            <div>
              <p className="font-semibold">{resolveLocalizedText(s.name, i18n.language as Locale)}</p>
              <p className="text-sm text-neutral-500">
                {s.price} {s.currency}
              </p>
            </div>
            <button onClick={() => removeFromCart(s.id)} className="text-sm text-neutral-400 hover:text-red-600">
              {t('student.cart.remove')}
            </button>
          </Card>
        ))}
      </div>

      {services.length > 0 && (
        <Card>
          <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
            <p className="font-semibold">{t('student.cart.total')}</p>
            <p className="font-display text-xl font-bold text-brandCta">
              {total} {currency}
            </p>
          </div>
          <div className="mt-4 flex items-center gap-3">
            <Button variant="primary" disabled={busy} onClick={() => checkout('stripe')}>
              {t('student.cart.payByCard')}
            </Button>
            <Button variant="ghost" disabled={busy} onClick={() => checkout('manual')}>
              {t('student.cart.payManual')}
            </Button>
          </div>
          {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
        </Card>
      )}
    </div>
  );
}
