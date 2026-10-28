/**
 * portfolio/js/script.js
 * Vanilla JS – no external dependencies.
 * Sections: Navbar | Typed hero | Mobile menu | Scroll-spy |
 *           Back-to-top | Intersection observer (AOS) | Contact form
 */

'use strict';

/* ── Helper ───────────────────────────────────────────────── */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

/* ── 1. Navbar scroll behaviour ───────────────────────────── */
(function initNavbarScroll() {
  const navbar = $('#navbar');
  if (!navbar) return;

  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load
})();

/* ── 2. Mobile nav toggle ─────────────────────────────────── */
(function initMobileNav() {
  const toggle = $('#nav-toggle');
  const nav    = $('#primary-nav');
  if (!toggle || !nav) return;

  const open  = () => {
    nav.classList.add('nav-open');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Close navigation menu');
    document.body.style.overflow = 'hidden';
  };
  const close = () => {
    nav.classList.remove('nav-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open navigation menu');
    document.body.style.overflow = '';
  };

  toggle.addEventListener('click', () => {
    toggle.getAttribute('aria-expanded') === 'true' ? close() : open();
  });

  // Close on link click
  $$('.navbar__link', nav).forEach(link => link.addEventListener('click', close));

  // Close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && nav.classList.contains('nav-open')) {
      close();
      toggle.focus();
    }
  });

  // Close when clicking outside nav
  document.addEventListener('click', e => {
    if (nav.classList.contains('nav-open') &&
        !nav.contains(e.target) &&
        !toggle.contains(e.target)) {
      close();
    }
  });
})();

/* ── 3. Typed-text hero effect ────────────────────────────── */
(function initTyped() {
  const el = $('#typed-role');
  if (!el) return;

  const phrases = [
    'Frontend Developer',
    'Full Stack Developer',
    'React & Django Developer',
    'Problem Solver',
  ];

  let phraseIdx  = 0;
  let charIdx    = 0;
  let isDeleting = false;
  let isPaused   = false;

  const TYPING_SPEED   = 80;
  const DELETING_SPEED = 45;
  const PAUSE_AFTER    = 1800;
  const PAUSE_BEFORE   = 400;

  function tick() {
    const phrase = phrases[phraseIdx];

    if (isPaused) return;

    if (!isDeleting) {
      // Typing forward
      charIdx++;
      el.textContent = phrase.slice(0, charIdx);
      el.setAttribute('aria-label', el.textContent);

      if (charIdx === phrase.length) {
        // Pause then start deleting
        isPaused = true;
        setTimeout(() => { isPaused = false; isDeleting = true; loop(); }, PAUSE_AFTER);
        return;
      }
    } else {
      // Deleting
      charIdx--;
      el.textContent = phrase.slice(0, charIdx);
      el.setAttribute('aria-label', el.textContent);

      if (charIdx === 0) {
        isDeleting = false;
        phraseIdx  = (phraseIdx + 1) % phrases.length;
        isPaused = true;
        setTimeout(() => { isPaused = false; loop(); }, PAUSE_BEFORE);
        return;
      }
    }

    loop();
  }

  function loop() {
    if (isPaused) return;
    const delay = isDeleting ? DELETING_SPEED : TYPING_SPEED;
    setTimeout(tick, delay);
  }

  loop();
})();

/* ── 4. Active nav link on scroll (scroll-spy) ────────────── */
(function initScrollSpy() {
  const sections = $$('section[id]');
  const navLinks = $$('.navbar__link');
  if (!sections.length || !navLinks.length) return;

  const OFFSET = 100; // px below top of viewport to trigger

  function updateActive() {
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - OFFSET) {
        current = sec.id;
      }
    });
    navLinks.forEach(link => {
      const href = link.getAttribute('href').replace('#', '');
      link.classList.toggle('active', href === current);
    });
  }

  window.addEventListener('scroll', updateActive, { passive: true });
  updateActive();
})();

/* ── 5. Back-to-top button ────────────────────────────────── */
(function initBackToTop() {
  const btn = $('#back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

/* ── 6. Intersection Observer (lightweight AOS) ───────────── */
(function initAOS() {
  const targets = $$('[data-aos]');
  if (!targets.length) return;

  // Respect prefers-reduced-motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    targets.forEach(el => el.classList.add('aos-animate'));
    return;
  }

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('aos-animate');
          observer.unobserve(entry.target); // animate once
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  targets.forEach(el => observer.observe(el));
})();

/* ── 7. Dynamic footer year ───────────────────────────────── */
(function initFooterYear() {
  const el = $('#footer-year');
  if (el) el.textContent = new Date().getFullYear();
})();

/* ── 8. Contact form validation ───────────────────────────── */
(function initContactForm() {
  const form = $('#contact-form');
  if (!form) return;

  const statusEl = $('#form-status');

  /* Field descriptors */
  const fields = [
    {
      id: 'cf-name',
      errorId: 'cf-name-err',
      validate(val) {
        if (!val.trim()) return 'Name is required.';
        if (val.trim().length < 2) return 'Name must be at least 2 characters.';
        return '';
      },
    },
    {
      id: 'cf-email',
      errorId: 'cf-email-err',
      validate(val) {
        if (!val.trim()) return 'Email address is required.';
        // RFC 5322-ish quick check
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim())) {
          return 'Please enter a valid email address.';
        }
        return '';
      },
    },
    {
      id: 'cf-message',
      errorId: 'cf-message-err',
      validate(val) {
        if (!val.trim()) return 'Message is required.';
        if (val.trim().length < 10) return 'Message must be at least 10 characters.';
        return '';
      },
    },
  ];

  /** Show or clear an error for one field */
  function setFieldError(field, message) {
    const input = $(`#${field.id}`);
    const errEl = $(`#${field.errorId}`);
    if (!input || !errEl) return;

    if (message) {
      input.classList.add('input--error');
      errEl.textContent = message;
      input.setAttribute('aria-invalid', 'true');
    } else {
      input.classList.remove('input--error');
      errEl.textContent = '';
      input.removeAttribute('aria-invalid');
    }
  }

  /** Validate all fields; return true if all pass */
  function validateAll() {
    let valid = true;
    fields.forEach(field => {
      const input = $(`#${field.id}`);
      if (!input) return;
      const msg = field.validate(input.value);
      setFieldError(field, msg);
      if (msg) valid = false;
    });
    return valid;
  }

  /** Show status message */
  function showStatus(message, type) {
    if (!statusEl) return;
    statusEl.textContent = message;
    statusEl.className = `form-status status--${type}`;
  }
  function clearStatus() {
    if (!statusEl) return;
    statusEl.textContent = '';
    statusEl.className = 'form-status';
  }

  /* Live validation on blur */
  fields.forEach(field => {
    const input = $(`#${field.id}`);
    if (!input) return;
    input.addEventListener('blur', () => {
      setFieldError(field, field.validate(input.value));
    });
    input.addEventListener('input', () => {
      // Clear error as soon as user starts fixing
      if (input.classList.contains('input--error')) {
        setFieldError(field, field.validate(input.value));
      }
    });
  });

  /* Form submit */
  form.addEventListener('submit', e => {
    e.preventDefault();
    clearStatus();

    if (!validateAll()) {
      // Focus first errored field
      const firstError = form.querySelector('.input--error');
      if (firstError) firstError.focus();
      return;
    }

    /**
     * NOTE: No backend / email service is connected.
     * The form validates successfully but does NOT send a message.
     * See README.md §4 for integration options (Formspree, EmailJS, etc.).
     */
    showStatus(
      '✅ Your message looks good! However, no backend is connected yet — ' +
      'see the README for how to enable actual message delivery.',
      'info'
    );

    // Scroll status into view for screen readers
    if (statusEl) statusEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });
})();
