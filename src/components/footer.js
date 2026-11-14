/** Footer + floating back-to-top. */
import { profile } from "../data/profile.js"
import { icon } from "../lib/icons.js"
import { t } from "../lib/i18n.js"
import { esc } from "../lib/dom.js"

export function render() {
  document.getElementById("footer").innerHTML = `
    <footer class="border-t border-line">
      <div class="container-x flex flex-col items-center justify-between gap-6 py-10 sm:flex-row">
        <div class="text-center sm:text-left">
          <p class="font-display font-bold">Teuku<span class="text-accent-400 dark:text-accent-300">.</span></p>
          <p class="mt-1 text-sm text-muted">${esc(t("footer.tagline"))}</p>
          <p class="mt-0.5 text-xs text-muted/70">${esc(t("footer.built"))}</p>
        </div>
        <div class="flex items-center gap-2">
          <button id="print-resume-btn" class="btn-ghost py-2! text-sm">
            ${icon("printer", "h-4 w-4")} ${esc(t("footer.print"))}
          </button>
          <a href="mailto:${profile.email}" class="icon-btn" aria-label="Email">${icon("mail", "h-4 w-4")}</a>
          <a href="${profile.github}" target="_blank" rel="noopener" class="icon-btn" aria-label="GitHub">${icon("github", "h-4 w-4")}</a>
          <a href="${profile.linkedin}" target="_blank" rel="noopener" class="icon-btn" aria-label="LinkedIn">${icon("linkedin", "h-4 w-4")}</a>
        </div>
      </div>
    </footer>`
}

export function bind() {
  const top = document.getElementById("back-to-top")
  top.innerHTML = icon("arrowUp", "h-4.5 w-4.5")
  top.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }))
  document.getElementById("print-resume-btn").addEventListener("click", () => window.print())
}
