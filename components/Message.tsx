import type { ChatMessage } from "@/lib/types";
import { ResultCard } from "./ResultCard";

export function Message({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex items-start gap-3 ${isUser ? "justify-end" : "justify-start"}`}
    >
      {!isUser && (
        <div className="mt-1 grid size-8 shrink-0 place-items-center rounded-xl bg-[var(--scarlet)] text-xs font-black text-white">
          R
        </div>
      )}
      <div
        className={`max-w-[88%] space-y-3 sm:max-w-[78%] ${
          isUser
            ? "rounded-[20px_20px_5px_20px] bg-[var(--ink)] px-4 py-3 text-white"
            : ""
        }`}
      >
        <div
          className={
            isUser
              ? "whitespace-pre-wrap text-sm leading-6"
              : "rounded-[5px_20px_20px_20px] border border-black/8 bg-white px-4 py-3 text-sm leading-6 shadow-sm"
          }
        >
          {message.content}
        </div>
        {message.results?.map((result, index) => (
          <ResultCard key={`${message.id}-result-${index}`} result={result} />
        ))}
      </div>
    </div>
  );
}
