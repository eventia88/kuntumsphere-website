const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#nav-utama');
const english = document.documentElement.lang === 'en';
toggle?.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') !== 'true';
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? (english ? 'Close menu' : 'Tutup menu') : (english ? 'Open menu' : 'Buka menu'));
  nav.classList.toggle('open', open);
});
nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  toggle?.setAttribute('aria-expanded', 'false');
  toggle?.setAttribute('aria-label', english ? 'Open menu' : 'Buka menu');
  nav.classList.remove('open');
}));
document.querySelector('#year').textContent = new Date().getFullYear();
