"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
    };

    onScroll();

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b backdrop-blur-2xl transition-all duration-300",
        scrolled
          ? "border-white/10 bg-[#05060f]/90 shadow-glass"
          : "border-transparent bg-transparent"
      )}
    >
      <div
        className={cn(
          "mx-auto flex max-w-6xl items-center justify-between px-6 transition-all duration-300",
          scrolled ? "h-14" : "h-16"
        )}
      >
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
