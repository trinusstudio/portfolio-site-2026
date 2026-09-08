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

// Scroll-reveal animations — fade/rise elements into view as they're scrolled to
const revealSelectors = '.section-head, .work-card, .about-photo, .about-body, .faq-item, .process-item';
const revealTargets = document.querySelectorAll(revealSelectors);
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
  revealTargets.forEach((el) => el.classList.add('is-visible'));
} else {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });

  revealTargets.forEach((el, i) => {
    // Stagger process items slightly so they don't all pop at once
    if (el.classList.contains('process-item')) {
      el.style.transitionDelay = `${(i % 5) * 60}ms`;
    }
    revealObserver.observe(el);
  });
}

// Work lightbox — opens a project "folder" of up to 5 vertical clips
const lightbox = document.getElementById('lightbox');
const lightboxMedia = document.getElementById('lightboxMedia');
const workCards = document.querySelectorAll('.work-card');

function embedHTML(type, src) {
  if (type === 'youtube' && src) {
    return `<iframe src="https://www.youtube.com/embed/${src}?autoplay=1&rel=0" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>`;
  }
  if (type === 'vimeo' && src) {
    return `<iframe src="https://player.vimeo.com/video/${src}?autoplay=1" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`;
  }
  if (type === 'file' && src) {
    return `<video src="${src}" controls autoplay playsinline></video>`;
  }
  return null;
}

function openLightbox(card) {
  const groupId = card.getAttribute('data-group');
  const template = document.getElementById(groupId);

  if (!template) {
    lightboxMedia.innerHTML = `<div class="lightbox-empty">No folder found for this project yet.</div>`;
  } else {
    lightboxMedia.innerHTML = '';
    lightboxMedia.appendChild(template.content.cloneNode(true));

    // Wire up each clip slot: click to load and play that clip
    lightboxMedia.querySelectorAll('.folder-slot').forEach((slot, i) => {
      slot.addEventListener('click', () => {
        const type = slot.getAttribute('data-embed-type');
        const src = slot.getAttribute('data-embed-src');
        const html = embedHTML(type, src);
        if (html) {
          slot.innerHTML = html;
        } else {
          slot.querySelector('.folder-slot-empty').innerHTML =
            `Clip ${i + 1}<br><span style="font-size:11px">no video set yet</span>`;
        }
      }, { once: false });
    });
  }

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
