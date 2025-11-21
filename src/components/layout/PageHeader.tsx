import type { ReactNode } from "react";
import { Separator } from "../ui/separator";

interface PageHeaderProps {
  title: string;
  description?: string;
  action?: ReactNode;
  children?: ReactNode;
}

export const PageHeader = ({
  title,
  description,
  action,
  children,
}: PageHeaderProps) => {
  return (
    <div className="mb-8 space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 space-y-2">
          <h1 className="text-4xl font-semibold text-foreground">{title}</h1>
          {description && (
            <p className="text-lg leading-relaxed text-muted-foreground">
              {description}
            </p>
          )}
        </div>
        {action}
      </div>
      {children}
      <Separator />
    </div>
  );
};
