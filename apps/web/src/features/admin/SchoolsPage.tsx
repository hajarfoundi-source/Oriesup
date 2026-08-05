import { useEffect, useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../../lib/firebaseClient';
import { TextField } from '../../components/TextField';
import { Button } from '../../components/Button';
import { Modal } from '../../components/Modal';
import { createSchool } from '../../lib/api';
import type { SchoolDoc } from '@oriesup/shared-types';

interface SchoolRow extends SchoolDoc {
  id: string;
}

export function SchoolsPage() {
  const [schools, setSchools] = useState<SchoolRow[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: '', slug: '', contactEmail: '', contactPassword: '', contactDisplayName: '' });
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function refresh() {
    const snap = await getDocs(query(collection(db, 'schools'), orderBy('createdAt', 'desc')));
    setSchools(snap.docs.map((d) => ({ id: d.id, ...(d.data() as SchoolDoc) })));
  }

  useEffect(() => {
    refresh();
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await createSchool(form);
      setForm({ name: '', slug: '', contactEmail: '', contactPassword: '', contactDisplayName: '' });
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
        <h1 className="text-2xl font-bold">Écoles</h1>
        <Button onClick={() => setShowModal(true)}>+ Ajouter une école</Button>
      </div>

      <div className="overflow-x-auto rounded-3xl bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-neutral-100 text-xs uppercase tracking-wide text-neutral-400">
              <th className="px-6 py-3 font-medium">Nom</th>
              <th className="px-6 py-3 font-medium">Slug</th>
              <th className="px-6 py-3 font-medium">Statut</th>
              <th className="px-6 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {schools.map((s) => (
              <tr key={s.id} className="border-b border-neutral-50 last:border-0 hover:bg-neutral-50">
                <td className="px-6 py-3">
                  <Link to={`/admin/schools/${s.id}`} className="font-semibold hover:text-brandCta">
                    {s.name}
                  </Link>
                </td>
                <td className="px-6 py-3 text-neutral-500">/s/{s.slug}</td>
                <td className="px-6 py-3">
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${s.active ? 'bg-green-100 text-green-700' : 'bg-neutral-100 text-neutral-500'}`}>
                    {s.active ? 'Actif' : 'Inactif'}
                  </span>
                </td>
                <td className="px-6 py-3 text-right">
                  <Link to={`/admin/schools/${s.id}`} className="text-sm font-medium text-brandCta">
                    Voir les élèves →
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {schools.length === 0 && <p className="p-6 text-neutral-500">Aucune école pour le moment.</p>}
      </div>

      {showModal && (
        <Modal title="Ajouter une école" onClose={() => setShowModal(false)}>
          <form onSubmit={handleSubmit} className="space-y-3">
            <TextField label="Nom de l'école" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            <TextField label="Slug (URL)" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} placeholder="lycee-exemple" required />
            <TextField label="Nom du contact" value={form.contactDisplayName} onChange={(e) => setForm({ ...form, contactDisplayName: e.target.value })} required />
            <TextField label="Email du contact" type="email" value={form.contactEmail} onChange={(e) => setForm({ ...form, contactEmail: e.target.value })} required />
            <TextField label="Mot de passe initial" type="password" value={form.contactPassword} onChange={(e) => setForm({ ...form, contactPassword: e.target.value })} required />
            {error && <p className="text-sm text-red-600">{error}</p>}
            <Button type="submit" disabled={submitting} className="w-full">
              Créer l'école
            </Button>
          </form>
        </Modal>
      )}
    </div>
  );
}
