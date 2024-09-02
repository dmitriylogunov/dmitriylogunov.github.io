---
layout: main
title: Professional Portfolio - Dmitriy Logunov
---

# Commercial projects

This page highlights some of the projects that I have built as a paid employee and that I am proud of.

<section class="timeline">
  {% for project in site.data.commercial %}
    {% include timeline-item.html project=project %}
  {% endfor %}
</section>
