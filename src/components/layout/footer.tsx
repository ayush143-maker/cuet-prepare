import Link from "next/link";
import { Github, Heart, Sparkles } from "lucide-react";

const footerLinks = [
  {
    href: "/practice",
    label: "Practice",
  },
  {
    href: "/pyq",
    label: "PYQ",
  },
  {
    href: "/dashboard",
    label: "Dashboard",
  },
];

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#05060f]/80">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <div className="flex items-center gap-2 font-bold">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-500 via-fuchsia-500 to-cyan-400">
                <Sparkles className="h-4 w-4 text-white" />
              </span>
              CUET Prep Arena
            </div>

            <p className="mt-3 max-w-md text-sm text-zinc-400">
              Practice smarter, track accuracy, and master CUET 2027 with a
              premium quiz experience.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-300 transition hover:bg-white/10 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 text-sm text-zinc-500 md:flex-row md:items-center">
          <p>Built for CUET aspirants.</p>

          <p className="inline-flex items-center gap-2">
            Made with <Heart className="h-4 w-4 text-rose-400" /> and Next.js
            <Github className="h-4 w-4" />
          </p>
        </div>
      </div>
    </footer>
  );
}
