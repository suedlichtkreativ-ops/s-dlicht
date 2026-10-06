/**
 * Content Refresh: alle Links an einer Stelle.
 * Pakete werden per Anfrage gebucht, die Zahlung läuft per Rechnung.
 */
export const INSTAGRAM_DM_LINK = 'https://ig.me/m/suedlicht_';
export const INSTAGRAM_PROFIL = 'https://www.instagram.com/suedlicht_/';
export const INSTAGRAM_NAME = '@suedlicht_';
export const MAIL = 'info@suedlicht-studio.de';

/** Paket anfragen: vorerst per Instagram DM. Für ein Paket einen anderen Link eintragen, falls gewünscht. */
export const plans = [
  { name: 'Einstieg', scope: '3 Reels', price: '150 €', href: INSTAGRAM_DM_LINK },
  { name: 'Standard', scope: '5 Reels', price: '250 €', href: INSTAGRAM_DM_LINK },
  { name: 'Monatspaket', scope: '10 Reels und 5 Story Clips, ohne Bindung', price: '450 €', href: INSTAGRAM_DM_LINK, tip: true },
  { name: 'Monatspaket im Abo', scope: 'Gleiche Leistung jeden Monat neu. Mindestlaufzeit 3 Monate, danach monatlich kündbar.', price: '400 €', per: 'pro Monat', href: INSTAGRAM_DM_LINK },
];
