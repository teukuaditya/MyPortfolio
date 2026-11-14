/**
 * Scroll chrome: progress bar, navbar hide/show on scroll direction,
 * active-section highlighting, and back-to-top visibility.
 */
import { qsa, reducedMotion } from "./dom.js"

let lastY = 0
let ticking = false

function onScroll() {
  if (ticking) return
  ticking = true
  requestAnimationFrame(() => {
    const y = window.scrollY
    const max = document.documentElement.scrollHeight - window.innerHeight

    // Progress bar
    const bar = document.getElementById("scroll-progress")
    if (bar) bar.style.width = `${max > 0 ? Math.min(100, (y / max) * 100) : 0}%`

    // Hide navbar on scroll down, reveal on scroll up
    const header = qs("#header nav")
    if (header && !document.body.classList.contains("menu-open")) {
      if (y > lastY && y > 140) header.classList.add("nav-hidden")
      else header.classList.remove("nav-hidden")
    }

    // Back to top
    const top = document.getElementById("back-to-top")
    if (top) {
      top.classList.toggle("hidden", y < 600)
      top.classList.toggle("flex", y >= 600)
    }

    lastY = y
    ticking = false
  })
}

const qs = (s, r = document) => r.querySelector(s)

/** Highlight the nav link matching the section in view. */
let sectionIO = null

function initActiveSection() {
  if (typeof IntersectionObserver === "undefined") return
  sectionIO?.disconnect()
  const links = qsa("[data-nav-link]")
  const map = new Map()
  links.forEach((l) => {
    const id = (l.getAttribute("href") || "").slice(1)
    const section = document.getElementById(id)
    if (section) map.set(section, l)
  })

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const link = map.get(entry.target)
        if (!link) continue
        if (entry.isIntersecting) {
          links.forEach((l) => l.removeAttribute("aria-current"))
          link.setAttribute("aria-current", "true")
        }
      }
    },
    // A narrow band around the upper-middle of the viewport = "current section"
    { rootMargin: "-20% 0px -70% 0px", threshold: 0 },
  )
  sectionIO = io
  map.forEach((_, section) => io.observe(section))
}

export function initScrollChrome() {
  window.addEventListener("scroll", onScroll, { passive: true })
  if (!reducedMotion()) initActiveSection()
  onScroll()
}

/** Re-bind active-section observers after DOM re-render (language switch). */
export function refreshActiveSection() {
  if (!reducedMotion()) initActiveSection()
}
