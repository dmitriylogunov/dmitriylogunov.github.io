### Step 08 — Content edits: Test Assignment post, Onyx images/current role
**Tier:** T1  **Depends on:** 3 and 1 — parallel-safe with step 09 (disjoint files)
**Risk flags:** none

**Goal:** The Test Assignment post loses its job-search framing; the Onyx Gaming entry gets its approved images and reads as the current role.

**Scope:** IN: `_posts/2025-11-11-test-assignment-walkthrough.md`, the Onyx entry in `_data/work.yml`, a JET Charge duplication check. OUT: any other post or work entry; any rewording beyond the exact edits below (repo `CLAUDE.md`: keep the owner's voice; add nothing).

**Implementation guide:**
- **Prerequisite check:** step 01 must be ticked; verify `assets/images/pegasus_kiosk.png` and `assets/images/pegasus_kiosk_card.png` exist. If missing, stop per WORKFLOW.md rule 12.
- **`_posts/2025-11-11-test-assignment-walkthrough.md`** — three edits, nothing else:
  1. Delete the entire opening paragraph `<strong>I'm currently looking for a new role</strong> … chat.</a>.` (including its `#footer` link/onclick).
  2. Fold the permission sentence into the (now-first) paragraph: the standalone line `I'm sharing this with permission from the company.` is deleted, and the first paragraph's opening becomes `I'm sharing, with permission from the company, a walkthrough presentation of a recent developer test assignment - a React project built for a front-end role application.` (rest of the paragraph unchanged).
  3. In the Vimeo `<figure>`, delete the `<figcaption>` line ("Walkthrough: component structure, tests, and accessibility") — the bullet list above already covers it. Keep the figure/iframe otherwise byte-identical.
- **`_data/work.yml` Onyx Gaming entry (first entry):**
  - Add `image: "pegasus_kiosk_card.png"` (card/thumbnail usage — matches how other entries reference files directly under `assets/images/`).
  - Change `date: 2026` → `date: 2024 — present` (quoted string). Pitfall: check `_includes/timeline.html` / `timeline-item.html` first — if either parses `date` as a number or uses it for sorting, instead keep `date: 2026` and add a display field the timeline already supports; if (as expected) it's display-only interpolation, the string is safe. Entries are rendered in file order, so sorting is not data-driven.
  - Description: keep the existing text but shift the completed-shipping framing to current-work framing with minimal edits: `I worked on` → `I am working on`, and `I shipped an MVP to production and contributed to Stage 2 development, extending the backend as needed to support the UI.` → `I shipped an MVP to production and am now contributing to Stage 2 development, extending the backend as needed to support the UI.` No other wording changes.
  - The second image `pegasus_kiosk.png` (the kiosk photo): check how other entries expose extra images (e.g. La Trobe's `image:` plus any gallery field). If the timeline supports only one `image`, use `pegasus_kiosk_card.png` there and place `pegasus_kiosk.png` as an inline image at the end of the Onyx `description` (markdown image — descriptions are `markdownify`'d; verify against timeline include first). Both images must end up visible somewhere on /work.
- **JET Charge duplication check:** planning found only one JET Charge entry in `_data/work.yml` — the duplication flagged in the original brief appears already fixed. Grep `jetcharge\|JET Charge` across `work.yml`, `work.markdown`, `jetcharge.markdown`; if a duplicated description paragraph is genuinely found, delete the duplicate; otherwise state "no duplication found" in the PR.
- Home showcase strip (step 5) picks up the Onyx image automatically via `is_highlight` — no home change needed.

**Test cases:**
- Site: `job-search intro gone` — neither `_site/index.html` nor `_site/posts/test-assignment-walkthrough/index.html` contains "I'm currently looking for a new role".
- Site: `permission folded` — the post page contains "I'm sharing, with permission from the company, a walkthrough".
- Site: `figcaption gone` — the post page contains no "Walkthrough: component structure" figcaption; the Vimeo iframe is still present.
- Site: `onyx images live` — `_site/work/index.html` references `pegasus_kiosk_card.png`, and `pegasus_kiosk.png` appears somewhere in built output; both files exist in `_site/assets/images/`.
- Site: `onyx reads current` — `_site/work/index.html` contains "2024 — present" and "am now contributing to Stage 2".

**Done when:** all Test cases green, plus the PR states the JET Charge duplication check result.

**Verification commands:**
```bash
bundle exec jekyll build
bundle exec htmlproofer _site --disable-external --allow-hash-href --ignore-missing-alt
npm test
npx vitest run test/site.test.js
```

**Manual verification (goes in the PR description):**
1. `bundle exec jekyll serve`; open the Test Assignment post — reads naturally without the job-search opener; video plays.
2. /work — Onyx entry is first, shows the card image, "2024 — present", and the kiosk photo is visible (card or description).
3. Home showcase strip — Onyx compact card now has a thumbnail.
