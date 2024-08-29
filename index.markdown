---
layout: main
title: My Personal Portfolio - Dmitriy Logunov
---

# Welcome to My Professional Timeline

I am a senior Front-End developer, specializing in Typescript, Node, React and Redux. Below, I would like to highlight some of my personal and professional projects:

<section class="timeline">
  {% for project in site.data.projects %}
    {% include timeline-item.html project=project %}
  {% endfor %}
</section>
