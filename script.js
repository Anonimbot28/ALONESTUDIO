/* ============ ALONE STUDIO — shared behavior ============ */

/* preloader */
window.addEventListener('load', () => {
  const pre = document.getElementById('preloader');
  if(!pre) return;
  setTimeout(() => pre.classList.add('hide'), 500);
});

/* language toggle (persists across pages) */
function setLang(lang){
  document.documentElement.setAttribute('lang', lang);
  const ru = document.getElementById('btn-ru');
  const en = document.getElementById('btn-en');
  if(ru) ru.classList.toggle('active', lang==='ru');
  if(en) en.classList.toggle('active', lang==='en');
  try{ localStorage.setItem('alone-lang', lang); }catch(e){}
}
(function initLang(){
  let saved = 'ru';
  try{ saved = localStorage.getItem('alone-lang') || 'ru'; }catch(e){}
  document.addEventListener('DOMContentLoaded', () => setLang(saved));
})();

/* mobile menu */
function toggleMenu(){
  const menu = document.getElementById('mobileMenu');
  const btn = document.getElementById('hamburgerBtn');
  if(!menu) return;
  menu.classList.toggle('open');
  btn.classList.toggle('open');
}
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.mobile-menu a').forEach(a=>{
    a.addEventListener('click', () => {
      const menu = document.getElementById('mobileMenu');
      if(menu) menu.classList.remove('open');
    });
  });
});

/* scroll reveal */
document.addEventListener('DOMContentLoaded', () => {
  const targets = document.querySelectorAll('.reveal, .reveal-stagger');
  if(!('IntersectionObserver' in window)){
    targets.forEach(t => t.classList.add('in'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, {threshold:0.15, rootMargin:'0px 0px -60px 0px'});
  targets.forEach(t => io.observe(t));
});

/* card cursor-glow */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mx', ((e.clientX - rect.left) / rect.width * 100) + '%');
      card.style.setProperty('--my', ((e.clientY - rect.top) / rect.height * 100) + '%');
    });
  });
});

/* price tabs */
function showPanel(id, btn){
  document.querySelectorAll('.price-panel').forEach(p=>p.classList.remove('active'));
  document.getElementById('panel-'+id).classList.add('active');
  document.querySelectorAll('.price-tab').forEach(t=>t.classList.remove('active'));
  btn.classList.add('active');
}
