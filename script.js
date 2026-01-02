// script.js
(() => {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  // Smooth scroll for internal anchors
  $$('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (!href || href === '#') return;

      const target = $(href);
      if (!target) return;

      // Close mobile nav on click
      const mobileNav = $('#mobileNav');
      const hamburger = $('#hamburger');
      if (mobileNav && !mobileNav.hasAttribute('hidden')) {
        mobileNav.setAttribute('hidden', '');
        hamburger?.setAttribute('aria-expanded', 'false');
      }

      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // Mobile nav toggle
  const hamburger = $('#hamburger');
  const mobileNav = $('#mobileNav');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      const isOpen = !mobileNav.hasAttribute('hidden');
      if (isOpen) {
        mobileNav.setAttribute('hidden', '');
        hamburger.setAttribute('aria-expanded', 'false');
      } else {
        mobileNav.removeAttribute('hidden');
        hamburger.setAttribute('aria-expanded', 'true');
      }
    });
  }

  // Reveal on scroll
  const revealEls = $$('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14 });

  revealEls.forEach(el => io.observe(el));

  // Sticky bar hide near bottom (so it doesn't fight the email section)
  const stickyBar = $('#stickyBar');
  const emailSection = $('#email');
  if (stickyBar && emailSection) {
    const stickyIO = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) stickyBar.classList.add('hidden');
        else stickyBar.classList.remove('hidden');
      });
    }, { threshold: 0.22 });

    stickyIO.observe(emailSection);
  }

  // Email form (front-end only). Wire to your backend/email provider later.
  const form = $('#emailForm');
  const input = $('#emailInput');
  const msg = $('#formMsg');

  const setMsg = (text, type) => {
    if (!msg) return;
    msg.textContent = text || '';
    msg.classList.remove('ok', 'err');
    if (type) msg.classList.add(type);
  };

  const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v).trim());

  if (form && input) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = input.value.trim();

      if (!email) return setMsg('Please enter your email address.', 'err');
      if (!isValidEmail(email)) return setMsg('That email doesn’t look right. Try again.', 'err');

      // Demo success (replace with your real integration)
      setMsg('You’re in. We’ll notify you when new adventures release.', 'ok');
      input.value = '';
    });
  }
})();
