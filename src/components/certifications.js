/** Certifications & organizations: compact link cards. */
import { certifications, organizations } from "../data/certifications.js"
import { icon } from "../lib/icons.js"
import { t, tx } from "../lib/i18n.js"
import { esc } from "../lib/dom.js"

export function render() {
  document.getElementById("certifications").innerHTML = `
    <section id="certifications" class="section">
      <div class="container-x">
        <p class="eyebrow reveal">${esc(t("certifications.eyebrow"))}</p>
        <h2 class="h2 reveal" style="--reveal-delay:60ms">${esc(t("certifications.title"))}</h2>

        <div class="mt-12 grid gap-8 lg:grid-cols-2">
          <div>
            <h3 class="reveal flex items-center gap-2 font-display text-sm font-bold uppercase tracking-widest text-muted">
              ${icon("award", "h-4 w-4 text-accent-400")} ${esc(t("certifications.certs"))}
            </h3>
            <div class="mt-5 grid gap-3">
              ${certifications
                .map((cert, i) => {
                  const inner = `
                    <span class="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent-500/10 text-accent-400 dark:text-accent-300">
                      ${icon(cert.icon, "h-4.5 w-4.5")}
                    </span>
                    <div class="min-w-0">
                      <p class="truncate font-display font-bold">${esc(cert.name)}</p>
                      <p class="text-sm text-muted">${esc(cert.issuer)}</p>
                    </div>
                    ${cert.url ? icon("external", "h-4 w-4 ml-auto shrink-0 text-muted") : ""}`
                  return cert.url
                    ? `<a href="${cert.url}" target="_blank" rel="noopener"
                         class="reveal card spotlight flex items-center gap-4 p-4 transition-colors hover:border-accent-400"
                         style="--reveal-delay:${i * 60}ms">${inner}</a>`
                    : `<div class="reveal card spotlight flex items-center gap-4 p-4" style="--reveal-delay:${i * 60}ms">${inner}</div>`
                })
                .join("")}
            </div>
          </div>

          <div>
            <h3 class="reveal flex items-center gap-2 font-display text-sm font-bold uppercase tracking-widest text-muted">
              ${icon("users", "h-4 w-4 text-accent-400")} ${esc(t("certifications.orgs"))}
            </h3>
            <div class="mt-5 grid gap-3">
              ${organizations
                .map((org, i) => {
                  const inner = `
                    <span class="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent-500/10 text-accent-400 dark:text-accent-300">
                      ${icon("users", "h-4.5 w-4.5")}
                    </span>
                    <div class="min-w-0">
                      <p class="truncate font-display font-bold">${esc(org.name)}</p>
                      <p class="text-sm text-muted">${esc(tx(org.role))}</p>
                    </div>
                    ${org.url ? icon("external", "h-4 w-4 ml-auto shrink-0 text-muted") : ""}`
                  return org.url
                    ? `<a href="${org.url}" target="_blank" rel="noopener"
                         class="reveal card spotlight flex items-center gap-4 p-4 transition-colors hover:border-accent-400"
                         style="--reveal-delay:${i * 60}ms">${inner}</a>`
                    : `<div class="reveal card spotlight flex items-center gap-4 p-4" style="--reveal-delay:${i * 60}ms">${inner}</div>`
                })
                .join("")}
            </div>
          </div>
        </div>
      </div>
    </section>`
}

export function bind() {}
