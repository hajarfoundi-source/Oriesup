import { useEffect, useState, type FormEvent } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../lib/firebaseClient';
import { useAuth } from '../auth/AuthContext';
import { Card } from '../../components/Card';
import { TextField } from '../../components/TextField';
import { Button } from '../../components/Button';
import { SchoolLogo } from '../../components/SchoolLogo';
import { DEFAULT_BRANDING, type BrandingConfig, type SchoolDoc } from '@oriesup/shared-types';

export function BrandingPage() {
  const { schoolId } = useAuth();
  const [name, setName] = useState('');
  const [branding, setBranding] = useState<BrandingConfig>(DEFAULT_BRANDING);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!schoolId) return;
    (async () => {
      const snap = await getDoc(doc(db, 'schools', schoolId));
      if (snap.exists()) {
        const data = snap.data() as SchoolDoc;
        setName(data.name);
        setBranding(data.branding ?? DEFAULT_BRANDING);
      }
    })();
  }, [schoolId]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!schoolId) return;
    setError(null);
    try {
      await updateDoc(doc(db, 'schools', schoolId), { name, branding });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      setError((err as Error).message);
    }
  }

  return (
    <div className="grid grid-cols-2 gap-8">
      <div>
        <h1 className="mb-6 text-2xl font-bold">Personnalisation</h1>
        <Card className="flex flex-col items-center gap-4 py-10">
          <SchoolLogo logoUrl="" name={name || 'École'} size={96} />
          <p className="text-sm text-neutral-500">
            Logo temporaire (placeholder). Le téléversement du vrai logo sera activé prochainement.
          </p>
        </Card>
      </div>

      <Card className="h-fit">
        <h2 className="mb-4 text-lg font-bold">Couleurs & nom</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <TextField label="Nom de l'école" value={name} onChange={(e) => setName(e.target.value)} required />
          <div className="grid grid-cols-3 gap-3">
            <ColorField label="Fond" value={branding.bgColor} onChange={(v) => setBranding({ ...branding, bgColor: v })} />
            <ColorField label="Primaire" value={branding.primaryColor} onChange={(v) => setBranding({ ...branding, primaryColor: v })} />
            <ColorField label="Bouton (CTA)" value={branding.ctaColor} onChange={(v) => setBranding({ ...branding, ctaColor: v })} />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <Button type="submit" className="w-full">
            {saved ? 'Enregistré ✓' : 'Enregistrer'}
          </Button>
        </form>
      </Card>
    </div>
  );
}

function ColorField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block font-medium text-neutral-700">{label}</span>
      <div className="flex items-center gap-2">
        <input type="color" value={value} onChange={(e) => onChange(e.target.value)} className="h-9 w-9 rounded-lg border border-neutral-200" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-xl border border-neutral-200 px-2 py-1.5 text-xs"
        />
      </div>
    </label>
  );
}
