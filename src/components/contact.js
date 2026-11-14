/** Contact: Formspree form + info column + copy-email with toast. */
import { profile } from "../data/profile.js"
import { icon } from "../lib/icons.js"
import { t } from "../lib/i18n.js"
import { esc } from "../lib/dom.js"
import { toast } from "../lib/toast.js"

/**
 * Formspree endpoint — https://formspree.io/f/xzerdkgl
 * (connected Nov 2026; submissions go straight to teukuaditya2003@gmail.com)
 */
const FORMSPREE_ID = "xzerdkgl"

export function render() {
  document.getElementById("contact").innerHTML = `
    <section id="contact" class="section">
      <div class="container-x">
        <p class="eyebrow reveal">${esc(t("contact.eyebrow"))}</p>
        <h2 class="h2 reveal" style="--reveal-delay:60ms">${esc(t("contact.title"))}</h2>
        <p class="section-intro reveal" style="--reveal-delay:120ms">${esc(t("contact.intro"))}</p>

        <div class="mt-12 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] [grid-template-columns:minmax(0,1fr)]">
          <!-- Info column -->
          <div class="reveal flex flex-col gap-4" style="--reveal-delay:180ms">
            <button id="copy-email" class="card spotlight flex items-center gap-4 p-5 text-left transition-colors hover:border-accent-400"
                    aria-label="${esc(t("contact.copyEmail"))}">
              <span class="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent-500/10 text-accent-400 dark:text-accent-300">
                ${icon("mail", "h-5 w-5")}
              </span>
              <div class="min-w-0">
                <p class="text-xs font-bold uppercase tracking-widest text-muted">${esc(t("contact.emailLabel"))}</p>
                <p class="truncate font-medium">${profile.email}</p>
              </div>
              ${icon("copy", "h-4 w-4 ml-auto shrink-0 text-muted")}
            </button>

            <a href="${profile.phoneHref}" class="card spotlight flex items-center gap-4 p-5 transition-colors hover:border-accent-400">
              <span class="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent-500/10 text-accent-400 dark:text-accent-300">
                ${icon("phone", "h-5 w-5")}
              </span>
              <div>
                <p class="text-xs font-bold uppercase tracking-widest text-muted">${esc(t("contact.phoneLabel"))}</p>
                <p class="font-medium">${profile.phone}</p>
              </div>
            </a>

            <div class="card spotlight flex items-center gap-4 p-5">
              <span class="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent-500/10 text-accent-400 dark:text-accent-300">
                ${icon("pin", "h-5 w-5")}
              </span>
              <div>
                <p class="text-xs font-bold uppercase tracking-widest text-muted">${esc(t("contact.locationLabel"))}</p>
                <p class="font-medium">${esc(profile.location.en)}</p>
              </div>
            </div>

            <div class="card flex items-center gap-4 p-5">
              <span class="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent-500/10 text-accent-400 dark:text-accent-300">
                ${icon("globe", "h-5 w-5")}
              </span>
              <div class="flex flex-wrap gap-2">
                <a href="${profile.github}" target="_blank" rel="noopener" class="btn-ghost px-3.5! py-2! text-sm">${icon("github", "h-4 w-4")} GitHub</a>
                <a href="${profile.linkedin}" target="_blank" rel="noopener" class="btn-ghost px-3.5! py-2! text-sm">${icon("linkedin", "h-4 w-4")} LinkedIn</a>
              </div>
            </div>
          </div>

          <!-- Form -->
          <form id="contact-form" class="reveal card p-7 sm:p-9" style="--reveal-delay:240ms" novalidate>
            <div class="grid gap-4 sm:grid-cols-2">
              <label class="block">
                <span class="mb-1.5 block text-xs font-bold uppercase tracking-widest text-muted">${esc(t("contact.name"))}</span>
                <input required name="name" type="text" class="input" placeholder="${esc(t("contact.namePh"))}" autocomplete="name" />
              </label>
              <label class="block">
                <span class="mb-1.5 block text-xs font-bold uppercase tracking-widest text-muted">${esc(t("contact.email"))}</span>
                <input required name="email" type="email" class="input" placeholder="${esc(t("contact.emailPh"))}" autocomplete="email" />
              </label>
            </div>
            <label class="mt-4 block">
              <span class="mb-1.5 block text-xs font-bold uppercase tracking-widest text-muted">${esc(t("contact.message"))}</span>
              <textarea required name="message" rows="5" class="input resize-y" placeholder="${esc(t("contact.messagePh"))}"></textarea>
            </label>
            <!-- Honeypot: bots fill this, humans never see it -->
            <input type="text" name="_gotcha" class="hidden" tabindex="-1" autocomplete="off" aria-hidden="true" />
            <p id="form-status" class="mt-3 min-h-5 text-sm" role="alert"></p>
            <button type="submit" class="btn-primary mt-2 w-full sm:w-auto">
              ${icon("send", "h-4 w-4")} <span data-send-label>${esc(t("contact.send"))}</span>
            </button>
          </form>
        </div>
      </div>
    </section>`
}

export function bind() {
  const copyBtn = document.getElementById("copy-email")
  copyBtn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      toast(t("contact.copied"), "copy")
    } catch {
      toast(profile.email, "mail")
    }
  })

  const form = document.getElementById("contact-form")
  form.addEventListener("submit", async (e) => {
    e.preventDefault()
    const status = document.getElementById("form-status")
    const label = form.querySelector("[data-send-label]")
    const sendBtn = form.querySelector('button[type="submit"]')

    if (!form.reportValidity()) return

    if (form.querySelector('[name="_gotcha"]').value) return // bot

    if (!FORMSPREE_ID) {
      // Graceful fallback until Formspree is connected
      status.textContent = t("contact.notConnected")
      const el = form.elements
      const body = encodeURIComponent(
        `${el.message.value}\n\n— ${el.name.value} (${el.email.value})`,
      )
      window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent("Portfolio contact")}&body=${body}`
      return
    }

    sendBtn.disabled = true
    label.textContent = t("contact.sending")
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      })
      if (res.ok) {
        status.textContent = t("contact.success")
        status.className = "mt-3 min-h-5 text-sm text-ok"
        form.reset()
      } else throw new Error("send failed")
    } catch {
      status.textContent = t("contact.error")
      status.className = "mt-3 min-h-5 text-sm text-danger"
    } finally {
      sendBtn.disabled = false
      label.textContent = t("contact.send")
    }
  })
}
