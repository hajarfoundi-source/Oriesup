import { useEffect, useState, type FormEvent } from 'react';
import { Link, useParams } from 'react-router-dom';
import { collection, doc, getDoc, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../../lib/firebaseClient';
import { Card } from '../../components/Card';
import { TextField } from '../../components/TextField';
import { Button } from '../../components/Button';
import { Modal } from '../../components/Modal';
import { createProgram } from '../../lib/api';
import type { ProgramDoc, RiasecDimension, UniversityDoc } from '@oriesup/shared-types';

interface ProgramRow extends ProgramDoc {
  id: string;
}

const RIASEC_DIMENSIONS: RiasecDimension[] = ['R', 'I', 'A', 'S', 'E', 'C'];

export function UniversityDetailPage() {
  const { universityId } = useParams<{ universityId: string }>();
  const [university, setUniversity] = useState<UniversityDoc | null>(null);
  const [programs, setPrograms] = useState<ProgramRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  async function refresh() {
    if (!universityId) return;
    const [universitySnap, programsSnap] = await Promise.all([
      getDoc(doc(db, 'universities', universityId)),
      getDocs(query(collection(db, 'universities', universityId, 'programs'), orderBy('name'))),
    ]);
    setUniversity(universitySnap.exists() ? (universitySnap.data() as UniversityDoc) : null);
    setPrograms(programsSnap.docs.map((d) => ({ id: d.id, ...(d.data() as ProgramDoc) })));
    setLoading(false);
  }

  useEffect(() => {
    refresh();
  }, [universityId]);

  if (loading) return <p className="text-neutral-500">Chargement...</p>;
  if (!university) return <p className="text-neutral-500">Université introuvable.</p>;

  return (
    <div className="space-y-6">
      <Link to="/admin/universities" className="text-sm text-neutral-500 hover:text-brandCta">
        ← Retour aux universités
      </Link>

      <Card className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{university.name.fr}</h1>
          <p className="mt-1 text-sm text-neutral-500">
            {[university.city, university.type].filter(Boolean).join(' · ') || '—'}
          </p>
        </div>
        {university.website && (
          <a href={university.website} target="_blank" rel="noreferrer" className="text-sm font-medium text-brandCta">
            Site web ↗
          </a>
        )}
      </Card>

      <div>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-bold">Programmes ({programs.length})</h2>
          <Button onClick={() => setShowModal(true)}>+ Ajouter un programme</Button>
        </div>

        <div className="overflow-x-auto rounded-3xl bg-white shadow-sm">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-neutral-100 text-xs uppercase tracking-wide text-neutral-400">
                <th className="px-6 py-3 font-medium">Nom</th>
                <th className="px-6 py-3 font-medium">Niveau</th>
                <th className="px-6 py-3 font-medium">Tags RIASEC</th>
              </tr>
            </thead>
            <tbody>
              {programs.map((p) => (
                <tr key={p.id} className="border-b border-neutral-50 last:border-0 hover:bg-neutral-50">
                  <td className="px-6 py-3">
                    <p className="font-semibold">{p.name.fr}</p>
                    <p className="text-xs text-neutral-500">{p.description.fr}</p>
                  </td>
                  <td className="px-6 py-3 text-neutral-500">{p.degreeLevel ?? '—'}</td>
                  <td className="px-6 py-3">
                    <div className="flex gap-1">
                      {p.riasecTags.map((t) => (
                        <span key={t} className="flex h-6 w-6 items-center justify-center rounded-full bg-brandPrimary/20 text-xs font-bold text-brandCta">
                          {t}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {programs.length === 0 && <p className="p-6 text-neutral-500">Aucun programme pour le moment.</p>}
        </div>
      </div>

      {showModal && universityId && (
        <AddProgramModal universityId={universityId} onClose={() => setShowModal(false)} onSaved={() => { setShowModal(false); refresh(); }} />
      )}
    </div>
  );
}

function AddProgramModal({ universityId, onClose, onSaved }: { universityId: string; onClose: () => void; onSaved: () => void }) {
  const [form, setForm] = useState({ nameFr: '', descriptionFr: '', degreeLevel: '' });
  const [tags, setTags] = useState<RiasecDimension[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  function toggleTag(tag: RiasecDimension) {
    setTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await createProgram({
        universityId,
        name: { fr: form.nameFr },
        description: { fr: form.descriptionFr },
        degreeLevel: form.degreeLevel || undefined,
        riasecTags: tags,
      });
      onSaved();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Modal title="Ajouter un programme" onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-3">
        <TextField label="Nom de la filière (FR)" value={form.nameFr} onChange={(e) => setForm({ ...form, nameFr: e.target.value })} required />
        <TextField label="Description (FR)" value={form.descriptionFr} onChange={(e) => setForm({ ...form, descriptionFr: e.target.value })} required />
        <TextField label="Niveau (ex: Licence, Master)" value={form.degreeLevel} onChange={(e) => setForm({ ...form, degreeLevel: e.target.value })} />
        <div>
          <p className="mb-2 text-sm font-medium text-neutral-700">Tags RIASEC</p>
          <div className="flex flex-wrap gap-2">
            {RIASEC_DIMENSIONS.map((d) => (
              <button
                type="button"
                key={d}
                onClick={() => toggleTag(d)}
                className={`h-9 w-9 rounded-full text-sm font-bold transition ${tags.includes(d) ? 'bg-brandCta text-white' : 'bg-black/5 text-neutral-500'}`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <Button type="submit" disabled={submitting} className="w-full">
          Créer le programme
        </Button>
      </form>
    </Modal>
  );
}
