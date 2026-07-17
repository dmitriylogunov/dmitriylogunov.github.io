### Step 03 — Migrate posts to `_posts` with permalinks and tags
**Tier:** T3  **Depends on:** 2
**Risk flags:** content migration (single source of truth moves from `_data/posts.yml` to `_posts/`)

**Goal:** All 10 existing feed posts become real Jekyll posts with individual permalink pages and a primary tag; the home feed renders from `site.posts` looking the same as today; `_data/posts.yml` is deleted. This is the architectural vertical slice — every later step builds on this content model.

**Scope:** IN: `_posts/` files, `permalink` config, `_layouts/post.html`, `_includes/post-card.html`, rewiring the home "What's new" section, deleting `_data/posts.yml`, site-test infrastructure for built HTML. OUT: visual redesign (step 5), tags UI/filtering (step 6 — this step only puts tags in front matter and a `data-tags` attribute), notes (step 7), content edits (step 8), header/menu (step 4).

**Implementation guide:**
- **Classic GitHub Pages constraint:** production is Jekyll 3.x in safe mode. Use only core `_posts` behaviour + `permalink:` config. No collections config, no custom plugins.
- `_config.yml`: add `permalink: /posts/:title/` (affects posts only; existing pages keep their URLs). Add front matter defaults so post files stay lean:
  ```yaml
  defaults:
    - scope: {path: "", type: "posts"}
      values: {layout: post}
  ```
- **Create `_posts/` files** — filename gives date+slug; front matter: `title`, `tags: [<primary>]` (schema: first tag is the primary, values `thoughts` | `making` only). Source content: read each entry in `_data/posts.yml` and transplant its content **verbatim** — the YAML fields map as: `content` → body start; `sections` (title + list) → `<p><strong>{title}</strong></p>` + `<ul>`; `list` → `<ul>`; `content_after` → paragraph after the list; `link`/`link_text` → trailing `<p><a href="{link}">{link_text}</a></p>`. Keep all embedded HTML (Vimeo figures, inline styles) byte-identical. Do NOT reword anything (repo `CLAUDE.md` writing rule).
  | file | primary tag |
  |---|---|
  | `2025-11-11-test-assignment-walkthrough.md` | thoughts |
  | `2025-08-15-disk-space-cleanup-with-claude-code.md` | thoughts |
  | `2025-08-14-from-ubuntu-to-windows-11.md` | thoughts |
  | `2025-08-12-on-ai-generated-content.md` | thoughts |
  | `2025-08-08-ai-powered-learning-for-real-projects.md` | thoughts |
  | `2025-08-04-game-asset-creation.md` | making |
  | `2025-07-30-mahjong-solitaire-remastered-fun-first.md` | making |
  | `2025-07-23-why-i-still-choose-a-desktop-computer.md` | thoughts |
  | `2025-01-03-vibe-coding.md` | thoughts |
  | `2024-05-20-portfolio-website.md` | making |
- Pitfall: posts.yml bodies are prose paragraphs inside YAML `>` blocks containing raw HTML. In the `.md` files, paragraphs separated by blank lines are fine; markdown will pass raw HTML blocks through. Check each rendered post against the current production feed rendering.
- **`_includes/post-card.html`** — contract consumed by steps 5–7. Renders ONE post passed as `include.post`. Structure:
  ```html
  <article class="post-card" data-tags="{{ include.post.tags | join: ' ' }}">
    <time datetime="{{ include.post.date | date: '%Y-%m-%d' }}">{{ include.post.date | date: "%B %-d, %Y" }}</time>
    <h2><a href="{{ include.post.url | relative_url }}">{{ include.post.title }}</a></h2>
    {{ include.post.content }}
  </article>
  ```
  (Match current `.post-card` classes so existing `_sass` styling applies; title becomes a permalink link — new, intentional.)
- **`_layouts/post.html`** — sets `layout: main`; body = `{% include post-card.html post=page %}` wrapped in the same `.posts-ribbon` container div so single-post pages inherit feed styling, plus a back link `<a href="/">← All posts</a>`. Contract: `page.title` flows to `<title>` via main layout as today.
- **`index.markdown`**: replace the `{% assign posts = site.data.posts %}` loop in the "What's new" section with `{% for post in site.posts %}{% include post-card.html post=post %}{% endfor %}` (site.posts is newest-first by default — same order as today). Leave the rest of the home page untouched.
- **Delete `_data/posts.yml`** in this same step — no dual sources.
- **Site tests** (`test/site.test.js`): built-HTML assertions using node `fs` against `_site/` (this is the pattern later steps extend). CI already builds before `npm test` (step 02); note in the test file header that `bundle exec jekyll build` must run first locally.
- URL note: posts never had individual URLs before (feed only, no anchors), so there is nothing to redirect; the home page keeps its feed, which is what shared links pointed at.
- Bonus to verify, not build: `jekyll-feed` (already in plugins) now emits `/feed.xml` with real entries.

**Test cases:**
- Site: `all ten permalink pages exist` — for each slug above, `_site/posts/<slug>/index.html` exists and contains the post's `<h2>` title.
- Site: `home feed has ten articles` — `_site/index.html` contains exactly 10 `<article class="post-card"` occurrences, newest (Test Assignment Walkthrough) first.
- Site: `data-tags present` — each article tag on the home page has a non-empty `data-tags` attribute with value `thoughts` or `making`.
- Site: `content integrity` — `_site/index.html` still contains the Vimeo iframe for the Test Assignment post and the phrase "Freed 7.2GB" (Disk Space post) — spot-checks that bodies survived migration.
- Site: `posts.yml gone` — `_data/posts.yml` does not exist in the repo.
- Site: `feed.xml has entries` — `_site/feed.xml` contains `<entry>` at least 10 times.

**Done when:** all Test cases green, and a manual diff of the rendered home feed against production shows the same posts in the same order with the same bodies (title now linked).

**Verification commands:**
```bash
bundle exec jekyll build
bundle exec htmlproofer _site --disable-external --allow-hash-href --ignore-missing-alt
npm test
npx vitest run test/site.test.js   # subset re-run while iterating
```

**Manual verification (goes in the PR description):**
1. `bundle exec jekyll serve`; browse http://localhost:4000 — the "What's new" feed shows all 10 posts unchanged, newest first.
2. Click a post title — lands on `/posts/<slug>/`, post renders with site chrome and a "← All posts" link.
3. Browse http://localhost:4000/feed.xml — valid Atom feed with post entries.
