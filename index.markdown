---
layout: main
title: My Personal Portfolio - Dmitriy Logunov
---

# Welcome

This site is dedicated to my personal projects and education, with the exception of only a couple of paid jobs. For the career snapshot, please download the CV here. Feel free to reach out via the contacts below.

<section class="timeline">
  {% for project in site.data.projects %}
    {% include timeline-item.html project=project %}
  {% endfor %}
</section>
