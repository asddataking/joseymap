type StatCardProps = {
  label: string;
  value: number | string;
  icon?: React.ReactNode;
};

export function StatCard({ label, value, icon }: StatCardProps) {
  return (
    <div className="treasure-card p-5">
      <div className="flex items-start justify-between">
        <p className="text-sm text-text-muted">{label}</p>
        {icon && (
          <div className="text-treasure-gold opacity-60">{icon}</div>
        )}
      </div>
      <p className="mt-2 font-display text-3xl font-bold text-gold-gradient">
        {value}
      </p>
    </div>
  );
}
