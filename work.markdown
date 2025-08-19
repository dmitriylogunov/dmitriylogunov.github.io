---
layout: main
title: Professional Portfolio - Dmitriy Logunov
---

# Work

When you have a problem, I have a solution. My work isn't just writing software. It's about delivering a holistic approach. It could be updating your web presence, writing an app, or something else. Technology choice is secondary. Impact before code.

<div class="cta-section">
    <h2>Looking to hire a passionate developer?</h2>
    <p>Get my complete professional background</p>
    <div class="cta-buttons">
        <a href="https://docs.google.com/document/d/1-d7ez5A321XL0EQmPcus7xGPVTAtTdeblUMEsGa6Wq4/export?format=pdf" class="cta-button">Download CV (PDF)</a>
        <a href="https://docs.google.com/document/d/1-d7ez5A321XL0EQmPcus7xGPVTAtTdeblUMEsGa6Wq4/export?format=docx" class="cta-button">Download CV (DOCX)</a>
    </div>
</div>

This page highlights some of my work and education. Feel free to reach out via the contacts below.

{% assign work_timeline = site.data.work %}
{% include timeline.html data=work_timeline %}

<!-- Image overlay -->
<div id="image-overlay" class="image-overlay">
  <button class="overlay-close" aria-label="Close">×</button>
  <img class="overlay-image" alt="Full size image">
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
  const imageOverlay = document.getElementById('image-overlay');
  const overlayImage = imageOverlay.querySelector('.overlay-image');
  const overlayClose = imageOverlay.querySelector('.overlay-close');
  
  // Handle timeline image clicks
  document.querySelectorAll('.timeline-image').forEach(function(imageDiv) {
    imageDiv.addEventListener('click', function(e) {
      e.stopPropagation();
      overlayImage.src = this.dataset.fullImage;
      imageOverlay.classList.add('active');
    });
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
