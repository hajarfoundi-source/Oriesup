import { useNavigate } from 'react-router-dom';
import { LoginForm } from '../auth/LoginForm';

export function AdminLoginPage() {
  const navigate = useNavigate();
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <LoginForm title="Oriesup Admin" onSuccess={() => navigate('/admin')} />
    </div>
  );
}
