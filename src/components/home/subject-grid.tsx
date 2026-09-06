import { SectionHeading } from "@/components/ui/section-heading";
import { SUBJECTS } from "@/lib/constants";

export function SubjectGrid() {
  return (
    <section className="mt-28">
      <SectionHeading
        align="center"
        eyebrow="Subjects"
        title="Coverage across CUET domains"
        subtitle="Language, domain aur general test — sab ek hi arena me."
      />

      <div className="mt-12 overflow-hidden [mask-image:linear-gradient(to right, transparent, black 12%, black 88%, transparent)]">
        <div className="animate-marquee flex w-max">
          {[0, 1].map((duplicate) => (
            <div key={duplicate} className="flex gap-4 pr-4">
              {SUBJECTS.map((subject) => (
                <div
                  key={`${subject.id}-${duplicate}`}
                  className="glass-card flex items-center gap-3 whitespace-nowrap px-6 py-4"
                >
                  <span className="font-semibold">{subject.name}</span>

                  <span className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                    {subject.section}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
