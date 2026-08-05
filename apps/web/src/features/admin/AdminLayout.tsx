import { Outlet } from 'react-router-dom';
import { AppShell } from '../../components/AppShell';

export function AdminLayout() {
  return (
    <AppShell
      brandLabel="Oriesup Admin"
      navItems={[
        { to: '/admin', label: 'Dashboard' },
        { to: '/admin/schools', label: 'Écoles' },
        { to: '/admin/students', label: 'Élèves' },
        { to: '/admin/services', label: 'Services' },
        { to: '/admin/universities', label: 'Universités' },
        { to: '/admin/payments', label: 'Paiements' },
        { to: '/admin/announcements', label: 'Annonces' },
      ]}
    >
      <Outlet />
    </AppShell>
  );
}
