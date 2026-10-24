/* =========================================================
   GEMMM — scripts compartidos
   ========================================================= */

/* ---- 1. CONFIGURACIÓN: completa estos datos y se actualizan en todo el sitio ---- */
const GEMMM = {
  email: 'holacoticocodrila@gmail.com',
  // Número de WhatsApp con código de país, sin + ni espacios. Ej: '56912345678'
  whatsapp: '',
  whatsappMsg: 'Hola GEMMM, quiero cotizar un proyecto.',
  // Link de tu agenda (Calendly, Google Calendar, Cal.com). Ej: 'https://calendly.com/gemmm/30min'
  agenda: '',
  // Valor de la UF para mostrar precios aproximados en pesos. Actualízalo de vez en cuando (sii.cl)
  uf: 41123,
  // Newsletter (MailerLite): pega aquí la URL del formulario incrustado. Ej:
  // 'https://assets.mailerlite.com/jsonp/123456/forms/987654321/subscribe'
  newsletter: ''
};

(function () {
  const mail = 'mailto:' + GEMMM.email + '?subject=' + encodeURIComponent('Proyecto GEMMM');
  const wa = GEMMM.whatsapp ? 'https://wa.me/' + GEMMM.whatsapp + '?text=' + encodeURIComponent(GEMMM.whatsappMsg) : '';

  // Botones de agenda: si no hay link de agenda, abren un correo
  document.querySelectorAll('[data-cta="agenda"]').forEach(a => {
    a.href = GEMMM.agenda || mail;
    if (GEMMM.agenda) { a.target = '_blank'; a.rel = 'noopener'; }
  });
  // Botones de WhatsApp: si no hay número, se ocultan (o pasan a correo si tienen data-fallback)
  document.querySelectorAll('[data-cta="whatsapp"]').forEach(a => {
    if (wa) { a.href = wa; a.target = '_blank'; a.rel = 'noopener'; }
    else if (a.hasAttribute('data-fallback')) { a.href = mail; }
    else { a.hidden = true; }
  });
  document.querySelectorAll('[data-email]').forEach(el => { el.textContent = GEMMM.email; if (el.tagName === 'A') el.href = 'mailto:' + GEMMM.email; });

  /* ---- Precios: convierte UF a pesos aproximados ---- */
  document.querySelectorAll('[data-uf]').forEach(el => {
    const clp = Math.round(parseFloat(el.dataset.uf) * GEMMM.uf / 1000) * 1000;
    el.textContent = '≈ $' + clp.toLocaleString('es-CL') + (el.dataset.unit || '') + ' + IVA';
  });

  /* ---- 2. Menú móvil ---- */
  const burger = document.querySelector('.nav__burger');
  const menu = document.querySelector('.nav__menu');
  if (burger && menu) {
    burger.addEventListener('click', () => burger.setAttribute('aria-expanded', menu.classList.toggle('open')));
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { menu.classList.remove('open'); burger.setAttribute('aria-expanded', 'false'); }));
  }

  /* ---- 3. Filtros de proyectos ---- */
  const filters = document.querySelectorAll('.filter');
  filters.forEach(b => b.addEventListener('click', () => {
    filters.forEach(x => x.setAttribute('aria-pressed', 'false'));
    b.setAttribute('aria-pressed', 'true');
    document.querySelectorAll('.card').forEach(c => c.hidden = b.dataset.f !== 'todo' && c.dataset.c !== b.dataset.f);
  }));

  /* ---- Reloj de Santiago ---- */
  const clocks = document.querySelectorAll('[data-clock]');
  const tick = () => { const h = new Intl.DateTimeFormat('es-CL',{hour:'2-digit',minute:'2-digit',timeZone:'America/Santiago'}).format(new Date()); clocks.forEach(c => c.textContent = h); };
  if (clocks.length) { tick(); setInterval(tick, 30000); }

  /* ---- Servicios: vista previa animada que sigue al cursor ---- */
  const prev = document.querySelector('.srv__preview');
  if (prev && window.matchMedia('(hover: hover)').matches && window.gsap) {
    const xTo = gsap.quickTo(prev, 'x', { duration: .5, ease: 'power3.out' });
    const yTo = gsap.quickTo(prev, 'y', { duration: .5, ease: 'power3.out' });
    document.querySelectorAll('.srv__row').forEach((row, i) => {
      row.addEventListener('mouseenter', () => {
        prev.src = row.dataset.gif;
        gsap.to(prev, { opacity: 1, scale: 1, rotate: i % 2 ? 4 : -4, duration: .5, ease: gsap.parseEase('gemmm') ? 'gemmm' : 'back.out(1.6)' });
      });
      row.addEventListener('mouseleave', () => gsap.to(prev, { opacity: 0, scale: .6, duration: .3, ease: 'power2.in' }));
      row.addEventListener('mousemove', e => { xTo(e.clientX + 24); yTo(e.clientY - 110); });
    });
  }

  /* ---- Menú: marca la página activa ---- */
  (function () {
    const here = location.pathname.replace(/\/$/, '/index.html');
    document.querySelectorAll('.nav__menu a').forEach(a => {
      const u = new URL(a.getAttribute('href') || '', location.href);
      const hash = u.hash.slice(1);
      let on = !hash && u.pathname === here;
      if (/\/herramientas\//.test(here) && /herramientas\.html$/.test(u.pathname)) on = true;
      if (/\/blog\//.test(here) && /\/blog\/index\.html$/.test(u.pathname)) on = true;
      if (/\/servicios\//.test(here) && hash === 'servicios') on = true;
      if (/\/proyectos\//.test(here) && hash === 'proyectos') on = true;
      if (on) a.setAttribute('aria-current', 'page');
    });
  })();

  /* ---- Herramientas: vistas previas vivas ---- */
  const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const palPrev = document.querySelector('[data-pal-preview]');
  if (palPrev) {
    const sw = palPrev.querySelectorAll('span');
    const paint = () => {
      const h = Math.random() * 360, step = [0, 25, 50, 180, 200][Math.floor(Math.random() * 5)];
      const ls = [22, 45, 62, 78, 92];
      sw.forEach((s, i) => s.style.backgroundColor = `hsl(${(h + (i % 2 ? step : i * 12)) % 360} ${55 + Math.random() * 30}% ${ls[i]}%)`);
    };
    paint(); if (!calm) setInterval(paint, 2600);
  }
  const typePrev = document.querySelector('[data-type-preview]');
  if (typePrev) {
    const pairs = [['Unbounded','DM Sans'],['Syne','Inter'],['Fraunces','Work Sans'],['Bricolage Grotesque','IBM Plex Sans'],['Archivo Black','Karla'],['DM Serif Display','Manrope'],['Playfair Display','Inter'],['Space Grotesk','Lora'],['Bebas Neue','Work Sans'],['Rubik','Karla']];
    const aa = typePrev.querySelector('.toolcard__aa'), pr = typePrev.querySelector('.toolcard__pair');
    let k = 0;
    const show = () => {
      const [t, b] = pairs[k++ % pairs.length];
      aa.style.opacity = 0; pr.style.opacity = 0;
      setTimeout(() => { aa.style.fontFamily = `'${t}', sans-serif`; pr.style.fontFamily = `'${b}', sans-serif`; pr.textContent = `${t} + ${b}`; aa.style.opacity = 1; pr.style.opacity = 1; }, 350);
    };
    show(); if (!calm) setInterval(show, 2200);
  }

  /* ---- Newsletter ---- */

  // Copiar correo (respaldo del mailto)
  document.querySelectorAll('[data-copy-email]').forEach(btn => {
    const label = btn.textContent;
    btn.addEventListener('click', async () => {
      try { await navigator.clipboard.writeText(GEMMM.email); btn.textContent = 'Correo copiado ✓'; }
      catch (e) { btn.textContent = GEMMM.email; }
      btn.classList.add('is-done');
      setTimeout(() => { btn.textContent = label; btn.classList.remove('is-done'); }, 2600);
    });
  });
  // Newsletter: visible solo cuando está conectado
  if (GEMMM.newsletter) document.querySelectorAll('.foot2__news[hidden]').forEach(el => el.hidden = false);
  document.querySelectorAll('[data-newsletter]').forEach(form => {
    const msg = form.parentElement.querySelector('.news__msg');
    form.addEventListener('submit', async e => {
      e.preventDefault();
      const email = form.querySelector('input[type=email]');
      if (!email.value || !email.checkValidity()) { msg.textContent = 'Revisa tu correo, parece que falta algo.'; email.focus(); return; }
      if (!GEMMM.newsletter) { msg.textContent = 'El newsletter estará disponible muy pronto. ¡Gracias por tu interés!'; return; }
      const data = new FormData(form); data.append('ml-submit', '1'); data.append('anticsrf', 'true');
      const btn = form.querySelector('button'); btn.disabled = true;
      try {
        await fetch(GEMMM.newsletter, { method: 'POST', body: data, mode: 'no-cors' });
        form.reset(); msg.textContent = '¡Listo! Revisa tu correo para confirmar la suscripción.';
      } catch (err) { msg.textContent = 'No pudimos suscribirte. Inténtalo de nuevo en un momento.'; }
      btn.disabled = false;
    });
  });

  /* ---- 4. Año en el pie ---- */
  document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());

  /* ---- 5. Animaciones (GSAP + ScrollTrigger) ---- */
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const counters = document.querySelectorAll('[data-count]');
  const formatNum = n => n.toLocaleString('es-CL');

  if (!reduce && window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
    // Curva propia de GEMMM: entra rápido y se asienta con un pequeño rebote
    let EASE = 'power3.out';
    if (window.CustomEase) {
      gsap.registerPlugin(CustomEase);
      CustomEase.create('gemmm', 'M0,0 C0.2,0.7 0.32,1.06 0.56,1.03 0.74,1.01 0.86,1 1,1');
      EASE = 'gemmm';
    }
    document.documentElement.classList.add('js-anim');
    // Fichas de proyectos: entrada escalonada, una tras otra
    ScrollTrigger.batch('.grid .card', {
      start: 'top 90%', once: true,
      onEnter: batch => gsap.to(batch, { opacity: 1, y: 0, duration: 1.4, stagger: .18, ease: 'power2.out' })
    });
    gsap.utils.toArray('[data-reveal]').forEach(el => {
      gsap.to(el, { opacity: 1, y: 0, duration: .9, ease: EASE,
        scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
    });
    counters.forEach(el => {
      const end = parseFloat(el.dataset.count), obj = { v: 0 }, suf = el.dataset.suffix || '';
      ScrollTrigger.create({ trigger: el, start: 'top 90%', once: true, onEnter: () =>
        gsap.to(obj, { v: end, duration: 1.6, ease: 'power2.out', onUpdate: () => el.textContent = formatNum(Math.round(obj.v)) + suf }) });
    });
    gsap.utils.toArray('.hero__shapes span').forEach((s, i) => {
      gsap.to(s, { yPercent: (i % 2 ? -18 : 14), rotate: (i % 2 ? -6 : 5), ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
    });
  } else {
    counters.forEach(el => el.textContent = formatNum(parseFloat(el.dataset.count)) + (el.dataset.suffix || ''));
  }
})();

/* ---- 6. Elementos del inicio (letras, palabra que cambia, vista previa de proyectos) ---- */
(function () {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(hover:hover) and (pointer:fine)').matches;
  const G = window.gsap;
  // Palabra que cambia (siempre en movimiento)
  const swap = document.querySelector('[data-swap]');
  if (swap) {
    const words = [...swap.children]; let wi = 0;
    words.forEach((w, i) => { if (i) w.style.transform = 'translateY(110%)'; });
    const step = () => {
      const cur = words[wi]; wi = (wi + 1) % words.length; const nx = words[wi];
      if (G) { G.to(cur, { yPercent: -110, duration: .5, ease: 'back.in(1.4)' }); G.fromTo(nx, { yPercent: 110, y: 0 }, { yPercent: 0, duration: .6, ease: 'back.out(1.6)', delay: .3 }); }
      else { cur.style.transform = 'translateY(-110%)'; nx.style.transform = 'none'; }
    };
    if (!reduce) setInterval(step, 2300);
  }
  if (!G) return;
  // Letras con peso variable: una ola al cargar y luego solo con el cursor
  document.querySelectorAll('[data-weight]').forEach(word => {
    const letters = [...word.querySelectorAll('span[aria-hidden]')];
    letters.forEach(l => G.set(l, { '--w': 300 }));
    if (reduce) return;
    const wave = G.timeline({ delay: .3 });
    letters.forEach((l, i) => wave.to(l, { '--w': 900, duration: .5, ease: 'power2.inOut', onStart: () => l.classList.add('on'), onComplete: () => l.classList.remove('on') }, i * .14).to(l, { '--w': 300, duration: .6, ease: 'power2.inOut' }, i * .14 + .5));
    if (!fine) return;
    word.addEventListener('pointerenter', () => wave.kill());
    word.addEventListener('pointerleave', () => {
      letters.forEach(l => { l.classList.remove('on'); G.to(l, { '--w': 300, duration: .8, ease: 'power3.out', overwrite: true }); });
    });
    word.addEventListener('pointermove', e => {
      letters.forEach(l => {
        const r = l.getBoundingClientRect();
        const k = Math.max(0, 1 - Math.abs(e.clientX - (r.left + r.width / 2)) / (r.width * 1.6));
        l.classList.toggle('on', k > .6);
        G.to(l, { '--w': 200 + 700 * k, duration: .45, ease: 'power3.out', overwrite: true });
      });
    });
  });
  // Vista previa flotante de proyectos
  const peek = document.querySelector('.xpeek');
  if (fine && peek) {
    const img = peek.querySelector('img');
    const px = G.quickTo(peek, 'left', { duration: .5, ease: 'power3' }), py = G.quickTo(peek, 'top', { duration: .5, ease: 'power3' });
    document.querySelectorAll('.xprow a[data-img]').forEach(a => {
      a.addEventListener('pointerenter', e => { img.src = a.dataset.img; G.set(peek, { left: e.clientX, top: e.clientY }); G.to(peek, { opacity: 1, scale: 1, rotate: G.utils.random(-7, 7), duration: .5, ease: 'back.out(1.7)' }); });
      a.addEventListener('pointermove', e => { px(e.clientX + 40); py(e.clientY); });
      a.addEventListener('pointerleave', () => G.to(peek, { opacity: 0, scale: .6, duration: .3 }));
    });
  }
})();

/* ---- 7. Remezclar colores (se recuerda al cambiar de página) ---- */
(function () {
  const P = [['#4A82E2','#FF6B4A','#B8F35A'],['#5EC066','#4A82E2','#FFD23F'],['#FF6B4A','#7B61FF','#5EC066'],['#FFD23F','#FF5FA2','#4A82E2'],['#B8F35A','#232323','#FF5FA2']];
  const root = document.documentElement;
  let i = 0;
  try { i = (+localStorage.getItem('gemmm-remix') || 0) % P.length; } catch (e) {}
  const apply = (anim) => {
    const [a, b, c] = P[i];
    if (anim && window.gsap && !matchMedia('(prefers-reduced-motion: reduce)').matches) gsap.to(root, { '--x1': a, '--x2': b, '--x3': c, duration: .6, ease: 'power2.out' });
    else { root.style.setProperty('--x1', a); root.style.setProperty('--x2', b); root.style.setProperty('--x3', c); }
  };
  if (i) apply(false);
  document.querySelectorAll('[data-remix]').forEach(btn => btn.addEventListener('click', () => {
    i = (i + 1) % P.length; apply(true);
    try { localStorage.setItem('gemmm-remix', i); } catch (e) {}
  }));
})();
