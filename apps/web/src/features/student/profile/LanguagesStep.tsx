import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TextField } from '../../../components/TextField';
import { SelectField } from '../../../components/SelectField';
import { Button } from '../../../components/Button';
import { LANGUAGE_LEVELS, LANGUAGE_PROFICIENCY_TESTS, OTHER_TEST_OPTION, type LanguageTestResult } from '@oriesup/shared-types';

const LANGUAGES = Object.keys(LANGUAGE_PROFICIENCY_TESTS);

export function LanguagesStep({
  value,
  onChange,
}: {
  value: LanguageTestResult[];
  onChange: (value: LanguageTestResult[]) => void;
}) {
  const { t } = useTranslation();
  const [otherMode, setOtherMode] = useState<Record<string, boolean>>({});

  function toggleLanguage(language: string, checked: boolean) {
    if (checked) {
      onChange([...value, { language, testTaken: false }]);
    } else {
      onChange(value.filter((l) => l.language !== language || l.isCustom));
    }
  }

  function updateLanguage(language: string, patch: Partial<LanguageTestResult>) {
    onChange(value.map((l) => (l.language === language && !l.isCustom ? { ...l, ...patch } : l)));
  }

  function handleTestSelect(language: string, selected: string) {
    if (selected === OTHER_TEST_OPTION) {
      setOtherMode((m) => ({ ...m, [language]: true }));
      updateLanguage(language, { testName: '' });
    } else {
      setOtherMode((m) => ({ ...m, [language]: false }));
      updateLanguage(language, { testName: selected });
    }
  }

  function addCustomLanguage() {
    onChange([...value, { language: '', isCustom: true, level: LANGUAGE_LEVELS[0], testTaken: false }]);
  }

  function updateCustomLanguage(entry: LanguageTestResult, patch: Partial<LanguageTestResult>) {
    const idx = value.indexOf(entry);
    if (idx === -1) return;
    const next = [...value];
    next[idx] = { ...entry, ...patch };
    onChange(next);
  }

  function removeCustomLanguage(entry: LanguageTestResult) {
    onChange(value.filter((l) => l !== entry));
  }

  const customEntries = value.filter((l) => l.isCustom);

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold">{t('profile.languages.title')}</h2>
      <p className="text-sm text-neutral-500">{t('profile.languages.subtitle')}</p>

      <div className="space-y-3">
        {LANGUAGES.map((language) => {
          const entry = value.find((l) => l.language === language && !l.isCustom);
          const checked = Boolean(entry);
          const isOther = otherMode[language];
          return (
            <div key={language} className="rounded-xl border border-neutral-200 p-4">
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={checked} onChange={(e) => toggleLanguage(language, e.target.checked)} className="h-4 w-4" />
                <span className="text-sm font-medium">{language}</span>
              </label>

              {entry && (
                <div className="mt-3 space-y-3 ps-6">
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={!entry.testTaken}
                      onChange={(e) => updateLanguage(language, { testTaken: !e.target.checked, testName: undefined, score: undefined })}
                      className="h-4 w-4"
                    />
                    {t('profile.languages.noTestTaken')}
                  </label>

                  {entry.testTaken && (
                    <div className="grid grid-cols-2 gap-3">
                      <SelectField
                        label={t('profile.languages.testTakenLabel')}
                        value={isOther ? OTHER_TEST_OPTION : entry.testName ?? ''}
                        onChange={(e) => handleTestSelect(language, e.target.value)}
                        required
                      >
                        <option value="">{t('common.select')}</option>
                        {LANGUAGE_PROFICIENCY_TESTS[language].map((test) => (
                          <option key={test} value={test}>
                            {test}
                          </option>
                        ))}
                        <option value={OTHER_TEST_OPTION}>{OTHER_TEST_OPTION}</option>
                      </SelectField>
                      <TextField label={t('profile.languages.score')} value={entry.score ?? ''} onChange={(e) => updateLanguage(language, { score: e.target.value })} required />
                    </div>
                  )}

                  {entry.testTaken && isOther && (
                    <TextField
                      label={t('profile.languages.testName')}
                      value={entry.testName ?? ''}
                      onChange={(e) => updateLanguage(language, { testName: e.target.value })}
                      required
                    />
                  )}

                  {!entry.testTaken && (
                    <button
                      type="button"
                      onClick={() => updateLanguage(language, { testTaken: true })}
                      className="text-xs font-medium text-brandCta"
                    >
                      {t('profile.languages.actuallyTookTest')}
                    </button>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="space-y-3 border-t border-neutral-100 pt-4">
        <p className="text-sm font-medium text-neutral-700">{t('profile.languages.otherLanguageTitle')}</p>
        {customEntries.map((entry, i) => (
          <div key={i} className="space-y-3 rounded-xl border border-neutral-200 p-4">
            <div className="flex items-start gap-3">
              <div className="grid flex-1 grid-cols-2 gap-3">
                <TextField
                  label={t('profile.languages.languageLabel')}
                  value={entry.language}
                  onChange={(e) => updateCustomLanguage(entry, { language: e.target.value })}
                  required
                />
                <SelectField
                  label={t('profile.languages.level')}
                  value={entry.level ?? ''}
                  onChange={(e) => updateCustomLanguage(entry, { level: e.target.value })}
                  required
                >
                  {LANGUAGE_LEVELS.map((lvl) => (
                    <option key={lvl} value={lvl}>
                      {lvl}
                    </option>
                  ))}
                </SelectField>
              </div>
              <button
                type="button"
                onClick={() => removeCustomLanguage(entry)}
                className="mt-6 text-sm text-neutral-400 hover:text-red-600"
                aria-label={t('profile.languages.removeLanguage')}
              >
                ✕
              </button>
            </div>

            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={entry.testTaken}
                onChange={(e) => updateCustomLanguage(entry, { testTaken: e.target.checked, testName: undefined, score: undefined })}
                className="h-4 w-4"
              />
              {t('profile.languages.customTestTaken')}
            </label>

            {entry.testTaken && (
              <div className="grid grid-cols-2 gap-3">
                <TextField
                  label={t('profile.languages.testName')}
                  value={entry.testName ?? ''}
                  onChange={(e) => updateCustomLanguage(entry, { testName: e.target.value })}
                  required
                />
                <TextField label={t('profile.languages.score')} value={entry.score ?? ''} onChange={(e) => updateCustomLanguage(entry, { score: e.target.value })} required />
              </div>
            )}
          </div>
        ))}
        <Button type="button" variant="ghost" onClick={addCustomLanguage} className="border border-dashed border-neutral-300">
          {t('profile.languages.addLanguage')}
        </Button>
      </div>
    </div>
  );
}

export function isLanguagesStepComplete(v: LanguageTestResult[]): boolean {
  if (v.length === 0) return false;
  return v.every((l) => {
    if (l.isCustom && (!l.language || !l.level)) return false;
    return !l.testTaken || (l.testName && l.score);
  });
}
