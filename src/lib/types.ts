/** Data typed by the user in the form. Multi-line text fields = one bullet per line. */

export interface TechSkill {
  category: string;
  items: string; // one bullet per line
}

export interface FuncSkill {
  label: string;
  description: string;
}

export interface Diploma {
  year: string;
  degree: string;
  school: string;
}

export interface Certification {
  name: string;
  description: string;
}

export interface Language {
  name: string;
  level: string;
}

export interface Role {
  title: string; // optional sub-role title, e.g. "Product Owner Semarchy"
  tasks: string; // one task per line
}

export interface Experience {
  company: string;
  role: string;
  startMonth: string; // "1".."12" or ""
  startYear: string;
  endMonth: string;
  endYear: string;
  current: boolean;
  clients: string; // comma separated
  project: string;
  roles: Role[];
  environment: string;
  pageBreakBefore: boolean;
  inCareer: boolean; // shown in "Résumé de carrière"
}

export interface CvData {
  fileName: string;
  cvCode: string;
  title: string;
  years: string;
  techSkills: TechSkill[];
  funcSkills: FuncSkill[];
  sectors: string;
  diplomas: Diploma[];
  certifications: Certification[];
  trainings: string;
  languages: Language[];
  experiences: Experience[];
}

export const emptyRole = (): Role => ({ title: "", tasks: "" });

export const emptyExperience = (): Experience => ({
  company: "",
  role: "",
  startMonth: "",
  startYear: "",
  endMonth: "",
  endYear: "",
  current: false,
  clients: "",
  project: "",
  roles: [emptyRole()],
  environment: "",
  pageBreakBefore: false,
  inCareer: true,
});

export const emptyCv = (): CvData => ({
  fileName: "",
  cvCode: "CV_ITEC_",
  title: "",
  years: "",
  techSkills: [{ category: "", items: "" }],
  funcSkills: [{ label: "", description: "" }],
  sectors: "",
  diplomas: [{ year: "", degree: "", school: "" }],
  certifications: [],
  trainings: "",
  languages: [{ name: "", level: "" }],
  experiences: [emptyExperience()],
});
