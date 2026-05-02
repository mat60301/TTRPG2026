# Monster Creation

## Overview

Monsters do not use the player character formulas. Instead, the GM assigns six flat stats directly. This keeps monster prep fast and lets the GM tune encounters by feel rather than by math.

The quick build tables in this document give ready-to-use numbers for Easy, Medium, and Hard monsters at levels 1–5. They are starting points, not hard rules — adjust any value to fit the creature's fiction.

---

## Monster Stat Block

| Field | Description |
|-------|-------------|
| **Defense** | The number a player's attack roll must meet or beat to hit. Flat value — no formula. |
| **Mitigation** | Damage reduction applied to every hit. Physical attacks reduce against this value; mental attacks do too unless the GM rules otherwise. |
| **Resolve** | Total damage the monster can absorb. When it reaches 0, the monster is defeated (or dying, at GM discretion). |
| **Attack Bonus** | Flat modifier added to the monster's d20 roll when attacking. The monster hits if d20 + Attack Bonus ≥ target's Defense. |
| **Damage** | Die expression rolled on a successful hit (e.g. `d8+3`). Subtract the target's relevant Mitigation. Minimum 1. |
| **Speed** | Movement per turn, in feet. |

**Attack roll:** d20 + Attack Bonus ≥ target's Defense (Physical or Mental, based on the attack type)

**Damage per hit:** Damage roll − target's Mitigation (minimum 1)

Decide when creating the monster whether it attacks physically (targets Physical Defense) or mentally (targets Mental Defense). Most combat creatures are physical. Psionic or fear-based monsters are mental.

### Example: Goblin Scout

| Defense | Mitigation | Resolve | Attack Bonus | Damage | Speed |
|---------|------------|---------|--------------|--------|-------|
| 10 | 0 | 10 | +2 | d6 | 25 ft |

*Physical attack. Goblin scouts swarm in packs — use 3–4 for a meaningful level 1 encounter.*

### Spellcasting Monsters

Add a **Resonance pool** (typically 3–8 for a standard caster, 10–20 for a boss). The monster spends Resonance to enhance effects just as a player would.

For spell attacks, use the same Attack Bonus targeting Mental Defense. For damage, the die expression already accounts for the monster's "trait" — no separate trait die calculation needed. Area spells follow the core rule: roll damage once, make a separate attack roll per target.

---

## Quick Build Tables

### Reading the Resolve Range

The Resolve column shows a range (e.g. 14–22):
- **Lower end** — use when deploying this monster as part of a group. It should drop in 3–5 focused player hits.
- **Upper end** — use for a solo encounter against the full party. Designed to last 5–7 rounds.

### Scaling Beyond Level 5

Each additional level: Defense +1, Attack Bonus +1 to +2. Resolve grows roughly 20–30% per tier per level. Keep Hard tier Mitigation at 5–6 — see design notes below.

---

### Level 1

| Difficulty | Defense | Mitigation | Resolve | Attack Bonus | Damage | Speed |
|-----------|---------|------------|---------|--------------|--------|-------|
| Easy | 10 | 0 | 8–12 | +2 | d6 | 25 ft |
| Medium | 13 | 2 | 14–22 | +4 | d8+2 | 25 ft |
| Hard | 16 | 4 | 28–45 | +6 | d10+3 | 30 ft |

### Level 2

| Difficulty | Defense | Mitigation | Resolve | Attack Bonus | Damage | Speed |
|-----------|---------|------------|---------|--------------|--------|-------|
| Easy | 11 | 1 | 10–16 | +3 | d6+1 | 25 ft |
| Medium | 14 | 3 | 20–30 | +5 | d8+3 | 30 ft |
| Hard | 18 | 4 | 34–54 | +7 | d10+4 | 30 ft |

### Level 3

| Difficulty | Defense | Mitigation | Resolve | Attack Bonus | Damage | Speed |
|-----------|---------|------------|---------|--------------|--------|-------|
| Easy | 12 | 1 | 13–20 | +4 | d8 | 25 ft |
| Medium | 15 | 3 | 26–40 | +6 | d10+3 | 30 ft |
| Hard | 19 | 5 | 40–62 | +8 | d12+4 | 30 ft |

### Level 4

| Difficulty | Defense | Mitigation | Resolve | Attack Bonus | Damage | Speed |
|-----------|---------|------------|---------|--------------|--------|-------|
| Easy | 13 | 2 | 16–26 | +5 | d8+2 | 30 ft |
| Medium | 16 | 4 | 34–52 | +7 | d10+4 | 30 ft |
| Hard | 21 | 5 | 48–74 | +10 | 2d8+4 | 35 ft |

### Level 5

| Difficulty | Defense | Mitigation | Resolve | Attack Bonus | Damage | Speed |
|-----------|---------|------------|---------|--------------|--------|-------|
| Easy | 14 | 2 | 20–32 | +6 | d8+3 | 30 ft |
| Medium | 17 | 5 | 44–68 | +8 | d12+4 | 30 ft |
| Hard | 22 | 6 | 58–88 | +11 | 2d10+5 | 35 ft |

---

## Encounter Design Guidelines

### Monster Count by Difficulty

| Target Difficulty | Composition |
|------------------|-------------|
| Easy encounter | 4–6 Easy monsters, or 2–3 Easy + 1 Medium |
| Medium encounter | 2–3 Medium monsters, or 1 Medium + 3–4 Easy |
| Hard encounter | 1 Hard monster (solo boss), or 1 Medium + 2–3 Medium, or 2 Hard |

These are baselines for a party of 3–4. Larger parties can handle one additional monster per extra player.

### Action Economy

More monsters means more turns, which is harder regardless of individual stats. A group of 5 Easy monsters at level 1 is genuinely threatening not because each one is dangerous, but because they all act before the party can focus them down. When you want a tense fight, add monsters. When you want a dramatic single-threat encounter, raise the stats and go solo.

### Mixing Tiers

Mixing is encouraged. A single Medium monster leading a group of Easy monsters creates natural focus-fire decisions for the party. The boss survives longer because players must split attention. One rule of thumb: the highest-tier monster in the encounter sets the overall difficulty feel.

### Conditions

Any monster can apply a condition on hit — this is a narrative add-on, not a stat change. Choose a condition that fits the creature (see `09-conditions.md`) and decide when building the monster whether it applies on every hit, on a natural 18+, or only when the GM declares a special attack. No mechanical adjustment to the stat block is required.

---

## Customization Options

### Resistances and Immunities

Assign freely. A fire elemental is immune to fire damage. An undead might be resistant to physical damage (halve it after mitigation) but vulnerable to radiant or holy attacks. These are GM calls — no formula required.

### Multi-Attack

Hard-tier monsters may take two attacks per turn instead of one. Use this sparingly — it roughly doubles offensive pressure. When using multi-attack, reduce the damage die by one step per attack (e.g. `2d10+5` becomes two attacks of `d10+5`) to avoid single-turn knockouts.

### Area Attacks

Already covered in the core rules: roll damage once, make a separate attack roll for each target in the area. Use the monster's standard Attack Bonus and Damage for both rolls. A breath weapon, tremor, or sweeping strike all work this way.

### Boss Traits (Foreshadowing)

Full boss mechanics (legendary actions, phase transitions, reactive abilities) are a design space for future expansion. For now, the easiest way to make a boss feel distinct is to give it the upper end of the Hard Resolve range, multi-attack, and one conditional ability triggered by narrative (e.g. "when first bloodied, the dragon takes flight and becomes untargetable by melee for one round").

---

## NPC Creation

*This section is a placeholder — to be written in a future session.*

NPCs (named characters, allies, rivals, merchants with combat stats) will use a simplified version of character creation rather than the monster quick build. They may have trait values, class modifiers, and equipment. Details to be defined after playtesting establishes what level of NPC complexity is needed at the table.
