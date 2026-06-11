/* ============================================================
   GATEWAY DIGITAL CO. — Main JS
   ============================================================ */

/* ---------- STICKY HEADER ---------- */
const header = document.getElementById('site-header');
const onScroll = () => {
  if (window.scrollY > 60) {
    header.classList.remove('at-top');
    header.classList.add('scrolled');
  } else {
    header.classList.add('at-top');
    header.classList.remove('scrolled');
  }
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ---------- MOBILE NAV ---------- */
const hamburger = document.querySelector('.hamburger');
const mobileNav = document.getElementById('mobile-nav');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileNav.classList.toggle('open');
  document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
});
mobileNav.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileNav.classList.remove('open');
    document.body.style.overflow = '';
  });
});

/* ---------- SMOOTH SCROLL for nav links ---------- */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ---------- PORTFOLIO LINKS — force new tab ---------- */
document.querySelectorAll('.portfolio-link[href^="http"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    window.open(link.getAttribute('href'), '_blank', 'noopener,noreferrer');
  });
});

/* ---------- ACTIVE NAV HIGHLIGHT on scroll ---------- */
const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a[href^="#"]');
const onScroll2 = () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  navLinks.forEach(a => {
    a.classList.toggle('active-link', a.getAttribute('href') === `#${current}`);
  });
};
window.addEventListener('scroll', onScroll2, { passive: true });

/* ---------- SCROLL REVEAL ---------- */
const reveals = document.querySelectorAll('.reveal');
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
reveals.forEach(el => revealObs.observe(el));

/* ---------- COUNTER ANIMATION ---------- */
document.querySelectorAll('[data-count]').forEach(el => {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const target = +el.dataset.count;
      const suffix = el.dataset.suffix || '';
      const duration = 1400;
      const start = performance.now();
      const tick = now => {
        const p = Math.min((now - start) / duration, 1);
        const ease = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(ease * target) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      obs.unobserve(el);
    });
  }, { threshold: 0.5 });
  obs.observe(el);
});

/* ---------- FLOATING LABEL SELECT ---------- */
document.querySelectorAll('.field select').forEach(sel => {
  const upd = () => sel.parentElement.classList.toggle('has-val', sel.value !== '');
  sel.addEventListener('change', upd);
  upd();
});

/* ---------- CONTACT FORM — submitted via Formspree ---------- */
