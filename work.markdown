---
layout: main
title: Professional Portfolio - Dmitriy Logunov
---

# Work

Senior Full-Stack Developer with 14 years of experience, specialising in React, Next.js, TypeScript, and Vue.js. I build production web applications across regulated industries — fintech, healthcare, education, and gambling. Most recently I shipped a production customer loyalty kiosk system at Onyx Gaming (React / Next.js / TypeScript / Prisma), and built the Advanced Standing Pre-Offer system at La Trobe University (Vue / TypeScript) used by admissions staff to process credit assessments for international students.

<figure class="video-figure about-video" style="margin:24px 0; padding:12px; background:#f8f8f8; border-radius:8px;">
  <div class="about-video-inner">
    <div style="padding:56.25% 0 0 0; position:relative;">
      <iframe src="https://player.vimeo.com/video/1116036017?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" referrerpolicy="strict-origin-when-cross-origin" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="Beyond EV front-end challenge walkthrough"></iframe>
    </div>
  </div>
  <script src="https://player.vimeo.com/api/player.js"></script>
  <figcaption style="font-size:0.9em; color:#666; margin-top:8px;">About me</figcaption>
</figure>

<div class="cta-section">
    <h2>Looking to hire a senior developer?</h2>
    <p>Get my complete professional background</p>
    <div class="cta-buttons">
      <a href="/assets/cv/Dmitriy_Logunov_Resume.pdf" class="cta-button" target="_blank" rel="noopener">Download Resume (PDF)</a>
      <a href="/assets/cv/Dmitriy_Logunov_Resume.docx" class="cta-button" target="_blank" rel="noopener">Download Resume (DOCX)</a>
        <a href="#contact-modal" class="cta-button" data-open-contact-modal>Contact Me</a>
    </div>
</div>

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
