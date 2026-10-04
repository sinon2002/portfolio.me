// Подгружает части сайта из папки partials/
// data-after="#id"   — вставить часть после указанного блока
const parts = document.querySelectorAll('[data-include]');
Promise.all([...parts].map(async el => {
  const r = await fetch(el.dataset.include);
  el.innerHTML = await r.text();
})).then(() => {
  document.querySelectorAll('[data-after]').forEach(el => {
    const target = document.querySelector(el.dataset.after);
    if (target) { target.insertAdjacentHTML('afterend', el.innerHTML); el.remove(); }
  });
  if (location.hash) document.querySelector(location.hash)?.scrollIntoView();

  // Блоки один раз плавно появляются, когда до них долистываешь, и дальше остаются видимыми
  const reveal = document.querySelectorAll('#profile, #about, #work, footer');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.1, rootMargin: '0px 0px -5% 0px' });
  reveal.forEach(el => io.observe(el));
});
