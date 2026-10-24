/**
 * Speisekarte VIMA ESSBAR, Kaufbeuren.
 * Einzige Quelle für Web-Karte und Druck-PDF: Preise und Gerichte nur hier ändern.
 * Preise in Euro als Text, genau so, wie sie auf der Karte stehen sollen.
 * Hochgestellte Ziffern verweisen auf `zusatzstoffe`.
 */

export type Posten = {
  name: string;
  /** kleine Zusatzangabe direkt am Namen, z. B. „extra dry“ */
  zusatz?: string;
  /** Beschreibung unter dem Namen */
  text?: string;
  /** Glas, Tasse, 0,1 l … */
  menge?: string;
  preis: string;
  /** Zusatzstoff-Nummern */
  fn?: number[];
  /** auch vegan erhältlich */
  vegan?: boolean;
  /** Hinweis, der hervorgehoben werden soll */
  hinweis?: string;
};

export type Gruppe = { titel?: string; posten: Posten[]; fuss?: string };

export type Kapitel = {
  id: string;
  titel: string;
  intro?: string;
  gruppen: Gruppe[];
};

/** Weltreise: Frühstück nach Städten, Entfernung von Kaufbeuren in km Luftlinie */
export type Reise = Posten & { stadt: string; km: number };

export const info = {
  name: 'VIMA ESSBAR',
  ort: 'Kaufbeuren',
  fruehstueck: [
    { tage: 'Montag bis Freitag', zeit: '9 bis 12 Uhr' },
    { tage: 'Samstag, Sonntag und Feiertag', zeit: '9 bis 14 Uhr' },
  ],
};

export const zusatzstoffe: Record<number, string> = {
  6: 'mit Geschmacksverstärker',
  7: 'mit Konservierungsstoff',
};

export const reise: Reise[] = [
  {
    stadt: 'Kaufbeuren',
    km: 0,
    name: 'Kaufbeurer für 2 Personen',
    preis: '32,00',
    hinweis: 'Auch vegetarisch erhältlich',
    text: '2 Rühreier mit Schinken oder Speck, 2 kleine Obstsalate, gemischte Wurst- und Käsespezialitäten, Räucherlachs mit Sahnemeerrettich, Parmaschinken mit Melone, Marmelade, Nutella und Honig, 2 Fruchtcocktails oder 2 Gläser Prosecco, großer gemischter Brotkorb mit Croissant und Butter',
  },
  {
    stadt: 'München',
    km: 76,
    name: 'Münchner Frühstück',
    preis: '9,90',
    text: '1 Paar Weißwürste mit Breze, original Händlmaier Senf, 1 kleines Weißbier',
  },
  {
    stadt: 'Verona',
    km: 273,
    name: 'Verona',
    preis: '14,50',
    text: 'Parmaschinken, italienische Salami, Mozzarella, Tomaten und Oliven, gemischter Brotkorb mit Butter',
  },
  {
    stadt: 'Paris',
    km: 620,
    name: 'Paris',
    preis: '9,90',
    text: '2 Croissants mit Marmelade, Nutella und Butter, 1 gekochtes Landei',
  },
  {
    stadt: 'Amsterdam',
    km: 644,
    name: 'Amsterdam',
    preis: '13,50',
    text: '1 kleines Glas Orangensaft, Käseplatte mit verschiedenen Schnittkäsen, Camembert, Frischkäse und frischen Gemüsesticks, 1 kleiner Obstsalat, gemischter Brotkorb mit Butter',
  },
  {
    stadt: 'London',
    km: 871,
    name: 'London',
    preis: '14,50',
    fn: [6, 7],
    text: '2 Spiegel- oder Rühreier mit knusprigem Speck, 2 Grillwürstl mit Bratkartoffeln, 1 Grilltomate, Orangenkonfitüre, 1 kleines Glas Orangensaft, gemischter Brotkorb mit Butter',
  },
  {
    stadt: 'Oslo',
    km: 1338,
    name: 'Oslo',
    preis: '14,50',
    text: '1 kleines Glas Orangensaft, 2 Kräuterrühreier mit Shrimps, Räucherlachs mit Sahnemeerrettich, 1 kleiner Obstsalat, gemischter Brotkorb mit Butter',
  },
  {
    stadt: 'Istanbul',
    km: 1640,
    name: 'Istanbul',
    preis: '15,50',
    text: '1 kleines Glas Orangensaft, Rühr- oder Spiegeleier mit Sucuk, Putenschinken, Feta, Oliven, Pepperoni, gemischter Brotkorb mit Butter',
  },
  {
    stadt: 'New York',
    km: 6438,
    name: 'New York',
    preis: '12,50',
    text: '1 kleines Glas Orangensaft, 2 American Pancakes mit Ahornsirup, 2 Spiegeleier mit knusprigem Speck, 1 kleiner Obstsalat, 1 Semmel mit Butter',
  },
];

export const fruehstueck: Kapitel[] = [
  {
    id: 'klassiker',
    titel: 'Vima Essbar Klassiker',
    gruppen: [
      {
        posten: [
          { name: 'Quicky Frühstück', preis: '9,50', fn: [7], text: '1 kleines Glas Orangensaft, 1 Semmel mit Schinken und Käse, 1 gekochtes Landei' },
          { name: 'Veggis Liebling', preis: '9,50', text: '1 kleines Glas Orangensaft, 1 Vollkornsemmel mit Frischkäse, Tomaten, Gurken, Radieschen und Schnittlauch, dazu 1 gekochtes Landei' },
          { name: 'Fitness Frühstück', preis: '11,90', text: '1 Glas Orangensaft, Müsli mit Joghurt und Früchten, 1 Vollkornsemmel mit Frischkäse' },
          { name: 'City Frühstück', preis: '13,50', text: '1 kleines Glas Orangensaft, Schinken, Käse, Marmelade, 1 gekochtes Landei, gemischter Brotkorb mit Butter' },
          { name: 'Frühstücksburger spezial', preis: '7,90', text: '3 Scheiben Speck, 1 Spiegelei, Käse, Tomate und Salat' },
          { name: 'Sweet Tower', preis: '9,90', text: 'Pancake-Turm mit Nuss-Nougat-Creme und frischen Beeren der Saison' },
          { name: 'Buron Omelett', preis: '11,90', text: 'Deftiges Omelett mit Bratkartoffeln, Tomaten und knusprigem Speck, 1 Semmel mit Butter' },
        ],
      },
    ],
  },
  {
    id: 'eier',
    titel: 'Eier spezial',
    gruppen: [
      {
        posten: [
          { name: '1 gekochtes Landei', preis: '2,00' },
          { name: '2 Rühr- oder Spiegeleier', preis: '4,50' },
          { name: '2 Rühr- oder Spiegeleier mit frischen Kräutern', preis: '5,50' },
          { name: '2 Rühr- oder Spiegeleier mit Schinken', preis: '6,20' },
          { name: '2 Rühr- oder Spiegeleier mit knusprigem Speck', preis: '6,20' },
          { name: '2 Rühreier mit Tomaten', preis: '5,90' },
          { name: '2 Rühreier mit Shrimps und Kräutern', preis: '6,90' },
          { name: '2 Rühreier mit Speck und Bratkartoffeln', preis: '7,90' },
          { name: '2 Rühr- oder Spiegeleier mit Sucuk', preis: '7,90' },
        ],
      },
    ],
  },
  {
    id: 'muesli',
    titel: 'Müsli',
    gruppen: [
      {
        posten: [
          { name: 'Müsli mit Joghurt', preis: '6,00', vegan: true },
          { name: 'Müsli mit Joghurt und frischen Früchten', preis: '8,20', vegan: true },
          { name: 'Hausgemachtes Birchermüsli mit frischen Früchten', preis: '8,20', vegan: true },
          { name: 'Knusper Honig-Nuss-Müsli', preis: '8,20', text: 'mit Joghurt, Bananenchips und frischen Bananen' },
        ],
      },
    ],
  },
  {
    id: 'kleinigkeiten',
    titel: 'Für Unentschlossene',
    gruppen: [
      {
        posten: [
          { name: 'Joghurt natur', preis: '4,50' },
          { name: 'Frischer Obstsalat mit Früchten der Saison', preis: '7,90' },
          { name: 'Frischer Obstsalat mit Naturjoghurt', preis: '8,50' },
          { name: 'Butterbreze', preis: '2,50' },
          { name: '1 Marmeladensemmel', preis: '3,50' },
          { name: '1 Vollkornsemmel mit Frischkäse', preis: '3,90' },
          { name: '1 Käsesemmel', preis: '4,50' },
          { name: '1 Salami- oder Schinkensemmel', preis: '4,50', fn: [7] },
          { name: '1 Salami- oder Schinkenbreze', preis: '4,50', fn: [7] },
          { name: '1 Paar Wienerle mit Breze', preis: '5,50' },
          { name: '1 Paar Weißwürste mit Breze', preis: '6,90' },
        ],
      },
    ],
  },
  {
    id: 'extras',
    titel: 'Extras',
    gruppen: [
      {
        posten: [
          { name: '1 Portion Butter', preis: '1,00' },
          { name: '1 Semmel', preis: '1,50' },
          { name: '1 Breze', preis: '2,00' },
          { name: '1 Vollkornsemmel', preis: '2,00' },
          { name: '1 Croissant', preis: '2,20' },
          { name: '1 Portion hausgemachte Marmelade, Nutella oder Honig', preis: '2,00' },
          { name: '1 Portion Frischkäse', preis: '2,20' },
          { name: '1 Portion Schinken, Salami oder Käse', preis: '5,20', fn: [7] },
          { name: '1 Portion Parmaschinken mit Melone', preis: '8,80' },
          { name: '1 Portion Räucherlachs mit Sahnemeerrettich', preis: '8,80' },
        ],
      },
    ],
  },
];

export const getraenke: Kapitel[] = [
  {
    id: 'warm',
    titel: 'Warme Getränke',
    gruppen: [
      {
        titel: 'Kaffee',
        posten: [
          { name: 'Espresso', menge: 'Tasse', preis: '2,00' },
          { name: 'Espresso doppio', menge: 'Tasse', preis: '3,00' },
          { name: 'Espresso Macchiato', menge: 'Tasse', preis: '3,50' },
          { name: 'Espresso Corretto', menge: 'Tasse', preis: '5,00' },
          { name: 'Kaffee Creme', menge: 'Tasse', preis: '3,30' },
          { name: 'Kaffee', menge: 'Haferl', preis: '4,50' },
          { name: 'Macchiatone', menge: 'Tasse', preis: '3,30' },
          { name: 'Cappuccino', menge: 'Tasse', preis: '3,80' },
          { name: 'Cappuccino', menge: 'Haferl', preis: '4,90' },
          { name: 'Milchkaffee', menge: 'Haferl', preis: '4,90' },
          { name: 'Latte Macchiato', menge: 'Glas', preis: '4,50' },
          { name: 'Chai Latte', menge: 'Glas', preis: '4,90' },
          { name: 'Heiße Schokolade mit Milch und Sahne', menge: 'Haferl', preis: '4,90' },
          { name: 'Sirup dazu', text: 'Karamell, Mandel, Vanille oder Zimt', preis: '1,00' },
        ],
      },
      {
        titel: 'Heiß und mit Schuss',
        posten: [
          { name: 'Heiße Zitrone natur', menge: 'Glas', preis: '4,50' },
          { name: 'Heiße Zitrone mit Holunder', menge: 'Glas', preis: '4,90' },
          { name: 'Heiße Zitrone mit Ingwer und Minze', menge: 'Glas', preis: '5,50' },
          { name: 'Grog mit 4 cl Rum', menge: 'Glas', preis: '5,50' },
          { name: 'Heißer Amaretto mit Sahne', menge: 'Glas', preis: '5,50' },
          { name: 'Punsch Spezial', menge: 'Glas', preis: '5,50' },
          { name: 'Glühwein', menge: 'Glas', preis: '5,00' },
        ],
      },
    ],
  },
  {
    id: 'wein',
    titel: 'Weine',
    gruppen: [
      {
        titel: 'Weiß',
        posten: [
          { name: 'Chardonnay', zusatz: 'Venezie', menge: '0,1 l / 0,2 l', preis: '4,50 / 6,00', text: 'Rund, samtig, harmonisch. Fein und elegant, mit Duftnoten von Apfel und Akazienblüten.' },
          { name: 'Pinot Grigio', zusatz: 'Venezie', menge: '0,1 l / 0,2 l', preis: '4,50 / 6,00', text: 'Trocken und voll, mit leicht bitterem Geschmack. Typischer Duft nach Akazienblüten.' },
          { name: 'Soave', zusatz: 'Venezie', menge: '0,1 l / 0,2 l', preis: '4,50 / 6,00', text: 'Säurearm, mit samtig-sanftem Aroma. Erinnert an Kirsch- und Holunderblüten.' },
          { name: 'Lugana', menge: '0,1 l / 0,2 l', preis: '6,00 / 8,00', text: 'Trocken, würzig, voll und harmonisch, mit feinem Duft nach Pfirsich.' },
          { name: 'Riesling Kabinett', zusatz: 'Mosel', menge: '0,1 l / 0,2 l', preis: '5,50 / 7,50', text: 'Trocken, von Mosel, Saar und Ruwer. Rassig, anregend und leicht bekömmlich.' },
        ],
      },
      {
        titel: 'Rosé',
        posten: [
          { name: 'Pinot Grigio Rosé', menge: '0,1 l / 0,2 l', preis: '4,50 / 6,50', text: 'Harmonisch, trocken, leicht weinig und angenehm.' },
        ],
      },
      {
        titel: 'Rot',
        posten: [
          { name: 'Cabernet Sauvignon', zusatz: 'Venezie', menge: '0,1 l / 0,2 l', preis: '4,50 / 7,00', text: 'Charakteristisch, harmonisch, trocken, mit typisch grasigem Bouquet.' },
          { name: 'Merlot', zusatz: 'Venezie', menge: '0,1 l / 0,2 l', preis: '5,00 / 7,50', text: 'Trocken, körperreich und süffig, mit leichtem Duft nach Rosen.' },
          { name: 'Primitivo', menge: '0,1 l / 0,2 l', preis: '6,00 / 8,00', text: 'Kraftvoll und würzig, mit Noten von Zimt, Nelken, schwarzem Pfeffer und dunklen Waldfrüchten.' },
        ],
      },
      {
        titel: 'Schorle',
        posten: [{ name: 'Weinschorle', zusatz: 'weiß oder rot', menge: '0,2 l / 0,4 l', preis: '6,00 / 8,00' }],
      },
    ],
  },
  {
    id: 'sekt',
    titel: 'Sekt und Champagner',
    gruppen: [
      {
        posten: [
          { name: 'Prosecco Valdo', zusatz: 'extra dry', menge: '0,1 l', preis: '5,00' },
          { name: 'Prosecco Valdo', menge: '0,75 l', preis: '30,00' },
          { name: 'Prosecco Schorle', menge: '0,2 l', preis: '7,00' },
          { name: 'Prosecco long', zusatz: 'mit Eiswürfeln', preis: '8,00' },
          { name: 'Prosecco Aperol', menge: '0,1 l', preis: '7,00' },
          { name: 'Prosecco long', zusatz: 'mit Aperol', preis: '9,00' },
          { name: 'Prosecco Holunder', menge: '0,1 l', preis: '7,00' },
          { name: 'Prosecco mit Red Bull', menge: 'long', preis: '9,00' },
          { name: 'Sekt Nymphenburg', menge: '0,1 l', preis: '4,00' },
          { name: 'Sekt Nymphenburg', menge: '0,75 l', preis: '25,00' },
          { name: 'Veuve Clicquot', zusatz: 'brut', menge: '0,75 l', preis: '95,00' },
        ],
      },
    ],
  },
];

export const hinweise = [
  'Kaffee, Kaffeespezialitäten und Tee sind in den Frühstücken nicht enthalten. Wählen Sie einfach aus unseren warmen Getränken.',
  'Die Frühstücksarrangements können wir leider nicht abändern.',
  'Informationen zu Allergenen erhalten Sie bei unserem Service.',
  'Alle Preise in Euro inklusive Mehrwertsteuer.',
];
