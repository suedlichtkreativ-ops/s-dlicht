import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const sceneLabels: Record<string, string> = { club: 'Events & Clubs', ring: 'Kampfsport', marken: 'Gastro & Marken', ki: 'KI-Spots' };

const tiles = [...document.querySelectorAll<HTMLButtonElement>('[data-tile]')];

/* ── Filter: Szene + „Nur Videos“, Zustand steht in der URL ── */
const filters = document.querySelector<HTMLElement>('[data-filters]');
if (filters) {
  const chips = [...filters.querySelectorAll<HTMLButtonElement>('[data-cat]')];
  const videoSwitch = filters.querySelector<HTMLButtonElement>('[data-only-video]')!;
  const countEl = document.querySelector<HTMLElement>('[data-gallery-count]');
  const mid = document.querySelector<HTMLElement>('[data-midcta]');
  const params = new URLSearchParams(location.search);
  let scene = sceneLabels[params.get('szene') ?? ''] ? params.get('szene')! : 'alle';
  let onlyVideo = params.get('videos') === '1';

  const matches = (t: HTMLElement) => (scene === 'alle' || t.dataset.scene === scene) && (!onlyVideo || t.dataset.kind === 'vid');

  const apply = (animate: boolean) => {
    chips.forEach((c) => c.setAttribute('aria-pressed', String(c.dataset.cat === scene)));
    videoSwitch.setAttribute('aria-pressed', String(onlyVideo));
    const run = () => {
      tiles.forEach((t) => (t.hidden = !matches(t)));
      const shown = tiles.filter((t) => !t.hidden);
      if (mid) mid.hidden = shown.length < 8;
      if (countEl) countEl.textContent = `${shown.length} ${shown.length === 1 ? 'Arbeit' : 'Arbeiten'}${scene !== 'alle' ? ` in ${sceneLabels[scene]}` : ''}${onlyVideo ? ', nur Videos' : ''}`;
      // Anfrage-Links nehmen die gefilterte Szene mit
      document.querySelectorAll<HTMLAnchorElement>('[data-scene-link]').forEach((a) => {
        a.dataset.base ??= a.href.split('?')[0];
        a.href = scene === 'alle' ? a.dataset.base : `${a.dataset.base}?szene=${scene}`;
      });
      gsap.set(shown.map((t) => t.querySelector('[data-relight]')), { clipPath: 'inset(0%)' });
      gsap.set(shown.map((t) => t.querySelector('img, video')), { scale: 1, filter: 'none' });
      ScrollTrigger.refresh();
      if (animate && !reduce) gsap.fromTo(shown.slice(0, 12), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'expo.out', stagger: 0.03 });
    };
    if (animate && !reduce) gsap.to(tiles.filter((t) => !t.hidden), { opacity: 0, duration: 0.18, ease: 'power2.in', onComplete: () => (gsap.set(tiles, { opacity: 1 }), run()) });
    else run();
    const q = new URLSearchParams();
    if (scene !== 'alle') q.set('szene', scene);
    if (onlyVideo) q.set('videos', '1');
    history.replaceState(null, '', q.toString() ? `?${q}` : location.pathname);
  };

  chips.forEach((c) =>
    c.addEventListener('click', () => {
      if (c.dataset.cat === scene) return;
      scene = c.dataset.cat!;
      apply(true);
    }),
  );
  videoSwitch.addEventListener('click', () => {
    onlyVideo = !onlyVideo;
    apply(true);
  });
  apply(false);
  // Bei einem Direktlink den aktiven Filter in den sichtbaren Bereich holen (Handy)
  if (scene !== 'alle') {
    const c = chips.find((x) => x.dataset.cat === scene);
    if (c) c.parentElement!.scrollLeft = c.offsetLeft - c.parentElement!.clientWidth / 2 + c.clientWidth / 2;
  }
}

/* ── Lightbox ── */
const lb = document.getElementById('lb') as HTMLDialogElement | null;
if (lb) {
  const img = document.getElementById('lbImg') as HTMLImageElement;
  const vid = document.getElementById('lbVid') as HTMLVideoElement;
  const cap = document.getElementById('lbCap')!;
  const count = document.getElementById('lbCount')!;
  const projectLink = document.getElementById('lbProject') as HTMLAnchorElement;
  const ask = document.getElementById('lbAsk') as HTMLAnchorElement;
  let list: HTMLElement[] = [];
  let pos = 0;
  let opener: HTMLElement | null = null;
  const askBase = ask.href.split('?')[0];

  const show = () => {
    const d = list[pos].dataset;
    if (d.kind === 'vid') {
      img.hidden = true;
      vid.hidden = false;
      vid.poster = d.poster!;
      vid.src = d.full!;
      vid.play().catch(() => {});
    } else {
      vid.pause();
      vid.hidden = true;
      vid.removeAttribute('src');
      img.hidden = false;
      img.src = d.full!;
      img.alt = d.alt || '';
    }
    cap.innerHTML = '';
    const b = document.createElement('b');
    b.textContent = d.title!;
    cap.append(b, document.createTextNode(`, ${d.caption}${d.ai === 'true' ? ' (KI)' : ''}`));
    count.textContent = `${pos + 1} / ${list.length}`;
    projectLink.href = d.url!;
    projectLink.hidden = new URL(d.url!, location.href).pathname === location.pathname;
    ask.href = `${askBase}?szene=${d.scene}`;
  };
  const open = (t: HTMLElement) => {
    list = tiles.filter((x) => !x.hidden);
    pos = Math.max(0, list.indexOf(t));
    opener = t;
    show();
    lb.showModal();
    document.documentElement.style.overflow = 'hidden';
  };
  const step = (n: number) => {
    pos = (pos + n + list.length) % list.length;
    show();
  };
  tiles.forEach((t) => t.addEventListener('click', () => open(t)));
  document.getElementById('lbClose')!.addEventListener('click', () => lb.close());
  document.getElementById('lbPrev')!.addEventListener('click', () => step(-1));
  document.getElementById('lbNext')!.addEventListener('click', () => step(1));
  lb.addEventListener('close', () => {
    vid.pause();
    document.documentElement.style.overflow = '';
    opener?.focus({ preventScroll: true });
  });
  lb.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') step(-1);
    if (e.key === 'ArrowRight') step(1);
  });
  document.getElementById('lbStage')!.addEventListener('click', (e) => {
    if ((e.target as HTMLElement).id === 'lbStage') lb.close();
  });
  let sx: number | null = null;
  lb.addEventListener('touchstart', (e) => (sx = e.touches[0].clientX), { passive: true });
  lb.addEventListener('touchend', (e) => {
    if (sx === null) return;
    const dx = e.changedTouches[0].clientX - sx;
    if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
    sx = null;
  });
}
