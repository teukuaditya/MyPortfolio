/**
 * Optimizes project screenshots: PNG originals (src/assets/projects/) →
 * 1200px-wide WebP in public/img/projects/ via headless Chromium canvas.
 * Usage: node scripts/convert-screenshots.mjs  (dev server must be running)
 */
import { chromium } from "playwright"
import { copyFileSync, unlinkSync, writeFileSync, readdirSync } from "node:fs"

const SRC_DIR = "src/assets/projects"
const TMP = "public/img/_tmp"

const files = readdirSync(SRC_DIR).filter((f) => f.endsWith(".png"))
if (!files.length) {
  console.log("no PNGs found in", SRC_DIR)
  process.exit(0)
}

/** filename → safe temp filename (no spaces) */
const f_toSafe = new Map(files.map((f) => [f, f.replace(/[^a-zA-Z0-9.-]+/g, "-")]))

copyFileSync(SRC_DIR + "/" + files[0], TMP + ".jpg") // warm-up check that public/ is served
unlinkSync(TMP + ".jpg")
files.forEach((f) => {
  const safe = f.replace(/[^a-zA-Z0-9.-]+/g, "-")
  copyFileSync(`${SRC_DIR}/${f}`, `public/img/_tmp_${safe}`)
  f_toSafe.set(f, safe)
})

const b = await chromium.launch()
const page = await b.newPage()
await page.goto("http://localhost:5173/", { waitUntil: "networkidle" })

try {
  for (const f of files) {
    const safe = f_toSafe.get(f)
    const name = f.replace(/\.png$/i, "").toLowerCase().replace(/[^a-z0-9]+/g, "-")
    const dataUrl = await page.evaluate(async (file) => {
      const img = new Image()
      img.src = `/img/_tmp_${file}`
      await new Promise((res, rej) => { img.onload = res; img.onerror = rej })
      const width = 1200
      const height = Math.round((img.naturalHeight / img.naturalWidth) * width)
      const c = document.createElement("canvas")
      c.width = width
      c.height = height
      const ctx = c.getContext("2d")
      ctx.imageSmoothingQuality = "high"
      ctx.drawImage(img, 0, 0, width, height)
      return c.toDataURL("image/webp", 0.82)
    }, safe)

    writeFileSync(`public/img/projects/${name}.webp`, Buffer.from(dataUrl.split(",")[1], "base64"))
    console.log(`converted ${f} → public/img/projects/${name}.webp`)
  }
} finally {
  await b.close()
  files.forEach((f) => {
    try { unlinkSync(`public/img/_tmp_${f_toSafe.get(f)}`) } catch {}
  })
}
console.log("done")
