import { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../lib/firebaseClient';
import { useAuth } from '../../auth/AuthContext';
import { Card } from '../../../components/Card';
import { Button } from '../../../components/Button';
import { submitStudentProfile } from '../../../lib/api';
import type {
  AdmissionTestResult,
  LanguageTestResult,
  StudentDoc,
  StudentEducationInfo,
  StudentPersonalInfo,
  StudentProgramChoice,
} from '@oriesup/shared-types';

import { PersonalInfoStep, emptyPersonalInfo, isPersonalInfoComplete } from './PersonalInfoStep';
import { EducationInfoStep, emptyEducationInfo, isEducationInfoComplete } from './EducationInfoStep';
import { LanguagesStep, isLanguagesStepComplete } from './LanguagesStep';
import { AdmissionTestsStep, isAdmissionTestsStepComplete } from './AdmissionTestsStep';
import { ProgramChoiceStep, emptyProgramChoice, isProgramChoiceComplete } from './ProgramChoiceStep';

export function ProfilePage() {
  const { schoolSlug } = useParams<{ schoolSlug: string }>();
  const { schoolId, user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { t } = useTranslation();

  const STEP_TITLES = [
    t('profile.steps.personal'),
    t('profile.steps.education'),
    t('profile.steps.languages'),
    t('profile.steps.tests'),
    t('profile.steps.program'),
  ];

  const [step, setStep] = useState(0);
  const [personalInfo, setPersonalInfo] = useState<StudentPersonalInfo>(emptyPersonalInfo);
  const [educationInfo, setEducationInfo] = useState<StudentEducationInfo>(emptyEducationInfo);
  const [languages, setLanguages] = useState<LanguageTestResult[]>([]);
  const [admissionTests, setAdmissionTests] = useState<AdmissionTestResult[]>([]);
  const [noAdmissionTestsTaken, setNoAdmissionTestsTaken] = useState(false);
  const [programChoice, setProgramChoice] = useState<StudentProgramChoice>(emptyProgramChoice);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!schoolId || !user) return;
    (async () => {
      const snap = await getDoc(doc(db, 'schools', schoolId, 'students', user.uid));
      if (snap.exists()) {
        const data = snap.data() as StudentDoc;
        if (data.profile) {
          setPersonalInfo(data.profile.personalInfo);
          setEducationInfo(data.profile.educationInfo);
          setLanguages(data.profile.languages);
          setAdmissionTests(data.profile.admissionTests);
          setNoAdmissionTestsTaken(data.profile.noAdmissionTestsTaken);
          setProgramChoice(data.profile.programChoice);
        } else {
          setPersonalInfo((p) => ({ ...p, email: data.contactEmail ?? p.email }));
          const schoolSnap = await getDoc(doc(db, 'schools', schoolId));
          if (schoolSnap.exists()) {
            const schoolName = (schoolSnap.data() as { name: string }).name;
            setEducationInfo((e) => ({ ...e, institution: schoolName }));
          }
        }
      }
      setLoading(false);
    })();
  }, [schoolId, user]);

  const stepComplete = [
    isPersonalInfoComplete(personalInfo),
    isEducationInfoComplete(educationInfo),
    isLanguagesStepComplete(languages),
    isAdmissionTestsStepComplete(admissionTests, noAdmissionTestsTaken),
    isProgramChoiceComplete(programChoice),
  ];

  async function handleSubmit() {
    setError(null);
    setSubmitting(true);
    try {
      await submitStudentProfile({
        personalInfo,
        educationInfo,
        languages,
        noLanguageTestsTaken: languages.every((l) => !l.testTaken),
        admissionTests,
        noAdmissionTestsTaken,
        programChoice,
      });
      const redirect = searchParams.get('redirect');
      navigate(redirect || `/s/${schoolSlug}/student`);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) return <p className="text-neutral-500">{t('common.loading')}</p>;

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-6 flex items-center gap-2">
        {STEP_TITLES.map((title, i) => (
          <div key={title} className="flex flex-1 flex-col items-center gap-1">
            <div
              className={`h-1.5 w-full rounded-full transition ${
                i <= step ? 'bg-brandCta' : 'bg-black/10'
              }`}
            />
            <span className={`text-xs ${i === step ? 'font-semibold text-brandCta' : 'text-neutral-400'}`}>{title}</span>
          </div>
        ))}
      </div>

      <Card>
        {step === 0 && <PersonalInfoStep value={personalInfo} onChange={setPersonalInfo} />}
        {step === 1 && <EducationInfoStep value={educationInfo} onChange={setEducationInfo} />}
        {step === 2 && <LanguagesStep value={languages} onChange={setLanguages} />}
        {step === 3 && (
          <AdmissionTestsStep
            value={admissionTests}
            noneTaken={noAdmissionTestsTaken}
            onChange={setAdmissionTests}
            onNoneTakenChange={setNoAdmissionTestsTaken}
          />
        )}
        {step === 4 && <ProgramChoiceStep value={programChoice} onChange={setProgramChoice} />}

        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

        <div className="mt-6 flex justify-between">
          <Button variant="ghost" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0}>
            {t('common.previous')}
          </Button>
          {step < STEP_TITLES.length - 1 ? (
            <Button onClick={() => setStep((s) => s + 1)} disabled={!stepComplete[step]}>
              {t('common.next')}
            </Button>
          ) : (
            <Button onClick={handleSubmit} disabled={!stepComplete[step] || submitting}>
              {submitting ? '...' : t('profile.saveButton')}
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}
