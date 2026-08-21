"use client";

import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import type {
  ActivityItem,
  ChatMessage,
  StreamEvent,
  ToolResult,
} from "@/lib/types";
import { Message } from "./Message";
import { ResultCard } from "./ResultCard";
import { ToolActivity } from "./ToolActivity";

const examplePrompts = [
  "What is 42 × 17?",
  "What is CS112 and where is it usually taught?",
  "Find a meal-plan dining option on Busch.",
  "Show me upcoming computer science events.",
];

const welcome: ChatMessage = {
  id: "welcome",
  role: "assistant",
  content:
    "Hi! I’m your Rutgers Campus Assistant. I can use tools to calculate, look up courses, find dining, locate buildings, and discover events. Try one of the prompts below.",
};

export function Chat() {
  const [messages, setMessages] = useState<ChatMessage[]>([welcome]);
  const [activity, setActivity] = useState<ActivityItem[]>([]);
  const [liveResults, setLiveResults] = useState<ToolResult[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const threadId = useRef(crypto.randomUUID());
  const pendingResults = useRef<ToolResult[]>([]);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, liveResults, loading]);

  function recordActivity(next: ActivityItem) {
    setActivity((current) => {
      let prepared = current;
      if (next.label.startsWith("Calling ")) {
        prepared = current.map((item) =>
          item.label === "Agent deciding what to do" &&
          item.status === "running"
            ? { ...item, status: "complete" as const }
            : item,
        );
      }
      if (next.label === "Response generated") {
        prepared = prepared.map((item) =>
          item.status === "running"
            ? { ...item, status: "complete" as const }
            : item,
        );
      }

      const existing = prepared.findIndex((item) => item.id === next.id);
      if (existing === -1) return [...prepared, next];
      return prepared.map((item, index) => (index === existing ? next : item));
    });
  }

  async function sendMessage(text: string) {
    const clean = text.trim();
    if (!clean || loading) return;

    setInput("");
    setError("");
    setLiveResults([]);
    setActivity([]);
    setLoading(true);
    pendingResults.current = [];
    setMessages((current) => [
      ...current,
      { id: crypto.randomUUID(), role: "user", content: clean },
    ]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: clean, threadId: threadId.current }),
      });

      if (!response.ok || !response.body) {
        const payload = (await response.json().catch(() => ({}))) as {
          error?: string;
        };
        throw new Error(payload.error ?? "The chat request failed.");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { value, done } = await reader.read();
        buffer += decoder.decode(value, { stream: !done });
        const chunks = buffer.split("\n\n");
        buffer = chunks.pop() ?? "";

        for (const chunk of chunks) {
          const data = chunk
            .split("\n")
            .filter((line) => line.startsWith("data: "))
            .map((line) => line.slice(6))
            .join("");
          if (!data) continue;

          const event = JSON.parse(data) as StreamEvent;
          if (event.type === "activity") recordActivity(event.activity);
          if (event.type === "tool_result") {
            pendingResults.current = [
              ...pendingResults.current,
              event.result,
            ];
            setLiveResults([...pendingResults.current]);
          }
          if (event.type === "assistant") {
            setMessages((current) => [
              ...current,
              {
                id: crypto.randomUUID(),
                role: "assistant",
                content: event.content,
                results: [...pendingResults.current],
              },
            ]);
            setLiveResults([]);
          }
          if (event.type === "error") throw new Error(event.message);
        }

        if (done) break;
      }
    } catch (caught) {
      const message =
        caught instanceof Error ? caught.message : "Something went wrong.";
      setError(message);
      setActivity((current) =>
        current.map((item) =>
          item.status === "running" ? { ...item, status: "error" } : item,
        ),
      );
    } finally {
      setLoading(false);
    }
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    void sendMessage(input);
  }

  function onKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void sendMessage(input);
    }
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
      <section className="subtle-grid flex min-h-[620px] min-w-0 flex-1 flex-col">
        <div className="scrollbar-thin flex-1 overflow-y-auto px-4 py-6 sm:px-7 lg:px-10">
          <div className="mx-auto max-w-3xl space-y-5">
            {messages.map((message) => (
              <Message key={message.id} message={message} />
            ))}

            {liveResults.length > 0 && (
              <div className="ml-11 max-w-[78%] space-y-2">
                {liveResults.map((result, index) => (
                  <ResultCard key={`live-${index}`} result={result} />
                ))}
              </div>
            )}

            {loading && (
              <div className="flex items-center gap-3">
                <div className="grid size-8 place-items-center rounded-xl bg-[var(--scarlet)] text-xs font-black text-white">
                  R
                </div>
                <div className="flex gap-1.5 rounded-2xl border border-black/8 bg-white px-4 py-3 shadow-sm">
                  {[0, 1, 2].map((dot) => (
                    <span
                      key={dot}
                      className="thinking-dot size-2 rounded-full bg-[var(--scarlet)]"
                    />
                  ))}
                </div>
              </div>
            )}

            {error && (
              <div className="ml-11 rounded-2xl border border-red-700/15 bg-red-50 px-4 py-3 text-sm text-red-900">
                <p className="font-bold">The agent could not finish.</p>
                <p className="mt-1">{error}</p>
              </div>
            )}
            <div ref={endRef} />
          </div>
        </div>

        <div className="border-t border-black/10 bg-[var(--paper)] p-4 sm:p-5">
          <div className="mx-auto max-w-3xl">
            <div className="scrollbar-thin mb-3 flex gap-2 overflow-x-auto pb-1">
              {examplePrompts.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => void sendMessage(prompt)}
                  disabled={loading}
                  className="shrink-0 rounded-full border border-black/10 bg-white px-3 py-1.5 text-xs font-medium text-[var(--muted)] shadow-sm transition hover:border-[var(--scarlet)]/30 hover:text-[var(--scarlet)] disabled:opacity-45"
                >
                  {prompt}
                </button>
              ))}
            </div>
            <form
              onSubmit={onSubmit}
              className="flex items-end gap-2 rounded-[22px] border border-black/15 bg-white p-2 shadow-[0_8px_30px_rgba(45,35,25,0.08)] transition focus-within:border-[var(--scarlet)]/40 focus-within:ring-4 focus-within:ring-[var(--scarlet)]/5"
            >
              <textarea
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Ask about a course, dining hall, building, or event…"
                rows={1}
                disabled={loading}
                className="max-h-32 min-h-11 flex-1 resize-none bg-transparent px-3 py-2.5 text-sm outline-none placeholder:text-black/35 disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                aria-label="Send message"
                className="grid size-11 shrink-0 place-items-center rounded-2xl bg-[var(--scarlet)] text-lg font-bold text-white shadow-[0_5px_15px_rgba(204,0,51,0.25)] transition hover:bg-[var(--scarlet-dark)] disabled:cursor-not-allowed disabled:bg-black/15 disabled:shadow-none"
              >
                ↑
              </button>
            </form>
            <p className="mt-2 text-center text-[10px] text-[var(--muted)]">
              Mock workshop data · Always verify live Rutgers information
            </p>
          </div>
        </div>
      </section>
      <ToolActivity items={activity} active={loading} />
    </div>
  );
}
