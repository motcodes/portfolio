/* Standalone port of apps/portfolio/src/components/pixelDistortion.jsx + shader/fragment.glsl.
   Window.PixelStage(canvas, {portrait, images, fragment?}) -> {setActive(i|null)}; variants can override `fragment`/`settings`. */
(function () {
  const settings = { grid: 60, mouse: 0.075, strength: 0.3, relaxation: 0.95, duration: 2, reducedDuration: 0.3, contain: 0.8 };
  const LAYERS = 4;

  const VERT = `attribute vec3 position;attribute vec2 uv;varying vec2 vUv;
void main(){vUv=uv;gl_Position=vec4(position.xy*2.0,0.0,1.0);}`;

  const FRAG = `precision highp float;
uniform sampler2D uDataTexture;uniform sampler2D uNoise;uniform vec2 uResolution;
uniform float uBlock;uniform float uBaseBlock;uniform vec2 uOrigin;
uniform sampler2D uBase;uniform vec2 uBaseScale;uniform vec4 uProgress;
uniform sampler2D uLayer0;uniform sampler2D uLayer1;uniform sampler2D uLayer2;uniform sampler2D uLayer3;
uniform vec2 uScale0;uniform vec2 uScale1;uniform vec2 uScale2;uniform vec2 uScale3;
uniform vec4 uMask0;uniform vec4 uMask1;uniform vec4 uMask2;uniform vec4 uMask3;
varying vec2 vUv;
vec2 gUv;
const vec4 background=vec4(vec3(13.0/255.0),1.0);
const float grid=60.0;const float sweep=0.55;const float resolve=0.45;
vec4 sampleFit(sampler2D tex,vec2 scale,vec2 screenUv,vec2 offset){
  vec2 uv=(screenUv-vec2(0.5))*scale+vec2(0.5)-offset;
  if(uv.x<0.0||uv.x>1.0||uv.y<0.0||uv.y>1.0)return background;
  return texture2D(tex,uv);}
float easeOutQuart(float t){return 1.0-pow(1.0-t,4.0);}
vec2 quant(vec2 uv,float b){if(b<1.5)return uv;return (floor(uv*uResolution/b)+0.5)*b/uResolution;}
bool layer(sampler2D tex,float progress,vec2 scale,vec4 mask,vec2 offset,inout vec4 color){
  if(progress<0.0)return false;
  float p=easeOutQuart(progress);
  vec2 cell=(floor(vUv*grid)+0.5)/grid;
  vec2 aspect=vec2(uResolution.x/uResolution.y,1.0);
  float dist=length((cell-uOrigin)*aspect)/length(max(uOrigin,1.0-uOrigin)*aspect);
  float start=(dist*0.85+dot(texture2D(uNoise,cell),mask)*0.15)*sweep;
  float local=(p-start)/resolve;
  if(local<=0.0)return false;
  float level=floor((1.0-clamp(local,0.0,1.0))*5.0);
  vec2 uv=gUv;
  if(level>0.0){vec2 block=exp2(level+1.0)/uResolution;uv=(floor(gUv/block)+0.5)*block;}
  color=sampleFit(tex,scale,uv,offset);
  return true;}
void main(){
  gUv=quant(vUv,uBlock);
  vec2 offset=0.02*texture2D(uDataTexture,gUv).rg;
  vec4 color=sampleFit(uBase,uBaseScale,quant(gUv,uBaseBlock),offset);
  if(layer(uLayer3,uProgress.w,uScale3,uMask3,offset,color)){}
  else if(layer(uLayer2,uProgress.z,uScale2,uMask2,offset,color)){}
  else if(layer(uLayer1,uProgress.y,uScale1,uMask1,offset,color)){}
  else layer(uLayer0,uProgress.x,uScale0,uMask0,offset,color);
  gl_FragColor=color;}`;

  window.PixelStage = function (canvas, opts) {
    const S = Object.assign({}, settings, opts.settings);
    const gl = canvas.getContext('webgl', { antialias: true });
    if (!gl.getExtension('OES_texture_float')) throw new Error('OES_texture_float missing');
    const sh = (t, s) => { const o = gl.createShader(t); gl.shaderSource(o, s); gl.compileShader(o); if (!gl.getShaderParameter(o, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(o)); return o; };
    const prog = gl.createProgram();
    gl.attachShader(prog, sh(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, opts.fragment || FRAG));
    gl.linkProgram(prog); gl.useProgram(prog);

    const buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    // x,y,u,v
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-.5,-.5,0,0, .5,-.5,1,0, -.5,.5,0,1, .5,.5,1,1]), gl.STATIC_DRAW);
    const aP = gl.getAttribLocation(prog, 'position'), aU = gl.getAttribLocation(prog, 'uv');
    gl.enableVertexAttribArray(aP); gl.vertexAttribPointer(aP, 2, gl.FLOAT, false, 16, 0);
    gl.enableVertexAttribArray(aU); gl.vertexAttribPointer(aU, 2, gl.FLOAT, false, 16, 8);

    const U = (n) => gl.getUniformLocation(prog, n);
    const G = S.grid;
    const floatTex = (data) => { const t = gl.createTexture(); gl.bindTexture(gl.TEXTURE_2D, t);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, G, G, 0, gl.RGBA, gl.FLOAT, data); return t; };
    const grid = new Float32Array(4 * G * G), noise = new Float32Array(4 * G * G);
    const gridTex = floatTex(grid), noiseTex = floatTex(noise);
    const upload = (t, d) => { gl.bindTexture(gl.TEXTURE_2D, t); gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, G, G, 0, gl.RGBA, gl.FLOAT, d); };

    // scatter = the "assemble" intro: random offsets in [-125,130] relaxing by 0.95 per frame
    const scatter = () => { for (let i = 0; i < grid.length; i += 4) { const r = Math.random() * 255 - 125, r1 = Math.random() * 255 - 125; grid[i] = r; grid[i + 1] = r1; grid[i + 2] = r; grid[i + 3] = 1; } };

    const textures = []; // index 0 portrait, i+1 project i
    let ready = false;
    Promise.all([opts.portrait, ...opts.images].map((src) => new Promise((res) => {
      const img = new Image(); img.crossOrigin = 'anonymous';
      img.onload = () => { const t = gl.createTexture(); gl.bindTexture(gl.TEXTURE_2D, t);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false); // global state: left on, it also flips the float grid/noise uploads (distortion mirrored away from the cursor)
        // three: LinearFilter mag, LinearMipmapLinear min, clamp; NPOT in WebGL1 -> no mips, linear
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        res({ t, w: img.naturalWidth, h: img.naturalHeight }); };
      let tries = 0; // flaky network: retry, otherwise the stage would never become ready
      img.onerror = () => { if (tries++ < 5) setTimeout(() => { img.src = src + (src.includes('?') ? '&' : '?') + 'r=' + tries; }, 400 * tries); };
      img.src = src;
    }))).then((r) => { textures.push(...r); resize(); ready = true; scatter(); });

    // uv scale: cover (portrait) or contain at settings.contain (projects)
    const fitScale = (tex, va, cover) => {
      const ia = tex.w / tex.h;
      if (cover) return va > ia ? [1, ia / va] : [va / ia, 1];
      const w = Math.min(1, ia / va) * S.contain;
      return [1 / w, ia / va / w];
    };
    // project textures blend contain -> cover by fx.zoom (geometric, so growth feels even)
    const fitFor = (tex, va, idx, z = fx.zoom) => {
      if (idx === 0) return fitScale(tex, va, true);
      const a = fitScale(tex, va, false), b = fitScale(tex, va, true);
      return [a[0] ** (1 - z) * b[0] ** z, a[1] ** (1 - z) * b[1] ** z];
    };

    const st = { base: 0, layers: [], channel: 0 };
    // fx: extra knobs for transition variants; defaults leave the current effect untouched
    // scroll (uv heights the base image is shifted up) and dim (0..1 darkening of the base image): page-scroll coupling, reset when a zoom ring lands
    const fx = { zoom: 0, block: 0, baseBlock: 0, origin: [0.5, 0.5], scroll: 0, dim: 0 };
    const jitter = Float32Array.from({ length: G * G }, () => 0.7 + Math.random() * 0.6);
    let active = null;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)');
    // round robin keeps channels unique, live layers are dropped oldest first
    // opts.zoom: this ring brings its image in at that contain->cover blend (promoted to fx.zoom when it lands); origin is captured from fx.origin per ring
    const push = (target, duration, opts = {}) => {
      const channel = st.channel; st.channel = (st.channel + 1) % LAYERS;
      for (let k = channel; k < noise.length; k += 4) noise[k] = Math.random();
      upload(noiseTex, noise);
      st.layers.push({ to: target, progress: 0, duration: reduce.matches ? S.reducedDuration : duration, channel, origin: fx.origin.slice(), zoom: opts.zoom });
      if (st.layers.length > LAYERS) st.base = st.layers.shift().to;
    };
    const api = {
      setActive(i) {
        if (active === i) return; active = i;
        const target = i === null ? 0 : i + 1;
        if (target === (st.layers.length ? st.layers[st.layers.length - 1].to : st.base)) return;
        push(target, S.duration);
      },
      // re-run the ring on the image that is already showing (mosaic resolve again)
      replay(duration = S.duration, opts) { push(st.layers.length ? st.layers[st.layers.length - 1].to : st.base, duration, opts); },
      // hard switch, no ring: index (null) or project i
      cut(i) { active = i; st.base = i === null ? 0 : i + 1; st.layers = []; },
      active: () => active,
      ready: () => ready,
      // outward impulse on the offset grid around viewport point (u,v: 0..1, v up); amp ~ grid units
      kick(u, v, amp) {
        const gx = G * u, gy = G * v;
        for (let i = 0; i < G; i++) for (let j = 0; j < G; j++) {
          const dx = i + 0.5 - gx, dy = j + 0.5 - gy, d = Math.hypot(dx, dy) || 1, f = Math.max(0.35, 1.25 - d / (G * 0.9)) * jitter[i + G * j] * amp;
          const idx = 4 * (i + G * j); grid[idx] += (dx / d) * f; grid[idx + 1] += (dy / d) * f;
        }
      },
      fx, scatter, state: st, settings: S,
    };

    let W = innerWidth, H = innerHeight;
    function resize() { W = innerWidth; H = innerHeight; const d = Math.min(devicePixelRatio, 2); canvas.width = W * d; canvas.height = H * d; gl.viewport(0, 0, canvas.width, canvas.height); scatter(); }
    addEventListener('resize', resize);

    // useMouse quirk: velocity is the delta of the two previous events, one event late
    const m = { x: 0, y: 0, prevX: 0, prevY: 0, vX: 0, vY: 0 };
    addEventListener('mousemove', (e) => {
      const n = { x: e.clientX / W, y: e.clientY / H, vX: m.x - m.prevX, vY: m.y - m.prevY, prevX: m.x, prevY: m.y };
      Object.assign(m, n);
    });

    const clamp = (n, a, b) => Math.max(a, Math.min(n, b));
    let last = performance.now();
    const bind = (unit, tex, name) => { gl.activeTexture(gl.TEXTURE0 + unit); gl.bindTexture(gl.TEXTURE_2D, tex); gl.uniform1i(U(name), unit); };

    function frame(now) {
      requestAnimationFrame(frame);
      const delta = Math.min((now - last) / 1000, 0.1); last = now;
      if (!ready) return;

      for (let i = 0; i < grid.length; i += 4) { grid[i] *= S.relaxation; grid[i + 1] *= S.relaxation; }
      const gx = G * m.x, gy = G * (1 - m.y), maxDist = G * S.mouse, aspect = H / W;
      for (let i = 0; i < G; i++) for (let j = 0; j < G; j++) {
        const dist = (gx - i) ** 2 / aspect + (gy - j) ** 2;
        if (dist < maxDist ** 2) {
          const idx = 4 * (i + G * j), power = clamp(maxDist / Math.sqrt(dist), 0, 10);
          grid[idx] += S.strength * 100 * m.vX * power;
          grid[idx + 1] -= S.strength * 100 * m.vY * power;
        }
      }
      m.vX *= 0.9; m.vY *= 0.9;
      upload(gridTex, grid);

      for (const l of st.layers) l.progress = Math.min(1, l.progress + delta / l.duration);
      let done = -1; st.layers.forEach((l, i) => { if (l.progress >= 1) done = i; });
      if (done >= 0) { st.base = st.layers[done].to; if (st.layers[done].zoom != null) { fx.zoom = st.layers[done].zoom; fx.scroll = 0; fx.dim = 0; } st.layers = st.layers.slice(done + 1); }

      const va = W / H;
      bind(0, gridTex, 'uDataTexture'); bind(1, noiseTex, 'uNoise');
      bind(2, textures[st.base].t, 'uBase');
      gl.uniform2fv(U('uBaseScale'), fitFor(textures[st.base], va, st.base));
      const prog4 = [-1, -1, -1, -1];
      for (let s = 0; s < LAYERS; s++) {
        const layer = st.layers[s], idx = layer ? layer.to : st.base;
        bind(3 + s, textures[idx].t, 'uLayer' + s);
        gl.uniform2fv(U('uScale' + s), fitFor(textures[idx], va, idx, layer && layer.zoom != null ? layer.zoom : fx.zoom));
        gl.uniform2fv(U('uOrigin' + s), layer ? layer.origin : fx.origin);
        const mask = [0, 0, 0, 0]; mask[layer ? layer.channel : 0] = 1;
        gl.uniform4fv(U('uMask' + s), mask);
        prog4[s] = layer ? layer.progress : -1;
      }
      gl.uniform4fv(U('uProgress'), prog4);
      gl.uniform2f(U('uResolution'), W, H);
      gl.uniform1f(U('uBlock'), fx.block);
      gl.uniform1f(U('uBaseBlock'), st.layers.length ? fx.baseBlock : 0); // base mosaic only while a ring is resolving over it
      gl.uniform2fv(U('uOrigin'), fx.origin);
      gl.uniform1f(U('uScroll'), fx.scroll); gl.uniform1f(U('uDim'), fx.dim);
      if (opts.onFrame) opts.onFrame(gl, U, api, delta);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }
    requestAnimationFrame(frame);
    return api;
  };

  // real homepage data (indexQuery via localhost:3000 __NEXT_DATA__). Images are local copies of the same cdn.sanity.io assets:
  // the Sanity project CORS allowlist rejects this origin, which would taint the WebGL textures. `source` keeps the original URL.
  // year/role/tags do not exist in the real data -> placeholders.
  const ROLES = ['Design & Dev', 'Creative Dev', 'Dev', 'Design', 'WebGL', 'Art Direction'];
  window.PREVIEW_DATA = {
    portrait: '../../apps/portfolio/public/me1920.jpg',
    projects: [
      { _id: "homeProject-dom-perignon", name: "Dom Perignon", image: 'img/dom-perignon.jpg', source: "https://cdn.sanity.io/images/qhdnmhc0/production/11ab7eea9445ae3595693af88eb3dfed372c1c9e-1440x800.jpg" },
      { _id: "homeProject-kelly-wearstler", name: "Kelly Wearstler", image: 'img/kelly-wearstler.jpg', source: "https://cdn.sanity.io/images/qhdnmhc0/production/1e947440f99a6c6f54eba94f3d6fd643a09c6ab1-1440x800.jpg" },
      { _id: "homeProject-la-burdick", name: "LA Burdick", image: 'img/la-burdick.jpg', source: "https://cdn.sanity.io/images/qhdnmhc0/production/321e2847c5f97808c410807d5a4d85cbaa1e8677-1440x800.jpg" },
      { _id: "homeProject-caravane", name: "Caravane", image: 'img/caravane.jpg', source: "https://cdn.sanity.io/images/qhdnmhc0/production/efe7031ebfb085214af5f9c44137151099a852e8-1440x800.jpg" },
      { _id: "homeProject-coterie", name: "Coterie", image: 'img/coterie.jpg', source: "https://cdn.sanity.io/images/qhdnmhc0/production/f8b60903be1f2b44cf45c55b98ffffb6a7926dab-1440x800.jpg" },
      { _id: "homeProject-landlife", name: "Landlife", image: 'img/landlife.jpg', source: "https://cdn.sanity.io/images/qhdnmhc0/production/e4c7cc7dd230df9f72d0fa1900e5c301f6fc4ea4-1440x800.jpg" },
      { _id: "homeProject-daylight", name: "Daylight", image: 'img/daylight.jpg', source: "https://cdn.sanity.io/images/qhdnmhc0/production/c5063f942f4c12524dca6e57e58aa85495750803-1440x800.jpg" },
      { _id: "homeProject-face-formular", name: "Face Formular", image: 'img/face-formular.jpg', source: "https://cdn.sanity.io/images/qhdnmhc0/production/f1d8e282699496f484c5b3a6bf3a9afbfeff25a1-1440x800.jpg" },
      { _id: "homeProject-marble", name: "Marble", image: 'img/marble.jpg', source: "https://cdn.sanity.io/images/qhdnmhc0/production/5150d3b6215d47792ac89c08331f5dfbb180f2c2-1440x800.jpg" },
      { _id: "homeProject-qiqi", name: "QIQI", image: 'img/qiqi.jpg', source: "https://cdn.sanity.io/images/qhdnmhc0/production/dbc3081081c66ad82dbe9c08fcc8f0b6ed0cb4a1-1440x800.jpg" },
      { _id: "homeProject-sarah-sey", name: "Sarah Sey", image: 'img/qiqi.jpg', source: "https://cdn.sanity.io/images/qhdnmhc0/production/67191512cda508d9e1a4d3b595f170d218b09116-1440x800.jpg" }, // asset 404s on cdn.sanity.io (broken in real data too): stand-in image
    ].map((p, i) => Object.assign(p, {
      year: String(2026 - (i % 5)), role: ROLES[i % ROLES.length], tags: ['Next.js', 'WebGL', 'Sanity'].slice(0, 2 + (i % 2)).join(', '),
    })),
  };

  // renders list (desktop), carousel (mobile), wires hover/focus -> stage.setActive; list keeps last active after leave.
  // opts: onActive(i) replaces stage.setActive; onSelect(i, event) fires on click / Enter of a list or carousel item.
  window.mountIndex = function (stage, { onActive, onSelect } = {}) {
    const { projects } = window.PREVIEW_DATA;
    let active = null;
    const buttons = [];
    const set = (i) => { if (active === i) return; active = i; buttons.forEach((b) => b.el.classList.toggle('dim', i !== null && b.i !== i)); (onActive || stage.setActive)(i); };
    const fill = (ul, evs) => projects.forEach((p, i) => { const li = document.createElement('li'), b = document.createElement('button');
      b.type = 'button'; b.textContent = p.name; evs(b, i); li.appendChild(b); ul.appendChild(li); buttons.push({ el: b, i }); });
    fill(document.getElementById('list'), (b, i) => { b.onmouseenter = () => set(i); b.onfocus = () => set(i); b.onclick = (e) => { set(i); onSelect && onSelect(i, e); }; });
    fill(document.getElementById('carousel'), (b, i) => { b.onclick = (e) => { set(i); onSelect && onSelect(i, e); }; });
    return { set };
  };

  /* ---------- PreviewKit: helpers for click -> project transitions (variants 01-03, adoptable by others) ---------- */
  const tracked = [];
  const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
  const ease = {
    quartIn: (t) => t ** 4,
    quartOut: (t) => 1 - (1 - t) ** 4,
    quartInOut: (t) => (t < 0.5 ? 8 * t ** 4 : 1 - (-2 * t + 2) ** 4 / 2),
    expoOut: (t) => (t >= 1 ? 1 : 1 - 2 ** (-10 * t)),
    expoInOut: (t) => (t <= 0 ? 0 : t >= 1 ? 1 : t < 0.5 ? 2 ** (20 * t - 10) / 2 : (2 - 2 ** (-20 * t + 10)) / 2),
  };
  // same curves as css cubic-beziers, for WAAPI
  const css = { quartIn: 'cubic-bezier(.5,0,.75,0)', quartOut: 'cubic-bezier(.25,1,.5,1)', expoOut: 'cubic-bezier(.16,1,.3,1)', expoInOut: 'cubic-bezier(.87,0,.13,1)' };
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  // tween(ms, (easedValue, rawProgress) => void, easing = expoInOut) -> Promise
  const tween = (ms, fn, easing = ease.expoInOut) => new Promise((res) => {
    if (ms <= 0) { fn(easing(1), 1); return res(); }
    const t0 = performance.now();
    (function step(n) { const p = Math.min(1, Math.max(0, (n - t0) / ms)); fn(easing(p), p); p < 1 ? requestAnimationFrame(step) : res(); })(t0);
  });
  // element.animate that the flow cancels once the final state is set (so nothing sticks)
  const anim = (el, kf, o) => { const a = el.animate(kf, Object.assign({ fill: 'both' }, o)); tracked.push(a); return a; };
  const clearAnims = () => { tracked.splice(0).forEach((a) => a.cancel()); };
  // staggered slide/fade of elements; dir 'in' | 'out'
  const stagger = (els, dir, { delay = 0, step = 60, duration = 800, y = 36 } = {}) => els.map((el, i) => anim(el,
    dir === 'in' ? [{ opacity: 0, transform: `translateY(${y}px)` }, { opacity: 1, transform: 'none' }] : [{ opacity: 1, transform: 'none' }, { opacity: 0, transform: `translateY(${-y / 2}px)` }],
    { duration: dir === 'in' ? duration : duration * 0.55, delay: delay + i * step, easing: dir === 'in' ? css.expoOut : css.quartIn }));
  const indexParts = () => [...document.querySelectorAll('h1,.status,.carousel,.copy,.list li,.footer')];

  const label = (name, desc) => { const d = document.createElement('div'); d.className = 'pv-label'; d.innerHTML = `<b>${name}</b> — ${desc}`; document.body.appendChild(d); };

  // mountProject(project, {hero: 'img' | 'space'}) -> <article class="project"> appended to <body>, hidden.
  //   hero 'img': hero is an <img> (DOM-only variants). 'space': empty hero, a WebGL canvas behind shows through.
  //   el.parts = {back, title, hero, meta, copy: [p..], gallery: [img..], items: [back, title, meta, ...copy, ...gallery]}
  //   show/hide with el.classList.toggle('is-open'). Back link is <a class="p-back" href="#">.
  // 3 images of the following projects (wraps), stand-ins for a real gallery
  const otherImages = (project) => { const ps = window.PREVIEW_DATA.projects, i = ps.indexOf(project); return [1, 2, 3].map((k) => ps[(i + k) % ps.length].image); };
  const mountProject = (project, { hero = 'img' } = {}) => {
    const el = document.createElement('article');
    el.className = 'project'; el.id = 'project-' + project._id; el.setAttribute('aria-label', project.name);
    const lorem = [
      'A short placeholder introduction about the project: the brief, the constraints and the idea that held the whole thing together from the first sketch to launch.',
      'Second paragraph of placeholder copy. It talks about the build, the interaction details and the performance budget that shaped most of the decisions along the way.',
      'Third paragraph, a closing note on the outcome: what shipped, what was learned and what would be done differently next time around.',
    ];
    el.innerHTML = `
      <a class="p-back" href="#">&larr; Index</a>
      <header class="p-hero">${hero === 'img' ? `<img src="${project.image}" alt="">` : ''}<h2 class="p-title">${project.name}</h2></header>
      <div class="p-body">
        <dl class="p-meta"><div><dt>Year</dt><dd>${project.year}</dd></div><div><dt>Role</dt><dd>${project.role}</dd></div><div><dt>Tags</dt><dd>${project.tags}</dd></div><div><dt>Link</dt><dd>example.com</dd></div></dl>
        <div class="p-copy">${lorem.map((t) => `<p>${t}</p>`).join('')}</div>
        <div class="p-gallery">${otherImages(project).map((src) => `<img loading="lazy" src="${src}" alt="">`).join('')}</div>
      </div>`;
    const q = (s) => el.querySelector(s), copy = [...el.querySelectorAll('.p-copy p')], gallery = [...el.querySelectorAll('.p-gallery img')];
    el.parts = { back: q('.p-back'), title: q('.p-title'), hero: q('.p-hero'), meta: q('.p-meta'), copy, gallery };
    el.parts.items = [el.parts.back, el.parts.title, el.parts.meta, ...copy, ...gallery];
    document.body.appendChild(el);
    return el;
  };

  /* flow({stage, hero, show, hide, enter, leave}) wires index -> project -> index.
     show(ctx)/hide(ctx): instant stage state for project / index view (used by reduced motion, deep link).
     enter(ctx)/leave(ctx): async animated versions. ctx = {i, project, pt:{x,y,u,v}, el, openProject, closeProject, awayIndex, returnIndex}.
     The flow sets the final DOM state itself afterwards. history: pushState('#id'), popstate + Back link reverse. */
  const flow = ({ stage, hero = 'space', show = () => {}, hide = () => {}, enter, leave }) => {
    const { projects } = window.PREVIEW_DATA;
    const dom = document.querySelector('.dom');
    const els = {};
    const elOf = (i) => (els[i] ||= mountProject(projects[i], { hero }));
    let view = 'index', cur = null, busy = false, lastPt = null, backPt = null;
    const center = () => ({ x: innerWidth / 2, y: innerHeight / 2, u: 0.5, v: 0.5 });
    const ptOf = (e, target) => {
      let x = e && e.clientX, y = e && e.clientY;
      if (!x && !y) { const r = (target || e.currentTarget).getBoundingClientRect(); x = r.left + r.width / 2; y = r.top + r.height / 2; } // keyboard
      return { x, y, u: x / innerWidth, v: 1 - y / innerHeight };
    };
    const ctxOf = (i, pt) => ({
      i, project: projects[i], pt, el: elOf(i),
      // scroll resets only when opening from hidden; later calls (flow re-applies the final state after enter) must not jump the page
      openProject() { if (!this.el.classList.contains('is-open')) this.el.scrollTop = 0; this.el.classList.add('is-open'); },
      closeProject() { this.el.classList.remove('is-open'); },
      awayIndex() { dom.classList.add('is-away'); },
      returnIndex() { dom.classList.remove('is-away'); },
    });
    const fade = async (el, from, to) => { const a = el.animate([{ opacity: from }, { opacity: to }], { duration: 160, fill: 'both' }); await a.finished; return a; };

    async function go(i, pt, instant) {
      busy = true; cur = i; lastPt = pt;
      const c = ctxOf(i, pt);
      index.set(i);
      if (instant || reduced()) {
        // reduced motion / deep link: short crossfade (none for deep link)
        const a = instant ? null : await fade(dom, 1, 0);
        show(c); c.awayIndex(); c.openProject();
        if (a) a.cancel();
        if (!instant) (await fade(c.el, 0, 1)).cancel();
      } else await enter(c);
      show(c); c.awayIndex(); c.openProject(); clearAnims();
      view = 'project'; busy = false; sync();
    }
    async function back() {
      busy = true;
      const c = ctxOf(cur, backPt || lastPt || center()); backPt = null;
      if (reduced()) {
        const a = await fade(c.el, 1, 0);
        hide(c); c.closeProject(); c.returnIndex(); a.cancel();
        (await fade(dom, 0, 1)).cancel();
      } else await leave(c);
      hide(c); c.closeProject(); c.returnIndex(); clearAnims();
      view = 'index'; busy = false; sync();
    }
    const want = () => projects.findIndex((p) => '#' + p._id === location.hash);
    function sync(instant) {
      if (busy) return;
      const w = want();
      if (view === 'index' && w >= 0) go(w, lastPt || center(), instant);
      else if (view === 'project' && w !== cur) back();
    }
    addEventListener('popstate', () => sync());
    document.addEventListener('click', (e) => {
      const a = e.target.closest && e.target.closest('.p-back'); if (!a) return;
      e.preventDefault(); if (busy) return;
      backPt = ptOf(e, a);
      history.state && history.state.pv ? history.back() : (history.replaceState(null, '', location.pathname + location.search), sync());
    });
    const index = mountIndex(stage, {
      onSelect(i, e) {
        if (busy || view !== 'index') return;
        history.pushState({ pv: 1 }, '', '#' + projects[i]._id);
        go(i, ptOf(e), false);
      },
    });
    // deep link: start straight in the project view once textures are in
    if (want() >= 0) { const w = want(); (function wait() { stage.ready() ? go(w, center(), true) : setTimeout(wait, 50); })(); }
    return { index };
  };

  window.PreviewKit = { ease, css, sleep, tween, anim, clearAnims, stagger, indexParts, label, mountProject, flow, reduced };
  window.mountProject = mountProject;
})();
