/**
 * Work experience — newest first.
 * Every user-facing string has en / id variants.
 */
export const experience = [
  {
    id: "nashta",
    company: "PT. NashTa Global Utama",
    role: { en: "Business Analyst (Intern)", id: "Business Analyst (Intern)" },
    period: "Sep 2026 — Present",
    tags: ["BRD", "SRS", "UCD", "Functional Testing", "Odoo"],
    summary: {
      en: "Owning requirements for an internal Human Capital & IT Operations system (HCMC and ITOPS dashboards) — 30+ modules end to end.",
      id: "Menangani requirements untuk sistem internal Human Capital & IT Operations (dashboard HCMC dan ITOPS) — 30+ modul secara end-to-end.",
    },
    bullets: {
      en: [
        "Authored the BRD for the internal Human Capital & IT Operations system (HCMC and ITOPS dashboards), 30+ modules: scope, business processes, business rules, user roles, and open issues.",
        "Reviewed and updated SRS and UCD documents to match actual workflows (Extra Work Claim, Medical Claim, Talent Acquisition, Employee, etc.).",
        "Ran functional testing against business rules; documented discrepancies and requirement changes for the development team.",
        "Validated meal, attendance, and transport allowance calculations across multiple day-type scenarios; reported bugs.",
        "Drafted a BRD for a payroll system planned on Odoo: As-Is/To-Be process diagrams and functional requirements (tax, BPJS, overtime, leave, approval, payslip).",
      ],
      id: [
        "Menyusun BRD untuk sistem internal Human Capital & IT Operations (dashboard HCMC dan ITOPS), 30+ modul: scope, proses bisnis, business rules, user roles, dan open issues.",
        "Mereview dan memperbarui dokumen SRS serta UCD agar sesuai alur kerja aktual (Extra Work Claim, Medical Claim, Talent Acquisition, Employee, dll).",
        "Menjalankan functional testing terhadap business rules; mendokumentasikan discrepancy dan perubahan requirement untuk tim developer.",
        "Memvalidasi kalkulasi tunjangan makan, kehadiran, dan transportasi di berbagai skenario day-type; melaporkan bug.",
        "Menyusun BRD untuk sistem payroll yang direncanakan di Odoo: diagram proses As-Is/To-Be dan requirement fungsional (pajak, BPJS, lembur, cuti, approval, payslip).",
      ],
    },
  },
  {
    id: "stechoq",
    company: "PT Stechoq Robotika Indonesia",
    role: { en: "Fullstack Developer (Intern)", id: "Fullstack Developer (Intern)" },
    period: "Sep 2024 — Dec 2024",
    tags: ["Vue.js", "Express.js", "PostgreSQL", "Prisma", "Bootstrap"],
    summary: {
      en: "Built a Warehouse Management System (WMS) used for real warehouse operations — from master data to stock transactions.",
      id: "Membangun Warehouse Management System (WMS) yang dipakai untuk operasional gudang nyata — dari master data hingga transaksi stok.",
    },
    bullets: {
      en: [
        "Built a Warehouse Management System with Vue.js, Bootstrap, Express.js, PostgreSQL, and Prisma.",
        "Implemented Master Data Inventory: items, categories, suppliers, and stock thresholds.",
        "Developed warehouse transaction flows: goods receipt, issue, and stock adjustment with audit trails.",
      ],
      id: [
        "Membangun Warehouse Management System dengan Vue.js, Bootstrap, Express.js, PostgreSQL, dan Prisma.",
        "Mengimplementasikan Master Data Inventory: barang, kategori, supplier, dan batas stok.",
        "Mengembangkan alur transaksi gudang: penerimaan barang, pengeluaran, dan penyesuaian stok dengan jejak audit.",
      ],
    },
  },
  {
    id: "education",
    company: "Universitas Amikom Purwokerto",
    role: { en: "B.Sc. Computer Science (S.Kom.)", id: "S.Kom. Ilmu Komputer" },
    period: "2022 — 2026",
    tags: ["GPA 3.61/4.00"],
    summary: {
      en: "Computer Science undergraduate, GPA 3.61/4.00. Active in UKM INTERMEDIA (programming division) and Google Developer Student Clubs.",
      id: "Mahasiswa Ilmu Komputer, IPK 3.61/4.00. Aktif di UKM INTERMEDIA (divisi programming) dan Google Developer Student Clubs.",
    },
    bullets: {
      en: [
        "Thesis: DRIVE VENTURE — e-commerce platform with Laravel + MySQL, RajaOngkir shipping and Midtrans payment integration.",
        "Organizations: UKM INTERMEDIA Amikom Purwokerto (programming division), GDSC ITTP, kelasfullstack.id by Codepolitan.",
      ],
      id: [
        "Skripsi: DRIVE VENTURE — platform e-commerce dengan Laravel + MySQL, integrasi RajaOngkir (pengiriman) dan Midtrans (pembayaran).",
        "Organisasi: UKM INTERMEDIA Amikom Purwokerto (divisi programming), GDSC ITTP, kelasfullstack.id by Codepolitan.",
      ],
    },
  },
]
