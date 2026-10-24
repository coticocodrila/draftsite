/* GEMMM — Generador de paletas */
(function () {
  const root = document.querySelector('[data-paleta]');
  if (!root) return;
  const N = 5;
  const cols = [];
  const toast = document.querySelector('[data-toast]');
  const rnd = (a, b) => a + Math.random() * (b - a);
  const pick = arr => arr[Math.floor(Math.random() * arr.length)];

  // HSL -> HEX
  const hex = (h, s, l) => {
    s /= 100; l /= 100;
    const k = n => (n + h / 30) % 12, a = s * Math.min(l, 1 - l);
    const f = n => Math.round(255 * (l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1))))).toString(16).padStart(2, '0');
    return ('#' + f(0) + f(8) + f(4)).toUpperCase();
  };
  const lum = hx => {
    const c = [1, 3, 5].map(i => parseInt(hx.substr(i, 2), 16) / 255).map(v => v <= .03928 ? v / 12.92 : Math.pow((v + .055) / 1.055, 2.4));
    return .2126 * c[0] + .7152 * c[1] + .0722 * c[2];
  };

  // Nombres con sabor local según el tono
  const NOMBRES = [
    [15, ['Rojo pebre', 'Rojo copihue', 'Rojo micro', 'Rojo cereza']],
    [40, ['Naranja atardecer', 'Naranja papaya', 'Naranja Valpo', 'Naranja mandarina']],
    [65, ['Amarillo choclo', 'Amarillo aromo', 'Amarillo ascensor', 'Amarillo limón']],
    [165, ['Verde cerro', 'Verde palta', 'Verde boldo', 'Verde araucaria']],
    [200, ['Cian piscina', 'Turquesa caleta', 'Celeste glaciar', 'Aguamarina']],
    [255, ['Azul puerto', 'Azul Pacífico', 'Azul ascensor', 'Azul noche']],
    [290, ['Morado maqui', 'Lila jacarandá', 'Violeta lavanda', 'Morado uva']],
    [345, ['Rosa chicle', 'Fucsia Bellavista', 'Rosa frutilla', 'Rosa buganvilia']],
    [361, ['Rojo pebre', 'Rojo copihue', 'Rojo micro', 'Rojo cereza']]
  ];
  const nombre = (h, s, l) => {
    if (s < 14 || l > 93 || l < 9) return l > 70 ? pick(['Blanco cordillera', 'Gris neblina', 'Hueso']) : l < 30 ? pick(['Negro carbón', 'Negro pizarra']) : pick(['Gris cemento', 'Gris adoquín']);
    const pool = NOMBRES.find(([max]) => h < max)[1];
    let n = pick(pool);
    if (l > 78) n += ' pastel'; else if (l < 30) n += ' profundo';
    return n;
  };

  // Esquemas de armonía
  const esquemas = {
    'Análoga':        h => [0, 18, 36, -18, -36].map(d => h + d),
    'Complementaria': h => [0, 10, 180, 190, 0],
    'Tríada':         h => [0, 120, 240, 120, 0],
    'Monocromática':  h => [0, 0, 0, 0, 0],
    'Dividida':       h => [0, 150, 210, 0, 180]
  };

  function generar() {
    const h0 = rnd(0, 360);
    const nombreEsq = pick(Object.keys(esquemas));
    const hues = esquemas[nombreEsq](h0);
    const ls = [[18, 30], [40, 55], [55, 70], [72, 85], [88, 95]].sort(() => Math.random() - .5);
    cols.forEach((c, i) => {
      if (c.lock) return;
      const h = ((hues[i] % 360) + 360) % 360;
      const s = nombreEsq === 'Monocromática' ? rnd(35, 70) : rnd(45, 88);
      const l = rnd(...ls[i]);
      c.hex = hex(h, s, l); c.name = nombre(h, s, l);
    });
    root.querySelector('[data-esquema]').textContent = nombreEsq;
    pintar();
    guardar();
  }

  function pintar() {
    cols.forEach(c => {
      c.el.style.background = c.hex;
      const fg = lum(c.hex) > .32 ? '#232323' : '#FFFFFF';
      c.el.style.color = fg; c.el.style.setProperty('--fg', fg); c.el.style.setProperty('--bg', c.hex);
      c.el.querySelector('.pal__hex').textContent = c.hex;
      c.el.querySelector('.pal__name').textContent = c.name;
      c.el.classList.toggle('is-locked', c.lock);
      const b = c.el.querySelector('.pal__lock');
      b.setAttribute('aria-pressed', c.lock);
      b.textContent = c.lock ? 'Fijado' : 'Fijar';
    });
    if (window.gsap) gsap.fromTo(cols.filter(c => !c.lock).map(c => c.el.querySelector('.pal__info')),
      { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: .6, stagger: .05, ease: gsap.parseEase('gemmm') ? 'gemmm' : 'power3.out' });
  }

  function guardar() { try { localStorage.setItem('gemmm-paleta', JSON.stringify(cols.map(c => c.hex))); } catch (e) {} }

  function avisar(t) {
    if (!toast) return;
    toast.textContent = t; toast.classList.add('show');
    clearTimeout(avisar.t); avisar.t = setTimeout(() => toast.classList.remove('show'), 1400);
  }
  async function copiar(t, msg) {
    try { await navigator.clipboard.writeText(t); }
    catch (e) { const a = document.createElement('textarea'); a.value = t; document.body.appendChild(a); a.select(); document.execCommand('copy'); a.remove(); }
    avisar(msg);
  }

  // Construir columnas
  const wrap = root.querySelector('.pal');
  for (let i = 0; i < N; i++) {
    const el = document.createElement('div');
    el.className = 'pal__col';
    el.innerHTML = '<div class="pal__info"><button class="pal__hex" type="button" title="Copiar código"></button><span class="pal__name"></span><button class="pal__lock" type="button" aria-pressed="false">Fijar</button></div>';
    wrap.appendChild(el);
    const c = { el, hex: '#FFFFFF', name: '', lock: false };
    el.querySelector('.pal__hex').addEventListener('click', () => copiar(c.hex, c.hex + ' copiado'));
    el.querySelector('.pal__lock').addEventListener('click', () => { c.lock = !c.lock; pintar(); });
    cols.push(c);
  }

  root.querySelector('[data-generar]').addEventListener('click', generar);
  root.querySelector('[data-copiar]').addEventListener('click', () => copiar(cols.map(c => c.hex).join(', '), 'Paleta copiada'));
  root.querySelector('[data-png]').addEventListener('click', () => {
    const cv = document.createElement('canvas'); cv.width = 1500; cv.height = 900;
    const x = cv.getContext('2d'), w = cv.width / N;
    cols.forEach((c, i) => {
      x.fillStyle = c.hex; x.fillRect(i * w, 0, w + 1, 900);
      x.fillStyle = lum(c.hex) > .32 ? '#232323' : '#FFFFFF';
      x.font = '700 34px "DM Sans", sans-serif'; x.fillText(c.hex, i * w + 28, 800);
      x.font = '400 24px "DM Sans", sans-serif'; x.fillText(c.name, i * w + 28, 846);
    });
    const a = document.createElement('a'); a.download = 'paleta-gemmm.png'; a.href = cv.toDataURL('image/png'); a.click();
    avisar('PNG descargado');
  });
  document.addEventListener('keydown', e => {
    const a = document.activeElement;
    if (e.code !== 'Space' || /INPUT|TEXTAREA|SELECT/.test(a.tagName) || a.isContentEditable) return;
    e.preventDefault(); if (a && a.blur) a.blur(); generar();
  });
  generar();
})();
