/** Visual placeholder — not yet wired to a real notification feed. */
export function NotificationBell() {
  return (
    <button
      type="button"
      aria-label="Notifications"
      className="rounded-full p-2 text-neutral-500 transition hover:bg-black/5 hover:text-neutral-700"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
    </button>
  );
}
