import { onCall, HttpsError } from 'firebase-functions/v2/https';
import { z } from 'zod';
import { db } from '../lib/admin';
import { requireRole } from '../lib/httpsError';
import { computeComposite, scoreSection } from './scoring';
import type { TestPrepAnswerKeyDoc, TestPrepAttemptDoc, TestPrepSectionResult, TestPrepTestDoc } from '@oriesup/shared-types';

const schema = z.object({
  testId: z.string(),
  answers: z.record(z.string(), z.string()),
  startedAt: z.number(),
});

/**
 * Student-only. Grading happens entirely server-side against /testPrepAnswerKeys, which
 * students can never read directly — the client only ever sees question content, never
 * correct answers, so there's nothing to leak by inspecting network traffic during a test.
 */
export const submitTestPrepAttempt = onCall(async (request) => {
  const auth = requireRole(request.auth, 'student');
  const input = schema.parse(request.data);
  const schoolId = auth.token.schoolId as string;

  const testSnap = await db.collection('testPrepTests').doc(input.testId).get();
  if (!testSnap.exists) throw new HttpsError('not-found', 'Test not found.');
  const test = testSnap.data() as TestPrepTestDoc;

  const [schoolEntitlement, studentEntitlement] = await Promise.all([
    db.collection('schools').doc(schoolId).collection('entitlements').doc(test.serviceId).get(),
    db.collection('schools').doc(schoolId).collection('students').doc(auth.uid).collection('entitlements').doc(test.serviceId).get(),
  ]);
  if (!schoolEntitlement.exists && !studentEntitlement.exists) {
    throw new HttpsError('permission-denied', "You don't have access to this test prep track yet.");
  }

  const keySnap = await db.collection('testPrepAnswerKeys').doc(input.testId).get();
  if (!keySnap.exists) throw new HttpsError('failed-precondition', 'This test has no answer key configured.');
  const answerKey = (keySnap.data() as TestPrepAnswerKeyDoc).answers;

  const sectionResults: TestPrepSectionResult[] = test.sections.map((section) => {
    if (!section.graded) {
      return scoreSection(test.track, {
        key: section.key,
        title: section.title,
        type: section.type,
        graded: false,
        correct: 0,
        total: section.questions.length,
      });
    }
    let correct = 0;
    for (const q of section.questions) {
      if (q.type !== 'mcq') continue;
      const correctIndex = answerKey[q.id];
      const given = input.answers[q.id];
      if (given != null && correctIndex != null && Number(given) === correctIndex) correct++;
    }
    return scoreSection(test.track, {
      key: section.key,
      title: section.title,
      type: section.type,
      graded: true,
      correct,
      total: section.questions.length,
    });
  });

  const composite = computeComposite(test.track, sectionResults);

  const attempt: TestPrepAttemptDoc = {
    testId: input.testId,
    testTitle: test.title,
    track: test.track,
    studentId: auth.uid,
    schoolId,
    answers: input.answers,
    sectionResults,
    ...composite,
    startedAt: input.startedAt,
    submittedAt: Date.now(),
  };

  const ref = await db.collection('testPrepAttempts').add(attempt);
  return { attemptId: ref.id, ...attempt };
});
