import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger, SplitText);

const root = document.documentElement;
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
const EASE = 'expo.out';

/* ── Header: beim Runterscrollen weg, beim Hochscrollen da ── */
function header(lenis: Lenis | null) {
  const nav = document.querySelector<HTMLElement>('.nav');
  if (!nav) return;
  let last = 0;
  const update = (y: number) => {
    nav.classList.toggle('is-scrolled', y > 24);
    if (!document.querySelector('.menu.is-open')) nav.classList.toggle('is-hidden', y > last && y > 240);
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

/* ── Videos in Galerien: erst laden, wenn sichtbar; pausieren, wenn weg ── */
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

/* ── Anfrage-Links tragen die gewählte Szene mit ── */
function setSceneLinks(scene: string) {
  document.querySelectorAll<HTMLAnchorElement>('[data-scene-link]').forEach((a) => {
    // Basis-Link einmal merken (so bleibt es auch bei relativen Pfaden korrekt)
    a.dataset.base ??= a.href.split('?')[0];
    a.href = `${a.dataset.base}?szene=${scene}`;
  });
}

/* ── Bildmischer auf der Startseite ── */
function mixer() {
  const monitor = document.querySelector<HTMLElement>('[data-monitor]');
  if (!monitor) return;
  const vids = [...monitor.querySelectorAll<HTMLVideoElement>('video')];
  const channels = [...document.querySelectorAll<HTMLButtonElement>('[data-channel]')];
  const panels = [...document.querySelectorAll<HTMLElement>('[data-panel]')];
  const tally = monitor.querySelector<HTMLElement>('[data-tally]');
  const toggle = monitor.querySelector<HTMLButtonElement>('[data-monitor-toggle]');
  let current = vids[0];
  let paused = reduce;
  let visible = false;

  const caps = [...monitor.querySelectorAll<HTMLElement>('[data-cap]')];
  const closerImgs = [...document.querySelectorAll<HTMLElement>('[data-closer-img]')];
  const closerTitle = document.querySelector<HTMLElement>('[data-closer-title]');
  const ctas: Record<string, string> = JSON.parse(document.getElementById('scene-ctas')?.textContent || '{}');

  // Ohne JS sind alle Szenen untereinander sichtbar; mit JS nur die gewählte
  panels.forEach((p, i) => (p.hidden = i !== 0));
  root.dataset.scene = vids[0].dataset.scene;

  const load = (v: HTMLVideoElement) => {
    if (!v.src) v.src = v.dataset.reelSrc!;
  };
  const playCurrent = () => {
    if (paused || !visible) return;
    load(current);
    current.play().catch(() => {});
  };
  const setPaused = (p: boolean) => {
    paused = p;
    if (!toggle) return;
    toggle.setAttribute('aria-pressed', String(p));
    toggle.setAttribute('aria-label', p ? 'Video abspielen' : 'Video pausieren');
    toggle.querySelector('[data-icon="pause"]')?.toggleAttribute('hidden', p);
    toggle.querySelector('[data-icon="play"]')?.toggleAttribute('hidden', !p);
    p ? current.pause() : playCurrent();
  };
  setPaused(reduce);
  toggle?.addEventListener('click', () => setPaused(!paused));

  new IntersectionObserver(([e]) => {
    visible = e.isIntersecting;
    visible ? playCurrent() : current.pause();
  }).observe(monitor);

  const select = (scene: string) => {
    const next = vids.find((v) => v.dataset.scene === scene);
    const panel = panels.find((p) => p.dataset.panel === scene);
    if (!next || next === current) return;
    channels.forEach((c) => c.setAttribute('aria-pressed', String(c.dataset.channel === scene)));
    if (tally) tally.textContent = channels.find((c) => c.dataset.channel === scene)?.dataset.label ?? '';
    setSceneLinks(scene);
    document.querySelector<HTMLElement>('[data-mixer]')?.setAttribute('data-scene', scene);
    // Die ganze Seite folgt: Leistungen, Kunden, Abschluss
    root.dataset.scene = scene;
    caps.forEach((c) => (c.hidden = c.dataset.cap !== scene));
    closerImgs.forEach((c) => c.classList.toggle('is-on', c.dataset.closerImg === scene));
    if (closerTitle && ctas[scene]) closerTitle.textContent = ctas[scene];


    // Monitor: Wischblende von links, wie am Bildmischer
    const prev = current;
    current = next;
    load(next);
    next.currentTime = 0;
    if (!paused) next.play().catch(() => {});
    if (reduce) {
      prev.classList.remove('is-on');
      next.classList.add('is-on');
      prev.pause();
    } else {
      next.classList.add('is-in');
      gsap.killTweensOf(next);
      gsap.fromTo(
        next,
        { clipPath: 'inset(0% 100% 0% 0%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 0.7,
          ease: 'expo.inOut',
          onComplete: () => {
            prev.classList.remove('is-on');
            prev.pause();
            next.classList.remove('is-in');
            next.classList.add('is-on');
            gsap.set(next, { clearProps: 'clipPath' });
          },
        },
      );
    }

    // Szenen-Panel darunter blendet über
    panels.forEach((p) => (p.hidden = p !== panel));
    if (panel) {
      gsap.set(panel.querySelectorAll('[data-relight]'), { clipPath: 'inset(0%)' });
      gsap.set(panel.querySelectorAll('[data-relight] img'), { scale: 1, filter: 'none' });
      gsap.set(panel.querySelectorAll('[data-split], [data-reveal]'), { visibility: 'visible', opacity: 1, y: 0 });
      if (!reduce) gsap.fromTo(panel.querySelectorAll('.pcard, .cta-card, .head-row'), { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.7, ease: EASE, stagger: 0.05 });
      ScrollTrigger.refresh();
    }
    // Handy: Monitor liegt unter den Kanälen; nach dem Neuberechnen in den Blick holen, damit man den Wechsel sieht
    requestAnimationFrame(() => {
      const r = monitor.getBoundingClientRect();
      const group = channels[0].parentElement!.getBoundingClientRect();
      // Kanäle oben halten, Monitor darunter: so sieht man Auswahl und Wechsel zusammen
      if (r.bottom > window.innerHeight + 40) window.scrollTo({ top: window.scrollY + group.top - 12, behavior: reduce ? 'auto' : 'smooth' });
    });
  };
  channels.forEach((c) => c.addEventListener('click', () => select(c.dataset.channel!)));
}

/* ── Mobile Anfrage-Leiste: erst nach dem ersten Bildschirm, weg am Seitenende ── */
function dock() {
  const d = document.querySelector<HTMLElement>('[data-dock]');
  const first = document.querySelector('main > :first-child');
  if (!d || !first) return;
  let pastTop = false;
  const ends = new Set<Element>();
  const set = () => d.classList.toggle('is-on', pastTop && ends.size === 0);
  new IntersectionObserver(([e]) => ((pastTop = !e.isIntersecting), set())).observe(first);
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => (e.isIntersecting ? ends.add(e.target) : ends.delete(e.target)));
    set();
  });
  document.querySelectorAll('.closer, .p-cta, .foot').forEach((el) => io.observe(el));
}

/* ── Scroll-Animationen ── */
// Elemente in ausgeblendeten Bereichen (andere Szene, weggefiltert) bekommen keinen Trigger,
// sondern gleich ihren Endzustand. Sie werden beim Einblenden eigens animiert.
const isHidden = (el: Element) => !!el.closest('[hidden]');
function settle(el: Element) {
  gsap.set(el, { clipPath: 'inset(0%)', visibility: 'visible', opacity: 1, y: 0 });
  const m = el.querySelector('img, video');
  if (m && el.hasAttribute('data-relight')) gsap.set(m, { scale: 1, filter: 'none' });
}

function reveals() {
  document.querySelectorAll<HTMLElement>('[data-split]').forEach((el) => {
    if (isHidden(el)) return settle(el);
    const split = SplitText.create(el, { type: 'lines', mask: 'lines', linesClass: 'line' });
    gsap.set(el, { visibility: 'visible' });
    gsap.from(split.lines, {
      yPercent: 110,
      duration: 1.1,
      ease: EASE,
      stagger: 0.08,
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
    });
  });

  const revealEls = [...document.querySelectorAll('[data-reveal]')].filter((el) => (isHidden(el) ? (settle(el), false) : true));
  if (revealEls.length) ScrollTrigger.batch(revealEls, {
    start: 'top 92%',
    once: true,
    onEnter: (els) => gsap.to(els, { opacity: 1, y: 0, duration: 1, ease: EASE, stagger: 0.06, overwrite: true }),
  });

  // „Licht an“: Bilder öffnen sich aus dem Dunkeln
  document.querySelectorAll<HTMLElement>('[data-relight]').forEach((el) => {
    if (isHidden(el)) return settle(el);
    const media = el.querySelector('img, video');
    const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
    tl.to(el, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.3, ease: 'expo.inOut' }, 0);
    if (media) tl.to(media, { scale: 1, filter: 'brightness(1) saturate(1)', duration: 1.6, ease: EASE }, 0.1);
  });

  document.querySelectorAll<HTMLElement>('.gradbar[data-bar]').forEach((el) =>
    gsap.to(el, { scaleX: 1, duration: 1.6, ease: 'expo.inOut', scrollTrigger: { trigger: el, start: 'top 98%', once: true } }),
  );
}

/* ── Start ── */
function init() {
  // Signal an das Inline-Skript im <head>: Animationen laufen, Startzustände nicht zurücksetzen
  root.dataset.motion = 'ok';
  lazyVideos();
  mixer();
  dock();

  if (reduce) {
    root.classList.remove('js-motion');
    header(null);
    menu(null);
    return;
  }

  const lenis = finePointer ? new Lenis({ lerp: 0.1, anchors: { offset: -80 } }) : null;
  if (lenis) {
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  }
  header(lenis);
  menu(lenis);

  // Erst nach dem Laden der Schriften teilen, sonst springen die Zeilen
  document.fonts.ready.then(() => {
    reveals();
    ScrollTrigger.refresh();
  });
  window.addEventListener('load', () => ScrollTrigger.refresh());
}

init();

window.addEventListener('pageshow', (e) => {
  if (e.persisted) ScrollTrigger.refresh();
});
