---
layout: timeline
title: My Personal Portfolio
---

# Welcome to My Personal Portfolio

Here you will find a timeline of my projects.

<section class="timeline">
  {% for project in site.data.projects %}
  <div class="timeline-item {% cycle 'left', 'right' %}">
    <h2>{{ project.title }}</h2>
    <p>{{ project.description }}</p>
    <span class="date">{{ project.date }}</span>
  </div>
  {% endfor %}
</section>
