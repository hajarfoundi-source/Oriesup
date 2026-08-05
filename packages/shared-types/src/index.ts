// Shared Firestore document shapes used by both apps/web and functions.
// Keep this the single source of truth for document schemas.

export type Locale = 'fr' | 'ar' | 'en';

export type LocalizedText = Partial<Record<Locale, string>> & { fr: string };

export type Role = 'admin' | 'school' | 'student';

export interface UserDoc {
  role: Role;
  schoolId?: string;
  displayName: string;
  email?: string;
  contactPhone?: string;
  createdAt: number;
}

export interface BrandingConfig {
  bgColor: string;
  primaryColor: string;
  ctaColor: string;
}

export const DEFAULT_BRANDING: BrandingConfig = {
  bgColor: '#F4F1EC',
  primaryColor: '#9BACD8',
  ctaColor: '#F98513',
};

export interface SchoolDoc {
  slug: string;
  name: string;
  logoUrl: string;
  branding: BrandingConfig;
  defaultLocale: Locale;
  active: boolean;
  createdAt: number;
}

export interface SchoolPrivateSettingsDoc {
  cmiMerchantId?: string;
  cmiTerminalId?: string;
  billingContact?: string;
}

export type StudentStatus = 'pending_activation' | 'active';

export interface StudentDoc {
  schoolId: string;
  firstName: string;
  lastName: string;
  contactEmail?: string;
  contactPhone?: string;
  status: StudentStatus;
  gradeLevel?: string;
  classSection?: string;
  locale: Locale;
  createdAt: number;
  profileComplete?: boolean;
  profile?: StudentProfile;
}

export type IdDocumentType = 'passport' | 'national_id';
export type Gender = 'female' | 'male';

export interface StudentPersonalInfo {
  fullLegalName: string;
  idDocumentType: IdDocumentType;
  idDocumentNumber: string;
  dateOfBirth: string;
  placeOfBirth: string;
  motherName: string;
  fatherName: string;
  email: string;
  phone: string;
  gender: Gender;
  parentEmail: string;
  parentPhone: string;
}

export interface StudentEducationInfo {
  hasDegree: boolean;
  // when hasDegree === true
  lastDegreeAwarded?: string;
  finalGrade?: string;
  degreeSpeciality?: string;
  degreeInstitution?: string;
  // when hasDegree === false
  educationLevel?: string;
  graduationDate?: string;
  speciality?: string;
  institution?: string;
}

export interface LanguageTestResult {
  language: string;
  isCustom?: boolean;
  level?: string;
  testTaken: boolean;
  testName?: string;
  score?: string;
}

export const LANGUAGE_LEVELS = ['Débutant', 'Intermédiaire', 'Avancé', 'Courant', 'Natif'] as const;
export const OTHER_TEST_OPTION = 'Autre';

export interface AdmissionTestResult {
  testName: string;
  score?: string;
}

export interface StudentProgramChoice {
  degreeType: string;
  programName: string;
}

export interface StudentProfile {
  personalInfo: StudentPersonalInfo;
  educationInfo: StudentEducationInfo;
  languages: LanguageTestResult[];
  noLanguageTestsTaken: boolean;
  admissionTests: AdmissionTestResult[];
  noAdmissionTestsTaken: boolean;
  programChoice: StudentProgramChoice;
  completedAt: number;
}

export const LANGUAGE_PROFICIENCY_TESTS: Record<string, string[]> = {
  French: ['DELF', 'DALF', 'TCF', 'TEF'],
  English: ['TOEFL', 'IELTS', 'Cambridge (CAE/CPE)', 'Duolingo English Test'],
  Arabic: ['ALPT'],
  Spanish: ['DELE', 'SIELE'],
  German: ['TestDaF', 'Goethe-Zertifikat'],
};

export const ADMISSION_TESTS = ['SAT', 'ACT', 'GMAT', 'GRE', 'LSAT', 'MCAT'] as const;

export const DEGREE_TYPES = ["Bachelor's", "Master's", 'Doctorate', 'Other'] as const;

export interface AnnouncementDoc {
  title: LocalizedText;
  body: LocalizedText;
  imageUrl?: string;
  linkedServiceId?: string;
  createdBy: string;
  createdAt: number;
  active: boolean;
}

export type RiasecDimension = 'R' | 'I' | 'A' | 'S' | 'E' | 'C';

export interface RiasecScores {
  R: number;
  I: number;
  A: number;
  S: number;
  E: number;
  C: number;
}

export interface RecommendationEntry {
  universityId: string;
  programId: string;
  score: number;
}

export interface TestResultDoc {
  answers: Array<{ questionId: string; value: number }>;
  scores: RiasecScores;
  code: string;
  recommendations: RecommendationEntry[];
  computedAt: number;
}

export interface EntitlementDoc {
  grantedAt: number;
  orderId: string;
}

export interface InviteTokenDoc {
  schoolId: string;
  createdBy: string;
  expiresAt: number;
  maxUses: number;
  usedCount: number;
  active: boolean;
  studentUid?: string; // set for single-use bulk-add activation tokens
  createdAt: number;
}

export interface ServiceDoc {
  name: LocalizedText;
  description: LocalizedText;
  process: LocalizedText[];
  advantages: LocalizedText[];
  notes: LocalizedText;
  price: number;
  currency: string;
  active: boolean;
  universityIds: string[];
  testPrepTrack?: TestPrepTrack; // set when this service unlocks a test-prep track
}

export interface UniversityDoc {
  name: LocalizedText;
  city?: string;
  website?: string;
  logoUrl?: string;
  type?: string;
}

export interface ProgramDoc {
  name: LocalizedText;
  description: LocalizedText;
  degreeLevel?: string;
  riasecTags: RiasecDimension[];
}

export interface RiasecQuestionDoc {
  dimension: RiasecDimension;
  text: LocalizedText;
  order: number;
  active: boolean;
}

export type OrderBuyerType = 'school' | 'student';
export type OrderMethod = 'stripe' | 'cmi' | 'manual';
export type OrderStatus = 'pending' | 'processing' | 'confirmed' | 'failed' | 'cancelled';

export interface OrderDoc {
  buyerType: OrderBuyerType;
  schoolId: string;
  studentId?: string;
  serviceId: string;
  amount: number;
  currency: string;
  method: OrderMethod;
  status: OrderStatus;
  providerRef?: string;
  confirmedBy?: string;
  confirmedAt?: number;
  note?: string;
  createdAt: number;
}

export type FormFieldType = 'text' | 'textarea' | 'select' | 'date';

export interface FormFieldDef {
  id: string;
  label: string;
  type: FormFieldType;
  required: boolean;
  options?: string[]; // for type: 'select'
}

export type FormCategory = 'university_application' | 'scholarship_application' | 'language_test_prep' | 'other';
export const FORM_CATEGORIES: FormCategory[] = ['university_application', 'scholarship_application', 'language_test_prep', 'other'];

export interface FormDoc {
  serviceId: string;
  category: FormCategory;
  title: string;
  description: string;
  fields: FormFieldDef[];
  active: boolean;
  createdAt: number;
}

export type FormSubmissionStatus = 'submitted' | 'in_review' | 'approved' | 'changes_requested';

export interface FormSubmissionDoc {
  formId: string;
  serviceId: string;
  schoolId: string;
  studentId: string;
  answers: Record<string, string>;
  status: FormSubmissionStatus;
  reviewNote?: string;
  submittedAt: number;
  reviewedAt?: number;
  reviewedBy?: string;
}

export function resolveLocalizedText(text: LocalizedText, locale: Locale): string {
  return text[locale] ?? text.fr;
}

// ---------------------------------------------------------------------------
// Test prep (TCF / TOEFL / SAT courses + timed mock tests)
// ---------------------------------------------------------------------------

export type TestPrepTrack = 'tcf' | 'toefl' | 'sat';
export const TEST_PREP_TRACKS: TestPrepTrack[] = ['tcf', 'toefl', 'sat'];

export interface TestPrepCourseSection {
  heading: string;
  content: string; // plain text / simple markdown-ish paragraphs
}

export interface TestPrepCourseDoc {
  serviceId: string;
  track: TestPrepTrack;
  title: string;
  order: number;
  sections: TestPrepCourseSection[];
}

export type TestPrepSectionType = 'reading' | 'listening' | 'writing' | 'math' | 'grammar';

/** Multiple-choice question as delivered to the client — never carries the correct answer. */
export interface TestPrepChoiceQuestion {
  id: string;
  type: 'mcq';
  passage?: string; // reading passage, or the transcript read aloud via TTS for listening questions
  prompt: string;
  options: string[];
}

/** Open-ended writing prompt — never auto-graded, shown with a model answer after submission. */
export interface TestPrepEssayPrompt {
  id: string;
  type: 'essay';
  sourceText?: string; // for an integrated-writing-style task
  prompt: string;
  minWords?: number;
  modelAnswer: string;
}

export type TestPrepQuestion = TestPrepChoiceQuestion | TestPrepEssayPrompt;

export interface TestPrepSection {
  key: string;
  title: string;
  type: TestPrepSectionType;
  graded: boolean; // false for essay/writing sections (no automated scoring)
  durationSeconds: number;
  instructions: string;
  audioNote?: boolean; // true if this section's passages should be read aloud via speech synthesis
  questions: TestPrepQuestion[];
}

export interface TestPrepTestDoc {
  serviceId: string;
  track: TestPrepTrack;
  title: string;
  order: number;
  sections: TestPrepSection[];
}

/** Admin/server-only answer key, kept in a separate collection students can never read. */
export interface TestPrepAnswerKeyDoc {
  testId: string;
  answers: Record<string, number>; // questionId -> correctIndex, mcq questions only
}

export interface TestPrepSectionResult {
  sectionKey: string;
  title: string;
  type: TestPrepSectionType;
  graded: boolean;
  correct: number;
  total: number;
  scaledScore?: number; // section-level scaled score, for graded sections only
  scaleMax?: number;
}

/**
 * Some tracks score at a level above individual sections — e.g. the classic SAT combines
 * its separate Reading and Writing & Language sections into one 200-800 "Evidence-Based
 * Reading and Writing" score, and its two Math sections into one 200-800 Math score.
 * When present, the UI shows these instead of a per-section scaled score.
 */
export interface TestPrepGroupScore {
  key: string;
  label: string;
  correct: number;
  total: number;
  scaledScore: number;
  scaleMax: number;
}

export interface TestPrepAttemptDoc {
  testId: string;
  testTitle: string;
  track: TestPrepTrack;
  studentId: string;
  schoolId: string;
  answers: Record<string, string>; // questionId -> chosen option index (as string) or essay text
  sectionResults: TestPrepSectionResult[];
  groupScores?: TestPrepGroupScore[];
  compositeScore: number;
  compositeScaleMax: number;
  compositeLabel: string; // e.g. "1180 / 1600", "42 / 60 (practice)", "420 / 699 — B2"
  startedAt: number;
  submittedAt: number;
}
