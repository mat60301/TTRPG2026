# TTRPG Design Project — Claude Context Guide

## Project Overview

This is a tabletop roleplaying game (TTRPG) design project. The system is **roleplay-led, board game supported** — narrative first, mechanics second. Characters are not superheroes at level 1; they are origin stories working toward an ultimate fantasy.

## Key Files

- `2026 TTRPG - Clean.pdf` — Original master document (source of truth for intent)
- `2026-TTRPG-Messy.md` — Raw text copy of the PDF (for reference)
- `docs/` — Split, cleaned, and corrected rulebook (working documents)

## GitHub Repository

- **Repo:** https://github.com/mat60301/TTRPG2026.git
- **Public URL (GitHub Pages):** https://mat60301.github.io/TTRPG2026/ — redirects to the web character sheet
- **Push command:** `/TTRPGCommit` — auto-diffs, generates commit message, commits and pushes to `origin main` with no manual steps
- **GitHub Pages setup:** Settings → Pages → main / root (must be enabled once manually in the repo settings)

## How to Use This File

This file is updated at the end of each Claude chat session via `/handoff`. A new Claude session will read this file automatically and pick up where the last one left off — no manual re-explaining needed.

---

## Session History

---

## [Session 8] — May 1, 2026

### Completed This Session
- ✅ **Committed Session 7 work** — ran `/TTRPGCommit`; pushed commit `876c56e` (training modifier system, split attack bonuses, layout restructure)
- ✅ **Renamed weapon slots** — "Weapon 1" → "Main Hand", "Weapon 2" → "Off Hand" in the equipment section (`weapon-slot-label`)
- ✅ **Expanded trait bonus display labels** — Physical column now shows four rows with full labels: "Main Hand Attack Bonus", "Main Hand Damage Bonus", "Off Hand Attack Bonus", "Off Hand Damage Bonus"; Mental column shows "Mental Attack Bonus" and "Mental Damage Bonus" (was "Attack Bonus" / "Damage Bonus")
- ✅ **All bonus displays always show a number** — replaced `—` fallback with `+0`; every bonus value shows a formatted modifier at all times
- ✅ **Weapon's own base accuracy included in attack bonus** — Main Hand Attack Bonus = weapon-1 mainAcc + Physical Attack class mods + Weapon Training; Off Hand Attack Bonus = weapon-2 offAcc + Physical Attack class mods + Weapon Training; heavy/brutal weapons show `—` for off-hand (can't be wielded one-handed without training)
- ✅ **Formula popups updated** — "Weapon base accuracy" appears as its own row in the breakdown; off-hand popup explains when a weapon can't be used off-hand
- ✅ **Weapon category changes trigger bonus display refresh** — `updateBonusDisplays()` now called on weapon-1 and weapon-2 category change events
- ✅ **Rules clarification: off-hand damage** — confirmed via `docs/07-equipment.md`: the rules make **no distinction between main-hand and off-hand damage**. Only accuracy differs (mainAcc vs offAcc). Damage die and damage bonuses are identical for both hands.

### Files Modified This Session
- `character sheet/web version/index.html` — weapon slot labels ("Main Hand" / "Off Hand"); physical trait bonus rows (4 rows with full labels); mental trait bonus labels ("Mental Attack/Damage Bonus"); initial `+0` values
- `character sheet/web version/script.js` — `parseAcc()` helper; `updateBonusDisplays()` rewritten to include weapon base accuracy; `FORMULA_MAP` updated (removed `display-phys-attack`/`display-phys-dmg`, added `display-mh-attack`, `display-mh-dmg`, `display-oh-attack`, `display-oh-dmg`); formula cases `mh-attack`, `mh-dmg`, `oh-attack`, `oh-dmg` (replaced `phys-attack`, `phys-dmg`); `ment-attack`/`mag-dmg` always show total; weapon category listeners also call `updateBonusDisplays()`

### Currently In Progress
- 🔄 Session 8 changes are uncommitted — run `/TTRPGCommit` to push
- 🔄 **Open design question (unanswered):** Off Hand Damage Bonus and Main Hand Damage Bonus will always be the same number when both hands hold the same weapon category, since damage bonuses follow weapon category not hand position. Two options proposed: (a) rename to "Weapon 1 Damage Bonus" / "Weapon 2 Damage Bonus" to reflect they track the slot's weapon category; (b) collapse to a single shared "Damage Bonus" row since the formula is identical. User did not choose — address next session.

### Next Steps (Priority Order)
1. **Run `/TTRPGCommit`** to push Session 8 changes
2. **Resolve damage bonus display question** — rename to Weapon 1/2, collapse to single row, or keep as-is
3. **Playtest** — sheet is functionally complete; watch for: hit rate feel, light weapon viability, non-magical vs magical satisfaction, Resolve fragility, training modifier balance
4. **GM Section** — encounter creation, monster building, reward/advancement guidelines (blocked until core mechanics validated)
5. **Review balance-notes.md** after first playtest and adjust
6. **Print stylesheet** for the web character sheet

### Blockers / Open Questions
- Off-hand damage bonus display may be misleading (see "Currently In Progress" above)
- Light weapons vs high-mitigation targets may be nearly useless (confirmed flagged, testing before fixing)
- Non-magical bonus (4 extra specs = 6 total) is an estimate — needs table validation
- Bypass Immunity cost (4 Resonance) deferred to playtesting
- Resonance refund on "succeed by 5+" deferred to playtesting
- GitHub Pages not yet enabled — needs one-time manual setup: repo Settings → Pages → main / root

### Design Decisions Made This Session
- Weapon base accuracy (mainAcc/offAcc) is included in the trait panel attack bonus totals — gives players a single number to add to their d20 roll per hand
- Off-hand damage: confirmed by rules that no penalty applies; only accuracy changes hand-to-hand

---

## [Session 7] — May 1, 2026

### Completed This Session
- ✅ **Hidden class bonus panel** — the "Class Bonuses" number inputs are now `display:none`; they remain in the DOM for JS calculations but are invisible to the player (auto-fill makes manual editing pointless and confusing)
- ✅ **Resolve/Resonance moved left** — derived stats now split 50/50: left column = Resolve + Resonance trackers, right column = Physical Defense, Mental Defense, Physical Mitigation, Mental Mitigation, Speed
- ✅ **Tracker alignment polish** — Resolve/Resonance labels right-aligned with fixed `min-width: 88px` so they stack flush; max value (`stat-resolve-max`, `stat-resonance-max`) left-aligned inside the tracker group; highlight background narrowed (8px padding); content centered within the background
- ✅ **Split Attack Bonus → Physical Attack Bonus + Mental Attack Bonus** — updated in `docs/03-character-creation.md` (table row split) and throughout the web sheet (3 dropdowns, hidden bonus inputs, `CLASS_MOD_BONUSES`, `AUTO_BONUS_FIELDS`, `STATIC_FIELDS`)
- ✅ **Attack/Damage bonus displays in trait columns** — each trait column (Physical, Mental) now shows "Attack Bonus" and "Damage Bonus" rows at the bottom, separated by a divider; display values (`display-phys-attack`, `display-phys-dmg`, `display-ment-attack`, `display-mag-dmg`) update live from class modifier selections; show "—" when zero
- ✅ **Formula popups on trait bonus displays** — hovering/clicking the four new bonus values shows a modal listing which class modifier slot(s) are contributing (e.g. "Class Modifier 1 +1") with a total row, or "none selected" message
- ✅ **Training modifier system (full implementation)** — Weapon/Armor/Charm/Shield Training class modifiers now:
  - Replace the free-text detail box with a category dropdown when selected (e.g. Weapon Training → Simple/Light/Standard/Heavy/Brutal/Unarmed; Armor Training → Light/Standard/Heavy/Bulwark; Shield Training → Small/Medium/Large)
  - Revert to the text box when a non-training modifier is selected
  - Apply bonuses **conditionally** — only if the matching item category is equipped:
    - **Weapon Training**: +1 main-hand accuracy, +1 off-hand accuracy, +1 damage (for that weapon only)
    - **Armor Training**: +1 Physical Defense, +1 Physical Mitigation
    - **Charm Training**: +1 Mental Defense, +1 Mental Mitigation
    - **Shield Training**: +1 Physical Defense
  - Update live when equipment changes or modifier category changes
  - Show training source rows in all relevant formula modals ("Armor Training (Mod 1) +1", etc.)
  - Shield Training removed from unconditional auto-fill — now equipment-conditional only
  - Category selections saved/restored correctly via `STATIC_FIELDS` + `applyImport` re-hydration

### Files Modified This Session
- `character sheet/web version/index.html` — hidden category selects (3 slots); Resolve/Resonance HTML split from defense stats; Attack/Damage bonus display rows in trait columns
- `character sheet/web version/styles.css` — `.derived-stats--trackers/--combat` (50/50 flex); `.derived-row--highlight` (narrowed, centered, label alignment); `.tracker-group .derived-value` (left-align); `.trait-bonuses` / `.trait-bonus-row` / `.trait-bonus-value`; `.class-mod-category`
- `character sheet/web version/script.js` — `TRAINING_CATEGORIES`; `getTrainingBonuses()`; `updateClassModSlot()`; `initTrainingSlots()`; `updateBonusDisplays()`; training injected into `updateDerivedStats()` and `updateWeaponStats()`; all formula modal cases updated (phys-def, phys-mit, ment-def, ment-mit, weapon-N-dmg/acc/off); `applyImport()` re-hydrates training slots; init listeners updated
- `docs/03-character-creation.md` — Attack Bonus row split into Physical/Mental Attack Bonus

### Web Character Sheet — Current Layout
```
Toolbar: [Character Sheet title] | [Rest] [Sleep] | [Save Character] [Import Character]

Row 1 — Two-column (left ~38% | right ~62%):
  LEFT: Character Concept (Origin, Reason, Ultimate Fantasy)
        Class Modifiers (3 picks — training types show category dropdown; others show text detail)
        Specializations (dynamic rows)
  RIGHT: Traits & Derived Stats
           [PHYSICAL (label) | MENTAL (label)] (side-by-side, Value/Die headers)
           Attack Bonus + Damage Bonus displays at bottom of each trait column (live, formula popup)
           Trait Points tracker
           [Resolve/Resonance trackers (left 50%) | Defense/Mit/Speed stats (right 50%)]
             Resolve and Resonance: highlighted, label right-aligned, tracker left-aligned
             All derived stat values clickable — formula modal on hover/click
             Formula modals now include Training bonus rows where applicable

Row 2 — Two-column (left ~58% | right ~42%):
  LEFT: Equipment (Weapons | Armor+Shield+Charm, Other Gear)
        Weapon/armor/shield/charm stat displays clickable — formula modal on hover/click
        Weapon accuracy reflects training bonus live
  RIGHT: Magic (toggle, Domain, Foundational Effects)

Row 3: Conditions & Notes

Mobile (≤768px): all columns stack; each card has ▾/▸ collapse toggle in header
Mobile (≤480px): identity row is 2-row grid (Name+Player / Species+Level+Class)
```

### Currently In Progress
- 🔄 All session changes are uncommitted — run `/TTRPGCommit` to push

### Next Steps (Priority Order)
1. **Run `/TTRPGCommit`** to push all session changes
2. **Playtest** — sheet is now functionally complete with full training system; watch for: hit rate feel, light weapon viability, non-magical vs magical satisfaction, Resolve fragility, training modifier balance
3. **GM Section** — encounter creation, monster building, reward/advancement guidelines (blocked until core mechanics validated)
4. **Review balance-notes.md** after first playtest and adjust
5. **Print stylesheet** for the web character sheet

### Blockers / Open Questions
- Light weapons vs high-mitigation targets may be nearly useless (confirmed flagged, testing before fixing)
- Non-magical bonus (4 extra specs = 6 total) is an estimate — needs table validation
- Bypass Immunity cost (4 Resonance) deferred to playtesting
- Resonance refund on "succeed by 5+" deferred to playtesting
- GitHub Pages not yet enabled — needs one-time manual setup: repo Settings → Pages → main / root

### Design Decisions Made This Session
- Training bonuses are equipment-conditional (only apply if matching item equipped) — not passive rank bonuses
- Shield Training removed from unconditional CLASS_MOD_BONUSES; now fully conditional like other training types
- Physical Attack Bonus and Mental Attack Bonus are separate class modifier options (were previously one "Attack Bonus")

---

## [Session 6] — May 1, 2026

### Completed This Session
- ✅ **GitHub repo created and connected** — `https://github.com/mat60301/TTRPG2026.git`; all 20 project files pushed to `main`; `.gitignore` excludes `.claude/`
- ✅ **`/TTRPGCommit` command** — global command at `C:\Users\mat60\.claude\commands\TTRPGCommit.md`; auto-diffs, generates commit message, commits and pushes to `origin main` with no input required
- ✅ **Root redirect** — `index.html` at repo root forwards to `character sheet/web version/index.html` so GitHub Pages URL is clean: `https://mat60301.github.io/TTRPG2026/`
- ✅ **Mobile responsive CSS** — added `<meta name="viewport">` to index.html; two breakpoints:
  - `≤768px` (tablet): all multi-column layouts stack; toolbar wraps to 2 rows; class mod rows wrap
  - `≤480px` (phone): identity row uses 6-column grid — Name+Player on row 1, Species+Level+Class on row 2
- ✅ **Physical / Mental labels** — added centered blue uppercase labels above each trait column inside the bordered box (all screen sizes)
- ✅ **Mobile card collapse/expand** — `▾`/`▸` toggle button injected into every card header at init; button hidden on desktop; collapses/expands all card body content on mobile
- ✅ **Derived stats reordered** — Resolve → Resonance (when magical) → Physical Defense → Mental Defense → Physical Mitigation → Mental Mitigation → Speed
- ✅ **Resolve/Resonance highlight** — both rows get bold blue label, soft blue-tinted background (`#edf1f8`), 14px horizontal padding so they stand out as high-priority trackers
- ✅ **Class modifier auto-fill** — selecting a modifier dropdown now auto-calculates and writes the corresponding bonus field; all 3 slots are summed (e.g. Resolve×2 = +4); recalculates derived stats immediately
  - Auto-fills: Movement Speed (+5 speed), Phys/Ment Mitigation (+1 each), Phys/Mag Damage (+1), Attack Bonus (+1), Resolve (+2), Resonance (+1), Shield Training (+1 Phys Def)
  - Does NOT auto-fill: Additional Specialization, Weapon/Armor/Charm Training (category-specific)

### Files Modified This Session
- `character sheet/web version/index.html` — viewport meta; Physical/Mental trait labels; derived stats reorder; Resolve/Resonance highlight classes
- `character sheet/web version/styles.css` — `.traits-col-title`; `.card-toggle` base + mobile styles; `.card.collapsed` collapse rule; `.derived-row--highlight` style; responsive breakpoints (≤768px, ≤480px); 6-column identity grid at ≤480px
- `character sheet/web version/script.js` — `CLASS_MOD_BONUSES`, `AUTO_BONUS_FIELDS`, `updateClassModifierBonuses()`; `initCardToggles()`; wired modifier dropdowns; called both on init and import
- `index.html` (root) — NEW: redirect to web character sheet
- `.gitignore` — NEW: excludes OS files, editor files, `.claude/`
- `C:\Users\mat60\.claude\commands\TTRPGCommit.md` — NEW: global auto-commit command

### Web Character Sheet — Current Layout
```
Toolbar: [Character Sheet title] | [Rest] [Sleep] | [Save Character] [Import Character]

Row 1 — Two-column (left ~38% | right ~62%):
  LEFT: Character Concept (Origin, Reason, Ultimate Fantasy)
        Class Modifiers (3 picks — selecting auto-fills bonus fields)
        Specializations (dynamic rows)
  RIGHT: Traits & Derived Stats
           [PHYSICAL (label) | MENTAL (label)] (side-by-side, Value/Die headers)
           Trait Points tracker
           [Derived Stats | Class Bonuses] (side-by-side below traits)
             Derived order: Resolve* → Resonance* → Phys Def → Ment Def → Phys Mit → Ment Mit → Speed
             *Resolve and Resonance highlighted (bold, blue-tinted background)
             All derived stat values clickable — formula modal on hover/click

Row 2 — Two-column (left ~58% | right ~42%):
  LEFT: Equipment (Weapons | Armor+Shield+Charm, Other Gear)
        Weapon/armor/shield/charm stat displays clickable — formula modal on hover/click
  RIGHT: Magic (toggle, Domain, Foundational Effects)

Row 3: Conditions & Notes

Mobile (≤768px): all columns stack; each card has ▾/▸ collapse toggle in header
Mobile (≤480px): identity row is 2-row grid (Name+Player / Species+Level+Class)
```

### Currently In Progress
- 🔄 Changes from this session are uncommitted — run `/TTRPGCommit` to push
- 🔄 GitHub Pages not yet enabled — needs one-time manual setup: repo Settings → Pages → main / root

### Next Steps (Priority Order)
1. **Run `/TTRPGCommit`** to push all session changes
2. **Enable GitHub Pages** in repo settings (one-time manual step)
3. **Weapon/Armor/Charm Training auto-fill** — currently no auto-fill because bonuses are category-specific (e.g., Weapon Training for "melee standard" adds +1 attack/damage only for that category); needs a design decision about how to surface this on the sheet
4. **Playtest** — sheet is functionally complete; watch for: hit rate feel, light weapon viability, non-magical vs magical satisfaction, Resolve fragility, class modifier balance
5. **GM Section** — encounter creation, monster building, reward/advancement guidelines (blocked until core mechanics validated)
6. **Review balance-notes.md** after first playtest and adjust
7. **Print stylesheet** for the web character sheet

### Blockers / Open Questions
- Light weapons vs high-mitigation targets may be nearly useless (confirmed flagged, testing before fixing)
- Non-magical bonus (4 extra specs = 6 total) is an estimate — needs table validation
- Weapon/Armor/Charm Training category-specific bonuses have no dedicated field on the sheet — players currently note them in the detail text field; needs design decision
- Bypass Immunity cost (4 Resonance) deferred to playtesting
- Resonance refund on "succeed by 5+" deferred to playtesting

---

## [Session 5] — May 1, 2026

### Completed This Session
- ✅ Fixed weapon "None" dropdown — removed dashes (`— None —` → `None`) in both weapon category selects; armor/shield/charm were already dash-free
- ✅ Added **formula modals** — every auto-calculated value now has a dotted underline and `cursor: help`; hover (150ms delay) or click shows a popup with the formula and a live component breakdown; hover mode closes on mouse-leave (with 250ms grace to move onto the card); click mode locks open until backdrop click, × button, or Escape
  - Covered: Physical/Mental Defense, Physical/Mental Mitigation, Resolve max, Speed, Resonance max
  - Covered: all weapon Dmg Die / Main Acc / Off Acc displays
  - Covered: Armor Def Mod, Armor Mitigation, Shield Def Bonus, Charm Def Mod, Charm Mitigation
- ✅ Added **Rest** and **Sleep** buttons — centered in toolbar between title and file buttons; Rest is green (`#2e6b4a`), Sleep is indigo (`#4a3d7c`)
- ✅ Rest/Sleep confirmation popup — shows before clicking confirms: rule description + before→after table for each affected stat
  - **Rest:** `resolve_current += ceil(missing / 2)`, `resonance_current = resonance_max`
  - **Sleep:** `resolve_current = resolve_max`, `resonance_current = resonance_max`, first non-empty condition slot cleared
  - Resonance row only shown if character is magical; "Already full" shown in muted italic when nothing to recover; "none active" shown when no conditions exist (Sleep only)
  - Cancel closes popup; Confirm applies and closes; backdrop click or Escape also cancels

### Files Modified This Session
- `character sheet/web version/index.html` — three-section toolbar (title | Rest+Sleep | Save+Import); RS confirmation modal; formula modal
- `character sheet/web version/styles.css` — toolbar `flex: 1` layout; `.btn-rest` / `.btn-sleep` colors; RS modal styles (backdrop, card, header, changes table, footer); formula modal styles (floating card, breakdown table, `formula-trigger` dotted underline)
- `character sheet/web version/script.js` — `buildRestChanges`, `buildSleepChanges`, `getFirstConditionIndex`, `showRestSleepModal`, `performRest`, `performSleep`; `FORMULA_MAP`, `buildFormulaContent`, `showFormulaModal`, `hideFormulaModal`, `_fmState` hover/click tracking

### Web Character Sheet — Current Layout
```
Toolbar: [Character Sheet title] | [Rest] [Sleep] | [Save Character] [Import Character]

Row 1 — Two-column (left ~38% | right ~62%):
  LEFT: Character Concept (Origin, Reason, Ultimate Fantasy)
        Class Modifiers (3 picks)
        Specializations (dynamic rows)
  RIGHT: Traits & Derived Stats
           [Physical traits outlined | Mental traits outlined] (side-by-side, Value/Die headers)
           Trait Points tracker
           [Derived Stats | Class Bonuses] (side-by-side below traits)
           All derived stat values clickable — formula modal on hover/click

Row 2 — Two-column (left ~58% | right ~42%):
  LEFT: Equipment (Weapons | Armor+Shield+Charm, Other Gear)
        Weapon/armor/shield/charm stat displays clickable — formula modal on hover/click
  RIGHT: Magic (toggle, Domain, Foundational Effects)

Row 3: Conditions & Notes
```

### Currently In Progress
- 🔄 Nothing actively in progress — sheet is ready for playtesting

### Next Steps (Priority Order)
1. **Playtest** — sheet is fully functional; watch for: hit rate feel, light weapon viability, non-magical vs magical satisfaction, Resolve fragility, healing effectiveness
2. **GM Section** — encounter creation, monster building, reward/advancement guidelines (blocked until core mechanics are validated)
3. **Review balance-notes.md** after first playtest and adjust
4. **Mobile version** of the web character sheet (currently desktop-only, 1200px)
5. **Print stylesheet** for the web character sheet

### Blockers / Open Questions
- Light weapons vs high-mitigation targets may be nearly useless (confirmed flagged, testing before fixing)
- Non-magical bonus (4 extra specs = 6 total) is an estimate — needs table validation
- Additional Specialization class modifier uncapped by design — test at table
- Bypass Immunity cost (4 Resonance) deferred to playtesting
- Resonance refund on "succeed by 5+" deferred to playtesting

---

## [Session 4] — April 30, 2026

### Completed This Session
- ✅ Darkened page background (`#eef0f4` → `#1e2128` dark charcoal)
- ✅ Renamed toolbar buttons: "Export JSON" → "Save Character", "Import JSON" → "Import Character"
- ✅ Fixed Class field misalignment in identity bar (stray global `.field { margin-bottom: 8px }` scoped to `.equip-item .field`)
- ✅ Restructured page into two-column layout: **left column** (Character Concept + Class Modifiers + Specializations) | **right column** (Traits & Derived Stats)
- ✅ Reordered concept fields: Origin Story → Reason for Adventuring → Ultimate Fantasy
- ✅ Darkened label color (`#718096` → `#4a5568`)
- ✅ Traits section redesigned: Physical and Mental trait groups side-by-side; derived stats + class bonuses below; each column has "Value / Die" header labels; Attack/Defense sub-labels removed, replaced with a simple divider line between groups; each column has a visible outline border
- ✅ Moved Specializations under Class Modifiers in the left column
- ✅ Added **localStorage auto-save** — sheet saves automatically on every edit; file export only happens on "Save Character" button click; saved state restores on page load
- ✅ Moved Charm below Armor and Shield in equipment (now all in one "Armor, Shield & Charm" column; equipment section is 2 columns)
- ✅ Created **Equipment | Magic two-column layout** — Equipment left (wider), Magic right
- ✅ Combined "Combat Speed" + "Out-of-Combat Speed" into single **Speed** row displaying `xx / yy ft`

### Files Modified This Session
- `character sheet/web version/index.html` — major layout restructure
- `character sheet/web version/styles.css` — new layout classes, trait styling, dark background
- `character sheet/web version/script.js` — localStorage auto-save, combined speed display

### Web Character Sheet — Current Layout
```
Toolbar: [Character Sheet title] | [Rest] [Sleep] | [Save Character] [Import Character]

Row 1 — Two-column (left ~38% | right ~62%):
  LEFT: Character Concept (Origin, Reason, Ultimate Fantasy)
        Class Modifiers (3 picks)
        Specializations (dynamic rows)
  RIGHT: Traits & Derived Stats
           [Physical traits outlined | Mental traits outlined] (side-by-side, Value/Die headers)
           Trait Points tracker
           [Derived Stats | Class Bonuses] (side-by-side below traits)

Row 2 — Two-column (left ~58% | right ~42%):
  LEFT: Equipment (Weapons | Armor+Shield+Charm, Other Gear)
  RIGHT: Magic (toggle, Domain, Foundational Effects)

Row 3: Conditions & Notes
```

### Currently In Progress
- 🔄 Nothing actively in progress — playtest is next

### Next Steps (Priority Order)
1. **Playtest** — sheet is fully functional and auto-saves; open directly in browser; watch for: hit rate feel, light weapon viability, non-magical vs magical satisfaction, Resolve fragility, healing effectiveness
2. **GM Section** — encounter creation, monster building, reward/advancement guidelines (blocked until core mechanics are validated)
3. **Review balance-notes.md** after first playtest and adjust
4. **Mobile version** of the web character sheet (currently desktop-only, 1200px)
5. **Print stylesheet** for the web character sheet

### Blockers / Open Questions
- Light weapons vs high-mitigation targets may be nearly useless (confirmed flagged, testing before fixing)
- Non-magical bonus (4 extra specs = 6 total) is an estimate — needs table validation
- Additional Specialization class modifier uncapped by design — test at table
- Bypass Immunity cost (4 Resonance) deferred to playtesting
- Resonance refund on "succeed by 5+" deferred to playtesting

---

## [Session 3] — April 30, 2026

### Completed This Session
- ✅ Confirmed system is ready for playtesting — no outstanding blockers
- ✅ Created `docs/11-quick-reference.md` — 2-page printable reference sheet (core roll, difficulty, combat, resolve/death/stabilization, magic, all 10 resonance upgrades; conditions and derived stat formulas intentionally omitted)
- ✅ Renamed `docs/10-non-combat.md` → `docs/10-adventuring.md`; heading changed to "Adventuring"
- ✅ Created `character sheet/charactersheetinfo.md` — field spec document for the character sheet, organized by page
- ✅ Created `character sheet/web version/` — full interactive HTML/CSS/JS character sheet (desktop only, 1200px centered, clean/modern)

### Files Created / Modified This Session
- `docs/10-adventuring.md` — renamed from `10-non-combat.md`; title changed to "Adventuring"
- `docs/11-quick-reference.md` — NEW: 2-page printable quick reference
- `character sheet/charactersheetinfo.md` — NEW: character sheet field spec (edit as design evolves)
- `character sheet/web version/index.html` — NEW: interactive character sheet markup
- `character sheet/web version/styles.css` — NEW: clean/modern styles
- `character sheet/web version/script.js` — NEW: auto-calc, JSON export/import, localStorage auto-save, magic toggle, dynamic rows

### Web Character Sheet — Key Details
- **Auto-calc:** Derived stats (Physical/Mental Defense, Mitigation, Resolve, Resonance, Speed) update live from trait inputs + equipment dropdowns + Class Bonus number fields
- **Equipment:** Armor/Shield/Charm dropdowns auto-display stat modifiers and feed into derived stat formulas
- **Magic toggle:** "Magical Character" checkbox shows/hides the full magic section and Resonance tracker
- **Specializations & Foundational Effects:** Dynamic add/remove rows
- **Save/Load:** Export JSON downloads a timestamped file; Import JSON restores all fields including dynamic rows
- **Class Bonuses:** Small number inputs in the derived stats panel — user sets these manually from their class modifier picks (covers Shield Training, extra Resolve, etc.)
- **Open to do:** Mobile version (deferred); print stylesheet (deferred)

### Currently In Progress
- 🔄 Nothing actively in progress — playtest is next

### Next Steps (Priority Order)
1. **Playtest** — all critical issues resolved; web sheet is ready to use at the table; watch for: hit rate feel, light weapon viability, non-magical vs magical satisfaction, Resolve fragility, healing effectiveness
2. **GM Section** — encounter creation, monster building, reward/advancement guidelines (blocked until core mechanics are validated)
3. **Review balance-notes.md** after first playtest and adjust
4. **Mobile version** of the web character sheet (currently desktop-only)
5. **Print stylesheet** for the web character sheet

### Blockers / Open Questions
- Light weapons vs high-mitigation targets may be nearly useless (confirmed flagged, testing before fixing)
- Non-magical bonus (4 extra specs = 6 total) is an estimate — needs table validation
- Additional Specialization class modifier uncapped by design — test at table
- Bypass Immunity cost (4 Resonance) deferred to playtesting
- Resonance refund on "succeed by 5+" deferred to playtesting

---

## [Session 2] — April 30, 2026

### Completed This Session
- ✅ Simplified Character Concept section to bullet points (matching doc style)
- ✅ Completed full pre-playtest audit — 25 issues identified across critical/high/medium/low
- ✅ Resolved all 25 audit issues (see Decisions Log for key calls)

### Files Modified This Session
- `docs/01-core-mechanics.md` — Repeated attempt penalty is per-problem (not per-character); advantage/disadvantage counting rule added
- `docs/03-character-creation.md` — Character Concept simplified; Shield Training added to class modifier list and section
- `docs/05-specializations.md` — Stacking example corrected (was 6 dice, now 4); non-overlapping rule added
- `docs/06-combat.md` — Round 1 turn order clarified; range band gap fixed (Close starts at 5ft); stabilization fully defined (d20+End+Wil+Resolve≥14, per turn, no repeat penalty); death conditions unified (0 Resolve = Dying, negative max = instant death); healing rules added
- `docs/07-equipment.md` — Brutal weapon condition defined (minor condition on hit, GM-approved); shields rewritten with positive weapon framing; Shield Training added
- `docs/08-magic.md` — Spell damage formula added (Trait Die + Trait Value, no weapon die); Damage upgrade clarified (each Resonance = +1 Trait Die); Healing Effects section added
- `docs/09-conditions.md` — Conditions preamble added (outcomes not recipes, non-exhaustive list); Silenced no longer prevents spellcasting; Frozen removed (merged into Paralyzed); Wounded explained; Muted/Suppressed differentiated (Suppressed now doubles Resonance costs); Dying updated with stabilization formula; ongoing damage death spiral fixed
- `docs/10-non-combat.md` — Adventuring day defined (one Rest per Sleep cycle)

### Currently In Progress
- 🔄 Nothing actively in progress — audit complete, system ready for playtesting

### Next Steps (Priority Order)
1. **Playtest** the current system — all critical issues resolved; watch for: hit rate feel, light weapon viability, non-magical vs magical satisfaction, Resolve fragility, healing effectiveness
2. **GM Section** — encounter creation, monster building, reward/advancement guidelines (blocked until core mechanics are validated)
3. **Review balance-notes.md** after first playtest and adjust as needed
4. **Compile** all docs into a single printable document for the table

### Blockers / Open Questions
- Light weapons vs high-mitigation targets may be nearly useless (confirmed flagged, testing before fixing)
- Non-magical bonus (4 extra specs = 6 total) is an estimate — needs table validation
- Additional Specialization class modifier uncapped by design — test at table
- Bypass Immunity cost (4 Resonance) deferred to playtesting
- Resonance refund on "succeed by 5+" deferred to playtesting

---

## [Session 1] — April 30, 2026

### Completed This Session
- ✅ Set up `/handoff` globally (`C:\Users\mat60\.claude\commands\handoff.md`) and locally (`.claude/commands/handoff.md`)
- ✅ Created `CLAUDE.md` for this project
- ✅ Read and fully understood the complete rulebook from `2026-TTRPG-Messy.md`
- ✅ Resolved 8 rules clarifications (weapon accuracy dual values, armor column naming, dual wield sentence, charm categories, class modifier stacking, movement speed amount, character creation order, non-magical level-up behavior)
- ✅ Split the rulebook into 10 organized docs files (see structure below)
- ✅ Wrote the Character Concept section (Step 1 of character creation — ultimate fantasy vs level 1 reality)
- ✅ Ran balance analysis and made 5 design decisions (see Decisions log below)
- ✅ Created `docs/balance-notes.md` with full level 1 combat math

### Currently In Progress
- 🔄 Core mechanics are considered stable enough for a first playtest
- 🔄 GM section is on hold until after playtesting

### Next Steps (Priority Order)
1. **Playtest** the current system with friends — pay attention to: hit rate feel, light weapon viability, non-magical vs magical satisfaction, Resolve fragility at level 1
2. **GM Section** — encounter creation, monster building, reward/advancement guidelines (blocked until core mechanics are validated)
3. **Review balance-notes.md** after first playtest and adjust as needed
4. **Compile** all docs into a single printable document for the table

### Blockers / Open Questions
- Light weapons vs high-mitigation targets may be nearly useless (flagged, testing before fixing)
- Non-magical bonus (4 extra specs = 6 total) is an estimate — needs table validation
- Character Concept Step 1 is narrative only; no mechanical gate defined yet (intentional for now)

---

## Document Structure

```
docs/
  01-core-mechanics.md      — Resolution, difficulty, repeated attempt, advantage
  02-traits.md              — 12 traits, values, dice, all derived stat formulas
  03-character-creation.md  — Full creation steps (Character Concept through Equipment)
  04-advancement.md         — Level-up rules (odd/even/÷3/÷4)
  05-specializations.md     — Full specialization rules and stacking
  06-combat.md              — Turn structure, attacks, damage, range
  07-equipment.md           — Weapons, armor, shields, charms (all corrected)
  08-magic.md               — Domains, foundational effects, resonance upgrades
  09-conditions.md          — All conditions organized by type
  10-adventuring.md         — Social, extended tasks, rest, GM authority (renamed from 10-non-combat)
  11-quick-reference.md     — 2-page printable quick reference sheet
  balance-notes.md          — Math, hit rate tables, decisions log

character sheet/
  charactersheetinfo.md     — Field spec document (edit as design evolves)
  web version/
    index.html              — Interactive character sheet (desktop, open directly in browser)
    styles.css              — Styles
    script.js               — Auto-calc, JSON export/import, dynamic rows
```

---

## Design Decisions Log

| Decision | Value | Notes |
|----------|-------|-------|
| Movement speed class modifier | +5 ft | Was undefined in original doc |
| Armor/Charm Training | +1 defense modifier AND +1 mitigation | Mirrors Weapon Training (attack + damage) |
| Non-magical bonus specializations | 4 extra (6 total at level 1) | Estimate for equivalence with magic; test at table |
| Physical/Mental Defense formula | **8 + traits + Level** | +8 base constant calibrates avg vs avg to ~50% hit rate |
| Resolve cliff | Intentional — rules warning added | 0 in Endurance or Willpower = Resolve 1; valid but fragile |
| Light weapons vs high mitigation | Leave as-is for now | Mathematically weak but test before fixing |
| Class modifier stacking | All stack freely | 3-pick budget is the balancing constraint |
| Dual wielding | Auto-attack both weapons unless specified | Completes the cut-off sentence from original doc |
| Specialization stacking | Additive (+1 die per spec) | Example in doc was wrong (said 6 dice); corrected to 4 |
| Specialization overlap | Non-overlapping by design | GM enforces at creation; subset specs not allowed |
| Additional Specialization modifier | Uncapped | High spec count is narrow by design; test at table |
| Stabilization roll | d20 + End + Wil + Resolve ≥ 14, per turn | Self-stabilization only; no repeat penalty; allies use separate GM roll |
| Healing (magical) | Minimum 1 Resonance to restore Resolve | Trait Die + Trait Value base; +1 Trait Die per additional Resonance |
| Healing (mundane) | No Resonance cost | Follows allied stabilization rules |
| Shield Training | Generic modifier, +1 defense per rank | 2 ranks = large shield one-handed; 3 ranks = standard weapons with large shield |
| Spell damage | Trait Die + Trait Value (no weapon die) | Resonance adds Trait Die per point; intentionally weaker than weapons at baseline |
| Suppressed condition | Doubles all Resonance costs | Was "halve spell damage" — now distinct from Muted |
| Frozen condition | Removed | Merged into Paralyzed (advantage on physical attacks + can't move/act) |
| Conditions | Outcomes not recipes; list non-exhaustive | Players/GM may apply any condition through creative action |
| Repeated attempt penalty | Per-problem, not per-character | Party cannot pass a failed check around for free retries |
| Advantage/disadvantage | Count sources; more sources wins | 3 advantage vs 1 disadvantage = roll with advantage |
| Adventuring day | Ends at Sleep; one Rest per Sleep cycle | Prevents double-dipping on recovery |
| Bypass Immunity cost | 4 Resonance — leave as-is | Deferred to playtesting |

## Core Formulas (Current)

| Stat | Formula |
|------|---------|
| Physical Defense | 8 + Endurance + Balance + Toughness + Level |
| Mental Defense | 8 + Willpower + Awareness + Empathy + Level |
| Physical Mitigation | Balance + Toughness |
| Mental Mitigation | Awareness + Empathy |
| Resolve | (Endurance × Willpower) + Level |
| Resonance | Empathy + Balance + Level |
| Combat Speed | 20 ft base + 5 ft per 2 Speed (rounded down) |
