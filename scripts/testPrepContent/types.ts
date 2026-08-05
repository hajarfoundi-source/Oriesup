// Authoring-time shapes for seed content: MCQ questions carry `correctIndex` here.
// The seed script strips it out before writing `testPrepTests` (student-readable) and
// moves it into the separate `testPrepAnswerKeys` collection (never client-readable).

export type SectionType = 'reading' | 'listening' | 'writing' | 'math' | 'grammar';

export interface AuthoredChoiceQuestion {
  id: string;
  type: 'mcq';
  passage?: string;
  prompt: string;
  options: string[];
  correctIndex: number;
}

export interface AuthoredEssayPrompt {
  id: string;
  type: 'essay';
  sourceText?: string;
  prompt: string;
  minWords?: number;
  modelAnswer: string;
}

export type AuthoredQuestion = AuthoredChoiceQuestion | AuthoredEssayPrompt;

export interface AuthoredSection {
  key: string;
  title: string;
  type: SectionType;
  graded: boolean;
  durationSeconds: number;
  instructions: string;
  audioNote?: boolean;
  questions: AuthoredQuestion[];
}

export interface AuthoredTest {
  title: string;
  order: number;
  sections: AuthoredSection[];
}

export interface AuthoredCourseSection {
  heading: string;
  content: string;
}

export interface AuthoredCourse {
  title: string;
  order: number;
  sections: AuthoredCourseSection[];
}

export interface TrackContent {
  courses: AuthoredCourse[];
  tests: AuthoredTest[];
}
