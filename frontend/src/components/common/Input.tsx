
import { useId } from "react";
import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  helperText?: string;
};

export default function Input({
  label,
  error,
  helperText,
  id,
  className = "",
  ...props
}: InputProps) {
  const generatedId = useId();
  const inputId = id || generatedId;

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="mb-2 block text-sm font-semibold text-[#242424]"
        >
          {label}
          {props.required && (
            <span className="ml-1 text-[#e5242a]">*</span>
          )}
        </label>
      )}

      <input
        id={inputId}
        className={`
          w-full border bg-white px-4 py-3 text-sm text-[#242424]
          outline-none transition duration-200
          placeholder:text-[#a0a0a0]
          focus:border-[#e5242a] focus:ring-2 focus:ring-[#e5242a]/10
          disabled:cursor-not-allowed disabled:bg-[#f5f5f5]
          ${error ? "border-red-500 focus:border-red-500" : "border-[#dedbd7]"}
          ${className}
        `}
        aria-invalid={Boolean(error)}
        aria-describedby={
          error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
        }
        {...props}
      />

      {error && (
        <p
          id={`${inputId}-error`}
          className="mt-1.5 text-xs text-red-600"
        >
          {error}
        </p>
      )}

      {!error && helperText && (
        <p
          id={`${inputId}-helper`}
          className="mt-1.5 text-xs text-[#777777]"
        >
          {helperText}
        </p>
      )}
    </div>
  );
}
