
import type { HTMLAttributes, ReactNode } from "react";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  title?: string;
  description?: string;
  padding?: "none" | "small" | "medium" | "large";
  hover?: boolean;
};

export default function Card({
  children,
  title,
  description,
  padding = "medium",
  hover = false,
  className = "",
  ...props
}: CardProps) {
  const paddingStyles = {
    none: "p-0",
    small: "p-4",
    medium: "p-6",
    large: "p-8",
  };

  return (
    <div
      className={`
        w-full border border-[#e5e3df] bg-white
        ${paddingStyles[padding]}
        ${hover ? "transition duration-200 hover:-translate-y-1 hover:border-[#e5242a] hover:shadow-md" : ""}
        ${className}
      `}
      {...props}
    >
      {(title || description) && (
        <div className="mb-5">
          {title && (
            <h3 className="text-lg font-bold tracking-tight text-[#171717]">
              {title}
            </h3>
          )}

          {description && (
            <p className="mt-1 text-sm leading-6 text-[#707070]">
              {description}
            </p>
          )}
        </div>
      )}

      {children}
    </div>
  );
}
