export function Logo({ className = 'h-14 w-auto' }: { className?: string }) {
  return (
    <img
      src="/logo.svg"
      alt="Oriesup"
      className={className}
      style={{ filter: 'drop-shadow(0 0 14px rgba(255,255,255,0.9)) drop-shadow(0 0 34px rgba(255,255,255,0.65))' }}
    />
  );
}
