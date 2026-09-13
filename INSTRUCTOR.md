# Instructor Guide

This workshop teaches **tool calling through a Rutgers project**. LangGraph is
the visible foundation, not the implementation assignment.

Students start with a working `getCourseInfo` tool. Each later checkpoint adds
a harder campus ability, so the agent gets more useful as they code.

## Before the room arrives

- Use Node.js 20+ and run `npm install`, `npm run typecheck`, and `npm run build`.
- Test `main` with a fresh Gemini AI Studio key: ask about CS112, then dining.
- Test `solution` with the final multi-tool prompt.
- Ask every student to create their own free key before the workshop. Gemini
  quotas apply per project, so one shared key can throttle the whole room.
- Keep one Groq key available as an instructor fallback.
- Project the activity panel; it is the visual explanation of the graph.

## Suggested 90-minute schedule

| Time | Segment | Outcome |
| --- | --- | --- |
| 0–10 | Launch and CS112 demo | Everyone sees a real campus tool call |
| 10–20 | Trace `graph.ts` and the activity panel | Students understand Agent → Tool → Agent |
| 20–40 | Build `findDining` | First student-written tool (search + list) |
| 40–55 | Build `findBuilding` or `findEvents` | Slightly harder matching and filtering |
| 55–72 | `calculateGrade` + multi-tool prompt | Logic, then combining abilities |
| 72–90 | Personal tool and demos | Students leave with a distinct project |

For 60 minutes, skip the personal tool and stop after the multi-tool prompt.
For two hours, reserve 25 minutes for personal tools and stretch goals.

## Teaching script

### Opening

Ask `What is CS112 and where is it usually taught?`, then point to these events:

1. request received;
2. agent decides;
3. `getCourseInfo` receives `courseCode: "CS112"`;
4. the result returns;
5. a course card appears, then the agent writes a human response.

The distinction to repeat: **the model chose an action; our code performed it**.

Then ask `Where can I eat on Busch?` The starter cannot look that up yet.
That missing ability is the first thing students add.

### Graph walkthrough

Open only four files:

- `state.ts`: the message history;
- `nodes.ts`: model and tool execution;
- `graph.ts`: edges and loop;
- `tools.ts`: today's workspace, starting with `getCourseInfo`.

Do not begin with SSE, React state, or provider setup. Those are intentionally
prebuilt infrastructure.

### Difficulty curve

Keep this order on the projector:

1. `getCourseInfo` — one lookup, one object (given)
2. `findDining` — search, return a list
3. `findBuilding` — aliases like "Hill" and "CORE"
4. `findEvents` — filter by topic or course
5. `calculateGrade` — parse, validate, compute
6. Combine tools, then invent a new one

### Solution reveal

The complete implementation is on `solution`:

```bash
git switch solution
```

Prefer displaying the relevant function rather than asking students to copy the
whole file. Return to `main` before continuing:

```bash
git switch main
```

Students with uncommitted work should not switch branches. Pair them with the
projected solution or show a diff instead.

## Gemini notes

- The default is `gemini-3.6-flash` through `@langchain/google`.
- `GOOGLE_API_KEY` and `GEMINI_API_KEY` are both accepted by `lib/model.ts`.
- Tool schemas are deliberately flat. Avoid nested unions during the workshop.
- A single user request may make several model requests because each tool result
  loops back to the agent.
- On HTTP 429, wait briefly or use the optional Groq fallback.
- Restart `npm run dev` after changing `.env.local`.

## Common failures

**The app says the key is missing**  
Confirm the file is named `.env.local`, not `.env.example`, and restart Next.js.

**The agent will not call a new tool**  
Confirm the tool is in the exported `tools` array. Then improve its description
and test with an explicit prompt.

**The model sends bad arguments**  
Make the Zod field description concrete, keep the schema flat, and show an
example in the description.

**A card does not render**  
The tool must return stringified JSON with the expected `kind`. Unknown kinds
need a corresponding case in `components/ResultCard.tsx`.

**Conversation behavior seems stale**  
Refresh the browser to create a new client `threadId`. `MemorySaver` persists
only inside the current Node process.

## Final demo checklist

- At least three tools run for one request.
- Inputs appear in Agent Activity.
- Structured results render as cards.
- The final answer combines results rather than repeating JSON.
- One tool handles a missing result without crashing the graph.
