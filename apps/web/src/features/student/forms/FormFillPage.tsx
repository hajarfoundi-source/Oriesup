import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../../lib/firebaseClient';
import { useAuth } from '../../auth/AuthContext';
import { Card } from '../../../components/Card';
import { Button } from '../../../components/Button';
import { TextField } from '../../../components/TextField';
import { TextAreaField } from '../../../components/TextAreaField';
import { SelectField } from '../../../components/SelectField';
import { submitFormResponse } from '../../../lib/api';
import type { FormDoc, FormSubmissionDoc, FormSubmissionStatus } from '@oriesup/shared-types';

const STATUS_STYLE: Record<FormSubmissionStatus, string> = {
  submitted: 'bg-neutral-100 text-neutral-600',
  in_review: 'bg-brandPrimary/20 text-brandPrimary',
  approved: 'bg-green-100 text-green-700',
  changes_requested: 'bg-amber-100 text-amber-700',
};

export function FormFillPage() {
  const { schoolSlug, formId } = useParams<{ schoolSlug: string; formId: string }>();
  const navigate = useNavigate();
  const { schoolId, user } = useAuth();
  const { t } = useTranslation();

  const STATUS_LABEL: Record<FormSubmissionStatus, string> = {
    submitted: t('student.formStatus.submitted'),
    in_review: t('student.formStatus.in_review'),
    approved: t('student.formStatus.approved'),
    changes_requested: t('student.formStatus.changes_requested'),
  };

  const [form, setForm] = useState<FormDoc | null>(null);
  const [submission, setSubmission] = useState<FormSubmissionDoc | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [justSubmitted, setJustSubmitted] = useState(false);

  useEffect(() => {
    if (!formId || !schoolId || !user) return;
    (async () => {
      const formSnap = await getDoc(doc(db, 'forms', formId));
      const formData = formSnap.exists() ? (formSnap.data() as FormDoc) : null;
      setForm(formData);

      const submissionsSnap = await getDocs(
        query(collection(db, 'formSubmissions'), where('formId', '==', formId), where('studentId', '==', user.uid))
      );
      if (!submissionsSnap.empty) {
        const data = submissionsSnap.docs[0].data() as FormSubmissionDoc;
        setSubmission(data);
        setAnswers(data.answers);
      }
      setLoading(false);
    })();
  }, [formId, schoolId, user]);

  function setAnswer(fieldId: string, value: string) {
    setAnswers((prev) => ({ ...prev, [fieldId]: value }));
  }

  async function handleSubmit() {
    if (!formId) return;
    setError(null);
    setSubmitting(true);
    try {
      await submitFormResponse({ formId, answers });
      setJustSubmitted(true);
      setSubmission((prev) => (prev ? { ...prev, answers, status: 'submitted' } : prev));
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) return <p className="text-neutral-500">{t('common.loading')}</p>;
  if (!form) return <p className="text-neutral-500">{t('student.forms.notFound')}</p>;

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <Card>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">{form.title}</h1>
            {form.description && <p className="mt-2 text-neutral-600">{form.description}</p>}
          </div>
          {submission && (
            <span className={`flex-shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${STATUS_STYLE[submission.status]}`}>
              {STATUS_LABEL[submission.status]}
            </span>
          )}
        </div>
        {submission?.status === 'changes_requested' && submission.reviewNote && (
          <div className="mt-4 rounded-xl bg-amber-50 p-3 text-sm text-amber-800">
            <p className="font-semibold">{t('student.forms.changesRequested')}</p>
            <p className="mt-1">{submission.reviewNote}</p>
          </div>
        )}
      </Card>

      <Card className="space-y-4">
        {form.fields.map((field) => (
          <div key={field.id}>
            {field.type === 'textarea' ? (
              <TextAreaField
                label={field.label + (field.required ? ' *' : '')}
                value={answers[field.id] ?? ''}
                onChange={(e) => setAnswer(field.id, e.target.value)}
              />
            ) : field.type === 'select' ? (
              <SelectField
                label={field.label + (field.required ? ' *' : '')}
                value={answers[field.id] ?? ''}
                onChange={(e) => setAnswer(field.id, e.target.value)}
              >
                <option value="">{t('student.forms.select')}</option>
                {(field.options ?? []).map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </SelectField>
            ) : (
              <TextField
                label={field.label + (field.required ? ' *' : '')}
                type={field.type === 'date' ? 'date' : 'text'}
                value={answers[field.id] ?? ''}
                onChange={(e) => setAnswer(field.id, e.target.value)}
              />
            )}
          </div>
        ))}

        {error && <p className="text-sm text-red-600">{error}</p>}
        {justSubmitted && !error && <p className="text-sm text-green-700">{t('student.forms.submitted')}</p>}

        <div className="flex items-center gap-3">
          <Button onClick={handleSubmit} disabled={submitting}>
            {submitting ? '...' : submission ? t('student.forms.update') : t('student.forms.submit')}
          </Button>
          <Button variant="ghost" onClick={() => navigate(`/s/${schoolSlug}/student/services/${form.serviceId}`)}>
            {t('student.forms.backToService')}
          </Button>
        </div>
      </Card>
    </div>
  );
}
