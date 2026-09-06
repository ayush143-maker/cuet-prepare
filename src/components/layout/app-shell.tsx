import type { ReactNode } from "react";

import { Footer } from "./footer";
import { Navbar } from "./navbar";

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-indigo-500/10 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[400px] w-[500px] rounded-full bg-cyan-400/10 blur-[100px]" />

      <Navbar />

      <main className="relative z-10">{children}</main>

      <Footer />
    </div>
  );
}
