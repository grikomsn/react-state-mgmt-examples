import { generateDeeplink, getFilePathFromUrl } from "../../utils/deeplink";
import { Button } from "../ui/button";

interface ViewSourceLinkProps {
  /**
   * Relative path from workspace root (e.g., "src/examples/built-in/UseStateExample.tsx")
   * Or import.meta.url, which will be automatically converted to file path
   */
  filePath?: string;
  /** Optional line number to jump to */
  line?: number;
  /** Optional custom label */
  label?: string;
  /** Optional import.meta.url - if provided, takes precedence over filePath */
  url?: string;
}

/**
 * Component that renders a link to open source code in VSCode/Cursor
 *
 * @example
 * // Using import.meta.url (recommended)
 * <ViewSourceLink url={import.meta.url} />
 *
 * // Using file path
 * <ViewSourceLink filePath="src/examples/built-in/UseStateExample.tsx" />
 */
export const ViewSourceLink = ({
  filePath,
  url,
  line,
  label = "View Source",
}: ViewSourceLinkProps) => {
  // Use url (import.meta.url) if provided, otherwise fall back to filePath
  const sourcePath = url || filePath;

  if (!sourcePath) {
    console.warn("ViewSourceLink: Either 'url' or 'filePath' must be provided");
    return null;
  }

  // Extract the clean file path for display
  const displayPath =
    url && (url.includes("://") || url.startsWith("http"))
      ? getFilePathFromUrl(url)
      : filePath || sourcePath;

  const deeplink = generateDeeplink(sourcePath, line);

  return (
    <Button
      asChild
      variant="outline"
      size="sm"
    >
      <a
        href={deeplink}
        title={`Open ${displayPath} in editor`}
      >
        <svg
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
          />
        </svg>
        {label}
      </a>
    </Button>
  );
};
