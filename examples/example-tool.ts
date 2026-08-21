import { tool } from "@langchain/core/tools";
import { z } from "zod";

/**
 * Copy this shape when inventing a Rutgers capability.
 *
 * The predictable `kind` field lets the frontend choose a card. Add a matching
 * case to components/ResultCard.tsx when introducing a new visual result.
 */
export const findStudySpotExample = tool(
  async ({ campus, needsQuiet }) => {
    const result = {
      kind: "study-spot",
      name: needsQuiet ? "Quiet floor at the campus library" : "Student center lounge",
      campus,
      note: "Replace this example with a lookup in your own mock dataset.",
    };

    return JSON.stringify(result);
  },
  {
    name: "findStudySpot",
    description: "Recommend a Rutgers study spot by campus and noise preference.",
    schema: z.object({
      campus: z.string().describe("A Rutgers–New Brunswick campus"),
      needsQuiet: z
        .boolean()
        .describe("Whether the student wants a quiet environment"),
    }),
  },
);
