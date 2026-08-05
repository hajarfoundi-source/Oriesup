import { useTranslation } from 'react-i18next';
import { TextField } from '../../../components/TextField';
import type { StudentEducationInfo } from '@oriesup/shared-types';

export function EducationInfoStep({
  value,
  onChange,
}: {
  value: StudentEducationInfo;
  onChange: (value: StudentEducationInfo) => void;
}) {
  const { t } = useTranslation();

  function set<K extends keyof StudentEducationInfo>(key: K, v: StudentEducationInfo[K]) {
    onChange({ ...value, [key]: v });
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold">{t('profile.education.title')}</h2>

      <label className="flex items-center gap-2 rounded-xl border border-neutral-200 p-4">
        <input type="checkbox" checked={value.hasDegree} onChange={(e) => set('hasDegree', e.target.checked)} className="h-4 w-4" />
        <span className="text-sm font-medium">{t('profile.education.hasDegree')}</span>
      </label>

      {value.hasDegree ? (
        <div className="grid grid-cols-2 gap-4">
          <TextField label={t('profile.education.lastDegreeAwarded')} value={value.lastDegreeAwarded ?? ''} onChange={(e) => set('lastDegreeAwarded', e.target.value)} required />
          <TextField label={t('profile.education.finalGrade')} value={value.finalGrade ?? ''} onChange={(e) => set('finalGrade', e.target.value)} required />
          <TextField label={t('profile.education.degreeSpeciality')} value={value.degreeSpeciality ?? ''} onChange={(e) => set('degreeSpeciality', e.target.value)} required />
          <TextField label={t('profile.education.degreeInstitution')} value={value.degreeInstitution ?? ''} onChange={(e) => set('degreeInstitution', e.target.value)} required />
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          <TextField label={t('profile.education.educationLevel')} value={value.educationLevel ?? ''} onChange={(e) => set('educationLevel', e.target.value)} required />
          <TextField label={t('profile.education.graduationDate')} type="date" value={value.graduationDate ?? ''} onChange={(e) => set('graduationDate', e.target.value)} required />
          <TextField label={t('profile.education.speciality')} value={value.speciality ?? ''} onChange={(e) => set('speciality', e.target.value)} required />
          <TextField label={t('profile.education.institution')} value={value.institution ?? ''} onChange={(e) => set('institution', e.target.value)} required />
        </div>
      )}
    </div>
  );
}

export function isEducationInfoComplete(v: StudentEducationInfo): boolean {
  if (v.hasDegree) {
    return Boolean(v.lastDegreeAwarded && v.finalGrade && v.degreeSpeciality && v.degreeInstitution);
  }
  return Boolean(v.educationLevel && v.graduationDate && v.speciality && v.institution);
}

export const emptyEducationInfo: StudentEducationInfo = { hasDegree: false };
