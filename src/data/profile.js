/**
 * Personal profile — single source of truth for identity/contact data.
 * Localized strings use { en, id } objects.
 */
export const profile = {
  name: "Teuku Aditya",
  initials: "TA",
  email: "teukuaditya2003@gmail.com",
  phone: "+62 878-8362-3555",
  phoneHref: "tel:+6287883623555",
  location: {
    en: "Depok, Indonesia — originally Purwokerto, Banyumas",
    id: "Depok, Indonesia — asal Purwokerto, Banyumas",
  },
  openTo: { en: "Open to work — Jabodetabek", id: "Terbuka untuk kerja — Jabodetabek" },
  github: "https://github.com/teukuaditya",
  githubUser: "teukuaditya",
  linkedin: "https://www.linkedin.com/in/teuku-aditya-3b2823257",
  /** TODO: replace with your real CV PDF (placeholder is clearly marked inside) */
  cvPath: "/cv/teuku-aditya-cv.pdf",

  role: { en: "Business Analyst (Intern)", id: "Business Analyst (Intern)" },

  education: {
    degree: { en: "B.Sc. Computer Science (S.Kom.)", id: "S.Kom. Ilmu Komputer" },
    school: "Universitas Amikom Purwokerto",
    period: "2022 — 2026",
    gpa: "3.61 / 4.00",
  },

  /** Animated counters in About */
  stats: [
    { value: 3.61, decimals: 2, suffix: "", label: { en: "GPA / 4.00", id: "IPK / 4.00" } },
    { value: 4, decimals: 0, suffix: "", label: { en: "Years studying CS", id: "Tahun kuliah CS" } },
    { value: 30, decimals: 0, suffix: "+", label: { en: "Modules documented", id: "Modul terdokumentasi" } },
    { value: 2, decimals: 0, suffix: "", label: { en: "Internships", id: "Pengalaman magang" } },
  ],

  currentlyLearning: ["Microsoft Dynamics 365", "Odoo", "Power Platform"],
}
