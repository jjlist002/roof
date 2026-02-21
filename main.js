// ============================================
// CHUNIL ROOF - Main JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  // --- Navigation scroll effect ---
  const nav = document.getElementById('nav');
  const floatingCta = document.getElementById('floatingCta');

  function handleScroll() {
    const scrollY = window.scrollY;
    nav.classList.toggle('scrolled', scrollY > 50);
    floatingCta.classList.toggle('visible', scrollY > 600);
  }
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // --- Mobile nav toggle ---
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    navToggle.classList.toggle('active');
  });

  // Close mobile nav on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.classList.remove('active');
    });
  });

  // --- Counter animation ---
  function animateCounters() {
    const counters = document.querySelectorAll('.stat-number[data-target]');
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'));
      const duration = 2000;
      const start = performance.now();

      function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        counter.textContent = Math.floor(target * eased);

        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          counter.textContent = target;
        }
      }
      requestAnimationFrame(update);
    });
  }

  // Trigger counter animation when hero is visible
  const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();
        heroObserver.disconnect();
      }
    });
  }, { threshold: 0.5 });

  const heroStats = document.querySelector('.hero-stats');
  if (heroStats) heroObserver.observe(heroStats);

  // --- Scroll animations ---
  const fadeElements = document.querySelectorAll(
    '.section-header, .service-card, .portfolio-item, .process-step, .about-text, .about-visual, .contact-info-panel, .contact-form'
  );

  fadeElements.forEach(el => el.classList.add('fade-in'));

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  fadeElements.forEach(el => fadeObserver.observe(el));

  // --- Portfolio filter ---
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      portfolioItems.forEach(item => {
        if (filter === 'all' || item.getAttribute('data-category') === filter) {
          item.classList.remove('hidden');
          item.style.animation = 'fadeInUp 0.4s ease-out forwards';
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });

  // --- Contact form handler ---
  const contactForm = document.getElementById('contactForm');
  const successModal = document.getElementById('successModal');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const phone = formData.get('phone');
    const email = formData.get('email') || '미입력';
    const service = formData.get('service') || '미선택';
    const message = formData.get('message');

    // Build mailto body
    const subject = encodeURIComponent(`[천일지붕 홈페이지 문의] ${name}님`);
    const body = encodeURIComponent(
      `이름/업체명: ${name}\n` +
      `연락처: ${phone}\n` +
      `이메일: ${email}\n` +
      `관심 시공 분야: ${service}\n\n` +
      `문의 내용:\n${message}`
    );

    // Open email client
    window.location.href = `mailto:misotechne@naver.com?subject=${subject}&body=${body}`;

    // Show success modal
    setTimeout(() => {
      successModal.classList.add('active');
      contactForm.reset();
    }, 500);
  });

  // Close modal on outside click
  successModal.addEventListener('click', (e) => {
    if (e.target === successModal) {
      successModal.classList.remove('active');
    }
  });

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;

      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const navHeight = nav.offsetHeight;
        const targetPos = target.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({ top: targetPos, behavior: 'smooth' });
      }
    });
  });

});

// Fade in animation keyframe (added via JS to avoid CSS file dependency)
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(style);
