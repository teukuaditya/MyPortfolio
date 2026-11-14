/** GitHub widget: recent repos via public API, cached in localStorage, graceful fallback. */
import { profile } from "../data/profile.js"
import { icon } from "../lib/icons.js"
import { t } from "../lib/i18n.js"
import { esc } from "../lib/dom.js"
import { observeReveals } from "../lib/reveal.js"

const CACHE_KEY = "gh_cache_v1"
const TTL = 60 * 60 * 1000 // 1 hour

export function render() {
  document.getElementById("github").innerHTML = `
    <section id="github" class="section pb-8!">
      <div class="container-x">
        <div class="card reveal overflow-hidden p-7 sm:p-9">
          <div class="flex flex-wrap items-baseline justify-between gap-3">
            <div>
              <p class="eyebrow mb-2!">${esc(t("github.eyebrow"))}</p>
              <h2 class="font-display text-xl font-bold sm:text-2xl">${esc(t("github.title"))}</h2>
            </div>
            <a href="${profile.github}" target="_blank" rel="noopener" class="btn-ghost py-2! text-sm">
              ${icon("github", "h-4 w-4")} ${esc(t("github.viewProfile"))}
            </a>
          </div>
          <div id="gh-repos" class="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3" aria-live="polite">
            <p class="text-sm text-muted">…</p>
          </div>
        </div>
      </div>
    </section>`
  load()
}

function cached() {
  try {
    const hit = JSON.parse(localStorage.getItem(CACHE_KEY) || "null")
    if (hit && Date.now() - hit.ts < TTL) return hit.repos
  } catch { /* ignore corrupt cache */ }
  return null
}

async function load() {
  const box = document.getElementById("gh-repos")
  const cachedRepos = cached()
  if (cachedRepos) return paint(cachedRepos, true)

  try {
    const res = await fetch(
      `https://api.github.com/users/${profile.githubUser}/repos?sort=updated&per_page=6&type=owner`,
      { headers: { Accept: "application/vnd.github+json" } },
    )
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const json = await res.json()
    const repos = json.map((r) => ({
      name: r.name,
      desc: r.description,
      url: r.html_url,
      lang: r.language,
      stars: r.stargazers_count,
    }))
    paint(repos, false)
    localStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), repos }))
  } catch {
    box.innerHTML = `
      <p class="sm:col-span-2 lg:col-span-3 flex items-center gap-2 text-sm text-muted">
        ${icon("github", "h-4 w-4")} ${esc(t("github.fallback"))}
      </p>`
  }
}

function paint(repos, fromCache) {
  const box = document.getElementById("gh-repos")
  if (!repos.length) {
    box.innerHTML = `<p class="text-sm text-muted">${esc(t("github.fallback"))}</p>`
    return
  }
  box.innerHTML =
    repos
      .map(
        (r) => `
        <a href="${r.url}" target="_blank" rel="noopener"
           class="reveal group rounded-xl border border-line bg-elevated p-4 transition-all hover:-translate-y-0.5 hover:border-accent-400">
          <p class="flex items-center gap-2 font-display text-sm font-bold group-hover:text-accent-400 dark:group-hover:text-accent-300">
            ${icon("git", "h-3.5 w-3.5")} ${esc(r.name)}
          </p>
          <p class="mt-1.5 line-clamp-2 text-xs leading-relaxed text-muted">${esc(r.desc || "—")}</p>
          <p class="mt-3 flex items-center gap-3 text-xs text-muted">
            ${r.lang ? `<span class="flex items-center gap-1"><span class="h-2 w-2 rounded-full bg-accent-400"></span>${esc(r.lang)}</span>` : ""}
            <span class="flex items-center gap-1">${icon("zap", "h-3 w-3")} ${r.stars} ${esc(t("github.stars"))}</span>
            ${fromCache ? `<span class="ml-auto text-[10px] uppercase tracking-wider opacity-50">${esc(t("misc.ghCacheNote"))}</span>` : ""}
          </p>
        </a>`,
      )
      .join("")
  observeReveals(box)
}
