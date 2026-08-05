import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../../lib/firebaseClient';
import { useAuth } from '../../auth/AuthContext';
import { Card } from '../../../components/Card';
import { Button } from '../../../components/Button';
import { useProfileComplete } from '../useProfileComplete';
import { useCart } from '../cart/CartContext';
import { resolveLocalizedText, type FormDoc, type FormSubmissionDoc, type FormSubmissionStatus, type Locale, type ServiceDoc } from '@oriesup/shared-types';

interface ServiceRow extends ServiceDoc {
  id: string;
}
interface FormRow extends FormDoc {
  id: string;
}

const SUBMISSION_STATUS_STYLE: Record<FormSubmissionStatus, string> = {
  submitted: 'bg-neutral-100 text-neutral-600',
  in_review: 'bg-brandPrimary/20 text-brandPrimary',
  approved: 'bg-green-100 text-green-700',
  changes_requested: 'bg-amber-100 text-amber-700',
};

export function ServiceDetailPage() {
  const { schoolSlug, serviceId } = useParams<{ schoolSlug: string; serviceId: string }>();
  const navigate = useNavigate();
  const { schoolId, user } = useAuth();
  const profileComplete = useProfileComplete();
  const { addToCart, isInCart } = useCart();
  const { t, i18n } = useTranslation();
  const locale = i18n.language as Locale;

  const SUBMISSION_STATUS_LABEL: Record<FormSubmissionStatus, string> = {
    submitted: t('student.formStatus.submitted'),
    in_review: t('student.formStatus.in_review'),
    approved: t('student.formStatus.approved'),
    changes_requested: t('student.formStatus.changes_requested'),
  };

  const [service, setService] = useState<ServiceRow | null>(null);
  const [entitled, setEntitled] = useState(false);
  const [forms, setForms] = useState<FormRow[]>([]);
  const [submissions, setSubmissions] = useState<Record<string, FormSubmissionDoc>>({});
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    if (!serviceId || !schoolId || !user) return;
    (async () => {
      try {
        const snap = await getDoc(doc(db, 'services', serviceId));
        setService(snap.exists() ? { id: snap.id, ...(snap.data() as ServiceDoc) } : null);

        const [schoolEntSnap, studentEntSnap] = await Promise.all([
          getDoc(doc(db, 'schools', schoolId, 'entitlements', serviceId)),
          getDoc(doc(db, 'schools', schoolId, 'students', user.uid, 'entitlements', serviceId)),
        ]);
        const isEntitled = schoolEntSnap.exists() || studentEntSnap.exists();
        setEntitled(isEntitled);

        if (isEntitled) {
          const [formsSnap, submissionsSnap] = await Promise.all([
            getDocs(query(collection(db, 'forms'), where('serviceId', '==', serviceId), where('active', '==', true))),
            getDocs(query(collection(db, 'formSubmissions'), where('studentId', '==', user.uid))),
          ]);
          setForms(formsSnap.docs.map((d) => ({ id: d.id, ...(d.data() as FormDoc) })));
          const byFormId: Record<string, FormSubmissionDoc> = {};
          submissionsSnap.docs.forEach((d) => {
            const data = d.data() as FormSubmissionDoc;
            byFormId[data.formId] = data;
          });
          setSubmissions(byFormId);
        }
      } catch (err) {
        setLoadError((err as Error).message);
      } finally {
        setLoading(false);
      }
    })();
  }, [serviceId, schoolId, user]);

  function handleAddToCart() {
    if (!serviceId) return;
    if (!profileComplete) {
      navigate(`/s/${schoolSlug}/student/profile?redirect=/s/${schoolSlug}/student/services/${serviceId}`);
      return;
    }
    addToCart(serviceId);
  }

  if (loading) return <p className="text-neutral-500">{t('common.loading')}</p>;
  if (loadError) return <p className="text-red-600">{loadError}</p>;
  if (!service) return <p className="text-neutral-500">{t('student.services.notFound')}</p>;

  const inCart = isInCart(service.id);

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <Card>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">{resolveLocalizedText(service.name, locale)}</h1>
            <p className="mt-2 text-neutral-600">{resolveLocalizedText(service.description, locale)}</p>
          </div>
          <p className="flex-shrink-0 font-display text-2xl font-bold text-brandCta">
            {service.price} {service.currency}
          </p>
        </div>
        {entitled ? (
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="inline-block rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
              {t('student.services.unlocked')}
            </span>
            {service.testPrepTrack && (
              <Link to={`/s/${schoolSlug}/student/test-prep/${service.id}`}>
                <Button>{t('student.testPrep.open')}</Button>
              </Link>
            )}
          </div>
        ) : (
          <Button onClick={handleAddToCart} disabled={inCart} className="mt-6">
            {inCart ? t('student.services.alreadyInCart') : t('student.services.addToCart')}
          </Button>
        )}
      </Card>

      {service.process && service.process.length > 0 && (
        <Card>
          <h2 className="mb-3 text-lg font-bold">{t('student.services.process')}</h2>
          <ol className="space-y-2">
            {service.process.map((step, i) => (
              <li key={i} className="flex gap-3 text-sm text-neutral-700">
                <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-brandPrimary/20 text-xs font-bold text-brandCta">
                  {i + 1}
                </span>
                {resolveLocalizedText(step, locale)}
              </li>
            ))}
          </ol>
        </Card>
      )}

      {service.advantages && service.advantages.length > 0 && (
        <Card>
          <h2 className="mb-3 text-lg font-bold">{t('student.services.advantages')}</h2>
          <ul className="space-y-2">
            {service.advantages.map((a, i) => (
              <li key={i} className="flex gap-2 text-sm text-neutral-700">
                <span className="text-brandCta">✓</span>
                {resolveLocalizedText(a, locale)}
              </li>
            ))}
          </ul>
        </Card>
      )}

      {service.notes && resolveLocalizedText(service.notes, locale) && (
        <Card>
          <h2 className="mb-2 text-lg font-bold">{t('student.services.notes')}</h2>
          <p className="text-sm text-neutral-500">{resolveLocalizedText(service.notes, locale)}</p>
        </Card>
      )}

      {entitled && forms.length > 0 && (
        <Card>
          <h2 className="mb-3 text-lg font-bold">{t('student.services.availableForms')}</h2>
          <div className="space-y-2">
            {forms.map((f) => {
              const submission = submissions[f.id];
              return (
                <Link
                  key={f.id}
                  to={`/s/${schoolSlug}/student/forms/${f.id}`}
                  className="flex items-center justify-between rounded-xl border border-neutral-100 px-4 py-3 transition hover:shadow-sm"
                >
                  <div>
                    <p className="font-semibold">{f.title}</p>
                    {f.description && <p className="text-sm text-neutral-500">{f.description}</p>}
                  </div>
                  <span
                    className={`flex-shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
                      submission ? SUBMISSION_STATUS_STYLE[submission.status] : 'bg-brandCta/10 text-brandCta'
                    }`}
                  >
                    {submission ? SUBMISSION_STATUS_LABEL[submission.status] : t('student.services.toFill')}
                  </span>
                </Link>
              );
            })}
          </div>
        </Card>
      )}
    </div>
  );
}
