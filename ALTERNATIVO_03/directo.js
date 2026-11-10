/* Gemm · sitio "directo" — sin librerías */
(() => {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const EMAIL = 'holacoticocodrila@gmail.com';
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.documentElement.classList.add('js');

  /* ---- Proyectos (contenido de la ventana) ---- */
  const P = '../img/proyectos/';
  const BH = 'https://mir-s3-cdn-cf.behance.net/project_modules/';
  const CC = 'https://www.coticocodrila.com/wp-content/uploads/';
  // Audiovisual: [archivo, descripción, portada, etiqueta, vertical]
  const A = P + 'audiovisual/';
  const AUDIO = [
    ['v:' + A + 'videograbacion.mp4', 'Reel de grabación y edición', A + 'videograbacion.jpg', 'Grabación y edición', 1],
    ['v:' + P + 'micovitae/video.mp4', 'Reel de producto', P + 'micovitae/video.jpg', 'Video de producto', 1],
    ['v:' + A + 'siegel.mp4', 'Motion de una botella de vino', A + 'siegel.jpg', 'Motion de producto', 1],
    ['v:' + A + 'obk.mp4', 'Motion para redes: antes y hoy', A + 'obk.jpg', 'Motion para redes', 1],
    ['v:' + A + 'animacion1.mp4', 'Animación 2D de una granja', A + 'animacion1.jpg', 'Animación 2D', 1],
    ['v:' + P + 'emporio-organika/reel01.mp4', 'Reel de producto cosmético', P + 'emporio-organika/reel01.jpg', 'Edición de reels', 1],
    ['v:' + P + 'emporio-organika/reel02.mp4', 'Reel de producto cosmético', P + 'emporio-organika/reel02.jpg', 'Edición de reels', 1],
    ['v:' + A + 'cdrp.mp4', 'Video con textos animados', A + 'cdrp.jpg', 'Grabación y motion', 0],
    [CC + '2021/06/burger-final_correccion.gif', 'Hamburguesa animada', '', 'Ilustración animada', 0],
    [CC + '2021/11/420-feed1.gif', 'Producto animado para redes', '', 'Ilustración animada', 0],
    [CC + '2021/06/mojito2-1.gif', 'Mojito animado', '', 'Ilustración animada', 0]
  ];
  const PROY = {
    distrito: {
      meta: 'App web · 2026', title: 'Distrito Valpo',
      text: 'Mapa propio para las rutas De Tapas y Café de Barrio: registra a cada participante y confirma sus visitas.',
      stat: '+50 locales participantes', tags: ['App web', 'Mapa interactivo', 'Identidad de rutas'],
      media: [[P + 'distrito-valpo/principal.jpg', 'Local lleno durante una de las rutas'], [P + 'distrito-valpo/mapa-celular.jpg', 'El mapa en el celular'], [P + 'distrito-valpo/piezas.jpg', 'Piezas impresas con código QR']]
    },
    emporio: {
      meta: 'Dirección creativa · Desde 2023', title: 'Emporio Orgánika',
      text: 'Tienda Shopify, etiquetas en DBS Beauty Store y campañas para web, email y redes.',
      stat: '', tags: ['E-commerce', 'Packaging', 'Campañas'],
      media: [[P + 'emporio-organika/principal.jpg', 'Banner de campaña: es natural'], [P + 'emporio-organika/c01.jpg', 'Línea de productos: cuidado natural'], [P + 'emporio-organika/campana-02.jpg', 'Campaña de la línea capilar Maqui, Murta y Avellana'], [P + 'emporio-organika/campana-03.jpg', 'Campaña del gel limpiador facial'], ['../img/portadas/emporio-organika.jpg', 'Jabón Verbena Limón']]
    },
    panbo: {
      meta: 'Packaging · 2026', title: 'Panbo',
      text: 'Packaging de su primera línea para retail, del concepto a la producción.',
      stat: '35.000 unidades producidas', tags: ['Packaging', 'Línea de productos'],
      media: [[P + 'panbo/produccion.jpg', 'Revisión de la impresión del envase'], ['v:' + P + 'panbo/video-01.mp4', 'Impresión del envase en la máquina', P + 'panbo/video-01.jpg'], ['v:' + P + 'panbo/video-02.mp4', 'Bobina del envase en producción', P + 'panbo/video-02.jpg']]
    },
    g420: {
      meta: 'Rebranding · 2023', title: '420 Genetics',
      text: 'Logo, identidad, packaging para tres líneas de semillas y tienda online.',
      stat: '+20 variedades en tres líneas', tags: ['Rebranding', 'Packaging', 'Web'],
      media: [['v:' + P + '420-genetics/reel.mp4', 'Reel de los envases de 420 Genetics', P + '420-genetics/reel.jpg'], [BH + 'fs_webp/f6454a230944027.68801cb441538.jpg', 'Logo de 420 Genetics'], [BH + '1400_webp/52150e230944027.688004b76055c.jpg', 'Packaging de 420 Genetics'], [BH + 'fs/6b29cd230944027.68802145196af.gif', 'Pieza animada de la marca'], [BH + '1400_webp/5dbbb9230944027.688004b761365.jpg', 'Aplicaciones de la marca'], [BH + '1400_webp/3e8de0230944027.688004b76184d.jpg', 'Aplicaciones de la marca']]
    },
    drfungi: {
      meta: 'Tienda Shopify', title: 'Dr. Fungi',
      text: 'Tienda Shopify para una línea de concentrados de hongos funcionales, con fichas de producto y guía de uso.',
      stat: '', tags: [],
      media: [['v:' + P + 'dr-fungi/web-desktop.mp4', 'Recorrido por la tienda Shopify en computador', P + 'dr-fungi/web-desktop-video.jpg'], [P + 'dr-fungi/web-desktop.jpg', 'Portada de la tienda en computador'], [P + 'dr-fungi/web-productos.jpg', 'Grilla de productos'], [P + 'dr-fungi/web-producto.jpg', 'Ficha de producto'], ['v:' + P + 'dr-fungi/web-mobile.mp4', 'Recorrido por la tienda Shopify en celular', P + 'dr-fungi/web-mobile-video.jpg']]
    },
    audio: {
      meta: '', title: 'Movimiento',
      text: 'Grabación, edición, motion y animación 2D para redes, campañas y productos.',
      stat: '', tags: [],
      media: AUDIO
    }
  };

  /* ---- Menú: enlace activo según la sección visible ---- */
  const links = $$('.nav__menu a');
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) links.forEach(a => a.classList.toggle('is-on', a.getAttribute('href') === '#' + e.target.id));
  }), { rootMargin: '-45% 0px -50% 0px' });
  links.forEach(a => { const s = $(a.getAttribute('href')); if (s) io.observe(s); });

  /* ---- Fila de logos: flechas, arrastrar con el cursor y deslizar ---- */
  const lt = $('[data-logos]');
  if (lt) {
    const prevB = $('[data-logos-prev]'), nextB = $('[data-logos-next]');
    const upd = () => { const max = lt.scrollWidth - lt.clientWidth - 2; prevB.disabled = lt.scrollLeft <= 2; nextB.disabled = lt.scrollLeft >= max; };
    const step = d => lt.scrollBy({ left: d * lt.clientWidth * .6, behavior: reduce ? 'auto' : 'smooth' });
    prevB.addEventListener('click', () => step(-1)); nextB.addEventListener('click', () => step(1));
    lt.addEventListener('scroll', () => requestAnimationFrame(upd), { passive: true });
    addEventListener('resize', upd); upd();
    lt.addEventListener('keydown', e => { if (e.key === 'ArrowRight') step(1); if (e.key === 'ArrowLeft') step(-1); });
    // arrastrar con el mouse (en pantallas táctiles se desliza de forma nativa)
    let down = false, x0 = 0, s0 = 0, moved = false;
    lt.addEventListener('pointerdown', e => { if (e.pointerType !== 'mouse') return; down = true; moved = false; x0 = e.clientX; s0 = lt.scrollLeft; });
    addEventListener('pointermove', e => { if (!down) return; const dx = e.clientX - x0; if (Math.abs(dx) > 3) { moved = true; lt.classList.add('is-drag'); } lt.scrollLeft = s0 - dx; });
    addEventListener('pointerup', () => { down = false; lt.classList.remove('is-drag'); });
    lt.addEventListener('click', e => { if (moved) { e.preventDefault(); e.stopPropagation(); } }, true);
    lt.addEventListener('dragstart', e => e.preventDefault());
  }

  /* ---- Copiar correo ---- */
  $$('[data-mail]').forEach(a => {
    const label = $('[data-label]', a), txt = label.textContent; let t;
    a.addEventListener('click', async () => {
      try { await navigator.clipboard.writeText(EMAIL); label.textContent = 'Correo copiado ✓'; } catch (e) {}
      clearTimeout(t); t = setTimeout(() => label.textContent = txt, 3000);
    });
  });

  /* ---- Videos que se reproducen al estar a la vista ---- */
  const vio = new IntersectionObserver(es => es.forEach(e => {
    const v = e.target; if (e.isIntersecting && !reduce) { v.preload = 'auto'; v.play().catch(() => {}); } else v.pause();
  }), { threshold: .3 });
  $$('video[data-autoplay]').forEach(v => vio.observe(v));

  /* ---- Animaciones sutiles al hacer scroll ---- */
  if (!reduce) {
    // aparición: textos y trabajos, con un pequeño desfase entre vecinos
    const items = $$('.reel .tile, .area__head, .tiles .tile, .nums p, .contact .wrap > *');
    items.forEach(el => {
      el.setAttribute('data-rv', '');
      const sib = [...el.parentElement.children].indexOf(el);
      el.style.transitionDelay = (sib % 3) * .1 + 's';
    });
    const rv = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('is-in'); rv.unobserve(e.target); }
    }), { threshold: .15, rootMargin: '0px 0px -6% 0px' });
    items.forEach(el => rv.observe(el));

    // parallax leve: la imagen se mueve unos pocos píxeles dentro de su marco
    const tiles = matchMedia('(min-width: 48rem)').matches ? $$('.tile') : [];
    let ticking = false;
    const par = () => {
      const vh = innerHeight;
      tiles.forEach(t => {
        const r = t.getBoundingClientRect();
        if (r.bottom < 0 || r.top > vh) return;
        const k = (r.top + r.height / 2 - vh / 2) / vh;          // -1 … 1
        const m = t.querySelector('img,video'); if (m) m.style.setProperty('--py', (k * -18).toFixed(1) + 'px');
      });
      ticking = false;
    };
    addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(par); } }, { passive: true });
    par();

    // cifras: cuentan hasta su valor al aparecer
    const nio = new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting) return; nio.unobserve(e.target);
      const b = e.target, txt = b.textContent, plus = txt.startsWith('+'), end = +txt.replace(/\D/g, ''), t0 = performance.now(), dur = 1400;
      const fmt = n => (plus ? '+' : '') + n.toLocaleString('es-CL');
      const step = now => { const p = Math.min(1, (now - t0) / dur), ease = 1 - Math.pow(1 - p, 3); b.textContent = fmt(Math.round(end * ease)); if (p < 1) requestAnimationFrame(step); else b.textContent = txt; };
      requestAnimationFrame(step);
    }), { threshold: .6 });
    $$('.nums b').forEach(b => nio.observe(b));
  }

  /* ---- Marca y Web: en cada visita se eligen otras piezas de cada área ----
     Cada casilla mantiene su forma (ancha o vertical) y no se repite proyecto. */
  const POOLS = {
    marca: {
      wide: [
        { open: 'emporio', img: P + 'emporio-organika/campana-02.jpg', name: 'Emporio Orgánika', sub: 'Campaña' },
        { open: 'emporio', img: P + 'emporio-organika/campana-03.jpg', name: 'Emporio Orgánika', sub: 'Campaña' },
        { open: 'emporio', img: P + 'emporio-organika/principal.jpg', name: 'Emporio Orgánika', sub: 'Campaña' },
        { open: 'g420', img: BH + 'fs/6b29cd230944027.68802145196af.gif', name: '420 Genetics', sub: 'Identidad' },
        { open: 'g420', img: BH + '1400_webp/52150e230944027.688004b76055c.jpg', name: '420 Genetics', sub: 'Packaging' }
      ],
      tall: [
        { open: 'panbo', vid: P + 'panbo/video-01.mp4', poster: P + 'panbo/video-01.jpg', name: 'Panbo', sub: 'Packaging' },
        { open: 'panbo', img: P + 'panbo/produccion.jpg', name: 'Panbo', sub: 'Producción' },
        { open: 'g420', vid: P + '420-genetics/reel.mp4', poster: P + '420-genetics/reel.jpg', name: '420 Genetics', sub: 'Packaging' },
        { open: 'emporio', img: P + 'emporio-organika/c01.jpg', name: 'Emporio Orgánika', sub: 'Etiquetas' },
        { open: 'emporio', img: '../img/portadas/emporio-organika.jpg', name: 'Emporio Orgánika', sub: 'Packaging' }
      ]
    },
    web: {
      wide: [
        { open: 'distrito', img: P + 'distrito-valpo/mapa-celular.jpg', name: 'Distrito Valpo', sub: 'App web' },
        { open: 'drfungi', vid: P + 'dr-fungi/web-desktop.mp4', poster: P + 'dr-fungi/web-desktop-video.jpg', name: 'Dr. Fungi', sub: 'Tienda Shopify', fit: 1, bg: '#fff' }
      ],
      tall: [
        { open: 'drfungi', vid: P + 'dr-fungi/web-mobile.mp4', poster: P + 'dr-fungi/web-mobile-video.jpg', name: 'Dr. Fungi', sub: 'Tienda Shopify', fit: 1, bg: '#fff' },
        { open: 'emporio', img: P + 'emporio-organika/c01.jpg', name: 'Emporio Orgánika', sub: 'Tienda Shopify' },
        { open: 'emporio', img: '../img/portadas/emporio-organika.jpg', name: 'Emporio Orgánika', sub: 'Tienda Shopify' },
        { open: 'g420', img: BH + '1400_webp/5dbbb9230944027.688004b761365.jpg', name: '420 Genetics', sub: 'Tienda online' },
        { open: 'distrito', img: P + 'distrito-valpo/mapa-celular.jpg', name: 'Distrito Valpo', sub: 'App web' }
      ]
    }
  };
  /* ---- Elección sin repetir ----
     · ninguna imagen o video aparece dos veces en la portada (contando el hero)
     · dentro de cada área no se repite proyecto
     · se prefieren piezas que no salieron en la visita anterior */
  const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const r = Math.floor(Math.random() * (i + 1)); [a[i], a[r]] = [a[r], a[i]]; } return a; };
  const key = s => (s || '').replace(/^v:/, '').replace(/^(\.\.\/)+/, '');
  const seen = new Set();
  $$('.reel .tile').forEach(t => { const m = $('img,video', t); if (m) seen.add(key(m.getAttribute('src'))); });
  let last = []; try { last = JSON.parse(localStorage.getItem('gemm-portada') || '[]'); } catch (e) {}
  const shownNow = [];
  // elige el primer candidato que cumpla, relajando reglas solo si no queda otro
  const pick = (list, src, okProject) => {
    const tiers = [
      it => !seen.has(src(it)) && okProject(it) && !last.includes(src(it)),
      it => !seen.has(src(it)) && okProject(it),
      it => !seen.has(src(it)),
      () => true
    ];
    for (const ok of tiers) { const k = list.findIndex(ok); if (k >= 0) { const it = list.splice(k, 1)[0]; seen.add(src(it)); shownNow.push(src(it)); return it; } }
    return null;
  };

  // Marca y Web
  const srcOf = it => key(it.vid || it.img);
  // Web va primero: tiene menos material y necesita sus opciones antes que Marca
  $$('[data-area]').sort((x, y) => (y.dataset.area === 'web') - (x.dataset.area === 'web')).forEach(grid => {
    const pool = POOLS[grid.dataset.area]; if (!pool) return;
    const used = new Set(), bag = { wide: shuffle(pool.wide), tall: shuffle(pool.tall) };
    // orden de llenado: la forma con menos opciones va primero (así no se repite proyecto)
    const first = grid.dataset.area === 'marca' ? 'tall' : 'wide';
    $$('[data-kind]', grid).sort((x, y) => (y.dataset.kind === first) - (x.dataset.kind === first)).forEach(tile => {
      const it = pick(bag[tile.dataset.kind], srcOf, it => !used.has(it.open)); if (!it) return; used.add(it.open);
      tile.dataset.open = it.open;
      tile.classList.toggle('tile--fit', !!it.fit);
      $('.tile__frame', tile).style.background = it.bg || '';
      const old = $('img,video', tile); if (old && old.tagName === 'VIDEO') vio.unobserve(old);
      const el = it.vid
        ? Object.assign(document.createElement('video'), { src: it.vid, poster: it.poster, muted: true, loop: true, playsInline: true, preload: 'none' })
        : Object.assign(document.createElement('img'), { src: it.img, alt: it.name, loading: 'lazy' });
      if (it.vid) { el.setAttribute('muted', ''); el.setAttribute('playsinline', ''); el.dataset.autoplay = ''; el.setAttribute('aria-label', it.name + ', ' + it.sub); }
      old ? old.replaceWith(el) : tile.prepend(el);
      if (it.vid) vio.observe(el);
      $('.tile__cap', tile).innerHTML = `${it.name} <i>${it.sub}</i>`;
    });
  });

  // Audiovisual: 3 videos verticales (el resto queda en el carrusel)
  const slots = $$('#movimiento [data-slot]');
  if (slots.length) {
    const bagA = shuffle(AUDIO.map((m, i) => i).filter(i => AUDIO[i][4]));
    slots.forEach(s => {
      const i = pick(bagA, i => key(AUDIO[i][0]), () => true); if (i == null) return;
      const [src, alt, poster, label] = AUDIO[i];
      s.dataset.start = i;
      const v = $('video', s); vio.unobserve(v);
      v.src = src.slice(2); v.poster = poster; v.setAttribute('aria-label', alt);
      vio.observe(v);
      $('.tile__cap', s).textContent = label;
    });
  }
  /* proporción real de cada pieza (para el celular: misma altura sin recortes) */
  const RATIO = {"img/proyectos/audiovisual/videograbacion.jpg": 0.562, "img/proyectos/audiovisual/cdrp.jpg": 1.893, "img/proyectos/audiovisual/siegel.jpg": 0.562, "img/proyectos/audiovisual/obk.jpg": 0.562, "img/proyectos/audiovisual/animacion1.jpg": 0.562, "img/proyectos/panbo/video-01.jpg": 0.558, "img/proyectos/panbo/produccion.jpg": 0.75, "img/proyectos/panbo/video-02.jpg": 0.558, "img/proyectos/distrito-valpo/piezas.jpg": 1.778, "img/proyectos/distrito-valpo/principal.jpg": 1.778, "img/proyectos/distrito-valpo/mapa-celular.jpg": 1.778, "img/proyectos/micovitae/video.jpg": 0.562, "img/proyectos/emporio-organika/reel01.jpg": 0.562, "img/proyectos/emporio-organika/campana-03.jpg": 1.778, "img/proyectos/emporio-organika/principal.jpg": 1.778, "img/proyectos/emporio-organika/c01.jpg": 0.8, "img/proyectos/emporio-organika/campana-02.jpg": 1.778, "img/proyectos/emporio-organika/reel02.jpg": 0.562, "img/proyectos/420-genetics/reel.jpg": 0.562, "img/proyectos/dr-fungi/web-productos.jpg": 1.6, "img/proyectos/dr-fungi/web-desktop-video.jpg": 1.778, "img/proyectos/dr-fungi/web-desktop.jpg": 1.6, "img/proyectos/dr-fungi/web-producto.jpg": 1.6, "img/proyectos/dr-fungi/web-mobile-video.jpg": 0.562, "img/portadas/emporio-organika.jpg": 0.8, "img/portadas/distrito-valpo.jpg": 0.8, "f6454a230944027": 3.191, "6b29cd230944027": 1.928, "52150e230944027": 1.517, "5dbbb9230944027": 1.517, "3e8de0230944027": 1.997};
  const ratioOf = s => { s = key(s); if (RATIO[s]) return RATIO[s]; for (const k in RATIO) if (s.includes(k)) return RATIO[k]; return 0; };
  $$('.tile').forEach(t => { const m = $('.tile__frame img, .tile__frame video', t); if (!m) return; const r = ratioOf(m.tagName === 'VIDEO' ? m.getAttribute('poster') : m.getAttribute('src')); if (r) t.style.setProperty('--r', r); });
  try { localStorage.setItem('gemm-portada', JSON.stringify(shownNow)); } catch (e) {}

  /* ---- Ventana de proyecto ---- */
  const dlg = $('#modal'), track = $('[data-track]', dlg);
  const prev = $('[data-prev]', dlg), next = $('[data-next]', dlg), count = $('[data-count]', dlg);
  let n = 0, total = 0, opener = null, cur = null;
  const go = i => { i = Math.max(0, Math.min(total - 1, i)); track.scrollTo({ left: track.clientWidth * i, behavior: reduce ? 'auto' : 'smooth' }); };
  const sync = () => {
    n = Math.round(track.scrollLeft / Math.max(1, track.clientWidth));
    count.textContent = `${n + 1} / ${total}`; prev.disabled = n === 0; next.disabled = n === total - 1;
    if (cur && cur.media[n] && cur.media[n][3]) $('[data-meta]', dlg).textContent = cur.media[n][3];
    $$('video', track).forEach((v, i) => { const fig = v.closest('figure'); const idx = [...track.children].indexOf(fig); idx === n ? v.play().catch(() => {}) : v.pause(); });
  };
  track.addEventListener('scroll', () => requestAnimationFrame(sync), { passive: true });
  prev.addEventListener('click', () => go(n - 1));
  next.addEventListener('click', () => go(n + 1));
  track.addEventListener('keydown', e => { if (e.key === 'ArrowRight') go(n + 1); if (e.key === 'ArrowLeft') go(n - 1); });

  const open = (key, btn, start = 0) => {
    const p = PROY[key]; if (!p) return; opener = btn; cur = p;
    $('[data-meta]', dlg).textContent = p.stat ? `${p.meta} · ${p.stat}` : p.meta;
    $('[data-title]', dlg).textContent = p.title;
    $('[data-text]', dlg).textContent = p.text;
    track.innerHTML = p.media.map(([src, alt, poster]) => src.startsWith('v:')
      ? `<figure><video src="${src.slice(2)}" poster="${poster}" muted loop playsinline preload="metadata" aria-label="${alt}"></video></figure>`
      : `<figure><img src="${src}" alt="${alt}"></figure>`).join('');
    total = p.media.length; $('.modal__ctrl', dlg).style.visibility = total < 2 ? 'hidden' : '';
    dlg.showModal(); document.body.style.overflow = 'hidden';
    track.scrollLeft = track.clientWidth * start; sync();
  };
  // los proyectos tienen página propia; el material audiovisual se sigue viendo en la ventana
  const PAGES = { distrito: 'proyectos/distrito-valpo.html', emporio: 'proyectos/emporio-organika.html', panbo: 'proyectos/panbo.html', g420: 'proyectos/420-genetics.html', drfungi: 'proyectos/dr-fungi.html' };
  $$('[data-open]').forEach(b => b.addEventListener('click', () => {
    const k = b.dataset.open; if (PAGES[k]) { location.href = PAGES[k]; return; }
    open(k, b, +(b.dataset.start || 0));
  }));
  const close = () => dlg.close();
  $('[data-close]', dlg).addEventListener('click', close);
  dlg.addEventListener('click', e => { if (e.target === dlg) close(); });   // clic fuera
  dlg.addEventListener('close', () => { cur = null; $$('video', track).forEach(v => v.pause()); track.innerHTML = ''; document.body.style.overflow = ''; opener && opener.focus(); });
})();
