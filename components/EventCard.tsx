import type { CampusEvent } from "@/data/events";

export function EventCard({ event }: { event: CampusEvent }) {
  return (
    <article className="rounded-2xl border border-violet-800/15 bg-violet-50/60 p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-violet-800">
            {event.organizer}
          </p>
          <h3 className="mt-1 font-bold">{event.name}</h3>
        </div>
        <span className="shrink-0 rounded-lg bg-violet-100 px-2.5 py-1 text-xs font-semibold text-violet-900">
          {event.campus}
        </span>
      </div>
      <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
        {event.description}
      </p>
      <div className="mt-3 grid gap-2 rounded-xl bg-white/80 p-3 text-sm sm:grid-cols-2">
        <p>
          <span className="font-semibold">When:</span> {event.date},{" "}
          {event.time}
        </p>
        <p>
          <span className="font-semibold">Where:</span> {event.location}
        </p>
      </div>
    </article>
  );
}
