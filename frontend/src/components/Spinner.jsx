export default function Spinner({ className = '' }) {
  return (
    <div
      className={`inline-block h-8 w-8 animate-spin rounded-full border-2 border-slate-300 border-t-slate-800 ${className}`}
      role="status"
      aria-label="Loading"
    />
  );
}
