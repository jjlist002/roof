// CHUNIL ROOF — Sample 3: Cinematic Dark

document.addEventListener('DOMContentLoaded', () => {

  const nav = document.getElementById('nav');
  const floatBtn = document.getElementById('floatBtn');

  function onScroll() {
    const y = window.scrollY;
    nav.classList.toggle('scrolled', y > 40);
    floatBtn.classList.toggle('on', y > 500);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Hamburger
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');

  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('open');
  });

  navMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => navMenu.classList.remove('open'));
  });

  // Reveal on scroll
  const els = document.querySelectorAll(
    '.about-left, .about-right, .svc-row, .pf-item, .proc-card, .contact-sidebar, .cform'
  );
  els.forEach(el => el.classList.add('reveal'));

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('on');
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

  els.forEach(el => obs.observe(el));

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const href = a.getAttribute('href');
      if (href === '#') return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        window.scrollTo({ top: target.offsetTop - nav.offsetHeight, behavior: 'smooth' });
      }
    });
  });

  // Contact form
  const form = document.getElementById('contactForm');
  const modal = document.getElementById('modal');

  form.addEventListener('submit', e => {
    e.preventDefault();
    const d = new FormData(form);
    const subj = encodeURIComponent(`[천일지붕 문의] ${d.get('name')}님`);
    const body = encodeURIComponent(
      `이름: ${d.get('name')}\n연락처: ${d.get('phone')}\n관심분야: ${d.get('service') || '미선택'}\n\n${d.get('message')}`
    );
    window.location.href = `mailto:misotechne@naver.com?subject=${subj}&body=${body}`;
    setTimeout(() => { modal.classList.add('on'); form.reset(); }, 500);
  });

  modal.addEventListener('click', e => {
    if (e.target === modal) modal.classList.remove('on');
  });

});
