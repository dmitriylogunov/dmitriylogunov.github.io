# Notes for PR

## Step 02

**Deviation — html-proofer was silently checking nothing.** The command exactly as
specified in `plan/step-02.md` exits 0, but vacuously: it reported `Checking 0 internal
links` and passed a probe page containing a broken internal link and a missing image.
Cause: html-proofer 5.2.1 (the latest release) spawns `Async` subtasks in
`process_files` and never awaits them; with `async` >= 2.24 the parsed files come back
empty, so all three checks run over zero elements. Fixed by pinning `async` to `2.23.0`
in the Gemfile test group (comment there explains why). The gate is now verified honest:
it catches a broken internal link and a missing internal image, and reports
`Checking 11 internal links` on the real site.

**Deviation — two extra changes needed once the gate started working**, both outside
step 02's stated scope ("OUT: any site content/markup change"):

1. `--no-enforce-https` added to the htmlproofer command (CI + local verification).
   Without it the build fails on `http://koenigbicycle.ru`, linked from `index.markdown`
   and `projects.markdown`. Making that link HTTPS is a content decision (and the target
   may not serve HTTPS), so it is left for the owner rather than changed here.
   **Owner decision needed:** either switch that link to HTTPS / drop it and remove this
   flag, or keep the flag.
2. `data-proofer-ignore` added to the `<img>` in `_includes/image-overlay.html`. That
   image is the lightbox placeholder whose `src` is assigned at runtime by
   `openImageOverlay()`, so it legitimately has no `src` and html-proofer flags it on
   all 7 pages that include it. This is the html-proofer-sanctioned exemption and keeps
   the Images check active everywhere else; the alternative (dropping the Images check)
   would have blinded a check that later steps' post images need.

**Note on Ruby version.** CI pins ruby 3.2 per the step file; local dev here is ruby
3.1.0. Both resolve the same lockfile.

## Step 03 (stabilise)

**All tests passed on the first run; no implementation fixes were needed.** The tests,
html-proofer and the build were green as committed.

**Deviation — kramdown smart quotes disabled to preserve verbatim rendering.** The step's
"Done when" requires the rendered home feed to match production with the same bodies. A
diff of the feed rendered from the pre-migration commit against the migrated one showed
the posts, their order and their bodies are identical — but 24 apostrophes had turned
curly. Cause: post bodies are markdown paragraphs wrapping raw HTML blocks (lists, Vimeo
figures); kramdown applies smart quotes to the paragraphs and passes the raw HTML through
untouched, so a single post ended up with both (`I’m happy` and `I've got it working` in
Vibe Coding). Rendering from `_data/posts.yml` had never smartified anything. Fixed with
`kramdown: {smart_quotes: apos,apos,quot,quot}` in `_config.yml`, which restores straight
apostrophes everywhere; the feed text is now byte-identical to the production render.

**Owner decision needed:** this keeps today's straight-quote typography. If you would
rather have proper curly apostrophes site-wide, that is a content change, not a config
one — the raw HTML lists inside the posts would need converting to markdown so kramdown
smartifies them too, otherwise the mixed rendering comes back. Left as-is here since the
step forbids rewording the posts.

**Testing caveat worth knowing.** `test/site.test.js` reads `_site/`, and a failed
`jekyll build` leaves the previous `_site` in place — so locally the suite can pass green
against a stale build. CI is not exposed to this (its `jekyll build` is a separate step
that fails the job), but when running the tests by hand, check the build succeeded.

## Step 05

**Deviation — projects-page test threshold.** Step 05's test spec asks the "projects
page untouched" check to assert `project-card count ≥ 6`, but `_data/projects.yml`
currently holds only 4 projects, so the built `/projects` grid has 4 cards. The real
invariant this step must protect is that step 5 does not touch the /projects grid, so
the test asserts `≥ 4` and that all four project titles are still present, rather than an
unreachable `≥ 6`. No projects were added (out of scope); this is a stale number in the
plan, not a regression.

## Step 08

**JET Charge duplication check — no duplication found.** Grepping `jetcharge`/`JET Charge`
across `_data/work.yml`, `work.markdown` and `jetcharge.markdown` shows a single Onyx-adjacent
JET Charge entry in `work.yml` (title + one description) and its dedicated detail page
`jetcharge.markdown`. The detail page repeating the description is by design, not the
duplicated paragraph the original brief flagged. Nothing was deleted.

**Deviation (owner-confirmed) — Onyx start year.** Step-08 contradicted itself: its prose
implementation guide says set the Onyx `date` to "2026 — present", while its test-case
section asserts the built page shows "2024 — present". The owner confirmed **2026 — present**
is correct, so the data and the test both use "2026 — present"; the step's "2024" test string
was the stale side of the contradiction and is not used.

**Note — second Onyx image placement.** The timeline include supports a single `image:` per
entry, so the card thumbnail uses `pegasus_kiosk_card.png` and the full kiosk photo
`pegasus_kiosk.png` is embedded as a markdown image at the end of the Onyx description (the
timeline markdownifies descriptions). Both images therefore appear on /work.
