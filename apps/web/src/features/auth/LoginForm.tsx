import { useState, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '../../components/Card';
import { TextField } from '../../components/TextField';
import { Button } from '../../components/Button';
import { useAuth } from './AuthContext';

export function LoginForm({ onSuccess, title }: { onSuccess: () => void; title: string }) {
  const { t } = useTranslation();
  const { loginWithPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await loginWithPassword(email, password);
      onSuccess();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Card className="w-full max-w-sm">
      <h1 className="mb-6 text-center text-xl font-bold">{title}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <TextField label={t('auth.email')} type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <TextField label={t('auth.password')} type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <Button type="submit" disabled={submitting} className="w-full">
          {t('auth.signIn')}
        </Button>
      </form>
    </Card>
  );
}
