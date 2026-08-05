import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { collection, doc, getDoc, getDocs, limit, orderBy, query } from 'firebase/firestore';
import { db } from '../../lib/firebaseClient';
import { useAuth } from '../auth/AuthContext';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { resolveLocalizedText, type Locale, type TestResultDoc } from '@oriesup/shared-types';

interface EnrichedRecommendation {
  universityId: string;
  programId: string;
  score: number;
  universityName: string;
  programName: string;
}

export function ResultsPage() {
  const { schoolSlug } = useParams<{ schoolSlug: string }>();
  const { schoolId, user } = useAuth();
  const { t, i18n } = useTranslation();

  const [result, setResult] = useState<TestResultDoc | null>(null);
  const [recommendations, setRecommendations] = useState<EnrichedRecommendation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!schoolId || !user) return;
    (async () => {
      const snap = await getDocs(
        query(collection(db, 'schools', schoolId, 'students', user.uid, 'testResults'), orderBy('computedAt', 'desc'), limit(1))
      );
      if (snap.empty) {
        setLoading(false);
        return;
      }
      const data = snap.docs[0].data() as TestResultDoc;
      setResult(data);

      const enriched = await Promise.all(
        data.recommendations.map(async (r) => {
          const [uniSnap, progSnap] = await Promise.all([
            getDoc(doc(db, 'universities', r.universityId)),
            getDoc(doc(db, 'universities', r.universityId, 'programs', r.programId)),
          ]);
          return {
            ...r,
            universityName: uniSnap.exists() ? resolveLocalizedText(uniSnap.data().name, i18n.language as Locale) : '',
            programName: progSnap.exists() ? resolveLocalizedText(progSnap.data().name, i18n.language as Locale) : '',
          };
        })
      );
      setRecommendations(enriched);
      setLoading(false);
    })();
  }, [schoolId, user, i18n.language]);

  if (loading) return <p className="text-neutral-500">{t('common.loading')}</p>;

  if (!result) {
    return (
      <Card className="max-w-md">
        <p className="mb-4 text-neutral-600">{t('student.results.notTakenYet')}</p>
        <Link to={`/s/${schoolSlug}/student/test`}>
          <Button>{t('riasec.start')}</Button>
        </Link>
      </Card>
    );
  }

  return (
    <div className="max-w-2xl space-y-6">
      <Card>
        <p className="text-sm text-neutral-500">{t('riasec.yourCode')}</p>
        <p className="font-display text-4xl font-bold text-brandCta">{result.code}</p>
        <div className="mt-4 grid grid-cols-6 gap-2 text-center text-xs">
          {Object.entries(result.scores).map(([dim, score]) => (
            <div key={dim} className="rounded-xl bg-brandPrimary/10 p-2">
              <p className="font-bold">{dim}</p>
              <p>{score}</p>
            </div>
          ))}
        </div>
      </Card>

      <div>
        <h2 className="mb-3 text-lg font-bold">{t('riasec.recommendedPrograms')}</h2>
        <div className="space-y-3">
          {recommendations.map((r) => (
            <Card key={`${r.universityId}-${r.programId}`} className="flex items-center justify-between">
              <div>
                <p className="font-semibold">{r.programName}</p>
                <p className="text-sm text-neutral-500">{r.universityName}</p>
              </div>
              <span className="font-display font-bold text-brandCta">
                {r.score} {t('student.results.points')}
              </span>
            </Card>
          ))}
          {recommendations.length === 0 && (
            <p className="text-sm text-neutral-500">{t('student.results.noRecommendations')}</p>
          )}
        </div>
      </div>
    </div>
  );
}
