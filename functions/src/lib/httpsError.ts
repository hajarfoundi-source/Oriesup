import { HttpsError, type CallableRequest } from 'firebase-functions/v2/https';
import { z, ZodError, type ZodType } from 'zod';

type AuthData = CallableRequest['auth'];

/** Runs schema.parse(data) but surfaces validation failures as a client-visible invalid-argument error instead of a generic internal one. */
export function parseInput<S extends ZodType>(schema: S, data: unknown): z.infer<S> {
  try {
    return schema.parse(data);
  } catch (err) {
    if (err instanceof ZodError) {
      const message = err.errors.map((e) => `${e.path.join('.')}: ${e.message}`).join('; ');
      throw new HttpsError('invalid-argument', message || 'Invalid input.');
    }
    throw err;
  }
}

export function requireAuth(auth: AuthData | undefined) {
  if (!auth) throw new HttpsError('unauthenticated', 'Sign-in required.');
  return auth;
}

export function requireRole(auth: AuthData | undefined, ...roles: string[]) {
  const a = requireAuth(auth);
  const role = a.token.role as string | undefined;
  if (!role || !roles.includes(role)) {
    throw new HttpsError('permission-denied', `Requires role: ${roles.join(' or ')}.`);
  }
  return a;
}
