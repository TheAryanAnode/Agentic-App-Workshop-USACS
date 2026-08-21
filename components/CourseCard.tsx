import type { Course } from "@/data/courses";

export function CourseCard({ course }: { course: Course }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-[var(--scarlet)]/15 bg-white shadow-sm">
      <div className="flex items-start justify-between gap-4 bg-[var(--scarlet)] px-4 py-3 text-white">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/75">
            {course.code}
          </p>
          <h3 className="mt-0.5 font-bold">{course.name}</h3>
        </div>
        <span className="shrink-0 rounded-full bg-white/15 px-2.5 py-1 text-xs font-semibold">
          {course.credits} credits
        </span>
      </div>
      <div className="space-y-3 p-4 text-sm">
        <p className="leading-6 text-[var(--muted)]">{course.description}</p>
        <dl className="grid gap-2 sm:grid-cols-2">
          <Meta label="Campus" value={course.campus} />
          <Meta label="Typical building" value={course.typicalBuilding} />
          <Meta
            label="Prerequisites"
            value={
              course.prerequisites.length
                ? course.prerequisites.join(", ")
                : "None listed"
            }
          />
          <Meta label="School" value={course.school} />
        </dl>
      </div>
    </article>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-[var(--cream)] px-3 py-2.5">
      <dt className="text-[11px] font-bold uppercase tracking-wider text-[var(--muted)]">
        {label}
      </dt>
      <dd className="mt-0.5 font-medium text-[var(--ink)]">{value}</dd>
    </div>
  );
}
