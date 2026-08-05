import type { InputHTMLAttributes } from 'react';

export function TextField({ label, className = '', ...props }: InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block font-medium text-neutral-700">{label}</span>
      <input
        className={`w-full rounded-xl border border-neutral-200 bg-white px-4 py-2.5 outline-none focus:border-brandPrimary focus:ring-2 focus:ring-brandPrimary/30 ${className}`}
        {...props}
      />
    </label>
  );
}
