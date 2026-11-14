/**
 * App entry: renders all sections from data, wires global behaviors.
 * On language change, every localized section re-renders.
 */
import "./styles/main.css"

import { onLangChange, setLang, getLang, t } from "./lib/i18n.js"
import { toggleTheme } from "./lib/theme.js"
import { initScrollChrome, refreshActiveSection } from "./lib/scroll.js"
import { observeReveals } from "./lib/reveal.js"
import { reducedMotion } from "./lib/dom.js"
import { toast } from "./lib/toast.js"

import * as navbar from "./components/navbar.js"
import * as hero from "./components/hero.js"
import * as about from "./components/about.js"
import * as experience from "./components/experience.js"
import * as projects from "./components/projects.js"
import * as workflow from "./components/workflow.js"
import * as documents from "./components/documents.js"
import * as skills from "./components/skills.js"
import * as certifications from "./components/certifications.js"
import * as github from "./components/github.js"
import * as contact from "./components/contact.js"
import * as footer from "./components/footer.js"
import * as palette from "./components/palette.js"
import * as printResume from "./components/print-resume.js"

// Localized sections — re-rendered on language change
const sections = [
  { mod: hero, id: "hero" },
  { mod: about, id: "about" },
  { mod: experience, id: "experience" },
  { mod: projects, id: "projects" },
  { mod: workflow, id: "workflow" },
  { mod: documents, id: "documents" },
  { mod: skills, id: "skills" },
  { mod: certifications, id: "certifications" },
  { mod: github, id: "github" },
  { mod: contact, id: "contact" },
]

function renderAll() {
  // Ensure containers exist inside <main>
  const main = document.getElementById("main")
  if (!main.children.length) {
    main.innerHTML = sections.map((s) => `<div id="${s.id}"></div>`).join("")
  }
  for (const s of sections) {
    s.mod.render()
    if (typeof s.mod.bind === "function") s.mod.bind()
  }
  // Localized chrome strings (skip-link, aria labels)
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const value = el.dataset.i18n.split(".").reduce((o, k) => (o ? o[k] : undefined), dictFor())
    if (typeof value === "string") el.textContent = value
  })
  document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
    const value = el.dataset.i18nAria.split(".").reduce((o, k) => (o ? o[k] : undefined), dictFor())
    if (typeof value === "string") el.setAttribute("aria-label", value)
  })
  observeReveals()
  refreshActiveSection()
}

import { dict } from "./data/i18n.js"
const dictFor = () => (getLang() === "id" ? dict.id : dict.en)

// Static shell pieces — rendered once (locale-independent) or re-run below
navbar.render()
navbar.bind()
palette.render()
palette.bind()
printResume.render()
renderAll()
footer.render()
footer.bind()
initScrollChrome()

// Global UI events (emitted by navbar components)
document.addEventListener("ui:toggle-theme", toggleTheme)
document.addEventListener("ui:toggle-lang", () => setLang(getLang() === "en" ? "id" : "en"))
document.addEventListener("ui:open-palette", () => palette.openPalette())

onLangChange(() => {
  navbar.render()
  navbar.bind()
  palette.render()
  palette.bind()
  printResume.render()
  footer.render()
  footer.bind()
  renderAll()
})

/* ---------------------------------- extras -------------------------------- */

// Cursor glow — desktop fine pointers only, disabled for reduced motion
const glow = document.getElementById("cursor-glow")
if (glow && matchMedia("(pointer: fine)").matches && !reducedMotion()) {
  document.body.classList.add("glow-on")
  window.addEventListener(
    "pointermove",
    (e) => {
      glow.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
    },
    { passive: true },
  )
}

// Easter egg: type "adit" anywhere (once per session)
{
  let buffer = ""
  window.addEventListener(
    "keydown",
    (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return
      buffer = (buffer + e.key).slice(-4).toLowerCase()
      if (buffer === "adit" && !sessionStorage.getItem("egg-found")) {
        sessionStorage.setItem("egg-found", "1")
        toast(t("misc.easterEgg"), "sparkles")
        document.querySelector("#header a span")?.classList.add("animate-spin-once")
      }
    },
    { passive: true },
  )
}
