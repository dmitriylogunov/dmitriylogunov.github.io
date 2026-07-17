### Step 01 — Owner-supplied assets and content
**Tier:** H  **Depends on:** —
**Risk flags:** none (step 8 is blocked until this is done)

> **Status (2026-07-17): COMPLETE.** Both pegasus images are committed on `main` ("Add pegasus Kiosk images"). The light strip items were removed in rev 3 (post dropped from the plan); the meme image is optional and never blocks. Checkbox ticked in `plan/_overview.md`.

**Goal:** All owner-only inputs exist in the repo so later agent steps never stall waiting for a human.

**Actions (owner):**
1. **Onyx kiosk images.** ✅ Done — `pegasus_kiosk.png` and `pegasus_kiosk_card.png` (approved for public use) are in `assets/images/`, committed on `main`.
2. **Marketing-giant meme image (optional, any time).** For the author note on the Game Asset Creation post: an image of ever-bigger giants standing behind a character — code, assets, marketing. If you make/find one, save as `assets/images/posts/giants-meme.png` and commit. Step 07 ships the note as text-only if absent; the image can be added to the note's front matter later.

**Outputs:**
- `assets/images/pegasus_kiosk.png`, `assets/images/pegasus_kiosk_card.png` → consumed by step 08. ✅
- Optional `assets/images/posts/giants-meme.png` → consumed by step 07 (or added later).

**Done when:** the two pegasus images exist on `main` (met — 2026-07-17; the optional item never blocks).
