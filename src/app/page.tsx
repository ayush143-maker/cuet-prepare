import {
  CtaSection,
  FeatureGrid,
  HomeHero,
  HowItWorks,
  ModeGrid,
  StatsStrip,
  SubjectGrid,
} from "@/components/home";
import { AppShell, PageShell } from "@/components/layout";

export default function HomePage() {
  return (
    <AppShell>
      <PageShell className="py-24">
        <HomeHero />
        <StatsStrip />
        <HowItWorks />
        <FeatureGrid />
        <ModeGrid />
        <SubjectGrid />
        <CtaSection />
      </PageShell>
    </AppShell>
  );
}
