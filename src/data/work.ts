import type { ImageMetadata } from 'astro';

const images = import.meta.glob<{ default: ImageMetadata }>('../assets/work/*.jpg', { eager: true });
const posters = import.meta.glob<{ default: ImageMetadata }>('../assets/posters/*.jpg', { eager: true });

const img = (file: string) => {
  const m = images[`../assets/work/${file}.jpg`];
  if (!m) throw new Error(`Bild fehlt: ${file}`);
  return m.default;
};
const poster = (file: string) => {
  const m = posters[`../assets/posters/${file}.jpg`];
  if (!m) throw new Error(`Poster fehlt: ${file}`);
  return m.default;
};

export type Category = 'events' | 'kampfsport' | 'gastro' | 'marken' | 'automotive' | 'ki';

/** Die vier Szenen = die vier Zielgruppen. Einheitliche Begriffe für Startseite, Filter und Formular. */
export type Scene = 'club' | 'ring' | 'marken' | 'ki';

export const scenes: {
  id: Scene;
  label: string;
  short: string;
  line: string;
  headline: string;
  cta: string;
  reel: string;
}[] = [
  { id: 'club', label: 'Events & Clubs', short: 'Club', line: 'Open Airs, Clubnächte, Aftermovies', headline: 'Open Airs und Clubnächte', cta: 'Nächstes Event geplant?', reel: 'tanz' },
  { id: 'ring', label: 'Kampfsport', short: 'Ring', line: 'Fight Nights, Galas, Seminare', headline: 'Fight Nights und Kampfsport', cta: 'Fight Night geplant?', reel: 'alina' },
  { id: 'marken', label: 'Gastro & Marken', short: 'Marken', line: 'Gastro, Shops, Produktclips', headline: 'Gastro, Shops und Marken', cta: 'Shooting für deinen Laden?', reel: 'nfc' },
  { id: 'ki', label: 'KI-Spots', short: 'KI', line: 'Werbespots ohne Filmteam', headline: 'KI-Spots und KI-Bildwelten', cta: 'Spot ohne Filmteam?', reel: 'schall' },
];
export const sceneById = (id: Scene) => scenes.find((s) => s.id === id)!;

/** Filter auf der Arbeiten-Seite: Alle + vier Szenen (Videos als eigener Schalter) */
export const categories: { id: Scene | 'alle'; label: string }[] = [
  { id: 'alle', label: 'Alle' },
  ...scenes.map((s) => ({ id: s.id, label: s.label })),
];

export type Item =
  | { type: 'img'; image: ImageMetadata; caption: string; ai: boolean }
  | { type: 'vid'; src: string; poster: ImageMetadata; w: number; h: number; caption: string; ai: boolean };

export interface Project {
  slug: string;
  title: string;
  cat: Category;
  scene: Scene;
  kind: string;
  place?: string;
  intro: string;
  services: string[];
  cover: ImageMetadata;
  items: Item[];
}

const I = (file: string, caption: string, ai = false): Item => ({ type: 'img', image: img(file), caption, ai });
const V = (name: string, caption: string, w: number, h: number, ai = false): Item => ({
  type: 'vid',
  src: `/video/${name}.mp4`,
  poster: poster(name),
  w,
  h,
  caption,
  ai,
});

export const projects: Project[] = [
  {
    slug: 'tanzlauter-am-turm',
    title: 'Tanzlauter am Turm',
    cat: 'events',
    scene: 'club',
    kind: 'Open Air',
    intro:
      'Ein Open Air unter Lichterketten, vom ersten Set am Nachmittag bis zur Stage im Nebel. Das Aftermovie startet aus dem Neon Logo und ist auf den Beat geschnitten.',
    services: ['Aftermovie', 'Eventfotografie', 'Reels'],
    cover: img('00_tanzlauter_am_turm'),
    items: [
      I('00_tanzlauter_am_turm', 'Stage bei Nacht'),
      V('tanz', 'Aftermovie, Intro aus dem Neon Logo', 720, 1280),
      I('16_tanzlauter_am_turm', 'Publikum im Abendlicht'),
      I('22_tanzlauter_am_turm', 'Nightlife Portrait'),
      I('30_tanzlauter_am_turm', 'Crowd Moment'),
      I('38_tanzlauter_am_turm', 'Unter den Lichterketten'),
    ],
  },
  {
    slug: 'loca-noche',
    title: 'Loca Noche',
    cat: 'events',
    scene: 'club',
    kind: 'Clubnacht',
    intro:
      'Clubnächte und Sommerpartys auf der Terrasse. Fotos mitten aus der Crowd und ein Aftermovie im Hochformat, gebaut für Instagram und TikTok.',
    services: ['Aftermovie', 'Eventfotografie'],
    cover: img('32_loca_noche'),
    items: [
      V('loca', 'Aftermovie im Hochformat', 720, 1280),
      I('08_loca_noche', 'DJ Set im Club'),
      I('12_loca_noche', 'Sommerparty auf der Terrasse'),
      I('20_loca_noche', 'Tanzfläche'),
      I('25_loca_noche', 'Club Portrait'),
      I('28_loca_noche', 'Drinks und Seifenblasen'),
      I('32_loca_noche', 'Mitten in der Crowd'),
      I('37_loca_noche', 'Stimmung an der Stage'),
    ],
  },
  {
    slug: 'muay-thai-gala',
    title: 'Muay Thai Gala',
    cat: 'kampfsport',
    scene: 'ring',
    kind: 'Fight Night',
    intro:
      'Vom Ritual vor dem Kampf bis zum Champion danach. Am Ring zählt der eine Moment, und der passiert genau einmal.',
    services: ['Eventfotografie'],
    cover: img('31_muay_thai_gala'),
    items: [
      I('31_muay_thai_gala', 'Schlagabtausch im Ring'),
      I('02_muay_thai_gala', 'German Champion nach dem Kampf'),
      I('23_muay_thai_gala', 'Vor dem Wai Kru'),
      I('40_muay_thai_gala', 'Ritual vor dem Kampf'),
    ],
  },
  {
    slug: 'vima-essbar',
    title: 'VIMA ESSBAR',
    cat: 'gastro',
    scene: 'marken',
    kind: 'Gastro',
    place: 'Kaufbeuren',
    intro:
      'Espresso, Barlicht und die Menschen dahinter. Ein Shooting für Social Media und Website der VIMA ESSBAR in Kaufbeuren.',
    services: ['Fotografie', 'Social Media Content'],
    cover: img('19_vima_essbar'),
    items: [
      I('06_vima_essbar', 'Espresso'),
      I('18_vima_essbar', 'Portrait an der Bar'),
      I('19_vima_essbar', 'Siebträger im Gegenlicht'),
      I('29_vima_essbar', 'Maschine im Barlicht'),
      I('34_vima_essbar', 'Portrait mit Charakter'),
    ],
  },
  {
    slug: 'koederdepot',
    title: 'KöderDepot',
    cat: 'marken',
    scene: 'marken',
    kind: 'Marke',
    intro:
      'Markenshooting am Wasser und ein KI Werbespot mit zwei eigenen Figuren. Echte Fotos und KI Film aus einer Hand.',
    services: ['Markenshooting', 'KI Werbespot'],
    cover: img('04_k_derdepot'),
    items: [
      I('04_k_derdepot', 'Shooting am See'),
      V('koeder', 'KI Werbespot mit zwei eigenen Figuren', 1280, 720, true),
      I('14_k_derdepot', 'Markenshooting am Wasser'),
      I('24_k_derdepot', 'Warten auf den Biss'),
    ],
  },
  {
    slug: 'automobile-schall',
    title: 'Automobile Schall',
    cat: 'automotive',
    scene: 'ki',
    kind: 'Automotive',
    intro:
      'Showroom Motive, mit KI neu belichtet, und ein Car Edit mit KI Effekten. Alles mit KI Anteil ist gekennzeichnet.',
    services: ['Car Edit', 'KI Relight'],
    cover: img('10_automobile_schall'),
    items: [
      V('schall', 'Car Edit mit KI Effekten', 720, 1280, true),
      I('10_automobile_schall', 'Showroom Motiv, KI Relight', true),
      I('27_automobile_schall', 'Showroom Motiv, KI Relight', true),
      I('36_automobile_schall', 'Showroom Motiv, KI Relight', true),
    ],
  },
  {
    slug: 'boxen-im-festzelt',
    title: 'Boxen im Festzelt',
    cat: 'kampfsport',
    scene: 'ring',
    kind: 'Fight Night',
    place: 'Kaufbeuren',
    intro: 'Boxabend im Festzelt in Kaufbeuren. Handschuhe zusammen, Kampf frei.',
    services: ['Eventfotografie'],
    cover: img('35_boxen_im_festzelt'),
    items: [
      I('17_boxen_im_festzelt', 'Kaufbeuren'),
      I('35_boxen_im_festzelt', 'Handschuhe zusammen, Kampf frei'),
    ],
  },
  {
    slug: 'seminar-alina-dalaslan',
    title: 'Seminar mit Alina Dalaslan',
    cat: 'kampfsport',
    scene: 'ring',
    kind: 'Event Edit',
    intro: 'Event Edit vom Seminar mit Alina Dalaslan im Gladiator Camp, geschnitten fürs Hochformat.',
    services: ['Event Edit', 'Reels'],
    cover: poster('alina'),
    items: [V('alina', 'Event Edit im Gladiator Camp', 720, 1280)],
  },
  {
    slug: 'sp-prints',
    title: 'SP Prints',
    cat: 'marken',
    scene: 'marken',
    kind: 'Produktclips',
    intro: 'Produktclips für NFC Tags: Tap to Win und ein Spot mit Sprecher.',
    services: ['Produktvideo', 'Motion Design'],
    cover: poster('tap'),
    items: [
      V('tap', 'Tap to Win, Produktclip', 1280, 720),
      V('nfc', 'NFC Tag, Spot mit Sprecher', 720, 1280),
    ],
  },
  {
    slug: 'vermoegen-clever-steuern',
    title: 'Vermögen Clever Steuern',
    cat: 'ki',
    scene: 'ki',
    kind: 'KI Werbespot',
    intro: 'Ein Kapitän im Sturm: KI Werbespot, für den es sonst ein Filmteam und ein Schiff bräuchte.',
    services: ['KI Werbespot'],
    cover: poster('vcs'),
    items: [V('vcs', 'KI Werbespot, Kapitän im Sturm', 1280, 720, true)],
  },
  {
    slug: 'relight',
    title: 'Relight',
    cat: 'ki',
    scene: 'ki',
    kind: 'KI Bildwelten',
    intro: 'Eigene Aufnahmen, mit KI neu belichtet. Das Ausgangsfoto ist echt, das Licht ist neu.',
    services: ['KI Bildbearbeitung'],
    cover: img('21_relight'),
    items: [
      I('21_relight', 'Eigene Aufnahme, mit KI neu belichtet', true),
      I('33_relight', 'Eigene Aufnahme, mit KI neu belichtet', true),
      I('39_relight', 'Eigene Aufnahme, mit KI neu belichtet', true),
      I('41_relight', 'Eigene Aufnahme, mit KI neu belichtet', true),
    ],
  },
  {
    slug: 'ghetto-burger',
    title: 'Ghetto Burger',
    cat: 'ki',
    scene: 'ki',
    kind: 'KI Visual',
    intro: 'Food Trailer als KI Visual für Social Media.',
    services: ['KI Visual'],
    cover: img('26_ghetto_burger'),
    items: [I('26_ghetto_burger', 'Food Trailer, KI Visual', true)],
  },
];

export const sceneLabel = (p: Project) => sceneById(p.scene).label;
export const projectHasAi = (p: Project) => p.items.some((i) => i.ai);

export const clients = [
  'Tanzlauter am Turm',
  'Loca Noche',
  'Underdogs MMA',
  'KöderDepot',
  'Automobile Schall',
  'VIMA ESSBAR',
  'SP Prints',
  'Vermögen Clever Steuern',
];

/** Kundenname → Projektseite, falls es eine gibt */
export const clientSlug: Record<string, string | undefined> = {
  'Tanzlauter am Turm': 'tanzlauter-am-turm',
  'Loca Noche': 'loca-noche',
  KöderDepot: 'koederdepot',
  'Automobile Schall': 'automobile-schall',
  'VIMA ESSBAR': 'vima-essbar',
  'SP Prints': 'sp-prints',
  'Vermögen Clever Steuern': 'vermoegen-clever-steuern',
};

export const projectsByScene = (sc: Scene) => projects.filter((p) => p.scene === sc);

/** Hochformat-Clip je Szene für den Monitor auf der Startseite */
export const sceneReel = (s: Scene) => {
  const n = sceneById(s).reel;
  return { src: `/video/${n}.mp4`, poster: poster(n) };
};

export const site = {
  name: 'Südlicht Studio',
  owner: 'Alexander Malkevich',
  email: 'info@suedlicht-studio.de',
  phone: '0152 04226175',
  phoneHref: '+4915204226175',
  street: 'Franzensbader Straße 4',
  zip: '87600',
  city: 'Kaufbeuren',
  url: 'https://suedlicht-studio.de',
};
