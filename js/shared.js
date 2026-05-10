/* moedesigns-clone — shared.js */
(function () {
  'use strict';

  /* ── Navbar scroll shadow ── */
  const nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 30);
    }, { passive: true });
  }

  /* ── Mobile hamburger ── */
  const hamburger = document.querySelector('.nav-hamburger');
  const drawer = document.querySelector('.nav-drawer');
  if (hamburger && drawer) {
    hamburger.addEventListener('click', () => {
      const open = drawer.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', open);
      document.body.style.overflow = open ? 'hidden' : '';
      const spans = hamburger.querySelectorAll('span');
      if (open) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
      }
    });
    document.addEventListener('click', e => {
      if (!nav.contains(e.target) && drawer.classList.contains('open')) {
        drawer.classList.remove('open');
        document.body.style.overflow = '';
        hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
      }
    });
  }

  /* ── Carousel ── */
  window.scrollCarousel = function (trackId, dir) {
    const track = document.getElementById(trackId);
    if (!track) return;
    const first = track.querySelector('.work-card, .product-card, .media-card, .testimonial-card');
    const gap = 14;
    const step = first ? first.offsetWidth + gap : 314;
    track.scrollBy({ left: dir * step * -1, behavior: 'smooth' });
  };

  /* ── FAQ accordion ── */
  document.querySelectorAll('.faq-question').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.closest('.faq-item');
      const open = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
      if (!open) item.classList.add('open');
    });
  });

  /* ── Scroll fade-up ── */
  const fadeEls = document.querySelectorAll('.fade-up');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.07, rootMargin: '0px 0px -40px 0px' });
    fadeEls.forEach(el => io.observe(el));
  } else {
    fadeEls.forEach(el => el.classList.add('in'));
  }

  /* ── Active nav link ── */
  const currentPath = window.location.pathname.replace(/\/$/, '') || '/';
  document.querySelectorAll('.nav-links a, .nav-drawer a').forEach(a => {
    const href = a.getAttribute('href') || '';
    const linkPath = href.replace(/\/$/, '') || '/';
    if (linkPath === currentPath || (linkPath !== '/' && currentPath.startsWith(linkPath))) {
      a.classList.add('active');
    }
  });

  /* ── Newsletter form ── */
  document.querySelectorAll('.footer-nl-form').forEach(form => {
    const btn = form.querySelector('button, .btn');
    if (!btn) return;
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const input = form.querySelector('input');
      if (input && input.value.includes('@')) {
        btn.textContent = '✓ تم الاشتراك';
        btn.style.pointerEvents = 'none';
        input.value = '';
      }
    });
  });

})();
