import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { collection, doc, getDoc, getDocs, orderBy, query, where } from 'firebase/firestore';
import { db } from '../../../lib/firebaseClient';
import { useAuth } from '../../auth/AuthContext';
import { Card } from '../../../components/Card';
import { Button } from '../../../components/Button';
import {
  resolveLocalizedText,
  type Locale,
  type ServiceDoc,
  type TestPrepAttemptDoc,
  type TestPrepCourseDoc,
  type TestPrepTestDoc,
} from '@oriesup/shared-types';

interface CourseRow extends TestPrepCourseDoc {
  id: string;
}
interface TestRow extends TestPrepTestDoc {
  id: string;
}
interface AttemptRow extends TestPrepAttemptDoc {
  id: string;
}

export function TestPrepTrackPage() {
  const { schoolSlug, serviceId } = useParams<{ schoolSlug: string; serviceId: string }>();
  const { schoolId, user } = useAuth();
  const { t, i18n } = useTranslation();
  const locale = i18n.language as Locale;

  const [service, setService] = useState<(ServiceDoc & { id: string }) | null>(null);
  const [entitled, setEntitled] = useState(false);
  const [courses, setCourses] = useState<CourseRow[]>([]);
  const [tests, setTests] = useState<TestRow[]>([]);
  const [attempts, setAttempts] = useState<AttemptRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    if (!serviceId || !schoolId || !user) return;
    (async () => {
      try {
        const svcSnap = await getDoc(doc(db, 'services', serviceId));
        setService(svcSnap.exists() ? { id: svcSnap.id, ...(svcSnap.data() as ServiceDoc) } : null);

        const [schoolEnt, studentEnt] = await Promise.all([
          getDoc(doc(db, 'schools', schoolId, 'entitlements', serviceId)),
          getDoc(doc(db, 'schools', schoolId, 'students', user.uid, 'entitlements', serviceId)),
        ]);
        const isEntitled = schoolEnt.exists() || studentEnt.exists();
        setEntitled(isEntitled);

        if (isEntitled) {
          const [coursesSnap, testsSnap, attemptsSnap] = await Promise.all([
            getDocs(query(collection(db, 'testPrepCourses'), where('serviceId', '==', serviceId), orderBy('order'))),
            getDocs(query(collection(db, 'testPrepTests'), where('serviceId', '==', serviceId), orderBy('order'))),
            getDocs(query(collection(db, 'testPrepAttempts'), where('studentId', '==', user.uid))),
          ]);
          setCourses(coursesSnap.docs.map((d) => ({ id: d.id, ...(d.data() as TestPrepCourseDoc) })));
          setTests(testsSnap.docs.map((d) => ({ id: d.id, ...(d.data() as TestPrepTestDoc) })));
          setAttempts(attemptsSnap.docs.map((d) => ({ id: d.id, ...(d.data() as TestPrepAttemptDoc) })));
        }
      } catch (err) {
        setLoadError((err as Error).message);
      } finally {
        setLoading(false);
      }
    })();
  }, [serviceId, schoolId, user]);

  if (loading) return <p className="text-neutral-500">{t('common.loading')}</p>;
  if (loadError) return <p className="text-red-600">{loadError}</p>;
  if (!service) return <p className="text-neutral-500">{t('student.services.notFound')}</p>;

  if (!entitled) {
    return (
      <Card className="mx-auto max-w-xl space-y-4 text-center">
        <h1 className="text-2xl font-bold">{resolveLocalizedText(service.name, locale)}</h1>
        <p className="text-neutral-600">{t('student.testPrep.locked')}</p>
        <Link to={`/s/${schoolSlug}/student/services/${serviceId}`}>
          <Button>{t('student.testPrep.viewService')}</Button>
        </Link>
      </Card>
    );
  }

  function bestAttemptFor(testId: string) {
    const relevant = attempts.filter((a) => a.testId === testId);
    if (relevant.length === 0) return null;
    return relevant.reduce((best, a) => (a.compositeScore > best.compositeScore ? a : best));
  }

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold">{resolveLocalizedText(service.name, locale)}</h1>
        <p className="mt-1 text-neutral-600">{resolveLocalizedText(service.description, locale)}</p>
      </div>

      <section>
        <h2 className="mb-3 text-lg font-bold">{t('student.testPrep.courses')}</h2>
        {courses.length === 0 ? (
          <p className="text-sm text-neutral-500">{t('student.testPrep.noCourses')}</p>
        ) : (
          <div className="space-y-2">
            {courses.map((c) => (
              <Link key={c.id} to={`/s/${schoolSlug}/student/test-prep/${serviceId}/courses/${c.id}`}>
                <Card className="transition hover:shadow-md">
                  <p className="font-semibold">{c.title}</p>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="mb-3 text-lg font-bold">{t('student.testPrep.mockTests')}</h2>
        {tests.length === 0 ? (
          <p className="text-sm text-neutral-500">{t('student.testPrep.noTests')}</p>
        ) : (
          <div className="space-y-2">
            {tests.map((test) => {
              const best = bestAttemptFor(test.id);
              return (
                <Link key={test.id} to={`/s/${schoolSlug}/student/test-prep/${serviceId}/tests/${test.id}`}>
                  <Card className="flex items-center justify-between gap-4 transition hover:shadow-md">
                    <div>
                      <p className="font-semibold">{test.title}</p>
                      <p className="text-sm text-neutral-500">{test.sections.map((s) => s.title).join(' · ')}</p>
                    </div>
                    {best && (
                      <span className="flex-shrink-0 rounded-full bg-brandCta/10 px-3 py-1 text-xs font-semibold text-brandCta">
                        {t('student.testPrep.bestScore')}: {best.compositeLabel}
                      </span>
                    )}
                  </Card>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
