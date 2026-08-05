import { useEffect, useState, type FormEvent } from 'react';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { db } from '../../lib/firebaseClient';
import { Card } from '../../components/Card';
import { TextField } from '../../components/TextField';
import { TextAreaField } from '../../components/TextAreaField';
import { SelectField } from '../../components/SelectField';
import { Button } from '../../components/Button';
import { Modal } from '../../components/Modal';
import { createService, updateService, createForm, updateForm } from '../../lib/api';
import {
  FORM_CATEGORIES,
  type FormCategory,
  type FormDoc,
  type FormFieldDef,
  type FormFieldType,
  type ServiceDoc,
  type UniversityDoc,
} from '@oriesup/shared-types';

interface ServiceRow extends ServiceDoc {
  id: string;
}
interface UniversityRow extends UniversityDoc {
  id: string;
}
interface FormRow extends FormDoc {
  id: string;
}

const CATEGORY_LABEL: Record<FormCategory, string> = {
  university_application: 'Candidature universitaire',
  scholarship_application: 'Candidature à une bourse',
  language_test_prep: 'Préparation test de langue',
  other: 'Autre',
};

const FIELD_TYPE_LABEL: Record<FormFieldType, string> = {
  text: 'Texte court',
  textarea: 'Texte long',
  select: 'Liste déroulante',
  date: 'Date',
};

function newField(): FormFieldDef {
  return { id: crypto.randomUUID(), label: '', type: 'text', required: true };
}

function linesOf(text: string) {
  return text
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => ({ fr: line }));
}

export function ServicesPage() {
  const [services, setServices] = useState<ServiceRow[]>([]);
  const [universities, setUniversities] = useState<UniversityRow[]>([]);
  const [modalMode, setModalMode] = useState<'create' | ServiceRow | null>(null);

  async function refresh() {
    const [servicesSnap, universitiesSnap] = await Promise.all([
      getDocs(query(collection(db, 'services'))),
      getDocs(query(collection(db, 'universities'), orderBy('name'))),
    ]);
    setServices(servicesSnap.docs.map((d) => ({ id: d.id, ...(d.data() as ServiceDoc) })));
    setUniversities(universitiesSnap.docs.map((d) => ({ id: d.id, ...(d.data() as UniversityDoc) })));
  }

  useEffect(() => {
    refresh();
  }, []);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Services</h1>
        <Button onClick={() => setModalMode('create')}>+ Ajouter un service</Button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {services.map((s) => (
          <button key={s.id} type="button" onClick={() => setModalMode(s)} className="text-left">
            <Card className="transition hover:shadow-md">
              <div className="flex items-center justify-between">
                <p className="font-semibold">{s.name.fr}</p>
                <p className="font-display font-bold text-brandCta">
                  {s.price} {s.currency}
                </p>
              </div>
              <p className="mt-1 text-sm text-neutral-500">{s.description.fr}</p>
              <p className="mt-2 text-xs text-neutral-400">{s.universityIds.length} université(s) incluse(s)</p>
            </Card>
          </button>
        ))}
        {services.length === 0 && <p className="text-neutral-500">Aucun service pour le moment.</p>}
      </div>

      {modalMode && (
        <ServiceModal
          service={modalMode === 'create' ? null : modalMode}
          universities={universities}
          onClose={() => setModalMode(null)}
          onSaved={() => {
            setModalMode(null);
            refresh();
          }}
        />
      )}
    </div>
  );
}

function ServiceModal({
  service,
  universities,
  onClose,
  onSaved,
}: {
  service: ServiceRow | null;
  universities: UniversityRow[];
  onClose: () => void;
  onSaved: () => void;
}) {
  const [form, setForm] = useState({
    nameFr: service?.name.fr ?? '',
    descriptionFr: service?.description.fr ?? '',
    processFr: (service?.process ?? []).map((p) => p.fr).join('\n'),
    advantagesFr: (service?.advantages ?? []).map((a) => a.fr).join('\n'),
    notesFr: service?.notes.fr ?? '',
    price: service ? String(service.price) : '',
    currency: service?.currency ?? 'MAD',
  });
  const [selectedUniversities, setSelectedUniversities] = useState<string[]>(service?.universityIds ?? []);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  function toggleUniversity(id: string) {
    setSelectedUniversities((prev) => (prev.includes(id) ? prev.filter((u) => u !== id) : [...prev, id]));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const payload = {
        name: { fr: form.nameFr },
        description: { fr: form.descriptionFr },
        process: linesOf(form.processFr),
        advantages: linesOf(form.advantagesFr),
        notes: { fr: form.notesFr },
        price: Number(form.price),
        currency: form.currency,
        universityIds: selectedUniversities,
      };
      if (service) {
        await updateService({ serviceId: service.id, ...payload });
      } else {
        await createService(payload);
      }
      onSaved();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Modal title={service ? 'Modifier le service' : 'Ajouter un service'} onClose={onClose} wide>
      <form onSubmit={handleSubmit} className="space-y-3">
        <TextField label="Nom (FR)" value={form.nameFr} onChange={(e) => setForm({ ...form, nameFr: e.target.value })} required />
        <TextField label="Description (FR)" value={form.descriptionFr} onChange={(e) => setForm({ ...form, descriptionFr: e.target.value })} required />
        <TextAreaField label="Étapes du processus (FR)" hint="Une étape par ligne" value={form.processFr} onChange={(e) => setForm({ ...form, processFr: e.target.value })} />
        <TextAreaField label="Avantages (FR)" hint="Un avantage par ligne" value={form.advantagesFr} onChange={(e) => setForm({ ...form, advantagesFr: e.target.value })} />
        <TextAreaField label="Notes (FR)" value={form.notesFr} onChange={(e) => setForm({ ...form, notesFr: e.target.value })} rows={2} />
        <div className="grid grid-cols-2 gap-3">
          <TextField label="Prix" type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required />
          <TextField label="Devise" value={form.currency} onChange={(e) => setForm({ ...form, currency: e.target.value })} required />
        </div>
        <div>
          <p className="mb-2 text-sm font-medium text-neutral-700">Universités incluses</p>
          <div className="max-h-40 space-y-1 overflow-y-auto rounded-xl border border-neutral-200 p-2">
            {universities.map((u) => (
              <label key={u.id} className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={selectedUniversities.includes(u.id)} onChange={() => toggleUniversity(u.id)} />
                {u.name.fr}
              </label>
            ))}
            {universities.length === 0 && <p className="text-xs text-neutral-400">Ajoutez d'abord des universités.</p>}
          </div>
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <Button type="submit" disabled={submitting} className="w-full">
          {service ? 'Enregistrer' : 'Créer le service'}
        </Button>
      </form>

      {service && <ServiceFormSection serviceId={service.id} />}
    </Modal>
  );
}

function ServiceFormSection({ serviceId }: { serviceId: string }) {
  const [existingForm, setExistingForm] = useState<FormRow | null>(null);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState<FormCategory>('university_application');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [active, setActive] = useState(true);
  const [fields, setFields] = useState<FormFieldDef[]>([newField()]);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    (async () => {
      const snap = await getDocs(query(collection(db, 'forms'), where('serviceId', '==', serviceId)));
      if (!snap.empty) {
        const d = snap.docs[0];
        const data = d.data() as FormDoc;
        setExistingForm({ id: d.id, ...data });
        setCategory(data.category);
        setTitle(data.title);
        setDescription(data.description);
        setActive(data.active);
        setFields(data.fields.length > 0 ? data.fields : [newField()]);
      }
      setLoading(false);
    })();
  }, [serviceId]);

  function updateField(index: number, patch: Partial<FormFieldDef>) {
    setFields((prev) => prev.map((f, i) => (i === index ? { ...f, ...patch } : f)));
  }

  function removeField(index: number) {
    setFields((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSave() {
    setError(null);
    setSaved(false);
    setSubmitting(true);
    try {
      const payload = {
        category,
        title,
        description,
        fields: fields.map((f) => ({ ...f, options: f.type === 'select' ? (f.options ?? []).filter(Boolean) : undefined })),
      };
      if (existingForm) {
        await updateForm({ formId: existingForm.id, ...payload, active });
      } else {
        const res = await createForm({ serviceId, ...payload });
        setExistingForm({ id: res.formId, ...payload, active: true, createdAt: Date.now() } as FormRow);
      }
      setSaved(true);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) return null;

  return (
    <div className="mt-6 border-t border-neutral-100 pt-6">
      <h3 className="mb-1 text-base font-bold">Formulaire associé</h3>
      <p className="mb-4 text-xs text-neutral-500">
        Débloqué automatiquement dès qu'un élève accède à ce service. Il peut le remplir depuis sa page de service.
      </p>

      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <SelectField label="Catégorie" value={category} onChange={(e) => setCategory(e.target.value as FormCategory)}>
            {FORM_CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {CATEGORY_LABEL[c]}
              </option>
            ))}
          </SelectField>
          <label className="mt-6 flex items-center gap-1.5 text-sm">
            <input type="checkbox" checked={active} onChange={(e) => setActive(e.target.checked)} />
            Formulaire actif
          </label>
        </div>
        <TextField label="Titre" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <TextAreaField label="Description" value={description} onChange={(e) => setDescription(e.target.value)} rows={2} />

        <div>
          <p className="mb-2 text-sm font-medium text-neutral-700">Champs du formulaire</p>
          <div className="space-y-3">
            {fields.map((field, i) => (
              <div key={field.id} className="space-y-2 rounded-xl border border-neutral-200 p-3">
                <div className="flex items-center gap-2">
                  <div className="flex-1">
                    <TextField label="Libellé" value={field.label} onChange={(e) => updateField(i, { label: e.target.value })} required />
                  </div>
                  <button type="button" onClick={() => removeField(i)} className="mt-6 flex-shrink-0 text-sm text-neutral-400 hover:text-red-600" aria-label="Retirer ce champ">
                    ✕
                  </button>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <SelectField label="Type" value={field.type} onChange={(e) => updateField(i, { type: e.target.value as FormFieldType })}>
                      {(Object.keys(FIELD_TYPE_LABEL) as FormFieldType[]).map((t) => (
                        <option key={t} value={t}>
                          {FIELD_TYPE_LABEL[t]}
                        </option>
                      ))}
                    </SelectField>
                  </div>
                  <label className="mt-6 flex items-center gap-1.5 text-sm">
                    <input type="checkbox" checked={field.required} onChange={(e) => updateField(i, { required: e.target.checked })} />
                    Obligatoire
                  </label>
                </div>
                {field.type === 'select' && (
                  <TextAreaField
                    label="Options"
                    hint="Une option par ligne"
                    value={(field.options ?? []).join('\n')}
                    onChange={(e) => updateField(i, { options: e.target.value.split('\n') })}
                    rows={2}
                  />
                )}
              </div>
            ))}
          </div>
          <Button type="button" variant="ghost" onClick={() => setFields((prev) => [...prev, newField()])} className="mt-3 border border-dashed border-neutral-300">
            + Ajouter un champ
          </Button>
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}
        {saved && !error && <p className="text-sm text-green-700">Formulaire enregistré.</p>}
        <Button type="button" onClick={handleSave} disabled={submitting} className="w-full">
          {existingForm ? 'Enregistrer le formulaire' : 'Créer le formulaire'}
        </Button>
      </div>
    </div>
  );
}
