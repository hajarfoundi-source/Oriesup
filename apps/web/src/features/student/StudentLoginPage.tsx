import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LoginForm } from '../auth/LoginForm';
import { useBrand } from '../../theme/BrandProvider';
import { SchoolLogo } from '../../components/SchoolLogo';

export function StudentLoginPage() {
  const { schoolSlug } = useParams<{ schoolSlug: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { school } = useBrand();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-4">
      {school && <SchoolLogo logoUrl={school.logoUrl} name={school.name} size={72} />}
      <LoginForm title={school?.name ?? t('auth.login')} onSuccess={() => navigate(`/s/${schoolSlug}/student`)} />
    </div>
  );
}
