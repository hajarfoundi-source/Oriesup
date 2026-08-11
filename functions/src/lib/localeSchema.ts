import { z } from 'zod';
import type { Locale } from '@oriesup/shared-types';

const SUPPORTED: Locale[] = ['fr', 'ar', 'en'];

/**
 * Accepts any string (browser locales arrive as full BCP-47 tags like "en-US" or
 * "fr-FR", not just the bare 'fr'|'ar'|'en' the app supports) and normalizes to a
 * supported Locale, defaulting to 'fr' for anything unrecognized.
 */
export const localeSchema = z
  .string()
  .optional()
  .transform((value): Locale => {
    const base = value?.split('-')[0].toLowerCase();
    return (SUPPORTED as string[]).includes(base ?? '') ? (base as Locale) : 'fr';
  });
