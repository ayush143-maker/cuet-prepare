import { ArrowRight, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";

export function HomeHero() {
  return (
    <section className="mx-auto max-w-4xl text-center">
      <Badge variant="gradient">
        <Sparkles className="h-3.5 w-3.5" />
        Built for CUET 2027
      </Badge>

      <h1 className="mt-6 text-5xl font-black leading-tight tracking-tight md:text-7xl">
        Master CUET with
        <br />
        <span className="gradient-text">deadly practice</span>
      </h1>

      <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-400">
        Practice quizzes, PYQ mode, timer, score tracking aur topic-wise
        analytics. Sab kuch ek premium prep arena me.
      </p>

      <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <ButtonLink href="/practice" size="lg">
          Start Practice
          <ArrowRight className="h-5 w-5" />
        </ButtonLink>

        <ButtonLink href="/pyq" variant="secondary" size="lg">
          Explore PYQs
        </ButtonLink>
      </div>
    </section>
  );
}
