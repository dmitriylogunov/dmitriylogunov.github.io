---
layout: main
title: My Personal Portfolio - Dmitriy Logunov
---

# Welcome

This site is dedicated to my personal projects, education and life. For the career snapshot, please [download my CV](https://docs.google.com/document/d/1-d7ez5A321XL0EQmPcus7xGPVTAtTdeblUMEsGa6Wq4/export?format=docx), see the commercial [project highlights](/commercial), or [skills matrix](/skills). Feel free to reach out via the contacts below.

<section class="timeline">
  {% for project in site.data.projects %}
    {% include timeline-item.html project=project %}
  {% endfor %}
</section>
