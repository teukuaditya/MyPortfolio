/**
 * i18n runtime: language state + translation helpers.
 * Default language follows the browser, persists in localStorage.
 */
import { dict } from "../data/i18n.js"

const stored = localStorage.getItem("lang")
export let lang =
  stored === "en" || stored === "id"
    ? stored
    : (navigator.language || "en").toLowerCase().startsWith("id")
      ? "id"
      : "en"

const subs = new Set()

export function getLang() {
  return lang
}

export function setLang(l) {
  if (l === lang) return
  lang = l
  localStorage.setItem("lang", l)
  document.documentElement.lang = l
  subs.forEach((fn) => fn(l))
}

/** Subscribe to language changes (used by main.js to re-render sections). */
export function onLangChange(fn) {
  subs.add(fn)
}

/** Nested-key lookup: t("nav.about") */
export function t(path) {
  const get = (o) => path.split(".").reduce((acc, k) => (acc ? acc[k] : undefined), o)
  return get(dict[lang]) ?? get(dict.en) ?? path
}

/** Localized field helper: tx(item.title) where title = { en, id } */
export function tx(field) {
  if (field == null) return ""
  if (typeof field === "string") return field
  return field[lang] ?? field.en ?? ""
}
