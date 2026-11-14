/**
 * Documents showcase — sample artifacts with MOCK / SANITIZED data only.
 * No real internal company data (NDA). Every artifact carries a disclaimer.
 */
export const disclaimer = {
  en: "All artifacts below use mock data. No real internal company data is shown (NDA).",
  id: "Semua artefak di bawah memakai data mock. Tidak ada data internal perusahaan yang asli (NDA).",
}

export const documents = [
  {
    id: "brd",
    icon: "file",
    title: "BRD Excerpt",
    desc: {
      en: "Scope, business rules & roles for a mock module.",
      id: "Scope, business rules & role untuk modul mock.",
    },
    html: `
      <h4>Module</h4>
      <p>Employee Data Management — <em>(mock module, illustrative)</em></p>
      <h4>Objective</h4>
      <p>Centralize employee master data so HR, payroll, and IT operations read from a single source of truth.</p>
      <h4>In Scope</h4>
      <p>Employee profile CRUD, organizational unit assignment, employment status, document attachments.</p>
      <h4>Out of Scope</h4>
      <p>Payroll calculation, recruitment, performance review.</p>
      <h4>Business Rules</h4>
      <ol>
        <li>BR-01: Employee ID is system-generated, immutable, and unique per legal entity.</li>
        <li>BR-02: An employee may have exactly one active employment status at any time.</li>
        <li>BR-03: Deletion is soft-delete only; historical records must remain queryable for 5 years.</li>
      </ol>
      <h4>Roles &amp; Access</h4>
      <table>
        <tr><th>Role</th><th>View</th><th>Create</th><th>Edit</th><th>Deactivate</th></tr>
        <tr><td>HR Admin</td><td>✓</td><td>✓</td><td>✓</td><td>✓</td></tr>
        <tr><td>Supervisor</td><td>✓ (own unit)</td><td>—</td><td>—</td><td>—</td></tr>
        <tr><td>Employee</td><td>✓ (own record)</td><td>—</td><td>—</td><td>—</td></tr>
      </table>`,
  },
  {
    id: "ucd",
    icon: "layers",
    title: "Use Case Diagram",
    desc: {
      en: "Actor/system interactions for the mock module.",
      id: "Interaksi aktor/sistem untuk modul mock.",
    },
    html: `
      <svg viewBox="0 0 560 300" role="img" aria-label="Mock use case diagram: HR Admin and Employee interact with an Employee Data system" class="w-full">
        <g fill="none" stroke="currentColor" stroke-width="1.4">
          <!-- system boundary -->
          <rect x="130" y="20" width="300" height="260" rx="10" stroke-dasharray="6 4"/>
          <text x="280" y="42" text-anchor="middle" font-size="12" fill="currentColor" stroke="none" font-weight="600">Employee Data System (mock)</text>
          <!-- use cases -->
          <ellipse cx="280" cy="90" rx="95" ry="24"/><text x="280" y="94" text-anchor="middle" font-size="11" fill="currentColor" stroke="none">Manage Employees</text>
          <ellipse cx="280" cy="160" rx="95" ry="24"/><text x="280" y="164" text-anchor="middle" font-size="11" fill="currentColor" stroke="none">View Own Profile</text>
          <ellipse cx="280" cy="230" rx="95" ry="24"/><text x="280" y="234" text-anchor="middle" font-size="11" fill="currentColor" stroke="none">Deactivate Employee</text>
          <!-- actors -->
          <circle cx="50" cy="115" r="14"/><line x1="50" y1="129" x2="50" y2="165"/><line x1="32" y1="145" x2="68" y2="145"/><line x1="50" y1="165" x2="36" y2="195"/><line x1="50" y1="165" x2="64" y2="195"/>
          <text x="50" y="215" text-anchor="middle" font-size="11" fill="currentColor" stroke="none">HR Admin</text>
          <circle cx="510" cy="160" r="14"/><line x1="510" y1="174" x2="510" y2="210"/><line x1="492" y1="190" x2="528" y2="190"/><line x1="510" y1="210" x2="496" y2="240"/><line x1="510" y1="210" x2="524" y2="240"/>
          <text x="510" y="258" text-anchor="middle" font-size="11" fill="currentColor" stroke="none">Employee</text>
          <!-- associations -->
          <line x1="68" y1="115" x2="185" y2="90"/><line x1="68" y1="128" x2="185" y2="225"/>
          <line x1="492" y1="160" x2="375" y2="160"/>
          <!-- extends -->
          <line x1="280" y1="114" x2="280" y2="206" stroke-dasharray="4 4"/>
          <text x="290" y="168" font-size="10" fill="currentColor" stroke="none">«extend»</text>
        </g>
      </svg>`,
  },
  {
    id: "flow",
    icon: "git",
    title: "As-Is / To-Be Flow",
    desc: {
      en: "Process transformation, before and after.",
      id: "Transformasi proses, sebelum dan sesudah.",
    },
    html: `
      <div class="grid gap-6 sm:grid-cols-2">
        <div>
          <h4 class="text-danger!">As-Is (manual)</h4>
          <div class="flex flex-col items-center gap-1.5">
            ${flowBox("Attendance paper sheets")}
            ${arrow()}
            ${flowBox("Supervisor recounts by hand")}
            ${arrow()}
            ${flowBox("Allowance typed into spreadsheet")}
            ${arrow()}
            ${flowBox("Errors found after payday", true)}
          </div>
        </div>
        <div>
          <h4 class="text-ok!">To-Be (system)</h4>
          <div class="flex flex-col items-center gap-1.5">
            ${flowBox("Device / app check-in log")}
            ${arrow()}
            ${flowBox("Rules engine computes allowances")}
            ${arrow()}
            ${flowBox("Dashboard review + approval")}
            ${arrow()}
            ${flowBox("Discrepancy flagged pre-payroll", false, true)}
          </div>
        </div>
      </div>`,
  },
  {
    id: "testcase",
    icon: "clipboard",
    title: "Test Case Table",
    desc: {
      en: "Functional test cases derived from business rules.",
      id: "Test case fungsional yang diturunkan dari business rules.",
    },
    html: `
      <table>
        <thead>
          <tr><th>ID</th><th>Scenario</th><th>Input</th><th>Expected</th><th>Status</th></tr>
        </thead>
        <tbody>
          <tr><td>TC-001</td><td>Meal allowance on a normal workday</td><td>Day type: Normal, check-in 08:00</td><td>Allowance granted at full rate</td><td class="text-ok">Pass</td></tr>
          <tr><td>TC-002</td><td>No meal allowance on non-working day</td><td>Day type: Holiday</td><td>Allowance = 0, reason logged</td><td class="text-ok">Pass</td></tr>
          <tr><td>TC-003</td><td>Transport allowance on half-day</td><td>Day type: Half-day</td><td>Allowance at 50% rate</td><td class="text-warn">Defect #1247</td></tr>
          <tr><td>TC-004</td><td>Late check-in within grace period</td><td>Check-in 09:12, grace 15 min</td><td>No deduction, status “Late-in grace”</td><td class="text-ok">Pass</td></tr>
          <tr><td>TC-005</td><td>Attendance edit after approval</td><td>Edit approved record</td><td>Re-approval required, audit trail kept</td><td class="text-warn">Defect #1253</td></tr>
        </tbody>
      </table>`,
  },
]

function flowBox(text, danger = false, ok = false) {
  const tone = danger ? "border-danger/40 text-danger" : ok ? "border-ok/40 text-ok" : "border-line text-fg"
  return `<div class="w-full max-w-[220px] rounded-lg border ${tone} bg-elevated px-3 py-2 text-center text-xs font-medium">${text}</div>`
}

function arrow() {
  return `<span class="text-muted" aria-hidden="true">↓</span>`
}
