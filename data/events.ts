export type CampusEvent = {
  kind: "event";
  id: string;
  name: string;
  date: string;
  time: string;
  location: string;
  campus: string;
  organizer: string;
  tags: string[];
  description: string;
};

export const events: CampusEvent[] = [
  {
    kind: "event",
    id: "fall-involvement-fair",
    name: "Fall Involvement Fair",
    date: "September 7, 2026",
    time: "3:00 PM–6:00 PM",
    location: "College Avenue",
    campus: "College Avenue",
    organizer: "Student Centers and Activities",
    tags: ["clubs", "community", "first-year"],
    description: "Meet Rutgers student organizations and find ways to get involved.",
  },
  {
    kind: "event",
    id: "rutgers-tech-career-fair",
    name: "Rutgers Technology Career Fair",
    date: "September 23, 2026",
    time: "11:00 AM–4:00 PM",
    location: "Jersey Mike's Arena",
    campus: "Livingston",
    organizer: "Office of Career Exploration and Success",
    tags: ["career", "technology", "computer science"],
    description:
      "Connect with employers recruiting students for technical internships and full-time roles.",
  },
  {
    kind: "event",
    id: "hackru-fall",
    name: "HackRU Fall 2026",
    date: "October 10–11, 2026",
    time: "24-hour event",
    location: "College Avenue Student Center",
    campus: "College Avenue",
    organizer: "USACS and HackRU",
    tags: ["hackathon", "coding", "computer science", "free food"],
    description:
      "Build a project with other students during Rutgers' student-run hackathon.",
  },
  {
    kind: "event",
    id: "data-structures-review",
    name: "CS112 Data Structures Review Night",
    date: "October 20, 2026",
    time: "7:00 PM–9:00 PM",
    location: "Hill Center 114",
    campus: "Busch",
    organizer: "Rutgers USACS",
    tags: ["CS112", "study", "computer science"],
    description:
      "A peer-led review of trees, hash tables, and graph traversal before the midterm.",
  },
];

export function searchEvents(query: string) {
  const needle = query.trim().toLowerCase();
  if (!needle) return events;

  return events.filter((event) =>
    [
      event.name,
      event.location,
      event.campus,
      event.organizer,
      event.description,
      ...event.tags,
    ]
      .join(" ")
      .toLowerCase()
      .includes(needle),
  );
}
