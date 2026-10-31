/* =========================================
   FATHAHILLAH.DEV — MAIN JAVASCRIPT
========================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Navbar scroll behavior ---- */
  const navbar = document.getElementById('navbar');
  const handleNavScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  };
  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();

  /* ---- Active nav link on scroll ---- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const setActiveLink = () => {
    let current = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 100;
      if (window.scrollY >= top) current = sec.id;
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.dataset.section === current);
    });
  };
  window.addEventListener('scroll', setActiveLink, { passive: true });

  /* ---- Mobile nav toggle ---- */
  const navToggle = document.getElementById('navToggle');
  const navMenu   = document.getElementById('navMenu');

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    navMenu.classList.toggle('open');
    document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
  });

  // Close menu on link click
  navMenu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('open');
      navMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  /* ---- Language toggle (stub, can be extended) ---- */
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  /* ---- Skills tabs ---- */
  const tabBtns    = document.querySelectorAll('.tab-btn');
  const skillsContents = {
    teknologi: document.getElementById('tab-teknologi'),
    tools:     document.getElementById('tab-tools'),
  };

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const target = btn.dataset.tab;
      Object.entries(skillsContents).forEach(([key, el]) => {
        if (el) el.classList.toggle('hidden', key !== target);
      });
      // Animate bars when tab switches
      animateSkillBars();
    });
  });

  /* ---- Project filter ---- */
  const filterBtns   = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;

      projectCards.forEach(card => {
        const categories = card.dataset.category || '';
        const show = filter === 'semua' || categories.includes(filter);
        card.style.display = show ? '' : 'none';
        card.classList.toggle('hide', !show);
      });
    });
  });

  /* ---- Skill bar animation ---- */
  function animateSkillBars() {
    document.querySelectorAll('.skill-bar').forEach(bar => {
      const targetWidth = bar.dataset.width + '%';
      bar.style.width = '0%';
      // Force reflow then animate
      void bar.offsetWidth;
      setTimeout(() => { bar.style.width = targetWidth; }, 50);
    });
  }

  /* ---- Intersection Observer for scroll animations ---- */
  const observerOptions = { threshold: 0.15, rootMargin: '0px 0px -50px 0px' };

  // Fade-in-up for cards / sections
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll(
    '.skill-card, .project-card, .blog-card, .timeline-item, .edu-card, .stat-item'
  ).forEach((el, i) => {
    el.classList.add('fade-in-up');
    el.style.transitionDelay = `${(i % 4) * 0.1}s`;
    fadeObserver.observe(el);
  });

  // Skill bars trigger when skills section is visible
  const skillsSection = document.getElementById('keahlian');
  let skillsAnimated = false;
  if (skillsSection) {
    const skillsObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !skillsAnimated) {
        skillsAnimated = true;
        animateSkillBars();
        skillsObserver.disconnect();
      }
    }, { threshold: 0.2 });
    skillsObserver.observe(skillsSection);
  }

  /* ---- Back to top button ---- */
  const backToTop = document.getElementById('backToTop');
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---- Contact form submission (stub) ---- */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      const origText = btn.innerHTML;
      btn.innerHTML = '<i class="fas fa-check"></i> Pesan Terkirim!';
      btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
      btn.disabled = true;
      setTimeout(() => {
        btn.innerHTML = origText;
        btn.style.background = '';
        btn.disabled = false;
        contactForm.reset();
      }, 3000);
    });
  }

  /* ---- Smooth scroll for anchor links ---- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ---- Floating tech icon random drift ---- */
  const techIcons = document.querySelectorAll('.tech-icon');
  techIcons.forEach((icon, i) => {
    icon.style.animationDuration = `${2.5 + i * 0.4}s`;
    icon.style.animationDelay    = `${i * 0.3}s`;
  });

});
