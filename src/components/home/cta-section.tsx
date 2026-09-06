import { ArrowRight } from "lucide-react";

import { ThunderLogo } from "@/components/layout/thunder-logo";
import { ButtonLink } from "@/components/ui/button";

export function CtaSection() {
  return (
    <section className="mt-28">
      <div className="rounded-[2rem] bg-gradient-to-r from-indigo-500/40 via-fuchsia-500/40 to-cyan-400/40 p-px">
        <div className="rounded-[2rem] bg-[#0b0d1a] px-8 py-16 text-center">
          <ThunderLogo className="mx-auto h-12 w-12 drop-shadow-[0_0_14px_rgba(232,121,249,0.5)]" />

          <h2 className="mt-6 font-display text-4xl font-bold md:text-5xl">
            Enter the arena.
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-zinc-400">
            Aaj se timed practice shuru karo. Har attempt ke baad analytics
            tumhe batayega ki next kya improve karna hai.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <ButtonLink href="/practice" size="lg">
              Start Your First Quiz
              <ArrowRight className="h-5 w-5" />
            </ButtonLink>

            <ButtonLink href="/dashboard" variant="secondary" size="lg">
              View Dashboard
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
