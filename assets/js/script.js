// ========== STARS BACKGROUND ==========
function createStars() {
  const container = document.querySelector('.stars');
  for (let i = 0; i < 80; i++) {
    const star = document.createElement('span');
    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 100 + '%';
    star.style.width = star.style.height = (Math.random() * 2 + 1) + 'px';
    star.style.animationDelay = Math.random() * 3 + 's';
    star.style.animationDuration = (Math.random() * 3 + 2) + 's';
    container.appendChild(star);
  }
}

// ========== SCROLL REVEAL ==========
function initReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ========== MOBILE MENU ==========
function initMenu() {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.navbar nav');
  if (toggle) {
    toggle.addEventListener('click', () => nav.classList.toggle('open'));
    nav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => nav.classList.remove('open'));
    });
  }
}

// ========== STACK TABS ==========
function initTabs() {
  const buttons = document.querySelectorAll('.stack-tabs button');
  const items = document.querySelectorAll('.stack-item');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;

      items.forEach(item => {
        if (filter === 'all' || item.dataset.category === filter) {
          item.style.display = 'flex';
          item.style.animation = 'fadeIn 0.4s ease';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

// ========== SMOOTH NAVBAR HIDE ON SCROLL ==========
let lastScroll = 0;
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    const current = window.scrollY;
    if (current > lastScroll && current > 200) {
      navbar.style.transform = 'translateX(-50%) translateY(-100px)';
    } else {
      navbar.style.transform = 'translateX(-50%) translateY(0)';
    }
    lastScroll = current;
  });
  navbar.style.transition = 'transform 0.4s ease';
}

// ========== MODAL PROYECTOS ==========
function initModal() {
  const modal = document.getElementById('project-modal');
  const cards = document.querySelectorAll('.project-card');
  const closeBtn = document.querySelector('.close-modal');

  if (!modal || !cards.length) return;

  cards.forEach(card => {
    card.addEventListener('click', (e) => {
      // Evitar que el modal se abra si se hace click directamente en un link del card
      if (e.target.closest('a')) return;

      const title = card.getAttribute('data-title');
      const desc = card.getAttribute('data-description');
      const img = card.getAttribute('data-image');
      const github = card.getAttribute('data-github');
      const tech = card.getAttribute('data-tech').split(',');

      document.getElementById('modal-title').innerText = title;
      document.getElementById('modal-description').innerText = desc;
      document.getElementById('modal-image').src = img;
      document.getElementById('modal-github').href = github;

      const techContainer = document.getElementById('modal-tech');
      techContainer.innerHTML = '';
      tech.forEach(t => {
        const span = document.createElement('span');
        span.innerText = t;
        techContainer.appendChild(span);
      });

      modal.classList.add('active');
      document.body.style.overflow = 'hidden'; // Bloquear scroll
    });
  });

  closeBtn.addEventListener('click', () => {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  });

  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  });

  // Cerrar con tecla Escape
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      modal.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  });
}

// ========== INIT ==========
document.addEventListener('DOMContentLoaded', () => {
  createStars();
  initReveal();
  initMenu();
  initTabs();
  initNavbar();
  initModal();
});

// CSS animation for tab filter
const style = document.createElement('style');
style.textContent = `@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }`;
document.head.appendChild(style);
