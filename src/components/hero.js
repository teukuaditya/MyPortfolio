/** Hero: dual positioning headline, typing effect, CTAs, availability badge. */
import { profile } from "../data/profile.js"
import { icon } from "../lib/icons.js"
import { t, lang } from "../lib/i18n.js"
import { esc, reducedMotion } from "../lib/dom.js"

let typeTimer = null

export function render() {
  document.getElementById("hero").innerHTML = `
    <section id="home" class="relative flex min-h-[92svh] items-center overflow-hidden">
      <div class="container-x grid items-center gap-14 py-16 lg:grid-cols-[1.15fr_0.85fr] lg:py-0">

        <div>
          <p class="reveal chip border-ok/30! text-ok!" style="--reveal-delay:0ms">
            <span class="h-2 w-2 rounded-full bg-ok" style="animation:var(--animate-pulse-dot)"></span>
            ${esc(t("hero.badge"))}
          </p>

          <h1 class="reveal mt-6 font-display text-[clamp(2.6rem,7vw,4.6rem)] font-bold leading-[1.04] tracking-tight" style="--reveal-delay:80ms">
            ${esc(t("hero.titleA"))}<br />
            <span class="text-gradient">${esc(t("hero.titleB"))}</span>
          </h1>

          <p class="reveal mt-5 flex min-h-[1.9em] flex-wrap items-baseline font-mono text-sm text-accent-400 dark:text-accent-300 sm:text-base" style="--reveal-delay:160ms">
            <span class="mr-2 select-none text-muted">&gt;</span>
            <span id="typed" class="typing-caret"></span>
          </p>

          <p class="reveal mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg" style="--reveal-delay:220ms">
            ${esc(t("hero.tagline"))}
          </p>

          <div class="reveal mt-8 flex flex-wrap items-center gap-3" style="--reveal-delay:300ms">
            <a href="#projects" class="btn-primary">
              ${icon("arrowRight", "h-4 w-4")} ${esc(t("hero.ctaWork"))}
            </a>
            <a href="${profile.cvPath}" download class="btn-ghost">
              ${icon("download", "h-4 w-4")} ${esc(t("hero.ctaCv"))}
            </a>
            <a href="#contact" class="btn-ghost">
              ${icon("mail", "h-4 w-4")} ${esc(t("hero.ctaContact"))}
            </a>
          </div>

          <div class="reveal mt-8 flex items-center gap-2" style="--reveal-delay:380ms">
            <a href="${profile.github}" target="_blank" rel="noopener" class="icon-btn" aria-label="GitHub">${icon("github", "h-4.5 w-4.5")}</a>
            <a href="${profile.linkedin}" target="_blank" rel="noopener" class="icon-btn" aria-label="LinkedIn">${icon("linkedin", "h-4.5 w-4.5")}</a>
            <a href="mailto:${profile.email}" class="icon-btn" aria-label="Email">${icon("mail", "h-4.5 w-4.5")}</a>
            <span class="ml-2 hidden text-xs text-muted sm:block">${esc(profile.phone)}</span>
          </div>
        </div>

        <div class="reveal relative mx-auto w-full max-w-xs md:max-w-sm" style="--reveal-delay:300ms">
          <div class="absolute -inset-8 -z-10 rounded-full bg-accent-500/15 blur-3xl"></div>

          <!-- Profile photo card -->
          <div class="card overflow-hidden">
            <div class="relative aspect-square bg-gradient-to-br from-accent-500/20 via-transparent to-accent-700/20">
              <img
                src="/img/teuku-aditya.webp"
                alt="Foto ${esc(profile.name)}"
                width="800" height="800"
                fetchpriority="high"
                class="absolute inset-0 h-full w-full object-cover object-top"
              />
            </div>
            <div class="flex items-center justify-between border-t border-line px-5 py-4">
              <div>
                <p class="font-display font-bold">${esc(profile.name)}</p>
                <p class="text-sm text-muted">${esc(profile.role[lang])}</p>
              </div>
              <span class="chip">${icon("pin", "h-3.5 w-3.5")} Depok</span>
            </div>
          </div>

          <div class="card absolute -left-10 top-10 hidden items-center gap-2 rounded-xl! px-3.5 py-2.5 text-xs font-medium sm:flex" style="animation:var(--animate-float)">
            ${icon("file", "h-4 w-4 text-accent-400")} BRD · 30+ modules
          </div>
          <div class="card absolute -right-8 bottom-24 hidden items-center gap-2 rounded-xl! px-3.5 py-2.5 text-xs font-medium sm:flex" style="animation:var(--animate-float-late)">
            ${icon("code", "h-4 w-4 text-accent-400")} Vue · Laravel · Express
          </div>
        </div>
      </div>

      <a href="#about" class="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs font-medium text-muted hover:text-fg"
         style="animation:var(--animate-float)">
        ${esc(t("hero.scrollHint"))} ${icon("chevronDown", "h-4 w-4 inline")}
      </a>
    </section>`
}

export function bind() {
  const target = document.getElementById("typed")
  if (!target) return
  clearTimeout(typeTimer)
  const words = t("hero.typed")

  if (reducedMotion() || !Array.isArray(words)) {
    target.textContent = Array.isArray(words) ? words[0] : String(words)
    return
  }

  let w = 0, c = 0, deleting = false
  const type = () => {
    const word = words[w] ?? ""
    target.textContent = word.slice(0, c)
    let delay = deleting ? 26 : 52
    if (!deleting && c === word.length) { delay = 2100; deleting = true }
    else if (deleting && c === 0) { deleting = false; w = (w + 1) % words.length; delay = 420 }
    else c += deleting ? -1 : 1
    typeTimer = setTimeout(type, delay)
  }
  type()
}
