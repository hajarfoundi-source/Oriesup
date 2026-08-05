import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { onIdTokenChanged, signInWithCustomToken, signInWithEmailAndPassword, signOut, type User } from 'firebase/auth';
import { auth } from '../../lib/firebaseClient';
import type { Role } from '@oriesup/shared-types';

interface AuthState {
  user: User | null;
  role: Role | null;
  schoolId: string | null;
  loading: boolean;
}

interface AuthContextValue extends AuthState {
  loginWithPassword: (email: string, password: string) => Promise<void>;
  loginWithCustomToken: (token: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({ user: null, role: null, schoolId: null, loading: true });

  useEffect(() => {
    return onIdTokenChanged(auth, async (user) => {
      if (!user) {
        setState({ user: null, role: null, schoolId: null, loading: false });
        return;
      }
      const tokenResult = await user.getIdTokenResult();
      setState({
        user,
        role: (tokenResult.claims.role as Role) ?? null,
        schoolId: (tokenResult.claims.schoolId as string) ?? null,
        loading: false,
      });
    });
  }, []);

  const value: AuthContextValue = {
    ...state,
    loginWithPassword: async (email, password) => {
      await signInWithEmailAndPassword(auth, email, password);
    },
    loginWithCustomToken: async (token) => {
      await signInWithCustomToken(auth, token);
    },
    logout: async () => {
      await signOut(auth);
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
