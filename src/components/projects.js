/** Projects: bento grid, filter tabs (All / BA / Fullstack), spotlight+tilt hover, case-study modal. */
import { projects, sideProjects } from "../data/projects.js"
import { icon } from "../lib/icons.js"
import { t, tx } from "../lib/i18n.js"
import { esc, qsa, reducedMotion } from "../lib/dom.js"

let activeFilter = "all"

const catLabel = (c) => t(`projects.filter${c === "ba" ? "Ba" : "Dev"}`)

export function render() {
  const tabs = [
    { id: "all", label: t("projects.filterAll"), count: projects.length },
    { id: "ba", label: t("projects.filterBa"), count: projects.filter((p) => p.category === "ba").length },
    { id: "dev", label: t("projects.filterDev"), count: projects.filter((p) => p.category === "dev").length },
  ]

  document.getElementById("projects").innerHTML = `
    <section id="projects" class="section">
      <div class="container-x">
        <p class="eyebrow reveal">${esc(t("projects.eyebrow"))}</p>
        <h2 class="h2 reveal" style="--reveal-delay:60ms">${esc(t("projects.title"))}</h2>
        <p class="section-intro reveal" style="--reveal-delay:120ms">${esc(t("projects.intro"))}</p>

        <div class="reveal mt-8 flex gap-2" role="tablist" aria-label="${esc(t("projects.eyebrow"))}" style="--reveal-delay:180ms">
          ${tabs
            .map(
              (tab) => `
              <button class="filter-tab rounded-full border px-4 py-2 font-display text-sm font-medium transition-colors
                             ${tab.id === activeFilter ? "border-accent-500 bg-accent-500/10 text-accent-600 dark:text-accent-300" : "border-line text-muted hover:border-line-strong hover:text-fg"}"
                      role="tab" aria-selected="${tab.id === activeFilter}" data-filter="${tab.id}">
                ${esc(tab.label)} <span class="ml-1 text-xs opacity-60">${tab.count}</span>
              </button>`,
            )
            .join("")}
        </div>

        <div id="project-grid" class="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
          ${cards()}
        </div>

        <!-- More builds: real public repos, kept honest & short -->
        <div class="reveal mt-12">
          <div class="flex items-baseline justify-between">
            <h3 class="font-display text-lg font-bold">${esc(t("projects.more"))}</h3>
            <a href="https://github.com/teukuaditya" target="_blank" rel="noopener"
               class="inline-flex items-center gap-1.5 text-sm font-medium text-accent-400 dark:text-accent-300 hover:underline">
              GitHub ${icon("external", "h-3.5 w-3.5")}
            </a>
          </div>
          <div class="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            ${sideProjects
              .map(
                (r, i) => `
                <a href="${r.url}" target="_blank" rel="noopener"
                   class="reveal card spotlight group p-5 transition-all hover:-translate-y-1 hover:border-accent-400"
                   style="--reveal-delay:${i * 60}ms">
                  <p class="flex items-center gap-2 font-display text-sm font-bold group-hover:text-accent-400 dark:group-hover:text-accent-300">
                    ${icon(r.icon, "h-4 w-4 text-accent-400 dark:text-accent-300")} ${esc(r.name)}
                  </p>
                  <p class="mt-2 text-sm leading-relaxed text-muted">${esc(tx(r.desc))}</p>
                  <p class="mt-3 flex items-center gap-1.5 text-xs text-muted">
                    <span class="h-2 w-2 rounded-full bg-accent-400"></span>${esc(r.lang)}
                    ${icon("external", "h-3 w-3 ml-auto opacity-0 transition-opacity group-hover:opacity-100")}
                  </p>
                </a>`,
              )
              .join("")}
          </div>
        </div>
      </div>
    </section>`
}

function cards() {
  return projects
    .map((p, i) => {
      const hidden = activeFilter !== "all" && p.category !== activeFilter
      return `
      <article class="project-card reveal card spotlight group relative cursor-pointer overflow-hidden p-0
                      sm:col-span-3 ${hidden ? "hidden" : ""}"
               style="--reveal-delay:${(i % 4) * 80}ms"
               data-category="${p.category}" data-project="${p.id}"
               tabindex="0" role="button" aria-haspopup="dialog"
               aria-label="${esc(title(p))} — ${esc(t("projects.caseStudy"))}">
        <div class="relative h-48 overflow-hidden bg-gradient-to-br
                    ${p.category === "ba" ? "from-accent-600/25 via-transparent to-accent-400/10" : "from-accent-400/20 via-transparent to-accent-700/25"}">
          ${p.image ? `
            <img src="${p.image}" alt="${esc(tx(p.imageAlt) || title(p))}"
                 loading="lazy" decoding="async"
                 class="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105" />
            <div class="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/60 via-transparent to-transparent"></div>
          ` : `
            <div class="absolute inset-0 grid place-items-center opacity-70">
              <span class="font-display text-7xl font-bold text-fg/10">${esc(String(title(p)).slice(0, 2).toUpperCase())}</span>
            </div>
            <span class="absolute bottom-3 right-4 text-[10px] uppercase tracking-widest text-muted/70">${esc(t("projects.screenshotNote"))}</span>
          `}
          <span class="absolute left-4 top-4 chip bg-bg/80! backdrop-blur-xs">${icon(p.category === "ba" ? "briefcase" : "code", "h-3.5 w-3.5")} ${esc(catLabel(p.category))}</span>
        </div>
        <div class="p-6">
          <h3 class="font-display text-xl font-bold tracking-tight group-hover:text-accent-400 dark:group-hover:text-accent-300">${esc(title(p))}</h3>
          <p class="mt-1 text-sm text-muted">${esc(tx(p.subtitle))} · ${esc(p.period)}</p>
          <p class="mt-3 line-clamp-2 text-sm leading-relaxed text-muted">${esc(tx(p.problem)).replace(/\s*\*[^*]+\*\s*$/, "")}</p>
          <div class="mt-4 flex flex-wrap gap-1.5">
            ${p.stack.slice(0, 4).map((s) => `<span class="chip py-0.5!">${esc(s)}</span>`).join("")}
            ${p.stack.length > 4 ? `<span class="chip py-0.5!">+${p.stack.length - 4}</span>` : ""}
          </div>
          <p class="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent-400 dark:text-accent-300">
            ${esc(t("projects.caseStudy"))} ${icon("arrowRight", "h-4 w-4 transition-transform group-hover:translate-x-1")}
          </p>
        </div>
      </article>`
    })
    .join("")
}

const title = (p) => (typeof p.title === "string" ? p.title : tx(p.title))

export function bind() {
  // Filter tabs
  document.querySelectorAll(".filter-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      activeFilter = tab.dataset.filter
      document.querySelectorAll(".filter-tab").forEach((b) => {
        const active = b === tab
        b.classList.toggle("border-accent-500", active)
        b.classList.toggle("bg-accent-500/10", active)
        b.classList.toggle("text-accent-600", active)
        b.classList.toggle("dark:text-accent-300", active)
        b.classList.toggle("border-line", !active)
        b.classList.toggle("text-muted", !active)
        b.setAttribute("aria-selected", String(active))
      })
      qsa(".project-card").forEach((card) => {
        card.classList.toggle("hidden", activeFilter !== "all" && card.dataset.category !== activeFilter)
      })
    })
  })

  // Open case-study modal (click or Enter/Space — keyboard accessible)
  qsa(".project-card").forEach((card) => {
    card.addEventListener("click", () => openProject(card.dataset.project))
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault()
        openProject(card.dataset.project)
      }
    })
    card.addEventListener("pointermove", spotlight)
  })
}

function spotlight(e) {
  if (reducedMotion()) return
  const rect = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`)
  e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`)
}

/** Populate + open the shared <dialog id="modal"> as a project case study. */
export function openProject(id) {
  const p = projects.find((x) => x.id === id)
  if (!p) return
  const modal = document.getElementById("modal")
  const links = (p.links || []).map((l) => ({ href: l.url, icon: l.icon || "github", label: tx(l.label) }))

  modal.innerHTML = `
    <div class="relative overflow-hidden rounded-t-2xl bg-gradient-to-br
                ${p.category === "ba" ? "from-accent-600/30" : "from-accent-400/20"} via-transparent to-transparent p-7 sm:p-9">
      <button class="absolute right-4 top-4 icon-btn border-transparent!" data-close-modal aria-label="${esc(t("projects.close"))}">
        ${icon("x", "h-4 w-4")}
      </button>
      <span class="chip">${icon(p.category === "ba" ? "briefcase" : "code", "h-3.5 w-3.5")} ${esc(p.category === "ba" ? t("projects.filterBa") : t("projects.filterDev"))}</span>
      <h3 class="mt-3 max-w-[85%] font-display text-2xl font-bold tracking-tight sm:text-3xl">${esc(title(p))}</h3>
      <p class="mt-1 text-muted">${esc(tx(p.subtitle))}</p>
    </div>

    <div class="overflow-y-auto p-7 sm:p-9" style="max-height:min(72vh,640px)">
      ${p.image ? `
        <div class="mb-6 overflow-hidden rounded-xl border border-line bg-surface/50 shadow-xs">
          <img src="${p.image}" alt="${esc(tx(p.imageAlt) || title(p))}"
               class="max-h-80 w-full object-cover object-top" />
        </div>
      ` : ""}
      <dl class="grid gap-4 sm:grid-cols-3">
        <div><dt class="text-xs font-bold uppercase tracking-widest text-muted">${esc(t("projects.role"))}</dt><dd class="mt-1 text-sm font-medium">${esc(tx(p.role))}</dd></div>
        <div><dt class="text-xs font-bold uppercase tracking-widest text-muted">Periode</dt><dd class="mt-1 text-sm font-medium">${esc(p.period)}</dd></div>
        <div><dt class="text-xs font-bold uppercase tracking-widest text-muted">${esc(t("projects.stack"))}</dt>
             <dd class="mt-1 flex flex-wrap gap-1.5">${p.stack.map((s) => `<span class="chip py-0.5!">${esc(s)}</span>`).join("")}</dd></div>
      </dl>

      <h4 class="mt-7 font-display text-sm font-bold uppercase tracking-widest text-accent-400 dark:text-accent-300">${esc(t("projects.problem"))}</h4>
      <p class="mt-2 text-sm leading-relaxed text-muted">${esc(tx(p.problem))}</p>

      <h4 class="mt-6 font-display text-sm font-bold uppercase tracking-widest text-accent-400 dark:text-accent-300">${esc(t("projects.process"))}</h4>
      <ol class="mt-3 space-y-2.5">
        ${tx(p.process)
          .map(
            (step, i) => `
            <li class="flex gap-3 text-sm leading-relaxed text-muted">
              <span class="grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-accent-500/10 font-display text-xs font-bold text-accent-400 dark:text-accent-300">${i + 1}</span>
              ${esc(step)}
            </li>`,
          )
          .join("")}
      </ol>

      <h4 class="mt-6 font-display text-sm font-bold uppercase tracking-widest text-accent-400 dark:text-accent-300">${esc(t("projects.outcome"))}</h4>
      <p class="mt-2 text-sm leading-relaxed text-muted">${esc(tx(p.outcome))}</p>

      <div class="mt-7 flex flex-wrap items-center gap-3 border-t border-line pt-6">
        ${links
          .map(
            (l) => `
            <a href="${l.href}" target="_blank" rel="noopener" class="btn-ghost py-2! text-sm">
              ${icon(l.icon, "h-4 w-4")} ${esc(l.label)}
            </a>`,
          )
          .join("")}
        ${!links.length ? `<p class="text-sm text-muted">${esc(t("projects.noLinks"))}</p>` : ""}
      </div>
      ${p.category === "ba" ? `<p class="mt-4 flex items-center gap-2 rounded-xl border border-warn/30 bg-warn/10 px-3.5 py-2.5 text-xs text-warn">${icon("briefcase", "h-4 w-4 shrink-0")} ${esc(t("projects.ndaNote"))}</p>` : ""}
    </div>`

  modal.showModal()
  bindModalClose()
}

function bindModalClose() {
  const modal = document.getElementById("modal")
  modal.querySelectorAll("[data-close-modal]").forEach((b) => b.addEventListener("click", () => modal.close()))
  // Click on backdrop closes (only when clicking outside the panel)
  modal.onclick = (e) => {
    if (e.target === modal) modal.close()
  }
}
