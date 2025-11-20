import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
  children: ReactNode;
}

export const Button = ({
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonProps) => {
  const baseStyles =
    "rounded px-4 py-2 text-sm font-medium transition-all active:scale-95 disabled:cursor-not-allowed disabled:opacity-50";

  const variants = {
    primary: "bg-cyan-500 text-gray-950 hover:bg-cyan-600",
    secondary:
      "border border-gray-700 bg-gray-800 text-gray-200 hover:bg-gray-700",
    danger: "border border-red-800 bg-red-900/50 text-red-200 hover:bg-red-900",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
