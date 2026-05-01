# Combat

## Structure
Combat is a series of rounds. Each round is broken into turns.

---

## Turn Order
- Turn order is **decided collaboratively by the players** at the start of each round, including the first round.
- Before the round begins, the GM declares how many **turn slots** the adversaries require that round. Players then arrange all turns — their own and the enemies' — in any order they choose.
- Each character (PC and NPC) takes **exactly one turn per round**, unless the GM specifies otherwise.
- Certain creatures (bosses, multi-headed creatures, etc.) may take more than one turn per round at GM discretion.
- The character who **acts last** in a round **automatically acts first** in the next round.
  - If that last-acting character is an **enemy**, they receive **advantage** on their first Major Action of the following round.
- **Surprised** characters go last in the round and do not automatically act first in the following round, regardless of the above rule.

---

## Structure of a Turn
Each turn consists of three parts, which may occur in **any order** unless otherwise restricted:

1. **Movement**
2. **Minor Adjustment**
3. **Major Action**

---

## Movement
- A character may move up to their **total movement speed** per turn.
- Movement may be split around other actions.
- Movement cannot exceed total speed in a single turn.

### Melee Range
Standard melee threat range is **5 feet** (adjacent tiles). A character automatically threatens hostile creatures within melee range, unless unaware of them (unconscious, hidden, etc.).

### Range Bands (Ranged Weapons)
| Band    | Distance              | Effect on Ranged Attack     |
|---------|-----------------------|-----------------------------|
| Melee   | 0–5 ft                | Disadvantage                |
| Close   | 5–30 ft               | Normal                      |
| Far     | 30–60 ft              | Disadvantage                |
| Maximum | 60 ft+ (weapon-dependent) | Cannot attack beyond this |

---

## Minor Adjustment
A player may describe interesting narrative flavor in exchange for a small mechanical advantage at GM discretion.

### Examples
- Dipping a blade in poison to apply ongoing damage or status effects.
- Swinging harder for more potential damage at the cost of accuracy.
- Preparing a stance that trades damage for greater defense.

---

## Major Action
The primary action on a turn. There is no predefined list — the player is limited only by the truth of their situation and the duration of the task. A Major Action must reasonably fit within one turn.

### Examples
- A single attack
- Cast a spell
- Dash
- Dodge
- Manipulate an object

Major Action rules do not apply if time is situationally irrelevant and the action can occur uninterrupted.

---

## Attacks

### Attack Roll
**Roll: d20 + Trait Die + Trait Value + Accuracy Modifier + Other Modifiers**

The attack hits if the result meets or exceeds the target's Defense (Physical or Mental, depending on attack type).

### Damage
**Damage = Weapon Die + Trait Die + Trait Value + Modifiers − Target's Mitigation**

- Hit damage is never reduced below **1**, unless the GM rules otherwise.
- The attack type (physical vs. mental) determines which defense is targeted and which mitigation applies.

### Area Attacks
- Roll **damage once**.
- Make **separate attack rolls** for each target in the area.

---

## Resolve in Combat
*(Full resource rules in [Traits](02-traits.md#resolve).)*

- At **0 Resolve:** the character falls **Unconscious** and gains the **Dying** condition. The one-minute timer begins and the character makes a stabilization roll on each of their turns.
- A character may continue to accrue damage while unconscious, as long as the damage type can reasonably affect an unconscious creature.
- If Resolve reaches the **negative of its maximum value**, the character dies instantly — no stabilization is possible.

### Stabilization

An unconscious character makes a **self-stabilization roll** on each of their turns:

**Roll: d20 + Endurance + Willpower + current Resolve ≥ 14**

Current Resolve may be 0 or negative — the deeper into negatives, the harder the roll.

- The repeated attempt penalty does **not** apply to self-stabilization rolls.
- On success, the character stabilizes: Resolve becomes 1. They remain **Unconscious**.

**Allied stabilization:** Another character may attempt to stabilize the downed character instead (trait and difficulty determined by the GM). The repeated attempt penalty **does** apply if the same ally fails and retries.

**Healing:** If a downed character receives healing, their Resolve is set to the amount healed, starting from 0 — negative Resolve debt is ignored. A character healed for 3 goes to Resolve 3 regardless of how far below 0 they were.
