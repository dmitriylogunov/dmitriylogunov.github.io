---
layout: main
title: Professional Portfolio - Dmitriy Logunov
---

# Commercial projects

<section class="timeline">
  {% for project in site.data.professional-timeline %}
    {% include timeline-item.html project=project %}
  {% endfor %}
</section>
