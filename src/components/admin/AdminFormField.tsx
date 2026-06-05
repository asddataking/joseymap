export function AdminFormField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1 block text-xs font-medium text-text-muted">
        {label}
      </label>
      {children}
    </div>
  );
}

export const adminInputClass =
  "w-full rounded-lg border border-white/10 bg-map-surface-light px-3 py-2 text-sm text-text-primary focus:border-cannabis-green/50 focus:outline-none";
