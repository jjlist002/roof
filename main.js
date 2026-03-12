// CHUNIL ROOF — Sample 3: Cinematic Dark

document.addEventListener('DOMContentLoaded', () => {

  const nav = document.getElementById('nav');
  const floatBtns = document.getElementById('floatBtns');

  function onScroll() {
    const y = window.scrollY;
    nav.classList.toggle('scrolled', y > 40);
    floatBtns.classList.toggle('on', y > 500);
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
    '.intro-card, .product-card, .solution-col, .showcase-text, .benefit-item, .gallery-item, .process-card, .cta-content, .contact-sidebar, .cform'
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

  // Contact form — Web3Forms
  const WEB3FORMS_KEY = 'ed1f8ced-c8a0-4526-a2b7-b2105ae5b3d3';

  const form = document.getElementById('contactForm');
  const modal = document.getElementById('modal');
  const submitBtn = form.querySelector('button[type="submit"]');

  form.addEventListener('submit', e => {
    e.preventDefault();
    submitBtn.disabled = true;
    submitBtn.textContent = '전송 중...';

    const d = new FormData(form);
    const payload = {
      access_key: WEB3FORMS_KEY,
      subject: '[천일지붕 문의] ' + d.get('name') + '님',
      from_name: d.get('name'),
      phone: d.get('phone'),
      service: d.get('service') || '미선택',
      message: d.get('message'),
    };

    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          modal.classList.add('on');
          form.reset();
        } else {
          throw new Error(data.message);
        }
      })
      .catch(err => {
        console.error('Web3Forms error:', err);
        alert('전송에 실패했습니다. 직접 전화(010-7270-6053) 또는 이메일로 문의해주세요.');
      })
      .finally(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = '문의 보내기';
      });
  });

  modal.addEventListener('click', e => {
    if (e.target === modal) modal.classList.remove('on');
  });

});
