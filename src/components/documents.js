/** Documents showcase: sample artifact cards → shared modal viewer. Mock data only. */
import { documents, disclaimer } from "../data/documents.js"
import { icon } from "../lib/icons.js"
import { t, tx } from "../lib/i18n.js"
import { esc } from "../lib/dom.js"

export function render() {
  document.getElementById("documents").innerHTML = `
    <section id="documents" class="section">
      <div class="container-x">
        <p class="eyebrow reveal">${esc(t("documents.eyebrow"))}</p>
        <h2 class="h2 reveal" style="--reveal-delay:60ms">${esc(t("documents.title"))}</h2>
        <p class="section-intro reveal" style="--reveal-delay:120ms">${esc(t("documents.intro"))}</p>

        <p class="reveal mt-6 flex items-start gap-2.5 rounded-xl border border-warn/30 bg-warn/10 px-4 py-3 text-sm text-warn max-w-2xl" style="--reveal-delay:160ms">
          ${icon("briefcase", "h-4 w-4 shrink-0 mt-0.5")} ${esc(t("documents.disclaimer"))}
        </p>

        <div class="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          ${documents
            .map(
              (doc, i) => `
              <button class="doc-card reveal card spotlight group flex flex-col items-start p-6 text-left transition-transform hover:-translate-y-1"
                      style="--reveal-delay:${i * 80}ms" data-doc="${doc.id}"
                      aria-haspopup="dialog" aria-label="${esc(doc.title)}">
                <span class="grid h-11 w-11 place-items-center rounded-xl bg-accent-500/10 text-accent-400 dark:text-accent-300">
                  ${icon(doc.icon, "h-5 w-5")}
                </span>
                <h3 class="mt-4 font-display text-lg font-bold">${esc(doc.title)}</h3>
                <p class="mt-1.5 flex-1 text-sm leading-relaxed text-muted">${esc(tx(doc.desc))}</p>
                <span class="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent-400 dark:text-accent-300">
                  ${esc(t("documents.view"))} ${icon("arrowRight", "h-4 w-4 transition-transform group-hover:translate-x-1")}
                </span>
              </button>`,
            )
            .join("")}
        </div>
      </div>
    </section>`
}

export function bind() {
  document.querySelectorAll(".doc-card").forEach((card) => {
    card.addEventListener("click", () => openDocument(card.dataset.doc))
  })
}

function openDocument(id) {
  const doc = documents.find((d) => d.id === id)
  if (!doc) return
  const modal = document.getElementById("modal")
  modal.innerHTML = `
    <div class="flex items-start justify-between gap-4 border-b border-line p-6 sm:px-8">
      <div>
        <span class="chip">${icon(doc.icon, "h-3.5 w-3.5")} ${esc(doc.title)}</span>
        <h3 class="mt-2 font-display text-xl font-bold">${esc(doc.title)} <span class="text-muted">— sample</span></h3>
      </div>
      <button class="icon-btn shrink-0" data-close-modal aria-label="${esc(t("documents.close"))}">${icon("x", "h-4 w-4")}</button>
    </div>
    <div class="doc-view overflow-y-auto p-6 sm:px-8" style="max-height:min(72vh,640px)">
      <p class="mb-4 rounded-lg border border-warn/30 bg-warn/10 px-3 py-2 text-xs text-warn">${esc(disclaimer.en)}</p>
      ${doc.html}
    </div>`
  modal.showModal()
  modal.querySelectorAll("[data-close-modal]").forEach((b) => b.addEventListener("click", () => modal.close()))
  modal.onclick = (e) => {
    if (e.target === modal) modal.close()
  }
}
