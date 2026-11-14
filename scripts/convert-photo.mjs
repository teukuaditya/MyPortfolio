/** Crop + resize the user's photo to an 800x800 WebP avatar via headless Chromium canvas. */
import { chromium } from "playwright"
import { writeFileSync } from "node:fs"

const SRC = "22SA11A175_Teuku Aditya, S.Kom..jpg"
const OUT = "public/img/teuku-aditya.webp"

const b = await chromium.launch()
const page = await b.newPage()
await page.goto("http://localhost:5173/")

// Serve the original through the dev server (public/ is the static root)
import { copyFileSync } from "node:fs"
copyFileSync(SRC, "public/img/_original.jpg")

const dataUrl = await page.evaluate(async () => {
  const img = new Image()
  img.src = "/img/_original.jpg"
  await new Promise((res, rej) => { img.onload = res; img.onerror = rej })
  // Square crop biased to the top so the face + suit are framed like a pas-foto
  const side = img.naturalWidth                      // 2622
  const cropY = Math.round((img.naturalHeight - side) * 0.06) // near the top
  const size = 800
  const c = document.createElement("canvas")
  c.width = size; c.height = size
  const ctx = c.getContext("2d")
  ctx.imageSmoothingQuality = "high"
  ctx.drawImage(img, 0, cropY, side, side, 0, 0, size, size)
  return c.toDataURL("image/webp", 0.85)
})

const base64 = dataUrl.split(",")[1]
writeFileSync(OUT, Buffer.from(base64, "base64"))
await b.close()
console.log("saved", OUT)
