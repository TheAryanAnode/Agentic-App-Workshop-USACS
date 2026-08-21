import { tool } from "@langchain/core/tools";
import { z } from "zod";

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
    // TODO Checkpoint 4:
    // 1. Import findCourse from "@/data/courses".
    // 2. Look up courseCode.
    // 3. Return the course (or a structured error) with JSON.stringify.
    return JSON.stringify({
      kind: "error",
      message: `TODO: implement getCourseInfo for "${courseCode}".`,
    });
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
    // TODO: import and call searchDining from "@/data/dining".
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

export const findBuilding = tool(
  async ({ query }) => {
    // TODO: import and call searchBuildings from "@/data/buildings".
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

export const findEvents = tool(
  async ({ query }) => {
    // TODO: import and call searchEvents from "@/data/events".
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

export const calculateGrade = tool(
  async ({ grades }) => {
    // TODO: map Rutgers letter grades to points and average them.
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

// ⭐ STUDENTS WORK HERE
// Add each Rutgers tool to this array after you implement it.
export const tools = [calculator];

// YOUR TOOL:
// 1. Define it with tool(...)
// 2. Give it a clear description and a flat Zod schema
// 3. Return JSON with a predictable `kind`
// 4. Register it in the array above
