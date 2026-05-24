/* ===========================
   AHMED YASSINE DRIDI — PORTFOLIO JS
   =========================== */

// ── Reveal on scroll ──────────────────────────────────────────
const revealEls = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => observer.observe(el));

// ── Trigger hero reveals immediately ──────────────────────────
window.addEventListener('load', () => {
  document.querySelectorAll('#hero .reveal').forEach(el => {
    setTimeout(() => el.classList.add('visible'), 100);
  });
});

// ── Animate skill bars when visible ───────────────────────────
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const fill = e.target;
      const w = fill.getAttribute('data-w');
      setTimeout(() => { fill.style.width = w + '%'; }, 200);
      barObserver.unobserve(fill);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.skill-fill').forEach(el => barObserver.observe(el));

// ── Animate counters ───────────────────────────────────────────
function animateCounter(el, target, duration = 1500) {
  let start = 0;
  const step = Math.ceil(target / (duration / 16));
  const timer = setInterval(() => {
    start += step;
    if (start >= target) { start = target; clearInterval(timer); }
    el.textContent = start;
  }, 16);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const target = parseInt(e.target.getAttribute('data-target'));
      animateCounter(e.target, target);
      counterObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-num').forEach(el => counterObserver.observe(el));

// ── Navbar scroll effect ───────────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.style.background = 'rgba(10,22,40,0.98)';
  } else {
    navbar.style.background = 'rgba(10,22,40,0.85)';
  }
});

// ── Active nav link highlight ──────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === '#' + e.target.id) {
          link.style.color = 'var(--white)';
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

// ── Hamburger menu ─────────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});

document.querySelectorAll('.mm-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});

// Close menu on outside click
document.addEventListener('click', (e) => {
  if (!navbar.contains(e.target) && !mobileMenu.contains(e.target)) {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  }
});

// ── Smooth scroll for all anchor links ────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h'));
      const top = target.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ── Contact form ───────────────────────────────────────────────
const form = document.getElementById('contactForm');
const successMsg = document.getElementById('formSuccess');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = form.querySelector('.btn-primary');
  btn.textContent = 'Sending…';
  btn.disabled = true;

  // Simulate send (replace with actual EmailJS / Formspree etc.)
  setTimeout(() => {
    form.reset();
    btn.textContent = 'Message Sent ✓';
    btn.style.background = '#0e9f6e';
    successMsg.classList.add('show');
    setTimeout(() => {
      btn.textContent = 'Send Message →';
      btn.style.background = '';
      btn.disabled = false;
      successMsg.classList.remove('show');
    }, 4000);
  }, 1200);
});

// ── Cursor glow effect (desktop only) ─────────────────────────
if (window.matchMedia('(pointer: fine)').matches) {
  const glow = document.createElement('div');
  glow.style.cssText = `
    position: fixed; width: 300px; height: 300px;
    border-radius: 50%; pointer-events: none; z-index: 9999;
    background: radial-gradient(circle, rgba(79,156,249,0.06) 0%, transparent 70%);
    transform: translate(-50%, -50%);
    transition: opacity 0.3s;
    top: 0; left: 0;
  `;
  document.body.appendChild(glow);

  document.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  });
}

// ── Typing effect for hero tag ─────────────────────────────────
const tag = document.querySelector('.hero-tag');
if (tag) {
  const original = tag.textContent;
  tag.textContent = '';
  let i = 0;
  const typeTimer = setInterval(() => {
    tag.textContent += original[i++];
    if (i >= original.length) clearInterval(typeTimer);
  }, 40);
}

console.log('%c Ahmed Yassine Dridi — Portfolio', 'color:#4F9CF9;font-family:monospace;font-size:14px;font-weight:bold;');
console.log('%c Built with ❤️ | Open to opportunities', 'color:#8A9AB5;font-family:monospace;font-size:11px;');
