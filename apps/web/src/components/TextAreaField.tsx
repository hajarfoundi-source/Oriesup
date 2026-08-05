import type { TextareaHTMLAttributes } from 'react';

export function TextAreaField({
  label,
  hint,
  className = '',
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string; hint?: string }) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block font-medium text-neutral-700">{label}</span>
      {hint && <span className="mb-1 block text-xs text-neutral-400">{hint}</span>}
      <textarea
        className={`w-full rounded-xl border border-neutral-200 bg-white px-4 py-2.5 outline-none focus:border-brandPrimary focus:ring-2 focus:ring-brandPrimary/30 ${className}`}
        rows={4}
        {...props}
      />
    </label>
  );
}
