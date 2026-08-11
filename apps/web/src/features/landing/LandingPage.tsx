import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from '../../components/LanguageSwitcher';
import { Button } from '../../components/Button';
import { Logo } from '../../components/Logo';

export function LandingPage() {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen">
      <header className="flex items-center justify-between px-6 py-5">
        <Logo className="h-16 w-auto" />
        <LanguageSwitcher />
      </header>
      <main className="mx-auto flex max-w-3xl flex-col items-center px-6 py-24 text-center">
        <h1 className="text-4xl font-bold text-neutral-900 sm:text-5xl">{t('landing.title')}</h1>
        <p className="mt-6 max-w-xl text-lg text-neutral-600">{t('landing.subtitle')}</p>
        <Button className="mt-10 text-base" variant="cta">
          {t('landing.cta')}
        </Button>
      </main>
    </div>
  );
}
