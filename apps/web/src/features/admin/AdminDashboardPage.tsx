import { useEffect, useState } from 'react';
import {
  collection,
  doc,
  getCountFromServer,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { db } from '../../lib/firebaseClient';
import { Card } from '../../components/Card';
import type { OrderDoc, OrderStatus, SchoolDoc, ServiceDoc } from '@oriesup/shared-types';

interface OrderRow extends OrderDoc {
  id: string;
}

interface SchoolAnalyticsRow {
  id: string;
  name: string;
  studentCount: number;
  purchaseCount: number;
  revenue: Record<string, number>;
}

const STATUS_LABEL: Record<OrderStatus, string> = {
  pending: 'En attente',
  processing: 'En cours',
  confirmed: 'Confirmé',
  failed: 'Échoué',
  cancelled: 'Annulé',
};

const STATUS_STYLE: Record<OrderStatus, string> = {
  pending: 'bg-neutral-100 text-neutral-600',
  processing: 'bg-brandPrimary/20 text-brandPrimary',
  confirmed: 'bg-green-100 text-green-700',
  failed: 'bg-red-100 text-red-700',
  cancelled: 'bg-neutral-100 text-neutral-500',
};

function addToRevenue(revenue: Record<string, number>, currency: string, amount: number) {
  revenue[currency] = (revenue[currency] ?? 0) + amount;
}

function formatRevenue(revenue: Record<string, number>): string {
  const entries = Object.entries(revenue);
  if (entries.length === 0) return '0';
  return entries.map(([currency, amount]) => `${amount} ${currency}`).join(' + ');
}

export function AdminDashboardPage() {
  const [counts, setCounts] = useState<{ schools: number; services: number; universities: number; students: number } | null>(null);
  const [totalRevenue, setTotalRevenue] = useState<Record<string, number>>({});
  const [confirmedCount, setConfirmedCount] = useState(0);
  const [schoolAnalytics, setSchoolAnalytics] = useState<SchoolAnalyticsRow[]>([]);
  const [recentOrders, setRecentOrders] = useState<OrderRow[]>([]);
  const [schoolNames, setSchoolNames] = useState<Record<string, string>>({});
  const [serviceNames, setServiceNames] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const [schoolsSnap, servicesCount, universitiesCount, confirmedOrdersSnap, recentOrdersSnap] = await Promise.all([
        getDocs(query(collection(db, 'schools'), orderBy('createdAt', 'desc'))),
        getCountFromServer(collection(db, 'services')),
        getCountFromServer(collection(db, 'universities')),
        getDocs(query(collection(db, 'orders'), where('status', '==', 'confirmed'))),
        getDocs(query(collection(db, 'orders'), orderBy('createdAt', 'desc'), limit(10))),
      ]);

      const schools = schoolsSnap.docs.map((d) => ({ id: d.id, ...(d.data() as SchoolDoc) }));
      const confirmedOrders = confirmedOrdersSnap.docs.map((d) => ({ id: d.id, ...(d.data() as OrderDoc) }));
      const recent = recentOrdersSnap.docs.map((d) => ({ id: d.id, ...(d.data() as OrderDoc) }));

      const studentCounts = await Promise.all(
        schools.map((s) => getCountFromServer(collection(db, 'schools', s.id, 'students')))
      );

      const nameById: Record<string, string> = {};
      const analytics: SchoolAnalyticsRow[] = schools.map((s, i) => {
        nameById[s.id] = s.name;
        const schoolOrders = confirmedOrders.filter((o) => o.schoolId === s.id);
        const revenue: Record<string, number> = {};
        schoolOrders.forEach((o) => addToRevenue(revenue, o.currency, o.amount));
        return {
          id: s.id,
          name: s.name,
          studentCount: studentCounts[i].data().count,
          purchaseCount: schoolOrders.length,
          revenue,
        };
      });

      const revenue: Record<string, number> = {};
      confirmedOrders.forEach((o) => addToRevenue(revenue, o.currency, o.amount));

      const serviceIds = [...new Set(recent.map((o) => o.serviceId))];
      const serviceSnaps = await Promise.all(serviceIds.map((id) => getDoc(doc(db, 'services', id))));
      const serviceNameById: Record<string, string> = {};
      serviceSnaps.forEach((snap) => {
        if (snap.exists()) serviceNameById[snap.id] = (snap.data() as ServiceDoc).name.fr;
      });

      setCounts({
        schools: schools.length,
        services: servicesCount.data().count,
        universities: universitiesCount.data().count,
        students: analytics.reduce((sum, s) => sum + s.studentCount, 0),
      });
      setTotalRevenue(revenue);
      setConfirmedCount(confirmedOrders.length);
      setSchoolAnalytics(analytics);
      setRecentOrders(recent);
      setSchoolNames(nameById);
      setServiceNames(serviceNameById);
      setLoading(false);
    })();
  }, []);

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Tableau de bord</h1>

      <div className="grid grid-cols-3 gap-4">
        <Card>
          <p className="text-sm text-neutral-500">Écoles</p>
          <p className="text-3xl font-bold">{counts?.schools ?? '…'}</p>
        </Card>
        <Card>
          <p className="text-sm text-neutral-500">Services</p>
          <p className="text-3xl font-bold">{counts?.services ?? '…'}</p>
        </Card>
        <Card>
          <p className="text-sm text-neutral-500">Universités</p>
          <p className="text-3xl font-bold">{counts?.universities ?? '…'}</p>
        </Card>
        <Card>
          <p className="text-sm text-neutral-500">Élèves</p>
          <p className="text-3xl font-bold">{counts?.students ?? '…'}</p>
        </Card>
        <Card>
          <p className="text-sm text-neutral-500">Services achetés</p>
          <p className="text-3xl font-bold">{loading ? '…' : confirmedCount}</p>
        </Card>
        <Card>
          <p className="text-sm text-neutral-500">Chiffre d'affaires</p>
          <p className="text-3xl font-bold text-brandCta">{loading ? '…' : formatRevenue(totalRevenue)}</p>
        </Card>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-6">
        <div>
          <h2 className="mb-3 text-lg font-bold">Analytique par école</h2>
          <div className="space-y-3">
            {schoolAnalytics.map((s) => (
              <Card key={s.id}>
                <p className="font-semibold">{s.name}</p>
                <div className="mt-2 flex items-center gap-4 text-sm text-neutral-500">
                  <span>{s.studentCount} élève{s.studentCount !== 1 ? 's' : ''}</span>
                  <span>{s.purchaseCount} achat{s.purchaseCount !== 1 ? 's' : ''}</span>
                  <span className="font-semibold text-brandCta">{formatRevenue(s.revenue)}</span>
                </div>
              </Card>
            ))}
            {!loading && schoolAnalytics.length === 0 && <p className="text-neutral-500">Aucune école pour le moment.</p>}
          </div>
        </div>

        <div>
          <h2 className="mb-3 text-lg font-bold">Achats récents</h2>
          <div className="space-y-3">
            {recentOrders.map((o) => (
              <Card key={o.id}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold">{serviceNames[o.serviceId] ?? o.serviceId}</p>
                    <p className="text-sm text-neutral-500">
                      {schoolNames[o.schoolId] ?? o.schoolId} · {o.amount} {o.currency}
                    </p>
                    <p className="mt-1 text-xs text-neutral-400">
                      {new Date(o.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </p>
                  </div>
                  <span className={`flex-shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${STATUS_STYLE[o.status]}`}>
                    {STATUS_LABEL[o.status]}
                  </span>
                </div>
              </Card>
            ))}
            {!loading && recentOrders.length === 0 && <p className="text-neutral-500">Aucun achat pour le moment.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
