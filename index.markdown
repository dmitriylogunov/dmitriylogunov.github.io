---
layout: main
title: Dmitriy Logunov - Delivering solutions
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
            {% if project.link contains 'github' %}
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

<!-- Image overlay -->
<div id="image-overlay" class="image-overlay">
  <button class="overlay-close" aria-label="Close">×</button>
  <img class="overlay-image" alt="Full size image">
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
  const projectCards = document.querySelectorAll('.project-card');
  const imageOverlay = document.getElementById('image-overlay');
  const overlayImage = imageOverlay.querySelector('.overlay-image');
  const overlayClose = imageOverlay.querySelector('.overlay-close');
  
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
        overlayImage.src = this.dataset.fullImage;
        imageOverlay.classList.add('active');
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
  
  // Handle overlay close
  overlayClose.addEventListener('click', function(e) {
    e.stopPropagation();
    imageOverlay.classList.remove('active');
  });
  
  // Close overlay on background click
  imageOverlay.addEventListener('click', function(e) {
    e.stopPropagation();
    if (e.target === imageOverlay) {
      imageOverlay.classList.remove('active');
    }
  });
  
  // Close overlay on Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && imageOverlay.classList.contains('active')) {
      imageOverlay.classList.remove('active');
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
</div>
