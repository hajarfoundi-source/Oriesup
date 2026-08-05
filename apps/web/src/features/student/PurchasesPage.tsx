import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { collection, doc, getDoc, getDocs, orderBy, query, where } from 'firebase/firestore';
import { db } from '../../lib/firebaseClient';
import { useAuth } from '../auth/AuthContext';
import { Card } from '../../components/Card';
import { resolveLocalizedText, type Locale, type OrderDoc, type OrderStatus, type ServiceDoc } from '@oriesup/shared-types';

interface OrderRow extends OrderDoc {
  id: string;
}

const STATUS_STYLE: Record<OrderStatus, string> = {
  pending: 'bg-neutral-100 text-neutral-600',
  processing: 'bg-brandPrimary/20 text-brandPrimary',
  confirmed: 'bg-green-100 text-green-700',
  failed: 'bg-red-100 text-red-700',
  cancelled: 'bg-neutral-100 text-neutral-500',
};

export function PurchasesPage() {
  const { schoolSlug } = useParams<{ schoolSlug: string }>();
  const { user } = useAuth();
  const { t, i18n } = useTranslation();

  const STATUS_LABEL: Record<OrderStatus, string> = {
    pending: t('student.purchases.status.pending'),
    processing: t('student.purchases.status.processing'),
    confirmed: t('student.purchases.status.confirmed'),
    failed: t('student.purchases.status.failed'),
    cancelled: t('student.purchases.status.cancelled'),
  };

  const METHOD_LABEL: Record<OrderDoc['method'], string> = {
    stripe: t('student.purchases.method.stripe'),
    cmi: t('student.purchases.method.cmi'),
    manual: t('student.purchases.method.manual'),
  };

  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [services, setServices] = useState<Record<string, ServiceDoc>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const snap = await getDocs(
        query(collection(db, 'orders'), where('studentId', '==', user.uid), orderBy('createdAt', 'desc'))
      );
      const rows = snap.docs.map((d) => ({ id: d.id, ...(d.data() as OrderDoc) }));
      setOrders(rows);

      const serviceIds = [...new Set(rows.map((o) => o.serviceId))];
      const serviceSnaps = await Promise.all(serviceIds.map((id) => getDoc(doc(db, 'services', id))));
      const byId: Record<string, ServiceDoc> = {};
      serviceSnaps.forEach((s) => {
        if (s.exists()) byId[s.id] = s.data() as ServiceDoc;
      });
      setServices(byId);
      setLoading(false);
    })();
  }, [user]);

  if (loading) return <p className="text-neutral-500">{t('common.loading')}</p>;

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <h1 className="text-2xl font-bold">{t('student.purchases.title')}</h1>

      {orders.length === 0 && (
        <Card>
          <p className="text-neutral-500">{t('student.purchases.empty')}</p>
          <Link to={`/s/${schoolSlug}/student`} className="mt-3 inline-block text-sm font-semibold text-brandCta">
            {t('student.purchases.browse')}
          </Link>
        </Card>
      )}

      <div className="space-y-3">
        {orders.map((o) => {
          const service = services[o.serviceId];
          return (
            <Card key={o.id}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-semibold">{service ? resolveLocalizedText(service.name, i18n.language as Locale) : o.serviceId}</p>
                  <p className="mt-1 text-sm text-neutral-500">
                    {o.amount} {o.currency} · {METHOD_LABEL[o.method]}
                  </p>
                  <p className="mt-1 text-xs text-neutral-400">
                    {new Date(o.createdAt).toLocaleDateString(i18n.language, { day: 'numeric', month: 'long', year: 'numeric' })}
                  </p>
                </div>
                <span className={`flex-shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${STATUS_STYLE[o.status]}`}>
                  {STATUS_LABEL[o.status]}
                </span>
              </div>

              {o.status === 'confirmed' && (
                <Link
                  to={`/s/${schoolSlug}/student/services/${o.serviceId}`}
                  className="mt-4 inline-block text-sm font-semibold text-brandCta"
                >
                  {t('student.purchases.followService')}
                </Link>
              )}
              {o.status === 'pending' && o.method === 'manual' && (
                <p className="mt-4 text-sm text-neutral-500">{t('student.purchases.pendingManual')}</p>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
