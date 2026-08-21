import {
  END,
  MemorySaver,
  START,
  StateGraph,
} from "@langchain/langgraph";
import { toolsCondition } from "@langchain/langgraph/prebuilt";
import { agentNode, toolNode } from "./nodes";
import { AgentState } from "./state";

/**
 * This is the whole agent loop:
 *
 * START → agent → (tool requested?) → tools → agent → END
 *
 * `toolsCondition` inspects the newest AI message. If it contains a tool call,
 * execution moves to "tools". Otherwise the graph is finished.
 */
const workflow = new StateGraph(AgentState)
  .addNode("agent", agentNode)
  .addNode("tools", toolNode)
  .addEdge(START, "agent")
  .addConditionalEdges("agent", toolsCondition, ["tools", END])
  .addEdge("tools", "agent");

// MemorySaver keeps each browser thread's conversation in this Node process.
const memory = new MemorySaver();

export const graph = workflow.compile({ checkpointer: memory });
