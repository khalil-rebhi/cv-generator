# ITEC CV generator

A web app to write ITEC CVs quickly. You fill in a form, the CV preview updates as you type, and you download a Word file (`.docx`) that is identical to the official ITEC template: logo, CV code in the header, bordered tables, blue headings and legal footer.

To get the PDF, open the downloaded file in Word and use **File → Save As → PDF**. Word does the conversion, so the PDF matches the Word file exactly.

## How it works

- `public/templates/cv-itec.docx` is the original ITEC CV with its text replaced by placeholders (`{title}`, `{#experiences}`…). The design isn't rebuilt in code. It's the original Word file.
- In the browser, [docxtemplater](https://docxtemplater.com) fills that template with the form data, and [docx-preview](https://github.com/VolodymyrBaydalka/docxjs) shows the result live.
- There's no server and no external API. CV data never leaves the user's computer. It's auto-saved in the browser (`localStorage`) and can be exported or imported as JSON.

## Stack

Next.js 15 (static export) · React 19 · TypeScript · Tailwind CSS · react-hook-form · docxtemplater + PizZip · docx-preview

## Development

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # static site in out/
npm run lint         # TypeScript check
```

## Netlify deployment

The `netlify.toml` file is already configured (build `npm run build`, folder `out`, Node 20).

1. Push the repo to GitHub, GitLab or Bitbucket.
2. In Netlify, go to **Add new site → Import an existing project** and pick the repo.
3. Keep the detected settings and click **Deploy**.

Every push to the main branch redeploys the site. Netlify's free plan allows commercial use.

## Changing the template

To update the design (logo, footer, colours…):

1. Put the source Word CV in `templates/source/CV_ITEC_WME.docx`. It's ignored by git because it contains personal data.
2. Run `npm run template`. This regenerates `public/templates/cv-itec.docx`.
3. Check the result with `npm run sample`, which writes `out-sample/CV_ITEC_WME.docx`.

The script `scripts/build-template.mjs` checks that the structure is as expected (section titles, tables) and stops with a clear message if the source document has changed too much.

You can also edit `public/templates/cv-itec.docx` directly in Word, as long as the `{…}` tags stay intact.

### Checking against Word locally (Windows + Word)

```powershell
powershell -ExecutionPolicy Bypass -File scripts/to-pdf.ps1 out-sample/CV_ITEC_WME.docx
```

## Project layout

```
public/templates/cv-itec.docx   Word template (placeholders)
public/logo-itec.png            logo shown in the app
scripts/build-template.mjs      original CV → template
scripts/render-sample.ts        generates the example CV without a browser
src/lib/types.ts                form data model
src/lib/format.ts               form data → template data (French dates, bullets…)
src/lib/generate.ts             .docx generation
src/lib/sample.ts               example CV
src/components/CvForm.tsx       form
src/components/LivePreview.tsx  live preview
src/app/page.tsx                page (toolbar, download, auto-save)
```
