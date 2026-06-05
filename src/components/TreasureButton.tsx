import Link from "next/link";

type TreasureButtonProps = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  type?: "button" | "submit";
  fullWidth?: boolean;
};

const variants = {
  primary:
    "bg-cannabis-green text-map-dark hover:bg-cannabis-green-dark border-treasure-gold/40 shadow-treasure",
  secondary:
    "bg-map-surface-light text-text-primary hover:bg-map-surface border-treasure-gold/30",
  ghost:
    "bg-transparent text-cannabis-green hover:bg-cannabis-green/10 border-cannabis-green/30",
};

const sizes = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3.5 text-base",
};

export function TreasureButton({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  className = "",
  type = "button",
  fullWidth = false,
}: TreasureButtonProps) {
  const baseClass = `inline-flex items-center justify-center gap-2 rounded-xl border font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${fullWidth ? "w-full" : ""} ${className}`;

  const content = (
    <>
      {loading && (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      )}
      {children}
    </>
  );

  if (href && !disabled) {
    return (
      <Link href={href} className={baseClass}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={baseClass}
    >
      {content}
    </button>
  );
}
