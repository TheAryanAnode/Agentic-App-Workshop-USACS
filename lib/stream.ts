import type { BaseMessage } from "@langchain/core/messages";
import type { StreamEvent, ToolResult } from "./types";

export function encodeEvent(event: StreamEvent) {
  return `data: ${JSON.stringify(event)}\n\n`;
}

export function messageToText(message: BaseMessage) {
  if (typeof message.content === "string") return message.content;

  return message.content
    .map((block) => {
      if (
        typeof block === "object" &&
        block !== null &&
        "text" in block &&
        typeof block.text === "string"
      ) {
        return block.text;
      }
      return "";
    })
    .join("");
}

export function parseToolResult(content: BaseMessage["content"]) {
  const text =
    typeof content === "string"
      ? content
      : content
          .map((block) =>
            typeof block === "object" &&
            block !== null &&
            "text" in block &&
            typeof block.text === "string"
              ? block.text
              : "",
          )
          .join("");

  try {
    return JSON.parse(text) as ToolResult;
  } catch {
    return {
      kind: "error",
      message: text || "The tool returned an unreadable result.",
    } satisfies ToolResult;
  }
}

export function friendlyError(error: unknown) {
  const message = error instanceof Error ? error.message : String(error);

  if (message.includes("Missing AI key")) return message;
  if (/429|rate.?limit|quota/i.test(message)) {
    return "The model's free-tier limit was reached. Wait a minute, try a different API key, or configure the Groq fallback.";
  }
  if (/api.?key|unauth|permission|401|403/i.test(message)) {
    return "The AI API key was rejected. Check .env.local and restart the dev server.";
  }

  return "The agent hit an unexpected error. Check the server console for details.";
}
