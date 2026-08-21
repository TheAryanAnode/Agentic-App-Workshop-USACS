import { tool } from "@langchain/core/tools";
import { z } from "zod";

/**
 * A minimal standalone tool example.
 *
 * A tool has three parts:
 * 1. the function your program runs;
 * 2. a description the model reads;
 * 3. a schema that validates model-generated arguments.
 *
 * This file is an example only. The app imports the version in agent/tools.ts.
 */
export const exampleCalculator = tool(
  async ({ a, b }) =>
    JSON.stringify({ kind: "calculation", expression: `${a} + ${b}`, result: a + b }),
  {
    name: "addTwoNumbers",
    description: "Add exactly two numbers.",
    schema: z.object({
      a: z.number().describe("The first number"),
      b: z.number().describe("The second number"),
    }),
  },
);
