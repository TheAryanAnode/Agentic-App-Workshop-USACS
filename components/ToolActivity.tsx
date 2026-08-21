import type { ActivityItem } from "@/lib/types";

export function ToolActivity({
  items,
  active,
}: {
  items: ActivityItem[];
  active: boolean;
}) {
  return (
    <aside className="flex min-h-[300px] flex-col border-t border-black/10 bg-[#1d1b1a] text-white lg:min-h-0 lg:w-[390px] lg:border-t-0 lg:border-l">
      <div className="border-b border-white/10 px-5 py-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/45">
              Under the hood
            </p>
            <h2 className="mt-1 font-bold">Agent Activity</h2>
          </div>
          <span className="flex items-center gap-2 rounded-full bg-white/8 px-2.5 py-1 text-xs text-white/65">
            <span
              className={`size-1.5 rounded-full ${
                active ? "bg-amber-400" : "bg-emerald-400"
              }`}
            />
            {active ? "Running" : "Idle"}
          </span>
        </div>
        <p className="mt-3 text-sm leading-5 text-white/48">
          Watch LangGraph move between the agent and its tools.
        </p>
      </div>

      <div className="scrollbar-thin flex-1 overflow-y-auto p-5">
        {items.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/15 p-5 text-sm leading-6 text-white/40">
            Send a message to see the graph execute.
            <div className="mt-4 flex items-center gap-2 font-mono text-xs text-white/55">
              <span>AGENT</span>
              <span>→</span>
              <span>TOOL</span>
              <span>→</span>
              <span>AGENT</span>
            </div>
          </div>
        ) : (
          <ol className="relative space-y-1 before:absolute before:top-4 before:bottom-4 before:left-[13px] before:w-px before:bg-white/10">
            {items.map((item) => (
              <li key={item.id} className="relative flex gap-3 py-2.5">
                <StatusDot status={item.status} />
                <div className="min-w-0 flex-1 rounded-xl bg-white/[0.055] px-3.5 py-3">
                  <p className="text-sm font-semibold text-white/90">
                    {item.label}
                  </p>
                  {item.detail && (
                    <pre className="scrollbar-thin mt-2 overflow-x-auto whitespace-pre-wrap font-mono text-[11px] leading-5 text-white/45">
                      {item.detail}
                    </pre>
                  )}
                </div>
              </li>
            ))}
          </ol>
        )}
      </div>

      <div className="border-t border-white/10 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.15em] text-white/25">
        StateGraph · ToolNode · MemorySaver
      </div>
    </aside>
  );
}

function StatusDot({ status }: { status: ActivityItem["status"] }) {
  const styles = {
    running: "border-amber-400/30 bg-amber-400",
    complete: "border-emerald-400/30 bg-emerald-400",
    error: "border-red-400/30 bg-red-400",
  };
  return (
    <span
      className={`relative z-10 mt-2 block size-[27px] shrink-0 rounded-full border-[8px] ${styles[status]} ${
        status === "running" ? "animate-pulse" : ""
      }`}
    />
  );
}
