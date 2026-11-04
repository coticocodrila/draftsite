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
  const PROY = {
    distrito: {
      meta: 'App web · 2026', title: 'Distrito Valpo',
      text: 'Mapa propio para las rutas De Tapas y Café de Barrio: registra a cada participante y confirma sus visitas.',
      stat: '+50 locales participantes', tags: ['App web', 'Mapa interactivo', 'Identidad de rutas'],
      media: [['v:' + P + 'distrito-valpo/web.mp4', 'Recorrido por el sitio web', P + 'distrito-valpo/web.jpg'], [P + 'distrito-valpo/principal.jpg', 'Local lleno durante una de las rutas'], [P + 'distrito-valpo/mapa-celular.jpg', 'El mapa en el celular'], [P + 'distrito-valpo/mapa.jpg', 'Mapa con los locales de la ruta'], [P + 'distrito-valpo/piezas.jpg', 'Piezas impresas con código QR']]
    },
    emporio: {
      meta: 'Dirección creativa · Desde 2023', title: 'Emporio Orgánika',
      text: 'Tienda Shopify, etiquetas en DBS Beauty Store y campañas para web, email y redes.',
      stat: '', tags: ['E-commerce', 'Packaging', 'Campañas'],
      media: [[P + 'emporio-organika/principal.jpg', 'Banner de campaña: es natural'], [P + 'emporio-organika/c01.jpg', 'Línea de productos: cuidado natural'], [P + 'emporio-organika/campana-02.jpg', 'Campaña de la línea capilar Maqui, Murta y Avellana'], [P + 'emporio-organika/campana-03.jpg', 'Campaña del gel limpiador facial'], ['../img/portadas/emporio-organika.jpg', 'Jabón Verbena Limón']]
    },
    reels: {
      meta: 'Edición de video · Redes', title: 'Reels Emporio Orgánika',
      text: 'Reels de producto para las campañas de la marca.',
      stat: '', tags: ['Edición de video', 'Reels', 'Producto'],
      media: [['v:' + P + 'emporio-organika/reel01.mp4', 'Reel del shampoo para cueros cabelludos delicados', P + 'emporio-organika/reel01.jpg'], ['v:' + P + 'emporio-organika/reel02.mp4', 'Reel del jabón Flor de Magnolio', P + 'emporio-organika/reel02.jpg']]
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
      meta: 'Tienda online', title: 'Dr. Fungi',
      text: 'Tienda online pensada primero para el celular.',
      stat: '', tags: [],
      media: [[P + 'dr-fungi/web-mobile.jpg', 'El sitio de Dr. Fungi en dos teléfonos']]
    },
    desderaiz: {
      meta: 'Grabación y edición', title: 'Desde Raíz',
      text: 'Grabación y edición de video para redes.',
      stat: '', tags: [],
      media: [['v:' + P + 'audiovisual/video.mp4', 'Video de Desde Raíz: ñoquis del 29', P + 'audiovisual/video.jpg']]
    },
    micovitae: {
      meta: 'Video', title: 'Micovitae',
      text: 'Video para redes de Mico Protein, proteína en base a plantas y hongos.',
      stat: '', tags: [],
      media: [['v:' + P + 'micovitae/video.mp4', 'Video de Mico Protein', P + 'micovitae/video.jpg']]
    },
    anim: {
      meta: 'Animación 2D', title: 'Ilustración animada',
      text: 'Piezas cuadro a cuadro para marcas y redes.',
      stat: '', tags: ['Animación 2D', 'Ilustración', 'Redes'],
      media: [[CC + '2021/06/burger-final_correccion.gif', 'Hamburguesa animada'], [CC + '2021/11/420-feed1.gif', 'Producto para redes'], [CC + '2021/06/mojito2-1.gif', 'Mojito animado'], [CC + '2020/10/5a339f96992047.5ebb1b8492537.gif', 'Cerebro animado'], [CC + '2024/10/Ilustracion_sin_titulo-13.gif', 'Gemm en caída libre']]
    }
  };

  /* ---- Menú: enlace activo según la sección visible ---- */
  const links = $$('.nav__menu a');
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) links.forEach(a => a.classList.toggle('is-on', a.getAttribute('href') === '#' + e.target.id));
  }), { rootMargin: '-45% 0px -50% 0px' });
  links.forEach(a => { const s = $(a.getAttribute('href')); if (s) io.observe(s); });

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

  /* ---- Ventana de proyecto ---- */
  const dlg = $('#modal'), track = $('[data-track]', dlg);
  const prev = $('[data-prev]', dlg), next = $('[data-next]', dlg), count = $('[data-count]', dlg);
  let n = 0, total = 0, opener = null;
  const go = i => { i = Math.max(0, Math.min(total - 1, i)); track.scrollTo({ left: track.clientWidth * i, behavior: reduce ? 'auto' : 'smooth' }); };
  const sync = () => {
    n = Math.round(track.scrollLeft / Math.max(1, track.clientWidth));
    count.textContent = `${n + 1} / ${total}`; prev.disabled = n === 0; next.disabled = n === total - 1;
    $$('video', track).forEach((v, i) => { const fig = v.closest('figure'); const idx = [...track.children].indexOf(fig); idx === n ? v.play().catch(() => {}) : v.pause(); });
  };
  track.addEventListener('scroll', () => requestAnimationFrame(sync), { passive: true });
  prev.addEventListener('click', () => go(n - 1));
  next.addEventListener('click', () => go(n + 1));
  track.addEventListener('keydown', e => { if (e.key === 'ArrowRight') go(n + 1); if (e.key === 'ArrowLeft') go(n - 1); });

  const open = (key, btn) => {
    const p = PROY[key]; if (!p) return; opener = btn;
    $('[data-meta]', dlg).textContent = p.stat ? `${p.meta} · ${p.stat}` : p.meta;
    $('[data-title]', dlg).textContent = p.title;
    $('[data-text]', dlg).textContent = p.text;
    track.innerHTML = p.media.map(([src, alt, poster]) => src.startsWith('v:')
      ? `<figure><video src="${src.slice(2)}" poster="${poster}" muted loop playsinline preload="metadata" aria-label="${alt}"></video></figure>`
      : `<figure><img src="${src}" alt="${alt}"></figure>`).join('');
    total = p.media.length; $('.modal__ctrl', dlg).style.visibility = total < 2 ? 'hidden' : '';
    dlg.showModal(); document.body.style.overflow = 'hidden';
    track.scrollLeft = 0; sync();
  };
  $$('[data-open]').forEach(b => b.addEventListener('click', () => open(b.dataset.open, b)));
  const close = () => dlg.close();
  $('[data-close]', dlg).addEventListener('click', close);
  dlg.addEventListener('click', e => { if (e.target === dlg) close(); });   // clic fuera
  dlg.addEventListener('close', () => { $$('video', track).forEach(v => v.pause()); track.innerHTML = ''; document.body.style.overflow = ''; opener && opener.focus(); });
})();
