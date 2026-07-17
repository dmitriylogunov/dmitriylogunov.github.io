### Step 05 — Home restructure: compact showcase + feed-dominant
**Tier:** T2  **Depends on:** 4
**Risk flags:** none

**Goal:** The home page reads as: header → one slim "showcase" strip of small work/project cards → the post feed as the main body → footer. The feed is the page's centre of gravity; the big expandable card grids are gone from Home (they live on /work and /projects).

**Scope:** IN: `index.markdown` restructure, a `showcase` compact-card partial + SCSS, removal of home-only card-expansion JS, feed section heading. OUT: /projects and /work pages (unchanged); tag chips/filtering (step 6); post-card internals (owned by step 3; do not modify `_includes/post-card.html` here).

**Implementation guide:**
- New `_includes/showcase-strip.html`: one horizontal strip (CSS grid `grid-auto-flow` row or flex with `overflow-x: auto` on mobile) of **compact cards**. Data: `site.data.work | where: "is_highlight", true | limit 3` then `site.data.projects | where: "is_highlight", true | limit 3`. Compact card = image thumbnail (if any), title, one-line tech string; the WHOLE card is an `<a>` — work cards link to `/work`, project cards to the project's `link` (external target=_blank when http). No expand/collapse, no close buttons, no overlay JS.
- `index.markdown` becomes, in order:
  1. `## Making and doing` (or no heading — implementer picks whichever looks cleaner at both widths; if a heading, exactly that text) + `{% include showcase-strip.html %}` + two small links right-aligned under the strip: "All work →" (/work) and "All projects →" (/projects).
  2. `# Posts` heading + the existing `posts-ribbon` loop from step 3, unchanged.
  3. Remove: the old `# Work` card section, the `# Side projects` section with its hidden `additional-project` cards, `toggleProjects()` and ALL the card-expansion `<script>` content, and the bottom "page-links" paragraph (the menu now covers navigation). Keep `{% include image-overlay.html %}` ONLY if something on the page still uses it — after this step nothing on Home does, so remove it too.
- SCSS: new `_sass/showcase.scss` (`@import "showcase";` added in `assets/css/styles.scss` — remember `@import`, never `@use`). Compact card: fixed height ~90px, thumbnail left (~72px square, `background-size: cover`), title + tech right, hover lift consistent with existing `.project-card` hover. Reuse `$` color variables from `variables.scss`; legacy color functions only. Bump `css_version`.
- Pitfall: `site.data.work` first entry (Onyx) has no `image` until step 08 — the compact card must render acceptably imageless (title block simply starts at left padding). Do not special-case Onyx.
- Pitfall: Liquid `where` + `limit` — `limit` is a `for` parameter, not a filter; structure loops as `{% for item in highlighted limit: 3 %}`.
- Contract for step 6: the feed section keeps container `div.posts-ribbon` with the `# Posts` heading directly above it; step 6 inserts a chip bar between heading and ribbon.

**Test cases:**
- Site: `showcase strip present` — `_site/index.html` contains 6 compact-card anchors (3 linking to `/work`, 3 to project links).
- Site: `no expandable grid on home` — `_site/index.html` contains no `additional-project` class, no `toggleProjects`, and no `expand-projects-btn`.
- Site: `feed intact below strip` — `_site/index.html` still contains 10 `<article class="post-card"` occurrences, and the showcase strip markup appears before the first article.
- Site: `projects page untouched` — `_site/projects/index.html` still contains its full card grid (`project-card` count ≥ 6).
- Unit: `styles compile` — `bundle exec jekyll build` exits 0 (Sass compile is part of build; failure = `@use`/module-function slip).

**Done when:** all Test cases green, and the page visually reads feed-first at 1280px and 375px widths.

**Verification commands:**
```bash
bundle exec jekyll build
bundle exec htmlproofer _site --disable-external --allow-hash-href --ignore-missing-alt
npm test
npx vitest run test/site.test.js
```

**Manual verification (goes in the PR description):**
1. `bundle exec jekyll serve`; on desktop the strip is one slim row, posts dominate the viewport after a small scroll.
2. At 375px width the strip scrolls horizontally (or wraps to 2 rows — whichever was implemented) without pushing the feed below the fold entirely.
3. Click a work compact card → /work; a project compact card → project site in new tab.
