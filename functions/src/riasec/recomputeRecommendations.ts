import { onCall, HttpsError } from 'firebase-functions/v2/https';
import { z } from 'zod';
import { db } from '../lib/admin';
import { requireRole, parseInput } from '../lib/httpsError';
import { scoreRecommendations } from './scoring';
import { getCandidatePrograms } from './entitledCandidates';

const schema = z.object({
  studentUid: z.string(),
  resultId: z.string(),
});

/** Admin or the owning school can refresh recommendations after the catalog changes, without a retake. */
export const recomputeRecommendations = onCall(async (request) => {
  const auth = requireRole(request.auth, 'admin', 'school');
  const { studentUid, resultId } = parseInput(schema, request.data);

  const schoolId = auth.token.role === 'admin' ? (request.data?.schoolId as string | undefined) : (auth.token.schoolId as string);
  if (!schoolId) throw new HttpsError('invalid-argument', 'schoolId is required.');

  const resultRef = db.collection('schools').doc(schoolId).collection('students').doc(studentUid).collection('testResults').doc(resultId);
  const resultSnap = await resultRef.get();
  if (!resultSnap.exists) throw new HttpsError('not-found', 'Test result not found.');

  const { code } = resultSnap.data()!;
  const candidates = await getCandidatePrograms(schoolId, studentUid);
  const recommendations = scoreRecommendations(code, candidates);

  await resultRef.update({ recommendations });
  return { recommendations };
});
