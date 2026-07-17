### Step 07 — Author-notes feature + first note on Game Asset Creation
**Tier:** T2  **Depends on:** 6
**Risk flags:** none

**Goal:** A post can carry dated author annotations ("notes") added after publication. Notes render wherever the post renders (home feed and permalink page) in a joint-authoring style — the author adding a margin note to their own past writing — visually distinct from the post body and clearly NOT a visitor comment. The Game Asset Creation post ships the first note.

**Scope:** IN: `notes:` front matter schema, rendering in `_includes/post-card.html`, SCSS, the one note's content, site tests. OUT: notes on any other post; any note-authoring tooling; visitor comments of any kind.

**Implementation guide:**
- **Schema (contract — future notes are added by editing a post's front matter only):**
  ```yaml
  notes:
    - date: 2026-07-17
      body: >
        Markdown/HTML allowed here.
      image: /assets/images/posts/example.png   # optional
      image_alt: short alt text                  # required iff image present
  ```
- Rendering: append to `_includes/post-card.html`, after `{{ include.post.content }}`:
  ```html
  {% if include.post.notes %}{% for note in include.post.notes %}
  <aside class="post-note">
    <div class="post-note-header">
      <img src="{{ '/assets/images/profile_picture.jpg' | relative_url }}?v={{ site.css_version }}" alt="" class="post-note-avatar">
      <span class="post-note-label">Note</span>
      <time datetime="{{ note.date | date: '%Y-%m-%d' }}">{{ note.date | date: "%B %-d, %Y" }}</time>
    </div>
    <div class="post-note-body">{{ note.body | markdownify }}
      {% if note.image %}<img src="{{ note.image | relative_url }}" alt="{{ note.image_alt }}" class="post-note-image">{% endif %}
    </div>
  </aside>
  {% endfor %}{% endif %}
  ```
  Pitfall: `markdownify` on a YAML `>` block works on GitHub Pages' Jekyll 3 — keep bodies simple markdown. Avatar `alt=""` is intentional (decorative; the label carries meaning).
- SCSS: `_sass/post-note.scss`, imported from `assets/css/styles.scss`. Joint-authoring look: indented block with a left accent border (`$accent_color`), slightly tinted background (`lighten($gray_light, 4%)` or `mix()` with `$off_white`), small round avatar (28px), "Note" label in small caps with the accent color, date muted. It should read as the author leaning in — not a grey quotation, not a comment bubble. `max-width: 100%` on `.post-note-image`. Bump `css_version`.
- **First note** — add to `_posts/2025-08-04-game-asset-creation.md` front matter (date = this step's implementation date):
  ```yaml
  notes:
    - date: <implementation date, YYYY-MM-DD>
      body: >
        A note from later me: don't celebrate at the assets stage — wait until
        marketing. Behind the character stands the giant of code, and behind
        that giant stands an even bigger one: marketing.
  ```
  If `assets/images/posts/giants-meme.png` exists in the repo (optional step-01 output), add `image: /assets/images/posts/giants-meme.png` and `image_alt: A character with ever-bigger giants behind it — code, assets, marketing.` and drop the second sentence of the body (the image says it). If absent, ship text-only exactly as above — do not generate an image.
- The note must NOT affect `data-tags`, feed order, or the post's `<time>`/date.

**Test cases:**
- Site: `note renders on home feed` — `_site/index.html` contains one `post-note` aside inside the Game Asset Creation article, with label "Note" and the note date.
- Site: `note renders on permalink page` — `_site/posts/game-asset-creation/index.html` contains the same `post-note` aside.
- Site: `no notes elsewhere` — total `post-note` occurrences in `_site/index.html` is exactly 1.
- Site: `note is aside not article` — the note markup is an `<aside>` inside the post's `<article>` (never a sibling article).
- Unit: `styles compile` — build exits 0 after the new `@import`.

**Done when:** all Test cases green, and at 375px width the note block stays visually subordinate to the post (indent + accent visible, no overflow).

**Verification commands:**
```bash
bundle exec jekyll build
bundle exec htmlproofer _site --disable-external --allow-hash-href --ignore-missing-alt
npm test
npx vitest run test/site.test.js
```

**Manual verification (goes in the PR description):**
1. `bundle exec jekyll serve`; find Game Asset Creation in the feed — the note reads as the author's own later addendum (avatar + "Note" + date), clearly distinct from the post body.
2. Open `/posts/game-asset-creation/` — same note present.
3. Filter chips (step 6) still work with the note present.
