### Step 09 — Light strip controller: post + project card
**Tier:** T1  **Depends on:** 3 and 1 — parallel-safe with step 08 (disjoint files)
**Risk flags:** none

**Goal:** The light strip controller exists as a `making` post in the feed, and as a project card whose "View" action points to that post (card → post, per the resolved duplication rule).

**Scope:** IN: one new `_posts` file, one new entry in `_data/projects.yml`. OUT: any edit to the owner's supplied text beyond formatting (front matter, paragraph breaks); a dedicated project page; LinkedIn posting (separate task, not a site change).

**Implementation guide:**
- **Prerequisite check:** step 01 ticked; `plan/assets/light-strip-post.md` exists. If missing, stop per WORKFLOW.md rule 12.
- **Post:** create `_posts/<today>-light-strip-controller.md`, front matter `title: Light Strip Controller`, `tags: [making]`. Body = the owner's text from `plan/assets/light-strip-post.md` **verbatim** (repo `CLAUDE.md`: re-word minimally if at all; do not add sentences). If the owner's file references a photo, embed it with a markdown image pointing at the actual asset path noted in that file (expected: `assets/images/projects/lightstrip.png`).
- **Project card:** append to `_data/projects.yml` (read an existing entry first and mirror its exact field set):
  - `title: Light Strip Controller`
  - `short_description` / `technologies`: derive strictly from facts stated in the owner's text (hardware + stack words only — no invented claims).
  - `image: lightstrip.png` if the file exists under `assets/images/projects/` (that's the path prefix projects cards use); omit `image` otherwise.
  - `link: /posts/light-strip-controller/`, `cta_text: Read the story`.
  - `is_highlight: false` initially — the home showcase strip (step 5) shows only the first 3 highlights and the owner hasn't chosen to displace one; the card appears on /projects.
  - Pitfall: `projects.markdown` and the home strip render `link` with `target="_blank"` for external links; the project-card template treats any link containing `http` as external — this internal `/posts/...` link must open in the same tab. Verify the template's `{% if project.link contains 'http' %}` branch handles it (it does — the relative link takes the non-http branch); do not add `http` to the link.
- Post permalink follows step 3's `/posts/:title/` config — the card link above must match the built page exactly (html-proofer will catch a mismatch).

**Test cases:**
- Site: `post page exists` — `_site/posts/light-strip-controller/index.html` exists, contains the post title and a `post-tag` label "making".
- Site: `post in feed` — `_site/index.html` article count is now 11, light strip post positioned by its date, `data-tags` contains `making`.
- Site: `card on projects page` — `_site/projects/index.html` contains a card titled "Light Strip Controller" whose action link href is `/posts/light-strip-controller/` without `target="_blank"`.
- Site: `filter picks it up` — the new article's `data-tags` makes it visible under the Making chip (assert `data-tags="making"` present on it).

**Done when:** all Test cases green.

**Verification commands:**
```bash
bundle exec jekyll build
bundle exec htmlproofer _site --disable-external --allow-hash-href --ignore-missing-alt
npm test
npx vitest run test/site.test.js
```

**Manual verification (goes in the PR description):**
1. `bundle exec jekyll serve`; home feed shows the light strip post; Making chip includes it.
2. /projects — card present; clicking its button opens the post in the same tab.
