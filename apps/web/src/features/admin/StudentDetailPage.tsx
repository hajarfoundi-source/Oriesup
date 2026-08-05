import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../lib/firebaseClient';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { SelectField } from '../../components/SelectField';
import { TextField } from '../../components/TextField';
import { adminGrantEntitlement, reviewFormSubmission } from '../../lib/api';
import type { EntitlementDoc, FormDoc, FormSubmissionDoc, FormSubmissionStatus, SchoolDoc, ServiceDoc, StudentDoc } from '@oriesup/shared-types';

interface ServiceRow extends ServiceDoc {
  id: string;
}
interface SubmissionRow extends FormSubmissionDoc {
  id: string;
}

const SUBMISSION_STATUS_LABEL: Record<FormSubmissionStatus, string> = {
  submitted: 'Soumis',
  in_review: 'En cours de revue',
  approved: 'Approuvé',
  changes_requested: 'Modifications demandées',
};

const SUBMISSION_STATUS_STYLE: Record<FormSubmissionStatus, string> = {
  submitted: 'bg-neutral-100 text-neutral-600',
  in_review: 'bg-brandPrimary/20 text-brandPrimary',
  approved: 'bg-green-100 text-green-700',
  changes_requested: 'bg-amber-100 text-amber-700',
};

function Field({ label, value }: { label: string; value?: string }) {
  return (
    <div>
      <p className="text-xs text-neutral-400">{label}</p>
      <p className="text-sm font-medium">{value || '—'}</p>
    </div>
  );
}

export function StudentDetailPage() {
  const { schoolId, studentId } = useParams<{ schoolId: string; studentId: string }>();

  const [student, setStudent] = useState<StudentDoc | null>(null);
  const [school, setSchool] = useState<SchoolDoc | null>(null);
  const [services, setServices] = useState<ServiceRow[]>([]);
  const [entitlements, setEntitlements] = useState<Record<string, EntitlementDoc>>({});
  const [submissions, setSubmissions] = useState<SubmissionRow[]>([]);
  const [formsById, setFormsById] = useState<Record<string, FormDoc>>({});
  const [formIdByServiceId, setFormIdByServiceId] = useState<Record<string, string>>({});
  const [copiedServiceId, setCopiedServiceId] = useState<string | null>(null);
  const [reviewDrafts, setReviewDrafts] = useState<Record<string, { status: FormSubmissionStatus; note: string }>>({});
  const [loading, setLoading] = useState(true);
  const [busyServiceId, setBusyServiceId] = useState<string | null>(null);
  const [busySubmissionId, setBusySubmissionId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function refresh() {
    if (!schoolId || !studentId) return;
    const [studentSnap, schoolSnap, servicesSnap, entitlementsSnap, submissionsSnap, allFormsSnap] = await Promise.all([
      getDoc(doc(db, 'schools', schoolId, 'students', studentId)),
      getDoc(doc(db, 'schools', schoolId)),
      getDocs(collection(db, 'services')),
      getDocs(collection(db, 'schools', schoolId, 'students', studentId, 'entitlements')),
      getDocs(query(collection(db, 'formSubmissions'), where('studentId', '==', studentId))),
      getDocs(query(collection(db, 'forms'), where('active', '==', true))),
    ]);

    setStudent(studentSnap.exists() ? (studentSnap.data() as StudentDoc) : null);
    setSchool(schoolSnap.exists() ? (schoolSnap.data() as SchoolDoc) : null);
    setServices(servicesSnap.docs.map((d) => ({ id: d.id, ...(d.data() as ServiceDoc) })));

    const formByService: Record<string, string> = {};
    allFormsSnap.docs.forEach((d) => {
      const data = d.data() as FormDoc;
      if (!formByService[data.serviceId]) formByService[data.serviceId] = d.id;
    });
    setFormIdByServiceId(formByService);

    const ent: Record<string, EntitlementDoc> = {};
    entitlementsSnap.docs.forEach((d) => {
      ent[d.id] = d.data() as EntitlementDoc;
    });
    setEntitlements(ent);

    const subs = submissionsSnap.docs.map((d) => ({ id: d.id, ...(d.data() as FormSubmissionDoc) }));
    setSubmissions(subs);
    const formIds = [...new Set(subs.map((s) => s.formId))];
    const formSnaps = await Promise.all(formIds.map((id) => getDoc(doc(db, 'forms', id))));
    const forms: Record<string, FormDoc> = {};
    formSnaps.forEach((snap) => {
      if (snap.exists()) forms[snap.id] = snap.data() as FormDoc;
    });
    setFormsById(forms);

    setLoading(false);
  }

  useEffect(() => {
    refresh();
  }, [schoolId, studentId]);

  async function handleUnlock(serviceId: string) {
    if (!schoolId || !studentId) return;
    setError(null);
    setBusyServiceId(serviceId);
    try {
      await adminGrantEntitlement({ schoolId, studentId, serviceId });
      await refresh();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setBusyServiceId(null);
    }
  }

  function copyFormLink(serviceId: string, formId: string) {
    if (!school) return;
    const url = `${window.location.origin}/s/${school.slug}/student/forms/${formId}`;
    navigator.clipboard.writeText(url);
    setCopiedServiceId(serviceId);
    setTimeout(() => setCopiedServiceId((cur) => (cur === serviceId ? null : cur)), 2000);
  }

  function draftFor(submission: SubmissionRow) {
    return reviewDrafts[submission.id] ?? { status: submission.status === 'submitted' ? 'in_review' : submission.status, note: submission.reviewNote ?? '' };
  }

  function setDraft(submissionId: string, patch: Partial<{ status: FormSubmissionStatus; note: string }>) {
    setReviewDrafts((prev) => ({ ...prev, [submissionId]: { ...draftForId(prev, submissionId), ...patch } }));
  }

  function draftForId(drafts: typeof reviewDrafts, submissionId: string) {
    const submission = submissions.find((s) => s.id === submissionId);
    return drafts[submissionId] ?? { status: submission?.status ?? 'in_review', note: submission?.reviewNote ?? '' };
  }

  async function handleReview(submission: SubmissionRow) {
    const draft = draftFor(submission);
    setError(null);
    setBusySubmissionId(submission.id);
    try {
      await reviewFormSubmission({ submissionId: submission.id, status: draft.status as 'in_review' | 'approved' | 'changes_requested', reviewNote: draft.note || undefined });
      await refresh();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setBusySubmissionId(null);
    }
  }

  if (loading) return <p className="text-neutral-500">Chargement...</p>;
  if (!student) return <p className="text-neutral-500">Élève introuvable.</p>;

  const { profile } = student;

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Link to="/admin/students" className="text-sm text-neutral-500 hover:text-brandCta">
        ← Retour aux élèves
      </Link>

      <Card className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">
            {student.firstName} {student.lastName}
          </h1>
          <p className="mt-1 text-sm text-neutral-500">
            {school?.name ?? schoolId} · {student.contactEmail ?? '—'} · {student.contactPhone ?? '—'}
          </p>
        </div>
        <div className="flex flex-col items-end gap-1.5">
          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${student.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
            {student.status === 'active' ? 'Actif' : 'En attente'}
          </span>
          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${student.profileComplete ? 'bg-green-100 text-green-700' : 'bg-neutral-100 text-neutral-500'}`}>
            {student.profileComplete ? 'Profil complet' : 'Profil incomplet'}
          </span>
        </div>
      </Card>

      {!profile && (
        <Card>
          <p className="text-neutral-500">Cet élève n'a pas encore complété son profil.</p>
        </Card>
      )}

      {profile && (
        <>
          <Card>
            <h2 className="mb-4 text-lg font-bold">Informations personnelles</h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              <Field label="Nom légal complet" value={profile.personalInfo.fullLegalName} />
              <Field
                label={profile.personalInfo.idDocumentType === 'passport' ? 'N° de passeport' : "N° de carte d'identité"}
                value={profile.personalInfo.idDocumentNumber}
              />
              <Field label="Date de naissance" value={profile.personalInfo.dateOfBirth} />
              <Field label="Lieu de naissance" value={profile.personalInfo.placeOfBirth} />
              <Field label="Genre" value={profile.personalInfo.gender === 'female' ? 'Féminin' : 'Masculin'} />
              <Field label="Nom de la mère" value={profile.personalInfo.motherName} />
              <Field label="Nom du père" value={profile.personalInfo.fatherName} />
              <Field label="Email" value={profile.personalInfo.email} />
              <Field label="Téléphone" value={profile.personalInfo.phone} />
              <Field label="Email du parent" value={profile.personalInfo.parentEmail} />
              <Field label="Téléphone du parent" value={profile.personalInfo.parentPhone} />
            </div>
          </Card>

          <Card>
            <h2 className="mb-4 text-lg font-bold">Parcours scolaire</h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {profile.educationInfo.hasDegree ? (
                <>
                  <Field label="Dernier diplôme obtenu" value={profile.educationInfo.lastDegreeAwarded} />
                  <Field label="Note finale" value={profile.educationInfo.finalGrade} />
                  <Field label="Spécialité" value={profile.educationInfo.degreeSpeciality} />
                  <Field label="Établissement" value={profile.educationInfo.degreeInstitution} />
                </>
              ) : (
                <>
                  <Field label="Niveau scolaire actuel" value={profile.educationInfo.educationLevel} />
                  <Field label="Date d'obtention prévue" value={profile.educationInfo.graduationDate} />
                  <Field label="Filière" value={profile.educationInfo.speciality} />
                  <Field label="Établissement" value={profile.educationInfo.institution} />
                </>
              )}
            </div>
          </Card>

          <Card>
            <h2 className="mb-4 text-lg font-bold">Langues</h2>
            <div className="space-y-2">
              {profile.languages.map((l, i) => (
                <div key={i} className="flex items-center justify-between rounded-xl border border-neutral-100 px-4 py-2 text-sm">
                  <span className="font-medium">
                    {l.language} {l.level ? `· ${l.level}` : ''}
                  </span>
                  <span className="text-neutral-500">
                    {l.testTaken ? `${l.testName ?? '—'} : ${l.score ?? '—'}` : 'Aucun test passé'}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <h2 className="mb-4 text-lg font-bold">Tests d'admission universitaire</h2>
            {profile.noAdmissionTestsTaken || profile.admissionTests.length === 0 ? (
              <p className="text-sm text-neutral-500">Aucun test d'admission passé.</p>
            ) : (
              <div className="space-y-2">
                {profile.admissionTests.map((t, i) => (
                  <div key={i} className="flex items-center justify-between rounded-xl border border-neutral-100 px-4 py-2 text-sm">
                    <span className="font-medium">{t.testName}</span>
                    <span className="text-neutral-500">{t.score ?? '—'}</span>
                  </div>
                ))}
              </div>
            )}
          </Card>

          <Card>
            <h2 className="mb-4 text-lg font-bold">Programme souhaité</h2>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Type de diplôme" value={profile.programChoice.degreeType} />
              <Field label="Programme" value={profile.programChoice.programName} />
            </div>
          </Card>
        </>
      )}

      <Card>
        <h2 className="mb-4 text-lg font-bold">Packs / Services</h2>
        {error && <p className="mb-3 text-sm text-red-600">{error}</p>}
        <div className="space-y-3">
          {services.map((s) => {
            const entitlement = entitlements[s.id];
            const unlocked = Boolean(entitlement);
            const formId = formIdByServiceId[s.id];
            return (
              <div key={s.id} className="rounded-xl border border-neutral-100 px-4 py-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">{s.name.fr}</p>
                  <p className="text-sm text-neutral-500">
                    {s.price} {s.currency}
                    {unlocked && ` · débloqué le ${new Date(entitlement.grantedAt).toLocaleDateString('fr-FR')}`}
                  </p>
                </div>
                {unlocked ? (
                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">Débloqué</span>
                ) : (
                  <Button variant="ghost" disabled={busyServiceId === s.id} onClick={() => handleUnlock(s.id)}>
                    {busyServiceId === s.id ? '...' : 'Débloquer'}
                  </Button>
                )}
              </div>
              {unlocked && formId && (
                <div className="mt-3 flex items-center gap-2 border-t border-neutral-100 pt-3">
                  <p className="flex-1 truncate text-xs text-neutral-400">
                    {`${window.location.origin}/s/${school?.slug}/student/forms/${formId}`}
                  </p>
                  <button
                    type="button"
                    onClick={() => copyFormLink(s.id, formId)}
                    className="flex-shrink-0 text-xs font-semibold text-brandCta"
                  >
                    {copiedServiceId === s.id ? 'Copié ✓' : 'Copier le lien du formulaire'}
                  </button>
                </div>
              )}
              </div>
            );
          })}
          {services.length === 0 && <p className="text-neutral-500">Aucun service disponible.</p>}
        </div>
      </Card>

      <Card>
        <h2 className="mb-4 text-lg font-bold">Formulaires soumis</h2>
        <div className="space-y-4">
          {submissions.map((s) => {
            const form = formsById[s.formId];
            const draft = draftFor(s);
            return (
              <div key={s.id} className="rounded-xl border border-neutral-100 p-4">
                <div className="flex items-start justify-between gap-3">
                  <p className="font-semibold">{form?.title ?? s.formId}</p>
                  <span className={`flex-shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${SUBMISSION_STATUS_STYLE[s.status]}`}>
                    {SUBMISSION_STATUS_LABEL[s.status]}
                  </span>
                </div>
                <p className="mt-1 text-xs text-neutral-400">Soumis le {new Date(s.submittedAt).toLocaleDateString('fr-FR')}</p>

                {form && (
                  <div className="mt-3 grid grid-cols-2 gap-3">
                    {form.fields.map((f) => (
                      <Field key={f.id} label={f.label} value={s.answers[f.id]} />
                    ))}
                  </div>
                )}

                <div className="mt-4 flex flex-wrap items-end gap-2 border-t border-neutral-100 pt-3">
                  <div className="w-48">
                    <SelectField
                      label="Statut"
                      value={draft.status}
                      onChange={(e) => setDraft(s.id, { status: e.target.value as FormSubmissionStatus })}
                    >
                      <option value="in_review">En cours de revue</option>
                      <option value="approved">Approuvé</option>
                      <option value="changes_requested">Modifications demandées</option>
                    </SelectField>
                  </div>
                  <div className="flex-1">
                    <TextField
                      label="Note (optionnel)"
                      value={draft.note}
                      onChange={(e) => setDraft(s.id, { note: e.target.value })}
                    />
                  </div>
                  <Button variant="ghost" disabled={busySubmissionId === s.id} onClick={() => handleReview(s)}>
                    {busySubmissionId === s.id ? '...' : 'Enregistrer'}
                  </Button>
                </div>
              </div>
            );
          })}
          {submissions.length === 0 && <p className="text-neutral-500">Aucun formulaire soumis pour le moment.</p>}
        </div>
      </Card>
    </div>
  );
}
