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
