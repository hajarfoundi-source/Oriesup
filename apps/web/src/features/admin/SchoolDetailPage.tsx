import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { collection, doc, getDoc, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../../lib/firebaseClient';
import { Card } from '../../components/Card';
import type { SchoolDoc, StudentDoc } from '@oriesup/shared-types';

interface StudentRow extends StudentDoc {
  id: string;
}

export function SchoolDetailPage() {
  const { schoolId } = useParams<{ schoolId: string }>();
  const [school, setSchool] = useState<SchoolDoc | null>(null);
  const [students, setStudents] = useState<StudentRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!schoolId) return;
    (async () => {
      const [schoolSnap, studentsSnap] = await Promise.all([
        getDoc(doc(db, 'schools', schoolId)),
        getDocs(query(collection(db, 'schools', schoolId, 'students'), orderBy('createdAt', 'desc'))),
      ]);
      setSchool(schoolSnap.exists() ? (schoolSnap.data() as SchoolDoc) : null);
      setStudents(studentsSnap.docs.map((d) => ({ id: d.id, ...(d.data() as StudentDoc) })));
      setLoading(false);
    })();
  }, [schoolId]);

  if (loading) return <p className="text-neutral-500">Chargement...</p>;
  if (!school) return <p className="text-neutral-500">École introuvable.</p>;

  return (
    <div className="space-y-6">
      <Link to="/admin/schools" className="text-sm text-neutral-500 hover:text-brandCta">
        ← Retour aux écoles
      </Link>

      <Card className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{school.name}</h1>
          <p className="mt-1 text-sm text-neutral-500">/s/{school.slug}</p>
        </div>
        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${school.active ? 'bg-green-100 text-green-700' : 'bg-neutral-100 text-neutral-500'}`}>
          {school.active ? 'Actif' : 'Inactif'}
        </span>
      </Card>

      <div>
        <h2 className="mb-3 text-lg font-bold">Élèves ({students.length})</h2>
        <div className="overflow-x-auto rounded-3xl bg-white shadow-sm">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-neutral-100 text-xs uppercase tracking-wide text-neutral-400">
                <th className="px-6 py-3 font-medium">Nom</th>
                <th className="px-6 py-3 font-medium">Email</th>
                <th className="px-6 py-3 font-medium">Niveau</th>
                <th className="px-6 py-3 font-medium">Statut</th>
                <th className="px-6 py-3 font-medium">Profil</th>
                <th className="px-6 py-3 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {students.map((s) => (
                <tr key={s.id} className="border-b border-neutral-50 last:border-0 hover:bg-neutral-50">
                  <td className="px-6 py-3 font-semibold">
                    {s.firstName} {s.lastName}
                  </td>
                  <td className="px-6 py-3 text-neutral-500">{s.contactEmail ?? '—'}</td>
                  <td className="px-6 py-3 text-neutral-500">{s.gradeLevel ?? '—'}</td>
                  <td className="px-6 py-3">
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${s.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                      {s.status === 'active' ? 'Actif' : 'En attente'}
                    </span>
                  </td>
                  <td className="px-6 py-3">
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${s.profileComplete ? 'bg-green-100 text-green-700' : 'bg-neutral-100 text-neutral-500'}`}>
                      {s.profileComplete ? 'Complet' : 'Incomplet'}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-right">
                    <Link
                      to={`/admin/students/${schoolId}/${s.id}`}
                      aria-label="Voir l'élève"
                      className="inline-flex items-center gap-1 text-sm font-medium text-brandCta"
                    >
                      Voir 👁
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {students.length === 0 && <p className="p-6 text-neutral-500">Aucun élève pour le moment.</p>}
        </div>
      </div>
    </div>
  );
}
