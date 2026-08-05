import { useTranslation } from 'react-i18next';
import { TextField } from '../../../components/TextField';
import { SelectField } from '../../../components/SelectField';
import { DEGREE_TYPES, type StudentProgramChoice } from '@oriesup/shared-types';

export function ProgramChoiceStep({
  value,
  onChange,
}: {
  value: StudentProgramChoice;
  onChange: (value: StudentProgramChoice) => void;
}) {
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold">{t('profile.programChoice.title')}</h2>
      <p className="text-sm text-neutral-500">{t('profile.programChoice.subtitle')}</p>

      <SelectField label={t('profile.programChoice.degreeType')} value={value.degreeType} onChange={(e) => onChange({ ...value, degreeType: e.target.value })} required>
        <option value="">{t('common.select')}</option>
        {DEGREE_TYPES.map((d) => (
          <option key={d} value={d}>
            {d}
          </option>
        ))}
      </SelectField>

      <TextField
        label={t('profile.programChoice.programName')}
        value={value.programName}
        onChange={(e) => onChange({ ...value, programName: e.target.value })}
        required
      />
    </div>
  );
}

export function isProgramChoiceComplete(v: StudentProgramChoice): boolean {
  return Boolean(v.degreeType && v.programName);
}

export const emptyProgramChoice: StudentProgramChoice = { degreeType: '', programName: '' };
