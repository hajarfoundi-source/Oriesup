import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { db } from '../../lib/firebaseClient';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { submitRiasecTest } from '../../lib/api';
import { resolveLocalizedText, type Locale, type RiasecQuestionDoc } from '@oriesup/shared-types';

interface QuestionRow extends RiasecQuestionDoc {
  id: string;
}

const SCALE = [1, 2, 3, 4, 5];

export function RiasecTestPage() {
  const { schoolSlug } = useParams<{ schoolSlug: string }>();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState<QuestionRow[]>([]);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const snap = await getDocs(query(collection(db, 'riasecQuestions'), where('active', '==', true), orderBy('order')));
      setQuestions(snap.docs.map((d) => ({ id: d.id, ...(d.data() as RiasecQuestionDoc) })));
    })();
  }, []);

  const current = questions[step];
  const progress = questions.length > 0 ? ((step + 1) / questions.length) * 100 : 0;

  function answer(value: number) {
    if (!current) return;
    setAnswers((prev) => ({ ...prev, [current.id]: value }));
    if (step < questions.length - 1) {
      setStep(step + 1);
    }
  }

  async function handleSubmit() {
    setSubmitting(true);
    setError(null);
    try {
      await submitRiasecTest({
        answers: Object.entries(answers).map(([questionId, value]) => ({ questionId, value })),
      });
      navigate(`/s/${schoolSlug}/student/results`);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSubmitting(false);
    }
  }

  if (questions.length === 0) {
    return <p className="text-neutral-500">{t('common.loading')}</p>;
  }

  const isLastStep = step === questions.length - 1;
  const allAnswered = Object.keys(answers).length === questions.length;

  return (
    <div className="mx-auto max-w-xl">
      <div className="mb-6 h-2 w-full overflow-hidden rounded-full bg-black/10">
        <div className="h-full rounded-full bg-brandCta transition-all" style={{ width: `${progress}%` }} />
      </div>
      <Card className="text-center">
        <p className="mb-8 text-lg font-medium">{resolveLocalizedText(current.text, i18n.language as Locale)}</p>
        <div className="flex justify-center gap-3">
          {SCALE.map((value) => (
            <button
              key={value}
              onClick={() => answer(value)}
              className={`flex h-12 w-12 items-center justify-center rounded-full border-2 font-bold transition ${
                answers[current.id] === value ? 'border-brandCta bg-brandCta text-white' : 'border-neutral-200 text-neutral-500 hover:border-brandPrimary'
              }`}
            >
              {value}
            </button>
          ))}
        </div>
        <p className="mt-8 text-xs text-neutral-400">{t('riasec.intro')}</p>
      </Card>

      {isLastStep && allAnswered && (
        <div className="mt-6 text-center">
          {error && <p className="mb-3 text-sm text-red-600">{error}</p>}
          <Button onClick={handleSubmit} disabled={submitting}>
            {t('riasec.submit')}
          </Button>
        </div>
      )}
    </div>
  );
}
