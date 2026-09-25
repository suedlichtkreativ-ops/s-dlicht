import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ── Filter ── */
const filters = document.querySelector<HTMLElement>('[data-filters]');
const tiles = [...document.querySelectorAll<HTMLButtonElement>('[data-tile]')];

function matches(t: HTMLElement, cat: string) {
  return cat === 'alle' || (cat === 'video' ? t.dataset.kind === 'vid' : t.dataset.cat === cat);
}

filters?.addEventListener('click', (e) => {
  const btn = (e.target as HTMLElement).closest<HTMLButtonElement>('[data-cat]');
  if (!btn || btn.getAttribute('aria-pressed') === 'true') return;
  const cat = btn.dataset.cat!;
  filters.querySelectorAll('[data-cat]').forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
  const apply = () => {
    tiles.forEach((t) => (t.hidden = !matches(t, cat)));
    ScrollTrigger.refresh();
    const shown = tiles.filter((t) => !t.hidden);
    // Neue Auswahl sofort sichtbar machen, auch wenn der Reveal noch nicht lief
    gsap.set(shown.map((t) => t.querySelector('[data-relight]')), { clipPath: 'inset(0%)' });
    gsap.set(shown.map((t) => t.querySelector('img, video')), { scale: 1, filter: 'none' });
    if (!reduce) gsap.fromTo(shown, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7, ease: 'expo.out', stagger: 0.03 });
  };
  if (reduce) apply();
  else gsap.to(tiles.filter((t) => !t.hidden), { opacity: 0, y: -8, duration: 0.2, ease: 'power2.in', onComplete: apply });
});

/* ── Lightbox ── */
const lb = document.getElementById('lb') as HTMLDialogElement | null;
if (lb) {
  const img = document.getElementById('lbImg') as HTMLImageElement;
  const vid = document.getElementById('lbVid') as HTMLVideoElement;
  const cap = document.getElementById('lbCap')!;
  const count = document.getElementById('lbCount')!;
  let list: HTMLElement[] = [];
  let pos = 0;
  let opener: HTMLElement | null = null;

  const show = () => {
    const t = list[pos];
    const d = t.dataset;
    if (d.kind === 'vid') {
      img.hidden = true;
      img.removeAttribute('src');
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
    cap.textContent = `${d.title} — ${d.caption}${d.ai === 'true' ? ' · KI' : ''}`;
    count.textContent = `${String(pos + 1).padStart(2, '0')} / ${String(list.length).padStart(2, '0')}`;
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
