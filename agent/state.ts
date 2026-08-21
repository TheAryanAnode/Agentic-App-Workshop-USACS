import { MessagesAnnotation } from "@langchain/langgraph";

/**
 * State is what the graph remembers while it runs.
 *
 * MessagesAnnotation gives us a `messages` array and a reducer that appends
 * new Human, AI, and Tool messages in the correct order.
 */
export const AgentState = MessagesAnnotation;

export type AgentStateType = typeof AgentState.State;
