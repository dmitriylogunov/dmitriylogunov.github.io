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

<div class="posts-ribbon">
  {% for post in site.posts %}{% include post-card.html post=post %}{% endfor %}
</div>
