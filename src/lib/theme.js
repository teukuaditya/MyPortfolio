/**
 * Theme state: dark-first with light option.
 * Initial class is set by the inline <head> script (no FOUC);
 * this module manages toggling + persistence afterwards.
 */
const listeners = new Set()

export function getTheme() {
  return document.documentElement.classList.contains("dark") ? "dark" : "light"
}

export function setTheme(theme, { persist = true } = {}) {
  const dark = theme === "dark"
  document.documentElement.classList.toggle("dark", dark)
  if (persist) localStorage.setItem("theme", theme)
  // Keep browser UI chrome in sync
  document
    .querySelectorAll('meta[name="theme-color"]')
    .forEach((m) => (m.content = dark ? "#0a0a11" : "#f7f7fb"))
  listeners.forEach((fn) => fn(theme))
}

export function toggleTheme() {
  setTheme(getTheme() === "dark" ? "light" : "dark")
}

export function onThemeChange(fn) {
  listeners.add(fn)
}
