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

// Prepare a website enquiry for the visitor to review and send in WhatsApp.
document.querySelectorAll('.website-enquiry').forEach(form => {
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const values = new FormData(form);
    const english = document.documentElement.lang === 'en';
    const fields = english ? [['name','Name'],['email','Email'],['phone','Phone'],['subject','Subject'],['service','Service'],['source','Found you via'],['message','Message']] : [['name','Nama'],['email','E-mel'],['phone','Telefon'],['subject','Subjek'],['service','Servis'],['source','Jumpa anda melalui'],['message','Mesej']];
    const lines = [english ? 'Hi Kuntum Sphere, I would like a website consultation.' : 'Hai Kuntum Sphere, saya ingin mendapatkan konsultasi website.', ''];
    fields.forEach(([key,label]) => { const value = String(values.get(key) || '').trim(); if (value) lines.push(label + ': ' + value); });
    const url = 'https://wa.me/60168693308?text=' + encodeURIComponent(lines.join('\n'));
    window.open(url, '_blank', 'noopener,noreferrer');
    const status = form.querySelector('.form-status');
    status.replaceChildren();
    const link = document.createElement('a'); link.href = url; link.target = '_blank'; link.rel = 'noopener noreferrer';
    link.textContent = english ? 'Open WhatsApp to review and send your enquiry.' : 'Buka WhatsApp untuk semak dan hantar pertanyaan anda.';
    status.append(link);
  });
});
