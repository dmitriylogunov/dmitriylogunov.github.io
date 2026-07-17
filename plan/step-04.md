### Step 04 — Neutral identity + new top menu
**Tier:** T1  **Depends on:** 3
**Risk flags:** config change (`_config.yml` site identity)

**Goal:** The site presents as a personal site, not a job-seeker portfolio: neutral title, tagline "Coding with Purpose and Passion", no job title in the header, and a four-item menu: Home | Work | Projects | Contacts.

**Scope:** IN: `_config.yml` identity fields, `_layouts/main.html` (head metas, header, nav), page `title:` front matter on `work.markdown` / `projects.markdown`, the two "page-links" footer paragraphs on `index.markdown` and `projects.markdown`. OUT: Work page body (its professional intro, CTA, resume links stay exactly as-is — the Work page remains the professional surface); home layout changes (step 5); any availability line (decided: none, anywhere).

**Implementation guide:**
- `_config.yml`:
  - `title: Dmitriy Logunov` (drop "— Senior Full Stack Developer").
  - `profession:` list → replace the single entry with `Coding with Purpose and Passion` (the header template loops `site.profession` into the `<p>` under the name — reusing the field keeps both mobile and desktop headers working untouched; check `_sass` doesn't style it in a way that assumes short text).
  - `description:` → `Personal site of Dmitriy Logunov — things I make and thoughts I share.`
- `_layouts/main.html`:
  - The four hardcoded meta description/OG/Twitter description strings (currently the "Senior Full-Stack Developer with 14 years…" sentence) → `{{ site.description }}`.
  - `meta keywords`: trim the job-search terms; keep name/location/tech words: `Dmitriy Logunov, Melbourne, software, projects, blog, React, TypeScript, game development`.
  - Nav (`.main-menu` ul): `Home` → `/`, `Work` → `/work` (label renamed from "Work and Education"; page content unchanged), `Projects` → `/projects`, `Contacts` → `/#footer` (plain href — works from every page; the footer already has `id="footer"`; do not add JS).
- `work.markdown` front matter `title:` → `Work — Dmitriy Logunov`. `projects.markdown` front matter `title:` → `Projects — Dmitriy Logunov`. `index.markdown` `title:` → `Dmitriy Logunov`.
- Bottom "page-links" paragraphs: on `index.markdown` and `projects.markdown` the line "Looking for my work? Check out my <a href=/work>work and education</a> history." → keep the link, relabel the anchor text to "work" (minimal rewording rule).
- Check `_sass/main.scss` for a `.main-menu` width/spacing assumption with only 2 items; adjust spacing if 4 items wrap badly on mobile (this is the only CSS allowed in this step; bump `css_version` if touched).

**Test cases:**
- Site: `menu has four items` — `_site/index.html` nav contains exactly the four links `/`, `/work`, `/projects`, `/#footer` with labels Home, Work, Projects, Contacts.
- Site: `no job title in header` — `_site/index.html` header section does not contain "Senior Full Stack Developer"; it does contain "Coding with Purpose and Passion".
- Site: `neutral metas` — `_site/index.html` og:description equals the new site description; `<title>` on home is `Dmitriy Logunov`.
- Site: `work page label renamed` — no page's nav contains "Work and Education".
- Site: `work page body untouched` — `_site/work/index.html` still contains "Looking to hire a senior developer?".

**Done when:** all Test cases green.

**Verification commands:**
```bash
bundle exec jekyll build
bundle exec htmlproofer _site --disable-external --allow-hash-href --ignore-missing-alt
npm test
npx vitest run test/site.test.js
```

**Manual verification (goes in the PR description):**
1. `bundle exec jekyll serve`; check header on desktop and narrow (mobile) widths — name + tagline render cleanly, menu shows 4 items without wrapping.
2. From /work, click Contacts — lands on home footer contact block.
