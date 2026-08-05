import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, collectionGroup, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../lib/firebaseClient';
import type { OrderDoc, SchoolDoc, ServiceDoc, StudentDoc } from '@oriesup/shared-types';

interface StudentRow extends StudentDoc {
  id: string;
}

export function StudentsPage() {
  const [students, setStudents] = useState<StudentRow[]>([]);
  const [schoolNames, setSchoolNames] = useState<Record<string, string>>({});
  const [servicesByStudent, setServicesByStudent] = useState<Record<string, string[]>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const [studentsSnap, schoolsSnap, confirmedOrdersSnap] = await Promise.all([
        getDocs(collectionGroup(db, 'students')),
        getDocs(collection(db, 'schools')),
        getDocs(query(collection(db, 'orders'), where('status', '==', 'confirmed'))),
      ]);

      const rows = studentsSnap.docs.map((d) => ({ id: d.id, ...(d.data() as StudentDoc) }));

      const nameById: Record<string, string> = {};
      schoolsSnap.docs.forEach((d) => {
        nameById[d.id] = (d.data() as SchoolDoc).name;
      });

      const confirmedOrders = confirmedOrdersSnap.docs.map((d) => d.data() as OrderDoc);
      const serviceIds = [...new Set(confirmedOrders.map((o) => o.serviceId))];
      const serviceSnaps = await Promise.all(serviceIds.map((id) => getDoc(doc(db, 'services', id))));
      const serviceNameById: Record<string, string> = {};
      serviceSnaps.forEach((snap) => {
        if (snap.exists()) serviceNameById[snap.id] = (snap.data() as ServiceDoc).name.fr;
      });

      const byStudent: Record<string, string[]> = {};
      confirmedOrders.forEach((o) => {
        if (!o.studentId) return;
        const name = serviceNameById[o.serviceId] ?? o.serviceId;
        (byStudent[o.studentId] ??= []).push(name);
      });

      setStudents(rows);
      setSchoolNames(nameById);
      setServicesByStudent(byStudent);
      setLoading(false);
    })();
  }, []);

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Élèves</h1>
      <div className="overflow-x-auto rounded-3xl bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-neutral-100 text-xs uppercase tracking-wide text-neutral-400">
              <th className="px-6 py-3 font-medium">Nom</th>
              <th className="px-6 py-3 font-medium">École</th>
              <th className="px-6 py-3 font-medium">Email</th>
              <th className="px-6 py-3 font-medium">Profil</th>
              <th className="px-6 py-3 font-medium">Services</th>
              <th className="px-6 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => {
              const services = servicesByStudent[s.id] ?? [];
              return (
                <tr key={s.id} className="border-b border-neutral-50 last:border-0 hover:bg-neutral-50">
                  <td className="px-6 py-3 font-semibold">
                    {s.firstName} {s.lastName}
                  </td>
                  <td className="px-6 py-3 text-neutral-500">{schoolNames[s.schoolId] ?? s.schoolId}</td>
                  <td className="px-6 py-3 text-neutral-500">{s.contactEmail ?? '—'}</td>
                  <td className="px-6 py-3">
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${s.profileComplete ? 'bg-green-100 text-green-700' : 'bg-neutral-100 text-neutral-500'}`}>
                      {s.profileComplete ? 'Complet' : 'Incomplet'}
                    </span>
                  </td>
                  <td className="px-6 py-3">
                    {services.length === 0 ? (
                      <span className="text-xs text-neutral-400">Aucun</span>
                    ) : (
                      <div className="flex flex-wrap gap-1.5">
                        {services.map((name, i) => (
                          <span key={i} className="rounded-full bg-brandPrimary/20 px-3 py-1 text-xs font-semibold text-brandPrimary">
                            {name}
                          </span>
                        ))}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-3 text-right">
                    <Link to={`/admin/students/${s.schoolId}/${s.id}`} className="text-sm font-medium text-brandCta">
                      Voir 👁
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {!loading && students.length === 0 && <p className="p-6 text-neutral-500">Aucun élève pour le moment.</p>}
      </div>
    </div>
  );
}
