import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";
import { Toaster } from "./components/ui/sonner";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      disableTransitionOnChange
      enableColorScheme
      enableSystem
    >
      <Toaster />
      {children}
    </ThemeProvider>
  );
}
