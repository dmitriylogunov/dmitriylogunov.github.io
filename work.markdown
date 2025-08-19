---
layout: main
title: Professional Portfolio - Dmitriy Logunov
---

# Work

When you have a problem, I have a solution. My work is more than just writing software - it's about delivering a holistic approach. Whether it's updating your web presence, writing an app, or something else entirely. Technology choice is secondary; impact before code.

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

{% include image-overlay.html %}

<script>
document.addEventListener('DOMContentLoaded', function() {
  // Handle timeline image clicks
  document.querySelectorAll('.timeline-image').forEach(function(imageDiv) {
    imageDiv.addEventListener('click', function(e) {
      e.stopPropagation();
      window.openImageOverlay(this.dataset.fullImage);
    });
  });
});
</script>
