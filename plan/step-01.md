### Step 01 — Owner-supplied assets and content
**Tier:** H  **Depends on:** —
**Risk flags:** none (but steps 8 and 9 are blocked until this is done)

**Goal:** All owner-only inputs exist in the repo (or in a known staging spot) so later agent steps never stall waiting for a human.

> **Status (2026-07-17):** PARTIAL. Action 1 is done — both pegasus images are committed on `main` ("Add pegasus Kiosk images"). Actions 2–4 pending: `plan/assets/light-strip-post.md` does not exist yet (required — blocks step 09), no light strip photo, no meme image (both optional). Do not tick this step until action 2 is done.

**Actions (owner):**
1. **Onyx kiosk images.** ✅ Done — `pegasus_kiosk.png` and `pegasus_kiosk_card.png` (approved for public use) are in `assets/images/`, committed on `main`.
2. **Light strip post text.** Write the ~220-word light strip controller write-up and save it as `plan/assets/light-strip-post.md` (plain markdown, no front matter — step 09 wraps it). Include what it is, the hardware/stack, and one thing learned; your voice, no polish needed.
3. **Light strip photo (optional but recommended).** Add one photo of the light strip in action as `assets/images/projects/lightstrip.png` (or `.jpg` — note the actual name in the text file from action 2 if it differs). Used for the project card; step 09 falls back to no image if absent.
4. **Marketing-giant meme image (optional).** For the author note on the Game Asset Creation post: an image of ever-bigger giants standing behind a character — code, assets, marketing. If you make/find one, save as `assets/images/posts/giants-meme.png`. Step 07 ships the note as text-only if absent; the image can be added to the note's front matter later.
5. Commit the remaining items as one commit — on `site-reframe` if it exists (message `Step 01: add owner assets and light strip text`), otherwise on `main` (the next agent merges `main` into `site-reframe` per WORKFLOW.md rule 12) — and tick this step's checkbox in `plan/_overview.md` in that same commit.

**Outputs:**
- `assets/images/pegasus_kiosk.png`, `assets/images/pegasus_kiosk_card.png` → consumed by step 08.
- `plan/assets/light-strip-post.md` (+ optional project photo) → consumed by step 09.
- Optional `assets/images/posts/giants-meme.png` → consumed by step 07 (or added later).

**Done when:** the two pegasus images and `plan/assets/light-strip-post.md` exist on `main` (agents can verify by file presence; items 3–4 are optional and never block).
