# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Die Website soll diese Kundengruppen gewinnen, alle gleich wichtig:

- **Veranstalter und Clubs:** Open Airs, Clubnächte und Festivals, die Aftermovies, Teaser und Reels für Instagram und TikTok brauchen.
- **Kampfsport:** Fight Nights, Galas, Gyms und Seminare, die Fotos und Event-Edits wollen.
- **Gastro und lokale Marken:** Restaurants, Bars und Shops im Allgäu, die Fotos und Social-Media-Content brauchen.
- **Firmen für KI-Werbespots:** Unternehmen, die Werbespots oder Kampagnenmotive mit KI wollen, ohne ein Filmteam zu buchen.
- **Hochzeiten** (vom Nutzer am 2026-09-26 als fünfte Zielgruppe bestätigt): Paare, die Hochzeitsfotos oder -videos wollen. Noch kein Hochzeitsmaterial im Projekt; bis dahin nur als Anfrageart im Kontaktformular, keine eigene Szene. Nichts erfinden.

Sie kommen meist aus der Region zwischen Allgäu und Ulm. Typische Situation: Ein Event oder eine Kampagne steht an, und sie suchen jemanden, der Content liefert, der im Feed funktioniert.

## Product Purpose

Südlicht Studio ist das Ein-Personen-Studio von Alexander Malkevich in Kaufbeuren. Er filmt und fotografiert Events vor Ort, schneidet Aftermovies und Reels, animiert Logos und Announcements und baut KI-Werbespots.

Die Website hat zwei gleich wichtige Aufgaben: Das Portfolio soll überzeugen, und danach soll die Anfrage über das Kontaktformular folgen. Erfolg heißt: passende Projektanfragen aus den vier Zielgruppen.

## Positioning

- **Selbst aus der Szene:** Alex kennt Club und Ring von innen und erwischt den einen Moment, der genau einmal passiert.
- **Alles aus einer Hand:** Dreh, Schnitt, Motion Design und KI von einer Person, ohne Agentur dazwischen.
- **Gebaut für Social:** Hochformat, auf den Beat geschnitten, damit man im Feed hängen bleibt.

## Operating Context

- Vor Ort: Kamera (Sony A7 III), Gimbal, Drohne.
- Schnitt und Grafik remote aus Kaufbeuren: Premiere Pro, After Effects, Photoshop, Illustrator, Lightroom, DaVinci Resolve.
- KI-Werkzeuge: Higgsfield, Kling.
- Ablauf: Anfrage, Telefonat, Dreh, Schnitt, Lieferung.
- Einzugsgebiet: Allgäu bis Ulm.

## Capabilities and Constraints

- Statische Website mit Astro, gehostet auf IONOS Webspace unter suedlicht-studio.de.
- Anfragen laufen über ein Kontaktformular, das per PHP an info@suedlicht-studio.de sendet.
- Kein Tracking, keine Cookies, keine externen Schriften oder Skripte (Datenschutz ist Teil des Versprechens).
- Kleinunternehmer nach § 19 UStG.
- Sprache: nur Deutsch.
- Seiten: Start, Arbeiten (Portfolio mit Filter), Projektseiten je Kunde, Leistungen, Über mich, Kontakt, Impressum, Datenschutz, Hinweis zu KI.

## Brand Commitments

- Name: Südlicht Studio. Inhaber: Alexander Malkevich (Alex).
- Logo: Kamera mit zwei Filmrollen und Schriftzug „SÜD LICHT“ (`src/assets/logo.png`).
- Tonfall: Du-Form, direkt, locker, kurze Sätze, ohne Werbesprech.
- KI-Arbeiten werden immer gekennzeichnet (KI-Label im Portfolio, eigene Seite „Hinweis zu KI“).
- Vom Nutzer als verbindlich gewählt: dunkle, filmische Grundstimmung.

## Evidence on Hand

- 42 Portfolio-Arbeiten aus 12 Projekten: Fotos in `src/assets/work/`, Videos in `public/video/`, Poster in `src/assets/posters/`. Projektdaten in `src/data/work.ts`.
- Kundennamen: Tanzlauter am Turm, Loca Noche, Underdogs MMA, KöderDepot, Automobile Schall, VIMA ESSBAR, SP Prints, Vermögen Clever Steuern.
- Portrait von Alex: `src/assets/portrait.jpg`.
- **Nicht vorhanden und nicht erfinden:** Kundenstimmen, Jahreszahlen zu Projekten, Preise, Kennzahlen oder Lieferzeiten. Der Nutzer will Kundenstimmen und Jahreszahlen ausdrücklich nicht auf der Seite.

## Product Principles

1. Die Arbeit spricht zuerst. Echte Fotos und Clips tragen die Seite, nicht Behauptungen.
2. Jede Zielgruppe muss schnell sehen, dass ihr Fall schon einmal gut gelöst wurde.
3. Vom Portfolio ist der Weg zur Anfrage immer kurz.
4. Ehrlich über KI: gekennzeichnet, nie als echte Aufnahme ausgegeben.
5. Nichts behaupten, was nicht belegt ist.
