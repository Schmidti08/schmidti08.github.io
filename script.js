// Slideshow
function moveSlide(btn, dir) {
  const sw = btn.closest('.slideshow');
  const slides = [...sw.querySelectorAll('.slide')];
  let cur = slides.findIndex(s => s.classList.contains('active'));
  slides[cur].classList.remove('active');
  cur = (cur + dir + slides.length) % slides.length;
  slides[cur].classList.add('active');
  sw.querySelectorAll('.slide-dots span').forEach((d, i) => d.classList.toggle('active', i === cur));
}

document.querySelectorAll('.slideshow').forEach(sw => {
  const dots = sw.querySelector('.slide-dots');
  sw.querySelectorAll('.slide').forEach((_, i) => {
    const d = document.createElement('span');
    if (i === 0) d.classList.add('active');
    d.onclick = () => {
      sw.querySelectorAll('.slide').forEach((s, j) => s.classList.toggle('active', j === i));
      dots.querySelectorAll('span').forEach((sp, j) => sp.classList.toggle('active', j === i));
    };
    dots.appendChild(d);
  });
});

// Nav name fade on scroll past hero
const nav = document.querySelector('nav');
const hero = document.querySelector('header');

const heroObserver = new IntersectionObserver(([entry]) => {
  nav.classList.toggle('scrolled', !entry.isIntersecting);
}, { threshold: 0 });

heroObserver.observe(hero);

// Subtle fade-in for projects and skill rows
const fadeEls = document.querySelectorAll('.project, .skill-row');

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.05 });

fadeEls.forEach(el => {
  if (el.classList.contains('project-dim')) return;
  el.style.opacity = '0';
  el.style.transform = 'translateY(10px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  fadeObserver.observe(el);
});
