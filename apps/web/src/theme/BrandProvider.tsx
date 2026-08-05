import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { collection, getDocs, limit, query, where } from 'firebase/firestore';
import { db } from '../lib/firebaseClient';
import { DEFAULT_BRANDING, type BrandingConfig, type Locale } from '@oriesup/shared-types';

interface SchoolBrand {
  schoolId: string;
  slug: string;
  name: string;
  logoUrl: string;
  branding: BrandingConfig;
  defaultLocale: Locale;
}

interface BrandContextValue {
  school: SchoolBrand | null;
  loading: boolean;
}

const BrandContext = createContext<BrandContextValue>({ school: null, loading: true });

export function useBrand() {
  return useContext(BrandContext);
}

function applyBranding(branding: BrandingConfig) {
  const root = document.documentElement;
  root.style.setProperty('--brand-bg', branding.bgColor);
  root.style.setProperty('--brand-primary', branding.primaryColor);
  root.style.setProperty('--brand-cta', branding.ctaColor);
}

function cacheKey(slug: string) {
  return `oriesup:brand:${slug}`;
}

/**
 * Wraps every /s/:schoolSlug/* route. Paints instantly from a cached last-known
 * branding (if any) to avoid a flash, then reconciles once Firestore's public,
 * unauthenticated school-branding read resolves.
 */
export function BrandProvider({ slug, children }: { slug: string; children: ReactNode }) {
  const [school, setSchool] = useState<SchoolBrand | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    applyBranding(DEFAULT_BRANDING);
    const cached = localStorage.getItem(cacheKey(slug));
    if (cached) {
      const parsed = JSON.parse(cached) as SchoolBrand;
      setSchool(parsed);
      applyBranding(parsed.branding);
    }

    let cancelled = false;
    (async () => {
      const q = query(collection(db, 'schools'), where('slug', '==', slug), limit(1));
      const snap = await getDocs(q);
      if (cancelled || snap.empty) {
        setLoading(false);
        return;
      }
      const doc = snap.docs[0];
      const data = doc.data();
      const resolved: SchoolBrand = {
        schoolId: doc.id,
        slug: data.slug,
        name: data.name,
        logoUrl: data.logoUrl,
        branding: data.branding ?? DEFAULT_BRANDING,
        defaultLocale: data.defaultLocale ?? 'fr',
      };
      setSchool(resolved);
      applyBranding(resolved.branding);
      localStorage.setItem(cacheKey(slug), JSON.stringify(resolved));
      setLoading(false);
    })();

    return () => {
      cancelled = true;
    };
  }, [slug]);

  return <BrandContext.Provider value={{ school, loading }}>{children}</BrandContext.Provider>;
}

/** For /admin and / (platform-default palette, never school-specific). */
export function PlatformBrandProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    applyBranding(DEFAULT_BRANDING);
  }, []);
  return <BrandContext.Provider value={{ school: null, loading: false }}>{children}</BrandContext.Provider>;
}
