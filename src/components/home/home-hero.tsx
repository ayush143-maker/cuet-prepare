import { ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { ThunderLogo } from "@/components/layout/thunder-logo";

import { HeroPreview } from "./hero-preview";

export function HomeHero() {
  return (
    <section className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
      <div className="text-left">
        <div className="animate-fade-up inline-flex items-center gap-2">
          <Badge variant="gradient">
            <ThunderLogo className="h-3.5 w-3.5" />
            Built for CUET 2027
          </Badge>
        </div>

        <h1
          className="animate-fade-up mt-6 font-display text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl"
          style={{
            animationDelay: "120ms",
          }}
        >
          Practice that
          <br />
          feels like the
          <br />
          <span className="gradient-text text-shine animate-shimmer">
            real exam.
          </span>
        </h1>

        <p
          className="animate-fade-up mt-6 max-w-xl text-lg leading-8 text-zinc-400"
          style={{
            animationDelay: "240ms",
          }}
        >
          Timed quizzes, PYQ papers, negative marking aur topic-wise
          analytics. Exam ka pressure yahan feel karo, taaki real exam me
          surprise na lage.
        </p>

        <div
          className="animate-fade-up mt-10 flex flex-col gap-4 sm:flex-row"
          style={{
            animationDelay: "360ms",
          }}
        >
          <ButtonLink href="/practice" size="lg">
            Start Practice
            <ArrowRight className="h-5 w-5" />
          </ButtonLink>

          <ButtonLink href="/pyq" variant="secondary" size="lg">
            Explore PYQs
          </ButtonLink>
        </div>

        <p
          className="animate-fade-up mt-8 text-sm text-zinc-500"
          style={{
            animationDelay: "480ms",
          }}
        >
          No signup. No fees. Sirf practice.
        </p>
      </div>

      <div
        className="animate-fade-up"
        style={{
          animationDelay: "300ms",
        }}
      >
        <HeroPreview />
      </div>
    </section>
  );
}
