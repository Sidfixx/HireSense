import type { ButtonHTMLAttributes, ReactNode } from "react";
import { ArrowRight, Loader2 } from "lucide-react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "outline";
  loading?: boolean;
  icon?: boolean;
  children: ReactNode;
};

export default function Button({
  variant = "primary",
  loading = false,
  icon = false,
  children,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-[#e5242a] text-white hover:bg-[#bd1c23]",
    secondary: "bg-[#171717] text-white hover:bg-[#303030]",
    outline:
      "border border-[#d8d5d1] bg-transparent text-[#171717] hover:border-[#e5242a] hover:text-[#e5242a]",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <Loader2 size={16} className="animate-spin" />
      ) : (
        children
      )}

      {!loading && icon && <ArrowRight size={16} />}
    </button>
  );
}
