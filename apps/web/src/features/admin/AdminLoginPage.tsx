import { useNavigate } from 'react-router-dom';
import { LoginForm } from '../auth/LoginForm';
import { Logo } from '../../components/Logo';

export function AdminLoginPage() {
  const navigate = useNavigate();
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-4">
      <Logo className="h-24 w-auto" />
      <LoginForm title="Admin" onSuccess={() => navigate('/admin')} />
    </div>
  );
}
