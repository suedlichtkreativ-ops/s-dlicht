---
version: 1
slug: "src-pages-index-astro"
primary_target: "src/pages/index.astro"
related_targets: ["src/pages/arbeiten/index.astro","src/pages/kontakt/index.astro"]
---

# Startseite: Szenenwahl

## Scope and mode
Startseite (src/pages/index.astro), mit Folgen für Arbeiten, Projektseiten, Kontakt. Mode: Experience + Persuade. Etabliertes Welt-System (dunkel, filmisch, Orange/Blau, Big Shoulders + Figtree) bleibt; der Aufbau wird ersetzt.

## Brief
- Publikum: Veranstalter & Clubs, Kampfsport, Gastro & Marken, Firmen für KI-Spots (gleich wichtig).
- Job: in Sekunden sehen, dass der eigene Fall schon gut gelöst wurde, dann anfragen.
- Aktion: Projekt anfragen, mit vorausgewählter Szene.
- Beweis: echte Clips und Fotos aus src/data/work.ts; keine Kundenstimmen, Zahlen, Jahre.
- Richtung vom Nutzer gewählt (Kritik 2026-09-25): „Szene wählen lassen“. Build-Pfad diese Runde: code-led (Nutzer will nur das Endergebnis sehen, keine Zwischenfreigabe); gespeicherter Default bleibt comp.

## Direction contract
THESIS: Die Startseite ist ein Bildmischer. Vier Kanäle (Club, Ring, Gastro & Marken, KI-Spots) laufen als Hochformat-Clips; der Besucher schaltet seine Szene auf den Programm-Monitor, und alles darunter folgt. Verweigert: Riesen-Wortmarke plus Textliste plus Zähler, das Agentur-Standardgerüst.
OWN-WORLD: Fast-Schwarz #0A0A0B, Bühnenorange #FF5A1F für Tally und Aktion, Laserblau #5B78FF nur für KI. Big Shoulders Display für Szenen und Überschriften, Figtree für alles Lesbare, Mono nur für Daten (Kanal-Timecode, Meta). Monitor mit 1px Rahmen, Tally-Punkt, keine Karten-Schatten.
STORY: Ich sehe sofort echte Clips aus meiner Szene, verstehe, was Alex macht, sehe passende Projekte mit Bild, und komme mit einem Klick zu einer Anfrage, in der meine Szene schon gewählt ist.
FIRST VIEWPORT: Desktop 12 Spalten: links (1–4) H1 mit dem Angebot, Lead, Button „Projekt anfragen“; Mitte (5–8) Programm-Monitor 9:16, volle nutzbare Höhe, aktiver Clip; rechts (10–12) vier Kanaltasten übereinander, je Standbild, Szenenname, eine Zeile Inhalt, Tally beim aktiven. Mobil: H1 + Button zuerst im ersten Bildschirm, darunter Monitor (4:5) und 2x2 Kanaltasten.
FORM: Vision mixer / Bildmischer, vom Nutzer gepinnt (kein Würfeln; Seed: user-pinned). Signatur: Umschalten per Wischblende (clip-path) auf dem Monitor, Szene-Panel darunter blendet über.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Unresolved
- Ob Kundenstimmen später kommen: nein (Nutzer).
