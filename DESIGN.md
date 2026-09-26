---
name: Südlicht Studio
description: Dark, filmic one-person studio site; stage-orange action, laser-blue only for AI, the homepage is a vision mixer.
colors:
  bg: "#0A0A0B"
  bg-2: "#131315"
  bg-3: "#1B1B1E"
  ink: "#F2EEE8"
  ink-2: "#D6D1CA"
  muted: "#A39E97"
  line: "rgba(242,238,232,.12)"
  line-strong: "rgba(242,238,232,.26)"
  orange: "#FF5A1F"
  on-orange: "#140702"
  amber: "#FFB23E"
  blue: "#5B78FF"
  error: "#FF6B6B"
  success: "#59D98E"
typography:
  display:
    fontFamily: "'Big Shoulders Display', 'Arial Narrow', sans-serif"
    fontSize: "clamp(64px, 12vw, 200px)"
    fontWeight: 900
    lineHeight: 0.88
    letterSpacing: "-0.005em"
  headline:
    fontFamily: "'Big Shoulders Display', 'Arial Narrow', sans-serif"
    fontSize: "clamp(48px, 7.2vw, 112px)"
    fontWeight: 900
    lineHeight: 0.88
    letterSpacing: "-0.005em"
  hero:
    fontFamily: "'Big Shoulders Display', 'Arial Narrow', sans-serif"
    fontSize: "clamp(44px, 5vw, 88px)"
    fontWeight: 900
    lineHeight: 1
    letterSpacing: "-0.005em"
  title:
    fontFamily: "'Big Shoulders Display', 'Arial Narrow', sans-serif"
    fontSize: "clamp(34px, 3.6vw, 52px)"
    fontWeight: 900
    lineHeight: 0.92
  lead:
    fontFamily: "'Figtree', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
    fontSize: "clamp(19px, 1.7vw, 24px)"
    fontWeight: 500
    lineHeight: 1.45
  body:
    fontFamily: "'Figtree', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "'Figtree', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
    fontSize: "15px"
    fontWeight: 500
    lineHeight: 1.4
  data:
    fontFamily: "'JetBrains Mono', ui-monospace, 'SF Mono', Menlo, Consolas, monospace"
    fontSize: "12.5px"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "0.02em"
rounded:
  hairline: "2px"
  thumb: "3px"
  media: "4px"
  panel: "6px"
  pill: "999px"
spacing:
  gap: "clamp(12px, 1.6vw, 24px)"
  gutter: "clamp(16px, 3.2vw, 40px)"
  section: "clamp(80px, 11vw, 160px)"
  nav-h: "72px"
  max: "1480px"
components:
  button-primary:
    backgroundColor: "{colors.orange}"
    textColor: "{colors.on-orange}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0 24px"
    height: "52px"
  button-primary-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.bg}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0 24px"
    height: "52px"
  button-ghost-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.bg}"
  button-on-orange:
    backgroundColor: "{colors.on-orange}"
    textColor: "#FFFFFF"
    rounded: "{rounded.pill}"
    padding: "0 24px"
    height: "52px"
  chip:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0 16px"
    height: "44px"
  chip-active:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.bg}"
  channel:
    backgroundColor: "{colors.bg-2}"
    textColor: "{colors.ink}"
    rounded: "{rounded.panel}"
    padding: "8px 14px 8px 8px"
    height: "96px"
  channel-hover:
    backgroundColor: "{colors.bg-3}"
  input:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "0"
    padding: "12px 0"
    height: "54px"
  cta-card:
    backgroundColor: "{colors.orange}"
    textColor: "{colors.on-orange}"
    rounded: "{rounded.panel}"
    padding: "clamp(20px, 2vw, 28px)"
  tag:
    backgroundColor: "rgba(10,10,11,.72)"
    textColor: "#FFFFFF"
    rounded: "{rounded.pill}"
    padding: "3px 10px"
    height: "26px"
  nav-link:
    textColor: "{colors.muted}"
    typography: "{typography.label}"
    padding: "12px 0"
  nav-link-active:
    textColor: "{colors.ink}"
---

# Design System: Südlicht Studio

## Overview

**Creative North Star: "The Vision Mixer at 3 a.m."**

The site is a dark room where footage is the only light. Near-black surfaces carry a faint static film grain; a single warm radial glow of stage orange sits behind the key content like a spot hitting haze. Real stills and vertical clips do the talking; type is loud and condensed only where it names a scene or a section, and plain, readable Figtree everywhere else.

The system borrows its working grammar from a live-production vision mixer: a program monitor with a 1px frame and a tally dot, channel buttons that light up when they are on air, mono type only for data a machine would print (timecodes, counts, metadata). Orange is the tally and the action; blue appears only when the subject is AI work, and when it does, the room light itself turns laser blue. Depth comes from tonal steps and light, not from floating cards.

Density is generous at section level (80 to 160px between sections) and tight inside modules (hairline-divided grids, 1px dividers, compact rows). Motion is filmic: expo-style easing, clip-path wipes and "relight" reveals where media fades up from dark and desaturated to full exposure.

**Key Characteristics:**
- Near-black canvas (#0A0A0B range) with warm off-white ink, never pure white on page surfaces.
- One accent that means "on air / act now": stage orange; laser blue reserved for AI.
- Condensed uppercase Big Shoulders Display for names and headings; Figtree for all reading; JetBrains Mono for data only.
- Pills for anything you press; small radii (3 to 6px) for anything you look at.
- Flat surfaces, 1px lines, light-as-depth (radial glows, gradient scrims over media).
- Clip-path wipes and relight reveals, all disabled under reduced motion.

## Colors

A club at 3 a.m.: black, warm paper-white ink, one hot stage light, and a laser that only fires for AI.

### Primary
- **Stage Orange** (`orange`): the tally and every primary action. Primary buttons, the active channel border and tally dot, nav current-page underline, the `/` separators in the client list, step numbers, required-field asterisks, input focus line, the orange CTA panels (cta-card, midcta, p-cta), and the radial room glow behind the mixer and page heads (at 22 to 26% alpha).
- **Tally Black** (`on-orange`): the only text and button color placed on orange surfaces. Buttons on an orange panel invert to this near-black with white text.

### Secondary
- **Laser Blue** (`blue`): AI only. The KI tag dot, the `KI` mark in the project index, and the mixer's room light when the KI channel is on program (radial glow at 30% alpha replaces the orange one).

### Tertiary
- **Warm Amber** (`amber`): the focus ring (2px outline, 3px offset) and the bright end of the stage gradient (`linear-gradient(90deg, #5a1603 0%, orange 55%, amber 100%)`, used for the 8px gradbar).

### Neutral
- **Club Black** (`bg`): page background, full-screen menu, service cells.
- **Booth Grey** (`bg-2`): resting surface for channels, media placeholders, index row hover, service cell hover.
- **Rack Grey** (`bg-3`): hover step above bg-2 (channel hover, switch track).
- **Paper Ink** (`ink`): primary text, the fill that wipes up into hovered buttons, active chip fill.
- **Soft Ink** (`ink-2`): lead paragraphs, client names, consent text.
- **Ash** (`muted`): secondary text, nav links at rest, dt labels, captions, meta.
- **Hairline** (`line`) and **Strong Hairline** (`line-strong`): 12% and 26% ink. Dividers, section rules, grid gutters use `line`; interactive outlines (buttons, chips, pills, icon buttons, input underline, monitor frame) use `line-strong`.
- **Error / Success** (`error`, `success`): form feedback only (invalid input border, form status box).

### Named Rules
**The Tally Rule.** Orange marks what is live or what to do next. If an element is neither on air nor an action, it is not orange.

**The Laser Rule.** Blue appears only on AI work and AI-related state. It is never decoration, never a link color, never a second accent for non-AI content.

**The No Pure White Rule.** Page text is Paper Ink, not #FFF. Pure white is reserved for text laid over footage (monitor bar, captions, media tags) and for text on Tally Black buttons.

## Typography

**Display Font:** Big Shoulders Display 600/800/900 (with Arial Narrow)
**Body Font:** Figtree 400/500/600 (with Segoe UI, Roboto, Helvetica, Arial)
**Label/Mono Font:** JetBrains Mono 400 (with ui-monospace, SF Mono, Menlo, Consolas)

All fonts are self-hosted woff2 with `font-display: swap`; no external font requests.

**Character:** A condensed, poster-weight grotesk shouted in uppercase against a friendly, open sans for everything you actually read. The mono is a production instrument, not a style.

### Hierarchy
- **Display** (900, clamp(64px, 12vw, 200px), 0.88): page-head titles on subpages, the closing "Nächstes Event?" line, the next-project link (up to 170px). Uppercase.
- **Headline** (900, clamp(48px, 7.2vw, 112px), 0.88): section headings (`h2`). Uppercase, balanced wrap.
- **Hero** (900, clamp(44px, 5vw, 88px), 1): homepage H1 inside the mixer's left column, set in forced lines with the last line in orange; clamp(46px, 13vw, 76px) on mobile.
- **Title** (900, clamp(34px, 3.6vw, 52px), 0.92): card, service, CTA-panel and channel names (channel names 30px, project card titles clamp(28px, 2.4vw, 38px), index rows up to 68px). Uppercase. Client list uses weight 800.
- **Lead** (500, clamp(19px, 1.7vw, 24px), 1.45): intro paragraphs, max 30em, in Soft Ink.
- **Body** (400, 17px, 1.6): running text; large body clamp(17px, 1.3vw, 19px) in Ash, max 36em; legal prose max 46em.
- **Label** (500 to 600, 14 to 16px): nav links, buttons (600, 16px), chips, form labels (600, 15px), footer headings (600, 14px, Ash). Sentence case, never uppercase, never tracked out.
- **Data** (400, 12.5px, 0.02em): JetBrains Mono for the tally/timecode, gallery counts, filter chip counts (tabular numbers), lightbox counter, dates.

### Named Rules
**The Two Voices Rule.** Big Shoulders names things (scenes, sections, clients, projects); Figtree says things. A sentence meant to be read is never set in the display face.

**The Mono Is Data Rule.** JetBrains Mono only for machine-like values: counts, timecodes, dates, tally labels. Never for labels above headings, never for body or consent text.

## Layout

A centered wrap (max 1480px) with fluid gutters (clamp(16px, 3.2vw, 40px)) and a single fluid gap (clamp(12px, 1.6vw, 24px)) shared by every grid. Sections breathe at clamp(80px, 11vw, 160px); subpage heads clear the 72px fixed nav plus clamp(48px, 8vw, 112px).

The homepage mixer is a 12-column grid at full usable viewport height: copy in columns 1 to 5 (bottom-aligned), the 9:16 program monitor in 6 to 9, four stacked channel buttons in 10 to 12. At 1180px channels drop their thumbnails; at 860px everything stacks: copy first, monitor at 4:5, channels as a 2x2 grid.

Other recurring grids: 4-up project cards (2-up below 1100px), 4-up hairline service grid (2-up, then 1-up at 620px), 3-column masonry for the gallery (2 columns under 560px), 12-column project galleries with half, third, wide and centered-solo spans, 4/8 and 5/7 asymmetric splits for about, contact and service rows. Headings sit in a `head-row` that pushes the heading left and a link or paragraph right, wrapping on narrow screens.

Breakpoints in use: 1180, 1100, 980 (nav collapses to menu button), 860 (main stacking point, mobile dock appears), 760, 700, 620, 560px.

## Elevation & Depth

Flat by default. Depth is light and tone: surfaces step from bg to bg-2 to bg-3 on hover; a radial orange glow sits behind the mixer and subpage heads; gradient scrims darken footage under text (monitor bar and caption, closing image, portrait warm-up). A static SVG film grain at 6% opacity with overlay blend covers the whole page. Glass (color-mix of bg at 84 to 90% plus 12 to 14px blur) is used only for the scrolled nav, sticky filter bar and media tags.

### Shadow Vocabulary
- **Tally halo** (`box-shadow: 0 0 0 3px rgba(255,90,31,.25)`): the glowing ring on the monitor's tally dot.
- **Dock lift** (`box-shadow: 0 12px 30px -10px rgba(0,0,0,.7)`): only on the floating mobile inquiry button, which sits over content.
- **Focus underline** (`box-shadow: 0 2px 0 0 orange`): thickens the input underline on keyboard focus.

### Named Rules
**The Light Not Shadow Rule.** Cards and panels never cast shadows. If something needs to feel lifted, raise its tone or light it; the only drop shadow belongs to an element that genuinely floats over content (the mobile dock).

## Shapes

Two families. Everything pressable is a full pill (999px): buttons, chips, form options, tool pills, icon buttons, the menu button, media tags, the switch. Everything looked at has small, near-square corners: 6px for panels (monitor, channels, CTA panels), 4px for media frames and status boxes, 3px for thumbnails, 2px for the focus ring and lightbox media. Form inputs have no box at all: a single bottom rule, radius 0.

Borders are 1px throughout, in `line` for structure and `line-strong` for interactive outlines; active states swap the border to orange (channel) or to ink (chip hover). Service grids are drawn with 1px gaps over a line-colored background, not with borders per cell. Tiny geometric markers carry state: 8px round tally dots, 7px round KI dot, a 7x9px clip-path play triangle for video tags.

## Components

### Buttons
Pills that fill from below like a light coming up.
- **Shape:** full pill (999px), 52px tall (44px in nav and lightbox, 54px in the mobile dock), 24px horizontal padding, 1px border.
- **Primary:** Stage Orange fill, Tally Black text, Figtree 600 16px, trailing 16px line arrow.
- **Ghost (default):** transparent with Strong Hairline border, Paper Ink text.
- **Hover / Focus:** an ink panel wipes up from the bottom (translateY 101% to 0, 420ms ease-out) and text turns Club Black; the arrow nudges 3px right; press scales to 0.98. Focus is the global amber 2px ring.
- **On orange:** inside orange panels the button becomes Tally Black with white text, and its hover wipe is white.
- **Text links:** `link-arrow` is Figtree 600 with a faint underline that goes orange with the text on hover; plain inline links reveal an underline on hover.

### Chips
- **Style:** transparent pill, Strong Hairline border, 44px tall, Figtree 500 15px, optional mono count in Ash.
- **State:** hover turns the border to ink; selected (`aria-pressed`) fills with Paper Ink and Club Black text. Form radio options and the "Nur Videos" switch (orange track when on) share this grammar.

### Cards / Containers
- **Project card:** no box. A 4:5 media frame (4px radius, bg-2 placeholder) with an uppercase title and an Ash meta line under it; hover scales the image to 1.035 over 900ms and turns the title orange.
- **CTA panel:** solid Stage Orange block, 6px radius, Tally Black text, uppercase title, one inverted button. Takes a card slot in grids or spans the width at the end of project pages.
- **Service cell:** Club Black cell in a hairline grid, uppercase title, Ash text, a dt/dd fact list pinned to the bottom; hover raises to bg-2.
- **Shadow Strategy:** none (see Elevation & Depth).

### Inputs / Fields
- **Style:** borderless, transparent, a single 1px Strong Hairline bottom rule, 54px min height, Figtree 18px; label above in Figtree 600 15px; textarea 140px min.
- **Focus:** underline turns orange and thickens to 2px via box-shadow; no outline box.
- **Error:** underline #FF6B6B with message text in a lighter red below; the status box after submit is a 4px-radius outlined panel in success green or error red.

### Navigation
- **Style:** fixed 72px bar, transparent at the top, glass with bottom hairline once scrolled, hides on scroll down. Logo left, centered links (Figtree 500 15px, Ash at rest, ink on hover), a 44px primary pill right.
- **Active:** Paper Ink text with a 2px orange underline.
- **Mobile (at 980px and below):** a round 48px menu button morphs to an X; the full-screen menu reveals with a top-down clip-path (600ms) and lists pages in huge uppercase display type (up to 96px) sliding up in a stagger, current page in orange. A floating orange "Projekt anfragen" dock appears on scroll below 860px.

### Program Monitor and Channels (signature)
The homepage vision mixer. The monitor is a 9:16 frame (4:5 on mobile), black, 6px radius, 1px Strong Hairline border, playing one muted vertical clip; a dark top scrim holds the mono tally label with its orange dot and a round pause/play control, a bottom scrim holds the caption. Channel buttons are 96px rows on bg-2 with a grayscale-dimmed 72x80 still, the uppercase scene name (30px) and one line of Figtree. The on-air channel gets an orange border, a faint orange left-to-right wash, full-color still and an 8px orange tally dot. Switching wipes the new clip onto the monitor with a left-to-right clip-path over 0.7s, crossfades the room glow (orange, or blue for KI), and restages the scene panel below.

### Project Index
Full-width rows divided by hairlines: 96px 4:5 thumbnail, uppercase title up to 68px, meta in mono, a 44px round arrow button. Hover lifts the row to bg-2, zooms the thumb, slides the title 10px right and fills the arrow circle orange.

## Do's and Don'ts

### Do:
- **Do** keep page backgrounds on Club Black and step to bg-2 and bg-3 for rest and hover surfaces.
- **Do** use Stage Orange for the one primary action per view, for active/on-air state, and for small markers (tally dots, separators, step numbers).
- **Do** mark every AI piece with the blue KI tag or mark; use blue for nothing else.
- **Do** set names and headings in Big Shoulders Display 900 uppercase with line-height 0.88 to 0.95, and all readable copy in Figtree.
- **Do** make every pressable control a pill with a 44px minimum target and give it the amber 2px focus ring.
- **Do** reveal media with the relight treatment (clip-path inset plus brightness and saturation fading up) and honor prefers-reduced-motion.
- **Do** darken footage with gradient scrims before placing text on it, and use white only there.

### Don't:
- **Don't** put shadows on cards, panels or media; express depth with tone and light.
- **Don't** use Laser Blue on non-AI content, links or decoration.
- **Don't** set body copy, labels or consent text in JetBrains Mono or in uppercase display type.
- **Don't** place small uppercase tracked labels above headings; section headings stand alone or sit in a head-row with a link.
- **Don't** use pure #FFF for page text or introduce a new accent hue.
- **Don't** round media frames beyond 6px or square off buttons; the pill/near-square split is the shape language.
- **Don't** load external fonts, scripts or icon fonts; icons are inline 16px line SVGs (1.5 stroke).
