---
layout: main
title: Dmitriy Logunov - Writing about everything
---

# Projects

<div class="projects-section">
  <div class="projects-grid" id="projects-grid">
    {% assign projects = site.data.projects %}
    {% for project in projects %}
    <div class="project-card" data-project-url="{{ project.link }}">
      <button class="project-close" aria-label="Close">×</button>
      <div class="project-image" {% if project.image %}style="background-image: url('/assets/images/projects/{{ project.image }}');"{% endif %}>
        {% if project.overlay_text %}
        <div class="project-overlay-text">{{ project.overlay_text }}</div>
        {% endif %}
      </div>
      <div class="project-content">
        <div class="project-title">{{ project.title }}</div>
        <div class="project-short-description">{{ project.short_description }}</div>
        <div class="project-technologies">{{ project.technologies }}</div>
        <div class="project-description">{{ project.description }}</div>
        <div class="project-actions">
          {% if project.link %}
          <a href="{{ project.link }}" class="project-button visit-btn" target="_blank">Visit Project</a>
          {% endif %}
        </div>
      </div>
    </div>
    {% endfor %}
  </div>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach(card => {
    const closeBtn = card.querySelector('.project-close');
    
    // Handle close button click
    closeBtn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      card.classList.remove('expanded');
    });
    
    // Handle card click to expand/collapse
    card.addEventListener('click', function(e) {
      // Don't handle clicks on buttons, links, or close button
      if (e.target.classList.contains('project-button') || 
          e.target.classList.contains('project-close') ||
          e.target.tagName === 'A' || 
          e.target.closest('.project-actions')) {
        return;
      }
      
      const isExpanded = card.classList.contains('expanded');
      
      if (isExpanded) {
        // Collapse this card
        card.classList.remove('expanded');
      } else {
        // Close all other expanded cards first
        projectCards.forEach(c => {
          if (c !== card) {
            c.classList.remove('expanded');
          }
        });
        
        // Expand this card
        card.classList.add('expanded');
      }
    });
  });
  
  // Handle clicks outside project cards to collapse expanded cards
  document.addEventListener('click', function(e) {
    // Check if the click was outside any project card
    if (!e.target.closest('.project-card')) {
      // Collapse all expanded cards
      projectCards.forEach(card => {
        card.classList.remove('expanded');
      });
    }
  });
});
</script>

# What's new

<div class="posts-ribbon">
  {% assign posts = site.data.posts %}
  {% for post in posts %}
  <article class="post-card">
    <time datetime="{{ post.date }}">{{ post.date | date: "%B %-d, %Y" }}</time>
    <h2>{{ post.title }}</h2>
    {% if post.content %}
    <p>{{ post.content }}</p>
    {% endif %}
    
    {% if post.sections %}
      {% for section in post.sections %}
        <p><strong>{{ section.title }}</strong></p>
        <ul>
          {% for item in section.list %}
          <li>{{ item }}</li>
          {% endfor %}
        </ul>
      {% endfor %}
    {% endif %}
    
    {% if post.list %}
    <ul>
      {% for item in post.list %}
      <li>{{ item }}</li>
      {% endfor %}
    </ul>
    {% endif %}
    
    {% if post.content_after %}
    <p>{{ post.content_after }}</p>
    {% endif %}
    
    {% if post.link %}
    <p><a href="{{ post.link }}">{{ post.link_text }}</a></p>
    {% endif %}
  </article>
  {% endfor %}
</div>

<div class="page-links">
  <p>Looking for my work? Check out my <a href="/work">work and education</a> history.</p>
  <p>You can also <a href="https://docs.google.com/document/d/1-d7ez5A321XL0EQmPcus7xGPVTAtTdeblUMEsGa6Wq4/export?format=docx">download my CV</a> or reach out via the contacts below.</p>
</div>
