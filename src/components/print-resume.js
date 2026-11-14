/**
 * Print-friendly résumé — rendered from the same data files, only visible
 * when printing (window.print() / Ctrl+P / command palette / footer button).
 */
import { profile } from "../data/profile.js"
import { experience } from "../data/experience.js"
import { projects } from "../data/projects.js"
import { allSkills } from "../data/skills.js"
import { certifications } from "../data/certifications.js"
import { tx } from "../lib/i18n.js"
import { esc } from "../lib/dom.js"

export function render() {
  const edu = experience.find((e) => e.id === "education")
  const jobs = experience.filter((e) => e.id !== "education")
  const skillMap = new Map()
  allSkills.forEach((s) => {
    skillMap.set(s.groupLabel.en, [...(skillMap.get(s.groupLabel.en) || []), s.name])
  })

  document.getElementById("print-resume").innerHTML = `
    <table style="width:100%; border:none"><tr>
      <td style="border:none; vertical-align:middle">
        <h1 style="font-size:22pt; margin:0 0 4pt">${esc(profile.name)}</h1>
        <p style="margin:0 0 10pt; color:#444">
          ${esc(profile.role.en)} — ${esc(profile.location.en)} · ${esc(profile.email)} · ${esc(profile.phone)}<br />
          ${esc(profile.linkedin.replace("https://www.", ""))} · ${esc(profile.github.replace("https://", ""))}
        </p>
      </td>
      <td style="border:none; width:110px">
        <img src="/img/teuku-aditya.webp" alt="" width="110" height="110"
             style="width:110px; height:110px; object-fit:cover; border-radius:10px" />
      </td>
    </tr></table>
    <p style="margin:0 0 12pt"><strong>Business Analyst (Intern) with a fullstack developer background.</strong>
       I bridge business and technical teams: BRDs, SRS/UCD, functional testing — plus hands-on delivery with Vue, Laravel & Express.
    </p>

    <h2 style="font-size:13pt; border-bottom:1px solid #999; padding-bottom:3pt; margin:16pt 0 8pt">Experience</h2>
    ${jobs
      .map(
        (job) => `
        <div style="margin-bottom:10pt">
          <p style="margin:0"><strong>${esc(job.company)}</strong> — ${esc(tx(job.role))} <span style="float:right; color:#444">${esc(job.period)}</span></p>
          <ul style="margin:4pt 0 0 16pt">
            ${tx(job.bullets).map((b) => `<li style="margin-bottom:2pt">${esc(b)}</li>`).join("")}
          </ul>
        </div>`,
      )
      .join("")}

    <h2 style="font-size:13pt; border-bottom:1px solid #999; padding-bottom:3pt; margin:16pt 0 8pt">Projects & Case Studies</h2>
    ${projects
      .map(
        (p) => `
        <div style="margin-bottom:8pt">
          <p style="margin:0"><strong>${esc(title(p))}</strong> — ${esc(tx(p.subtitle))} <span style="float:right; color:#444">${esc(p.period)}</span></p>
          <p style="margin:2pt 0 0; color:#444">${esc(tx(p.outcome))} <em>(${esc(p.stack.join(", "))})</em></p>
        </div>`,
      )
      .join("")}

    <h2 style="font-size:13pt; border-bottom:1px solid #999; padding-bottom:3pt; margin:16pt 0 8pt">Education</h2>
    <p style="margin:0"><strong>${esc(edu.company)}</strong> — ${esc(tx(edu.role))} <span style="float:right; color:#444">${esc(edu.period)}</span></p>
    <p style="margin:2pt 0 0; color:#444">GPA ${esc(profile.education.gpa)} · ${esc(tx(edu.summary))}</p>

    <h2 style="font-size:13pt; border-bottom:1px solid #999; padding-bottom:3pt; margin:16pt 0 8pt">Skills</h2>
    ${[...skillMap.entries()]
      .map(([group, list]) => `<p style="margin:3pt 0"><strong>${esc(group)}:</strong> ${esc(list.join(", "))}</p>`)
      .join("")}

    <h2 style="font-size:13pt; border-bottom:1px solid #999; padding-bottom:3pt; margin:16pt 0 8pt">Certifications</h2>
    <p style="margin:0">${certifications.map((c) => esc(c.name)).join(" · ")}</p>
  `
}

const title = (p) => (typeof p.title === "string" ? p.title : tx(p.title))
