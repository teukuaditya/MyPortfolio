/**
 * Builds public/cv/teuku-aditya-cv.pdf from the site's print-résumé view
 * (same data files as the website → single source of truth).
 * Usage: node scripts/build-cv.mjs  (dev server must be running)
 */
import { chromium } from "playwright"

const b = await chromium.launch()
const p = await b.newPage()
await p.goto("http://localhost:5173/", { waitUntil: "networkidle" })
await p.waitForTimeout(1500) // let fonts load
await p.pdf({
  path: "public/cv/teuku-aditya-cv.pdf",
  format: "A4",
  printBackground: true,
  margin: { top: "14mm", bottom: "14mm", left: "14mm", right: "14mm" },
})
await b.close()
console.log("CV PDF written to public/cv/teuku-aditya-cv.pdf")
