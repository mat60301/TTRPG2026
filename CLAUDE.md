# TTRPG Design Project — Claude Context Guide

## Project Overview

This is a tabletop roleplaying game (TTRPG) design project. The system is **roleplay-led, board game supported** — narrative first, mechanics second. Characters are not superheroes at level 1; they are origin stories working toward an ultimate fantasy.

## Key Files

- `2026 TTRPG - Clean.pdf` — Original master document (source of truth for intent)
- `2026-TTRPG-Messy.md` — Raw text copy of the PDF (for reference)
- `docs/` — Split, cleaned, and corrected rulebook (working documents)

## How to Use This File

This file is updated at the end of each Claude chat session via `/handoff`. A new Claude session will read this file automatically and pick up where the last one left off — no manual re-explaining needed.

---

## Session History

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
