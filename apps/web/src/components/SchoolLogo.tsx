/** Renders the school's logo, or a placeholder monogram badge until a real logo is uploaded. */
export function SchoolLogo({ logoUrl, name, size = 48 }: { logoUrl?: string; name: string; size?: number }) {
  if (logoUrl) {
    return <img src={logoUrl} alt={name} style={{ width: size, height: size }} className="rounded-2xl object-cover" />;
  }
  const initials = name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
  return (
    <div
      style={{ width: size, height: size }}
      className="flex items-center justify-center rounded-2xl bg-brandPrimary font-display font-bold text-white"
    >
      {initials || '?'}
    </div>
  );
}
