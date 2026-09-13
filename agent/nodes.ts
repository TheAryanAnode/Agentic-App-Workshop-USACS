import { SystemMessage } from "@langchain/core/messages";
import { ToolNode } from "@langchain/langgraph/prebuilt";
import { getModel } from "@/lib/model";
import { SYSTEM_PROMPT } from "./prompts";
import type { AgentStateType } from "./state";
import { tools } from "./tools";

/**
 * The agent node asks the model what to do next.
 *
 * Binding tools gives the model their names, descriptions, and input schemas.
 * The model can either answer directly or request one or more tool calls.
 */
export async function agentNode(state: AgentStateType) {
  const modelWithTools = getModel().bindTools(tools);
  const registered = tools.map((tool) => tool.name).join(", ");
  const response = await modelWithTools.invoke([
    new SystemMessage(
      `${SYSTEM_PROMPT}\n\nRegistered tools: ${registered}. Only call these names.`,
    ),
    ...state.messages,
  ]);

  return { messages: [response] };
}

/**
 * ToolNode executes any tool calls found in the latest AI message and appends
 * ToolMessages containing their results.
 */
export const toolNode = new ToolNode(tools);
