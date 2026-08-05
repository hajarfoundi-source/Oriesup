import type { TestPrepGroupScore, TestPrepSectionResult, TestPrepSectionType, TestPrepTrack } from '@oriesup/shared-types';

/**
 * These are approximate practice-test curves, not the real SAT/TOEFL/TCF equating tables
 * (which the test owners keep private and vary per test form). They're monotonic and land
 * in the right scale/granularity so students get a realistic-feeling estimate, not an
 * official score.
 */
function curveScore(correct: number, total: number, min: number, max: number, step: number, exponent = 1): number {
  if (total <= 0) return min;
  const p = Math.max(0, Math.min(1, correct / total));
  const raw = min + (max - min) * Math.pow(p, exponent);
  return Math.round(raw / step) * step;
}

export function tcfLevel(scaled: number): string {
  if (scaled < 200) return 'A1';
  if (scaled < 300) return 'A2';
  if (scaled < 400) return 'B1';
  if (scaled < 500) return 'B2';
  if (scaled < 600) return 'C1';
  return 'C2';
}

export interface GradableSection {
  key: string;
  title: string;
  type: TestPrepSectionType;
  graded: boolean;
  correct: number;
  total: number;
}

export function scoreSection(track: TestPrepTrack, section: GradableSection): TestPrepSectionResult {
  const base = {
    sectionKey: section.key,
    title: section.title,
    type: section.type,
    graded: section.graded,
    correct: section.correct,
    total: section.total,
  };

  if (!section.graded) return base;

  // The classic (paper-format) SAT doesn't score each section on its own — Reading and
  // Writing & Language combine into one Evidence-Based Reading and Writing score, and the
  // two Math sections combine into one Math score. That grouping happens in
  // computeComposite below, so individual SAT sections carry no scaled score of their own.
  if (track === 'sat') return base;

  if (track === 'toefl') {
    return { ...base, scaledScore: curveScore(section.correct, section.total, 0, 30, 1), scaleMax: 30 };
  }
  // tcf
  return { ...base, scaledScore: curveScore(section.correct, section.total, 100, 699, 1), scaleMax: 699 };
}

export function computeComposite(
  track: TestPrepTrack,
  sectionResults: TestPrepSectionResult[]
): { compositeScore: number; compositeScaleMax: number; compositeLabel: string; groupScores?: TestPrepGroupScore[] } {
  const graded = sectionResults.filter((s) => s.graded);

  if (track === 'sat') {
    const erwSections = graded.filter((s) => s.type === 'reading' || s.type === 'writing');
    const mathSections = graded.filter((s) => s.type === 'math');
    const erwCorrect = erwSections.reduce((sum, s) => sum + s.correct, 0);
    const erwTotal = erwSections.reduce((sum, s) => sum + s.total, 0);
    const mathCorrect = mathSections.reduce((sum, s) => sum + s.correct, 0);
    const mathTotal = mathSections.reduce((sum, s) => sum + s.total, 0);

    const erwScaled = curveScore(erwCorrect, erwTotal, 200, 800, 10, 1.1);
    const mathScaled = curveScore(mathCorrect, mathTotal, 200, 800, 10, 1.1);
    const total = erwScaled + mathScaled;

    const groupScores: TestPrepGroupScore[] = [
      { key: 'erw', label: 'Evidence-Based Reading and Writing', correct: erwCorrect, total: erwTotal, scaledScore: erwScaled, scaleMax: 800 },
      { key: 'math', label: 'Math', correct: mathCorrect, total: mathTotal, scaledScore: mathScaled, scaleMax: 800 },
    ];

    return { compositeScore: total, compositeScaleMax: 1600, compositeLabel: `${total} / 1600`, groupScores };
  }

  if (track === 'toefl') {
    const total = graded.reduce((sum, r) => sum + (r.scaledScore ?? 0), 0);
    return {
      compositeScore: total,
      compositeScaleMax: 60,
      compositeLabel: `${total} / 60 (Reading + Listening — the real TOEFL iBT also scores Writing and Speaking, out of 120 total)`,
    };
  }

  // tcf — average the three sections, map to a CECR level
  const avg = graded.length > 0 ? Math.round(graded.reduce((sum, r) => sum + (r.scaledScore ?? 0), 0) / graded.length) : 100;
  const level = tcfLevel(avg);
  return { compositeScore: avg, compositeScaleMax: 699, compositeLabel: `${avg} / 699 — Niveau ${level}` };
}
