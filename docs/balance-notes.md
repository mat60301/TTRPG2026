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

### Weapon Stats Reference

| Category | Main Acc | Off Acc | Damage Die | Avg Die |
|----------|----------|---------|------------|---------|
| Simple | +2 | +0 | d4 | 2.5 |
| Light | +1 | −3 | d6 | 3.5 |
| Standard | 0 | −6 | d8 | 4.5 |
| Heavy | −1 | — | d10 | 5.5 (two-handed unless trained) |
| Brutal | −2 | — | d12 | 6.5 (always two-handed; condition on hit) |
| Unarmed | +4 | +3 | none | — |

Each step up the weapon ladder is exactly **+1 average damage** in exchange for exactly **−1 accuracy** (−5% hit rate). Whether this tradeoff is worthwhile depends on the current hit rate and mitigation level — see breakeven analysis below.

### Hit Rates — Focused Attacker (Trait 4, d4)

Threshold T = Defense − 4 − Weapon Acc

**Main hand:**

| Weapon | Acc | Def 11 | Def 15 | Def 20 |
|--------|-----|--------|--------|--------|
| Simple | +2 | 92.5% | 72.5% | 47.5% |
| Light | +1 | 87.5% | 67.5% | 42.5% |
| Standard | 0 | 82.5% | 62.5% | 37.5% |
| Heavy | −1 | 77.5% | 57.5% | 32.5% |
| Brutal | −2 | 72.5% | 52.5% | 27.5% |

**Off hand** (uses off-hand accuracy modifier):

| Weapon | Acc | Def 11 | Def 15 | Def 20 |
|--------|-----|--------|--------|--------|
| Simple | +0 | 82.5% | 62.5% | 37.5% |
| Light | −3 | 67.5% | 47.5% | 22.5% |
| Standard | −6 | 52.5% | 32.5% | 7.5% |

**Key observation:** Simple off-hand (+0) has the same hit rate as Standard main-hand (0) at every defense value. An off-hand Simple weapon lands as often as a main-hand Standard weapon while doing d4+6.5−M damage vs d8+6.5−M. This is the structural source of dual wield's advantage.

### Avg Damage Per Hit — Focused Attacker (Trait 4, d4)

Damage = Weapon Die avg + 2.5 (trait die) + 4 (trait value) − Mitigation = Weapon Die avg + **6.5** − M (min 1)

| Weapon | Die avg | Mit 0 | Mit 2 | Mit 4 | Mit 7 |
|--------|---------|-------|-------|-------|-------|
| Simple | 2.5 | 9.0 | 7.0 | 5.0 | 2.0† |
| Light | 3.5 | 10.0 | 8.0 | 6.0 | 3.0 |
| Standard | 4.5 | 11.0 | 9.0 | 7.0 | 4.0 |
| Heavy | 5.5 | 12.0 | 10.0 | 8.0 | 5.0 |
| Brutal | 6.5 | 13.0 | 11.0 | 9.0 | 6.0 |

† Min-1 floor applies on ~19% of hits at this value; actual avg ≈ 2.1.

**Breakeven rule:** Moving one step heavier (−5% hit rate, +1 avg damage) increases DPR when:
> current hit rate > 5% × current avg damage per hit

At Standard vs Mit 0 (avg dmg 11): breakeven is 55%. Standard hits at 62.5% vs def 15 → Heavy marginally wins on single-weapon DPR. At def 20 (37.5% hit): 5%×11=55% > 37.5% → lighter weapons win at high defense.

### Single Weapon DPR — Focused Attacker (Trait 4, d4)

DPR = Hit Rate × Avg Damage

| Weapon | D11/M0 | D15/M0 | D20/M0 | D15/M2 | D15/M4 | D15/M7 | D20/M4 | D20/M7 |
|--------|--------|--------|--------|--------|--------|--------|--------|--------|
| Simple | 8.33 | 6.53 | **4.28** | 5.08 | 3.63 | 1.45 | 2.38 | 0.95 |
| Light | 8.75 | 6.75 | **4.25** | 5.40 | 4.05 | 2.03 | 2.55 | 1.28 |
| Standard | 9.08 | 6.88 | 4.13 | 5.63 | 4.38 | 2.50 | **2.63** | 1.50 |
| Heavy | **9.30** | **6.90** | 3.90 | **5.75** | **4.60** | **2.88** | 2.60 | 1.63 |
| Brutal | **9.43** | 6.83 | 3.58 | **5.78** | **4.73** | **3.15** | 2.48 | **1.65** |

**Single-weapon takeaways:**
- At low-to-medium defense (def 11–15): Heavy and Brutal have the highest DPR across all mitigation levels. The damage die advantage outweighs the accuracy penalty when hit rates are high enough.
- At high defense (def 20): Standard and Light pull ahead. Once hit rates fall below ~40%, the −1/−2 accuracy cost is too steep.
- Heavy and Brutal are the anti-armor specialists for single-weapon builds. At Mit 7, Brutal does 3.15 vs Standard's 2.50 — a **26% advantage**.
- Brutal's condition-on-hit is additional non-DPR value not captured here.

### Dual Wield DPR — Focused Attacker (Trait 4, d4)

DPR = (Main HR × Main Dmg) + (Off HR × Off Dmg)

| Pairing | D11/M0 | D15/M0 | D20/M0 | D15/M4 | D15/M7 | D20/M4 | D20/M7 |
|---------|--------|--------|--------|--------|--------|--------|--------|
| Std + Simple | **16.50** | **12.50** | 7.50 | **7.50** | 3.75 | **4.50** | **2.25** |
| Lt + Simple | 16.18 | 12.38 | **7.63** | 7.18 | 3.28 | 4.43 | 2.03 |
| Std + Light | 15.83 | 11.63 | 6.38 | 7.23 | **3.93** | 3.98 | 2.18 |
| Lt + Light | 15.50 | 11.50 | 6.50 | 6.90 | 3.45 | 3.80 | 1.95 |
| Std + Std | 14.85 | 10.45 | 4.95 | 6.65 | 3.80 | 3.15 | 1.80 |
| *Heavy (2H)* | *9.30* | *6.90* | *3.90* | *4.60* | *2.88* | *2.60* | *1.63* |
| *Brutal (2H)* | *9.43* | *6.83* | *3.58* | *4.73* | *3.15* | *2.48* | *1.65* |

**Dual wield takeaways:**
- Std + Simple is the dominant pairing in most scenarios. Simple's +0 off-hand accuracy matches Standard's main-hand accuracy, effectively granting a near-free second Standard-rate attack (at slightly lower damage).
- At high mitigation (Mit 7), Std + Light edges out Std + Simple. The off-hand light weapon's better damage (d6 avg 3 vs d4 avg 2) compensates for its lower hit rate (47.5% vs 62.5%) when mitigation eats most of the damage. Specifically: 47.5%×3=1.43 DPR from Light off vs 62.5%×2=1.25 from Simple off.
- Dual wield is **structurally dominant** because the second attack is free (rules specify both weapons auto-attack each turn). Even in the worst case (def 20, mit 7), Std+Simple (2.25) outperforms Brutal single (1.65) by **37%**.
- Heavy and Brutal have no scenario where they beat the best dual-wield option without additional mechanical differentiation.

### Dual Wield vs Single Weapon — DPR Ratio

| Scenario | Best Dual (Str4) | Best Single (Str4) | Dual advantage |
|----------|-----------------|-------------------|---------------|
| Def 15 / Mit 0 | 12.50 (Std+Sim) | 6.90 (Heavy) | **+81%** |
| Def 15 / Mit 4 | 7.50 (Std+Sim) | 4.73 (Brutal) | **+59%** |
| Def 15 / Mit 7 | 3.93 (Std+Lt) | 3.15 (Brutal) | **+25%** |
| Def 20 / Mit 0 | 7.63 (Lt+Sim) | 4.28 (Simple) | **+78%** |
| Def 20 / Mit 4 | 4.50 (Std+Sim) | 2.63 (Standard) | **+71%** |
| Def 20 / Mit 7 | 2.25 (Std+Sim) | 1.65 (Brutal) | **+36%** |

The gap narrows significantly at high mitigation but dual wield always wins.

---

## Proposed Fix: Armor Penetration for Heavy and Brutal

### Concept
Heavy and Brutal weapons ignore a portion of the target's mitigation, giving them a genuine anti-armor niche.

**Proposed values:**
- Heavy: ignore 2 mitigation (effective mitigation = actual − 2)
- Brutal: ignore 4 mitigation (effective mitigation = actual − 4)

### Breakeven Analysis

With armor penetration, Heavy (−2 pen) beats Std+Simple dual wield when:

57.5% × (12 − (M−2)) > 62.5% × (11−M) + 62.5% × (9−M)

Solving: M > 6.6 → **Heavy with −2 pen beats dual wield when target has Mit 7+** (heavy or bulwark armor)

Brutal (−4 pen) beats Std+Simple dual wield when:

52.5% × (13 − (M−4)) > 62.5% × (11−M) + 62.5% × (9−M)

Solving: M > 4.9 → **Brutal with −4 pen beats dual wield when target has Mit 5+** (standard armor or better)

### With Penetration — DPR at Def 15

| Build | Mit 4 (eff. mit 2) | Mit 7 (eff. mit 5) |
|-------|-------------------|-------------------|
| Std + Simple (no pen) | 7.50 | 3.75 |
| Std + Light (no pen) | 7.23 | **3.93** |
| Heavy (−2 pen) | 5.75 | **4.03** |
| Brutal (−4 pen) | 6.83 | **5.25** |

With penetration, Brutal at Mit 7 does 5.25 — **33% more than the best dual wield option** (3.93). Heavy and Brutal become genuinely the best choice against armored targets.

### With Penetration — DPR at Def 20

| Build | Mit 4 (eff. mit 2) | Mit 7 (eff. mit 5) |
|-------|-------------------|-------------------|
| Std + Simple (no pen) | 4.50 | 2.25 |
| Heavy (−2 pen) | 3.25 | **2.28** |
| Brutal (−4 pen) | 3.58 | **2.75** |

At high defense + high mitigation, Brutal with penetration again wins.

### Result: Clean Niche Hierarchy

| Target armor | Optimal weapon choice |
|-------------|----------------------|
| Unarmored / light (Mit 0–4) | Dual wield (Std+Simple or Lt+Simple) |
| Standard armor (Mit 5–6) | Brutal with penetration; dual wield still competitive |
| Heavy / bulwark armor (Mit 7+) | Brutal or Heavy with penetration; dual wield loses |

This creates a meaningful weapon selection decision without requiring dual wield to be nerfed.

---

## Proposed Fix: Simple Off-Hand Accuracy Nerf

### Alternative approach (instead of or in addition to penetration)

Changing Simple's off-hand accuracy from +0 to −2 or −3:

| Simple off-hand acc | Off HR vs Def 15 | Std+Simple DPR (D15/M4) | vs Heavy |
|--------------------|-----------------|------------------------|---------|
| +0 (current) | 62.5% | 7.50 | Heavy: 4.60 — dual wield +63% |
| −2 | 52.5% | 4.38 + 2.63 = **7.00** | Heavy: 4.60 — dual wield +52% |
| −3 | 47.5% | 4.38 + 2.38 = **6.75** | Heavy: 4.60 — dual wield +47% |

A nerf to −3 does reduce the gap but doesn't close it. The structural issue is that two free attacks will always beat one, regardless of accuracy — you'd need to nerf Simple off-hand to around −5 or −6 (the same as Standard off-hand) before dual wield loses its structural advantage, at which point players would simply switch to Light off-hand.

**Conclusion:** Simple off-hand nerf reduces dual wield dominance slightly but doesn't solve the root problem. Armor penetration for heavy/brutal is the cleaner design fix.

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

1. **Dual wield structural dominance** — Std+Simple beats any single two-handed weapon in all scenarios without armor penetration. Root cause: Simple's +0 off-hand accuracy equals Standard's main-hand accuracy, making the second attack nearly free. Fix options: (a) armor penetration for Heavy/Brutal — preferred; (b) Simple off-hand accuracy nerf — reduces gap but doesn't close it.

2. **Heavy vs Brutal** — Without armor penetration, Brutal strictly beats Heavy at every mitigation value (higher die, same two-handed restriction, with condition bonus on top). If penetration is added, Heavy should penetrate less (−2) and be available with a shield via training, while Brutal penetrates more (−4) but is always two-handed.

3. **Light weapons vs high mitigation** — Simple weapons are nearly useless vs dedicated defenders even with dual wield (Mit 7 avg dmg 2). Light is the floor of viability. Intended: players should read the room and not bring a dagger to a plate armor fight.

4. **Non-magical vs magical feel** — Does 6 specializations feel rewarding enough? Does magic feel too flexible? Requires table feedback.

5. **Average hit rate at ~52.5% for avg vs avg** — May feel like combat misses often if players aren't used to it. Check pacing at the table.

6. **Resolve fragility at low investment** — Average Resolve of 5 means characters go down in ~2 hits at level 1. Intended, but check if combat feels punishing before the GM section defines encounter difficulty.

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
| Pending | Armor penetration: Heavy −2, Brutal −4 | Gives heavy/brutal a genuine anti-armor niche; breakeven at Mit 7 for Heavy, Mit 5 for Brutal vs dual wield |
