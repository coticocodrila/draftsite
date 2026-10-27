/* =========================================================
   GEMMM — scripts compartidos (sin librerías externas)
   ========================================================= */

/* ---- 1. Configuración ---- */
const GEMMM = {
  email: 'holacoticocodrila@gmail.com',
  // Valor de la UF para la página de precios (oculta). Actualízalo de vez en cuando (sii.cl)
  uf: 41123,
  // Newsletter (MailerLite): pega aquí la URL del formulario incrustado para activarlo.
  newsletter: ''
};

(function () {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  /* ---- 2. Menú ---- */
  const nav = document.querySelector('.nav');
  const burger = document.querySelector('.nav__burger');
  const menu = document.querySelector('.nav__menu');
  const setMenu = open => {
    if (!menu || !burger) return;
    menu.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', open);
    burger.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    document.body.classList.toggle('menu-open', open);
  };
  if (burger && menu) {
    burger.addEventListener('click', () => setMenu(!menu.classList.contains('open')));
    $$('a', menu).forEach(a => a.addEventListener('click', () => setMenu(false)));
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && menu.classList.contains('open')) { setMenu(false); burger.focus(); } });
    matchMedia('(min-width: 48rem)').addEventListener('change', () => setMenu(false));
  }
  // El encabezado se esconde al bajar y vuelve al subir
  if (nav) {
    let lastY = scrollY;
    addEventListener('scroll', () => {
      const y = scrollY;
      if (menu && menu.classList.contains('open')) { lastY = y; return; }
      if (y > lastY + 6 && y > 140) nav.classList.add('is-hidden');
      else if (y < lastY - 6 || y < 140) nav.classList.remove('is-hidden');
      lastY = y;
    }, { passive: true });
    nav.addEventListener('focusin', () => nav.classList.remove('is-hidden'));
  }
  // Marca la página activa
  const here = location.pathname.replace(/\/$/, '/index.html');
  $$('.nav__menu a').forEach(a => {
    const u = new URL(a.getAttribute('href') || '', location.href);
    const hash = u.hash.slice(1);
    let on = !hash && u.pathname === here;
    if (/\/servicios\//.test(here) && hash === 'servicios') on = true;
    if (/\/proyectos\//.test(here) && hash === 'proyectos') on = true;
    if (on) a.setAttribute('aria-current', 'page');
  });

  /* ---- 3. Pequeños datos ---- */
  $$('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
  const clocks = $$('[data-clock]');
  const tick = () => { const h = new Intl.DateTimeFormat('es-CL', { hour: '2-digit', minute: '2-digit', timeZone: 'America/Santiago' }).format(new Date()); clocks.forEach(c => c.textContent = h); };
  if (clocks.length) { tick(); setInterval(tick, 30000); }
  $$('[data-uf]').forEach(el => {
    const clp = Math.round(parseFloat(el.dataset.uf) * GEMMM.uf / 1000) * 1000;
    el.textContent = '≈ $' + clp.toLocaleString('es-CL') + (el.dataset.unit || '') + ' + IVA';
  });

  /* ---- 4. "Escríbeme": abre el correo y además copia la dirección ---- */
  $$('[data-mail-copy]').forEach(a => {
    const label = a.querySelector('.xcontact__label'); if (!label) return;
    const txt = label.textContent; let t;
    a.addEventListener('click', async () => {
      try { await navigator.clipboard.writeText(GEMMM.email); label.textContent = 'Correo copiado ✓'; }
      catch (e) { label.textContent = GEMMM.email; }
      clearTimeout(t); t = setTimeout(() => label.textContent = txt, 3000);
    });
  });

  /* ---- 5. Newsletter (oculto hasta que se conecte) ---- */
  if (GEMMM.newsletter) $$('.foot2__news[hidden]').forEach(el => el.hidden = false);
  $$('[data-newsletter]').forEach(form => {
    const msg = form.parentElement.querySelector('.news__msg');
    form.addEventListener('submit', async e => {
      e.preventDefault();
      const email = form.querySelector('input[type=email]');
      if (!email.value || !email.checkValidity()) { msg.textContent = 'Revisa tu correo, parece que falta algo.'; email.focus(); return; }
      if (!GEMMM.newsletter) return;
      const data = new FormData(form); data.append('ml-submit', '1'); data.append('anticsrf', 'true');
      const btn = form.querySelector('button'); btn.disabled = true;
      try { await fetch(GEMMM.newsletter, { method: 'POST', body: data, mode: 'no-cors' }); form.reset(); msg.textContent = '¡Listo! Revisa tu correo para confirmar la suscripción.'; }
      catch (err) { msg.textContent = 'No se pudo completar la suscripción. Inténtalo de nuevo en un momento.'; }
      btn.disabled = false;
    });
  });

  /* ---- 6. Aparición al hacer scroll ---- */
  if (!reduce && 'IntersectionObserver' in window) {
    document.documentElement.classList.add('js-anim');
    const io = new IntersectionObserver(es => es.forEach(en => {
      if (!en.isIntersecting) return;
      en.target.classList.add('is-in'); io.unobserve(en.target);
    }), { rootMargin: '0px 0px -8% 0px' });
    $$('[data-reveal]').forEach(el => io.observe(el));
    // fichas de proyectos: una tras otra dentro de cada fila
    $$('.grid .card').forEach(card => {
      const cols = getComputedStyle(card.parentElement).gridTemplateColumns.split(' ').length;
      const i = $$('.card', card.parentElement).indexOf(card);
      card.style.setProperty('--d', (i % cols) * .15 + 's');
      io.observe(card);
    });
  }

  /* ---- 7. Inicio: palabra que cambia ---- */
  const swap = document.querySelector('[data-swap]');
  if (swap) {
    const words = [...swap.children]; let wi = 0;
    words[0].classList.add('is-on');
    if (!reduce) setInterval(() => {
      const cur = words[wi]; wi = (wi + 1) % words.length; const nx = words[wi];
      cur.classList.remove('is-on'); cur.classList.add('is-out'); nx.classList.add('is-on');
      setTimeout(() => cur.classList.remove('is-out'), 500);
    }, 2300);
  }

  /* ---- 8. Letras de peso variable (titular y "¿Hablamos?") ---- */
  $$('[data-weight]').forEach(word => {
    const letters = $$('span[aria-hidden]', word);
    const base = l => +(l.dataset.b || 300);
    const set = (l, w) => l.style.setProperty('--w', Math.round(w));
    letters.forEach(l => set(l, base(l)));
    if (reduce) return;
    // una ola cuando el texto aparece en pantalla
    const gap = Math.min(110, 1400 / letters.length);
    const wave = () => letters.forEach((l, i) => {
      setTimeout(() => { set(l, 900); l.classList.add('on'); }, i * gap);
      setTimeout(() => { set(l, base(l)); l.classList.remove('on'); }, i * gap + 450);
    });
    const io = new IntersectionObserver(es => { if (es[0].isIntersecting) { setTimeout(wave, 250); io.disconnect(); } }, { threshold: .4 });
    io.observe(word);
    if (!fine) return;
    // con el cursor: las letras cercanas se engruesan
    let raf = 0;
    word.addEventListener('pointermove', e => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => letters.forEach(l => {
        const r = l.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2), dy = (e.clientY - (r.top + r.height / 2)) * 1.4;
        const k = Math.max(0, 1 - Math.hypot(dx, dy) / (r.height * 1.3));
        set(l, base(l) + (900 - base(l)) * k); l.classList.toggle('on', k > .6);
      }));
    });
    word.addEventListener('pointerleave', () => { cancelAnimationFrame(raf); letters.forEach(l => { set(l, base(l)); l.classList.remove('on'); }); });
  });

  /* ---- 9. Herramientas: vistas previas vivas (página Herramientas) ---- */
  const palPrev = document.querySelector('[data-pal-preview]');
  if (palPrev) {
    const sw = $$('span', palPrev);
    const paint = () => {
      const h = Math.random() * 360, step = [0, 25, 50, 180, 200][Math.floor(Math.random() * 5)], ls = [22, 45, 62, 78, 92];
      sw.forEach((s, i) => s.style.backgroundColor = `hsl(${(h + (i % 2 ? step : i * 12)) % 360} ${55 + Math.random() * 30}% ${ls[i]}%)`);
    };
    paint(); if (!reduce) setInterval(paint, 2600);
  }
  const typePrev = document.querySelector('[data-type-preview]');
  if (typePrev) {
    const pairs = [['Unbounded', 'DM Sans'], ['Syne', 'Inter'], ['Fraunces', 'Work Sans'], ['Bricolage Grotesque', 'IBM Plex Sans'], ['Archivo Black', 'Karla'], ['DM Serif Display', 'Manrope'], ['Playfair Display', 'Inter'], ['Space Grotesk', 'Lora'], ['Bebas Neue', 'Work Sans'], ['Rubik', 'Karla']];
    const aa = typePrev.querySelector('.toolcard__aa'), pr = typePrev.querySelector('.toolcard__pair');
    let k = 0;
    const show = () => {
      const [t, b] = pairs[k++ % pairs.length];
      aa.style.opacity = 0; pr.style.opacity = 0;
      setTimeout(() => { aa.style.fontFamily = `'${t}', sans-serif`; pr.style.fontFamily = `'${b}', sans-serif`; pr.textContent = `${t} + ${b}`; aa.style.opacity = 1; pr.style.opacity = 1; }, 350);
    };
    show(); if (!reduce) setInterval(show, 2200);
  }

  /* ---- 10. Carrusel de proyecto ---- */
  $$('[data-carousel]').forEach(car => {
    const track = car.querySelector('.pcar__track');
    const slides = [...track.children];
    const cur = car.querySelector('[data-cur]'), tot = car.querySelector('[data-total]');
    const prev = car.querySelector('[data-prev]'), next = car.querySelector('[data-next]');
    const pad = n => String(n).padStart(2, '0');
    if (tot) tot.textContent = pad(slides.length);
    const index = () => { const x = track.scrollLeft; let best = 0, d = 1e9; slides.forEach((s, i) => { const dd = Math.abs(s.offsetLeft - track.offsetLeft - x); if (dd < d) { d = dd; best = i; } }); return best; };
    const update = () => {
      if (cur) cur.textContent = pad(index() + 1);
      prev.disabled = track.scrollLeft < 4;
      next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
    };
    const go = d => { const i = Math.max(0, Math.min(slides.length - 1, index() + d)); track.scrollTo({ left: slides[i].offsetLeft - track.offsetLeft, behavior: reduce ? 'auto' : 'smooth' }); };
    prev.addEventListener('click', () => go(-1));
    next.addEventListener('click', () => go(1));
    track.addEventListener('keydown', e => { if (e.key === 'ArrowRight') { e.preventDefault(); go(1); } if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); } });
    track.addEventListener('scroll', () => requestAnimationFrame(update), { passive: true });
    addEventListener('resize', update); update();
    // arrastrar con el mouse (en touch el navegador ya desliza solo)
    let down = false, sx = 0, sl = 0, moved = false;
    track.addEventListener('pointerdown', e => { if (e.pointerType !== 'mouse') return; down = true; moved = false; sx = e.clientX; sl = track.scrollLeft; });
    addEventListener('pointermove', e => { if (!down) return; const dx = e.clientX - sx; if (Math.abs(dx) > 4) { moved = true; track.classList.add('is-drag'); } track.scrollLeft = sl - dx; });
    addEventListener('pointerup', () => { if (!down) return; down = false; track.classList.remove('is-drag'); if (moved) go(0); });
    // los videos se reproducen solo cuando están a la vista
    const vids = $$('video', track);
    if (vids.length && 'IntersectionObserver' in window) {
      const vio = new IntersectionObserver(es => es.forEach(en => { const v = en.target; if (en.isIntersecting) v.play().catch(() => {}); else v.pause(); }), { threshold: .6 });
      vids.forEach(v => { v.muted = true; vio.observe(v); });
    }
  });
})();
