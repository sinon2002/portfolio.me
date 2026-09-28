// Подгружает части сайта из папки partials/
const parts = document.querySelectorAll('[data-include]');
Promise.all([...parts].map(async el => {
  const r = await fetch(el.dataset.include);
  el.innerHTML = await r.text();
})).then(() => {
  if (location.hash) document.querySelector(location.hash)?.scrollIntoView();
});
