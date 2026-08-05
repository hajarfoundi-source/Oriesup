import { useEffect, useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { collection, getCountFromServer, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../../lib/firebaseClient';
import { TextField } from '../../components/TextField';
import { Button } from '../../components/Button';
import { Modal } from '../../components/Modal';
import { createUniversity } from '../../lib/api';
import type { UniversityDoc } from '@oriesup/shared-types';

interface UniversityRow extends UniversityDoc {
  id: string;
  programCount: number;
}

export function UniversitiesPage() {
  const [universities, setUniversities] = useState<UniversityRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ nameFr: '', city: '', website: '', type: '' });
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function refresh() {
    const snap = await getDocs(query(collection(db, 'universities'), orderBy('name')));
    const rows = await Promise.all(
      snap.docs.map(async (d) => {
        const count = await getCountFromServer(collection(db, 'universities', d.id, 'programs'));
        return { id: d.id, ...(d.data() as UniversityDoc), programCount: count.data().count };
      })
    );
    setUniversities(rows);
    setLoading(false);
  }

  useEffect(() => {
    refresh();
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await createUniversity({ name: { fr: form.nameFr }, city: form.city || undefined, website: form.website || undefined, type: form.type || undefined });
      setForm({ nameFr: '', city: '', website: '', type: '' });
      setShowModal(false);
      await refresh();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Universités</h1>
        <Button onClick={() => setShowModal(true)}>+ Ajouter une université</Button>
      </div>

      <div className="overflow-x-auto rounded-3xl bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-neutral-100 text-xs uppercase tracking-wide text-neutral-400">
              <th className="px-6 py-3 font-medium">Nom</th>
              <th className="px-6 py-3 font-medium">Ville</th>
              <th className="px-6 py-3 font-medium">Type</th>
              <th className="px-6 py-3 font-medium">Site web</th>
              <th className="px-6 py-3 font-medium">Programmes</th>
            </tr>
          </thead>
          <tbody>
            {universities.map((u) => (
              <tr key={u.id} className="border-b border-neutral-50 last:border-0 hover:bg-neutral-50">
                <td className="px-6 py-3">
                  <Link to={`/admin/universities/${u.id}`} className="font-semibold hover:text-brandCta">
                    {u.name.fr}
                  </Link>
                </td>
                <td className="px-6 py-3 text-neutral-500">{u.city ?? '—'}</td>
                <td className="px-6 py-3 text-neutral-500">{u.type ?? '—'}</td>
                <td className="px-6 py-3 text-neutral-500">{u.website ?? '—'}</td>
                <td className="px-6 py-3 text-neutral-500">{u.programCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {!loading && universities.length === 0 && <p className="p-6 text-neutral-500">Aucune université pour le moment.</p>}
      </div>

      {showModal && (
        <Modal title="Ajouter une université" onClose={() => setShowModal(false)}>
          <form onSubmit={handleSubmit} className="space-y-3">
            <TextField label="Nom (FR)" value={form.nameFr} onChange={(e) => setForm({ ...form, nameFr: e.target.value })} required />
            <TextField label="Ville" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
            <TextField label="Type" placeholder="Publique, Privée, Grande École..." value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} />
            <TextField label="Site web" value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} />
            {error && <p className="text-sm text-red-600">{error}</p>}
            <Button type="submit" disabled={submitting} className="w-full">
              Créer l'université
            </Button>
          </form>
        </Modal>
      )}
    </div>
  );
}
