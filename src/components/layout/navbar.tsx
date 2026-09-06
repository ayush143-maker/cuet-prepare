"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  BookOpen,
  GraduationCap,
  Home,
  LayoutDashboard,
  Menu,
  Settings as SettingsIcon,
  X,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { ThunderLogo } from "./thunder-logo";

const navLinks = [
  {
    href: "/",
    label: "Home",
    icon: Home,
  },
  {
    href: "/practice",
    label: "Practice",
    icon: BookOpen,
  },
  {
    href: "/pyq",
    label: "PYQ",
    icon: GraduationCap,
  },
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/settings",
    label: "Settings",
    icon: SettingsIcon,
  },
];

export function Navbar() {
  const pathname = usePathname();

  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#05060f]/80 backdrop-blur-2xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2 font-bold">
          <ThunderLogo className="h-7 w-7 drop-shadow-[0_0_8px_rgba(232,121,249,0.45)]" />
          CUET Prep Arena
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition",
                  isActive
                    ? "bg-white/10 text-white"
                    : "text-zinc-400 hover:bg-white/5 hover:text-white"
                )}
              >
                <Icon className="h-4 w-4" />
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:block">
          <Link href="/practice" className="btn-primary">
            Start Practice
          </Link>
        </div>

        <button
          onClick={() => setOpen((prev) => !prev)}
          className="rounded-xl border border-white/10 bg-white/5 p-2 md:hidden"
          aria-label="Toggle navigation"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-white/10 bg-[#05060f]/95 px-6 py-4 md:hidden">
          <nav className="grid gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition",
                    isActive
                      ? "bg-white/10 text-white"
                      : "text-zinc-400 hover:bg-white/5 hover:text-white"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {link.label}
                </Link>
              );
            })}

            <Link
              href="/practice"
              onClick={() => setOpen(false)}
              className="btn-primary mt-3"
            >
              Start Practice
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
