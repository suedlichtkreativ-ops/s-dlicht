# Südlicht Studio – Website

Website für Südlicht Studio (Alexander Malkevich, Kaufbeuren). Gebaut mit [Astro](https://astro.build), Animationen mit GSAP und Lenis. Die Seite ist komplett statisch, nur das Kontaktformular läuft über eine kleine PHP-Datei auf dem IONOS Webspace.

## Lokal starten

```bash
npm install
npm run dev      # Entwicklungsserver auf http://localhost:4321
npm run build    # fertige Seite nach dist/
npm run preview  # gebaute Seite ansehen
```

Das Kontaktformular funktioniert lokal nicht (dafür braucht es PHP). Auf IONOS läuft es.

## Inhalte ändern

| Was | Wo |
| --- | --- |
| Projekte, Bilder, Videos, Kunden, Kontaktdaten | `src/data/work.ts` |
| Leistungen (Texte und Eckdaten) | `src/data/services.ts` |
| Fotos | `src/assets/work/` (JPG, Astro erzeugt AVIF und WebP automatisch) |
| Videos und Poster | `public/video/` und `src/assets/posters/` |
| Seiten | `src/pages/` |
| Farben, Schriften, Abstände | `src/styles/global.css` (ganz oben die Tokens) |
| Animationen | `src/scripts/motion.ts` |

Neues Projekt: Bilder nach `src/assets/work/` legen und in `src/data/work.ts` einen Eintrag in `projects` ergänzen. Projektseite, Portfolio, Filter und Sitemap entstehen automatisch.

## Veröffentlichen auf IONOS

**Variante A, von Hand:**
1. `npm run build`
2. Den **Inhalt** des Ordners `dist/` per SFTP in das Webspace-Verzeichnis der Domain hochladen (z. B. mit FileZilla). Die Zugangsdaten stehen im IONOS Kundenbereich unter Hosting → SFTP & SSH.
3. Alte Dateien der bisherigen Seite (`index.html`, `assets/`) vorher löschen oder in einen Unterordner verschieben.

**Variante B, per GitHub:** Die Secrets `IONOS_SFTP_HOST`, `IONOS_SFTP_USER`, `IONOS_SFTP_PASS` im Repository anlegen und unter Actions „Deploy zu IONOS“ starten (siehe `.github/workflows/deploy-ionos.yml`).

### Kontaktformular

`public/kontakt.php` schickt Anfragen per `mail()` an `info@suedlicht-studio.de`. Voraussetzungen im IONOS Tarif:
- PHP 8.1 oder neuer (IONOS Kundenbereich → Hosting → PHP-Version)
- Das Postfach `info@suedlicht-studio.de` existiert bei IONOS (es wird auch als Absender genutzt)

Spam-Schutz: unsichtbares Honeypot-Feld, Mindest-Ausfüllzeit und maximal 5 Anfragen pro Stunde und IP. Nach dem Hochladen einmal eine Testanfrage schicken.

`public/.htaccess` leitet auf `https://suedlicht-studio.de` ohne www um, setzt Cache- und Sicherheits-Header und zeigt die eigene 404-Seite.

## Technik in Kürze

- Bilder: `astro:assets`, AVIF/WebP in mehreren Breiten, feste Seitenverhältnisse (kein Layout-Springen)
- Videos: laden erst, wenn sie ins Bild kommen, und pausieren außerhalb
- Animationen: GSAP (ScrollTrigger, SplitText), weiches Scrollen mit Lenis nur mit Maus/Trackpad, auf Touch-Geräten natives Scrollen
- Seitenwechsel: native View Transitions (Chrome, Edge, Safari), andere Browser wechseln normal
- `prefers-reduced-motion` wird respektiert: dann keine Animationen, alles sofort sichtbar
- Kein Tracking, keine Cookies, keine externen Schriften oder Skripte
