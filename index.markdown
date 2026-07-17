---
layout: main
title: Dmitriy Logunov — Senior Full Stack Developer
---

# Work

<div class="projects-section">
  <div class="projects-grid" id="work-grid">
    {% assign highlighted_work = site.data.work | where: "is_highlight", true %}
    {% for item in highlighted_work limit: 3 %}
    <div class="project-card" data-project-url="{{ item.link }}">
      <button class="project-close" aria-label="Close">×</button>
      <div class="project-image" {% if item.image %}style="background-image: url('/assets/images/{{ item.image }}');" data-full-image="/assets/images/{{ item.image }}"{% endif %}>
      </div>
      <div class="project-content">
        <div class="project-title">{{ item.title }}</div>
        <div class="project-short-description">{{ item.date }}{% if item.type %} • {{ item.type }}{% endif %}</div>
        <div class="project-technologies">{{ item.technologies }}</div>
        <div class="project-description">{{ item.description | markdownify | strip_html | truncate: 200 }}</div>
        <div class="project-actions">
          {% if item.link %}
          <a href="{{ item.link }}" class="project-button visit-btn" {% if item.link contains 'http' %}target="_blank"{% endif %}>
            {% if item.link contains 'http' %}
              Visit Website
            {% else %}
              View Details
            {% endif %}
          </a>
          {% endif %}
        </div>
      </div>
    </div>
    {% endfor %}
  </div>
  <a href="/work" class="timeline-link desktop-only" style="margin-top: 0.75rem;">View All <i class="fas fa-external-link"></i></a>
  <a href="/work" class="timeline-link-mobile mobile-only" style="margin-top: 0.75rem;">View All <i class="fas fa-external-link"></i></a>
</div>

# Side projects

<div class="projects-section" id="projects-section">
  <div class="projects-grid" id="projects-grid">
    {% assign highlighted_projects = site.data.projects | where: "is_highlight", true %}
    {% for project in highlighted_projects limit: 3 %}
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

    <!-- Hidden additional projects -->
    {% assign other_projects = site.data.projects | where: "is_highlight", false %}
    {% for project in other_projects %}
    <div class="project-card additional-project" data-project-url="{{ project.link }}">
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
  <a href="javascript:void(0)" class="timeline-link desktop-only" id="expand-projects-btn" onclick="toggleProjects()">Expand <i class="fas fa-chevron-down" id="expand-icon"></i></a>
  <a href="javascript:void(0)" class="timeline-link-mobile mobile-only" id="expand-projects-btn-mobile" onclick="toggleProjects()">Expand <i class="fas fa-chevron-down" id="expand-icon-mobile"></i></a>
</div>

{% include image-overlay.html %}

<script>
let projectsExpanded = false;

function toggleProjects() {
  const projectsSection = document.getElementById('projects-section');
  const expandBtn = document.getElementById('expand-projects-btn');
  const expandBtnMobile = document.getElementById('expand-projects-btn-mobile');
  const expandIcon = document.getElementById('expand-icon');
  const expandIconMobile = document.getElementById('expand-icon-mobile');

  projectsExpanded = !projectsExpanded;

  if (projectsExpanded) {
    projectsSection.classList.add('expanded');
    expandBtn.innerHTML = 'Collapse <i class="fas fa-chevron-up" id="expand-icon"></i>';
    expandBtnMobile.innerHTML = 'Collapse <i class="fas fa-chevron-up" id="expand-icon-mobile"></i>';
  } else {
    projectsSection.classList.remove('expanded');
    expandBtn.innerHTML = 'Expand <i class="fas fa-chevron-down" id="expand-icon"></i>';
    expandBtnMobile.innerHTML = 'Expand <i class="fas fa-chevron-down" id="expand-icon-mobile"></i>';
  }
}

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
    if (projectImage) {
      projectImage.addEventListener('click', function(e) {
        if (card.classList.contains('expanded') && this.dataset.fullImage) {
          e.stopPropagation();
          window.openImageOverlay(this.dataset.fullImage);
        }
      });
    }

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

# What's new

<div class="posts-ribbon">
  {% for post in site.posts %}{% include post-card.html post=post %}{% endfor %}
</div>

<div class="page-links">
  <p>Looking for my work? Check out my <a href="/work">work and education</a> history.</p>
</div>
