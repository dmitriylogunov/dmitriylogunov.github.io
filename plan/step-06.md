### Step 06 — Tag chips + client-side feed filter
**Tier:** T2  **Depends on:** 5
**Risk flags:** none

**Goal:** The home feed can be filtered by primary tag via chips (All | Thoughts | Making). Filtering is instant, client-side, and URL-reflected (`#tag=making`) so filtered views are shareable. Each post card shows its tag as a small label.

**Scope:** IN: `assets/js/feed-filter.js` (ES module), chip bar on `index.markdown`, tag label inside `_includes/post-card.html`, SCSS for chips/labels, Vitest unit tests. OUT: tag pages/permalinks per tag (not wanted); filtering on any page other than Home; new tags beyond `thoughts`/`making`.

**Implementation guide:**
- `assets/js/feed-filter.js` — pure logic separated from DOM wiring so Vitest tests it without a browser:
  ```js
  // pure — exported for tests
  export function isVisible(cardTags, activeTag) { /* activeTag null/'all' → true; else cardTags.split(' ').includes(activeTag) */ }
  export function tagFromHash(hash) { /* '#tag=making' → 'making'; '' or junk → null */ }
  export function hashFromTag(tag) { /* 'making' → '#tag=making'; null → '' (strip) */ }
  // DOM wiring — reads [data-tags] articles and [data-tag] chips
  export function initFeedFilter(doc = document) { ... }
  ```
  `initFeedFilter`: on chip click set `location.hash` and re-apply; on load read `tagFromHash(location.hash)` and apply; apply = toggle a `hidden` attribute (or `.is-hidden` class) per article via `isVisible(article.dataset.tags, activeTag)`, and set `aria-pressed`/`.active` on the current chip. Listen to `hashchange` too.
  Pitfall: classic GitHub Pages serves this as a static file — fine — but the page must load it with `<script type="module" src="/assets/css/../js/feed-filter.js">`… use `{{ '/assets/js/feed-filter.js' | relative_url }}?v={{ site.css_version }}` and call `initFeedFilter()` from an inline module script. No bundler exists; keep the file dependency-free.
- `index.markdown`: between the `# Posts` heading and `.posts-ribbon` (contract from step 5), add the chip bar:
  ```html
  <div class="tag-chips" role="group" aria-label="Filter posts">
    <button class="tag-chip" data-tag="all" aria-pressed="true">All</button>
    <button class="tag-chip" data-tag="thoughts" aria-pressed="false">Thoughts</button>
    <button class="tag-chip" data-tag="making" aria-pressed="false">Making</button>
  </div>
  ```
- `_includes/post-card.html`: add a small tag label inside the card near `<time>`: `<span class="post-tag post-tag--{{ include.post.tags | first }}">{{ include.post.tags | first }}</span>`. This is the one sanctioned modification to the step-3 include; keep the rest byte-identical. Note: the label renders on single-post pages too (layout reuses the include) — that's desired.
- SCSS: `_sass/feed-filter.scss`, imported from `assets/css/styles.scss`. Chips = pill buttons using existing `$accent_*` variables; active state uses `$highlight`. `.post-tag` = small uppercase label; two modifier colors (`--thoughts`, `--making`) derived with `darken()`/`lighten()` only. Bump `css_version`.
- `test/feed-filter.test.js`: unit tests below against the pure functions (import directly — `package.json` is `type: module`).

**Test cases:**
- Unit: `isVisible all` — `isVisible('thoughts', 'all')` and `isVisible('making', null)` → true.
- Unit: `isVisible match` — `isVisible('making', 'making')` → true; `isVisible('thoughts extra', 'making')` → false.
- Unit: `isVisible multi-tag` — `isVisible('making ai', 'ai')` → true (secondary tags still match if ever used).
- Unit: `tagFromHash roundtrip` — `tagFromHash('#tag=making')` → `'making'`; `tagFromHash('#footer')` → null; `tagFromHash(hashFromTag('thoughts'))` → `'thoughts'`.
- Unit: `hashFromTag null` — `hashFromTag(null)` → `''`.
- Site: `chip bar rendered` — `_site/index.html` contains three `tag-chip` buttons with `data-tag` values all/thoughts/making.
- Site: `tag labels rendered` — every `<article class="post-card"` on home contains a `post-tag` span whose text is thoughts or making.
- Site: `module loaded` — `_site/index.html` references `feed-filter.js`.

**Done when:** all Test cases green.

**Verification commands:**
```bash
bundle exec jekyll build
bundle exec htmlproofer _site --disable-external --allow-hash-href --ignore-missing-alt
npm test
npx vitest run test/feed-filter.test.js
```

**Manual verification (goes in the PR description):**
1. `bundle exec jekyll serve`; click "Making" — only the 3 making posts remain visible; URL shows `#tag=making`.
2. Reload with `#tag=making` in the URL — filter applies on load; click "All" — everything returns, hash clears.
3. Keyboard: tab to chips, activate with Enter — filter works; `aria-pressed` follows the active chip.
