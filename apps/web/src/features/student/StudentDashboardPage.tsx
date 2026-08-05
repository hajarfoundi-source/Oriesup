import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { AnnouncementsSection } from '../../components/AnnouncementsSection';
import { ServicesSection } from './dashboard/ServicesSection';
import { UniversitiesSection } from './dashboard/UniversitiesSection';
import { useProfileComplete } from './useProfileComplete';

export function StudentDashboardPage() {
  const { schoolSlug } = useParams<{ schoolSlug: string }>();
  const { t } = useTranslation();
  const profileComplete = useProfileComplete();

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <h1 className="text-2xl font-bold">{t('nav.dashboard')}</h1>

      {profileComplete === false && (
        <Card className="border-2 border-brandCta bg-brandCta/5">
          <p className="font-semibold">Complète ton profil pour pouvoir t'inscrire aux services.</p>
          <p className="mt-1 text-sm text-neutral-600">
            Informations personnelles, scolarité, langues, tests d'admission et programme souhaité.
          </p>
          <Link to={`/s/${schoolSlug}/student/profile`}>
            <Button className="mt-4">Compléter mon profil</Button>
          </Link>
        </Card>
      )}

      <ServicesSection />

      <AnnouncementsSection serviceBasePath={`/s/${schoolSlug}/student`} />

      <UniversitiesSection />

      <Card className="max-w-lg text-center">
        <h2 className="mb-2 text-xl font-bold">{t('landing.title')}</h2>
        <p className="mb-6 text-neutral-600">{t('landing.subtitle')}</p>
        <Link to={`/s/${schoolSlug}/student/test`}>
          <Button>{t('riasec.start')}</Button>
        </Link>
      </Card>
    </div>
  );
}
