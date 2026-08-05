import { useTranslation } from 'react-i18next';
import { TextField } from '../../../components/TextField';
import { ToggleGroup } from '../../../components/ToggleGroup';
import type { StudentPersonalInfo } from '@oriesup/shared-types';

export function PersonalInfoStep({
  value,
  onChange,
}: {
  value: StudentPersonalInfo;
  onChange: (value: StudentPersonalInfo) => void;
}) {
  const { t } = useTranslation();

  function set<K extends keyof StudentPersonalInfo>(key: K, v: StudentPersonalInfo[K]) {
    onChange({ ...value, [key]: v });
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold">{t('profile.personal.title')}</h2>
      <TextField label={t('profile.personal.fullLegalName')} value={value.fullLegalName} onChange={(e) => set('fullLegalName', e.target.value)} required />

      <ToggleGroup
        label={t('profile.personal.idDocumentType')}
        value={value.idDocumentType}
        onChange={(v) => set('idDocumentType', v)}
        options={[
          { value: 'passport', label: t('profile.personal.passport') },
          { value: 'national_id', label: t('profile.personal.nationalId') },
        ]}
      />
      <TextField label={t('profile.personal.idDocumentNumber')} value={value.idDocumentNumber} onChange={(e) => set('idDocumentNumber', e.target.value)} required />

      <div className="grid grid-cols-2 gap-4">
        <TextField label={t('profile.personal.dateOfBirth')} type="date" value={value.dateOfBirth} onChange={(e) => set('dateOfBirth', e.target.value)} required />
        <TextField label={t('profile.personal.placeOfBirth')} value={value.placeOfBirth} onChange={(e) => set('placeOfBirth', e.target.value)} required />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <TextField label={t('profile.personal.motherName')} value={value.motherName} onChange={(e) => set('motherName', e.target.value)} required />
        <TextField label={t('profile.personal.fatherName')} value={value.fatherName} onChange={(e) => set('fatherName', e.target.value)} required />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <TextField label={t('profile.personal.email')} type="email" value={value.email} onChange={(e) => set('email', e.target.value)} required />
        <TextField label={t('profile.personal.phone')} type="tel" value={value.phone} onChange={(e) => set('phone', e.target.value)} required />
      </div>

      <ToggleGroup
        label={t('profile.personal.gender')}
        value={value.gender}
        onChange={(v) => set('gender', v)}
        options={[
          { value: 'female', label: t('profile.personal.female') },
          { value: 'male', label: t('profile.personal.male') },
        ]}
      />

      <div className="grid grid-cols-2 gap-4">
        <TextField label={t('profile.personal.parentEmail')} type="email" value={value.parentEmail} onChange={(e) => set('parentEmail', e.target.value)} required />
        <TextField label={t('profile.personal.parentPhone')} type="tel" value={value.parentPhone} onChange={(e) => set('parentPhone', e.target.value)} required />
      </div>
    </div>
  );
}

export function isPersonalInfoComplete(v: StudentPersonalInfo): boolean {
  return Boolean(
    v.fullLegalName &&
      v.idDocumentType &&
      v.idDocumentNumber &&
      v.dateOfBirth &&
      v.placeOfBirth &&
      v.motherName &&
      v.fatherName &&
      v.email &&
      v.phone &&
      v.gender &&
      v.parentEmail &&
      v.parentPhone
  );
}

export const emptyPersonalInfo: StudentPersonalInfo = {
  fullLegalName: '',
  idDocumentType: 'national_id',
  idDocumentNumber: '',
  dateOfBirth: '',
  placeOfBirth: '',
  motherName: '',
  fatherName: '',
  email: '',
  phone: '',
  gender: 'female',
  parentEmail: '',
  parentPhone: '',
};
