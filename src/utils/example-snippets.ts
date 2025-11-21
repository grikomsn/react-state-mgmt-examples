/**
 * Utility functions for extracting code snippets from example files
 * marked with @example-start and @example-end comment markers
 */

/**
 * Dedents a code block by removing the minimum common indentation
 * from all lines, preserving relative indentation
 *
 * @param code - The code string to dedent
 * @returns The dedented code string
 */
const dedentCode = (code: string): string => {
  const lines = code.split("\n");

  // Find minimum indentation (excluding empty lines)
  let minIndent = Infinity;
  for (const line of lines) {
    if (line.trim().length === 0) continue;
    const indent = line.length - line.trimStart().length;
    if (indent < minIndent) {
      minIndent = indent;
    }
  }

  // If no indentation found, return as-is
  if (minIndent === Infinity || minIndent === 0) {
    return code;
  }

  // Remove minimum indentation from all lines
  return lines
    .map((line) => {
      if (line.trim().length === 0) return line;
      return line.slice(minIndent);
    })
    .join("\n");
};

/**
 * Extracts code snippets between @example-start and @example-end markers
 *
 * @param source - The raw source code string
 * @param id - The identifier used in the markers (e.g., "UseStateExample")
 * @returns The extracted code snippet(s), or null if markers are not found
 *
 * @example
 * const source = `
 * // @example-start MyExample
 * const [count, setCount] = useState(0);
 * // @example-end MyExample
 * `;
 * const snippet = extractExampleSnippet(source, "MyExample");
 */
export const extractExampleSnippet = (
  source: string,
  id: string
): string | null => {
  const lines = source.split("\n");
  const snippets: string[] = [];
  let inSnippet = false;
  let currentSnippet: string[] = [];

  // Escape special regex characters in id
  const escapedId = id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const startPattern = new RegExp(`^//\\s*@example-start\\s+${escapedId}\\s*$`);
  const endPattern = new RegExp(`^//\\s*@example-end\\s+${escapedId}\\s*$`);

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmedLine = line.trim();

    // Check if this line is a start marker
    if (startPattern.test(trimmedLine)) {
      if (inSnippet) {
        // If we're already in a snippet, save it and start a new one
        if (currentSnippet.length > 0) {
          snippets.push(currentSnippet.join("\n"));
          currentSnippet = [];
        }
      }
      inSnippet = true;
      continue;
    }

    // Check if this line is an end marker
    if (endPattern.test(trimmedLine)) {
      if (inSnippet && currentSnippet.length > 0) {
        snippets.push(currentSnippet.join("\n"));
        currentSnippet = [];
      }
      inSnippet = false;
      continue;
    }

    // If we're inside a snippet, collect the line
    if (inSnippet) {
      currentSnippet.push(line);
    }
  }

  // Handle case where snippet doesn't have an end marker
  if (inSnippet && currentSnippet.length > 0) {
    snippets.push(currentSnippet.join("\n"));
  }

  if (snippets.length === 0) {
    console.warn(
      `No snippet found for id "${id}". Make sure the source contains // @example-start ${id} and // @example-end ${id} markers.`
    );
    return null;
  }

  // Join multiple snippets with a blank line separator
  const combined = snippets.join("\n\n");

  // Trim leading and trailing blank lines
  const trimmed = combined.replace(/^\n+|\n+$/g, "");

  // Dedent the code to remove unnecessary indentation
  return dedentCode(trimmed);
};

/**
 * Helper function to create an example snippet from raw source
 * Provides a consistent calling convention for all examples
 *
 * @param rawSource - The raw source code imported via `?raw`
 * @param id - The identifier used in the markers (e.g., "UseStateExample")
 * @returns The extracted code snippet, or null if not found
 */
export const createExampleSnippet = (
  rawSource: string,
  id: string
): string | null => {
  return extractExampleSnippet(rawSource, id);
};

/**
 * Extracts multiple code snippets from raw source
 * Returns an array of snippets with their IDs
 *
 * @param rawSource - The raw source code imported via `?raw`
 * @param ids - Array of identifiers used in the markers
 * @returns Array of objects with `id` and `code` properties
 */
export const createExampleSnippets = (
  rawSource: string,
  ids: string[]
): Array<{ id: string; code: string }> => {
  return ids
    .map((id) => {
      const code = extractExampleSnippet(rawSource, id);
      return code ? { id, code } : null;
    })
    .filter(
      (snippet): snippet is { id: string; code: string } => snippet !== null
    );
};

/**
 * Creates example snippets with labels and language metadata
 * Reduces boilerplate when creating multiple snippets with labels
 *
 * @param rawSource - The raw source code imported via `?raw`
 * @param segments - Array of segment configurations with id, label, and optional language
 * @returns Array of ExampleSnippet objects ready for ExampleLayout
 *
 * @example
 * const snippets = createExampleSnippetsWithLabels(rawSource, [
 *   { id: "UseStateExampleState", label: "State.tsx", language: "tsx" },
 *   { id: "UseStateExampleUpdates", label: "Updates.tsx", language: "tsx" },
 * ]);
 */
export const createExampleSnippetsWithLabels = (
  rawSource: string,
  segments: Array<{ id: string; label: string; language?: string }>
): Array<{ id: string; code: string; label: string; language: string }> => {
  return segments
    .map((segment) => {
      const code = extractExampleSnippet(rawSource, segment.id);
      return code
        ? {
            id: segment.id,
            code,
            label: segment.label,
            language: segment.language || "tsx",
          }
        : null;
    })
    .filter(
      (
        snippet
      ): snippet is {
        id: string;
        code: string;
        label: string;
        language: string;
      } => snippet !== null
    );
};
