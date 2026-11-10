/* Gemm · página de proyecto: videos que se reproducen a la vista, copiar correo y aparición suave */
(() => {
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.documentElement.classList.add('js');
  const vio = new IntersectionObserver(es => es.forEach(e => {
    const v = e.target; if (e.isIntersecting && !reduce) { v.preload = 'auto'; v.play().catch(() => {}); } else v.pause();
  }), { threshold: .25 });
  $$('video[data-autoplay]').forEach(v => vio.observe(v));
  $$('[data-mail]').forEach(a => {
    const label = a.querySelector('[data-label]'), txt = label.textContent; let t;
    a.addEventListener('click', async () => {
      try { await navigator.clipboard.writeText('holacoticocodrila@gmail.com'); label.textContent = 'Correo copiado ✓'; a.classList.add('is-copied'); } catch (e) {}
      clearTimeout(t); t = setTimeout(() => { label.textContent = txt; a.classList.remove('is-copied'); }, 3000);
    });
  });
  // «Conversemos.»: el resaltador flúor se pinta al llegar
  const ct = document.querySelector('.contact__t');
  if (ct) new IntersectionObserver((es, o) => es.forEach(e => { if (e.isIntersecting) { ct.classList.add('is-in'); o.disconnect(); } }), { threshold: .4 }).observe(ct);
  if (!reduce) {
    const items = $$('.case__cover, .case__intro > *, .chap__head, .blk-m, .next');
    items.forEach(el => el.setAttribute('data-rv', ''));
    const rv = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-in'); rv.unobserve(e.target); } }), { threshold: .12 });
    items.forEach(el => rv.observe(el));
  }
})();
