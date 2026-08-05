import { useTranslation } from 'react-i18next';

const LANGUAGES: Array<{ code: 'fr' | 'ar' | 'en'; label: string }> = [
  { code: 'fr', label: 'FR' },
  { code: 'ar', label: 'AR' },
  { code: 'en', label: 'EN' },
];

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  return (
    <div className="inline-flex gap-1 rounded-full bg-black/5 p-1">
      {LANGUAGES.map((lang) => (
        <button
          key={lang.code}
          onClick={() => i18n.changeLanguage(lang.code)}
          className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
            i18n.language === lang.code ? 'bg-white shadow-sm text-brandCta' : 'text-neutral-500 hover:text-neutral-700'
          }`}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
}
