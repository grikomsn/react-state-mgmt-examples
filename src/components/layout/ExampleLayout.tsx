import type { ReactNode } from "react";
import { ViewSourceLink } from "../legacy";
import { PageContent } from "./PageContent";
import { PageHeader } from "./PageHeader";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../ui/accordion";
import {
  type BundledLanguage,
  CodeBlock,
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
          <Accordion
            type="single"
            collapsible
            defaultValue={displaySnippets[0]?.id}
            className="w-full"
          >
            {displaySnippets.map((snippet) => {
              const snippetFilename = snippet.label || snippet.id;
              const snippetLanguage = snippet.language || defaultLanguage;
              const codeBlockData = [
                {
                  language: snippetLanguage,
                  filename: snippetFilename,
                  code: snippet.code,
                },
              ];

              return (
                <AccordionItem key={snippet.id} value={snippet.id}>
                  <AccordionTrigger className="font-mono">
                    {snippetFilename}
                  </AccordionTrigger>
                  <AccordionContent>
                    <CodeBlock defaultValue={snippetFilename} data={codeBlockData}>
                      <CodeBlockBody>
                        {(item) => (
                          <CodeBlockItem
                            key={item.filename}
                            value={item.filename}
                            lineNumbers
                          >
                            <CodeBlockContent
                              language={item.language as BundledLanguage}
                            >
                              {item.code}
                            </CodeBlockContent>
                          </CodeBlockItem>
                        )}
                      </CodeBlockBody>
                    </CodeBlock>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </CardContent>
      </Card>
    </PageContent>
  );
};
