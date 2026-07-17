---
layout: main
title: Dmitriy Logunov
---

{% include showcase-strip.html %}

<div class="showcase-links">
  <a href="/work">All work →</a>
  <a href="/projects">All projects →</a>
</div>

# Posts

<div class="tag-chips" role="group" aria-label="Filter posts">
  <button class="tag-chip" data-tag="all" aria-pressed="true">All</button>
  <button class="tag-chip" data-tag="thoughts" aria-pressed="false">Thoughts</button>
  <button class="tag-chip" data-tag="making" aria-pressed="false">Making</button>
</div>

<div class="posts-ribbon">
  {% for post in site.posts %}{% include post-card.html post=post %}{% endfor %}
</div>

<script type="module">
  import { initFeedFilter } from "{{ '/assets/js/feed-filter.js' | relative_url }}?v={{ site.css_version }}";
  initFeedFilter();
</script>
