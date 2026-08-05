import { useState, type FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Card } from '../../components/Card';
import { TextField } from '../../components/TextField';
import { Button } from '../../components/Button';
import { SchoolLogo } from '../../components/SchoolLogo';
import { useBrand } from '../../theme/BrandProvider';
import { useAuth } from '../auth/AuthContext';
import { activateStudentAccount } from '../../lib/api';

export function ActivatePage() {
  const { schoolSlug, token } = useParams<{ schoolSlug: string; token: string }>();
  const { school } = useBrand();
  const { loginWithCustomToken } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [form, setForm] = useState({ email: '', newPassword: '' });
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!token) return;
    setError(null);
    setSubmitting(true);
    try {
      const result = await activateStudentAccount({ activationToken: token, email: form.email, newPassword: form.newPassword });
      await loginWithCustomToken(result.customToken);
      navigate(`/s/${schoolSlug}/student`);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-4">
      {school && <SchoolLogo logoUrl={school.logoUrl} name={school.name} size={72} />}
      <Card className="w-full max-w-sm">
        <h1 className="mb-2 text-center text-xl font-bold">{t('student.activate.title')}</h1>
        <p className="mb-6 text-center text-sm text-neutral-500">{t('student.activate.subtitle')}</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <TextField label={t('auth.email')} type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          <TextField label={t('student.activate.newPassword')} type="password" value={form.newPassword} onChange={(e) => setForm({ ...form, newPassword: e.target.value })} required />
          {error && <p className="text-sm text-red-600">{error}</p>}
          <Button type="submit" disabled={submitting} className="w-full">
            {t('student.activate.submit')}
          </Button>
        </form>
      </Card>
    </div>
  );
}
