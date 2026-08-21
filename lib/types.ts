import type { CampusBuilding } from "@/data/buildings";
import type { Course } from "@/data/courses";
import type { DiningLocation } from "@/data/dining";
import type { CampusEvent } from "@/data/events";

export type ToolResult =
  | Course
  | {
      kind: "dining";
      query: string;
      matches: DiningLocation[];
      note?: string;
    }
  | {
      kind: "building";
      query: string;
      matches: CampusBuilding[];
    }
  | {
      kind: "event";
      query: string;
      matches: CampusEvent[];
      note?: string;
    }
  | {
      kind: "calculation";
      expression: string;
      result: number;
    }
  | {
      kind: "grade";
      grades: string[];
      gpa: number;
      scale: string;
    }
  | {
      kind: "error";
      message: string;
    };

export type ActivityStatus = "running" | "complete" | "error";

export type ActivityItem = {
  id: string;
  label: string;
  detail?: string;
  status: ActivityStatus;
  toolCallId?: string;
};

export type StreamEvent =
  | { type: "activity"; activity: ActivityItem }
  | { type: "tool_result"; result: ToolResult; toolName?: string }
  | { type: "assistant"; content: string }
  | { type: "error"; message: string }
  | { type: "done" };

export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  results?: ToolResult[];
};
