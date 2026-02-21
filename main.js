// CHUNIL ROOF - Sample 2

document.addEventListener('DOMContentLoaded', () => {

  const nav = document.getElementById('nav');
  const floatPhone = document.getElementById('floatPhone');

  // Scroll effects
  function onScroll() {
    const y = window.scrollY;
    nav.classList.toggle('scrolled', y > 40);
    floatPhone.classList.toggle('show', y > 500);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile nav
  const toggle = document.getElementById('navToggle');
  const menu = document.getElementById('navMenu');

  toggle.addEventListener('click', () => {
    menu.classList.toggle('open');
  });

  menu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      menu.classList.remove('open');
    });
  });

  // Scroll animation
  const els = document.querySelectorAll(
    '.split-left, .split-right, .service-card, .work-item, .process-card, .contact-left, .contact-form'
  );
  els.forEach(el => el.classList.add('fade-up'));

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('show');
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

  els.forEach(el => obs.observe(el));

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const href = a.getAttribute('href');
      if (href === '#') return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const offset = nav.offsetHeight;
        window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
      }
    });
  });

  // Contact form
  const form = document.getElementById('contactForm');
  const modal = document.getElementById('modal');

  form.addEventListener('submit', e => {
    e.preventDefault();
    const data = new FormData(form);
    const subject = encodeURIComponent(`[천일지붕 문의] ${data.get('name')}님`);
    const body = encodeURIComponent(
      `이름: ${data.get('name')}\n연락처: ${data.get('phone')}\n관심분야: ${data.get('service') || '미선택'}\n\n${data.get('message')}`
    );
    window.location.href = `mailto:misotechne@naver.com?subject=${subject}&body=${body}`;
    setTimeout(() => {
      modal.classList.add('show');
      form.reset();
    }, 500);
  });

  modal.addEventListener('click', e => {
    if (e.target === modal) modal.classList.remove('show');
  });

});
