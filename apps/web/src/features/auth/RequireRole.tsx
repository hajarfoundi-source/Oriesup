import { Navigate } from 'react-router-dom';
import type { ReactNode } from 'react';
import { useAuth } from './AuthContext';
import type { Role } from '@oriesup/shared-types';

export function RequireRole({ roles, redirectTo, children }: { roles: Role[]; redirectTo: string; children: ReactNode }) {
  const { user, role, loading } = useAuth();

  if (loading) return <div className="p-8 text-center">…</div>;
  if (!user || !role || !roles.includes(role)) return <Navigate to={redirectTo} replace />;
  return <>{children}</>;
}
