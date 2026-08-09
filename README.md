# Rock Gate — Frontend-Only GitHub Pages Preview

This directory is a **completely isolated, frontend-only static preview** of the
Rock Gate public website. It is a *copy* of the public-facing frontend, exported
to pure static HTML and intended to be deployed to GitHub Pages.

The **original project is intentionally untouched**. Nothing in this preview
modifies, deletes, or refactors any file outside this directory.

---

## 1. What this is

- A self-contained Next.js project that uses **static export** (`output: "export"`).
- Contains only the **public frontend**: landing page, contact, projects (listing
  + all case-study detail pages), navigation, footer, hero sections, cards,
  animations, images, icons, fonts, Tailwind styling, responsive layouts, SEO
  metadata, favicon, and Open Graph assets.
- Configured to work under the GitHub Pages base path: `https://zyadnasr.github.io/RockGate/`.

## 2. What is intentionally excluded

This preview is **frontend only**. The following are **not** copied and do not run:

- API route handlers (`app/api/`)
- Server-only authentication (`lib/auth/`, JWT, sessions)
- Database access
- Admin dashboard (`app/admin/`, `components/admin/`)
- Email sending backend (`lib/email/`)
- Server actions, `force-dynamic`, Node-only runtime features
- Secrets and private environment variables
- Server-only dependencies (`bcryptjs`, `jose`, `resend`, `server-only`, `sharp`)

### Preview-only adaptations

The following files are **preview copies** with a backend-only guard removed so
they run during static export:

- `lib/site.ts` — removed `import "server-only"`.
- `lib/structured-data.ts` — removed `import "server-only"`.
- `components/contact/contact-form.tsx` — the original posts to `/api/contact`;
  the preview short-circuits to a simulated success (no network). See the
  `PREVIEW MODE` comment for the TODO to restore the real submission in the
  production app.

## 3. Where the preview source lives

Everything lives inside `github-pages-preview/`:

```
github-pages-preview/
├── app/            # public pages + root layout + globals.css
├── components/     # public UI (admin/ excluded)
├── lib/            # data, site, projects, utils, validation, monitoring (client-safe)
├── types/          # shared types
├── images/         # imported image assets
├── public/         # static assets (icons, og images)
├── package.json
├── next.config.mjs
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.mjs
└── README.md
```

The `@/*` TypeScript path alias maps to the preview root, so all existing
imports work unchanged.

## 4. How to build it

```bash
cd github-pages-preview
npm install
npm run build
```

A successful build produces the static export in:

```
github-pages-preview/out/
```

`out/index.html` is the deployed homepage.

## 5. How to run it locally

Development server (served under `/RockGate/` because of `basePath`):

```bash
cd github-pages-preview
npm run dev
# open http://localhost:3000/RockGate/
```

Preview the static export as it will appear on GitHub Pages:

```bash
cd github-pages-preview
npx serve out
# open the printed URL (e.g. http://localhost:3000/RockGate/)
```

## 6. How it is deployed

A dedicated GitHub Actions workflow builds and deploys this preview to GitHub
Pages under the base path `/RockGate/`:

- `.github/workflows/github-pages-preview.yml`

The workflow checks out the repo, installs dependencies for
`github-pages-preview`, runs `next build`, uploads `github-pages-preview/out`
as a Pages artifact, and deploys it. It **only** touches this directory — it
never builds the original application.

> Setup note: in the GitHub repository, enable **Settings → Pages → Build and
> deployment → Source: GitHub Actions**. The repository's GitHub Pages site
> owner must be the same account that owns the repo (or use the project-site
> `RockGate` path convention).

## 7. How the production application stays unchanged

The production app continues to be developed in the original project as-is.
Any future backend features are added there. To refresh this preview with the
latest public frontend, re-copy the relevant public files into
`github-pages-preview/` and re-build. This preview is a parallel, throwaway
deployment surface — it has no coupling to the production backend.

---

*Created for the Rock Gate project. The original project remains the source of
truth for production development.*
