import { HumanMessage } from "@langchain/core/messages";
import { graph } from "@/agent/graph";
import {
  encodeEvent,
  friendlyError,
  isUnknownToolError,
  messageToText,
  parseToolResult,
} from "@/lib/stream";
import type { StreamEvent } from "@/lib/types";

export const runtime = "nodejs";
export const maxDuration = 60;

type GraphMessage = {
  content: unknown;
  name?: string;
  tool_call_id?: string;
  tool_calls?: Array<{
    id?: string;
    name: string;
    args: Record<string, unknown>;
  }>;
  _getType?: () => string;
};

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Request body must be JSON." }, { status: 400 });
  }

  const { message, threadId } = (body ?? {}) as {
    message?: unknown;
    threadId?: unknown;
  };

  if (typeof message !== "string" || !message.trim()) {
    return Response.json({ error: "A message is required." }, { status: 400 });
  }
  if (
    typeof threadId !== "string" ||
    !threadId.trim() ||
    threadId.length > 128
  ) {
    return Response.json({ error: "A valid threadId is required." }, { status: 400 });
  }

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const send = (event: StreamEvent) =>
        controller.enqueue(encoder.encode(encodeEvent(event)));

      send({
        type: "activity",
        activity: {
          id: `request-${crypto.randomUUID()}`,
          label: "Request received",
          detail: message.trim(),
          status: "complete",
        },
      });
      send({
        type: "activity",
        activity: {
          id: `thinking-${crypto.randomUUID()}`,
          label: "Agent deciding what to do",
          status: "running",
        },
      });

      const needsCampusTool =
        /\b(dining|eat|meal[- ]?plan|building|hill center|events?|gpa|grades?)\b/i.test(
          message,
        );
      const unavailableMessage =
        "I don't have a registered tool for that yet, so I can't look it up. Implement the tool in agent/tools.ts and add it to the tools array.";

      try {
        let sawUnknownTool = false;
        let sawSuccessfulResult = false;

        const updates = await graph.stream(
          { messages: [new HumanMessage(message.trim())] },
          {
            configurable: { thread_id: threadId },
            streamMode: "updates",
          },
        );

        for await (const update of updates) {
          if (request.signal.aborted) break;

          if ("agent" in update) {
            const messages = (
              update.agent as { messages?: GraphMessage[] }
            ).messages;
            const aiMessage = messages?.at(-1);
            if (!aiMessage) continue;

            const toolCalls = aiMessage.tool_calls ?? [];
            if (toolCalls.length > 0) {
              for (const call of toolCalls) {
                const callId = call.id ?? crypto.randomUUID();
                send({
                  type: "activity",
                  activity: {
                    id: `tool-${callId}`,
                    toolCallId: callId,
                    label: `Calling ${call.name}`,
                    detail: JSON.stringify(call.args, null, 2),
                    status: "running",
                  },
                });
              }
            } else {
              const content = messageToText(aiMessage as never);
              if (content) {
                const hideInventedAnswer =
                  !sawSuccessfulResult &&
                  (sawUnknownTool || needsCampusTool);
                send({
                  type: "assistant",
                  content: hideInventedAnswer ? unavailableMessage : content,
                });
                send({
                  type: "activity",
                  activity: {
                    id: `response-${crypto.randomUUID()}`,
                    label: "Response generated",
                    status: "complete",
                  },
                });
              }
            }
          }

          if ("tools" in update) {
            const messages = (
              update.tools as { messages?: GraphMessage[] }
            ).messages;

            for (const toolMessage of messages ?? []) {
              const callId = toolMessage.tool_call_id ?? crypto.randomUUID();
              const result = parseToolResult(toolMessage.content as never);

              if (isUnknownToolError(result)) {
                sawUnknownTool = true;
                send({
                  type: "activity",
                  activity: {
                    id: `tool-${callId}`,
                    toolCallId: callId,
                    label: `${toolMessage.name ?? "Tool"} is not registered`,
                    status: "error",
                  },
                });
                continue;
              }

              if (result.kind !== "error") {
                sawSuccessfulResult = true;
              }

              send({
                type: "tool_result",
                toolName: toolMessage.name,
                result,
              });
              send({
                type: "activity",
                activity: {
                  id: `tool-${callId}`,
                  toolCallId: callId,
                  label: `${toolMessage.name ?? "Tool"} completed`,
                  status: "complete",
                },
              });
            }

            send({
              type: "activity",
              activity: {
                id: `process-${crypto.randomUUID()}`,
                label: "Agent processing tool result",
                status: "running",
              },
            });
          }
        }

        send({ type: "done" });
      } catch (error) {
        console.error("Agent execution failed:", error);
        const message = friendlyError(error);
        send({ type: "error", message });
        send({
          type: "activity",
          activity: {
            id: `error-${crypto.randomUUID()}`,
            label: "Agent stopped",
            detail: message,
            status: "error",
          },
        });
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}
