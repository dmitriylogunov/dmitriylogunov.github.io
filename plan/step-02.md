### Step 02 — CI + test scaffolding (Actions, html-proofer, Vitest)
**Tier:** T1  **Depends on:** — (does not need step 01's outputs; may proceed while step 01 is pending)
**Risk flags:** config/env change (new CI workflow, Gemfile, package.json, `_config.yml` excludes)

**Goal:** Every push/PR is validated: Jekyll build succeeds, html-proofer passes on `_site/`, Vitest runs. Local devs can run the same three commands. No deployment change — classic GitHub Pages keeps publishing `main` untouched.

**Scope:** IN: `.github/workflows/ci.yml`, Gemfile test group, `package.json` + Vitest with one sample test, `_config.yml` `exclude:` list, `.gitignore`. OUT: any site content/markup change; any deploy automation; Cypress (decided against).

**Implementation guide:**
- `Gemfile`: add `group :test do gem "html-proofer", "~> 5.0" end`. Run `bundle install` (updates `Gemfile.lock` — commit it).
- `package.json` (repo root): `"type": "module"`, devDependency `vitest` (^3), script `"test": "vitest run"`. Commit `package-lock.json`. `.gitignore`: add `node_modules/` (check file exists first; create if missing).
- `test/sample.test.js`: trivial passing test (e.g. asserts `1 + 1 === 2`) proving the harness; replaced by real tests in later steps — keep the file, later steps add siblings.
- `_config.yml` `exclude:` — currently commented out. Add a real `exclude:` list: `node_modules`, `package.json`, `package-lock.json`, `test`, `plan`, `WORKFLOW.md`, `Gemfile`, `Gemfile.lock`, `README.md`, `CLAUDE.md`, `Rakefile`, `vendor`. Pitfall: adding `exclude:` REPLACES nothing (Jekyll merges with its defaults in 4.x but NOT in 3.x) — include `vendor` and `Gemfile*` explicitly so classic Pages (Jekyll 3) also excludes them. Verify after build that `_site/plan/` and `_site/test/` do not exist.
- `.github/workflows/ci.yml`: trigger `push` (ALL branches — step commits on `site-reframe` must get checks, since no PR exists until the end of the plan) + `pull_request`. One job, ubuntu-latest: `ruby/setup-ruby@v1` (ruby 3.2, `bundler-cache: true`), `actions/setup-node@v4` (node 20, `cache: npm`), then `npm ci`, `bundle exec jekyll build`, `bundle exec htmlproofer _site --disable-external --allow-hash-href --ignore-missing-alt`, `npm test`.
- html-proofer flags rationale (keep them): `--disable-external` (no flaky external link checks in CI), `--allow-hash-href` (site uses `#footer` anchors), `--ignore-missing-alt` (legacy images; do not fix alts in this step).
- Pitfall: html-proofer 5 will flake on the Font Awesome CDN/`javascript:void(0)` hrefs only if external checks are on — they're off; do not "fix" those links here.

**Test cases:**
- Unit: `sample harness runs` — `test/sample.test.js` passes under `vitest run`.
- Build: `jekyll build clean` — `bundle exec jekyll build` exits 0 and `_site/index.html` exists.
- Build: `plan excluded from site` — `_site/plan` and `_site/test` directories absent after build.
- Build: `htmlproofer passes` — the exact CI htmlproofer command exits 0 locally.

**Done when:** all Test cases green, and the CI workflow file is valid (after pushing the step commit on `site-reframe`, the Actions run for that push is green).

**Verification commands:**
```bash
bundle install && npm ci
bundle exec jekyll build
test ! -d _site/plan && test ! -d _site/test && echo excludes-ok
bundle exec htmlproofer _site --disable-external --allow-hash-href --ignore-missing-alt
npm test
```

**Manual verification (goes in the PR description):**
1. Open the repo's Actions tab — the `ci` workflow ran green for the `site-reframe` push.
2. Run `bundle exec jekyll serve` and browse http://localhost:4000 — the site looks unchanged.
