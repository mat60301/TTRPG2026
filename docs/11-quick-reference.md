# Quick Reference

## Core Roll
**d20 + Trait Die + Trait Value + Modifiers ≥ Difficulty**

On failure, a narrative result still occurs — something always happens.

## Difficulty

| Difficulty | Target |
|------------|--------|
| Very Easy  | 7      |
| Easy       | 11     |
| Average    | 16     |
| Hard       | 20     |
| Very Hard  | 24     |
| Impossible | 28     |

---

## Combat

### Turn Order
- Players collaboratively arrange all turns (theirs and enemies') at the start of each round.
- GM declares how many enemy turn slots are needed before arrangement begins.
- The character who **acts last** in a round automatically **acts first** next round.
  - If that character is an enemy, they gain advantage on their first Major Action.
- **Surprised** characters act last and do not automatically act first next round.

### Turn Structure (any order)
1. **Movement** — up to full movement speed; may be split around other actions
2. **Minor Adjustment** — narrative flavor for a small mechanical advantage (GM discretion)
3. **Major Action** — one attack, spell, dash, dodge, or any action that fits in one turn

### Attack Roll
**d20 + Trait Die + Trait Value + Accuracy Mod ≥ Target Defense**

Physical attacks target Physical Defense. Mental/magical attacks target Mental Defense.

### Damage
**Weapon Die + Trait Die + Trait Value + Mods − Target's Mitigation (minimum 1)**

Physical attacks reduce Physical Mitigation; mental/magical reduce Mental Mitigation. Area attacks: roll damage once, separate attack roll per target.

### Range Bands

| Band    | Distance        | Effect         |
|---------|-----------------|----------------|
| Melee   | 0–5 ft          | Disadvantage   |
| Close   | 5–30 ft         | Normal         |
| Far     | 30–60 ft        | Disadvantage   |
| Maximum | 60 ft+ (weapon) | Cannot attack  |

---

## Resolve & Death

- **0 Resolve:** Unconscious + Dying. One-minute timer begins. Make a stabilization roll each turn.
- **Negative max Resolve:** Instant death — stabilization not possible.
- **Healing while downed:** Resolve = amount healed from 0 (negative debt ignored).

### Stabilization
- **Self:** d20 + Endurance + Willpower + current Resolve ≥ 14 per turn; no repeat penalty.
  On success: Resolve becomes 1, remain Unconscious.
- **Ally:** GM assigns trait + difficulty. Repeat attempt penalty applies on retry.

---

## Magic

### Spellcasting
**d20 + Trait Die + Trait Value + Modifiers** — GM assigns difficulty.

### Spell Damage
**Trait Die + Trait Value + Modifiers − Mitigation** (no weapon die)

### Spell Resolution

| Result              | Outcome                                                    |
|---------------------|------------------------------------------------------------|
| Succeed by 5+       | Spend Resonance; refunded 1 after resolution               |
| Succeed (< 5)       | Spend Resonance; spell works as intended                   |
| Fail by 5 or less   | Spend Resonance; spell occurs with unintended result (GM)  |
| Fail by more than 5 | Spend Resonance; spell backfires (GM)                      |

Resonance is always spent regardless of outcome.

### Healing (Magical)
Min 1 Resonance. Amount: **Trait Die + Trait Value**. Each additional Resonance: +1 Trait Die.

### Casting from Resolve
If no Resonance remains, spend Resolve instead. Decide before casting. Cannot reduce Resolve to 0.

### Resonance Recovery
**Rest** (once per adventuring day) or **Sleep** (end of day): recover all Resonance.

---

## Resonance Upgrades

| Upgrade            | Cost & Effect                                                                            |
|--------------------|------------------------------------------------------------------------------------------|
| Area               | 1 Res = +5 ft diameter (1×1 → 2×2 → 3×3…)                                               |
| Additional Targets | 1 Res = +1 target                                                                        |
| Damage             | 1 Res = +1 Trait Die (same die as spell's trait)                                         |
| Accuracy           | 1 Res = +2 accuracy; 2 Res = advantage                                                   |
| Force              | 1 Res = +10 ft (or doubles if spell already moves); each additional doubles (10→20→40…); cost per application = target size in tiles |
| Permanence         | 3 Res = lasts the battle; 5 Res = lasts the day                                          |
| Bypass             | 2 Res = bypass resistance; 4 Res = bypass immunity                                       |

**Duration** — 1 Res per step up from instant:

| Step | Duration                        | Step | Duration  |
|------|---------------------------------|------|-----------|
| 1    | Until end of target's next turn | 6    | 1 week    |
| 2    | 1 minute                        | 7    | 1 month   |
| 3    | 10 minutes                      | 8    | 1 year    |
| 4    | 1 hour                          | 9    | Permanent |
| 5    | 1 day                           |      |           |

**Range** — 1 Res per step: Melee → 15 ft → 30 ft → 60 ft. Beyond 60 ft: GM discussion required.

**Speed (Casting Time)** — Base = Major Action. Each Res spent reduces cast time by one step toward instant. 1 Res past Major Action = Minor Adjustment.
