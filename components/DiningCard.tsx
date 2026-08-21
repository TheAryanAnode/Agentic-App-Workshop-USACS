import type { DiningLocation } from "@/data/dining";

export function DiningCard({ location }: { location: DiningLocation }) {
  return (
    <article className="rounded-2xl border border-amber-700/15 bg-[#fffaf0] p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-amber-800">
            {location.campus}
          </p>
          <h3 className="mt-1 font-bold">{location.name}</h3>
        </div>
        <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-900">
          {location.mealPlan ? "Meal plan" : "No meal plan"}
        </span>
      </div>
      <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
        {location.description}
      </p>
      <div className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
        <p>
          <span className="font-semibold">Hours:</span> {location.hours}
        </p>
        <p>
          <span className="font-semibold">Area:</span> {location.area}
        </p>
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {location.cuisine.map((item) => (
          <span
            key={item}
            className="rounded-full border border-amber-700/10 bg-white px-2 py-1 text-xs text-amber-950"
          >
            {item}
          </span>
        ))}
      </div>
    </article>
  );
}
