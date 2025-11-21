import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PageContentProps {
  children: ReactNode;
  className?: string;
}

export const PageContent = ({ children, className }: PageContentProps) => {
  return (
    <div className={cn("mx-auto max-w-7xl w-full", className)}>{children}</div>
  );
};
