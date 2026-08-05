import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../lib/firebaseClient';
import { Card } from '../../../components/Card';
import { resolveLocalizedText, type Locale, type ServiceDoc } from '@oriesup/shared-types';

interface ServiceRow extends ServiceDoc {
  id: string;
}

export function ServicesSection() {
  const { schoolSlug } = useParams<{ schoolSlug: string }>();
  const { t, i18n } = useTranslation();
  const [services, setServices] = useState<ServiceRow[]>([]);

  useEffect(() => {
    (async () => {
      const snap = await getDocs(collection(db, 'services'));
      setServices(
        snap.docs
          .map((d) => ({ id: d.id, ...(d.data() as ServiceDoc) }))
          .filter((s) => s.active)
      );
    })();
  }, []);

  if (services.length === 0) return null;

  return (
    <section>
      <h2 className="mb-3 text-lg font-bold">{t('student.services.sectionTitle')}</h2>
      <div className="space-y-3">
        {services.map((s) => (
          <Link key={s.id} to={`/s/${schoolSlug}/student/services/${s.id}`}>
            <Card className="flex items-center justify-between gap-4 transition hover:shadow-md">
              <div>
                <p className="font-semibold">{resolveLocalizedText(s.name, i18n.language as Locale)}</p>
                <p className="text-sm text-neutral-500">{resolveLocalizedText(s.description, i18n.language as Locale)}</p>
              </div>
              <div className="flex flex-shrink-0 items-center gap-3">
                <p className="font-display font-bold text-brandCta">
                  {s.price} {s.currency}
                </p>
                <span className="inline-flex items-center justify-center rounded-full bg-brandCta px-6 py-3 font-display text-sm font-semibold text-white shadow-sm">
                  {t('student.services.viewDetails')}
                </span>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
