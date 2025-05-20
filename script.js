const sections = document.querySelectorAll('section:not(.hero)');
const navLinks = document.querySelectorAll('nav a');
const backToTop = document.getElementById('backToTop');
const header = document.querySelector('header');
let isScrolling;

// Active nav link functionality
function updateActiveNav() {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 150) {
      current = section.id;
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    link.removeAttribute('aria-current');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });
}

// Back to top button visibility
function updateBackToTop() {
  if (window.scrollY > 300) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
}

// Header scroll effect
function updateHeader() {
  if (window.scrollY > 100) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}

// Combined scroll handler with throttling
function onScroll() {
  if (!isScrolling) {
    window.requestAnimationFrame(() => {
      updateActiveNav();
      updateBackToTop();
      updateHeader();
      isScrolling = false;
    });
    isScrolling = true;
  }
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

window.addEventListener('scroll', onScroll);

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
  updateActiveNav();
  updateBackToTop();
  updateHeader();
});