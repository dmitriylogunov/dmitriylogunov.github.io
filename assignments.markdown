---
layout: main
title: Professional Portfolio - Dmitriy Logunov
---

# Test assignments

<section class="timeline">
  {% for project in site.data.assignments %}
    {% include timeline-item.html project=project %}
  {% endfor %}
</section>
