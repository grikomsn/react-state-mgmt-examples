import type { ReactNode } from "react";

interface SectionProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

export const Section = ({ title, children, className = "" }: SectionProps) => {
  return (
    <div className={`mb-6 ${className}`}>
      {title && <h2 className="mb-4 text-xl text-gray-200">{title}</h2>}
      {children}
    </div>
  );
};
