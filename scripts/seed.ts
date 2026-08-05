/**
 * Seeds the Firebase Emulator Suite with a fixture: one platform admin, one branded
 * demo school, a handful of universities/programs/services with RIASEC tags, the
 * RIASEC question bank, and one demo student. Run with `npm run seed` while the
 * emulators are running (npm run emulators, in another terminal).
 */
process.env.FIRESTORE_EMULATOR_HOST = process.env.FIRESTORE_EMULATOR_HOST ?? '127.0.0.1:8080';
process.env.FIREBASE_AUTH_EMULATOR_HOST = process.env.FIREBASE_AUTH_EMULATOR_HOST ?? '127.0.0.1:9099';

import { initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';

initializeApp({ projectId: 'oriesup-dev' });
const db = getFirestore();
const auth = getAuth();

const RIASEC_QUESTIONS: Array<{ dimension: string; text: { fr: string; ar: string; en: string } }> = [
  { dimension: 'R', text: { fr: 'Réparer un appareil électronique', ar: 'إصلاح جهاز إلكتروني', en: 'Repair an electronic device' } },
  { dimension: 'R', text: { fr: 'Travailler avec des outils ou des machines', ar: 'العمل بأدوات أو آلات', en: 'Work with tools or machines' } },
  { dimension: 'I', text: { fr: 'Résoudre un problème mathématique complexe', ar: 'حل مسألة رياضية معقدة', en: 'Solve a complex math problem' } },
  { dimension: 'I', text: { fr: "Mener une expérience scientifique", ar: 'إجراء تجربة علمية', en: 'Conduct a scientific experiment' } },
  { dimension: 'A', text: { fr: 'Dessiner, peindre ou composer de la musique', ar: 'الرسم أو التلوين أو تأليف الموسيقى', en: 'Draw, paint, or compose music' } },
  { dimension: 'A', text: { fr: 'Écrire une histoire ou un poème', ar: 'كتابة قصة أو قصيدة', en: 'Write a story or poem' } },
  { dimension: 'S', text: { fr: 'Aider un camarade en difficulté', ar: 'مساعدة زميل يواجه صعوبة', en: 'Help a struggling classmate' } },
  { dimension: 'S', text: { fr: 'Animer un groupe ou enseigner', ar: 'تنشيط مجموعة أو التدريس', en: 'Lead a group or teach' } },
  { dimension: 'E', text: { fr: 'Convaincre quelqu\'un d\'adopter ton idée', ar: 'إقناع شخص بفكرتك', en: "Convince someone of your idea" } },
  { dimension: 'E', text: { fr: 'Lancer et gérer ton propre projet', ar: 'إطلاق وإدارة مشروعك الخاص', en: 'Start and manage your own project' } },
  { dimension: 'C', text: { fr: 'Organiser des données dans un tableau', ar: 'تنظيم البيانات في جدول', en: 'Organize data in a spreadsheet' } },
  { dimension: 'C', text: { fr: 'Suivre des procédures précises et méthodiques', ar: 'اتباع إجراءات دقيقة ومنهجية', en: 'Follow precise, methodical procedures' } },
];

async function upsertUser(email: string, password: string, displayName: string, claims: Record<string, unknown>) {
  const existing = await auth.getUserByEmail(email).catch(() => null);
  const user = existing ?? (await auth.createUser({ email, password, displayName }));
  await auth.setCustomUserClaims(user.uid, claims);
  return user;
}

async function main() {
  console.log('Seeding admin user...');
  const admin = await upsertUser('admin@oriesup.dev', 'password123', 'Oriesup Admin', { role: 'admin' });
  await db.collection('users').doc(admin.uid).set({
    role: 'admin',
    displayName: 'Oriesup Admin',
    email: 'admin@oriesup.dev',
    createdAt: Date.now(),
  });

  console.log('Seeding demo school...');
  const schoolRef = db.collection('schools').doc('demo-school');
  await schoolRef.set({
    slug: 'demo',
    name: 'Lycée Démo',
    logoUrl: '',
    branding: { bgColor: '#F4F1EC', primaryColor: '#9BACD8', ctaColor: '#F98513' },
    defaultLocale: 'fr',
    active: true,
    createdAt: Date.now(),
  });

  const schoolStaff = await upsertUser('school@oriesup.dev', 'password123', 'Directeur Démo', { role: 'school', schoolId: schoolRef.id });
  await db.collection('users').doc(schoolStaff.uid).set({
    role: 'school',
    schoolId: schoolRef.id,
    displayName: 'Directeur Démo',
    email: 'school@oriesup.dev',
    createdAt: Date.now(),
  });
  await schoolRef.collection('staff').doc(schoolStaff.uid).set({
    role: 'owner',
    displayName: 'Directeur Démo',
    email: 'school@oriesup.dev',
    createdAt: Date.now(),
  });

  console.log('Seeding demo student...');
  const student = await upsertUser('student@oriesup.dev', 'password123', 'Élève Démo', { role: 'student', schoolId: schoolRef.id });
  await db.collection('users').doc(student.uid).set({
    role: 'student',
    schoolId: schoolRef.id,
    displayName: 'Élève Démo',
    email: 'student@oriesup.dev',
    createdAt: Date.now(),
  });
  await schoolRef.collection('students').doc(student.uid).set({
    schoolId: schoolRef.id,
    firstName: 'Élève',
    lastName: 'Démo',
    contactEmail: 'student@oriesup.dev',
    status: 'active',
    locale: 'fr',
    createdAt: Date.now(),
  });

  console.log('Seeding universities & programs...');
  const uni1 = db.collection('universities').doc();
  await uni1.set({ name: { fr: 'Université Mohammed V', ar: 'جامعة محمد الخامس', en: 'Mohammed V University' }, city: 'Rabat', logoUrl: '' });
  await uni1.collection('programs').add({
    name: { fr: 'Génie Informatique', ar: 'هندسة المعلوميات', en: 'Computer Engineering' },
    description: { fr: 'Filière ingénieur en informatique', ar: 'شعبة هندسة المعلوميات', en: 'Computer engineering program' },
    degreeLevel: 'Ingénieur',
    riasecTags: ['I', 'R', 'C'],
  });
  await uni1.collection('programs').add({
    name: { fr: 'Sciences Économiques et Gestion', ar: 'العلوم الاقتصادية والتدبير', en: 'Economics & Management' },
    description: { fr: "Filière économie et gestion d'entreprise", ar: 'شعبة الاقتصاد والتدبير', en: 'Economics and business management' },
    degreeLevel: 'Licence',
    riasecTags: ['E', 'C', 'S'],
  });

  const uni2 = db.collection('universities').doc();
  await uni2.set({ name: { fr: "École des Beaux-Arts de Casablanca", ar: 'مدرسة الفنون الجميلة بالدار البيضاء', en: 'Casablanca School of Fine Arts' }, city: 'Casablanca', logoUrl: '' });
  await uni2.collection('programs').add({
    name: { fr: 'Design Graphique', ar: 'التصميم الجرافيكي', en: 'Graphic Design' },
    description: { fr: 'Formation en design graphique et arts visuels', ar: 'تكوين في التصميم الجرافيكي والفنون البصرية', en: 'Graphic design and visual arts training' },
    degreeLevel: 'Licence',
    riasecTags: ['A', 'E'],
  });

  console.log('Seeding a service bundling both universities...');
  await db.collection('services').add({
    name: { fr: "Pack Orientation Complet", ar: 'باقة التوجيه الشاملة', en: 'Complete Orientation Package' },
    description: { fr: 'Test RIASEC + recommandations personnalisées + accompagnement', ar: 'اختبار RIASEC + توصيات شخصية + مواكبة', en: 'RIASEC test + personalized recommendations + guidance' },
    process: [
      { fr: 'Complète ton profil étudiant' },
      { fr: 'Passe le test RIASEC' },
      { fr: 'Reçois tes recommandations personnalisées' },
      { fr: 'Échange avec un conseiller orientation' },
    ],
    advantages: [
      { fr: 'Recommandations basées sur ton profil psychologique' },
      { fr: 'Accès à un conseiller dédié' },
      { fr: "Liste d'universités partenaires vérifiées" },
    ],
    notes: { fr: 'Le paiement peut être effectué en une seule fois, par carte ou en espèces au bureau.' },
    price: 250,
    currency: 'MAD',
    active: true,
    universityIds: [uni1.id, uni2.id],
  });

  console.log('Seeding RIASEC question bank...');
  await Promise.all(
    RIASEC_QUESTIONS.map((q, i) =>
      db.collection('riasecQuestions').add({ dimension: q.dimension, text: q.text, order: i, active: true })
    )
  );

  console.log('\nSeed complete. Demo logins (password123):');
  console.log('  Admin:   admin@oriesup.dev   -> /admin/login');
  console.log('  School:  school@oriesup.dev  -> /s/demo/login');
  console.log('  Student: student@oriesup.dev -> /s/demo/student/login');
  console.log('\nNote: the demo student has no purchased entitlement yet, so results will show 0 recommendations');
  console.log('until an admin manually seeds an entitlement doc or a payment is confirmed.');
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
