/** Skills: filterable chips (no progress bars). */
import { allSkills, skillGroups } from "../data/skills.js"
import { t, tx } from "../lib/i18n.js"
import { esc } from "../lib/dom.js"

let active = "all"

export function render() {
  document.getElementById("skills").innerHTML = `
    <section id="skills" class="section">
      <div class="container-x">
        <p class="eyebrow reveal">${esc(t("skills.eyebrow"))}</p>
        <h2 class="h2 reveal" style="--reveal-delay:60ms">${esc(t("skills.title"))}</h2>
        <p class="section-intro reveal" style="--reveal-delay:120ms">${esc(t("skills.intro"))}</p>

        <div class="reveal mt-8 flex flex-wrap gap-2" style="--reveal-delay:180ms">
          <button class="skill-tab rounded-full border px-4 py-2 font-display text-sm font-medium transition-colors
                         ${active === "all" ? "border-accent-500 bg-accent-500/10 text-accent-600 dark:text-accent-300" : "border-line text-muted hover:border-line-strong hover:text-fg"}"
                  data-skill-filter="all">${esc(t("skills.all"))}</button>
          ${skillGroups
            .map(
              (g) => `
              <button class="skill-tab rounded-full border px-4 py-2 font-display text-sm font-medium transition-colors
                             ${active === g.id ? "border-accent-500 bg-accent-500/10 text-accent-600 dark:text-accent-300" : "border-line text-muted hover:border-line-strong hover:text-fg"}"
                      data-skill-filter="${g.id}">${esc(tx(g.label))}</button>`,
            )
            .join("")}
        </div>

        <div id="skill-chips" class="mt-8 flex flex-wrap gap-2.5">
          ${chips()}
        </div>
      </div>
    </section>`
}

function chips() {
  return allSkills
    .filter((s) => active === "all" || s.group === active)
    .map(
      (s) => `
      <span class="skill-chip group inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2
                   text-sm font-medium text-fg transition-all hover:-translate-y-0.5 hover:border-accent-400 hover:text-accent-400 dark:hover:text-accent-300 reveal is-visible">
        <span class="h-1.5 w-1.5 rounded-full bg-accent-400"></span>${esc(s.name)}
      </span>`,
    )
    .join("")
}

export function bind() {
  document.querySelectorAll(".skill-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      active = tab.dataset.skillFilter
      document.querySelectorAll(".skill-tab").forEach((b) => {
        const on = b === tab
        b.classList.toggle("border-accent-500", on)
        b.classList.toggle("bg-accent-500/10", on)
        b.classList.toggle("text-accent-600", on)
        b.classList.toggle("dark:text-accent-300", on)
        b.classList.toggle("border-line", !on)
        b.classList.toggle("text-muted", !on)
      })
      document.getElementById("skill-chips").innerHTML = chips()
    })
  })
}
