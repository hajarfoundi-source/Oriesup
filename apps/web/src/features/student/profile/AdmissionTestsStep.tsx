import { useTranslation } from 'react-i18next';
import { TextField } from '../../../components/TextField';
import { ADMISSION_TESTS, type AdmissionTestResult } from '@oriesup/shared-types';

export function AdmissionTestsStep({
  value,
  noneTaken,
  onChange,
  onNoneTakenChange,
}: {
  value: AdmissionTestResult[];
  noneTaken: boolean;
  onChange: (value: AdmissionTestResult[]) => void;
  onNoneTakenChange: (noneTaken: boolean) => void;
}) {
  const { t } = useTranslation();

  function toggleTest(testName: string, checked: boolean) {
    if (checked) {
      onNoneTakenChange(false);
      onChange([...value, { testName }]);
    } else {
      onChange(value.filter((t) => t.testName !== testName));
    }
  }

  function updateScore(testName: string, score: string) {
    onChange(value.map((t) => (t.testName === testName ? { ...t, score } : t)));
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold">{t('profile.admissionTests.title')}</h2>
      <p className="text-sm text-neutral-500">{t('profile.admissionTests.subtitle')}</p>

      <div className="grid grid-cols-2 gap-3">
        {ADMISSION_TESTS.map((test) => {
          const entry = value.find((t) => t.testName === test);
          return (
            <div key={test} className={`rounded-xl border p-4 ${entry ? 'border-brandCta' : 'border-neutral-200'}`}>
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={Boolean(entry)} onChange={(e) => toggleTest(test, e.target.checked)} className="h-4 w-4" />
                <span className="text-sm font-medium">{test}</span>
              </label>
              {entry && (
                <div className="mt-3">
                  <TextField label={t('profile.languages.score')} value={entry.score ?? ''} onChange={(e) => updateScore(test, e.target.value)} required />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <label className="flex items-center gap-2 rounded-xl border border-neutral-200 p-4">
        <input
          type="checkbox"
          checked={noneTaken}
          onChange={(e) => {
            onNoneTakenChange(e.target.checked);
            if (e.target.checked) onChange([]);
          }}
          className="h-4 w-4"
        />
        <span className="text-sm font-medium">{t('profile.admissionTests.noneTaken')}</span>
      </label>
    </div>
  );
}

export function isAdmissionTestsStepComplete(value: AdmissionTestResult[], noneTaken: boolean): boolean {
  if (noneTaken) return true;
  if (value.length === 0) return false;
  return value.every((t) => Boolean(t.score));
}
