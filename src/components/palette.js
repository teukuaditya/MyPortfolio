/** Command palette (⌘K / Ctrl+K): navigate, toggle theme/lang, copy email, links. */
import { profile } from "../data/profile.js"
import { icon } from "../lib/icons.js"
import { t, getLang, setLang } from "../lib/i18n.js"
import { getTheme, setTheme } from "../lib/theme.js"
import { esc } from "../lib/dom.js"
import { toast } from "../lib/toast.js"

const modal = () => document.getElementById("palette")
let items = []
let filtered = []
let cursor = 0

export function render() {
  modal().innerHTML = `
    <div class="flex items-center gap-3 border-b border-line px-5 py-4">
      ${icon("search", "h-4.5 w-4.5 text-muted")}
      <input id="palette-input" type="text" class="w-full bg-transparent text-sm text-fg outline-none placeholder:text-muted/60"
             placeholder="${esc(t("palette.placeholder"))}" autocomplete="off" spellcheck="false" />
      <kbd class="rounded-md border border-line px-1.5 py-0.5 font-mono text-[10px] text-muted">ESC</kbd>
    </div>
    <ul id="palette-list" class="max-h-[50vh] overflow-y-auto p-2" role="listbox"></ul>`

  build()
  bindInput()
}

function build() {
  const nav = ["about", "experience", "projects", "workflow", "documents", "skills", "certifications", "contact"].map(
    (id) => ({
      group: "navigate", label: t(`nav.${id}`) || id, hint: `#${id}`, icon: "arrowRight",
      run: () => { modal().close(); document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }) },
    }),
  )
  const actions = [
    {
      group: "actions", label: getTheme() === "dark" ? t("palette.toLight") : t("palette.toDark"),
      hint: getTheme(), icon: getTheme() === "dark" ? "sun" : "moon",
      run: () => { modal().close(); setTheme(getTheme() === "dark" ? "light" : "dark") },
    },
    {
      group: "actions", label: t("palette.switchLang"), hint: getLang() === "en" ? "EN" : "ID", icon: "globe",
      run: () => { modal().close(); setLang(getLang() === "en" ? "id" : "en") },
    },
    {
      group: "actions", label: t("palette.copyEmail"), hint: profile.email, icon: "copy",
      run: async () => {
        modal().close()
        try { await navigator.clipboard.writeText(profile.email); toast(t("contact.copied"), "copy") }
        catch { toast(profile.email, "mail") }
      },
    },
    {
      group: "actions", label: t("palette.downloadCv"), hint: "PDF", icon: "download",
      run: () => { modal().close(); document.querySelector(`a[href="${profile.cvPath}"]`)?.click() },
    },
    {
      group: "actions", label: t("palette.printResume"), hint: "⌘P", icon: "printer",
      run: () => { modal().close(); window.print() },
    },
  ]
  const links = [
    { group: "links", label: "GitHub", hint: profile.githubUser, icon: "github", run: () => open(profile.github) },
    { group: "links", label: "LinkedIn", hint: "teuku-aditya", icon: "linkedin", run: () => open(profile.linkedin) },
  ]
  items = [...nav, ...actions, ...links]
  filtered = items
}

function paint() {
  const list = document.getElementById("palette-list")
  if (!filtered.length) {
    list.innerHTML = `<li class="px-4 py-6 text-center text-sm text-muted">${esc(t("palette.noResults"))}</li>`
    return
  }
  const groups = { navigate: t("palette.navigate"), actions: t("palette.actions"), links: t("palette.links") }
  let lastGroup = ""
  list.innerHTML =
    filtered
      .map((item, i) => {
        const header = item.group !== lastGroup ? `<li class="px-3 pt-3 pb-1 text-[10px] font-bold uppercase tracking-widest text-muted">${groups[item.group]}</li>` : ""
        lastGroup = item.group
        return `${header}
        <li role="option" aria-selected="${i === cursor}">
          <button data-idx="${i}" class="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors
                         ${i === cursor ? "bg-accent-500/15 text-fg" : "text-muted hover:bg-elevated"}">
            ${icon(item.icon, "h-4 w-4 shrink-0 opacity-70")}
            <span class="font-medium text-fg">${esc(item.label)}</span>
            <span class="ml-auto truncate text-xs text-muted">${esc(item.hint || "")}</span>
          </button>
        </li>`
      })
      .join("")
  list.querySelectorAll("[data-idx]").forEach((btn) => {
    btn.addEventListener("click", () => filtered[Number(btn.dataset.idx)].run())
    btn.addEventListener("pointerenter", () => {
      cursor = Number(btn.dataset.idx)
      paint()
    })
  })
  list.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: "nearest" })
}

function bindInput() {
  const input = document.getElementById("palette-input")
  input.addEventListener("input", () => {
    const q = input.value.trim().toLowerCase()
    filtered = !q ? items : items.filter((it) => (it.label + " " + it.hint).toLowerCase().includes(q))
    cursor = 0
    paint()
  })
  input.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown") { e.preventDefault(); cursor = Math.min(cursor + 1, filtered.length - 1); paint() }
    else if (e.key === "ArrowUp") { e.preventDefault(); cursor = Math.max(cursor - 1, 0); paint() }
    else if (e.key === "Enter") { e.preventDefault(); filtered[cursor]?.run() }
  })
}

export function openPalette() {
  build() // refresh labels to current language/theme
  cursor = 0
  paint()
  modal().showModal()
  document.getElementById("palette-input").value = ""
  document.getElementById("palette-input").focus()
}

export function bind() {
  // ⌘K / Ctrl+K — note: Chrome on Windows reserves Ctrl+K for the address bar,
  // so "/" is offered as an alternative (GitHub/YouTube convention).
  document.addEventListener("keydown", (e) => {
    const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName) || e.target.isContentEditable
    if (((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") || (e.key === "/" && !typing)) {
      e.preventDefault()
      if (modal().open) modal().close()
      else openPalette()
    }
  })
  modal().addEventListener("click", (e) => {
    if (e.target === modal()) modal().close()
  })
}
