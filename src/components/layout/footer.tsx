import Link from "next/link";
import { Heart, Settings as SettingsIcon } from "lucide-react";

const footerLinks = [
  {
    href: "/",
    label: "Home",
  },
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
  {
    href: "/settings",
    label: "Settings",
  },
];

const shineText =
  "bg-gradient-to-r from-cyan-200 via-white to-fuchsia-200 bg-clip-text font-semibold text-transparent drop-shadow-[0_0_6px_rgba(103,232,249,0.35)]";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#05060f]/80">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr]">
          <div>
            <div className="flex items-center gap-2 font-bold">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-500 via-fuchsia-500 to-cyan-400 text-lg">
                ⚡
              </span>
              CUET Prep Arena
            </div>

            <p className="mt-4 max-w-md text-sm leading-6 text-zinc-400">
              Practice smarter, track accuracy, and master CUET 2027 with a
              premium quiz experience. Timer, PYQ mode, analytics aur weak
              topic detection — sab ek jagah.
            </p>

            <div className="mt-6 flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-zinc-300">
              <SettingsIcon className="h-4 w-4 text-cyan-300" />
              Tip: Settings me auto submit aur instant explanation control kar
              sakte ho.
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-zinc-500">
              Quick Links
            </h3>

            <div className="mt-4 grid gap-2">
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="w-fit rounded-lg px-2 py-1 text-sm text-zinc-300 transition hover:bg-white/5 hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 text-sm text-zinc-500 md:flex-row md:items-center">
          <p>Built for CUET aspirants.</p>

          <p className="inline-flex items-center gap-2">
            Build by <span className={shineText}>Ayx</span> with{" "}
            <span className={shineText}>Next.js</span>
            <Heart className="h-4 w-4 text-rose-400" />
          </p>
        </div>
      </div>
    </footer>
  );
}
