import { onCall } from 'firebase-functions/v2/https';
import { z } from 'zod';
import { db } from '../lib/admin';
import { requireRole, parseInput } from '../lib/httpsError';
import { ADMISSION_TESTS, DEGREE_TYPES, type StudentProfile } from '@oriesup/shared-types';

/**
 * The callable-functions client SDK encodes `undefined` fields as `null` on the wire
 * (see @firebase/functions encode()), which a plain z.string().optional() rejects.
 * Accept null too and normalize it back to undefined.
 */
const optionalString = z
  .string()
  .nullable()
  .optional()
  .transform((v) => v ?? undefined);

const personalInfoSchema = z.object({
  fullLegalName: z.string().min(1),
  idDocumentType: z.enum(['passport', 'national_id']),
  idDocumentNumber: z.string().min(1),
  dateOfBirth: z.string().min(1),
  placeOfBirth: z.string().min(1),
  motherName: z.string().min(1),
  fatherName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  gender: z.enum(['female', 'male']),
  parentEmail: z.string().email(),
  parentPhone: z.string().min(1),
});

const educationInfoSchema = z
  .object({
    hasDegree: z.boolean(),
    lastDegreeAwarded: optionalString,
    finalGrade: optionalString,
    degreeSpeciality: optionalString,
    degreeInstitution: optionalString,
    educationLevel: optionalString,
    graduationDate: optionalString,
    speciality: optionalString,
    institution: optionalString,
  })
  .superRefine((val, ctx) => {
    if (val.hasDegree) {
      for (const field of ['lastDegreeAwarded', 'finalGrade', 'degreeSpeciality', 'degreeInstitution'] as const) {
        if (!val[field]) ctx.addIssue({ code: z.ZodIssueCode.custom, path: [field], message: 'Required' });
      }
    } else {
      for (const field of ['educationLevel', 'graduationDate', 'speciality', 'institution'] as const) {
        if (!val[field]) ctx.addIssue({ code: z.ZodIssueCode.custom, path: [field], message: 'Required' });
      }
    }
  });

const languageSchema = z
  .object({
    language: z.string().min(1),
    isCustom: z.boolean().nullable().optional().transform((v) => v ?? undefined),
    level: optionalString,
    testTaken: z.boolean(),
    testName: optionalString,
    score: optionalString,
  })
  .superRefine((val, ctx) => {
    if (val.testTaken && !val.testName) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['testName'], message: 'Required when a test was taken' });
    }
    if (val.isCustom && !val.level) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['level'], message: 'Required for a custom language' });
    }
  });

const admissionTestSchema = z.object({
  testName: z.enum(ADMISSION_TESTS),
  score: optionalString,
});

const programChoiceSchema = z.object({
  degreeType: z.enum(DEGREE_TYPES),
  programName: z.string().min(1),
});

const schema = z
  .object({
    personalInfo: personalInfoSchema,
    educationInfo: educationInfoSchema,
    languages: z.array(languageSchema),
    noLanguageTestsTaken: z.boolean(),
    admissionTests: z.array(admissionTestSchema),
    noAdmissionTestsTaken: z.boolean(),
    programChoice: programChoiceSchema,
  })
  .superRefine((val, ctx) => {
    if (val.languages.length === 0) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['languages'], message: 'Select at least one language' });
    }
    if (val.admissionTests.length === 0 && !val.noAdmissionTestsTaken) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['admissionTests'],
        message: 'Select at least one test, or confirm none were taken',
      });
    }
  });

/**
 * Student-only. Every section is mandatory (enforced server-side, not just in the UI) —
 * a student cannot register for a paid service until this has been submitted at least
 * once (see createOrder's profileComplete check). Re-submitting overwrites in place.
 */
export const submitStudentProfile = onCall(async (request) => {
  const auth = requireRole(request.auth, 'student');
  const input = parseInput(schema, request.data);
  const schoolId = auth.token.schoolId as string;

  const profile: StudentProfile = { ...input, completedAt: Date.now() };

  await db
    .collection('schools').doc(schoolId)
    .collection('students').doc(auth.uid)
    .update({ profile, profileComplete: true });

  return { ok: true };
});
