/**
 * Projects / case studies. category: "ba" | "dev".
 * BA case studies describe sanitized, mock data only — no real internal
 * company data (NDA). Links marked TODO are placeholders awaiting assets.
 */
export const projects = [
  {
    id: "drive-venture",
    category: "dev",
    featured: true,
    image: "/img/projects/drive-venture.webp",
    imageAlt: { en: "DRVN Store — login page", id: "DRVN Store — halaman login" },
    title: "DRIVE VENTURE",
    subtitle: { en: "Thesis — full e-commerce platform", id: "Skripsi — platform e-commerce lengkap" },
    role: { en: "Sole developer & researcher", id: "Developer & peneliti tunggal" },
    period: "2025 — 2026",
    stack: ["Laravel", "MySQL", "RajaOngkir", "Midtrans", "Blade"],
    problem: {
      en: "Small auto-accessory sellers juggle manual order books, flat shipping fees, and bank-transfer-only payments — losing orders to errors and slow confirmations.",
      id: "Penjual aksesori otomotif kecil masih pakai buku order manual, ongkir flat, dan pembayaran transfer saja — order hilang karena error dan konfirmasi lambat.",
    },
    process: {
      en: [
        "Mapped the customer journey from catalog browsing to order completion, then designed the database schema (products, variants, carts, orders, shipments).",
        "Built product management (CRUD, stock, categories), cart, checkout, and order status flows in Laravel.",
        "Integrated RajaOngkir for live shipping-cost calculation by destination and weight.",
        "Integrated Midtrans Snap for hosted payments with webhook-driven order status updates.",
      ],
      id: [
        "Memetakan customer journey dari katalog sampai order selesai, lalu merancang skema database (produk, varian, cart, order, pengiriman).",
        "Membangun manajemen produk (CRUD, stok, kategori), cart, checkout, dan alur status order di Laravel.",
        "Integrasi RajaOngkir untuk kalkulasi ongkir real-time berdasarkan tujuan dan berat.",
        "Integrasi Midtrans Snap untuk pembayaran ter-hosting dengan update status order via webhook.",
      ],
    },
    outcome: {
      en: "A working end-to-end commerce flow: browse → cart → real shipping cost → paid order with automatic status tracking. Defended as an undergraduate thesis.",
      id: "Alur commerce end-to-end yang berfungsi: lihat produk → cart → ongkir nyata → order terbayar dengan status otomatis. Dipertahankan sebagai skripsi S1.",
    },
    links: [
      { icon: "github", label: { en: "Source code", id: "Kode sumber" }, url: "https://github.com/teukuaditya/e-commerce" },
    ],
  },
  {
    id: "wms",
    category: "dev",
    featured: true,
    title: "Warehouse Management System",
    subtitle: { en: "PT Stechoq Robotika Indonesia", id: "PT Stechoq Robotika Indonesia" },
    role: { en: "Fullstack Developer (Intern)", id: "Fullstack Developer (Intern)" },
    period: "Sep — Dec 2024",
    stack: ["Vue.js", "Bootstrap", "Express.js", "PostgreSQL", "Prisma"],
    problem: {
      en: "Warehouse staff tracked inventory in spreadsheets. Stock counts drifted from reality, and no one could trace who moved what, when.",
      id: "Staf gudang mencatat inventori di spreadsheet. Angka stok menyimpang dari kenyataan, dan tidak ada yang bisa melacak siapa memindahkan apa, kapan.",
    },
    process: {
      en: [
        "Gathered warehouse-flow requirements from operations staff, then modeled Master Data Inventory (items, categories, suppliers, thresholds).",
        "Designed the PostgreSQL schema with Prisma and built the Express.js REST API.",
        "Built the Vue.js + Bootstrap UI: dashboard, master data forms, and transaction approval screens.",
        "Implemented goods receipt, issue, and adjustment flows with user-stamped audit trails.",
      ],
      id: [
        "Mengumpulkan kebutuhan alur gudang dari staf operasional, lalu memodelkan Master Data Inventory (barang, kategori, supplier, batas stok).",
        "Merancang skema PostgreSQL dengan Prisma dan membangun REST API Express.js.",
        "Membangun UI Vue.js + Bootstrap: dashboard, form master data, dan layar persetujuan transaksi.",
        "Mengimplementasikan alur penerimaan, pengeluaran, dan penyesuaian barang dengan jejak audit per pengguna.",
      ],
    },
    outcome: {
      en: "Replaced spreadsheet tracking with a single system of record; every stock movement became attributable and queryable.",
      id: "Mengganti pencatatan spreadsheet dengan satu sistem of record; setiap pergerakan stok jadi dapat dilacak dan di-query.",
    },
    links: [
      { icon: "github", label: { en: "Frontend source", id: "Kode frontend" }, url: "https://github.com/teukuaditya/warehouse-management-frontend" },
      { icon: "github", label: { en: "Backend source", id: "Kode backend" }, url: "https://github.com/teukuaditya/warehouse-management-backend" },
    ],
  },
  {
    id: "hc-itops",
    category: "ba",
    featured: true,
    image: "/img/projects/doits.webp",
    imageAlt: { en: "DO ITs — IT operations dashboard login", id: "DO ITs — halaman login dashboard operasional IT" },
    title: { en: "HCMC & ITOPS Requirements Overhaul", id: "Pembenahan Requirements HCMC & ITOPS" },
    subtitle: { en: "Human Capital & IT Ops — 30+ modules (sanitized case)", id: "Human Capital & IT Ops — 30+ modul (studi kasus sanitasi)" },
    role: { en: "Business Analyst (Intern)", id: "Business Analyst (Intern)" },
    period: "Sep 2026 — Present",
    stack: ["BRD", "SRS", "UCD", "draw.io", "MS Word", "Test Cases"],
    problem: {
      en: "A 30+ module internal system (HR & IT operations dashboards) had drifted from its documentation: specs no longer matched real workflows, and testing had no baseline. *Mock case study — real details under NDA.*",
      id: "Sistem internal 30+ modul (dashboard HR & operasional IT) sudah menyimpang dari dokumentasinya: spesifikasi tidak lagi cocok dengan alur kerja nyata, dan testing tidak punya baseline. *Studi kasus mock — detail asli di bawah NDA.*",
    },
    process: {
      en: [
        "Mapped scope across 30+ modules: business processes, business rules, user roles, and open issues — compiled into a structured BRD.",
        "Reviewed and updated SRS and UCD to match actual workflows (Extra Work Claim, Medical Claim, Talent Acquisition, Employee, etc.).",
        "Built functional test cases from business rules; executed them and documented every discrepancy for the dev team.",
        "Validated allowance calculations (meal, attendance, transport) across multiple day-type scenarios and reported bugs.",
      ],
      id: [
        "Memetakan scope 30+ modul: proses bisnis, business rules, user roles, dan open issues — dikompilasi ke BRD terstruktur.",
        "Mereview dan memperbarui SRS serta UCD agar sesuai alur kerja aktual (Extra Work Claim, Medical Claim, Talent Acquisition, Employee, dll).",
        "Membuat test case fungsional dari business rules; mengeksekusinya dan mendokumentasikan setiap discrepancy untuk tim dev.",
        "Memvalidasi kalkulasi tunjangan (makan, kehadiran, transportasi) di berbagai skenario day-type dan melaporkan bug.",
      ],
    },
    outcome: {
      en: "Documentation became the single source of truth again — devs, testers, and business users now discuss the same version of the system.",
      id: "Dokumentasi kembali menjadi satu sumber kebenaran — dev, tester, dan user bisnis kini mendiskusikan versi sistem yang sama.",
    },
    links: [],
  },
  {
    id: "payroll-odoo",
    category: "ba",
    featured: true,
    title: { en: "Payroll System BRD (Odoo)", id: "BRD Sistem Payroll (Odoo)" },
    subtitle: { en: "As-Is/To-Be analysis for a planned Odoo rollout", id: "Analisis As-Is/To-Be untuk rencana rollout Odoo" },
    role: { en: "Business Analyst (Intern)", id: "Business Analyst (Intern)" },
    period: "2026",
    stack: ["BRD", "As-Is/To-Be", "draw.io", "Odoo"],
    problem: {
      en: "Payroll ran on manual calculations prone to error across day types, overtime, and statutory deductions — and the company planned to move to Odoo without a defined functional baseline. *Mock case study — sanitized.*",
      id: "Payroll dijalankan dengan kalkulasi manual yang rawan error lintas day type, lembur, dan potongan wajib — dan perusahaan berencana pindah ke Odoo tanpa baseline fungsional yang jelas. *Studi kasus mock — disanitasi.*",
    },
    process: {
      en: [
        "Documented the As-Is payroll process end to end, then designed the To-Be process with clear handoff points.",
        "Defined functional requirements per domain: tax, BPJS, overtime, leave, approval chains, and payslip layout.",
        "Produced As-Is/To-Be process diagrams (draw.io) as the negotiation baseline with the vendor/dev team.",
      ],
      id: [
        "Mendokumentasikan proses payroll As-Is end-to-end, lalu merancang proses To-Be dengan titik serah terima yang jelas.",
        "Mendefinisikan requirement fungsional per domain: pajak, BPJS, lembur, cuti, rantai approval, dan layout payslip.",
        "Menghasilkan diagram proses As-Is/To-Be (draw.io) sebagai baseline negosiasi dengan vendor/tim dev.",
      ],
    },
    outcome: {
      en: "A vendor-ready BRD the implementation team can build against — with acceptance criteria for tax, BPJS, and overtime logic.",
      id: "BRD siap-vendor yang bisa dipakai tim implementasi sebagai acuan — lengkap dengan kriteria penerimaan untuk logika pajak, BPJS, dan lembur.",
    },
    links: [],
  },
]

/**
 * Side projects pulled from public GitHub repos (real descriptions,
 * kept short — no invented details). Rendered as a compact strip.
 */
export const sideProjects = [
  {
    name: "SantuyChat",
    lang: "TypeScript",
    icon: "message",
    desc: {
      en: "Chat web app for your hangout crew.",
      id: "Website untuk chatting bersama teman tongkrongan.",
    },
    url: "https://github.com/teukuaditya/SantuyChat",
  },
  {
    name: "StayEase",
    lang: "Flutter (Dart)",
    icon: "layers",
    desc: {
      en: "Hotel booking mobile app built with Flutter.",
      id: "Aplikasi mobile pemesanan hotel dengan Flutter.",
    },
    url: "https://github.com/teukuaditya/StayEase",
  },
  {
    name: "TickTrack",
    lang: "Laravel (Blade)",
    icon: "clipboard",
    desc: {
      en: "Web app for tracking wifi-installation service tickets.",
      id: "Aplikasi web untuk pelacakan tiket usaha pemasangan wifi.",
    },
    url: "https://github.com/teukuaditya/TickTrack",
  },
  {
    name: "Projek-akhir-TBI",
    lang: "Python (Jupyter)",
    icon: "search",
    desc: {
      en: "News search system with text processing.",
      id: "Sistem pencarian berita.",
    },
    url: "https://github.com/teukuaditya/Projek-akhir-TBI",
  },
]
