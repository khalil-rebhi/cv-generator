"use client";

import { useFieldArray, useWatch, type Control, type UseFormRegister } from "react-hook-form";
import type { CvData } from "@/lib/types";
import { emptyExperience, emptyRole } from "@/lib/types";
import { MONTHS, formatPeriod, toLines, yearsLabel } from "@/lib/format";
import { AddButton, Field, Input, ItemCard, Section, TextArea } from "./ui";

type Props = { control: Control<CvData>; register: UseFormRegister<CvData> };

const LINES_HINT = "Une ligne = une puce. Vous pouvez coller un texte généré par IA : les « - », « • » et numéros en début de ligne sont retirés.";

export default function CvForm({ control, register }: Props) {
  return (
    <div className="space-y-4">
      <GeneralSection control={control} register={register} />
      <TechSkillsSection control={control} register={register} />
      <FuncSkillsSection control={control} register={register} />
      <Section title="Secteurs d’activité" hint="Une ligne = un secteur.">
        <TextArea {...register("sectors")} rows={6} placeholder={"Assurance\nRetail / Distribution\nIndustrie"} />
      </Section>
      <FormationsSection control={control} register={register} />
      <LanguagesSection control={control} register={register} />
      <ExperiencesSection control={control} register={register} />
    </div>
  );
}

/* ---------------- Général ---------------- */
function GeneralSection({ control, register }: Props) {
  const years = useWatch({ control, name: "years" });
  return (
    <Section title="Informations générales">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Field label="Code du CV (en-tête)" hint="Affiché en haut à droite de chaque page.">
          <Input {...register("cvCode")} placeholder="CV_ITEC_ABC" />
        </Field>
        <Field label="Années d’expérience" hint={years ? `→ « ${yearsLabel(years)} »` : "Ex. 14"}>
          <Input {...register("years")} inputMode="numeric" placeholder="14" />
        </Field>
      </div>
      <Field label="Intitulé du poste">
        <Input {...register("title")} placeholder="Product Owner & Consultant Data Semarchy" />
      </Field>
    </Section>
  );
}

/* ---------------- Compétences techniques ---------------- */
function TechSkillsSection({ control, register }: Props) {
  const { fields, append, remove, move, insert } = useFieldArray({ control, name: "techSkills" });
  const values = useWatch({ control, name: "techSkills" });
  return (
    <Section title="Compétences techniques" count={fields.length} hint="Chaque catégorie apparaît en gras, ses éléments en sous-puces.">
      {fields.map((f, i) => (
        <ItemCard
          key={f.id}
          title={values?.[i]?.category || `Catégorie ${i + 1}`}
          index={i}
          total={fields.length}
          onMove={move}
          onDuplicate={() => insert(i + 1, { ...values[i] })}
          onRemove={() => remove(i)}
        >
          <Field label="Catégorie">
            <Input {...register(`techSkills.${i}.category`)} placeholder="ETL & Intégration de données" />
          </Field>
          <Field label="Éléments" hint="Une ligne = une sous-puce.">
            <TextArea {...register(`techSkills.${i}.items`)} rows={3} placeholder={"Talend, SSIS, Informatica\nAPI REST / SOAP"} />
          </Field>
        </ItemCard>
      ))}
      <AddButton onClick={() => append({ category: "", items: "" })}>Ajouter une catégorie</AddButton>
    </Section>
  );
}

/* ---------------- Compétences fonctionnelles ---------------- */
function FuncSkillsSection({ control, register }: Props) {
  const { fields, append, remove, move } = useFieldArray({ control, name: "funcSkills" });
  const values = useWatch({ control, name: "funcSkills" });
  return (
    <Section title="Compétences fonctionnelles" count={fields.length} hint="« Libellé : description », le libellé est en gras.">
      {fields.map((f, i) => (
        <ItemCard key={f.id} title={values?.[i]?.label || `Compétence ${i + 1}`} index={i} total={fields.length} onMove={move} onRemove={() => remove(i)}>
          <Field label="Libellé (gras)">
            <Input {...register(`funcSkills.${i}.label`)} placeholder="Reporting décisionnel" />
          </Field>
          <Field label="Description">
            <TextArea {...register(`funcSkills.${i}.description`)} rows={2} placeholder="développement de rapports complexes sous SSRS…" />
          </Field>
        </ItemCard>
      ))}
      <AddButton onClick={() => append({ label: "", description: "" })}>Ajouter une compétence</AddButton>
    </Section>
  );
}

/* ---------------- Formations ---------------- */
function FormationsSection({ control, register }: Props) {
  const diplomas = useFieldArray({ control, name: "diplomas" });
  const certs = useFieldArray({ control, name: "certifications" });
  return (
    <Section title="Formations">
      <h4 className="text-sm font-semibold text-slate-700">Diplômes</h4>
      {diplomas.fields.map((f, i) => (
        <ItemCard key={f.id} title={`Diplôme ${i + 1}`} index={i} total={diplomas.fields.length} onMove={diplomas.move} onRemove={() => diplomas.remove(i)}>
          <div className="grid grid-cols-[90px_1fr] gap-3">
            <Field label="Année">
              <Input {...register(`diplomas.${i}.year`)} placeholder="2011" />
            </Field>
            <Field label="Diplôme (gras)">
              <Input {...register(`diplomas.${i}.degree`)} placeholder="Master informatique" />
            </Field>
          </div>
          <Field label="Établissement">
            <Input {...register(`diplomas.${i}.school`)} placeholder="Faculté des sciences…" />
          </Field>
        </ItemCard>
      ))}
      <AddButton onClick={() => diplomas.append({ year: "", degree: "", school: "" })}>Ajouter un diplôme</AddButton>

      <h4 className="pt-2 text-sm font-semibold text-slate-700">Certifications</h4>
      {certs.fields.map((f, i) => (
        <ItemCard key={f.id} title={`Certification ${i + 1}`} index={i} total={certs.fields.length} onMove={certs.move} onRemove={() => certs.remove(i)}>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_1.4fr]">
            <Field label="Nom / code">
              <Input {...register(`certifications.${i}.name`)} placeholder="PSM (Professional Scrum Master)" />
            </Field>
            <Field label="Description">
              <Input {...register(`certifications.${i}.description`)} placeholder="Management de projets Agile" />
            </Field>
          </div>
        </ItemCard>
      ))}
      <AddButton onClick={() => certs.append({ name: "", description: "" })}>Ajouter une certification</AddButton>

      <h4 className="pt-2 text-sm font-semibold text-slate-700">Formations</h4>
      <TextArea {...register("trainings")} rows={4} placeholder={"Formation Talend\nFormation Qlik Sense"} />
      <p className="text-[11px] text-slate-400">Une ligne = une formation.</p>
    </Section>
  );
}

/* ---------------- Langues ---------------- */
function LanguagesSection({ control, register }: Props) {
  const { fields, append, remove, move } = useFieldArray({ control, name: "languages" });
  return (
    <Section title="Langues" count={fields.length}>
      {fields.map((f, i) => (
        <ItemCard key={f.id} title={`Langue ${i + 1}`} index={i} total={fields.length} onMove={move} onRemove={() => remove(i)}>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Langue">
              <Input {...register(`languages.${i}.name`)} placeholder="Anglais" />
            </Field>
            <Field label="Niveau">
              <Input {...register(`languages.${i}.level`)} list="language-levels" placeholder="professionnel" />
            </Field>
          </div>
        </ItemCard>
      ))}
      <datalist id="language-levels">
        {["langue maternelle", "bilingue", "courant", "professionnel", "intermédiaire", "notions", "C2", "C1", "B2", "B1", "A2"].map((l) => (
          <option key={l} value={l} />
        ))}
      </datalist>
      <AddButton onClick={() => append({ name: "", level: "" })}>Ajouter une langue</AddButton>
    </Section>
  );
}

/* ---------------- Expériences ---------------- */
function ExperiencesSection({ control, register }: Props) {
  const { fields, prepend, append, remove, move, insert } = useFieldArray({ control, name: "experiences" });
  const values = useWatch({ control, name: "experiences" });
  return (
    <Section
      title="Expériences professionnelles"
      count={fields.length}
      hint="De la plus récente à la plus ancienne. Le « Résumé de carrière » est construit automatiquement à partir de ces expériences."
    >
      <AddButton onClick={() => prepend(emptyExperience())}>Ajouter une expérience en haut (plus récente)</AddButton>
      {fields.map((f, i) => {
        const v = values?.[i];
        const period = v ? formatPeriod(v) : "";
        return (
          <ItemCard
            key={f.id}
            collapsible
            title={
              <>
                {v?.company || `Expérience ${i + 1}`}
                {period && <span className="font-normal text-slate-400"> — {period}</span>}
              </>
            }
            index={i}
            total={fields.length}
            onMove={move}
            onDuplicate={() => insert(i + 1, structuredClone(values[i]))}
            onRemove={() => {
              if (confirm(`Supprimer l’expérience « ${v?.company || i + 1} » ?`)) remove(i);
            }}
          >
            <ExperienceFields index={i} control={control} register={register} />
          </ItemCard>
        );
      })}
      <AddButton onClick={() => append(emptyExperience())}>Ajouter une expérience en bas (plus ancienne)</AddButton>
    </Section>
  );
}

function ExperienceFields({ index: i, control, register }: Props & { index: number }) {
  const current = useWatch({ control, name: `experiences.${i}.current` });
  const roles = useFieldArray({ control, name: `experiences.${i}.roles` });
  const roleValues = useWatch({ control, name: `experiences.${i}.roles` });
  const yearOptions = Array.from({ length: 45 }, (_, k) => String(new Date().getFullYear() - k));

  const monthSelect = (name: `experiences.${number}.startMonth` | `experiences.${number}.endMonth`) => (
    <select {...register(name)} className="input">
      <option value="">Mois</option>
      {MONTHS.map((m, k) => (
        <option key={m} value={String(k + 1)}>
          {m}
        </option>
      ))}
    </select>
  );

  return (
    <>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Field label="Entreprise">
          <Input {...register(`experiences.${i}.company`)} placeholder="Ajusteo" />
        </Field>
        <Field label="Poste (ligne sous l’entreprise)">
          <Input {...register(`experiences.${i}.role`)} placeholder="Consultant Data Semarchy" />
        </Field>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Field label="Début">
          <div className="grid grid-cols-2 gap-2">
            {monthSelect(`experiences.${i}.startMonth`)}
            <Input {...register(`experiences.${i}.startYear`)} list="cv-years" placeholder="Année" inputMode="numeric" />
          </div>
        </Field>
        <Field label="Fin">
          <div className="grid grid-cols-2 gap-2">
            {current ? (
              <div className="col-span-2 flex h-[34px] items-center rounded-md border border-dashed border-slate-300 px-2.5 text-sm text-slate-400">
                Poste actuel (« Depuis … »)
              </div>
            ) : (
              <>
                {monthSelect(`experiences.${i}.endMonth`)}
                <Input {...register(`experiences.${i}.endYear`)} list="cv-years" placeholder="Année" inputMode="numeric" />
              </>
            )}
          </div>
        </Field>
      </div>
      <datalist id="cv-years">
        {yearOptions.map((y) => (
          <option key={y} value={y} />
        ))}
      </datalist>
      <label className="flex items-center gap-2 text-sm text-slate-600">
        <input type="checkbox" {...register(`experiences.${i}.current`)} className="h-4 w-4 accent-itec" />
        Poste actuel
      </label>

      <Field label="Client(s)" hint="Séparés par des virgules. « Client : » ou « Clients : » est choisi automatiquement.">
        <Input {...register(`experiences.${i}.clients`)} placeholder="Imerys, Bastide Médical, FedEx" />
      </Field>
      <Field label="Projet">
        <TextArea {...register(`experiences.${i}.project`)} rows={3} placeholder="Intervention sur des projets de…" />
      </Field>

      <div className="space-y-2 rounded-md border border-slate-200 bg-white p-3">
        <div className="text-sm font-semibold text-slate-700">Tâches effectuées</div>
        <p className="text-[11px] text-slate-400">
          Ajoutez plusieurs rôles si la mission en comporte (ex. « Product Owner », « Consultant Semarchy ») ; sinon laissez le titre vide.
        </p>
        {roles.fields.map((f, r) => (
          <ItemCard
            key={f.id}
            title={roleValues?.[r]?.title || (roles.fields.length > 1 ? `Rôle ${r + 1}` : "Tâches")}
            index={r}
            total={roles.fields.length}
            onMove={roles.move}
            onRemove={() => roles.remove(r)}
          >
            <Field label="Titre du rôle (optionnel, en gras)">
              <Input {...register(`experiences.${i}.roles.${r}.title`)} placeholder="Product Owner Semarchy" />
            </Field>
            <Field label={`Tâches (${toLines(roleValues?.[r]?.tasks).length})`} hint={LINES_HINT}>
              <TextArea {...register(`experiences.${i}.roles.${r}.tasks`)} rows={6} placeholder={"Recueillir et analyser les besoins…\nConcevoir des solutions…"} />
            </Field>
          </ItemCard>
        ))}
        <AddButton onClick={() => roles.append(emptyRole())}>Ajouter un rôle</AddButton>
      </div>

      <Field label="Environnement technique" hint="Séparé par des virgules (ou une technologie par ligne).">
        <TextArea {...register(`experiences.${i}.environment`)} rows={2} placeholder="SQL Server, SSIS, Power BI" />
      </Field>

      <div className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-slate-600">
        <label className="flex items-center gap-2">
          <input type="checkbox" {...register(`experiences.${i}.inCareer`)} className="h-4 w-4 accent-itec" />
          Afficher dans le résumé de carrière
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" {...register(`experiences.${i}.pageBreakBefore`)} className="h-4 w-4 accent-itec" />
          Commencer sur une nouvelle page
        </label>
      </div>
    </>
  );
}
