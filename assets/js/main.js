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
    const path = location.pathname;
    document.querySelectorAll('.nav__menu a').forEach(a => {
      const href = a.getAttribute('href') || '';
      const file = href.split('#')[0].split('/').pop();
      const hash = href.includes('#') ? href.split('#')[1] : '';
      const here = path.split('/').pop() || 'index.html';
      let on = !hash && file && file === here;
      if (/\/herramientas\//.test(path) && file === 'herramientas.html') on = true;
      if (/\/servicios\//.test(path) && hash === 'servicios') on = true;
      if (/\/proyectos\//.test(path) && hash === 'proyectos') on = true;
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
      onEnter: batch => gsap.to(batch, { opacity: 1, y: 0, duration: .9, stagger: .12, ease: EASE })
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
