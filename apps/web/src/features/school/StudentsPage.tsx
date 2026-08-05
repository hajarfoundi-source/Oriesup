import { useEffect, useState, type FormEvent } from 'react';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../../lib/firebaseClient';
import { useAuth } from '../auth/AuthContext';
import { Card } from '../../components/Card';
import { TextField } from '../../components/TextField';
import { Button } from '../../components/Button';
import { bulkAddStudents } from '../../lib/api';
import type { StudentDoc } from '@oriesup/shared-types';

interface StudentRow extends StudentDoc {
  id: string;
}

export function StudentsPage() {
  const { schoolId } = useAuth();
  const [students, setStudents] = useState<StudentRow[]>([]);
  const [form, setForm] = useState({ firstName: '', lastName: '', contactEmail: '', gradeLevel: '' });
  const [lastActivationLinks, setLastActivationLinks] = useState<Array<{ uid: string; activationUrl: string }>>([]);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function refresh() {
    if (!schoolId) return;
    const snap = await getDocs(query(collection(db, 'schools', schoolId, 'students'), orderBy('createdAt', 'desc')));
    setStudents(snap.docs.map((d) => ({ id: d.id, ...(d.data() as StudentDoc) })));
  }

  useEffect(() => {
    refresh();
  }, [schoolId]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const result = await bulkAddStudents({
        students: [
          {
            firstName: form.firstName,
            lastName: form.lastName,
            contactEmail: form.contactEmail || undefined,
            gradeLevel: form.gradeLevel || undefined,
          },
        ],
      });
      setLastActivationLinks(result.created);
      setForm({ firstName: '', lastName: '', contactEmail: '', gradeLevel: '' });
      await refresh();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="grid grid-cols-2 gap-8">
      <div>
        <h1 className="mb-6 text-2xl font-bold">Élèves</h1>
        <div className="space-y-3">
          {students.map((s) => (
            <Card key={s.id} className="flex items-center justify-between">
              <div>
                <p className="font-semibold">
                  {s.firstName} {s.lastName}
                </p>
                <p className="text-sm text-neutral-500">{s.contactEmail ?? '—'}</p>
              </div>
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  s.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                }`}
              >
                {s.status === 'active' ? 'Actif' : 'En attente'}
              </span>
            </Card>
          ))}
          {students.length === 0 && <p className="text-neutral-500">Aucun élève pour le moment.</p>}
        </div>
      </div>

      <Card className="h-fit">
        <h2 className="mb-4 text-lg font-bold">Ajouter un élève</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <TextField label="Prénom" value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} required />
          <TextField label="Nom" value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} required />
          <TextField label="Email (optionnel)" type="email" value={form.contactEmail} onChange={(e) => setForm({ ...form, contactEmail: e.target.value })} />
          <TextField label="Niveau" value={form.gradeLevel} onChange={(e) => setForm({ ...form, gradeLevel: e.target.value })} />
          {error && <p className="text-sm text-red-600">{error}</p>}
          <Button type="submit" disabled={submitting} className="w-full">
            Ajouter l'élève
          </Button>
        </form>
        {lastActivationLinks.length > 0 && (
          <div className="mt-4 rounded-xl bg-brandPrimary/10 p-3 text-sm">
            <p className="font-medium">Lien d'activation à transmettre à l'élève :</p>
            {lastActivationLinks.map((l) => (
              <p key={l.uid} className="break-all text-brandCta">
                {window.location.origin}
                {l.activationUrl}
              </p>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
