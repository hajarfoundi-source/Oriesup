import { useEffect, useState } from 'react';
import { collection, getCountFromServer } from 'firebase/firestore';
import { db } from '../../lib/firebaseClient';
import { useAuth } from '../auth/AuthContext';
import { Card } from '../../components/Card';
import { AnnouncementsSection } from '../../components/AnnouncementsSection';

export function SchoolDashboardPage() {
  const { schoolId } = useAuth();
  const [studentCount, setStudentCount] = useState<number | null>(null);

  useEffect(() => {
    if (!schoolId) return;
    (async () => {
      const snap = await getCountFromServer(collection(db, 'schools', schoolId, 'students'));
      setStudentCount(snap.data().count);
    })();
  }, [schoolId]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="mb-6 text-2xl font-bold">Tableau de bord</h1>
        <Card className="w-fit">
          <p className="text-sm text-neutral-500">Élèves inscrits</p>
          <p className="text-3xl font-bold">{studentCount ?? '…'}</p>
        </Card>
      </div>

      <AnnouncementsSection />
    </div>
  );
}
