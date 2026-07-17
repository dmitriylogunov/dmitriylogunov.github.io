// Client-side filtering of the home post feed by primary tag.
// Pure functions are exported for unit tests; DOM wiring lives in initFeedFilter.
// Dependency-free ES module — classic GitHub Pages serves it as a static file.

// pure — exported for tests
export function isVisible(cardTags, activeTag) {
  if (activeTag == null || activeTag === "all") return true;
  return cardTags.split(" ").includes(activeTag);
}

export function tagFromHash(hash) {
  if (!hash) return null;
  const match = /^#tag=([a-z0-9-]+)$/i.exec(hash);
  return match ? match[1] : null;
}

export function hashFromTag(tag) {
  return tag ? `#tag=${tag}` : "";
}

// DOM wiring — reads [data-tags] articles and [data-tag] chips
export function initFeedFilter(doc = document) {
  const chips = Array.from(doc.querySelectorAll(".tag-chip"));
  const articles = Array.from(doc.querySelectorAll("[data-tags]"));
  if (!chips.length || !articles.length) return;

  const view = doc.defaultView || window;

  function apply(activeTag) {
    for (const article of articles) {
      article.hidden = !isVisible(article.dataset.tags || "", activeTag);
    }
    for (const chip of chips) {
      const on =
        chip.dataset.tag === activeTag ||
        (activeTag == null && chip.dataset.tag === "all");
      chip.setAttribute("aria-pressed", on ? "true" : "false");
      chip.classList.toggle("active", on);
    }
  }

  for (const chip of chips) {
    chip.addEventListener("click", () => {
      const tag = chip.dataset.tag === "all" ? null : chip.dataset.tag;
      view.location.hash = hashFromTag(tag);
      apply(tag);
    });
  }

  view.addEventListener("hashchange", () =>
    apply(tagFromHash(view.location.hash))
  );
  apply(tagFromHash(view.location.hash));
}
