import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../lib/firebaseClient';
import { Card } from '../../../components/Card';
import { Button } from '../../../components/Button';
import { TextAreaField } from '../../../components/TextAreaField';
import { submitTestPrepAttempt } from '../../../lib/api';
import type { TestPrepAttemptDoc, TestPrepChoiceQuestion, TestPrepEssayPrompt, TestPrepTestDoc } from '@oriesup/shared-types';

const TTS_LANG: Record<string, string> = { tcf: 'fr-FR', toefl: 'en-US', sat: 'en-US' };

function formatClock(totalSeconds: number) {
  const m = Math.floor(Math.max(0, totalSeconds) / 60);
  const s = Math.max(0, totalSeconds) % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

type Phase = 'loading' | 'error' | 'intro' | 'section' | 'submitting' | 'result';

export function TestPrepTestPage() {
  const { schoolSlug, serviceId, testId } = useParams<{ schoolSlug: string; serviceId: string; testId: string }>();
  const { t } = useTranslation();

  const [phase, setPhase] = useState<Phase>('loading');
  const [error, setError] = useState<string | null>(null);
  const [test, setTest] = useState<TestPrepTestDoc | null>(null);

  const [sectionIndex, setSectionIndex] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [playCounts, setPlayCounts] = useState<Record<string, number>>({});
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [result, setResult] = useState<(TestPrepAttemptDoc & { attemptId: string }) | null>(null);

  const answersRef = useRef(answers);
  answersRef.current = answers;
  const sectionIndexRef = useRef(sectionIndex);
  sectionIndexRef.current = sectionIndex;

  useEffect(() => {
    if (!testId) return;
    (async () => {
      try {
        const snap = await getDoc(doc(db, 'testPrepTests', testId));
        if (!snap.exists()) {
          setError(t('student.testPrep.testNotFound'));
          setPhase('error');
          return;
        }
        setTest(snap.data() as TestPrepTestDoc);
        setPhase('intro');
      } catch (err) {
        setError((err as Error).message);
        setPhase('error');
      }
    })();
    return () => window.speechSynthesis?.cancel();
  }, [testId]);

  // Section countdown — auto-advances (or auto-submits, on the last section) when it hits zero.
  useEffect(() => {
    if (phase !== 'section') return;
    if (secondsLeft <= 0) {
      goToNextSection();
      return;
    }
    const timer = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, secondsLeft]);

  if (phase === 'loading') return <p className="text-neutral-500">{t('common.loading')}</p>;
  if (phase === 'error') return <p className="text-red-600">{error}</p>;
  if (!test) return null;

  function startTest() {
    setStartedAt(Date.now());
    setSectionIndex(0);
    setQuestionIndex(0);
    setSecondsLeft(test!.sections[0].durationSeconds);
    setPhase('section');
  }

  function goToNextSection() {
    window.speechSynthesis?.cancel();
    const nextIndex = sectionIndexRef.current + 1;
    if (nextIndex >= test!.sections.length) {
      handleSubmit();
      return;
    }
    setSectionIndex(nextIndex);
    setQuestionIndex(0);
    setSecondsLeft(test!.sections[nextIndex].durationSeconds);
  }

  function goToNextQuestion() {
    const section = test!.sections[sectionIndex];
    if (questionIndex + 1 >= section.questions.length) {
      goToNextSection();
      return;
    }
    setQuestionIndex((i) => i + 1);
  }

  async function handleSubmit() {
    window.speechSynthesis?.cancel();
    setPhase('submitting');
    try {
      const res = await submitTestPrepAttempt({ testId: testId!, answers: answersRef.current, startedAt: startedAt ?? Date.now() });
      setResult(res);
      setPhase('result');
    } catch (err) {
      setError((err as Error).message);
      setPhase('error');
    }
  }

  function speak(text: string) {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = TTS_LANG[test!.track] ?? 'en-US';
    utterance.rate = 0.95;
    window.speechSynthesis.speak(utterance);
  }

  if (phase === 'intro') {
    return (
      <div className="mx-auto max-w-2xl space-y-6">
        <Link to={`/s/${schoolSlug}/student/test-prep/${serviceId}`} className="text-sm font-semibold text-brandCta">
          ← {t('student.testPrep.backToTrack')}
        </Link>
        <h1 className="text-2xl font-bold">{test.title}</h1>
        <Card className="space-y-4">
          {test.sections.map((s) => (
            <div key={s.key} className="flex items-center justify-between border-b border-neutral-100 pb-3 last:border-0 last:pb-0">
              <div>
                <p className="font-semibold">{s.title}</p>
                <p className="text-sm text-neutral-500">{s.questions.length} {t('student.testPrep.questions')}</p>
              </div>
              <span className="flex-shrink-0 font-display font-bold text-brandCta">{formatClock(s.durationSeconds)}</span>
            </div>
          ))}
        </Card>
        <p className="text-sm text-neutral-500">{t('student.testPrep.timedWarning')}</p>
        <Button onClick={startTest}>{t('student.testPrep.start')}</Button>
      </div>
    );
  }

  if (phase === 'submitting') {
    return <p className="text-neutral-500">{t('student.testPrep.grading')}</p>;
  }

  if (phase === 'result' && result) {
    return (
      <div className="mx-auto max-w-2xl space-y-6">
        <Card className="text-center">
          <p className="text-sm text-neutral-500">{test.title}</p>
          <p className="mt-1 font-display text-3xl font-bold text-brandCta">{result.compositeLabel}</p>
        </Card>

        {result.groupScores && result.groupScores.length > 0 && (
          <div className="grid grid-cols-2 gap-3">
            {result.groupScores.map((g) => (
              <Card key={g.key} className="text-center">
                <p className="text-sm text-neutral-500">{g.label}</p>
                <p className="mt-1 font-display text-2xl font-bold text-brandCta">
                  {g.scaledScore} / {g.scaleMax}
                </p>
                <p className="mt-1 text-xs text-neutral-400">
                  {g.correct} / {g.total} {t('student.testPrep.correct')}
                </p>
              </Card>
            ))}
          </div>
        )}

        <div className="space-y-3">
          {result.sectionResults.map((sr) => (
            <Card key={sr.sectionKey}>
              <div className="flex items-center justify-between">
                <p className="font-semibold">{sr.title}</p>
                {sr.graded ? (
                  sr.scaledScore != null && (
                    <span className="font-display font-bold text-brandCta">
                      {sr.scaledScore} / {sr.scaleMax}
                    </span>
                  )
                ) : (
                  <span className="text-sm text-neutral-500">{t('student.testPrep.ungraded')}</span>
                )}
              </div>
              {sr.graded && (
                <p className="mt-1 text-sm text-neutral-500">
                  {sr.correct} / {sr.total} {t('student.testPrep.correct')}
                </p>
              )}
            </Card>
          ))}
        </div>

        {test.sections
          .filter((s) => !s.graded)
          .map((s) => (
            <div key={s.key} className="space-y-3">
              <h2 className="text-lg font-bold">{s.title} — {t('student.testPrep.reviewYourWriting')}</h2>
              {s.questions.map((q) => {
                if (q.type !== 'essay') return null;
                return (
                  <Card key={q.id} className="space-y-3">
                    <p className="text-sm font-medium text-neutral-700">{q.prompt}</p>
                    <div>
                      <p className="text-xs font-semibold uppercase text-neutral-400">{t('student.testPrep.yourAnswer')}</p>
                      <p className="mt-1 whitespace-pre-line text-sm text-neutral-700">{result.answers[q.id] || t('student.testPrep.noAnswer')}</p>
                    </div>
                    <div className="rounded-xl bg-brandPrimary/5 p-3">
                      <p className="text-xs font-semibold uppercase text-brandPrimary">{t('student.testPrep.modelAnswer')}</p>
                      <p className="mt-1 whitespace-pre-line text-sm text-neutral-700">{q.modelAnswer}</p>
                    </div>
                  </Card>
                );
              })}
            </div>
          ))}

        <Link to={`/s/${schoolSlug}/student/test-prep/${serviceId}`}>
          <Button variant="ghost">{t('student.testPrep.backToTrack')}</Button>
        </Link>
      </div>
    );
  }

  // phase === 'section'
  const section = test.sections[sectionIndex];
  const question = section.questions[questionIndex];
  const isLastQuestionOfSection = questionIndex + 1 >= section.questions.length;
  const isLastSection = sectionIndex + 1 >= test.sections.length;

  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-neutral-500">{section.title}</p>
          <p className="text-xs text-neutral-400">
            {t('student.testPrep.question')} {questionIndex + 1} / {section.questions.length}
          </p>
        </div>
        <span className={`font-display text-xl font-bold ${secondsLeft <= 30 ? 'text-red-600' : 'text-brandCta'}`}>{formatClock(secondsLeft)}</span>
      </div>

      <Card className="space-y-4">
        {question.type === 'mcq' ? (
          <McqQuestion
            question={question}
            audio={Boolean(section.audioNote)}
            playCount={playCounts[question.id] ?? 0}
            onPlay={() => {
              speak(question.passage ?? '');
              setPlayCounts((p) => ({ ...p, [question.id]: (p[question.id] ?? 0) + 1 }));
            }}
            value={answers[question.id]}
            onChange={(v) => setAnswers((a) => ({ ...a, [question.id]: v }))}
          />
        ) : (
          <EssayQuestion question={question} value={answers[question.id] ?? ''} onChange={(v) => setAnswers((a) => ({ ...a, [question.id]: v }))} />
        )}
      </Card>

      <div className="flex justify-end">
        <Button onClick={goToNextQuestion}>
          {isLastQuestionOfSection ? (isLastSection ? t('student.testPrep.finish') : t('student.testPrep.nextSection')) : t('common.next')}
        </Button>
      </div>
    </div>
  );
}

function McqQuestion({
  question,
  audio,
  playCount,
  onPlay,
  value,
  onChange,
}: {
  question: TestPrepChoiceQuestion;
  audio: boolean;
  playCount: number;
  onPlay: () => void;
  value: string | undefined;
  onChange: (value: string) => void;
}) {
  const { t } = useTranslation();
  return (
    <>
      {audio ? (
        <Button variant="ghost" className="border border-dashed border-neutral-300" disabled={playCount >= 1} onClick={onPlay}>
          {playCount >= 1 ? t('student.testPrep.played') : `🔊 ${t('student.testPrep.listen')}`}
        </Button>
      ) : (
        question.passage && <p className="whitespace-pre-line rounded-xl bg-neutral-50 p-4 text-sm leading-relaxed text-neutral-700">{question.passage}</p>
      )}
      <p className="font-medium">{question.prompt}</p>
      <div className="space-y-2">
        {question.options.map((opt, i) => (
          <label
            key={i}
            className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3 text-sm transition ${
              value === String(i) ? 'border-brandCta bg-brandCta/5' : 'border-neutral-200'
            }`}
          >
            <input type="radio" name={question.id} checked={value === String(i)} onChange={() => onChange(String(i))} className="h-4 w-4" />
            {opt}
          </label>
        ))}
      </div>
    </>
  );
}

function EssayQuestion({ question, value, onChange }: { question: TestPrepEssayPrompt; value: string; onChange: (value: string) => void }) {
  const { t } = useTranslation();
  const wordCount = value.trim().length === 0 ? 0 : value.trim().split(/\s+/).length;
  return (
    <>
      {question.sourceText && <p className="whitespace-pre-line rounded-xl bg-neutral-50 p-4 text-sm leading-relaxed text-neutral-700">{question.sourceText}</p>}
      <p className="font-medium">{question.prompt}</p>
      <TextAreaField label={t('student.testPrep.yourAnswer')} value={value} onChange={(e) => onChange(e.target.value)} rows={10} />
      <p className="text-right text-xs text-neutral-400">
        {wordCount} {t('student.testPrep.words')}
        {question.minWords ? ` (${t('student.testPrep.minWords', { count: question.minWords })})` : ''}
      </p>
    </>
  );
}
