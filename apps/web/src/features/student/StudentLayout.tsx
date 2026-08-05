import { Outlet, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AppShell } from '../../components/AppShell';
import { CartIcon } from '../../components/CartIcon';
import { useBrand } from '../../theme/BrandProvider';
import { SchoolLogo } from '../../components/SchoolLogo';
import { CartProvider } from './cart/CartContext';

export function StudentLayout() {
  const { schoolSlug } = useParams<{ schoolSlug: string }>();
  const { school } = useBrand();
  const { t } = useTranslation();
  const base = `/s/${schoolSlug}/student`;

  return (
    <CartProvider>
      <AppShell
        brandLabel={school?.name ?? '...'}
        logo={school ? <SchoolLogo logoUrl={school.logoUrl} name={school.name} size={36} /> : undefined}
        topBarRight={<CartIcon />}
        navItems={[
          { to: base, label: t('nav.dashboard') },
          { to: `${base}/profile`, label: t('nav.profile') },
          { to: `${base}/purchases`, label: t('nav.purchases') },
          { to: `${base}/test`, label: t('nav.test') },
          { to: `${base}/results`, label: t('nav.results') },
        ]}
      >
        <Outlet />
      </AppShell>
    </CartProvider>
  );
}
