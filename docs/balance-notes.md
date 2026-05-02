# Balance Notes

Working document tracking balance decisions, math, and open questions. Updated as the system evolves.

---

## Design Targets

- **Average attacker vs average defender:** ~50% hit rate (err slightly above)
- **Dedicated attacker vs dedicated defender:** ~30–40% hit rate
- **Dedicated attacker vs undefended character:** ~80–90% hit rate
- **Damage per hit:** Should take a typical character several hits to fall, not one or two

---

## Core Formulas (Current)

### Derived Stats

| Stat | Formula |
|---|---|
| Physical Defense | 8 + Endurance + Balance + Level |
| Mental Defense | 8 + Willpower + Awareness + Level |
| Physical Mitigation | Toughness |
| Mental Mitigation | Empathy |
| Resolve | (Endurance × Willpower) + Level |
| Resonance | Empathy + Balance + Level |
| Combat Speed | 20 ft + (5 ft per 2 Speed, rounded down) |

### Attack and Damage

**Attack roll:** d20 + Trait Die + Trait Value + Weapon Accuracy Modifier ≥ Defense

**Damage per hit:** Weapon Die + Trait Die + Trait Value + Other Modifiers − Target Mitigation (minimum 1)

The Trait Die and Trait Value appear in **both** rolls. A Strength 4 character with d4 trait die contributes an average of **6.5** (2.5 + 4) to every attack roll and an average of **6.5** to every damage roll before the weapon die is considered. The weapon die and accuracy modifier are additions on top of this shared base.

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

- Physical Defense: 8+2+2+1 = **13**
- Physical Mitigation: 2 = **2**
- Resolve: (2×2)+1 = **5**
- Average attack roll (Standard, acc 0): 10.5+2.5+2+0 = **15**
- Average damage per hit (Standard vs Mit 2): 4.5+2.5+2−2 = **7**
- DPR vs avg defender (62.5% hit × 7 dmg): **~4.4** — downs avg defender (Resolve 5) in ~1–2 hits ✅

**Focused Attacker** — maximizes one attack trait:

| Trait | Value |
|-------|-------|
| Attack trait | 4 |
| One other | 4 |
| Defense traits | 0–2 each |

- Average attack roll (Standard, acc 0): 10.5+2.5+4+0 = **17**
- Physical Defense: 8+1+1+1 = **11** (vulnerable)
- Resolve: (1×1)+1 = **2** (falls in 1–2 hits)

**Dedicated Defender** — maximizes defense traits:

| Trait | Value |
|-------|-------|
| Endurance | 4 |
| Balance | 4 |
| Toughness | 3 |
| Attack trait | 1 |

- Physical Defense: 8+4+4+1 = **17**
- Physical Mitigation: 3 = **3**
- Resolve: (4×2)+1 = **9**
- Average attack roll: 10.5+2.5+1+0 = **14**

---

## Hit Rate Table (Level 1)

### d20+d4 Distribution

The attack pool is d20 + d4: 80 equally-likely outcomes (integers 1–20 × 1–4). Hit rates below are exact.

P(d20+d4 ≥ T) quick reference:

| T | Hit % | T | Hit % | T | Hit % |
|---|-------|---|-------|---|-------|
| ≤2 | 100% | 10 | 67.5% | 17 | 32.5% |
| 3 | 98.75% | 11 | 62.5% | 18 | 27.5% |
| 4 | 96.25% | 12 | 57.5% | 19 | 22.5% |
| 5 | 92.5% | 13 | 52.5% | 20 | 17.5% |
| 6 | 87.5% | 14 | 47.5% | 21 | 12.5% |
| 7 | 82.5% | 15 | 42.5% | 22 | 7.5% |
| 8 | 77.5% | 16 | 37.5% | 23 | 3.75% |
| 9 | 72.5% |   |       | ≥24 | 0% |

Threshold formula: **T = Defense − Trait Value − Weapon Accuracy**

### Matchup Table (Avg attacker, Std weapon, acc 0, Trait 2)

| Matchup | Avg Roll | Target Defense | Hit Rate |
|---------|----------|----------------|----------|
| Avg attacker vs zero-defense character | 15 | 9 | ~97% |
| Avg attacker vs avg defender | 15 | 13 | ~62.5% |
| Avg attacker vs dedicated defender | 15 | 17 | ~42.5% |
| Focused attacker vs avg defender | 17 | 13 | ~72.5% |
| Focused attacker vs dedicated defender | 17 | 17 | ~52.5% |

**Note:** The +8 base constant was originally calibrated for the old formulas (avg defense = 15). With the new formulas, avg defense is 13, pushing avg vs avg hit rate to ~62.5%. This is intentional — combat is slightly more hit-prone than the original design target. Monster stats are GM-assigned, so encounter difficulty is tuned at the GM level regardless.

---

## Weapon Viability Analysis

### Design Goal

Weapon loadouts are balanced against **monsters**, not other players. The goal is three distinct niches:

- **Small weapon dual wield** (Simple+Simple, Std+Simple): best against unarmored/lightly armored monsters
- **Heavy/Brutal single weapon**: best against heavily armored monsters, including outperforming dual wield
- **Under average monster conditions**: all loadouts roughly equivalent — no choice feels penalized

The mechanism that creates these niches is **armor penetration** for Heavy and Brutal weapons.

### Weapon Stats Reference

| Category | Main Acc | Off Acc | Damage Die | Avg Die | Penetration |
|----------|----------|---------|------------|---------|-------------|
| Simple | +2 | +0 | d4 | 2.5 | — |
| Light | +1 | −3 | d6 | 3.5 | — |
| Standard | 0 | −6 | d8 | 4.5 | — |
| Heavy | −1 | — | d10 | 5.5 | −2 (two-handed unless trained) |
| Brutal | −2 | — | d12 | 6.5 | −4 (always two-handed; condition on hit) |
| Unarmed | +4 | +3 | none | — | — |

Each step up the weapon ladder is exactly **+1 average damage** and **−5% hit rate**. This produces near-equal single-weapon DPR under base (no mitigation) conditions — see below.

Penetration reduces the target's **effective mitigation** for that attack. Effective mitigation cannot go below 0. Heavy treats Mit 5 as Mit 3; Brutal treats Mit 7 as Mit 3.

### Why the Accuracy and Off-Hand Modifiers Are Correct

The main hand accuracy progression (+2 to −2) exists specifically to keep single-weapon DPR roughly equal at baseline (see table below). Without it, smaller weapons would be strictly worse in every context.

The off-hand accuracy penalties (+0, −3, −6) enforce the "small weapon in the off-hand" archetype. Simple's +0 off-hand equals Standard's +0 main-hand — this is intentional. It makes Simple the ideal off-hand weapon and means the best dual wield pairing is Std + Simple or Lt + Simple, not Std + Std. These numbers are not changing.

### Single Weapon DPR at Baseline — Near-Equal Design ✅

Focused attacker (Trait 4, d4). Damage = Weapon Die avg + 6.5 − M. DPR = Hit Rate × Damage.

At Def 15 / Mit 0 (no mitigation, no penetration needed):

| Weapon | Hit rate | Dmg | DPR |
|--------|----------|-----|-----|
| Simple | 72.5% | 9.0 | 6.53 |
| Light | 67.5% | 10.0 | 6.75 |
| Standard | 62.5% | 11.0 | 6.88 |
| Heavy | 57.5% | 12.0 | 6.90 |
| Brutal | 52.5% | 13.0 | 6.83 |

Range: 6.53–6.90. All single weapons do roughly the same DPR against an unarmored target. The accuracy tradeoff exactly balances the damage die increase. This is the baseline the niche system builds from.

### The Balance Crossover Point

**At Def 15 / Mit 4 with armor penetration, Simple+Simple dual ≈ Brutal single:**

- Simple + Simple dual: 72.5% × 5 + 62.5% × 5 = **6.75 DPR**
- Brutal with −4 pen (eff. M=0): 52.5% × 13 = **6.83 DPR**

Within 1% of each other. **Mit ≈ 4 is the balance point** — the crossover where loadout choice stops mattering and only the extremes differentiate.

### Full DPR Comparison (Def 15, with penetration for Heavy/Brutal)

Effective mitigation for Heavy = M−2 (min 0); for Brutal = M−4 (min 0). Values italic where penetration reaches the floor (DPR is flat).

| Loadout | M=0 | M=2 | M=4 | M=7 | M=10 |
|---------|-----|-----|-----|-----|------|
| Simple + Simple dual | 12.15 | 9.00 | 6.75 | 2.70 | min-1 floor |
| Std + Simple dual | 12.50 | 9.38 | 7.50 | 3.75 | min-1 floor |
| Standard single | 6.88 | 5.63 | 4.38 | 2.50 | 1.25 |
| Heavy (−2 pen) | *6.90* | *6.90* | 5.75 | 4.03 | 2.30 |
| Brutal (−4 pen) | *6.83* | *6.83* | *6.83* | 5.25 | 3.68 |

Heavy/Brutal DPR is flat below their penetration threshold because penetration can't reduce mitigation below 0.

### Niche Hierarchy — Achieved ✅

| Monster mitigation | Dominant loadout | Notes |
|-------------------|-----------------|-------|
| M 0–1 (unarmored) | Dual wield +~80% | Two attacks with near-free hit rate |
| M 2–3 (light armor) | Dual wield +~35% | Still clearly ahead |
| M 4 (average armor) | All loadouts roughly equal | Design balance point |
| M 5–6 (heavy armor) | Brutal wins; dual fading | Brutal's pen makes it clearly better |
| M 7+ (extreme armor) | Brutal > Heavy > dual wield | Brutal 40% ahead of best dual option |
| M 10+ (boss tier) | Heavy/Brutal clearly dominant | Dual wield hits min-1 floor on most hits |

At high mitigation, Brutal (5.25) vs best dual wield (3.75) = **40% advantage** — clear but not crushing. Dual wielders still do meaningful damage; this is their "not their specialty" tier.

### Monster Stat Tiers (GM Guidelines)

These are reference ranges, not hard rules. GMs set monster stats freely.

| Tier | Defense | Mitigation | Example creatures |
|------|---------|------------|-------------------|
| Weak / unarmored | 9–12 | 0–1 | Goblin, zombie, bandit |
| Average / lightly armored | 13–16 | 2–3 | Town guard, orc warrior |
| Tough / armored | 16–18 | 4–6 | Knight, troll, bear |
| Elite / heavily armored | 18–22 | 7–10 | Warlord, iron golem |
| Boss | 20–26 | 10–15 | Dragon, demon lord |

**Mit 4 (Tough/Armored) is the natural balance point.** Below it, dual wield dominates. Above it, Heavy and Brutal pull ahead. GMs can use this to signal encounter difficulty through monster armor choice — a heavily armored monster is a specific challenge to dual wielders, not a generic difficulty increase.

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

1. **Light weapons vs high mitigation** — Simple weapons do very low damage vs armored targets (Mit 7 avg dmg 2 per hit). This is intentional — players should read the room and not bring daggers to a plate armor fight. Confirm the feel at the table.

2. **Non-magical vs magical feel** — Does 6 specializations feel rewarding enough? Does magic feel too flexible? Requires table feedback.

3. **Average hit rate at ~62.5% for avg vs avg** — Combat is slightly more hit-prone than originally intended (+8 constant was calibrated for higher avg defense). May feel fast-paced; check at table.

4. **Resolve fragility at low investment** — Average Resolve of 5 means characters go down in ~2 hits at level 1. Intended, but check if combat feels punishing before the GM section defines encounter difficulty.

5. **Penetration feel at the table** — Does it feel satisfying when a player with a Brutal weapon fights a heavily armored monster and clearly outperforms their dual-wielding ally? Does it feel bad when that same Brutal wielder fights an unarmored target and lags behind? Adjust penetration values (±1 or ±2) after first playtest if needed.

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
| 2026-05-01 | Full weapon DPR analysis completed | Dual wield structurally dominant; armor penetration for Heavy/Brutal identified as the clean fix |
| 2026-05-02 | Armor penetration implemented: Heavy −2, Brutal −4 | Creates clean niche hierarchy; balance crossover at Mit ≈ 4; Simple+Simple dual ≈ Brutal single at that point |
| 2026-05-02 | Monster stat tiers defined as GM guidelines | Weak/unarmored Mit 0–1, Average Mit 2–3, Tough Mit 4–6, Elite Mit 7–10, Boss Mit 10–15 |
| 2026-05-02 | Accuracy and off-hand modifiers kept as-is | They produce near-equal single-weapon DPR at baseline and enforce small-weapon off-hand archetype |
