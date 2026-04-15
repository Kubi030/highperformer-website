// -------------------------------------------------------
// Highperformer Beratungsgesellschaft mbH – script.js
// -------------------------------------------------------

(function () {
  'use strict';

  // ── DOM References ──
  const sidebar        = document.getElementById('sidebar');
  const sidebarOverlay = document.getElementById('sidebar-overlay');
  const menuToggle     = document.getElementById('menu-toggle');
  const sidebarClose   = document.getElementById('sidebar-close');
  const disclaimerBar  = document.getElementById('disclaimer-bar');
  const closeDisclaimer = document.getElementById('close-disclaimer');
  const contentArea    = document.getElementById('content-area');
  const header         = document.getElementById('site-header');

  // ── Sidebar Open / Close ──
  function openSidebar() {
    sidebar.classList.add('open');
    sidebarOverlay.classList.add('visible');
    document.body.style.overflow = 'hidden';
  }

  function closeSidebar() {
    sidebar.classList.remove('open');
    sidebarOverlay.classList.remove('visible');
    document.body.style.overflow = '';
  }

  menuToggle.addEventListener('click', openSidebar);
  sidebarClose.addEventListener('click', closeSidebar);
  sidebarOverlay.addEventListener('click', closeSidebar);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && sidebar.classList.contains('open')) {
      closeSidebar();
    }
  });

  // ── Disclaimer ──
  if (closeDisclaimer) {
    closeDisclaimer.addEventListener('click', function () {
      disclaimerBar.classList.add('hidden');
    });
  }

  // ── Page Navigation (SPA-like) ──
  function navigateTo(pageId) {
    if (!pageId) return;

    // Hide all pages
    const pages = contentArea.querySelectorAll('.page');
    pages.forEach(function (p) { p.classList.remove('active'); });

    // Show target page
    const target = document.getElementById('page-' + pageId);
    if (target) {
      target.classList.add('active');
    }

    // Update sidebar active link + aria-current
    document.querySelectorAll('.s-link').forEach(function (link) {
      link.classList.remove('active');
      link.removeAttribute('aria-current');
      if (link.getAttribute('data-page') === pageId) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      }
    });

    // Update browser URL (enables back/forward + bookmarking)
    const urlHash = pageId === 'home' ? '#' : '#' + pageId;
    history.pushState({ page: pageId }, '', urlHash);

    // Close sidebar
    closeSidebar();

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Update browser title
    const titles = {
      'home': 'Highperformer Beratungsgesellschaft mbH',
      'ueber-uns': 'Über uns – Highperformer',
      'history': 'Unsere Geschichte – Highperformer',
      'unternehmensberatung': 'Unternehmensberatung – Highperformer',
      'wirtschaftspruefung': 'Wirtschaftsprüfung – Highperformer',
      'financial-advisory': 'Financial Advisory – Highperformer',
      'steuerberatung': 'Steuerberatung – Highperformer',
      'kontakt': 'Kontakt – Highperformer',
      'impressum': 'Impressum – Highperformer',
      'agb': 'AGB – Highperformer',
      'datenschutz': 'Datenschutz – Highperformer'
    };
    document.title = titles[pageId] || 'Highperformer Beratungsgesellschaft mbH';

    // Trigger entrance animations on the new page
    requestAnimationFrame(function () {
      initAnimations(target);
    });
  }

  // ── Attach click listeners to all [data-page] elements ──
  document.addEventListener('click', function (e) {
    // Handle smooth scroll links
    const scrollLink = e.target.closest('.scroll-to');
    if (scrollLink) {
      e.preventDefault();
      const targetId = scrollLink.getAttribute('href').substring(1);
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      return;
    }

    const trigger = e.target.closest('[data-page]');
    if (trigger) {
      e.preventDefault();
      const pageId = trigger.getAttribute('data-page');
      navigateTo(pageId);
    }
  });

  // ── Make hs-cards keyboard accessible ──
  document.querySelectorAll('.hs-card[data-page]').forEach(function (card) {
    card.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        navigateTo(card.getAttribute('data-page'));
      }
    });
  });

  // ── Contact form submission (demo) ──
  const kontaktForm = document.querySelector('.kontakt-form');
  if (kontaktForm) {
    kontaktForm.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!kontaktForm.reportValidity()) return;
      const btn = kontaktForm.querySelector('.btn-submit');
      const origText = btn.textContent;
      btn.textContent = '✓ Nachricht gesendet!';
      btn.style.background = '#16a34a';
      setTimeout(function () {
        btn.textContent = origText;
        btn.style.background = '';
        kontaktForm.reset();
      }, 3000);
    });
  }

  // ── Scroll Animations (IntersectionObserver) ──
  function initAnimations(scope) {
    const root = scope || document;
    const animTargets = root.querySelectorAll(
      '.hs-card, .svc-card, .value-card, .team-card, .approach-step, ' +
      '.wb, .tl-item, .qual-item, .ind-item, .office-card, .fa-highlight'
    );

    animTargets.forEach(function (el) {
      el.classList.add('fade-up');
    });

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    animTargets.forEach(function (el) { observer.observe(el); });
  }

  // ── Header shadow on scroll ──
  window.addEventListener('scroll', function () {
    if (window.scrollY > 10) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });

  // ── Counter animation for stat numbers ──
  function animateCounters() {
    const counters = document.querySelectorAll('.stat-n, .wb-n, .fa-n');
    const counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const el = entry.target;
          const text = el.textContent.trim();
          const match = text.match(/^([\d,.]+)/);
          if (match) {
            const finalNum = parseFloat(match[1].replace(',', '.'));
            const suffix = text.replace(match[1], '');
            const duration = 1500;
            const start = performance.now();

            function step(now) {
              const progress = Math.min((now - start) / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              const current = Math.round(finalNum * eased);
              el.textContent = current + suffix;
              if (progress < 1) requestAnimationFrame(step);
            }
            requestAnimationFrame(step);
          }
          counterObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(function (c) { counterObserver.observe(c); });
  }

  // ── Mark all decorative SVGs as aria-hidden ──
  document.querySelectorAll('svg:not([aria-label]):not([role="img"])').forEach(function (svg) {
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('focusable', 'false');
  });

  // ── Browser back/forward navigation ──
  window.addEventListener('popstate', function (e) {
    navigateTo((e.state && e.state.page) || 'home');
  });

  // ── Initialize: read URL hash on first load ──
  var initialPage = location.hash.slice(1) || 'home';
  navigateTo(initialPage);
  animateCounters();

})();
