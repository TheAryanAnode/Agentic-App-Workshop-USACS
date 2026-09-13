import { tool } from "@langchain/core/tools";
import { z } from "zod";
import { findCourse } from "@/data/courses";

// ---------------------------------------------------------------------------
// WORKING EXAMPLE — already registered. Copy this pattern for later tools.
// One lookup, one result. This is the easiest kind of campus tool.
// ---------------------------------------------------------------------------

export const getCourseInfo = tool(
  async ({ courseCode }) => {
    const course = findCourse(courseCode);
    return JSON.stringify(
      course ?? {
        kind: "error",
        message: `No course matched "${courseCode}".`,
      },
    );
  },
  {
    name: "getCourseInfo",
    description:
      "Look up a Rutgers course by code, short code, or name, such as 01:198:112 or CS112.",
    schema: z.object({
      courseCode: z.string().describe("A Rutgers course code or course name"),
    }),
  },
);

// ---------------------------------------------------------------------------
// Add abilities below. Each one is a little harder than the last.
// Remember: implement the function, then add it to `tools` at the bottom.
// ---------------------------------------------------------------------------

// Checkpoint 3 — search and return a list
export const findDining = tool(
  async ({ query }) => {
    // TODO: import searchDining from "@/data/dining"
    // Call it with query and return:
    // JSON.stringify({ kind: "dining", query, matches })
    return JSON.stringify({
      kind: "error",
      message: `TODO: implement findDining for "${query}".`,
    });
  },
  {
    name: "findDining",
    description:
      "Find Rutgers dining options by campus, name, food, or feature such as meal plan.",
    schema: z.object({
      query: z
        .string()
        .describe("A campus, dining location, cuisine, or dining preference"),
    }),
  },
);

// Checkpoint 4 — match nicknames like "Hill" or "CORE"
export const findBuilding = tool(
  async ({ query }) => {
    // TODO: import searchBuildings from "@/data/buildings"
    // Return { kind: "building", query, matches }
    return JSON.stringify({
      kind: "error",
      message: `TODO: implement findBuilding for "${query}".`,
    });
  },
  {
    name: "findBuilding",
    description:
      "Find a Rutgers building by name, abbreviation, alias, campus, or purpose.",
    schema: z.object({
      query: z.string().describe("A building name, alias, or campus"),
    }),
  },
);

// Checkpoint 5 — filter by topic, campus, org, or course
export const findEvents = tool(
  async ({ query }) => {
    // TODO: import searchEvents from "@/data/events"
    // Return { kind: "event", query, matches }
    return JSON.stringify({
      kind: "error",
      message: `TODO: implement findEvents for "${query}".`,
    });
  },
  {
    name: "findEvents",
    description:
      "Find Rutgers events by topic, organization, campus, course, or event name.",
    schema: z.object({
      query: z.string().describe("An event topic, campus, course, or organizer"),
    }),
  },
);

// Checkpoint 6 — parse input, validate, and compute
export const calculateGrade = tool(
  async ({ grades }) => {
    // TODO: split the comma-separated grades, map letter grades to points
    // (A=4, B+=3.5, B=3, C+=2.5, C=2, D=1, F=0), then return the average.
    // Return { kind: "grade", grades, gpa, scale }
    return JSON.stringify({
      kind: "error",
      message: `TODO: implement calculateGrade for "${grades}".`,
    });
  },
  {
    name: "calculateGrade",
    description:
      "Calculate an estimated GPA from comma-separated Rutgers letter grades.",
    schema: z.object({
      grades: z
        .string()
        .describe('Comma-separated letter grades, for example "A, B+, B"'),
    }),
  },
);

// Register a tool here after you implement it, or the agent cannot call it.
export const tools = [getCourseInfo];

// YOUR TOOL:
// Combine ideas, add a new dataset, or solve a request the current tools cannot.
// 1. Define it with tool(...)
// 2. Give it a clear description and a flat Zod schema
// 3. Return JSON with a predictable `kind`
// 4. Register it in the array above
