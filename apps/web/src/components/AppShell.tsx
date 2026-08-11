import type { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import { LanguageSwitcher } from './LanguageSwitcher';
import { NotificationBell } from './NotificationBell';
import { useAuth } from '../features/auth/AuthContext';
import { useTranslation } from 'react-i18next';

export interface NavItem {
  to: string;
  label: string;
}

export function AppShell({
  brandLabel,
  logo,
  navItems,
  topBarRight,
  children,
}: {
  brandLabel?: string;
  logo?: ReactNode;
  navItems: NavItem[];
  topBarRight?: ReactNode;
  children: ReactNode;
}) {
  const { user, logout } = useAuth();
  const { t } = useTranslation();

  return (
    <div className="min-h-screen">
      <div className="flex min-h-screen">
        <aside className="flex w-64 flex-shrink-0 flex-col gap-6 bg-white/90 p-6 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-2 text-center">
            {logo}
            {brandLabel && <span className="font-display font-bold text-neutral-800">{brandLabel}</span>}
          </div>
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end
                className={({ isActive }) =>
                  `rounded-xl px-4 py-2.5 text-sm font-medium transition ${
                    isActive ? 'bg-brandPrimary/20 text-brandCta' : 'text-neutral-600 hover:bg-black/5'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </aside>
        <main className="flex-1 overflow-y-auto">
          <div className="flex items-center justify-end gap-4 border-b border-black/5 bg-white/70 px-8 py-3 backdrop-blur-sm">
            {topBarRight}
            <NotificationBell />
            <LanguageSwitcher />
            <div className="flex items-center gap-3 border-l border-black/10 pl-4">
              {user?.email && <span className="text-sm text-neutral-500">{user.email}</span>}
              <button onClick={() => logout()} className="text-sm font-medium text-neutral-500 hover:text-neutral-700">
                {t('nav.logout')}
              </button>
            </div>
          </div>
          <div className="p-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
