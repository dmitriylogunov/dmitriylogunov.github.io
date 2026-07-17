# dmitriylogunov.info — Site Reframe Implementation Plan

Workflow rules for every step live in `../WORKFLOW.md` (invariant; read once).

## Revision log

- **Rev 3 (2026-07-17):** Light strip controller dropped from the plan by the owner — step 09 SUPERSEDED (no light strip post, no project card, no owner text/photo needed). Step 01 thereby lost its last pending required output and is COMPLETE (pegasus images on `main`; meme image stays optional). Affected: step-01, step-09, step index.
- **Rev 2 (2026-07-17):** Branching strategy changed by the owner: one feature branch `site-reframe` for the whole plan, one commit per step, a single PR to `main` after the final step (WORKFLOW.md rewritten accordingly). Steps 08/09 are no longer parallel-safe (single branch — strictly sequential). Step 02's CI trigger widened to all-branch pushes so step commits get checks without PRs. Step 01 updated with partial completion status.

## Overview

Personal site of Dmitriy Logunov at dmitriylogunov.info, currently portfolio/job-seeker shaped. This plan reframes it as **"the place where all my creations and thoughts live"**: posts become first-class citizens (real Jekyll posts with permalinks, tags, one unified chronological stream), the home page becomes feed-dominant with a compact showcase strip of work/project cards above it, and job-search signalling is removed from the header (the Work page stays professional, including its hire-me CTA and resume downloads).

Two content entities exist after this plan: **posts** (the feed) and **notes** — author annotations attached to posts later, rendered in a joint-authoring style (the author commenting on their own past post), NOT comment-thread style. There is no separate "Notes" or "Making things" page; the single feed is tagged (`thoughts` / `making`) with client-side filtering.

The site deploys via **classic GitHub Pages** (no Actions deploy; CNAME + master-of-record on `main`). Production builds use GitHub Pages' Jekyll 3.x/older Sass — the local Gemfile (Jekyll 4.3.3) is for development only. Everything written must stay classic-Pages-safe: no custom plugins (only whitelisted ones like `jekyll-feed`), `@import` not `@use` in SCSS, legacy color functions (`darken`/`lighten`), per the repo's `CLAUDE.md`. CI added by this plan validates builds and runs tests but does not deploy.

Writing-style rule for ALL content edits in this plan (from `CLAUDE.md`): re-word minimally, for style only; keep the owner's original voice and intention; do not add new sentences beyond what a step explicitly specifies — added AI-sounding prose is a defect.

## Tech stack & conventions

- Stack: Jekyll (4.3.3 local / GitHub Pages 3.x in production), Liquid templates, SCSS in `_sass/` (compiled via `assets/css/styles.scss`), vanilla JS inline or in `assets/js/`, YAML data files in `_data/`.
- Structure after this plan:
  - `_posts/YYYY-MM-DD-slug.md` — all posts (front matter: `layout: post`, `title`, `tags`, optional `notes:` list)
  - `_layouts/main.html` (site chrome), `_layouts/post.html` (single post page)
  - `_includes/post-card.html` (one post rendered as a feed card; shared by home feed and post layout)
  - `_data/work.yml`, `_data/projects.yml` — unchanged card data sources
  - `assets/js/feed-filter.js` — ES module for tag filtering
  - `test/` — Vitest tests (unit + built-site assertions against `_site/`)
  - `plan/`, `WORKFLOW.md` — this plan (excluded from the Jekyll build)
- Conventions: one-line imperative commit messages. SASS: `@import` only, legacy color functions only. Bump `css_version` in `_config.yml` in any step that changes CSS (cache busting). Match existing template idiom (Liquid loops over data, inline `<script>` blocks where the page already does that).
- Testing: **Vitest** (latest 3.x) for JS units AND for built-site assertions (tests read files from `_site/` with node `fs`); **html-proofer ~> 5** validates the built site. No browser E2E (decided with owner). CI runs: `jekyll build` → `htmlproofer` → `vitest run`.
- Base branch: `main`; all step commits land on the single feature branch `site-reframe` (see WORKFLOW.md).

## Tag taxonomy (fixed — do not invent new primary tags)

Every post gets exactly one primary tag as the FIRST entry in `tags:`:
- `thoughts` — opinion/observation/tooling pieces
- `making` — hobby/personal-project log entries

Additional freeform tags may follow the primary one but nothing in this plan renders them.

## Out of scope (do not touch)

- About page; the Godot walking game ("Sable"); dog/beach photo; LinkedIn posting.
- Light strip controller — dropped in rev 3; no post, card, or mention anywhere on the site.
- Portrait replacement is an owner task — keep the current `profile_picture.jpg` everywhere until a new one appears.
- Work page's professional content beyond what step 08 specifies (the CTA section, resume links, and Vimeo figure stay).

## Step index

| Done | # | Step | Tier | Depends on | Risk |
|------|---|------|------|------------|------|
| [x]  | 1 | Owner-supplied assets and content | H | — | batch prerequisite for 8 |
| [x]  | 2 | CI + test scaffolding (Actions, html-proofer, Vitest) | T1 | — | config/env change |
| [x]  | 3 | Migrate posts to `_posts` with permalinks and tags | T3 | 2 | content migration |
| [x]  | 4 | Neutral identity + new top menu | T1 | 3 | config change |
| [ ]  | 5 | Home restructure: compact showcase + feed-dominant | T2 | 4 | — |
| [ ]  | 6 | Tag chips + client-side feed filter | T2 | 5 | — |
| [ ]  | 7 | Author-notes feature + first note on Game Asset Creation | T2 | 6 | — |
| [ ]  | 8 | Content edits: Test Assignment post, Onyx images/current role | T1 | 3, 1 | — |
| [ ]  | 9 | ~~Light strip controller: post + project card~~ SUPERSEDED (rev 3) | — | — | — |
| [ ]  | 10 | Cleanup, responsive pass, docs | T1 | all | — |

Step 1 is human-only and COMPLETE (rev 3). Step 9 is SUPERSEDED — agents skip from 8 straight to 10. Step 3 is T3: its implement phase ends a batch; the orchestrator runs "Stabilise step 03" (which amends the step commit, per WORKFLOW.md rule 4) before continuing. All steps are strictly sequential commits on `site-reframe`; the single PR to `main` opens after step 10.
