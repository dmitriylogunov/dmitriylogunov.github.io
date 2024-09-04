---
layout: main
title: Professional Portfolio - Dmitriy Logunov
---

# Work

This page highlights some of the projects on which I have worked as a paid employee, or as part of the job application, that I am proud of. For the full list, please [download my CV](https://docs.google.com/document/d/1-d7ez5A321XL0EQmPcus7xGPVTAtTdeblUMEsGa6Wq4/export?format=docx), or see the [skills matrix](/skills). Feel free to reach out via the contacts below.

<section class="timeline">
  {% for project in site.data.work %}
    {% include timeline-item.html project=project %}
  {% endfor %}
</section>
