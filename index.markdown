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
        <div class="project-technologies">{{ project.technologies }}</div>
        <div class="project-description">{{ project.description }}</div>
        <div class="project-actions">
          <a href="{{ project.link }}" class="project-button visit-btn" target="_blank">Visit Project</a>
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
});
</script>

# What's new

<div class="posts-ribbon">
  <article class="post-card">
    <time datetime="2025-07-23">July 23, 2025</time>
    <h2>Why I Still Choose a Desktop Computer in 2025</h2>
    <p>In the world where laptops define the modern workstation, I've chosen a desktop computer as my main work PC. Here's why:</p>
    <ul>
      <li><strong>Best bang for the buck:</strong> Dollar for dollar, desktops offer significantly more computing power than laptops</li>
      <li><strong>Whisper quiet:</strong> My desktop runs virtually silent even under heavy loads. This is due to optimized component selection based on noise levels.</li>
      <li><strong>Serviceable and upgradeable:</strong> Ever had to throw away a perfectly good laptop just because the power module on the motherboard failed? I have. With a desktop, I can replace or upgrade any component</li>
      <li><strong>Multi-monitor capability:</strong> Runs three screens effortlessly, creating an immersive workspace that laptops struggle to match</li>
      <li><strong>Ideal for gaming:</strong> When work is done, it transforms into a high-performance gaming machine</li>
      <li><strong>It just feels good:</strong> There's something satisfying about a proper workstation setup - the ergonomics, the space, the control over your environment</li>
    </ul>
    <p>It also doesn't take much space on the desk or on the floor, sitting neatly in the holder bracket underneath my desktop. And if I want to work at a cafe? I have an old lo-fi laptop to which I sync my work via GitHub.</p>
  </article>
  
  <article class="post-card">
    <time datetime="2025-01-03">January 3, 2025</time>
    <h2>Vibe Coding</h2>
    <p>The vibe coding trend is here. Of course I took my time to experiment. So far, I'm happy with the results, if you know what to expect, where to use it, and where not to use it.</p>
    <p><strong>How it has blown my mind:</strong></p>
    <ul>
      <li>It refactored my old web Mahjong project from Angular 2 to Vue JS. Yes, the initial version had errors but was a very solid start. From there, through iterations and tracking down the issues, I've got it working in a few days. I was able to finally address all todos and small glitches, too. Just wow.</li>
    </ul>

    <p><strong>What it won't do for you:</strong></p>
    <ul>
      <li>Write an entire project from scratch, or remove the need for developers altogether</li>
      <li>Do *everything*. Occasionally you need to jump back into the IDE and do things the old school manual way</li>
    </ul>
    <p><strong>What it did well for me:</strong></p>
    <ul>
      <li>Analysing existing codebases. Ever wondered where this text is coming from, or where this piece of logic is implemented? It finds it in a breeze.</li>
      <li>Updating this website, it saves me significant time on mechanical work regarding design, structure, and wording</li>
      <li>At work, it created a code structure diagram for a web front end project. The initial generated version was very obviously wrong, but served as a good starting point. From there, it took just a couple of hours to create a perfect and correct Mermaid diagram - a task that would have taken a full day otherwise</li>
    </ul>

    <p><strong>What it requires for success:</strong></p>
    <ul>
      <li>A good high level understanding by the user (developer) of what is being built, why and how. Yes, it shifts you up from basic coding to a more... senior or project designer level, but still requires you to be there and think critically</li>
    </ul>
  </article>
  
  
  <article class="post-card">
    <time datetime="2024-05-20">May 20, 2024</time>
    <h2>Portfolio website</h2>
    <p><strong>Technologies:</strong> Jekyll, HTML, SASS, YML, Javascript</p>
    <p>The idea of this website was long in the making, but finally I decided to put it together. It is a static website, built with Jekyll, and hosted on GitHub Pages.</p>
    <p><a href="https://github.com/dmitriylogunov/dmitriylogunov.github.io">View on GitHub</a></p>
  </article>
</div>

<div class="page-links">
  <p>Looking for my work? Check out my <a href="/projects">personal projects</a> or <a href="/work">work and education</a> history.</p>
  <p>You can also <a href="https://docs.google.com/document/d/1-d7ez5A321XL0EQmPcus7xGPVTAtTdeblUMEsGa6Wq4/export?format=docx">download my CV</a> or reach out via the contacts below.</p>
</div>
