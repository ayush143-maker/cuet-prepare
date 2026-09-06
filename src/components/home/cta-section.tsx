import { ArrowRight, Brain } from "lucide-react";

import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function CtaSection() {
  return (
    <section className="mt-24">
      <Card className="p-10 text-center">
        <Brain className="mx-auto h-10 w-10 text-cyan-300" />

        <h2 className="mt-6 text-3xl font-black md:text-4xl">
          Ready to enter the arena?
        </h2>

        <p className="mx-auto mt-3 max-w-xl text-zinc-400">
          Aaj se timed practice shuru karo. Har attempt ke baad analytics
          tumhe batayega ki next kya improve karna hai.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <ButtonLink href="/practice" size="lg">
            Start Your First Quiz
            <ArrowRight className="h-5 w-5" />
          </ButtonLink>

          <ButtonLink href="/dashboard" variant="secondary" size="lg">
            View Dashboard
          </ButtonLink>
        </div>
      </Card>
    </section>
  );
}
