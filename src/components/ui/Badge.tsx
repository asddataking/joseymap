type BadgeProps = {
  children: React.ReactNode;
  variant?: "gold" | "green" | "default";
};

const variants = {
  gold: "bg-treasure-gold/15 text-treasure-gold-light border-treasure-gold/30",
  green: "bg-cannabis-green/15 text-cannabis-green border-cannabis-green/30",
  default: "bg-white/5 text-text-muted border-white/10",
};

export function Badge({ children, variant = "default" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${variants[variant]}`}
    >
      {children}
    </span>
  );
}
