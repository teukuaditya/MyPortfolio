/**
 * Skills grouped by category. category: "ba" | "dev" | "data" | "tools" | "extra"
 */
export const skillGroups = [
  {
    id: "ba",
    label: { en: "Business Analysis", id: "Business Analysis" },
    skills: [
      "Requirements Analysis", "BRD", "SRS", "UCD", "Business Process Documentation",
      "Functional Testing", "Test Case Design", "UAT", "Bug Reporting",
    ],
  },
  {
    id: "dev",
    label: { en: "Development", id: "Development" },
    skills: [
      "JavaScript", "PHP", "Python", "C#", "HTML/CSS",
      "Vue.js", "React.js", "Express.js", "Laravel",
    ],
  },
  {
    id: "data",
    label: { en: "Database", id: "Database" },
    skills: ["PostgreSQL", "MySQL", "SQL", "Prisma", "DBeaver"],
  },
  {
    id: "tools",
    label: { en: "Tools", id: "Tools" },
    skills: ["Git", "REST APIs", "Postman", "draw.io", "MS Word", "MS Excel"],
  },
  {
    id: "extra",
    label: { en: "Enterprise & Languages", id: "Enterprise & Bahasa" },
    skills: [
      "Microsoft Dynamics 365 (basic)", "Power Platform (Power Apps, Power Automate, Dataverse)",
      "Red Hat Enterprise Linux", "Indonesian (native)", "English (professional working)",
    ],
  },
]

/** Flat lookup for the filter tabs */
export const allSkills = skillGroups.flatMap((g) =>
  g.skills.map((s) => ({ name: s, group: g.id, groupLabel: g.label })),
)
