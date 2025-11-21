import type { ReactNode } from "react";
import { ViewSourceLink } from "../legacy";
import { PageContent } from "./PageContent";
import { PageHeader } from "./PageHeader";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import {
  type BundledLanguage,
  CodeBlock,
  CodeBlockHeader,
  CodeBlockBody,
  CodeBlockItem,
  CodeBlockContent,
} from "../kibo-ui/code-block";

export type ExampleSnippet = {
  id: string;
  code: string;
  label?: string;
  language?: string;
};

interface ExampleLayoutProps {
  title: string;
  description: string;
  sourcePath?: string;
  sourceLine?: number;
  snippet?: string | null;
  snippets?: ExampleSnippet[];
  snippetTitle?: string;
  children: ReactNode;
}

export const ExampleLayout = ({
  title,
  description,
  sourcePath,
  sourceLine,
  snippet,
  snippets,
  snippetTitle = "Core example code",
  children,
}: ExampleLayoutProps) => {
  const filename = sourcePath?.split("/").pop() || "example.tsx";
  const defaultLanguage = sourcePath?.endsWith(".tsx") ? "tsx" : "typescript";

  // Determine which snippets to display
  const displaySnippets: ExampleSnippet[] = snippets
    ? snippets
    : snippet && sourcePath
    ? [
        {
          id: filename,
          code: snippet,
          label: filename,
          language: defaultLanguage,
        },
      ]
    : [];

  if (displaySnippets.length === 0) {
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
  }

  // Build CodeBlock data array
  const codeBlockData = displaySnippets.map((s) => ({
    language: s.language || defaultLanguage,
    filename: s.label || s.id,
    code: s.code,
  }));

  // Use first snippet's filename as default
  const defaultFilename = codeBlockData[0]?.filename || filename;

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
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>{snippetTitle}</CardTitle>
        </CardHeader>
        <CardContent>
          <CodeBlock defaultValue={defaultFilename} data={codeBlockData}>
            <CodeBlockHeader>
              <div className="px-4 py-2 text-sm font-medium">
                {defaultFilename}
              </div>
            </CodeBlockHeader>
            <CodeBlockBody>
              {(item) => (
                <CodeBlockItem
                  key={item.filename}
                  value={item.filename}
                  lineNumbers
                >
                  <CodeBlockContent language={item.language as BundledLanguage}>
                    {item.code}
                  </CodeBlockContent>
                </CodeBlockItem>
              )}
            </CodeBlockBody>
          </CodeBlock>
        </CardContent>
      </Card>
    </PageContent>
  );
};
