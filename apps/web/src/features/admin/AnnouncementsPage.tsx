import { useEffect, useState, type FormEvent } from 'react';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { db, storage } from '../../lib/firebaseClient';
import { Card } from '../../components/Card';
import { TextField } from '../../components/TextField';
import { TextAreaField } from '../../components/TextAreaField';
import { SelectField } from '../../components/SelectField';
import { Button } from '../../components/Button';
import { createAnnouncement } from '../../lib/api';
import type { AnnouncementDoc, ServiceDoc } from '@oriesup/shared-types';

interface AnnouncementRow extends AnnouncementDoc {
  id: string;
}
interface ServiceRow extends ServiceDoc {
  id: string;
}

export function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<AnnouncementRow[]>([]);
  const [services, setServices] = useState<ServiceRow[]>([]);
  const [form, setForm] = useState({ titleFr: '', bodyFr: '', linkedServiceId: '' });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function refresh() {
    const [announcementsSnap, servicesSnap] = await Promise.all([
      getDocs(query(collection(db, 'announcements'), orderBy('createdAt', 'desc'))),
      getDocs(collection(db, 'services')),
    ]);
    setAnnouncements(announcementsSnap.docs.map((d) => ({ id: d.id, ...(d.data() as AnnouncementDoc) })));
    setServices(servicesSnap.docs.map((d) => ({ id: d.id, ...(d.data() as ServiceDoc) })));
  }

  useEffect(() => {
    refresh();
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      let imageUrl: string | undefined;
      if (imageFile) {
        const storageRef = ref(storage, `announcementImages/${crypto.randomUUID()}-${imageFile.name}`);
        await uploadBytes(storageRef, imageFile);
        imageUrl = await getDownloadURL(storageRef);
      }
      await createAnnouncement({
        title: { fr: form.titleFr },
        body: { fr: form.bodyFr },
        imageUrl,
        linkedServiceId: form.linkedServiceId || undefined,
      });
      setForm({ titleFr: '', bodyFr: '', linkedServiceId: '' });
      setImageFile(null);
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
        <h1 className="mb-6 text-2xl font-bold">Annonces</h1>
        <div className="space-y-3">
          {announcements.map((a) => (
            <Card key={a.id} className="overflow-hidden !p-0">
              {a.imageUrl && <img src={a.imageUrl} alt={a.title.fr} className="h-40 w-full object-cover" />}
              <div className="p-6">
                <p className="font-semibold">{a.title.fr}</p>
                <p className="mt-1 text-sm text-neutral-500">{a.body.fr}</p>
                {a.linkedServiceId && (
                  <p className="mt-2 text-xs font-medium text-brandCta">
                    Lié à : {services.find((s) => s.id === a.linkedServiceId)?.name.fr ?? a.linkedServiceId}
                  </p>
                )}
              </div>
            </Card>
          ))}
          {announcements.length === 0 && <p className="text-neutral-500">Aucune annonce pour le moment.</p>}
        </div>
      </div>

      <Card className="h-fit">
        <h2 className="mb-4 text-lg font-bold">Publier une annonce</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <TextField label="Titre (FR)" value={form.titleFr} onChange={(e) => setForm({ ...form, titleFr: e.target.value })} required />
          <TextAreaField label="Message (FR)" value={form.bodyFr} onChange={(e) => setForm({ ...form, bodyFr: e.target.value })} required />
          <label className="block text-sm">
            <span className="mb-1 block font-medium text-neutral-700">Image (optionnel)</span>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
              className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm"
            />
          </label>
          <SelectField label="Lier à un service (optionnel)" value={form.linkedServiceId} onChange={(e) => setForm({ ...form, linkedServiceId: e.target.value })}>
            <option value="">Aucun</option>
            {services.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name.fr}
              </option>
            ))}
          </SelectField>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <Button type="submit" disabled={submitting} className="w-full">
            {submitting ? '...' : 'Publier'}
          </Button>
        </form>
      </Card>
    </div>
  );
}
