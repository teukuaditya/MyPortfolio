/** Tiny DOM helpers shared by all render modules. */

export const qs = (sel, root = document) => root.querySelector(sel)
export const qsa = (sel, root = document) => [...root.querySelectorAll(sel)]

/** Mount HTML into a container. */
export function mount(sel, html) {
  const el = qs(sel)
  if (!el) return null
  el.innerHTML = html
  return el
}

/** Escape untrusted text before interpolating into templates. */
export function esc(str = "") {
  return String(str).replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c],
  )
}

export const reducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches
