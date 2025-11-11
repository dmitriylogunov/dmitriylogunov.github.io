---
layout: main
title: Professional Portfolio - Dmitriy Logunov
---

# Work

<div class="cta-section">
    <h2>Looking to hire a passionate developer?</h2>
    <p>Get my complete professional background</p>
    <div class="cta-buttons">
        <a href="https://docs.google.com/document/d/1KZmXfj5MLG05r7Fafq893GFFulycqFEU8YFczCx6_Bo/export?format=pdf" class="cta-button" target="_blank" rel="noopener">Download CV (PDF)</a>
        <a href="https://docs.google.com/document/d/1KZmXfj5MLG05r7Fafq893GFFulycqFEU8YFczCx6_Bo/export?format=docx" class="cta-button" target="_blank" rel="noopener">Download CV (DOCX)</a>
        <a href="#" class="cta-button" onclick="event.preventDefault(); document.querySelector('footer').scrollIntoView({behavior: 'smooth'})">Contact Me</a>
    </div>
</div>

Need someone who thinks beyond the code? My work isn't just writing software, it's about delivering a holistic approach. Whether it’s updating your web presence, writing an app, or something else, impact comes before the code - technology choice matters, but it is secondary to the result.

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
