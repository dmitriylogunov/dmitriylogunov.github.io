### Step 10 — Cleanup, responsive pass, docs
**Tier:** T1  **Depends on:** all previous
**Risk flags:** none

**Goal:** No dead code or stale references remain from the restructure; the new components hold up at mobile widths; project docs describe the new content model.

**Scope:** IN: dead-code removal, small responsive CSS fixes to components introduced by this plan, `CLAUDE.md`/`README.md` updates, final full verification. OUT: redesigning anything; touching post content; new features.

**Implementation guide:**
- **Dead code sweep** (verify each before deleting — steps may already have removed them):
  - `index.markdown`: no leftover expansion JS, `page-links` block, or unused includes (step 5 should have removed; confirm).
  - Unused SCSS: if `.posts-ribbon`-era rules reference classes that no longer exist anywhere (`grep -r <class> --include='*.html' --include='*.markdown'`), remove them; when in doubt, keep.
  - `_config.yml`: `profession` field — still used by the header for the tagline (step 4); do NOT remove. `contacts` list still feeds the footer/contact modal; keep.
  - Any remaining reference to `site.data.posts` anywhere (`grep -r "data.posts"`) — must be zero.
- **Responsive pass** at 375px and 768px on: showcase strip (step 5), tag chips (step 6), post-note (step 7), 4-item menu (step 4). Fix only overflow/wrapping/tap-target issues in the corresponding `_sass` partials; bump `css_version` if CSS changes.
- **Docs:**
  - `CLAUDE.md`: update the File Structure section — add `_posts/` (posts with `notes:` front matter, tag taxonomy thoughts/making), `_includes/post-card.html`, `assets/js/feed-filter.js`, `test/`; note the CI commands. Keep the SASS compatibility section untouched.
  - `README.md`: one short paragraph on how to add a post (file naming, front matter, tags) and how to add a note to an existing post (the step-07 schema, copied exactly).
- **Final verification:** full build + htmlproofer + all Vitest suites; also run htmlproofer once WITHOUT `--ignore-missing-alt` and list (not fix) any remaining alt gaps in the PR description as a follow-up note.

**Test cases:**
- Site: `no stale data source` — repo grep for `data.posts` returns nothing; `_data/posts.yml` absent.
- Site: `full suite green` — every existing test file (`sample`, `site`, `feed-filter`) passes unchanged (this step must not break earlier steps' assertions).
- Site: `htmlproofer clean` — the standard htmlproofer command exits 0.

**Done when:** all Test cases green, docs updated, and the PR lists the alt-text gaps (if any) as follow-ups.

**Verification commands:**
```bash
bundle exec jekyll build
bundle exec htmlproofer _site --disable-external --allow-hash-href --ignore-missing-alt
bundle exec htmlproofer _site --disable-external --allow-hash-href || true   # alt-gap listing only
npm test
```

**Manual verification (goes in the PR description):**
1. `bundle exec jekyll serve`; walk Home → post → Work → Projects → Contacts at desktop and 375px width — no layout breakage, no dead links.
2. Confirm README's "add a post" instructions by dry-reading them against an actual `_posts` file.
