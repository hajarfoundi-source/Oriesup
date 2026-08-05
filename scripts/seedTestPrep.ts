/**
 * Seeds the "Test Prep" services (TCF / TOEFL / SAT — 1500 MAD each) plus their course
 * content and mock test #1 (with a separate, never-client-readable answer key). Run with
 * `npx tsx scripts/seedTestPrep.ts` after `npm run seed`, while the emulators are running.
 */
process.env.FIRESTORE_EMULATOR_HOST = process.env.FIRESTORE_EMULATOR_HOST ?? '127.0.0.1:8080';

import { initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import type { AuthoredQuestion, AuthoredTest, TrackContent } from './testPrepContent/types';
import { tcf } from './testPrepContent/tcf';
import { toefl } from './testPrepContent/toefl';
import { sat } from './testPrepContent/sat';

initializeApp({ projectId: 'oriesup-dev' });
const db = getFirestore();
db.settings({ ignoreUndefinedProperties: true });

const SCHOOL_ID = 'demo-school';

const TRACKS: Array<{
  track: 'tcf' | 'toefl' | 'sat';
  name: { fr: string; ar: string; en: string };
  description: { fr: string; ar: string; en: string };
  content: TrackContent;
}> = [
  {
    track: 'tcf',
    name: { fr: 'Préparation au TCF', ar: 'التحضير لاختبار TCF', en: 'TCF Test Prep' },
    description: {
      fr: "Cours et tests blancs chronométrés pour te préparer au Test de Connaissance du Français (compréhension orale, écrite, structures de la langue).",
      ar: 'دروس واختبارات تجريبية موقوتة للتحضير لاختبار معرفة اللغة الفرنسية TCF.',
      en: 'Courses and timed mock tests to prepare for the TCF (listening, reading, grammar & structures).',
    },
    content: tcf,
  },
  {
    track: 'toefl',
    name: { fr: 'Préparation au TOEFL', ar: 'التحضير لاختبار TOEFL', en: 'TOEFL Test Prep' },
    description: {
      fr: 'Cours et tests blancs chronométrés pour te préparer au TOEFL iBT (reading, listening, writing).',
      ar: 'دروس واختبارات تجريبية موقوتة للتحضير لاختبار TOEFL iBT.',
      en: 'Courses and timed mock tests to prepare for the TOEFL iBT (Reading, Listening, Writing).',
    },
    content: toefl,
  },
  {
    track: 'sat',
    name: { fr: 'Préparation au SAT', ar: 'التحضير لاختبار SAT', en: 'SAT Test Prep' },
    description: {
      fr: 'Cours et tests blancs chronométrés pour te préparer au SAT (Reading, Writing and Language, Math avec et sans calculatrice).',
      ar: 'دروس واختبارات تجريبية موقوتة للتحضير لاختبار SAT (القراءة، الكتابة واللغة، الرياضيات بحاسبة وبدونها).',
      en: 'Courses and timed mock tests to prepare for the SAT (Reading, Writing and Language, Math with and without a calculator).',
    },
    content: sat,
  },
];

function stripAnswers(test: AuthoredTest) {
  const answerKey: Record<string, number> = {};
  const sections = test.sections.map((section) => ({
    key: section.key,
    title: section.title,
    type: section.type,
    graded: section.graded,
    durationSeconds: section.durationSeconds,
    instructions: section.instructions,
    audioNote: section.audioNote ?? false,
    questions: section.questions.map((q: AuthoredQuestion) => {
      if (q.type === 'mcq') {
        answerKey[q.id] = q.correctIndex;
        return { id: q.id, type: 'mcq', passage: q.passage, prompt: q.prompt, options: q.options };
      }
      return { id: q.id, type: 'essay', sourceText: q.sourceText, prompt: q.prompt, minWords: q.minWords, modelAnswer: q.modelAnswer };
    }),
  }));
  return { sections, answerKey };
}

async function deleteQuery(query: FirebaseFirestore.Query) {
  const snap = await query.get();
  await Promise.all(snap.docs.map((d) => d.ref.delete()));
  return snap.docs.map((d) => d.id);
}

/** Re-running this script should replace, not duplicate, each track's service/courses/tests/answer keys. */
async function clearExistingTrack(track: string) {
  const existingServices = await db.collection('services').where('testPrepTrack', '==', track).get();
  for (const serviceDoc of existingServices.docs) {
    const serviceId = serviceDoc.id;
    await deleteQuery(db.collection('testPrepCourses').where('serviceId', '==', serviceId));
    const testIds = await deleteQuery(db.collection('testPrepTests').where('serviceId', '==', serviceId));
    await Promise.all(testIds.map((testId) => db.collection('testPrepAnswerKeys').doc(testId).delete()));
    await deleteQuery(db.collection('testPrepAttempts').where('testId', 'in', testIds.length > 0 ? testIds : ['__none__']));
    await serviceDoc.ref.delete();
  }
}

async function main() {
  for (const { track, name, description, content } of TRACKS) {
    console.log(`Seeding ${track.toUpperCase()} Test Prep...`);
    await clearExistingTrack(track);

    const serviceRef = db.collection('services').doc();
    await serviceRef.set({
      name,
      description,
      process: [],
      advantages: [
        { fr: 'Cours structurés par section' },
        { fr: 'Tests blancs chronométrés, dans les conditions réelles' },
        { fr: "Score estimé sur l'échelle officielle" },
      ],
      notes: { fr: '' },
      price: 1500,
      currency: 'MAD',
      active: true,
      universityIds: [],
      testPrepTrack: track,
    });

    for (const course of content.courses) {
      await db.collection('testPrepCourses').add({
        serviceId: serviceRef.id,
        track,
        title: course.title,
        order: course.order,
        sections: course.sections,
      });
    }

    for (const test of content.tests) {
      const { sections, answerKey } = stripAnswers(test);
      const testRef = db.collection('testPrepTests').doc();
      await testRef.set({
        serviceId: serviceRef.id,
        track,
        title: test.title,
        order: test.order,
        sections,
      });
      await db.collection('testPrepAnswerKeys').doc(testRef.id).set({
        testId: testRef.id,
        answers: answerKey,
      });
    }

    // Convenience for local testing: pre-unlock TCF for the seeded demo student so the
    // full course + timed-test + scoring flow can be exercised without a real purchase.
    // TOEFL and SAT stay locked, to also exercise the purchase → entitlement path.
    if (track === 'tcf') {
      const studentsSnap = await db.collection('schools').doc(SCHOOL_ID).collection('students').limit(1).get();
      if (!studentsSnap.empty) {
        await db
          .collection('schools')
          .doc(SCHOOL_ID)
          .collection('students')
          .doc(studentsSnap.docs[0].id)
          .collection('entitlements')
          .doc(serviceRef.id)
          .set({ grantedAt: Date.now(), orderId: 'seed' });
      }
    }
  }

  console.log('\nTest prep seed complete: TCF, TOEFL, and SAT services created at 1500 MAD each.');
  console.log('The demo student already has TCF unlocked; TOEFL and SAT must be purchased or granted by an admin.');
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
