---
target: ganze Seite (Startseite), Runde 2
total_score: 26
max_score: 36
na_heuristics: 10
p0_count: 0
p1_count: 2
target_identity: "file:/home/user/s-dlicht/src/pages/index.astro"
target_fingerprint: "sha256:64c7bb7eb7410302b47797ede48271eeb4cd2142140ea2cc3d38a664ca68e3df"
target_path: /home/user/s-dlicht/src/pages/index.astro
timestamp: 2026-09-26T00-21-15Z
slug: src-pages-index-astro
---
Method: dual-agent (A: design review · B: detector + browser)

## Design Health Score
| # | Heuristic | Score | Key Issue |
|---|---|---|---|
| 1 | Visibility of System Status | 3 | Mobile: monitor wipe happens off-screen |
| 2 | Match System / Real World | 3 | "Marken" unclear for gastro |
| 3 | User Control and Freedom | 3 | Monitor clip cannot be opened |
| 4 | Consistency and Standards | 2 | Three names per scene; KI tally dot orange; contact H1 ignores scene |
| 5 | Error Prevention | 3 | Default preselect "Events & Clubs" without channel choice |
| 6 | Recognition Rather Than Recall | 3 | Mobile channels lose stills |
| 7 | Flexibility and Efficiency | 3 | Deep links, keyboard lightbox, swipe, quick contact |
| 8 | Aesthetic and Minimalist Design | 3 | Dead space above H1; tablet empty half; CTA card outweighs work |
| 9 | Error Recovery | 3 | Raw server error interpolated |
| 10 | Help and Documentation | n/a | Portfolio surface |
| Total | | 26/36 | Good (72%) |

## Design Specificity Verdict
Specific in first viewport (vision mixer, 9:16 monitor, tally, KI blue light, real footage); generic below the scene panel (clients, services, about, closer do not follow the scene; monitor has no caption/link).
Detector: source 0 findings (was 1). Browser 1–5 per page, mostly false positives (.btn::before hover fill, heading-rhythm margin-only, grain overlay). Plausible: dock "thin border wide shadow".

## Priority Issues
- [P1] Mobile: channels below monitor, switch feedback off-screen. Fix: channels as strip above/inside monitor with stills. (/impeccable adapt)
- [P1] Scene lost on contact page; default preselect biased to Events & Clubs. Fix: scene-aware H1/lead, no default, scene-aware closer. (/impeccable clarify)
- [P2] Mixer ends at fold; monitor dead end. Fix: monitor caption with project link; highlight matching service. (/impeccable layout)
- [P2] Tablet 860–1180 empty half; CTA card too big / span-2 outweighs work. (/impeccable layout)
- [P3] KI tally dot orange; footer bar no gutter; lightbox counter wraps on mobile; raw error string. (/impeccable polish)

## Persona Red Flags
Jordan: channels not recognized on mobile; insider names; "Tippe" on desktop. Riley: Kampfsport+Nur Videos = 1; head count unfiltered; raw error. Casey: off-screen switch; active chip off-screen on deep link; lightbox arrows out of thumb reach. Gym owner: only 1 combat video, Ring reel is a seminar; next project leaves scene.

## Minor Observations
~300px empty above H1 at 1440x900; logo small; Marken channel still weak; "Hochzeit" not in PRODUCT.md audiences; contact aside duplicates footer (use for 5-step process); contrast fine.

## Questions to Consider
1. Should the whole page stay "on air" for the chosen scene? 2. More video, esp. fight nights? 3. Do gastro and KI clients need a door that doesn't say "Nächstes Event?"
