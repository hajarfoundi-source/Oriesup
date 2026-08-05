import { db } from '../lib/admin';
import type { RiasecDimension } from '@oriesup/shared-types';

/** Universities covered by either the student's own entitlements or their school's entitlements. */
async function getEntitledUniversityIds(schoolId: string, studentUid: string): Promise<Set<string>> {
  const [schoolEntitlements, studentEntitlements] = await Promise.all([
    db.collection('schools').doc(schoolId).collection('entitlements').get(),
    db.collection('schools').doc(schoolId).collection('students').doc(studentUid).collection('entitlements').get(),
  ]);

  const serviceIds = new Set<string>();
  schoolEntitlements.forEach((d) => serviceIds.add(d.id));
  studentEntitlements.forEach((d) => serviceIds.add(d.id));
  if (serviceIds.size === 0) return new Set();

  const universityIds = new Set<string>();
  const serviceSnaps = await Promise.all([...serviceIds].map((id) => db.collection('services').doc(id).get()));
  for (const snap of serviceSnaps) {
    if (!snap.exists) continue;
    const ids = (snap.data()!.universityIds as string[]) ?? [];
    ids.forEach((id) => universityIds.add(id));
  }
  return universityIds;
}

export interface CandidateProgram {
  universityId: string;
  programId: string;
  riasecTags: RiasecDimension[];
}

export async function getCandidatePrograms(schoolId: string, studentUid: string): Promise<CandidateProgram[]> {
  const universityIds = await getEntitledUniversityIds(schoolId, studentUid);
  if (universityIds.size === 0) return [];

  const candidates: CandidateProgram[] = [];
  await Promise.all(
    [...universityIds].map(async (universityId) => {
      const programsSnap = await db.collection('universities').doc(universityId).collection('programs').get();
      programsSnap.forEach((doc) => {
        const data = doc.data();
        candidates.push({ universityId, programId: doc.id, riasecTags: data.riasecTags ?? [] });
      });
    })
  );
  return candidates;
}
