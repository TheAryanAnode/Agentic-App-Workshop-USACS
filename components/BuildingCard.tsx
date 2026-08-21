import type { CampusBuilding } from "@/data/buildings";

export function BuildingCard({ building }: { building: CampusBuilding }) {
  return (
    <article className="rounded-2xl border border-sky-800/15 bg-sky-50/60 p-4 shadow-sm">
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-sky-800">
        {building.campus}
      </p>
      <h3 className="mt-1 font-bold">{building.name}</h3>
      <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
        {building.description}
      </p>
      <dl className="mt-3 space-y-2 text-sm">
        <div>
          <dt className="inline font-semibold">Address: </dt>
          <dd className="inline">{building.address}</dd>
        </div>
        <div>
          <dt className="inline font-semibold">Also called: </dt>
          <dd className="inline">{building.aliases.join(", ")}</dd>
        </div>
        <div>
          <dt className="inline font-semibold">Nearby: </dt>
          <dd className="inline">{building.nearby.join(", ")}</dd>
        </div>
      </dl>
    </article>
  );
}
