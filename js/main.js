/* ============================================================
   GATEWAY DIGITAL CO. — "The Arch" — Main JS
   ============================================================ */

/* ---------- MOBILE NAV ---------- */
const hamburger = document.querySelector('.hamburger');
const mobileNav = document.getElementById('mobile-nav');
if (hamburger && mobileNav) {
  hamburger.addEventListener('click', () => mobileNav.classList.toggle('open'));
  mobileNav.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => mobileNav.classList.remove('open'))
  );
}

/* ---------- REVEAL ON SCROLL ---------- */
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(
    entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  revealEls.forEach(el => io.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('visible'));
}

/* ---------- BEFORE / AFTER SLIDER ---------- */
const slider = document.getElementById('ba-slider');
const handle = document.getElementById('ba-handle');
if (slider && handle) {
  let dragging = false;

  const setCut = clientX => {
    const rect = slider.getBoundingClientRect();
    let pct = ((clientX - rect.left) / rect.width) * 100;
    pct = Math.max(4, Math.min(96, pct));
    slider.style.setProperty('--cut', pct + '%');
    handle.setAttribute('aria-valuenow', Math.round(pct));
  };

  slider.addEventListener('pointerdown', e => {
    dragging = true;
    slider.setPointerCapture(e.pointerId);
    setCut(e.clientX);
  });
  slider.addEventListener('pointermove', e => {
    if (dragging) setCut(e.clientX);
  });
  ['pointerup', 'pointercancel'].forEach(evt =>
    slider.addEventListener(evt, () => (dragging = false))
  );

  /* keyboard access */
  handle.addEventListener('keydown', e => {
    const cur = parseFloat(getComputedStyle(slider).getPropertyValue('--cut')) || 50;
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      e.preventDefault();
      const next = e.key === 'ArrowLeft' ? cur - 4 : cur + 4;
      const pct = Math.max(4, Math.min(96, next));
      slider.style.setProperty('--cut', pct + '%');
      handle.setAttribute('aria-valuenow', Math.round(pct));
    }
  });

  /* gentle attract animation on first view */
  if ('IntersectionObserver' in window) {
    const nudge = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            let t = 0;
            const anim = setInterval(() => {
              t += 1;
              const pct = 50 + Math.sin(t / 8) * 8 * Math.max(0, 1 - t / 60);
              if (t >= 60 || dragging) {
                clearInterval(anim);
                return;
              }
              slider.style.setProperty('--cut', pct + '%');
            }, 24);
            nudge.unobserve(e.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    nudge.observe(slider);
  }
}

/* ---------- FOOTER YEAR ---------- */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
