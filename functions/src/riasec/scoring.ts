import type { RecommendationEntry, RiasecDimension, RiasecScores } from '@oriesup/shared-types';

export function computeScores(
  answers: Array<{ questionId: string; value: number }>,
  dimensionByQuestion: Map<string, RiasecDimension>
): RiasecScores {
  const totals: RiasecScores = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
  for (const { questionId, value } of answers) {
    const dim = dimensionByQuestion.get(questionId);
    if (dim) totals[dim] += value;
  }
  return totals;
}

/** Top-3 dimensions by score, highest first, joined into a Holland Code e.g. "SEC". */
export function computeHollandCode(scores: RiasecScores): string {
  return (Object.keys(scores) as RiasecDimension[])
    .sort((a, b) => scores[b] - scores[a])
    .slice(0, 3)
    .join('');
}

interface CandidateProgram {
  universityId: string;
  programId: string;
  riasecTags: RiasecDimension[];
}

/** Weights: matching the code's #1 letter counts most, #3 least. */
export function scoreRecommendations(code: string, candidates: CandidateProgram[], limit = 10): RecommendationEntry[] {
  const weights: Record<string, number> = { 0: 3, 1: 2, 2: 1 };
  const letters = code.split('');

  return candidates
    .map((c) => {
      let score = 0;
      letters.forEach((letter, idx) => {
        if (c.riasecTags.includes(letter as RiasecDimension)) score += weights[idx] ?? 0;
      });
      return { universityId: c.universityId, programId: c.programId, score };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}
