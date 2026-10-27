/* GEMMM — Pareja tipográfica (versión simple) */
(function () {
  const root = document.querySelector('[data-tipos]');
  if (!root) return;
  const PAREJAS = [
    ['Unbounded', 'DM Sans', 'Ancha y redonda con una sans limpia: moderna y amable.'],
    ['Syne', 'Inter', 'Carácter editorial arriba y un texto que se lee en cualquier pantalla.'],
    ['Fraunces', 'Work Sans', 'Serif con personalidad y una sans neutra: cálida sin ser antigua.'],
    ['Bricolage Grotesque', 'IBM Plex Sans', 'Grotesca expresiva y una sans técnica: cercana y precisa.'],
    ['Archivo Black', 'Karla', 'Peso fuerte para afiches y un texto liviano que da aire.'],
    ['DM Serif Display', 'Manrope', 'Elegancia clásica en el título, modernidad en el texto.'],
    ['Playfair Display', 'Inter', 'Contraste alto para destacar y una sans que no compite.'],
    ['Space Grotesk', 'Lora', 'Título técnico con texto serif: tecnología con alma de libro.'],
    ['Bebas Neue', 'Work Sans', 'Condensada y directa, ideal para afiches y eventos.'],
    ['Rubik', 'Karla', 'Redondeada y amistosa de punta a punta.']
  ];
  const COLORES = [['#4A82E2', '#232323'], ['#B8F35A', '#232323'], ['#232323', '#FFFFFF'], ['#FF6B4A', '#232323'], ['#E3E3E3', '#232323']];
  const $ = s => root.querySelector(s);
  const prev = $('.tp1');
  let i = -1;

  function mostrar(n) {
    i = (n + PAREJAS.length) % PAREJAS.length;
    const [t, b, porque] = PAREJAS[i], [bg, fg] = COLORES[i % COLORES.length];
    prev.style.setProperty('--tt', `'${t}', sans-serif`);
    prev.style.setProperty('--tb', `'${b}', sans-serif`);
    prev.style.background = bg; prev.style.color = fg;
    $('[data-titulo]').textContent = t;
    $('[data-texto]').textContent = b;
    $('[data-porque]').textContent = porque;
    $('[data-n]').textContent = `${i + 1} / ${PAREJAS.length}`;
    if (window.gsap) gsap.fromTo(prev.querySelectorAll('.tp1__t, .tp1__b'), { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: .6, stagger: .08, ease: gsap.parseEase('gemmm') ? 'gemmm' : 'power3.out' });
  }
  $('[data-siguiente]').addEventListener('click', () => mostrar(i + 1));
  $('[data-anterior]').addEventListener('click', () => mostrar(i - 1));
  document.addEventListener('keydown', e => {
    const a = document.activeElement;
    if (/INPUT|TEXTAREA|SELECT/.test(a.tagName) || a.isContentEditable) return;
    if (e.code === 'Space' || e.code === 'ArrowRight') { e.preventDefault(); if (a.blur) a.blur(); mostrar(i + 1); }
    if (e.code === 'ArrowLeft') { e.preventDefault(); mostrar(i - 1); }
  });
  mostrar(Math.floor(Math.random() * PAREJAS.length));
})();
