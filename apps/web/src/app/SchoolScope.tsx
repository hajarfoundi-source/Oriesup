import type { ReactNode } from 'react';
import { useParams } from 'react-router-dom';
import { BrandProvider } from '../theme/BrandProvider';

/** Reads :schoolSlug from the URL and provides that school's branding to everything beneath it. */
export function SchoolScope({ children }: { children: ReactNode }) {
  const { schoolSlug } = useParams<{ schoolSlug: string }>();
  if (!schoolSlug) return null;
  return <BrandProvider slug={schoolSlug}>{children}</BrandProvider>;
}
