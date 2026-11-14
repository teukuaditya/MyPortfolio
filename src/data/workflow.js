/**
 * BA workflow — the "How I work" differentiator section.
 */
export const workflowSteps = [
  {
    id: "elicitation",
    icon: "message",
    title: { en: "Elicitation", id: "Elicitsasi" },
    desc: {
      en: "Interview stakeholders, sit with actual users, and read the current process — assumptions get checked here, not in production.",
      id: "Wawancarai stakeholder, duduk bersama pengguna aktual, dan baca proses berjalan — asumsi dicek di sini, bukan di production.",
    },
    deliverable: { en: "Interview notes · process maps", id: "Catatan wawancara · peta proses" },
  },
  {
    id: "brd",
    icon: "file",
    title: { en: "BRD", id: "BRD" },
    desc: {
      en: "Translate findings into a Business Requirements Document: scope, business processes, business rules, user roles, and open issues.",
      id: "Terjemahkan temuan ke Business Requirements Document: scope, proses bisnis, business rules, user roles, dan open issues.",
    },
    deliverable: { en: "Business Requirements Document", id: "Business Requirements Document" },
  },
  {
    id: "srs-ucd",
    icon: "layers",
    title: { en: "SRS / UCD", id: "SRS / UCD" },
    desc: {
      en: "Specify it for the builders: functional requirements in the SRS and user journeys in Use Case Diagrams — kept in sync with real workflows.",
      id: "Spesifikasikan untuk pembangunnya: requirement fungsional di SRS dan perjalanan pengguna di Use Case Diagram — selalu sinkron dengan alur kerja nyata.",
    },
    deliverable: { en: "SRS · Use Case Diagrams", id: "SRS · Use Case Diagram" },
  },
  {
    id: "testing",
    icon: "clipboard",
    title: { en: "Functional Testing", id: "Functional Testing" },
    desc: {
      en: "Test against the business rules, not the happy path: multiple day-type scenarios, allowance math, edge cases. Every discrepancy documented for the dev team.",
      id: "Test terhadap business rules, bukan happy path saja: berbagai skenario day-type, kalkulasi tunjangan, edge case. Setiap discrepancy didokumentasikan untuk tim dev.",
    },
    deliverable: { en: "Test cases · bug reports", id: "Test case · laporan bug" },
  },
  {
    id: "uat",
    icon: "check",
    title: { en: "UAT", id: "UAT" },
    desc: {
      en: "Hand the system to real users with a script, watch where they stumble, and turn findings into requirement changes — closing the loop.",
      id: "Serahkan sistem ke pengguna nyata dengan skenario, amati di mana mereka tersandung, dan ubah temuan menjadi perubahan requirement — menutup lingkaran.",
    },
    deliverable: { en: "UAT sign-off · change log", id: "Sign-off UAT · change log" },
  },
]
