/**
 * Extract file path from import.meta.url
 * @param url - The import.meta.url value (e.g., "http://localhost:5173/src/examples/built-in/UseStateExample.tsx?t=123")
 * @returns Relative path from workspace root (e.g., "src/examples/built-in/UseStateExample.tsx")
 */
export const getFilePathFromUrl = (url: string): string => {
  // First, clean the URL - remove query params and hash fragments
  const cleanUrl = url.split("?")[0].split("#")[0];

  // Try to parse as URL (handles both http:// and file://)
  try {
    // Fix malformed URLs (e.g., http:/localhost -> http://localhost)
    const normalizedUrl = cleanUrl.replace(/^http:\/(?!\/)/, "http://");
    const urlObj = new URL(normalizedUrl);
    let path = urlObj.pathname;

    // Remove leading slash
    if (path.startsWith("/")) {
      path = path.slice(1);
    }

    // Extract the file path part (should start with "src/")
    if (path.startsWith("src/")) {
      return path;
    }

    // Try to find "src/" in the path
    const srcIndex = path.indexOf("src/");
    if (srcIndex !== -1) {
      return path.slice(srcIndex);
    }

    // If no "src/" found, return the path as-is (might be edge case)
    return path;
  } catch (error) {
    // If URL parsing fails, use regex to extract path
    // Handle both http://, https://, and file:// protocols
    // Also handle malformed URLs like http:/localhost
    const match = cleanUrl.match(
      /(?:file:\/\/|https?:\/\/[^\/]*\/?)(\/[^?#]+)/
    );
    if (match) {
      let path = match[1];
      // Remove leading slash
      if (path.startsWith("/")) {
        path = path.slice(1);
      }
      // Find src/ in path
      if (path.startsWith("src/")) {
        return path;
      }
      const srcIndex = path.indexOf("src/");
      if (srcIndex !== -1) {
        return path.slice(srcIndex);
      }
      return path;
    }

    // Last resort: try to extract anything that looks like a file path
    // Look for patterns like /src/... or just src/...
    const srcMatch = cleanUrl.match(/(?:^|\/)(src\/[^?#]+)/);
    if (srcMatch) {
      return srcMatch[1];
    }

    // Final fallback: return cleaned URL
    return cleanUrl;
  }
};

/**
 * Generate a GitHub URL for a file
 * @param filePath - Relative path from workspace root
 * @param line - Optional line number to jump to
 * @param repoUrl - GitHub repository URL (e.g., "https://github.com/owner/repo")
 * @param branch - Git branch name (defaults to "main")
 * @returns GitHub URL string
 */
const generateGitHubUrl = (
  filePath: string,
  line?: number,
  repoUrl?: string,
  branch?: string
): string => {
  // Default repository URL from environment, build-time constant, or fallback
  const defaultRepoUrl =
    import.meta.env.VITE_GITHUB_REPO ||
    __GITHUB_REPO__ ||
    "https://github.com/grikomsn/react-state-mgmt-examples";
  const repo = repoUrl || defaultRepoUrl;
  const gitBranch = branch || import.meta.env.VITE_GIT_BRANCH || "main";

  // Normalize path separators
  const normalizedPath = filePath.replace(/\\/g, "/");

  // Construct GitHub URL: https://github.com/owner/repo/blob/branch/path/to/file
  const baseUrl = `${repo}/blob/${gitBranch}/${normalizedPath}`;

  // Add line number anchor if provided
  return line ? `${baseUrl}#L${line}` : baseUrl;
};

/**
 * Generate a VSCode/Cursor deeplink to open a file
 *
 * @param filePath - Relative path from workspace root (e.g., "src/examples/built-in/UseStateExample.tsx")
 *   Can also be import.meta.url, which will be automatically converted
 * @param line - Optional line number to jump to
 * @returns Deeplink URL string - GitHub URL in production, cursor:// URL in development
 *
 * @example
 * // Basic usage with file path (development)
 * generateDeeplink("src/examples/built-in/UseStateExample.tsx")
 * // Returns: "cursor://file//Users/username/projects/my-workspace/src/examples/built-in/UseStateExample.tsx"
 *
 * // In production, returns GitHub URL:
 * // "https://github.com/grikomsn/react-state-mgmt-examples/blob/main/src/examples/built-in/UseStateExample.tsx"
 *
 * // With import.meta.url
 * generateDeeplink(import.meta.url)
 * // Automatically extracts: "src/examples/built-in/UseStateExample.tsx"
 *
 * // With line number (production)
 * generateDeeplink("src/examples/built-in/UseStateExample.tsx", 42)
 * // Returns: "https://github.com/grikomsn/react-state-mgmt-examples/blob/main/src/examples/built-in/UseStateExample.tsx#L42"
 *
 * @remarks
 * In production mode, returns GitHub URLs instead of editor deeplinks.
 * The workspace path is automatically detected from Vite's build process.
 * To override, set VITE_WORKSPACE_PATH in your .env file:
 * VITE_WORKSPACE_PATH=/Users/username/projects/my-workspace
 */
export const generateDeeplink = (
  filePath: string,
  line?: number
): string => {
  // If filePath looks like a URL (import.meta.url), extract the path
  const actualFilePath =
    filePath.startsWith("http://") ||
    filePath.startsWith("https://") ||
    filePath.startsWith("file://") ||
    filePath.includes("://") // Also handle malformed URLs like http:/localhost
      ? getFilePathFromUrl(filePath)
      : filePath;

  // In production, generate GitHub URL instead of editor deeplink
  if (import.meta.env.PROD) {
    return generateGitHubUrl(actualFilePath, line);
  }

  // Development mode: use cursor:// protocol
  // Get workspace path from environment variable or build-time constant
  const workspacePath =
    import.meta.env.VITE_WORKSPACE_PATH || __WORKSPACE_PATH__;

  // Normalize path separators for cross-platform compatibility
  const normalizedPath = actualFilePath.replace(/\\/g, "/");

  // Always use absolute path
  // Remove trailing slash from workspace path if present
  const cleanWorkspacePath = workspacePath?.replace(/\/$/, "") || "";
  const fullPath = `${cleanWorkspacePath}/${normalizedPath}`.replace(
    /\/+/g,
    "/"
  );

  // Use cursor:// protocol (works for both Cursor and VSCode)
  // Format: cursor://file/{absolute-path}:{line}:{column}
  // Note: Path encoding is handled by the browser/protocol handler
  const url = line
    ? `cursor://file/${fullPath}:${line}:1`
    : `cursor://file/${fullPath}`;

  return url;
};

/**
 * Generate a VSCode-specific deeplink (fallback)
 * @param filePath - Relative path from workspace root
 * @param line - Optional line number to jump to
 * @returns Deeplink URL string - GitHub URL in production, vscode:// URL in development
 */
export const generateVSCodeDeeplink = (
  filePath: string,
  line?: number
): string => {
  // If filePath looks like a URL (import.meta.url), extract the path
  const actualFilePath =
    filePath.startsWith("http://") ||
    filePath.startsWith("https://") ||
    filePath.startsWith("file://") ||
    filePath.includes("://")
      ? getFilePathFromUrl(filePath)
      : filePath;

  // In production, generate GitHub URL instead of editor deeplink
  if (import.meta.env.PROD) {
    return generateGitHubUrl(actualFilePath, line);
  }

  const workspacePath =
    import.meta.env.VITE_WORKSPACE_PATH || __WORKSPACE_PATH__;
  const normalizedPath = actualFilePath.replace(/\\/g, "/");

  // Always use absolute path
  const cleanWorkspacePath = workspacePath?.replace(/\/$/, "") || "";
  const fullPath = `${cleanWorkspacePath}/${normalizedPath}`.replace(
    /\/+/g,
    "/"
  );

  // VSCode format: vscode://file/{absolute-path}:{line}:{column}
  const url = line
    ? `vscode://file/${fullPath}:${line}:1`
    : `vscode://file/${fullPath}`;

  return url;
};
