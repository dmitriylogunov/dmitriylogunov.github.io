---
layout: main
title: Skills  - Dmitriy Logunov
---

# Skills matrix

<section class="skills-matrix">
  {% assign skills_matrix = site.data.matrix %}

  <table>
    <thead>
      <tr>
        <th>Skill</th>
        <th>Rating</th>
        <th>Years</th>
        {% for company in skills_matrix[0] %}
          {% if company != '' %}
            <th>{{ company }}</th>
          {% endif %}
        {% endfor %}
      </tr>
    </thead>
    <tbody>
      {% for row in skills_matrix %}
        {% if forloop.first %}
          {% continue %}
        {% endif %}
        <tr>
          {% for cell in row %}
            <td>{{ cell }}</td>
          {% endfor %}
        </tr>
      {% endfor %}
    </tbody>
  </table>
</section>
