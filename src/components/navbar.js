/** Sticky glass navbar: logo, links, palette hint, theme & language toggles, mobile menu. */
import { profile } from "../data/profile.js"
import { icon } from "../lib/icons.js"
import { t, lang } from "../lib/i18n.js"
import { getTheme, onThemeChange } from "../lib/theme.js"

const NAV_ITEMS = ["about", "experience", "projects", "workflow", "skills", "contact"]

export function render() {
  const links = NAV_ITEMS.map(
    (id) => `
      <li>
        <a
          href="#${id}"
          data-nav-link
          class="rounded-lg px-3 py-1.5 text-sm font-medium text-muted transition-colors
                 hover:text-fg aria-[current]:text-fg aria-[current]:bg-accent-500/10
                 aria-[current]:text-accent-600 dark:aria-[current]:text-accent-300"
        >${t(`nav.${id}`)}</a>
      </li>`,
  ).join("")

  const mobileLinks = NAV_ITEMS.map(
    (id) => `
      <a href="#${id}" data-nav-link data-mobile-close
         class="block rounded-xl px-4 py-3 text-base font-medium text-muted hover:bg-elevated hover:text-fg">
        ${t(`nav.${id}`)}
      </a>`,
  ).join("")

  document.getElementById("header").innerHTML = `
    <nav class="relative mx-auto flex max-w-6xl items-center justify-between gap-3 border-b border-line
                bg-bg/70 px-4 py-3 backdrop-blur-xl sm:px-8 transition-transform duration-300
                [transition-timing-function:cubic-bezier(.16,1,.3,1)]">
      <a href="#home" class="flex items-center gap-2.5 font-display text-lg font-bold tracking-tight">
        <span class="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-accent-500 to-accent-700
                     font-display text-sm font-bold text-white shadow-[0_6px_16px_-6px_rgb(79_70_229_/_0.7)]">${profile.initials}</span>
        <span class="hidden sm:block">Teuku<span class="text-accent-400 dark:text-accent-300">.</span></span>
      </a>

      <ul class="hidden items-center gap-1 lg:flex">${links}</ul>

      <div class="flex items-center gap-2">
        <button id="palette-open" class="flex items-center gap-2 rounded-xl border border-line px-3 py-2
                                        text-xs font-medium text-muted transition-colors hover:border-accent-400 hover:text-fg"
                aria-label="${t("a11y.openPalette")}">
          ${icon("search", "h-3.5 w-3.5")}
          <span class="hidden font-display sm:inline">⌘K</span>
        </button>
        <button id="lang-toggle" class="rounded-xl border border-line px-2.5 py-2 font-display text-xs font-bold
                                        text-muted transition-colors hover:border-accent-400 hover:text-accent-400"
                aria-label="${t("a11y.switchLang")}" data-i18n-aria="a11y.switchLang">
          ${lang === "en" ? "EN" : "ID"}
        </button>
        <button id="theme-toggle" class="icon-btn" aria-label="${t("a11y.toggleTheme")}" data-i18n-aria="a11y.toggleTheme">
          <span data-theme-icon></span>
        </button>
        <button id="menu-toggle" class="icon-btn lg:hidden" aria-expanded="false"
                aria-label="${t("a11y.toggleMenu")}" data-i18n-aria="a11y.toggleMenu">
          ${icon("menu", "h-4.5 w-4.5 pointer-events-none")}
        </button>
      </div>

      <!-- Mobile menu -->
      <div id="mobile-menu" class="hidden absolute inset-x-4 top-full mt-2 rounded-2xl border border-line
                                   bg-surface/95 p-2 shadow-2xl backdrop-blur-xl lg:hidden!">
        ${mobileLinks}
        <a href="mailto:${profile.email}" class="mt-1 flex items-center gap-2 rounded-xl px-4 py-3 text-sm text-accent-400 hover:bg-elevated">
          ${icon("mail", "h-4 w-4")} ${profile.email}
        </a>
      </div>
    </nav>`

  paintThemeIcon()

  const menuBtn = document.getElementById("menu-toggle")
  const menu = document.getElementById("mobile-menu")
  menuBtn.addEventListener("click", () => {
    const open = menu.classList.toggle("hidden") === false
    menuBtn.setAttribute("aria-expanded", String(open))
    document.body.classList.toggle("menu-open", open)
  })
  // Close the mobile menu when a link inside it is used
  menu.addEventListener("click", (e) => {
    if (e.target.closest("[data-mobile-close], a")) {
      menu.classList.add("hidden")
      menuBtn.setAttribute("aria-expanded", "false")
      document.body.classList.remove("menu-open")
    }
  })
}

function paintThemeIcon() {
  const slot = document.querySelector("[data-theme-icon]")
  if (slot) slot.innerHTML = icon(getTheme() === "dark" ? "sun" : "moon", "h-4.5 w-4.5 pointer-events-none")
}

export function bind() {
  document.getElementById("theme-toggle").addEventListener("click", () => {
    // setTheme is wired in main.js (single source of truth)
    document.dispatchEvent(new CustomEvent("ui:toggle-theme"))
  })
  document.getElementById("lang-toggle").addEventListener("click", () => {
    document.dispatchEvent(new CustomEvent("ui:toggle-lang"))
  })
  document.getElementById("palette-open").addEventListener("click", () => {
    document.dispatchEvent(new CustomEvent("ui:open-palette"))
  })
}

// Keep the theme icon in sync (registered once at module level)
onThemeChange(paintThemeIcon)
