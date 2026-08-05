export function ToggleGroup<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T | undefined;
  options: Array<{ value: T; label: string }>;
  onChange: (value: T) => void;
}) {
  return (
    <div>
      <p className="mb-2 text-sm font-medium text-neutral-700">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            type="button"
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={`rounded-full border-2 px-4 py-2 text-sm font-semibold transition ${
              value === opt.value ? 'border-brandCta bg-brandCta text-white' : 'border-neutral-200 text-neutral-600 hover:border-brandPrimary'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
