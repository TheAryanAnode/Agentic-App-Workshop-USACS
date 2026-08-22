export type DiningLocation = {
  kind: "dining";
  id: string;
  name: string;
  campus: string;
  area: string;
  hours: string;
  cuisine: string[];
  mealPlan: boolean;
  description: string;
};

export const diningLocations: DiningLocation[] = [
  {
    kind: "dining",
    id: "busch-dining-hall",
    name: "Busch Dining Hall",
    campus: "Busch",
    area: "608 Bartholomew Road",
    hours: "7:00 AM–9:00 PM",
    cuisine: ["dining hall", "vegetarian", "halal-friendly options"],
    mealPlan: true,
    description: "The main all-you-care-to-eat dining hall on Busch Campus.",
  },
  {
    kind: "dining",
    id: "livingston-dining-commons",
    name: "Livingston Dining Commons",
    campus: "Livingston",
    area: "85 Avenue E",
    hours: "7:00 AM–9:00 PM",
    cuisine: ["dining hall", "international", "vegetarian"],
    mealPlan: true,
    description:
      "A large dining hall near Livingston Plaza and the student center.",
  },
  {
    kind: "dining",
    id: "neilson-dining-hall",
    name: "Neilson Dining Hall",
    campus: "Cook/Douglass",
    area: "177 Ryders Lane",
    hours: "7:30 AM–8:00 PM",
    cuisine: ["dining hall", "comfort food", "vegan options"],
    mealPlan: true,
    description: "The primary dining hall serving Cook and Douglass students.",
  },
  {
    kind: "dining",
    id: "brower-commons",
    name: "Brower Commons",
    campus: "College Avenue",
    area: "145 College Avenue",
    hours: "Closed for redevelopment",
    cuisine: ["campus landmark"],
    mealPlan: false,
    description:
      "A historic College Avenue dining location, currently closed for redevelopment.",
  },
  {
    kind: "dining",
    id: "the-atrium",
    name: "The Atrium",
    campus: "College Avenue",
    area: "College Avenue Student Center",
    hours: "10:00 AM–11:00 PM",
    cuisine: ["pizza", "bowls", "grab-and-go", "coffee"],
    mealPlan: true,
    description: "A food hall inside the College Avenue Student Center.",
  },
];

export function searchDining(query: string) {
  const needle = query.trim().toLowerCase();
  if (!needle) return diningLocations;

  return diningLocations.filter((location) =>
    [
      location.name,
      location.campus,
      location.area,
      location.description,
      ...location.cuisine,
    ]
      .join(" ")
      .toLowerCase()
      .includes(needle),
  );
}
