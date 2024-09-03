---
layout: main
title: Skills  - Dmitriy Logunov
---

# Skills matrix

<section class="skills-matrix">
  {% assign skills_matrix = site.data.matrix %}
  {% assign row_length = skills_matrix[0].size | plus: 3 %}

  <div class="grid-container" style="grid-template-columns: repeat({{ row_length }}, 1fr);">
    <div class="grid-header">Skill</div>
    <div class="grid-header">Rating</div>
    <div class="grid-header">Years</div>
    {% for company in skills_matrix[0] %}
      {% if company != '' %}
        <div class="grid-header">{{ company }}</div>
      {% endif %}
    {% endfor %}

    {% for row in skills_matrix %}
      {% if forloop.first %}
        {% continue %}
      {% endif %}
      {% for cell in row %}
        {% if forloop.index <= 3 %}
          <div class="grid-item">{{ cell }}</div>
        {% else %}
          {% if cell == '1' %}
            <div class="grid-item with-checkbox">
              <i class="fa fa-check-square" aria-hidden="true"></i>
              <noscript>#</noscript>
            </div>
          {% else %}
            <div class="grid-item">&nbsp;</div>
          {% endif %}
        {% endif %}
      {% endfor %}
    {% endfor %}

  </div>
</section>
