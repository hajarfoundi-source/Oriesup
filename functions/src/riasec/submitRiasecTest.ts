import { onCall, HttpsError } from 'firebase-functions/v2/https';
import { z } from 'zod';
import { db } from '../lib/admin';
import { requireRole } from '../lib/httpsError';
import { computeHollandCode, computeScores, scoreRecommendations } from './scoring';
import { getCandidatePrograms } from './entitledCandidates';
import type { RiasecDimension, TestResultDoc } from '@oriesup/shared-types';

const schema = z.object({
  answers: z.array(z.object({ questionId: z.string(), value: z.number().min(1).max(5) })).min(1),
});

/**
 * Student-only. Scores are computed entirely server-side from the question bank's
 * stored dimension — the client only ever supplies questionId + answer value, so a
 * tampered client-side dimension mapping cannot skew results.
 */
export const submitRiasecTest = onCall(async (request) => {
  const auth = requireRole(request.auth, 'student');
  const { answers } = schema.parse(request.data);
  const schoolId = auth.token.schoolId as string;
  const studentUid = auth.uid;

  const questionIds = [...new Set(answers.map((a) => a.questionId))];
  const questionSnaps = await Promise.all(questionIds.map((id) => db.collection('riasecQuestions').doc(id).get()));
  const dimensionByQuestion = new Map<string, RiasecDimension>();
  questionSnaps.forEach((snap, i) => {
    if (snap.exists) dimensionByQuestion.set(questionIds[i], snap.data()!.dimension);
  });
  if (dimensionByQuestion.size === 0) {
    throw new HttpsError('invalid-argument', 'None of the submitted questions were found.');
  }

  const scores = computeScores(answers, dimensionByQuestion);
  const code = computeHollandCode(scores);
  const candidates = await getCandidatePrograms(schoolId, studentUid);
  const recommendations = scoreRecommendations(code, candidates);

  const result: TestResultDoc = { answers, scores, code, recommendations, computedAt: Date.now() };
  const ref = await db
    .collection('schools').doc(schoolId)
    .collection('students').doc(studentUid)
    .collection('testResults').add(result);

  return { resultId: ref.id, scores, code, recommendations };
});
