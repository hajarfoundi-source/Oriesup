import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../lib/firebaseClient';
import { Card } from '../../../components/Card';
import { resolveLocalizedText, type Locale, type UniversityDoc } from '@oriesup/shared-types';

interface UniversityRow extends UniversityDoc {
  id: string;
}

export function UniversitiesSection() {
  const { t, i18n } = useTranslation();
  const [universities, setUniversities] = useState<UniversityRow[]>([]);

  useEffect(() => {
    (async () => {
      const snap = await getDocs(collection(db, 'universities'));
      setUniversities(snap.docs.map((d) => ({ id: d.id, ...(d.data() as UniversityDoc) })));
    })();
  }, []);

  if (universities.length === 0) return null;

  return (
    <section>
      <h2 className="mb-3 text-lg font-bold">{t('student.universities.sectionTitle')}</h2>
      <div className="grid grid-cols-2 gap-3">
        {universities.map((u) => (
          <Card key={u.id} className="flex items-center gap-3">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-brandPrimary font-display font-bold text-white">
              {resolveLocalizedText(u.name, i18n.language as Locale).slice(0, 2).toUpperCase()}
            </div>
            <div>
              <p className="font-semibold">{resolveLocalizedText(u.name, i18n.language as Locale)}</p>
              {u.city && <p className="text-sm text-neutral-500">{u.city}</p>}
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
