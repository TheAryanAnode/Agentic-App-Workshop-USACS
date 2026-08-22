import { Chat } from "@/components/Chat";

export default function Home() {
  return (
    <main className="min-h-screen px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-2rem)] max-w-[1480px] flex-col overflow-hidden rounded-[28px] border border-black/10 bg-[var(--paper)] shadow-[0_24px_80px_rgba(40,25,16,0.12)] sm:min-h-[calc(100vh-3rem)]">
        <header className="flex items-center justify-between gap-5 border-b border-black/10 bg-white/80 px-5 py-4 backdrop-blur sm:px-7">
          <div className="flex min-w-0 items-center gap-3">
            <div className="grid size-11 shrink-0 place-items-center rounded-2xl bg-[var(--scarlet)] text-xl font-black text-white shadow-[0_6px_18px_rgba(204,0,51,0.25)]">
              R
            </div>
            <div className="min-w-0">
              <h1 className="truncate text-base font-bold tracking-[-0.02em] sm:text-lg">
                Rutgers Campus Assistant
              </h1>
              <p className="truncate text-xs text-[var(--muted)] sm:text-sm">
                A LangGraph campus agent for Rutgers–New Brunswick
              </p>
            </div>
          </div>
          <div className="hidden items-center gap-2 rounded-full border border-emerald-700/15 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-800 sm:flex">
            <span className="size-2 rounded-full bg-emerald-600" />
            Agent ready
          </div>
        </header>
        <Chat />
      </div>
    </main>
  );
}
