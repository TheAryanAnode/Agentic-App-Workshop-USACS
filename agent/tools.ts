import { tool } from "@langchain/core/tools";
import { z } from "zod";
import { findCourse } from "@/data/courses";
import { searchDining } from "@/data/dining";
import { searchBuildings } from "@/data/buildings";
import { searchEvents } from "@/data/events";

// ---------------------------------------------------------------------------
// WORKING EXAMPLE: every student starts with this tool.
// ---------------------------------------------------------------------------

export const calculator = tool(
  async ({ firstNumber, secondNumber, operation }) => {
    const operations = {
      add: () => firstNumber + secondNumber,
      subtract: () => firstNumber - secondNumber,
      multiply: () => firstNumber * secondNumber,
      divide: () => {
        if (secondNumber === 0) throw new Error("Cannot divide by zero.");
        return firstNumber / secondNumber;
      },
    };

    const result = operations[operation]();
    return JSON.stringify({
      kind: "calculation",
      expression: `${firstNumber} ${operation} ${secondNumber}`,
      result,
    });
  },
  {
    name: "calculator",
    description:
      "Perform arithmetic on two numbers. Use this instead of calculating mentally.",
    schema: z.object({
      firstNumber: z.number().describe("The first number"),
      secondNumber: z.number().describe("The second number"),
      operation: z
        .enum(["add", "subtract", "multiply", "divide"])
        .describe("The arithmetic operation"),
    }),
  },
);

// ---------------------------------------------------------------------------
// RUTGERS TOOLS: these are complete on the solution branch. On the starter
// branch, students receive short TODO templates for the same capabilities.
// ---------------------------------------------------------------------------

export const getCourseInfo = tool(
  async ({ courseCode }) => {
    const course = findCourse(courseCode);
    return JSON.stringify(
      course ?? {
        kind: "error",
        message: `No course matched "${courseCode}" in the workshop dataset.`,
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

export const findDining = tool(
  async ({ query }) => {
    const matches = searchDining(query);
    return JSON.stringify({
      kind: "dining",
      query,
      matches,
      note: "Hours are mock workshop data and should be verified before visiting.",
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

export const findBuilding = tool(
  async ({ query }) => {
    const matches = searchBuildings(query);
    return JSON.stringify({ kind: "building", query, matches });
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

export const findEvents = tool(
  async ({ query }) => {
    const matches = searchEvents(query);
    return JSON.stringify({
      kind: "event",
      query,
      matches,
      note: "Events are mock workshop examples, not a live calendar.",
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

const gradePoints: Record<string, number> = {
  A: 4,
  B: 3,
  "B+": 3.5,
  C: 2,
  "C+": 2.5,
  D: 1,
  F: 0,
};

export const calculateGrade = tool(
  async ({ grades }) => {
    const parsed = grades
      .split(",")
      .map((grade) => grade.trim().toUpperCase())
      .filter(Boolean);
    const invalid = parsed.filter((grade) => gradePoints[grade] === undefined);

    if (parsed.length === 0 || invalid.length > 0) {
      return JSON.stringify({
        kind: "error",
        message:
          invalid.length > 0
            ? `Unsupported grade(s): ${invalid.join(", ")}`
            : "Provide at least one letter grade.",
      });
    }

    const gpa =
      parsed.reduce((total, grade) => total + gradePoints[grade], 0) /
      parsed.length;

    return JSON.stringify({
      kind: "grade",
      grades: parsed,
      gpa: Number(gpa.toFixed(2)),
      scale: "Rutgers workshop scale (unweighted courses)",
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

// Add a new tool here, then include it in this array so the agent can use it.
export const tools = [
  calculator,
  getCourseInfo,
  findDining,
  findBuilding,
  findEvents,
  calculateGrade,
];
