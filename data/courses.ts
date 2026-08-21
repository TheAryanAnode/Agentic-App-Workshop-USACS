export type Course = {
  kind: "course";
  code: string;
  shortCode: string;
  name: string;
  credits: number;
  school: string;
  campus: string;
  typicalBuilding: string;
  prerequisites: string[];
  description: string;
};

export const courses: Course[] = [
  {
    kind: "course",
    code: "01:198:111",
    shortCode: "CS111",
    name: "Introduction to Computer Science",
    credits: 4,
    school: "School of Arts and Sciences",
    campus: "Busch",
    typicalBuilding: "Hill Center",
    prerequisites: [],
    description:
      "Programming fundamentals, problem solving, data types, control flow, and object-oriented programming.",
  },
  {
    kind: "course",
    code: "01:198:112",
    shortCode: "CS112",
    name: "Data Structures",
    credits: 4,
    school: "School of Arts and Sciences",
    campus: "Busch",
    typicalBuilding: "Hill Center",
    prerequisites: ["01:198:111", "01:640:115 or placement"],
    description:
      "Data structures and algorithms including linked lists, trees, hash tables, graphs, recursion, and asymptotic analysis.",
  },
  {
    kind: "course",
    code: "01:198:205",
    shortCode: "CS205",
    name: "Introduction to Discrete Structures I",
    credits: 4,
    school: "School of Arts and Sciences",
    campus: "Busch",
    typicalBuilding: "Allison Road Classroom",
    prerequisites: ["01:198:111"],
    description:
      "Logic, sets, functions, combinatorics, probability, and proof techniques for computer science.",
  },
  {
    kind: "course",
    code: "01:640:151",
    shortCode: "MATH151",
    name: "Calculus I for the Mathematical and Physical Sciences",
    credits: 4,
    school: "School of Arts and Sciences",
    campus: "Busch",
    typicalBuilding: "Hill Center",
    prerequisites: ["Placement or qualifying precalculus course"],
    description:
      "Limits, derivatives, applications of differentiation, and an introduction to integration.",
  },
  {
    kind: "course",
    code: "01:355:101",
    shortCode: "EXPOS101",
    name: "Expository Writing I",
    credits: 3,
    school: "School of Arts and Sciences",
    campus: "College Avenue",
    typicalBuilding: "Scott Hall",
    prerequisites: [],
    description:
      "College-level analytical reading and writing using a sequence of increasingly complex texts.",
  },
];

function normalizeCourseCode(value: string) {
  return value.toUpperCase().replace(/[\s-]/g, "");
}

export function findCourse(query: string) {
  const normalized = normalizeCourseCode(query);
  return courses.find((course) => {
    const compactOfficial = course.code.replaceAll(":", "");
    return (
      normalizeCourseCode(course.shortCode) === normalized ||
      compactOfficial === normalized ||
      course.code === query ||
      course.name.toUpperCase().includes(query.trim().toUpperCase())
    );
  });
}
