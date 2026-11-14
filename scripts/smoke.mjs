/**
 * Real browser smoke test: loads the page in headless Chromium,
 * captures console errors + page errors, checks DOM state and clicks.
 * Usage: node scripts/smoke.mjs  (dev server must be running on :5173)
 */
import { chromium } from "playwright"

const URL = process.env.URL || "http://localhost:5173/"
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })

const errors = []
page.on("console", (m) => {
  if (["error", "warning"].includes(m.type())) errors.push(`[console.${m.type()}] ${m.text()}`)
})
page.on("pageerror", (e) => errors.push(`[pageerror] ${e.message}\n${(e.stack || "").split("\n").slice(0, 4).join("\n")}`))
page.on("requestfailed", (r) => errors.push(`[requestfailed] ${r.url()} — ${r.failure()?.errorText}`))

await page.goto(URL, { waitUntil: "networkidle" })
await page.waitForTimeout(1500)

const state = await page.evaluate(() => {
  const ids = ["hero", "about", "experience", "projects", "workflow", "documents", "skills", "certifications", "github", "contact"]
  return {
    title: document.title,
    mainChildren: document.getElementById("main")?.children.length ?? -1,
    sections: ids.map((id) => `#${id}:${document.getElementById(id)?.innerHTML.length ?? "MISSING"}`),
    navButtons: document.querySelectorAll("#header button").length,
    projectCards: document.querySelectorAll(".project-card").length,
    stepButtons: document.querySelectorAll(".step-btn").length,
    skillChips: document.querySelectorAll(".skill-chip").length,
    footer: !!document.querySelector("#footer footer"),
    paletteOpenable: typeof document.getElementById("palette")?.showModal === "function",
    bodyClasses: document.body.className,
    darkMode: document.documentElement.classList.contains("dark"),
    typedText: document.getElementById("typed")?.textContent,
  }
})
console.log("== page state ==")
for (const [k, v] of Object.entries(state)) console.log(`${k}: ${Array.isArray(v) ? v.join("  ") : v}`)

console.log("\n== interactions ==")
// theme toggle
await page.click("#theme-toggle")
console.log("theme toggle → dark =", await page.evaluate(() => document.documentElement.classList.contains("dark")))
await page.click("#theme-toggle")

// command palette
await page.keyboard.press("Control+k")
await page.waitForTimeout(300)
console.log("palette open =", await page.evaluate(() => document.getElementById("palette").open))
await page.keyboard.type("copy")
await page.keyboard.press("Enter")
await page.waitForTimeout(400)
console.log("toast shown =", await page.evaluate(() => document.querySelectorAll("#toasts > *").length > 0))

// project modal
await page.click(".project-card")
await page.waitForTimeout(400)
console.log("project modal open =", await page.evaluate(() => document.getElementById("modal").open))
console.log("modal heading =", await page.evaluate(() => document.querySelector("#modal h3")?.textContent?.trim()))
await page.keyboard.press("Escape")

// language toggle
await page.click("#lang-toggle")
await page.waitForTimeout(500)
console.log("lang after toggle =", await page.evaluate(() => document.documentElement.lang))
console.log("hero h1 =", (await page.evaluate(() => document.querySelector("#hero h1")?.textContent))?.trim().slice(0, 50))

// mobile viewport check
await page.setViewportSize({ width: 360, height: 780 })
await page.waitForTimeout(400)
const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
console.log("\n== responsive ==")
console.log("horizontal overflow @360px =", overflow, overflow > 2 ? "⚠ OVERFLOWS" : "ok")

console.log("\n== errors ==")
console.log(errors.length ? errors.slice(0, 12).join("\n---\n") : "(none)")

await browser.close()
