import type { ReactNode } from "react";
import { ViewSourceLink } from "../legacy";
import { PageContent } from "./PageContent";
import { PageHeader } from "./PageHeader";

interface ExampleLayoutProps {
  title: string;
  description: string;
  sourcePath?: string;
  sourceLine?: number;
  children: ReactNode;
}

export const ExampleLayout = ({
  title,
  description,
  sourcePath,
  sourceLine,
  children,
}: ExampleLayoutProps) => {
  return (
    <PageContent>
      <PageHeader
        title={title}
        description={description}
        action={
          sourcePath ? (
            <ViewSourceLink filePath={sourcePath} line={sourceLine} />
          ) : undefined
        }
      />
      {children}
    </PageContent>
  );
};
