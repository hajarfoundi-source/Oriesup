import { httpsCallable } from 'firebase/functions';
import { functions } from './firebaseClient';
import type {
  AdmissionTestResult,
  FormCategory,
  FormFieldDef,
  LanguageTestResult,
  RecommendationEntry,
  RiasecScores,
  StudentEducationInfo,
  StudentPersonalInfo,
  StudentProgramChoice,
  TestPrepAttemptDoc,
} from '@oriesup/shared-types';

function callable<Req, Res>(name: string) {
  const fn = httpsCallable<Req, Res>(functions, name);
  return (data: Req) => fn(data).then((r) => r.data);
}

export const createSchool = callable<
  { slug: string; name: string; contactEmail: string; contactPassword: string; contactDisplayName: string; defaultLocale?: string },
  { schoolId: string; staffUid: string }
>('createSchool');

export const createSignupInvite = callable<
  { expiresInDays?: number; maxUses?: number; schoolId?: string },
  { token: string; joinUrl: string }
>('createSignupInvite');

export const redeemSignupInvite = callable<
  { token: string; email: string; password: string; firstName: string; lastName: string; locale?: string },
  { customToken: string; schoolId: string }
>('redeemSignupInvite');

export const bulkAddStudents = callable<
  { schoolId?: string; students: Array<{ firstName: string; lastName: string; contactEmail?: string; contactPhone?: string; gradeLevel?: string; classSection?: string; locale?: string }> },
  { created: Array<{ uid: string; activationToken: string; activationUrl: string }> }
>('bulkAddStudents');

export const activateStudentAccount = callable<
  { activationToken: string; email: string; newPassword: string },
  { customToken: string; schoolId: string }
>('activateStudentAccount');

export const createService = callable<
  {
    name: Record<string, string>;
    description: Record<string, string>;
    process?: Record<string, string>[];
    advantages?: Record<string, string>[];
    notes?: Record<string, string>;
    price: number;
    currency?: string;
    universityIds?: string[];
  },
  { serviceId: string }
>('createService');

export const updateService = callable<
  Partial<{
    name: Record<string, string>;
    description: Record<string, string>;
    process: Record<string, string>[];
    advantages: Record<string, string>[];
    notes: Record<string, string>;
    price: number;
    currency: string;
    universityIds: string[];
  }> & { serviceId: string },
  { ok: boolean }
>('updateService');

export const createUniversity = callable<
  { name: Record<string, string>; city?: string; website?: string; type?: string },
  { universityId: string }
>('createUniversity');

export const createProgram = callable<
  { universityId: string; name: Record<string, string>; description: Record<string, string>; degreeLevel?: string; riasecTags: string[] },
  { programId: string }
>('createProgram');

export const submitRiasecTest = callable<
  { answers: Array<{ questionId: string; value: number }> },
  { resultId: string; scores: RiasecScores; code: string; recommendations: RecommendationEntry[] }
>('submitRiasecTest');

export const createOrder = callable<
  { serviceId: string; buyerType: 'school' | 'student'; studentId?: string; method: 'stripe' | 'cmi' | 'manual' },
  { orderId: string; amount: number; currency: string }
>('createOrder');

export const createStripeCheckoutSession = callable<
  { orderIds: string[]; successUrl: string; cancelUrl: string },
  { sessionUrl: string }
>('createStripeCheckoutSession');

export const confirmManualPayment = callable<
  { orderId: string; reference: string; note?: string },
  { ok: boolean }
>('confirmManualPayment');

export const adminGrantEntitlement = callable<
  { schoolId: string; studentId: string; serviceId: string; note?: string },
  { ok: boolean; orderId: string }
>('adminGrantEntitlement');

export const createForm = callable<
  { serviceId: string; category: FormCategory; title: string; description?: string; fields: FormFieldDef[] },
  { formId: string }
>('createForm');

export const updateForm = callable<
  Partial<{ serviceId: string; category: FormCategory; title: string; description: string; fields: FormFieldDef[]; active: boolean }> & { formId: string },
  { ok: boolean }
>('updateForm');

export const submitFormResponse = callable<
  { formId: string; answers: Record<string, string> },
  { ok: boolean; submissionId: string }
>('submitFormResponse');

export const reviewFormSubmission = callable<
  { submissionId: string; status: 'in_review' | 'approved' | 'changes_requested'; reviewNote?: string },
  { ok: boolean }
>('reviewFormSubmission');

export const submitStudentProfile = callable<
  {
    personalInfo: StudentPersonalInfo;
    educationInfo: StudentEducationInfo;
    languages: LanguageTestResult[];
    noLanguageTestsTaken: boolean;
    admissionTests: AdmissionTestResult[];
    noAdmissionTestsTaken: boolean;
    programChoice: StudentProgramChoice;
  },
  { ok: boolean }
>('submitStudentProfile');

export const createAnnouncement = callable<
  { title: Record<string, string>; body: Record<string, string>; imageUrl?: string; linkedServiceId?: string },
  { announcementId: string }
>('createAnnouncement');

export const submitTestPrepAttempt = callable<
  { testId: string; answers: Record<string, string>; startedAt: number },
  { attemptId: string } & TestPrepAttemptDoc
>('submitTestPrepAttempt');
