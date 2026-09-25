import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger, SplitText);

const root = document.documentElement;
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
const EASE = 'expo.out';

/* ── Uhrzeit Kaufbeuren im Header ── */
function clock() {
  const els = document.querySelectorAll<HTMLElement>('[data-clock]');
  if (!els.length) return;
  const fmt = new Intl.DateTimeFormat('de-DE', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Berlin' });
  const tick = () => els.forEach((el) => (el.textContent = fmt.format(new Date())));
  tick();
  setInterval(tick, 15000);
}

/* ── Header: beim Runterscrollen weg, beim Hochscrollen da ── */
function header(lenis: Lenis | null) {
  const nav = document.querySelector<HTMLElement>('.nav');
  if (!nav) return;
  let last = 0;
  const update = (y: number) => {
    nav.classList.toggle('is-scrolled', y > 24);
    const menuOpen = document.querySelector('.menu.is-open');
    if (!menuOpen) nav.classList.toggle('is-hidden', y > last && y > 240);
    last = y;
  };
  if (lenis) lenis.on('scroll', ({ scroll }: { scroll: number }) => update(scroll));
  else window.addEventListener('scroll', () => update(window.scrollY), { passive: true });
  update(window.scrollY);
}

/* ── Mobiles Menü ── */
function menu(lenis: Lenis | null) {
  const btn = document.querySelector<HTMLButtonElement>('.menu-btn');
  const panel = document.getElementById('menu');
  if (!btn || !panel) return;
  const set = (open: boolean) => {
    btn.setAttribute('aria-expanded', String(open));
    btn.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen');
    panel.classList.toggle('is-open', open);
    panel.toggleAttribute('inert', !open);
    document.body.style.overflow = open ? 'hidden' : '';
    open ? lenis?.stop() : lenis?.start();
    if (open) panel.querySelector<HTMLElement>('a')?.focus({ preventScroll: true });
  };
  btn.addEventListener('click', () => set(btn.getAttribute('aria-expanded') !== 'true'));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && panel.classList.contains('is-open')) {
      set(false);
      btn.focus();
    }
  });
  panel.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => set(false)));
}

/* ── Videos: erst laden, wenn sichtbar; pausieren, wenn weg ── */
function lazyVideos() {
  const vids = document.querySelectorAll<HTMLVideoElement>('video[data-src]');
  if (!vids.length) return;
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        const v = target as HTMLVideoElement;
        if (isIntersecting) {
          if (!v.src) v.src = v.dataset.src!;
          if (!reduce) v.play().catch(() => {});
        } else v.pause();
      });
    },
    { rootMargin: '300px 0px', threshold: 0.1 },
  );
  vids.forEach((v) => io.observe(v));
}

/* ── Hero-Reel: Hochformat-Clips nacheinander, mit Überblendung ── */
function heroReel() {
  const reel = document.querySelector<HTMLElement>('[data-reel]');
  if (!reel) return;
  const vids = [...reel.querySelectorAll<HTMLVideoElement>('video')];
  const label = reel.querySelector<HTMLElement>('[data-reel-label]');
  let i = 0;
  const load = (v: HTMLVideoElement) => {
    if (!v.src) v.src = v.dataset.reelSrc!;
  };
  const show = (n: number) => {
    vids.forEach((v, k) => v.classList.toggle('is-on', k === n));
    const v = vids[n];
    v.currentTime = 0;
    if (!reduce) v.play().catch(() => {});
    if (label) label.textContent = `${String(n + 1).padStart(2, '0')} / ${String(vids.length).padStart(2, '0')}`;
    const next = vids[(n + 1) % vids.length];
    // nächsten Clip vorladen, sobald der aktuelle läuft
    v.addEventListener('playing', () => load(next), { once: true });
  };
  vids.forEach((v, k) =>
    v.addEventListener('ended', () => {
      if (k !== i) return;
      i = (i + 1) % vids.length;
      show(i);
    }),
  );
  load(vids[0]);
  vids[0].classList.add('is-on');
  if (reduce) return;
  // Nur abspielen, wenn das Reel im Bild ist
  new IntersectionObserver(([e]) => {
    const v = vids[i];
    if (e.isIntersecting) {
      if (v.paused && v.currentTime === 0) show(i);
      else v.play().catch(() => {});
    } else v.pause();
  }).observe(reel);
}

/* ── Projekt-Index: Vorschau folgt dem Cursor ── */
function peek() {
  const list = document.querySelector<HTMLElement>('[data-peek-list]');
  const box = document.querySelector<HTMLElement>('.peek');
  if (!list || !box || !finePointer || reduce) return;
  const imgs = [...box.querySelectorAll<HTMLImageElement>('img')];
  const xTo = gsap.quickTo(box, 'x', { duration: 0.6, ease: 'power3' });
  const yTo = gsap.quickTo(box, 'y', { duration: 0.6, ease: 'power3' });
  const rTo = gsap.quickTo(box, 'rotation', { duration: 0.8, ease: 'power3' });
  let lastX = 0;
  list.addEventListener('pointermove', (e) => {
    xTo(e.clientX);
    yTo(e.clientY);
    rTo(gsap.utils.clamp(-8, 8, (e.clientX - lastX) * 0.6));
    lastX = e.clientX;
  });
  list.querySelectorAll<HTMLElement>('[data-peek]').forEach((a) => {
    a.addEventListener('pointerenter', () => {
      const n = Number(a.dataset.peek);
      imgs.forEach((img, k) => img.classList.toggle('is-on', k === n));
      gsap.to(box, { autoAlpha: 1, scale: 1, duration: 0.5, ease: EASE, overwrite: 'auto' });
    });
  });
  list.addEventListener('pointerleave', () =>
    gsap.to(box, { autoAlpha: 0, scale: 0.85, duration: 0.35, ease: 'power2.in', overwrite: 'auto' }),
  );
}

/* ── Scroll-Animationen ── */
function reveals() {
  // Überschriften zeilenweise aus einer Maske schieben
  document.querySelectorAll<HTMLElement>('[data-split]').forEach((el) => {
    const split = SplitText.create(el, { type: 'lines', mask: 'lines', linesClass: 'line' });
    gsap.set(el, { visibility: 'visible' });
    gsap.from(split.lines, {
      yPercent: 110,
      duration: 1.1,
      ease: EASE,
      stagger: 0.08,
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
    });
  });

  // Blöcke weich einblenden, Gruppen gestaffelt
  ScrollTrigger.batch('[data-reveal]', {
    start: 'top 90%',
    once: true,
    onEnter: (els) =>
      gsap.to(els, { opacity: 1, y: 0, duration: 1, ease: EASE, stagger: 0.07, overwrite: true }),
  });

  // „Licht an“: Bilder öffnen sich aus dem Dunkeln
  document.querySelectorAll<HTMLElement>('[data-relight]').forEach((el) => {
    const media = el.querySelector('img, video');
    const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 85%', once: true } });
    tl.to(el, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, ease: 'expo.inOut' }, 0);
    if (media) tl.to(media, { scale: 1, filter: 'brightness(1) saturate(1)', duration: 1.8, ease: EASE }, 0.1);
  });

  // Verlaufsbalken fährt aus
  document.querySelectorAll<HTMLElement>('.gradbar[data-bar]').forEach((el) =>
    gsap.to(el, { scaleX: 1, duration: 1.6, ease: 'expo.inOut', scrollTrigger: { trigger: el, start: 'top 95%', once: true } }),
  );

  // Dezente Parallaxe, nur Desktop
  if (finePointer) {
    document.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => {
      const amt = Number(el.dataset.parallax || 10);
      gsap.fromTo(el, { yPercent: -amt / 2 }, { yPercent: amt / 2, ease: 'none', scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } });
    });
  }

  // Footer-Wortmarke zieht beim Ankommen hoch
  const big = document.querySelector('.foot-big');
  if (big) gsap.from(big, { yPercent: 40, ease: 'none', scrollTrigger: { trigger: '.foot', start: 'top bottom', end: 'bottom bottom', scrub: true } });
}

/* ── Intro der Startseite ── */
function heroIntro() {
  const hero = document.querySelector('.hero');
  if (!hero) return;
  const tl = gsap.timeline({ defaults: { ease: EASE } });
  tl.to('.hero-bg', { opacity: 1, duration: 1.6, ease: 'power2.out' }, 0)
    .to('.reel', { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.3, ease: 'expo.inOut' }, 0.15)
    .to('.hero-word .ch', { yPercent: 0, y: 0, duration: 1.2, stagger: 0.045 }, 0.45);
  // Scroll: Reel wandert leicht, Wortmarke bleibt – gibt Tiefe
  if (finePointer) {
    gsap.to('.reel', { yPercent: -12, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true } });
    gsap.to('.hero-bg', { opacity: 0.35, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true } });
  }
}

/* ── Start ── */
function init() {
  // Signal an das Inline-Skript im <head>: Animationen laufen, Startzustände nicht zurücksetzen
  root.dataset.motion = 'ok';
  clock();
  lazyVideos();
  heroReel();

  if (reduce) {
    root.classList.remove('js-motion');
    header(null);
    menu(null);
    return;
  }

  const lenis = finePointer ? new Lenis({ lerp: 0.1, wheelMultiplier: 1, anchors: { offset: -80 } }) : null;
  if (lenis) {
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  }
  header(lenis);
  menu(lenis);

  // Erst nach dem Laden der Schriften teilen, sonst springen die Zeilen
  document.fonts.ready.then(() => {
    heroIntro();
    reveals();
    peek();
    ScrollTrigger.refresh();
  });

  // Bilder mit fester Größe verschieben nichts, trotzdem nach dem Laden neu messen
  window.addEventListener('load', () => ScrollTrigger.refresh());
}

init();

// Beim Zurück-Navigieren aus dem Cache sind alle Zustände schon da
window.addEventListener('pageshow', (e) => {
  if (e.persisted) ScrollTrigger.refresh();
});
