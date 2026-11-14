/** Experience: vertical timeline with expandable detail panels. */
import { experience } from "../data/experience.js"
import { icon } from "../lib/icons.js"
import { t, tx } from "../lib/i18n.js"
import { esc } from "../lib/dom.js"

export function render() {
  const items = experience
    .map(
      (job, i) => `
      <li class="reveal relative pl-10 sm:pl-14" style="--reveal-delay:${i * 90}ms">
        <span class="absolute left-[7px] top-1.5 grid h-4 w-4 place-items-center rounded-full border-2 border-accent-500 bg-bg"></span>
        <div class="card spotlight p-6 sm:p-7">
          <div class="flex flex-wrap items-baseline justify-between gap-2">
            <h3 class="font-display text-lg font-bold">${tx(job.role)}</h3>
            <span class="chip">${icon("calendar", "h-3.5 w-3.5")} ${job.period}</span>
          </div>
          <p class="mt-0.5 font-medium text-accent-400 dark:text-accent-300">${job.company}</p>
          <p class="mt-3 text-sm leading-relaxed text-muted">${tx(job.summary)}</p>

          <button class="exp-toggle mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent-400 dark:text-accent-300 hover:underline"
                  aria-expanded="false" aria-controls="exp-${job.id}">
            <span data-exp-label>${t("experience.showMore")}</span>
            <span data-exp-chevron>${icon("chevronDown", "h-4 w-4")}</span>
          </button>
          <div id="exp-${job.id}" class="exp-panel grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 [transition-timing-function:cubic-bezier(.16,1,.3,1)]">
            <div class="overflow-hidden">
              <ul class="mt-4 space-y-2.5 border-t border-line pt-4">
                ${tx(job.bullets)
                  .map(
                    (b) => `
                    <li class="flex gap-2.5 text-sm leading-relaxed text-muted">
                      ${icon("check", "h-4 w-4 mt-0.5 shrink-0 text-accent-400 dark:text-accent-300")} ${b}
                    </li>`,
                  )
                  .join("")}
              </ul>
            </div>
          </div>

          <div class="mt-5 flex flex-wrap gap-2">
            ${job.tags.map((tag) => `<span class="chip">${tag}</span>`).join("")}
          </div>
        </div>
      </li>`,
    )
    .join("")

  document.getElementById("experience").innerHTML = `
    <section id="experience" class="section">
      <div class="container-x">
        <p class="eyebrow reveal">${esc(t("experience.eyebrow"))}</p>
        <h2 class="h2 reveal" style="--reveal-delay:60ms">${esc(t("experience.title"))}</h2>
        <p class="section-intro reveal" style="--reveal-delay:120ms">${esc(t("experience.intro"))}</p>

        <ol class="relative mt-14 max-w-3xl space-y-10 before:absolute before:left-[15px] before:top-2 before:h-[calc(100%-1rem)] before:w-px before:bg-linear-to-b before:from-accent-500 before:via-accent-400 before:to-transparent before:opacity-35 sm:before:left-[23px]">
          ${items}
        </ol>
      </div>
    </section>`
}

export function bind() {
  document.querySelectorAll(".exp-toggle").forEach((btn) => {
    btn.addEventListener("click", () => {
      const panel = document.getElementById(btn.getAttribute("aria-controls"))
      const open = btn.getAttribute("aria-expanded") === "true"
      btn.setAttribute("aria-expanded", String(!open))
      panel.style.gridTemplateRows = open ? "0fr" : "1fr"
      btn.querySelector("[data-exp-label]").textContent = open
        ? t("experience.showMore")
        : t("experience.showLess")
      // Flip chevron
      btn.querySelector("[data-exp-chevron] svg").style.transform = open ? "" : "rotate(180deg)"
    })
  })
}
