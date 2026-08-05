import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../lib/firebaseClient';
import { Card } from '../../../components/Card';
import type { TestPrepCourseDoc } from '@oriesup/shared-types';

export function TestPrepCoursePage() {
  const { schoolSlug, serviceId, courseId } = useParams<{ schoolSlug: string; serviceId: string; courseId: string }>();
  const { t } = useTranslation();
  const [course, setCourse] = useState<TestPrepCourseDoc | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    if (!courseId) return;
    (async () => {
      try {
        const snap = await getDoc(doc(db, 'testPrepCourses', courseId));
        setCourse(snap.exists() ? (snap.data() as TestPrepCourseDoc) : null);
      } catch (err) {
        setLoadError((err as Error).message);
      } finally {
        setLoading(false);
      }
    })();
  }, [courseId]);

  if (loading) return <p className="text-neutral-500">{t('common.loading')}</p>;
  if (loadError) return <p className="text-red-600">{loadError}</p>;
  if (!course) return <p className="text-neutral-500">{t('student.testPrep.courseNotFound')}</p>;

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <Link to={`/s/${schoolSlug}/student/test-prep/${serviceId}`} className="text-sm font-semibold text-brandCta">
        ← {t('student.testPrep.backToTrack')}
      </Link>
      <h1 className="text-2xl font-bold">{course.title}</h1>
      <div className="space-y-4">
        {course.sections.map((s, i) => (
          <Card key={i}>
            <h2 className="mb-2 text-lg font-bold">{s.heading}</h2>
            <p className="whitespace-pre-line leading-relaxed text-neutral-700">{s.content}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
