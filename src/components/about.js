/** About: story, education card, currently-learning chips, animated stat counters. */
import { profile } from "../data/profile.js"
import { icon } from "../lib/icons.js"
import { t, lang } from "../lib/i18n.js"
import { esc, qs, reducedMotion } from "../lib/dom.js"

let countersDone = false

export function render() {
  document.getElementById("about").innerHTML = `
    <section id="about" class="section">
      <div class="container-x">
        <p class="eyebrow reveal">${esc(t("about.eyebrow"))}</p>
        <h2 class="h2 reveal" style="--reveal-delay:60ms">${esc(t("about.title"))}</h2>

        <div class="mt-12 grid gap-6 lg:grid-cols-2">
          <!-- Story + learning -->
          <div class="card reveal flex flex-col justify-between gap-6 p-7 sm:p-9" style="--reveal-delay:120ms">
            <div class="space-y-4 text-muted leading-relaxed">
              <p>${esc(t("about.p1"))}</p>
              <p>${esc(t("about.p2"))}</p>
            </div>
            <div>
              <p class="mb-2.5 flex items-center gap-2 font-display text-xs font-bold uppercase tracking-widest text-accent-400 dark:text-accent-300">
                ${icon("zap", "h-3.5 w-3.5")} ${esc(t("about.learningTitle"))}
              </p>
              <div class="flex flex-wrap gap-2">
                ${profile.currentlyLearning.map((s) => `<span class="chip text-fg!">${s}</span>`).join("")}
              </div>
            </div>
          </div>

          <!-- Education + stats bento -->
          <div class="grid gap-6">
            <div class="card reveal flex items-center gap-5 p-6" style="--reveal-delay:180ms">
              <span class="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-accent-500/10 text-accent-400 dark:text-accent-300">
                ${icon("terminal", "h-5 w-5")}
              </span>
              <div>
                <p class="text-xs font-bold uppercase tracking-widest text-muted">${esc(t("about.eduTitle"))}</p>
                <p class="mt-0.5 font-display font-bold">${esc(profile.education.degree[lang])}</p>
                <p class="text-sm text-muted">${esc(profile.education.school)} · ${esc(profile.education.period)} · GPA ${esc(profile.education.gpa)}</p>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-6 sm:grid-cols-4 lg:grid-cols-2">
              ${profile.stats
                .map(
                  (s, i) => `
                  <div class="card reveal p-5" style="--reveal-delay:${240 + i * 60}ms">
                    <p class="font-display text-3xl font-bold text-gradient">
                      <span data-count="${s.value}" data-decimals="${s.decimals}">0</span>${s.suffix}
                    </p>
                    <p class="mt-1 text-xs font-medium text-muted">${esc(s.label[lang])}</p>
                  </div>`,
                )
                .join("")}
            </div>
          </div>
        </div>
      </div>
    </section>`
  countersDone = false
}

export function bind() {
  const counters = document.querySelectorAll("[data-count]")
  if (!counters.length) return

  const animate = (el) => {
    const value = parseFloat(el.dataset.count)
    const decimals = parseInt(el.dataset.decimals || "0", 10)
    if (reducedMotion()) {
      el.textContent = value.toFixed(decimals)
      return
    }
    const dur = 1200
    const start = performance.now()
    const tick = (now) => {
      const p = Math.min(1, (now - start) / dur)
      // easeOutExpo
      const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p)
      el.textContent = (value * eased).toFixed(decimals)
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }

  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting && !countersDone) {
          countersDone = true
          counters.forEach(animate)
          io.disconnect()
        }
      }
    },
    { threshold: 0.4 },
  )
  const statsBlock = qs("#about .grid.grid-cols-2") || counters[0]
  io.observe(statsBlock)
}
