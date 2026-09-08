document.getElementById('year').textContent = new Date().getFullYear();

// Highlight nav link for the section currently in view
const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach((link) => {
        link.style.color = link.getAttribute('href') === `#${id}` ? 'var(--text)' : '';
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach((section) => observer.observe(section));

// Work lightbox
const lightbox = document.getElementById('lightbox');
const lightboxMedia = document.getElementById('lightboxMedia');
const workCards = document.querySelectorAll('.work-card');

function openLightbox(card) {
  const type = card.getAttribute('data-embed-type');
  const src = card.getAttribute('data-embed-src');
  const label = card.getAttribute('data-label') || 'This piece';

  let mediaHTML = '';
  if (type === 'youtube' && src) {
    mediaHTML = `<iframe src="https://www.youtube.com/embed/${src}?autoplay=1&rel=0" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>`;
  } else if (type === 'vimeo' && src) {
    mediaHTML = `<iframe src="https://player.vimeo.com/video/${src}?autoplay=1" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`;
  } else if (type === 'file' && src) {
    mediaHTML = `<video src="${src}" controls autoplay playsinline></video>`;
  } else {
    mediaHTML = `<div class="lightbox-empty">${label} — add a video source in index.html (data-embed-type / data-embed-src) to make this playable.</div>`;
  }

  lightboxMedia.innerHTML = mediaHTML;
  lightbox.classList.add('is-open');
  lightbox.setAttribute('aria-hidden', 'false');
}

function closeLightbox() {
  lightbox.classList.remove('is-open');
  lightbox.setAttribute('aria-hidden', 'true');
  lightboxMedia.innerHTML = ''; // stops playback
}

workCards.forEach((card) => {
  card.addEventListener('click', () => openLightbox(card));
});

lightbox.querySelectorAll('[data-close]').forEach((el) => {
  el.addEventListener('click', closeLightbox);
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && lightbox.classList.contains('is-open')) closeLightbox();
});
