// Basic interactions: theme toggle, mobile menu, reveal on scroll, simple form UI feedback
document.addEventListener('DOMContentLoaded', () => {
  // Theme toggle (persists to localStorage)
  const themeBtn = document.getElementById('theme-toggle');
  const root = document.documentElement;
  const saved = localStorage.getItem('theme');
  if (saved === 'light') root.setAttribute('data-theme', 'light');

  themeBtn.addEventListener('click', () => {
    if (root.getAttribute('data-theme') === 'light') {
      root.removeAttribute('data-theme');
      localStorage.removeItem('theme');
      themeBtn.textContent = '🌙';
    } else {
      root.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
      themeBtn.textContent = '🌞';
    }
  });

  // Mobile nav
  const menuToggle = document.getElementById('menu-toggle');
  const mobileNav = document.getElementById('mobileNav');
  const mobileClose = document.getElementById('mobile-close');
  menuToggle?.addEventListener('click', () => {
    if (!mobileNav) return;
    mobileNav.style.display = 'flex';
    mobileNav.setAttribute('aria-hidden', 'false');
  });
  mobileClose?.addEventListener('click', () => {
    if (!mobileNav) return;
    mobileNav.style.display = 'none';
    mobileNav.setAttribute('aria-hidden', 'true');
  });
  // Close mobile nav when link clicked
  document.querySelectorAll('.mobile-link').forEach(a=>{
    a.addEventListener('click', ()=> {
      if (mobileNav) { mobileNav.style.display='none'; mobileNav.setAttribute('aria-hidden','true') }
    });
  });

  // Simple scroll spy to highlight nav links
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  function onScrollSpy(){
    const scrollPos = window.scrollY + innerHeight/2;
    sections.forEach(sec=>{
      const top = sec.offsetTop;
      const bottom = top + sec.offsetHeight;
      if (scrollPos >= top && scrollPos < bottom) {
        navLinks.forEach(l=> l.classList.remove('active'));
        const link = document.querySelector(`.nav-link[href="#${sec.id}"]`);
        link?.classList.add('active');
      }
    });
  }
  onScrollSpy();
  window.addEventListener('scroll', onScrollSpy, {passive:true});

  // IntersectionObserver reveal animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        // optional: unobserve to prevent repeated toggles
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // simple form feedback (no real validation beyond HTML)
  const form = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  if (form) {
    form.addEventListener('submit', (e) => {
      // show basic spinner/feedback; real submission still goes to Formspree
      formStatus.textContent = 'Sending…';
      formStatus.style.opacity = 1;
      setTimeout(()=> formStatus.textContent = 'Sent — thank you!', 1200);
    });
  }

  // set year in footer
  document.getElementById('year').textContent = new Date().getFullYear();
});
