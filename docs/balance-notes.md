# Balance Notes

Working document tracking balance decisions, math, and open questions. Updated as the system evolves.

---

## Design Targets

- **Average attacker vs average defender:** ~50% hit rate (err slightly above)
- **Dedicated attacker vs dedicated defender:** ~30–40% hit rate
- **Dedicated attacker vs undefended character:** ~80–90% hit rate
- **Damage per hit:** Should take a typical character several hits to fall, not one or two

---

## Formulas (Current)

| Derived Stat | Formula |
|---|---|
| Physical Defense | 8 + Endurance + Balance + Toughness + Level |
| Mental Defense | 8 + Willpower + Awareness + Empathy + Level |
| Physical Mitigation | Balance + Toughness |
| Mental Mitigation | Awareness + Empathy |
| Resolve | (Endurance × Willpower) + Level |
| Resonance | Empathy + Balance + Level |
| Combat Speed | 20 ft + (5 ft per 2 Speed, rounded down) |

---

## Level 1 Combat Math

### Character Creation Constraints
- 20 trait points, max 2 traits at 4, no trait above 4 at level 1
- All trait dice: d4 (avg 2.5)
- Average d20: 10.5

### Sample Builds (Level 1)

**Average Character** — points spread across the build (2 in most traits):

| Trait | Value |
|-------|-------|
| Attack trait | 2 |
| Endurance | 2 |
| Balance | 2 |
| Toughness | 2 |
| Willpower | 2 |
| Others | 1–2 |

- Physical Defense: 8+2+2+2+1 = **15**
- Mental Defense: 8+2+2+2+1 = **15**
- Physical Mitigation: 2+2 = **4**
- Resolve: (2×2)+1 = **5**
- Average attack (Standard weapon, 0 accuracy): 10.5+2.5+2+0 = **15**

**Focused Attacker** — maximizes one attack trait and weapon choice:

| Trait | Value |
|-------|-------|
| Attack trait | 4 |
| One other | 4 |
| Defense traits | 0–2 each |

- Average attack (Simple weapon, +2 main hand): 10.5+2.5+4+2 = **19**
- Average attack (Standard weapon, 0 accuracy): 10.5+2.5+4+0 = **17**
- Physical Defense: 8+1+1+0+1 = **11** (vulnerable to return attacks)
- Resolve: (1×1)+1 = **2** (extremely fragile — will fall in 1–2 hits)

**Dedicated Defender** — maximizes defense traits (uses both "max at 4" slots on defense):

| Trait | Value |
|-------|-------|
| Endurance | 4 |
| Balance | 4 |
| Toughness | 3 |
| Willpower | 2 |
| Attack trait | 1 |
| Others | 0–1 |

- Physical Defense: 8+4+4+3+1 = **20**
- Physical Mitigation: 4+3 = **7**
- Resolve: (4×2)+1 = **9**
- Average attack: 10.5+2.5+1+0 = **14** (attacks land less frequently — offense sacrificed for defense)

---

## Hit Rate Table (Level 1)

Attack roll = d20 + d4 + Trait Value + Accuracy Modifier

To calculate hit rate: attacker hits if (d20 + d4) ≥ (Defense − Attacker's Modifiers)

### Average Attacker (trait 2, Standard weapon, 0 accuracy) — avg roll 15

| Target's Physical Defense | Min d20+d4 Needed | Hit Rate |
|---------------------------|-------------------|----------|
| 9 (zero defense investment) | −3 | ~100% |
| 11 (minimal investment) | −1 | ~100% |
| 15 (average build) | 3 | ~97% |
| 20 (dedicated defender) | 8 | ~78% |

> **Problem identified:** Average vs average is ~97%, not ~50%. The +8 base constant in the defense formula was applied to close this gap — see below.

### After applying +8 base constant to defense:

Avg attacker roll: 10.5+2.5+2+0 = **15**
Avg defender Physical Defense: 8+2+2+2+1 = **15**

| Matchup | Avg Attacker Roll | Target Defense | Hit Rate |
|---------|-------------------|----------------|----------|
| Avg attacker vs zero-defense character | 15 | 9 | ~97% |
| Avg attacker vs avg defender | 15 | 15 | ~50% |
| Avg attacker vs dedicated defender | 15 | 20 | ~28% |
| Focused attacker vs avg defender | 19 | 15 | ~75% |
| Focused attacker vs dedicated defender | 19 | 20 | ~47% |

**Result:** Calibration is close to targets. ✅

---

## Damage Math (Level 1)

**Attack:** Weapon Die + Trait Die + Trait Value + Modifiers − Target Mitigation

Minimum damage: 1

### Sample exchanges

**Average attacker (Strength 2, Standard weapon d8) vs average defender (Mitigation 4):**
- Damage per hit: d8+d4+2−4 = (1–8)+(1–4)+2−4 = 0–10, avg **3**
- Resolve of avg defender: 5
- Hits to down: ~2 hits

**Focused attacker (Strength 4, Brutal weapon d12) vs dedicated defender (Mitigation 7):**
- Damage per hit: d12+d4+4−7 = (1–12)+(1–4)+4−7 = -1–13, avg **5**, min 1
- Resolve of dedicated defender: 9
- Hits to down: ~2 hits (range: 1–9)

**Focused attacker (Strength 4, Simple weapon d4) vs dedicated defender (Mitigation 7):**
- Damage per hit: d4+d4+4−7 = (1–4)+(1–4)+4−7 = -1–5, avg **1**, min 1
- Nearly every hit deals minimum 1 damage
- Hits to down: ~9 hits — **light weapons vs heavy mitigation is borderline unusable**
- *Flagged for playtesting — left as-is until confirmed a real problem at the table*

---

## Resolve Cliff

**Formula:** Resolve = (Endurance × Willpower) + Level

The multiplication creates extreme variance:

| Endurance | Willpower | Resolve (Level 1) |
|-----------|-----------|-------------------|
| 0 | any | 1 |
| any | 0 | 1 |
| 1 | 1 | 2 |
| 2 | 2 | 5 |
| 3 | 3 | 10 |
| 4 | 4 | 17 |
| 4 | 3 | 13 |

**Decision:** Intentional. The rules include an explicit warning that 0 in either stat = Resolve 1. Valid choice, not survivable.

---

## Non-Magical vs Magical Balance

### Magical character at level 1
- 2 Foundational Effects (one combat, one roleplay — typical)
- Resonance = Empathy + Balance + Level (typical build: ~5–7 Resonance)
- Access to all Resonance upgrades (Area, Targets, Damage, Duration, Range, etc.)

### Non-magical character at level 1
- **6 total specializations** (1 Combat + 1 Roleplay base + 4 bonus)
- Each specialization: roll Trait Die twice when applicable — avg +2.5 per spec when triggered

### Assessment
Magic provides flexibility (anything in domain) and Resonance economy. Non-magical provides reliability (known bonus in known situations) and simplicity. Exact equivalence is not the goal — different play experiences. **6 specializations is a starting point; adjust after playtesting.**

---

## Open Balance Questions (Pending Playtesting)

1. **Light weapons vs high mitigation** — nearly useless mathematically. May not feel like a real problem at the table if players choose weapons appropriately for their targets. Monitor during playtesting.

2. **Non-magical vs magical feel** — does 6 specializations feel rewarding enough? Does magic feel too flexible? Requires table feedback.

3. **Average hit rate at ~50% for avg vs avg** — may feel like combat misses too often if players aren't used to it. Check pacing at the table.

4. **Resolve fragility at low investment** — average Resolve of 5 means characters go down in 2 hits at level 1. Intended, but check if combat feels punishing before the GM section defines encounter difficulty.

---

## Decisions Log

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-04-29 | Defense formula: +8 base constant | Calibrates avg vs avg to ~50% hit rate |
| 2026-04-29 | Non-magical bonus: 4 extra specs (6 total) | Starting estimate for equivalence with magic; pending playtesting |
| 2026-04-29 | Resolve cliff: intentional, add rules warning | Valid design choice with meaningful consequences |
| 2026-04-29 | Light weapon vs high mitigation: leave as-is | Test at the table before adding a rule fix |
| 2026-04-29 | Armor/Charm Training: +1 defense AND +1 mitigation | Mirrors Weapon Training (accuracy + damage) |
| 2026-04-29 | Movement speed class modifier: +5 ft | Defined — was missing from original document |
