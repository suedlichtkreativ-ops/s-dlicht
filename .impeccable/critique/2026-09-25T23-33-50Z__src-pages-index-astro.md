---
target: ganze Seite (Startseite)
total_score: 22
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 3
target_identity: "file:/home/user/s-dlicht/src/pages/index.astro"
target_fingerprint: "sha256:8a803e68af4c2e55d3b15720b91857d0e499b27a77cf5b37f5ab572007430173"
target_path: /home/user/s-dlicht/src/pages/index.astro
timestamp: 2026-09-25T23-33-50Z
slug: src-pages-index-astro
---
Method: dual-agent (A: design review · B: detector + browser)

## Design Health Score
| # | Heuristic | Score | Key Issue |
|---|---|---|---|
| 1 | Visibility of System Status | 3 | Good states; filter not in URL |
| 2 | Match System / Real World | 3 | Natural du-German, scene vocabulary |
| 3 | User Control and Freedom | 3 | Lightbox Esc/arrows/swipe; filter lost on back, no lightbox->project path |
| 4 | Consistency and Standards | 2 | Taxonomy differs filter(8)/services(4)/form(5); duplicate "Nächstes Event?" |
| 5 | Error Prevention | 3 | Blur validation, hints, honeypot |
| 6 | Recognition Rather Than Recall | 2 | Desktop project index is names only; images only on hover |
| 7 | Flexibility and Efficiency | n/a | Portfolio, no repeat workflows |
| 8 | Aesthetic and Minimalist Design | 3 | Strong; decorative counters/clock/footer wordmark, ~1300px type before first photo |
| 9 | Error Recovery | 3 | Clear messages, focus to error, mail fallback |
| 10 | Help and Documentation | n/a | Nothing to document |
| Total | | 22/32 | Acceptable (69%) |

## Design Specificity Verdict
~60% specific (palette rationale, fight-poster type, 9:16 REC reel, grain, KI labels, voice) / ~40% award-agency template (giant wordmark, nav clock, numbered counters, text project index with cursor peek, outlined footer wordmark, gradient bar). Missed: 9:16 never used after hero; beat-cut rhythm absent; no fight-night image on homepage.
Detector: src scan 1 finding (Lightbox broken-image, false positive). Browser: 6–47 per page, mostly false positives (btn hover fill read as bg, link underline gradient, outline wordmark, opacity-0 reveal start, brand glow/REC dot, mono caps house style). Real: consent label uppercase 11.5px mono (.field label overrides .check), .tag 10.5px, transition: padding on .index a.

## Priority Issues
- [P1] Work doesn't speak first on desktop home; fight-night audience absent. Fix: add Muay Thai to showcase, link showcase figures, show thumbs/9:16 clips in .index rows on desktop, move client wall below work. (/impeccable layout)
- [P1] No short path from work to inquiry. Fix: CTA after .p-gallery per project linking /kontakt/?art=… with preselected radio; project link in lightbox. (/impeccable onboard, layout)
- [P1] Mobile conversion points below fold (home hero buttons, contact form after aside). Fix: smaller mobile reel; form before aside, compact tap-to-call/mail row. (/impeccable adapt)
- [P2] Contrast/legibility: .clients li ~2.4:1; consent text in caps mono. Fix: raise client color >=60%; reset .check styles. (/impeccable polish)
- [P2] Three taxonomies, 8 filter chips, 5 form options. Fix: unify on four audiences + "Nur Videos". (/impeccable clarify)

## Persona Red Flags
Jordan: offer only clear from small lead; project names opaque. Riley: filter state lost, no keyboard peek, nav clock 01:30 reads "asleep". Casey: no CTA in first viewport, 9400px gallery without sticky filter/mid CTA, form below address. Club promoter: no full aftermovie with sound, Tanzlauter only a name, no "So etwas anfragen" on videos.

## Minor Observations
Telefon field misaligned ~58px (.field needs align-self:start); orphan tile on Muay Thai page; reel has no pause/next; counters add noise; thin facts on Über; no-op ternary in index.astro.

## Questions to Consider
1. Why is the home mostly horizontal type when the product is vertical beat-cut video? 2. Should the first screen let visitors pick their scene? 3. Can client names be proven with images instead of grey text?
