/**
 * Scroll-reveal via IntersectionObserver.
 * Elements with class .reveal get .is-visible when entering the viewport.
 * Stagger by setting --reveal-delay inline (set in templates).
 */
import { reducedMotion } from "./dom.js"

let observer

function ensureObserver() {
  if (observer) return observer
  if (reducedMotion() || typeof IntersectionObserver === "undefined") {
    // No animation: everything visible immediately.
    observer = {
      observe(el) {
        el.classList.add("is-visible")
      },
      disconnect() {},
    }
    return observer
  }
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible")
          observer.unobserve(entry.target)
        }
      }
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
  )
  return observer
}

/** (Re-)observe all not-yet-visible .reveal elements inside root. */
export function observeReveals(root = document) {
  const io = ensureObserver()
  root.querySelectorAll(".reveal:not(.is-visible)").forEach((el) => io.observe(el))
}
