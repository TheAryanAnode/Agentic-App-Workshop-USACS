import { tool } from "@langchain/core/tools";
import { z } from "zod";

/**
 * A standalone copy of the getCourseInfo pattern.
 *
 * A tool has three parts:
 * 1. the function your program runs;
 * 2. a description the model reads;
 * 3. a schema that validates model-generated arguments.
 *
 * This file is an example only. The app imports the version in agent/tools.ts.
 */
export const exampleGetCourseInfo = tool(
  async ({ courseCode }) =>
    JSON.stringify({
      kind: "course",
      code: "01:198:112",
      name: "Data Structures",
      credits: 4,
      note: `Looked up ${courseCode} from your course dataset.`,
    }),
  {
    name: "getCourseInfo",
    description:
      "Look up a Rutgers course by code or name, such as CS112.",
    schema: z.object({
      courseCode: z.string().describe("A Rutgers course code or course name"),
    }),
  },
);
