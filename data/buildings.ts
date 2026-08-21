export type CampusBuilding = {
  kind: "building";
  id: string;
  name: string;
  aliases: string[];
  campus: string;
  address: string;
  nearby: string[];
  description: string;
};

export const buildings: CampusBuilding[] = [
  {
    kind: "building",
    id: "hill-center",
    name: "Hill Center for the Mathematical Sciences",
    aliases: ["Hill", "Hill Center", "HLL"],
    campus: "Busch",
    address: "110 Frelinghuysen Road, Piscataway, NJ",
    nearby: ["Busch Student Center", "Busch Dining Hall"],
    description:
      "Home to Mathematics and many Computer Science lectures and offices.",
  },
  {
    kind: "building",
    id: "core",
    name: "Computing Research & Education Building",
    aliases: ["CORE", "CoRE Building"],
    campus: "Busch",
    address: "96 Frelinghuysen Road, Piscataway, NJ",
    nearby: ["Hill Center", "Library of Science and Medicine"],
    description:
      "A research and classroom building used by engineering and computing programs.",
  },
  {
    kind: "building",
    id: "alexander-library",
    name: "Archibald S. Alexander Library",
    aliases: ["Alexander", "Alex Library", "Alexander Library"],
    campus: "College Avenue",
    address: "169 College Avenue, New Brunswick, NJ",
    nearby: ["The Yard", "College Avenue Student Center"],
    description:
      "Rutgers–New Brunswick's main humanities and social sciences library.",
  },
  {
    kind: "building",
    id: "lsc",
    name: "Livingston Student Center",
    aliases: ["LSC", "Livingston Student Center"],
    campus: "Livingston",
    address: "84 Joyce Kilmer Avenue, Piscataway, NJ",
    nearby: ["Livingston Plaza", "Livingston Dining Commons"],
    description:
      "Student services, study areas, event rooms, and food options on Livingston.",
  },
  {
    kind: "building",
    id: "casc",
    name: "College Avenue Student Center",
    aliases: ["CASC", "College Ave Student Center", "College Avenue SC"],
    campus: "College Avenue",
    address: "126 College Avenue, New Brunswick, NJ",
    nearby: ["The Atrium", "Voorhees Mall"],
    description:
      "A central student gathering place with meeting rooms, services, and The Atrium.",
  },
];

export function searchBuildings(query: string) {
  const needle = query.trim().toLowerCase();
  return buildings.filter((building) =>
    [
      building.name,
      building.campus,
      building.address,
      building.description,
      ...building.aliases,
    ]
      .join(" ")
      .toLowerCase()
      .includes(needle),
  );
}
