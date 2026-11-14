/** "How I work" — interactive BA workflow stepper. */
import { workflowSteps } from "../data/workflow.js"
import { icon } from "../lib/icons.js"
import { t, tx } from "../lib/i18n.js"
import { esc } from "../lib/dom.js"

let active = 0

export function render() {
  document.getElementById("workflow").innerHTML = `
    <section id="workflow" class="section">
      <div class="container-x">
        <p class="eyebrow reveal">${esc(t("workflow.eyebrow"))}</p>
        <h2 class="h2 reveal" style="--reveal-delay:60ms">${esc(t("workflow.title"))}</h2>
        <p class="section-intro reveal" style="--reveal-delay:120ms">${esc(t("workflow.intro"))}</p>

        <div class="reveal mt-14" style="--reveal-delay:180ms">
          <!-- Stepper rail -->
          <ol class="stepper-track relative flex justify-between gap-2" id="stepper"
              style="--progress:0%" role="tablist" aria-label="${esc(t("workflow.eyebrow"))}">
            <span class="absolute left-0 top-1/2 hidden h-px w-full -translate-y-1/2 bg-line-strong sm:block" aria-hidden="true"></span>
            ${workflowSteps
              .map(
                (step, i) => `
                <li class="relative z-10 flex flex-1 flex-col items-center sm:flex-none">
                  <button role="tab" aria-selected="${i === active}" data-step="${i}"
                          class="step-btn grid h-11 w-11 place-items-center rounded-full border-2 transition-all duration-300
                                 ${i === active ? "border-accent-500 bg-accent-500 text-white shadow-[0_8px_20px_-8px_rgb(79_70_229_/_0.7)]" : "border-line-strong bg-surface text-muted hover:border-accent-400 hover:text-accent-400"}"
                          aria-label="${esc(step.title.en)}">
                    ${icon(step.icon, "h-4.5 w-4.5")}
                  </button>
                  <span class="mt-2 hidden text-center font-display text-xs font-medium sm:block ${i === active ? "text-fg" : "text-muted"}"
                        data-step-label>${esc(tx(step.title))}</span>
                </li>`,
              )
              .join("")}
          </ol>

          <!-- Detail panel -->
          <div id="step-detail" class="card mt-8 p-7 sm:p-9">
            ${detail()}
          </div>
        </div>
      </div>
    </section>`
}

function detail() {
  const step = workflowSteps[active]
  return `
    <div class="grid gap-6 sm:grid-cols-[auto_1fr] sm:items-start">
      <span class="hidden h-12 w-12 place-items-center rounded-xl bg-accent-500/10 text-accent-400 dark:text-accent-300 sm:grid">
        ${icon(step.icon, "h-5.5 w-5.5")}
      </span>
      <div>
        <p class="text-xs font-bold uppercase tracking-widest text-muted">Step ${active + 1} / ${workflowSteps.length}</p>
        <h3 class="mt-1 font-display text-2xl font-bold">${esc(tx(step.title))}</h3>
        <p class="mt-3 max-w-2xl leading-relaxed text-muted">${esc(tx(step.desc))}</p>
        <p class="mt-5 inline-flex items-center gap-2 rounded-xl border border-accent-500/30 bg-accent-500/10 px-3.5 py-2 text-sm font-medium text-accent-600 dark:text-accent-300">
          ${icon("file", "h-4 w-4")} ${esc(t("workflow.deliverable"))}: ${esc(tx(step.deliverable))}
        </p>
      </div>
    </div>`
}

export function bind() {
  const rail = document.getElementById("stepper")
  if (!rail) return
  rail.querySelectorAll(".step-btn").forEach((btn) => {
    btn.addEventListener("click", () => selectStep(Number(btn.dataset.step)))
    btn.addEventListener("keydown", (e) => {
      const dir = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0
      if (!dir) return
      e.preventDefault()
      const next = (active + dir + workflowSteps.length) % workflowSteps.length
      selectStep(next)
      rail.querySelector(`[data-step="${next}"]`).focus()
    })
  })
  paint()
}

function selectStep(i) {
  if (i === active) return
  active = i
  document.getElementById("step-detail").innerHTML = detail()
  paint()
}

function paint() {
  const rail = document.getElementById("stepper")
  rail.querySelectorAll(".step-btn").forEach((btn, i) => {
    const on = i === active
    btn.setAttribute("aria-selected", String(on))
    btn.className = `step-btn grid h-11 w-11 place-items-center rounded-full border-2 transition-all duration-300 ${
      on
        ? "border-accent-500 bg-accent-500 text-white shadow-[0_8px_20px_-8px_rgb(79_70_229_/_0.7)]"
        : "border-line-strong bg-surface text-muted hover:border-accent-400 hover:text-accent-400"
    }`
  })
  rail.querySelectorAll("[data-step-label]").forEach((label, i) => {
    label.className = `mt-2 hidden text-center font-display text-xs font-medium sm:block ${i === active ? "text-fg" : "text-muted"}`
  })
  rail.style.setProperty("--progress", `${(active / (workflowSteps.length - 1)) * 100}%`)
}
