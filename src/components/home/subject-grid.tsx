import { SUBJECTS } from "@/lib/constants";

import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";

export function SubjectGrid() {
  return (
    <section className="mt-24">
      <SectionHeading
        eyebrow="Subjects"
        title="Coverage for major CUET subjects"
        subtitle="Mathematics, Science, Language, General Test aur domain subjects ke liye practice-ready structure."
      />

      <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {SUBJECTS.map((subject) => (
          <Card key={subject.id} className="p-5">
            <p className="font-semibold">{subject.name}</p>

            <p className="mt-1 text-xs uppercase tracking-[0.2em] text-zinc-500">
              {subject.section}
            </p>
          </Card>
        ))}
      </div>
    </section>
  );
}
