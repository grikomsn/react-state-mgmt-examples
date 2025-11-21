import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { readFileSync } from "fs";
import { resolve } from "path";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// Try to get GitHub repo URL from package.json
let githubRepo = "https://github.com/grikomsn/react-state-mgmt-examples";
try {
  const packageJson = JSON.parse(
    readFileSync(resolve(process.cwd(), "package.json"), "utf-8")
  );
  if (packageJson.repository) {
    const repo =
      typeof packageJson.repository === "string"
        ? packageJson.repository
        : packageJson.repository.url;
    // Convert git URL to GitHub URL if needed
    if (repo && repo.includes("github.com")) {
      githubRepo = repo.replace(/\.git$/, "").replace(/^git\+/, "");
    }
  }
} catch {
  // Fallback to default if package.json can't be read
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [tsconfigPaths(), tailwindcss(), react()],
  define: {
    __WORKSPACE_PATH__: JSON.stringify(
      process.env.VITE_WORKSPACE_PATH || resolve(process.cwd())
    ),
    __GITHUB_REPO__: JSON.stringify(process.env.VITE_GITHUB_REPO || githubRepo),
  },
});
