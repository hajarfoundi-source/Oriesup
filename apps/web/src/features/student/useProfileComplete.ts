import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../lib/firebaseClient';
import { useAuth } from '../auth/AuthContext';
import type { StudentDoc } from '@oriesup/shared-types';

/** null while loading, then true/false once the student doc has been read. */
export function useProfileComplete(): boolean | null {
  const { schoolId, user } = useAuth();
  const [profileComplete, setProfileComplete] = useState<boolean | null>(null);

  useEffect(() => {
    if (!schoolId || !user) return;
    (async () => {
      const snap = await getDoc(doc(db, 'schools', schoolId, 'students', user.uid));
      setProfileComplete(snap.exists() ? Boolean((snap.data() as StudentDoc).profileComplete) : false);
    })();
  }, [schoolId, user]);

  return profileComplete;
}
