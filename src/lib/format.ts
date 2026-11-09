import type { CvData, Experience } from "./types";

export const MONTHS = [
  "janvier", "février", "mars", "avril", "mai", "juin",
  "juillet", "août", "septembre", "octobre", "novembre", "décembre",
];

const APOS = "’"; // typographic apostrophe used in the original CV

/** Split a multi-line text into clean bullet lines (removes "-", "•", "1." prefixes). */
export function toLines(text: string | undefined): string[] {
  return (text ?? "")
    .split(/\r?\n/)
    .map((l) => l.replace(/^\s*(?:[-–—•·▪◦*●○■□➢➤►✓✔]|\d{1,2}[.)])\s*/, "").trim())
    .filter(Boolean);
}

const clean = (s: string | undefined) => (s ?? "").trim();

function monthYear(month: string, year: string): string {
  const m = MONTHS[Number(month) - 1];
  return [m, clean(year)].filter(Boolean).join(" ");
}

/** "De juin 2016" / "D’avril 2020" (elision before a vowel) */
function de(s: string): string {
  return /^[aeiouyéèêàâîôûh]/i.test(s) ? `D${APOS}${s}` : `De ${s}`;
}

/** French period, as written in the ITEC CVs:
 *  "Depuis décembre 2021", "D’avril 2020 à août 2021", "De juin 2016 à mars 2020" */
export function formatPeriod(e: Pick<Experience, "startMonth" | "startYear" | "endMonth" | "endYear" | "current">): string {
  const start = monthYear(e.startMonth, e.startYear);
  const end = monthYear(e.endMonth, e.endYear);
  if (!start) return end;
  if (e.current) return `Depuis ${start}`;
  return end ? `${de(start)} à ${end}` : de(start);
}

export function yearsLabel(years: string): string {
  const n = clean(years);
  if (!n) return "";
  return `${n} ${n === "1" ? "an" : "ans"} d${APOS}expérience`;
}

/** Data object consumed by the Word template (see scripts/build-template.mjs). */
export function toTemplateData(cv: CvData) {
  const techSkills = (cv.techSkills ?? [])
    .map((s) => ({ category: clean(s.category).replace(/\s*:\s*$/, ""), items: toLines(s.items) }))
    .filter((s) => s.category || s.items.length);

  const funcSkills = (cv.funcSkills ?? [])
    .map((s) => ({
      label: clean(s.label).replace(/\s*:\s*$/, ""),
      description: clean(s.description),
    }))
    .filter((s) => s.label || s.description)
    .map((s) => ({ ...s, hasDescription: !!s.description }));

  const diplomas = (cv.diplomas ?? [])
    .map((d) => ({ year: clean(d.year), degree: clean(d.degree), school: clean(d.school) }))
    .filter((d) => d.degree || d.school)
    .map((d) => ({ ...d, hasYear: !!d.year, hasSchool: !!d.school }));

  const certifications = (cv.certifications ?? [])
    .map((c) => ({ name: clean(c.name), description: clean(c.description) }))
    .filter((c) => c.name || c.description)
    .map((c) => ({ ...c, hasDescription: !!c.description }));

  const languages = (cv.languages ?? [])
    .map((l) => ({ name: clean(l.name), level: clean(l.level) }))
    .filter((l) => l.name)
    .map((l) => ({ ...l, hasLevel: !!l.level }));

  const trainings = toLines(cv.trainings);

  const experiences = (cv.experiences ?? [])
    .filter((e) => clean(e.company) || clean(e.role))
    .map((e) => {
      const clients = clean(e.clients);
      const roles = (e.roles ?? [])
        .map((r) => ({ title: clean(r.title), tasks: toLines(r.tasks) }))
        .filter((r) => r.title || r.tasks.length)
        .map((r) => ({ ...r, hasTitle: !!r.title, hasTasks: r.tasks.length > 0 }));
      const environment = toLines(e.environment.replace(/,\s*\n/g, "\n")).join(", ");
      return {
        company: clean(e.company),
        role: clean(e.role),
        period: formatPeriod(e),
        pageBreakBefore: !!e.pageBreakBefore,
        inCareer: e.inCareer !== false,
        hasClients: !!clients,
        clientsLabel: clients.includes(",") ? "Clients" : "Client",
        clients,
        hasProject: !!clean(e.project),
        project: clean(e.project),
        roles,
        hasEnvironment: !!environment,
        environment,
      };
    });

  return {
    cvCode: clean(cv.cvCode),
    title: clean(cv.title),
    yearsLabel: yearsLabel(cv.years),
    hasTechSkills: techSkills.length > 0,
    techSkills,
    hasFuncSkills: funcSkills.length > 0,
    funcSkills,
    sectors: toLines(cv.sectors),
    hasDiplomas: diplomas.length > 0,
    diplomas,
    hasCertifications: certifications.length > 0,
    certifications,
    hasTrainings: trainings.length > 0,
    trainings,
    languages,
    career: experiences
      .filter((e) => e.inCareer)
      .map((e) => ({ period: e.period, company: e.company, role: e.role })),
    experiences,
  };
}

/** Safe file name without extension. */
export function safeFileName(name: string, fallback = "CV"): string {
  const n = (name ?? "").trim().replace(/\.(docx?|pdf)$/i, "").replace(/[\\/:*?"<>|]+/g, "_");
  return n || fallback;
}
