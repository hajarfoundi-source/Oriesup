import { Outlet, useParams } from 'react-router-dom';
import { AppShell } from '../../components/AppShell';
import { useBrand } from '../../theme/BrandProvider';
import { SchoolLogo } from '../../components/SchoolLogo';

export function SchoolLayout() {
  const { schoolSlug } = useParams<{ schoolSlug: string }>();
  const { school } = useBrand();
  const base = `/s/${schoolSlug}/school`;

  return (
    <AppShell
      brandLabel={school?.name ?? '...'}
      logo={school ? <SchoolLogo logoUrl={school.logoUrl} name={school.name} size={36} /> : undefined}
      navItems={[
        { to: base, label: 'Tableau de bord' },
        { to: `${base}/students`, label: 'Élèves' },
        { to: `${base}/invites`, label: 'Invitations' },
        { to: `${base}/branding`, label: 'Personnalisation' },
      ]}
    >
      <Outlet />
    </AppShell>
  );
}
