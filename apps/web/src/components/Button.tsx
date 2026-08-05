import type { ButtonHTMLAttributes } from 'react';

type Variant = 'cta' | 'primary' | 'ghost';

const variantClasses: Record<Variant, string> = {
  cta: 'bg-brandCta text-white hover:brightness-95 shadow-sm',
  primary: 'bg-brandPrimary text-white hover:brightness-95 shadow-sm',
  ghost: 'bg-transparent text-neutral-700 hover:bg-black/5',
};

export function Button({
  variant = 'cta',
  className = '',
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-full px-6 py-3 font-display font-semibold text-sm transition disabled:opacity-50 disabled:cursor-not-allowed ${variantClasses[variant]} ${className}`}
      {...props}
    />
  );
}
