import type { ToolResult } from "@/lib/types";
import { BuildingCard } from "./BuildingCard";
import { CourseCard } from "./CourseCard";
import { DiningCard } from "./DiningCard";
import { EventCard } from "./EventCard";

export function ResultCard({ result }: { result: ToolResult }) {
  if (result.kind === "course") {
    return <CourseCard course={result} />;
  }

  if (result.kind === "dining") {
    return (
      <ResultGroup
        empty="No dining locations matched this request."
        note={result.note}
      >
        {result.matches.map((location) => (
          <DiningCard key={location.id} location={location} />
        ))}
      </ResultGroup>
    );
  }

  if (result.kind === "building") {
    return (
      <ResultGroup empty="No buildings matched this request.">
        {result.matches.map((building) => (
          <BuildingCard key={building.id} building={building} />
        ))}
      </ResultGroup>
    );
  }

  if (result.kind === "event") {
    return (
      <ResultGroup
        empty="No events matched this request."
        note={result.note}
      >
        {result.matches.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </ResultGroup>
    );
  }

  if (result.kind === "grade") {
    return (
      <div className="rounded-2xl border border-emerald-800/15 bg-emerald-50 p-4">
        <p className="text-xs font-bold uppercase tracking-wider text-emerald-800">
          Grade estimate
        </p>
        <div className="mt-2 flex items-end justify-between gap-4">
          <p className="font-mono text-sm">{result.grades.join(" · ")}</p>
          <p className="text-2xl font-black text-emerald-900">
            {result.gpa.toFixed(2)} GPA
          </p>
        </div>
        <p className="mt-2 text-xs text-emerald-900/65">{result.scale}</p>
      </div>
    );
  }

  if (/tool .+ not found/i.test(result.message)) {
    return null;
  }

  return (
    <div className="rounded-2xl border border-red-800/15 bg-red-50 p-4 text-sm text-red-900">
      <span className="font-bold">Tool response:</span> {result.message}
    </div>
  );
}

function ResultGroup({
  children,
  empty,
  note,
}: {
  children: React.ReactNode;
  empty: string;
  note?: string;
}) {
  const hasChildren = Array.isArray(children) ? children.length > 0 : !!children;
  return (
    <div className="space-y-2">
      {hasChildren ? (
        children
      ) : (
        <p className="rounded-xl bg-black/5 p-3 text-sm text-[var(--muted)]">
          {empty}
        </p>
      )}
      {note && <p className="px-1 text-xs text-[var(--muted)]">{note}</p>}
    </div>
  );
}
