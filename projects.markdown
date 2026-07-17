---
layout: main
title: Projects — Dmitriy Logunov
---

# Projects

<div class="projects-section">
  <div class="projects-grid" id="projects-grid">
    {% assign projects = site.data.projects %}
    {% for project in projects %}
    <div class="project-card" data-project-url="{{ project.link }}">
      <button class="project-close" aria-label="Close">×</button>
      <div class="project-image" {% if project.image %}style="background-image: url('/assets/images/projects/{{ project.image }}');" data-full-image="/assets/images/projects/{{ project.image }}"{% endif %}>
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
          <a href="{{ project.link }}" class="project-button visit-btn" target="_blank">
            {% if project.cta_text %}
              {{ project.cta_text }}
            {% elsif project.link contains 'github' %}
              View on GitHub
            {% else %}
              Visit Project
            {% endif %}
          </a>
          {% endif %}
        </div>
      </div>
    </div>
    {% endfor %}
  </div>
</div>

{% include image-overlay.html %}

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
    
    // Handle image click when expanded
    const projectImage = card.querySelector('.project-image');
    projectImage.addEventListener('click', function(e) {
      if (card.classList.contains('expanded') && this.dataset.fullImage) {
        e.stopPropagation();
        window.openImageOverlay(this.dataset.fullImage);
      }
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
      
      if (isExpanded && !e.target.closest('.project-image')) {
        // Collapse this card if not clicking on image
        card.classList.remove('expanded');
      } else if (!isExpanded) {
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

<div class="page-links">
  <p>Looking for my work? Check out my <a href="/work">work</a> history.</p>
</div>