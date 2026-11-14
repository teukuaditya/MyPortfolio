/** Toast feedback (aria-live region is in index.html). */
import { icon } from "./icons.js"

export function toast(message, name = "check") {
  const box = document.getElementById("toasts")
  if (!box) return
  const el = document.createElement("div")
  el.className =
    "card flex items-center gap-2.5 px-4 py-3 text-sm font-medium shadow-xl"
    + " [animation:float_0.3s_ease-out]"
  el.style.cssText =
    "animation: toast-in .35s cubic-bezier(.16,1,.3,1); opacity:0"
  el.innerHTML = `${icon(name, "h-4 w-4 text-accent-400 shrink-0")}<span>${message}</span>`
  box.appendChild(el)
  requestAnimationFrame(() => (el.style.opacity = "1"))
  setTimeout(() => {
    el.style.transition = "opacity .3s ease"
    el.style.opacity = "0"
    setTimeout(() => el.remove(), 350)
  }, 2600)
}
