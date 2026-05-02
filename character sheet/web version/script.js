'use strict';

// =====================
// LOOKUP TABLES
// =====================

const WEAPON_STATS = {
  simple:   { dmg: 'd4',   mainAcc: '+2', offAcc: '+0' },
  light:    { dmg: 'd6',   mainAcc: '+1', offAcc: '−3' },
  standard: { dmg: 'd8',   mainAcc: '+0', offAcc: '−6' },
  heavy:    { dmg: 'd10',  mainAcc: '−1', offAcc: '—' },
  brutal:   { dmg: 'd12',  mainAcc: '−2', offAcc: '—' },
  unarmed:  { dmg: 'None', mainAcc: '+4', offAcc: '+3' },
};

const ARMOR_STATS = {
  none:     { defMod: +2, mit: 0 },
  light:    { defMod:  0, mit: 2 },
  standard: { defMod: -1, mit: 3 },
  heavy:    { defMod: -2, mit: 4 },
  bulwark:  { defMod: -4, mit: 6 },
};

const SHIELD_STATS = {
  none:   { def: 0 },
  small:  { def: 1 },
  medium: { def: 2 },
  large:  { def: 4 },
};

// =====================
// HELPERS
// =====================

function getInt(id, fallback = 0) {
  const el = document.getElementById(id);
  if (!el) return fallback;
  const v = parseInt(el.value, 10);
  return isNaN(v) ? fallback : v;
}

function getText(id) {
  const el = document.getElementById(id);
  return el ? el.value : '';
}

function setText(id, val) {
  const el = document.getElementById(id);
  if (el) el.textContent = val;
}

function setValue(id, val) {
  const el = document.getElementById(id);
  if (el) el.value = val;
}

function fmtMod(n) {
  return n >= 0 ? '+' + n : '−' + Math.abs(n);
}

// =====================
// DERIVED STATS
// =====================

function updateDerivedStats() {
  const level = getInt('level', 1);

  // Traits
  const str = getInt('trait-strength-val');
  const spd = getInt('trait-speed-val');
  const fin = getInt('trait-finesse-val');
  const end = getInt('trait-endurance-val');
  const bal = getInt('trait-balance-val');
  const tou = getInt('trait-toughness-val');
  const kno = getInt('trait-knowledge-val');
  const wis = getInt('trait-wisdom-val');
  const cha = getInt('trait-charisma-val');
  const wil = getInt('trait-willpower-val');
  const awr = getInt('trait-awareness-val');
  const emp = getInt('trait-empathy-val');

  // Trait points tracker
  const total = str + spd + fin + end + bal + tou + kno + wis + cha + wil + awr + emp;
  const pointsEl = document.getElementById('trait-points-used');
  if (pointsEl) {
    pointsEl.textContent = total;
    pointsEl.classList.toggle('over-limit', total > 20);
  }
  const warningEl = document.getElementById('trait-points-warning');
  if (warningEl) warningEl.classList.toggle('hidden', total <= 20);

  // Equipment
  const armorCat   = getText('armor-cat')   || 'none';
  const shieldSize  = getText('shield-size') || 'none';
  const charmCat    = getText('charm-cat')   || 'none';

  const armor  = ARMOR_STATS[armorCat]  ?? ARMOR_STATS.none;
  const shield = SHIELD_STATS[shieldSize] ?? SHIELD_STATS.none;
  const charm  = ARMOR_STATS[charmCat]  ?? ARMOR_STATS.none;

  // Class bonuses
  const bPhysDef   = getInt('bonus-phys-def');
  const bMentDef   = getInt('bonus-ment-def');
  const bPhysMit   = getInt('bonus-phys-mit');
  const bMentMit   = getInt('bonus-ment-mit');
  const bResolve   = getInt('bonus-resolve');
  const bResonance = getInt('bonus-resonance');
  const bSpeed     = getInt('bonus-speed');

  // Training bonuses (equipment-conditional class mod bonuses)
  const training = getTrainingBonuses();

  // Formulas
  const physDef    = 8 + end + bal + level + armor.defMod + shield.def + bPhysDef + training.physDef;
  const mentDef    = 8 + wil + awr + level + charm.defMod + bMentDef + training.mentDef;
  const physMit    = tou + armor.mit + bPhysMit + training.physMit;
  const mentMit    = emp + charm.mit + bMentMit + training.mentMit;
  const resolveMax = (end * wil) + level + bResolve;
  const resonanceMax = emp + bal + level + bResonance;
  const combatSpeed  = 20 + Math.floor(spd / 2) * 5 + bSpeed;
  const ocSpeed      = combatSpeed * 2;

  // Write derived stat displays
  setText('stat-phys-def',    physDef);
  setText('stat-ment-def',    mentDef);
  setText('stat-phys-mit',    physMit);
  setText('stat-ment-mit',    mentMit);
  setText('stat-resolve-max', resolveMax);
  setText('stat-speed', combatSpeed + ' / ' + ocSpeed + ' ft');
  setText('stat-resonance-max', resonanceMax);
}

// =====================
// WEAPON STATS
// =====================

function updateWeaponStats(n) {
  const cat = getText('weapon-' + n + '-cat');
  const stats = WEAPON_STATS[cat];
  if (stats) {
    setText('weapon-' + n + '-dmg',      stats.dmg);
    setText('weapon-' + n + '-main-acc', stats.mainAcc);
    setText('weapon-' + n + '-off-acc',  stats.offAcc);
  } else {
    setText('weapon-' + n + '-dmg',      '—');
    setText('weapon-' + n + '-main-acc', '—');
    setText('weapon-' + n + '-off-acc',  '—');
  }
}

// =====================
// ARMOR / SHIELD / CHARM DISPLAY
// =====================

function updateArmorDisplay() {
  const cat   = getText('armor-cat') || 'none';
  const stats = ARMOR_STATS[cat] ?? ARMOR_STATS.none;
  setText('armor-def-mod', fmtMod(stats.defMod));
  setText('armor-mit',     fmtMod(stats.mit));
}

function updateShieldDisplay() {
  const size  = getText('shield-size') || 'none';
  const stats = SHIELD_STATS[size] ?? SHIELD_STATS.none;
  setText('shield-def-bonus', fmtMod(stats.def));
}

function updateCharmDisplay() {
  const cat   = getText('charm-cat') || 'none';
  const stats = ARMOR_STATS[cat] ?? ARMOR_STATS.none;
  setText('charm-def-mod', fmtMod(stats.defMod));
  setText('charm-mit',     fmtMod(stats.mit));
}

// =====================
// MAGIC TOGGLE
// =====================

function toggleMagic(checked) {
  const content = document.getElementById('magic-content');
  const resonanceRow = document.getElementById('resonance-row');
  if (!content) return;
  if (checked) {
    content.classList.remove('magic-collapsed');
    content.classList.add('magic-expanded');
    if (resonanceRow) resonanceRow.style.display = '';
  } else {
    content.classList.add('magic-collapsed');
    content.classList.remove('magic-expanded');
    if (resonanceRow) resonanceRow.style.display = 'none';
  }
}

// =====================
// SPECIALIZATIONS
// =====================

let specCount = 0;

function addSpecialization(data) {
  const list = document.getElementById('spec-list');
  const empty = document.getElementById('spec-empty');
  if (!list) return;

  const id = specCount++;
  const row = document.createElement('div');
  row.className = 'spec-row';
  row.dataset.specId = id;

  row.innerHTML =
    '<input type="text" class="spec-circ" id="spec-' + id + '-circ" placeholder="When..." value="' + escAttr(data?.circ ?? '') + '">' +
    '<select class="spec-type-select" id="spec-' + id + '-type">' +
      '<option value="Combat"' + (data?.type === 'Combat' || !data ? ' selected' : '') + '>Combat</option>' +
      '<option value="Role-Play"' + (data?.type === 'Role-Play' ? ' selected' : '') + '>Role-Play</option>' +
    '</select>' +
    '<button class="remove-btn" title="Remove" onclick="removeSpecialization(this)">×</button>';

  list.appendChild(row);
  if (empty) empty.classList.add('hidden');
}

function removeSpecialization(btn) {
  const row = btn.closest('.spec-row');
  if (row) row.remove();
  const list = document.getElementById('spec-list');
  const empty = document.getElementById('spec-empty');
  if (empty && list && list.children.length === 0) empty.classList.remove('hidden');
  scheduleAutoSave();
}

// =====================
// FOUNDATIONAL EFFECTS
// =====================

let effectCount = 0;

function addFoundationalEffect(data) {
  const list = document.getElementById('effect-list');
  const empty = document.getElementById('effect-empty');
  if (!list) return;

  const id = effectCount++;
  const row = document.createElement('div');
  row.className = 'effect-row';
  row.dataset.effectId = id;

  row.innerHTML =
    '<input type="text" class="effect-name-input" id="effect-' + id + '-name" placeholder="Effect name" value="' + escAttr(data?.name ?? '') + '">' +
    '<input type="text" class="effect-desc-input" id="effect-' + id + '-desc" placeholder="Description..." value="' + escAttr(data?.desc ?? '') + '">' +
    '<button class="remove-btn" title="Remove" onclick="removeFoundationalEffect(this)">×</button>';

  list.appendChild(row);
  if (empty) empty.classList.add('hidden');
}

function removeFoundationalEffect(btn) {
  const row = btn.closest('.effect-row');
  if (row) row.remove();
  const list = document.getElementById('effect-list');
  const empty = document.getElementById('effect-empty');
  if (empty && list && list.children.length === 0) empty.classList.remove('hidden');
  scheduleAutoSave();
}

function escAttr(str) {
  return String(str).replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// =====================
// JSON EXPORT
// =====================

const STATIC_FIELDS = [
  'char-name', 'player-name', 'species', 'level', 'class-name',
  'origin-story', 'ultimate-fantasy', 'reason-adventuring',
  'trait-strength-val', 'trait-strength-die',
  'trait-speed-val', 'trait-speed-die',
  'trait-finesse-val', 'trait-finesse-die',
  'trait-endurance-val', 'trait-endurance-die',
  'trait-balance-val', 'trait-balance-die',
  'trait-toughness-val', 'trait-toughness-die',
  'trait-knowledge-val', 'trait-knowledge-die',
  'trait-wisdom-val', 'trait-wisdom-die',
  'trait-charisma-val', 'trait-charisma-die',
  'trait-willpower-val', 'trait-willpower-die',
  'trait-awareness-val', 'trait-awareness-die',
  'trait-empathy-val', 'trait-empathy-die',
  'bonus-phys-def', 'bonus-ment-def', 'bonus-phys-mit', 'bonus-ment-mit',
  'bonus-phys-dmg', 'bonus-mag-dmg', 'bonus-phys-attack', 'bonus-ment-attack',
  'bonus-resolve', 'bonus-resonance', 'bonus-speed',
  'resolve-current', 'resonance-current',
  'class-mod-1-type', 'class-mod-1-detail', 'class-mod-1-category',
  'class-mod-2-type', 'class-mod-2-detail', 'class-mod-2-category',
  'class-mod-3-type', 'class-mod-3-detail', 'class-mod-3-category',
  'weapon-1-name', 'weapon-1-cat', 'weapon-1-notes',
  'weapon-2-name', 'weapon-2-cat', 'weapon-2-notes',
  'armor-name', 'armor-cat',
  'shield-name', 'shield-size',
  'charm-name', 'charm-cat',
  'other-gear',
  'is-magical', 'magic-domain',
  'condition-1', 'condition-2', 'condition-3',
  'condition-4', 'condition-5', 'condition-6',
  'notes',
];

function collectStaticFields() {
  const data = {};
  for (const id of STATIC_FIELDS) {
    const el = document.getElementById(id);
    if (!el) continue;
    data[id] = el.type === 'checkbox' ? el.checked : el.value;
  }
  return data;
}

function collectSpecializations() {
  const rows = document.querySelectorAll('#spec-list .spec-row');
  return Array.from(rows).map(row => {
    const id = row.dataset.specId;
    return {
      circ: document.getElementById('spec-' + id + '-circ')?.value ?? '',
      type: document.getElementById('spec-' + id + '-type')?.value ?? 'Combat',
    };
  });
}

function collectEffects() {
  const rows = document.querySelectorAll('#effect-list .effect-row');
  return Array.from(rows).map(row => {
    const id = row.dataset.effectId;
    return {
      name: document.getElementById('effect-' + id + '-name')?.value ?? '',
      desc: document.getElementById('effect-' + id + '-desc')?.value ?? '',
    };
  });
}

// =====================
// LOCAL STORAGE AUTO-SAVE
// =====================

const LS_KEY = 'ttrpg-character';

function saveToLocalStorage() {
  const payload = {
    ...collectStaticFields(),
    _specializations: collectSpecializations(),
    _effects: collectEffects(),
  };
  try { localStorage.setItem(LS_KEY, JSON.stringify(payload)); } catch (_) {}
}

function loadFromLocalStorage() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) applyImport(JSON.parse(raw));
  } catch (_) {}
}

let _autoSaveTimer;
function scheduleAutoSave() {
  clearTimeout(_autoSaveTimer);
  _autoSaveTimer = setTimeout(saveToLocalStorage, 400);
}

function exportJSON() {
  const charName = getText('char-name') || 'character';
  const date = new Date().toISOString().slice(0, 10);
  const filename = 'character-' + charName.replace(/\s+/g, '-').toLowerCase() + '-' + date + '.json';

  const payload = {
    ...collectStaticFields(),
    _specializations: collectSpecializations(),
    _effects: collectEffects(),
  };

  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

// =====================
// JSON IMPORT
// =====================

function importJSON(input) {
  const file = input.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    try {
      const data = JSON.parse(e.target.result);
      applyImport(data);
    } catch (err) {
      alert('Failed to load character file: ' + err.message);
    }
    input.value = '';
  };
  reader.readAsText(file);
}

function applyImport(data) {
  // Restore static fields
  for (const id of STATIC_FIELDS) {
    if (!(id in data)) continue;
    const el = document.getElementById(id);
    if (!el) continue;
    if (el.type === 'checkbox') {
      el.checked = !!data[id];
    } else {
      el.value = data[id];
    }
  }

  // Magic toggle
  const isMagical = document.getElementById('is-magical');
  if (isMagical) toggleMagic(isMagical.checked);

  // Rebuild specializations
  const specList = document.getElementById('spec-list');
  if (specList) {
    specList.innerHTML = '';
    specCount = 0;
    const specEmpty = document.getElementById('spec-empty');
    if (specEmpty) specEmpty.classList.remove('hidden');
  }
  if (Array.isArray(data._specializations)) {
    for (const s of data._specializations) addSpecialization(s);
  }

  // Rebuild foundational effects
  const effectList = document.getElementById('effect-list');
  if (effectList) {
    effectList.innerHTML = '';
    effectCount = 0;
    const effectEmpty = document.getElementById('effect-empty');
    if (effectEmpty) effectEmpty.classList.remove('hidden');
  }
  if (Array.isArray(data._effects)) {
    for (const ef of data._effects) addFoundationalEffect(ef);
  }

  // Restore training slot UI (populate dropdowns, show/hide inputs)
  for (let i = 1; i <= 3; i++) {
    updateClassModSlot(i);
    const catEl = document.getElementById('class-mod-' + i + '-category');
    const catVal = data['class-mod-' + i + '-category'];
    if (catEl && catVal) catEl.value = catVal;
  }

  // Refresh all displays
  updateWeaponStats(1);
  updateWeaponStats(2);
  updateArmorDisplay();
  updateShieldDisplay();
  updateCharmDisplay();
  updateClassModifierBonuses();
  saveToLocalStorage();
}

// =====================
// REST / SLEEP
// =====================

function getFirstConditionIndex() {
  for (let i = 1; i <= 6; i++) {
    if (getText('condition-' + i).trim()) return i;
  }
  return -1;
}

function buildRestChanges() {
  const resolveMax = parseInt(document.getElementById('stat-resolve-max')?.textContent, 10) || 0;
  const resolveCurrent = getInt('resolve-current');
  const missing = resolveMax - resolveCurrent;
  const gain = Math.ceil(missing / 2);
  const resolveNew = Math.min(resolveCurrent + gain, resolveMax);

  const isMagical = !!document.getElementById('is-magical')?.checked;
  const resonanceMax = parseInt(document.getElementById('stat-resonance-max')?.textContent, 10) || 0;
  const resonanceCurrent = getInt('resonance-current');

  return {
    resolve:   { current: resolveCurrent, next: resolveNew, max: resolveMax },
    resonance: isMagical ? { current: resonanceCurrent, next: resonanceMax, max: resonanceMax } : null,
  };
}

function buildSleepChanges() {
  const resolveMax = parseInt(document.getElementById('stat-resolve-max')?.textContent, 10) || 0;
  const resolveCurrent = getInt('resolve-current');

  const isMagical = !!document.getElementById('is-magical')?.checked;
  const resonanceMax = parseInt(document.getElementById('stat-resonance-max')?.textContent, 10) || 0;
  const resonanceCurrent = getInt('resonance-current');

  const condIdx = getFirstConditionIndex();
  const condVal = condIdx >= 0 ? getText('condition-' + condIdx).trim() : null;

  return {
    resolve:   { current: resolveCurrent, next: resolveMax, max: resolveMax },
    resonance: isMagical ? { current: resonanceCurrent, next: resonanceMax, max: resonanceMax } : null,
    condition: condVal ? { index: condIdx, value: condVal } : null,
  };
}

let _rsPendingType = null;

function showRestSleepModal(type) {
  _rsPendingType = type;
  const isRest = type === 'rest';
  const changes = isRest ? buildRestChanges() : buildSleepChanges();
  const accent = isRest ? '#2e6b4a' : '#4a3d7c';

  document.getElementById('rs-modal-title').textContent = isRest ? 'Rest' : 'Sleep';
  document.getElementById('rs-modal-header').style.background = accent;

  document.getElementById('rs-modal-rules').innerHTML = isRest
    ? '<strong>Once per adventuring day.</strong><br>Recover half of missing Resolve (rounded up).<br>Recover all Resonance.'
    : '<strong>End of adventuring day.</strong><br>Recover all Resolve.<br>Recover all Resonance.<br>Remove one ongoing condition.';

  const confirmBtn = document.getElementById('rs-modal-confirm');
  confirmBtn.textContent = isRest ? 'Confirm Rest' : 'Confirm Sleep';
  confirmBtn.style.background = accent;
  confirmBtn.style.borderColor = accent;
  confirmBtn.style.color = '#fff';

  function vd(curr, max) { return curr + ' / ' + max; }

  let rows = '';

  const rv = changes.resolve;
  const resolveChanged = rv.next !== rv.current;
  rows += '<tr>' +
    '<td class="rs-stat-label">Resolve</td>' +
    '<td class="rs-stat-before">' + vd(rv.current, rv.max) + '</td>' +
    '<td class="rs-stat-arrow">→</td>' +
    '<td class="rs-stat-after' + (resolveChanged ? '' : ' rs-no-change') + '">' +
      (resolveChanged ? vd(rv.next, rv.max) : 'Already full') +
    '</td></tr>';

  if (changes.resonance) {
    const res = changes.resonance;
    const resChanged = res.next !== res.current;
    rows += '<tr>' +
      '<td class="rs-stat-label">Resonance</td>' +
      '<td class="rs-stat-before">' + vd(res.current, res.max) + '</td>' +
      '<td class="rs-stat-arrow">→</td>' +
      '<td class="rs-stat-after' + (resChanged ? '' : ' rs-no-change') + '">' +
        (resChanged ? vd(res.next, res.max) : 'Already full') +
      '</td></tr>';
  }

  if (!isRest) {
    const cond = changes.condition;
    rows += '<tr>' +
      '<td class="rs-stat-label">Condition</td>' +
      '<td class="rs-stat-before">' + (cond ? '“' + escAttr(cond.value) + '”' : '—') + '</td>' +
      '<td class="rs-stat-arrow">→</td>' +
      '<td class="rs-stat-after ' + (cond ? 'rs-condition-remove' : 'rs-no-change') + '">' +
        (cond ? 'cleared' : 'none active') +
      '</td></tr>';
  }

  document.getElementById('rs-modal-changes').innerHTML =
    '<table class="rs-changes-table"><tbody>' + rows + '</tbody></table>';

  document.getElementById('rs-modal').classList.add('visible');
}

function hideRsModal() {
  document.getElementById('rs-modal').classList.remove('visible');
  _rsPendingType = null;
}

function performRest() {
  const changes = buildRestChanges();
  setValue('resolve-current', changes.resolve.next);
  if (changes.resonance) setValue('resonance-current', changes.resonance.next);
  scheduleAutoSave();
}

function performSleep() {
  const changes = buildSleepChanges();
  setValue('resolve-current', changes.resolve.next);
  if (changes.resonance) setValue('resonance-current', changes.resonance.next);
  if (changes.condition) setValue('condition-' + changes.condition.index, '');
  scheduleAutoSave();
}

// =====================
// FORMULA MODAL
// =====================

const FORMULA_MAP = {
  'stat-phys-def':      'phys-def',
  'stat-ment-def':      'ment-def',
  'stat-phys-mit':      'phys-mit',
  'stat-ment-mit':      'ment-mit',
  'stat-resolve-max':   'resolve',
  'stat-speed':         'speed',
  'stat-resonance-max': 'resonance',
  'weapon-1-dmg':       'weapon-1-dmg',
  'weapon-1-main-acc':  'weapon-1-acc',
  'weapon-1-off-acc':   'weapon-1-off',
  'weapon-2-dmg':       'weapon-2-dmg',
  'weapon-2-main-acc':  'weapon-2-acc',
  'weapon-2-off-acc':   'weapon-2-off',
  'armor-def-mod':      'armor-def',
  'armor-mit':          'armor-mit',
  'shield-def-bonus':   'shield-def',
  'charm-def-mod':      'charm-def',
  'charm-mit':          'charm-mit',
  'display-mh-attack':        'mh-attack',
  'display-mh-weapon-dmg':    'weapon-1-dmg',
  'display-mh-dmg':           'mh-dmg',
  'display-oh-attack':        'oh-attack',
  'display-oh-weapon-dmg':    'weapon-2-dmg',
  'display-oh-dmg':           'oh-dmg',
  'display-ment-attack':      'ment-attack',
  'display-mag-dmg':          'mag-dmg',
};

let _fmHoverTimer;
let _fmState = 'closed';

function buildFormulaContent(key) {
  const level = getInt('level', 1);
  const end = getInt('trait-endurance-val');
  const bal = getInt('trait-balance-val');
  const tou = getInt('trait-toughness-val');
  const wil = getInt('trait-willpower-val');
  const awr = getInt('trait-awareness-val');
  const emp = getInt('trait-empathy-val');
  const spd = getInt('trait-speed-val');

  const armorCat   = getText('armor-cat')   || 'none';
  const shieldSize = getText('shield-size') || 'none';
  const charmCat   = getText('charm-cat')   || 'none';
  const armor    = ARMOR_STATS[armorCat]    ?? ARMOR_STATS.none;
  const shield   = SHIELD_STATS[shieldSize] ?? SHIELD_STATS.none;
  const charm    = ARMOR_STATS[charmCat]    ?? ARMOR_STATS.none;
  const training = getTrainingBonuses();

  const bPhysDef   = getInt('bonus-phys-def');
  const bMentDef   = getInt('bonus-ment-def');
  const bPhysMit   = getInt('bonus-phys-mit');
  const bMentMit   = getInt('bonus-ment-mit');
  const bResolve   = getInt('bonus-resolve');
  const bResonance = getInt('bonus-resonance');
  const bSpeed     = getInt('bonus-speed');

  function r(label, val, note) {
    const noteSpan = note && note !== 'none' ? ' <span class="fm-note">(' + note + ')</span>' : '';
    return '<tr><td>' + label + noteSpan + '</td><td>' + fmtMod(val) + '</td></tr>';
  }
  function tot(val) {
    return '<tr class="total-row"><td>Total</td><td>' + val + '</td></tr>';
  }
  function tbl(rows) {
    return '<table class="formula-breakdown">' + rows + '</table>';
  }

  switch (key) {
    case 'phys-def': {
      let trainingRows = '';
      for (let i = 1; i <= 3; i++) {
        const mType = getText('class-mod-' + i + '-type');
        const mCat  = getText('class-mod-' + i + '-category') || '';
        if (mType === 'Armor Training'  && armorCat   !== 'none' && armorCat   === mCat) trainingRows += r('Armor Training (Mod '  + i + ')', 1);
        if (mType === 'Shield Training' && shieldSize  !== 'none' && shieldSize  === mCat) trainingRows += r('Shield Training (Mod ' + i + ')', 1);
      }
      const total = 8 + end + bal + level + armor.defMod + shield.def + bPhysDef + training.physDef;
      return {
        title: 'Physical Defense',
        eq: '8 + Endurance + Balance + Level\n+ Armor Def Mod + Shield Def + Class Bonus + Training',
        body: tbl(
          '<tr><td>Base</td><td>+8</td></tr>' +
          r('Endurance', end) + r('Balance', bal) +
          r('Level', level) +
          r('Armor Def Mod', armor.defMod, armorCat) +
          r('Shield Def', shield.def, shieldSize) +
          r('Class Bonus', bPhysDef) +
          trainingRows +
          tot(total)
        )
      };
    }
    case 'ment-def': {
      let trainingRows = '';
      for (let i = 1; i <= 3; i++) {
        const mType = getText('class-mod-' + i + '-type');
        const mCat  = getText('class-mod-' + i + '-category') || '';
        if (mType === 'Charm Training' && charmCat !== 'none' && charmCat === mCat) trainingRows += r('Charm Training (Mod ' + i + ')', 1);
      }
      const total = 8 + wil + awr + level + charm.defMod + bMentDef + training.mentDef;
      return {
        title: 'Mental Defense',
        eq: '8 + Willpower + Awareness + Level\n+ Charm Def Mod + Class Bonus + Training',
        body: tbl(
          '<tr><td>Base</td><td>+8</td></tr>' +
          r('Willpower', wil) + r('Awareness', awr) +
          r('Level', level) +
          r('Charm Def Mod', charm.defMod, charmCat) +
          r('Class Bonus', bMentDef) +
          trainingRows +
          tot(total)
        )
      };
    }
    case 'phys-mit': {
      let trainingRows = '';
      for (let i = 1; i <= 3; i++) {
        const mType = getText('class-mod-' + i + '-type');
        const mCat  = getText('class-mod-' + i + '-category') || '';
        if (mType === 'Armor Training' && armorCat !== 'none' && armorCat === mCat) trainingRows += r('Armor Training (Mod ' + i + ')', 1);
      }
      const total = tou + armor.mit + bPhysMit + training.physMit;
      return {
        title: 'Physical Mitigation',
        eq: 'Toughness + Armor Mitigation + Class Bonus + Training',
        body: tbl(
          r('Toughness', tou) +
          r('Armor Mitigation', armor.mit, armorCat) +
          r('Class Bonus', bPhysMit) +
          trainingRows +
          tot(total)
        )
      };
    }
    case 'ment-mit': {
      let trainingRows = '';
      for (let i = 1; i <= 3; i++) {
        const mType = getText('class-mod-' + i + '-type');
        const mCat  = getText('class-mod-' + i + '-category') || '';
        if (mType === 'Charm Training' && charmCat !== 'none' && charmCat === mCat) trainingRows += r('Charm Training (Mod ' + i + ')', 1);
      }
      const total = emp + charm.mit + bMentMit + training.mentMit;
      return {
        title: 'Mental Mitigation',
        eq: 'Empathy + Charm Mitigation + Class Bonus + Training',
        body: tbl(
          r('Empathy', emp) +
          r('Charm Mitigation', charm.mit, charmCat) +
          r('Class Bonus', bMentMit) +
          trainingRows +
          tot(total)
        )
      };
    }
    case 'resolve': {
      const mult = end * wil;
      const total = mult + level + bResolve;
      return {
        title: 'Resolve (Maximum)',
        eq: '(Endurance × Willpower) + Level + Class Bonus',
        body: tbl(
          '<tr><td>Endurance × Willpower (' + end + ' × ' + wil + ')</td><td>+' + mult + '</td></tr>' +
          r('Level', level) +
          r('Class Bonus', bResolve) +
          tot(total)
        )
      };
    }
    case 'speed': {
      const speedBonus = Math.floor(spd / 2) * 5;
      const combatSpeed = 20 + speedBonus + bSpeed;
      const ocSpeed = combatSpeed * 2;
      return {
        title: 'Speed',
        eq: 'Combat: 20 + floor(Speed ÷ 2) × 5 + Class Bonus ft\nOut-of-Combat: Combat × 2',
        body: tbl(
          '<tr><td>Base</td><td>20 ft</td></tr>' +
          '<tr><td>Speed trait (' + spd + ') → floor(' + spd + ' ÷ 2) × 5</td><td>+' + speedBonus + ' ft</td></tr>' +
          '<tr><td>Class Bonus</td><td>+' + bSpeed + ' ft</td></tr>' +
          '<tr class="total-row"><td>Combat Speed</td><td>' + combatSpeed + ' ft</td></tr>' +
          '<tr><td>Out-of-Combat Speed</td><td>' + ocSpeed + ' ft</td></tr>'
        )
      };
    }
    case 'resonance': {
      const total = emp + bal + level + bResonance;
      return {
        title: 'Resonance (Maximum)',
        eq: 'Empathy + Balance + Level + Class Bonus',
        body: tbl(
          r('Empathy', emp) + r('Balance', bal) +
          r('Level', level) +
          r('Class Bonus', bResonance) +
          tot(total)
        )
      };
    }
    case 'weapon-1-dmg':
    case 'weapon-2-dmg': {
      const n = key.startsWith('weapon-1') ? '1' : '2';
      const wCat = getText('weapon-' + n + '-cat');
      const stats = WEAPON_STATS[wCat];
      return {
        title: 'Weapon Stats — ' + (n === '1' ? 'Main Hand' : 'Off Hand'),
        eq: 'Base values determined by weapon category',
        body: stats
          ? '<p class="fm-cat">Category: <strong>' + wCat + '</strong></p>' +
            tbl('<tr><td>Damage Die</td><td>' + stats.dmg + '</td></tr>' +
                '<tr><td>Main-hand Accuracy</td><td>' + stats.mainAcc + '</td></tr>' +
                '<tr><td>Off-hand Accuracy</td><td>' + stats.offAcc + '</td></tr>')
          : '<p class="fm-empty">No weapon category selected.</p>'
      };
    }
    case 'weapon-1-acc':
    case 'weapon-2-acc': {
      const n = key.startsWith('weapon-1') ? '1' : '2';
      const wCat = getText('weapon-' + n + '-cat');
      const stats = WEAPON_STATS[wCat];
      return {
        title: 'Main-hand Accuracy — ' + (n === '1' ? 'Main Hand' : 'Off Hand'),
        eq: 'Base value determined by weapon category',
        body: stats
          ? '<p class="fm-cat">Category: <strong>' + wCat + '</strong></p>' +
            tbl('<tr><td>Main-hand Accuracy</td><td>' + stats.mainAcc + '</td></tr>' +
                '<tr><td>Off-hand Accuracy</td><td>' + stats.offAcc + '</td></tr>' +
                '<tr><td>Damage Die</td><td>' + stats.dmg + '</td></tr>')
          : '<p class="fm-empty">No weapon category selected.</p>'
      };
    }
    case 'weapon-1-off':
    case 'weapon-2-off': {
      const n = key.startsWith('weapon-1') ? '1' : '2';
      const wCat = getText('weapon-' + n + '-cat');
      const stats = WEAPON_STATS[wCat];
      return {
        title: 'Off-hand Accuracy — ' + (n === '1' ? 'Main Hand' : 'Off Hand'),
        eq: 'Base value determined by weapon category',
        body: stats
          ? '<p class="fm-cat">Category: <strong>' + wCat + '</strong></p>' +
            tbl('<tr><td>Off-hand Accuracy</td><td>' + stats.offAcc + '</td></tr>' +
                '<tr><td>Main-hand Accuracy</td><td>' + stats.mainAcc + '</td></tr>' +
                '<tr><td>Damage Die</td><td>' + stats.dmg + '</td></tr>')
          : '<p class="fm-empty">No weapon category selected.</p>'
      };
    }
    case 'armor-def': {
      return {
        title: 'Armor Defense Modifier',
        eq: 'Determined by armor category\nApplies to Physical Defense',
        body: '<p class="fm-cat">Category: <strong>' + armorCat + '</strong></p>' +
          tbl('<tr><td>Defense Modifier</td><td>' + fmtMod(armor.defMod) + '</td></tr>' +
              '<tr><td>Mitigation</td><td>' + fmtMod(armor.mit) + '</td></tr>')
      };
    }
    case 'armor-mit': {
      return {
        title: 'Armor Mitigation',
        eq: 'Determined by armor category\nAdds to Physical Mitigation',
        body: '<p class="fm-cat">Category: <strong>' + armorCat + '</strong></p>' +
          tbl('<tr><td>Mitigation</td><td>' + fmtMod(armor.mit) + '</td></tr>' +
              '<tr><td>Defense Modifier</td><td>' + fmtMod(armor.defMod) + '</td></tr>')
      };
    }
    case 'shield-def': {
      return {
        title: 'Shield Defense Bonus',
        eq: 'Determined by shield size\nApplies to Physical Defense',
        body: '<p class="fm-cat">Size: <strong>' + shieldSize + '</strong></p>' +
          tbl('<tr><td>Defense Bonus</td><td>' + fmtMod(shield.def) + '</td></tr>')
      };
    }
    case 'charm-def': {
      return {
        title: 'Charm Defense Modifier',
        eq: 'Determined by charm category\nApplies to Mental Defense',
        body: '<p class="fm-cat">Category: <strong>' + charmCat + '</strong></p>' +
          tbl('<tr><td>Defense Modifier</td><td>' + fmtMod(charm.defMod) + '</td></tr>' +
              '<tr><td>Mitigation</td><td>' + fmtMod(charm.mit) + '</td></tr>')
      };
    }
    case 'charm-mit': {
      return {
        title: 'Charm Mitigation',
        eq: 'Determined by charm category\nAdds to Mental Mitigation',
        body: '<p class="fm-cat">Category: <strong>' + charmCat + '</strong></p>' +
          tbl('<tr><td>Mitigation</td><td>' + fmtMod(charm.mit) + '</td></tr>' +
              '<tr><td>Defense Modifier</td><td>' + fmtMod(charm.defMod) + '</td></tr>')
      };
    }
    case 'mh-attack': {
      const w1Cat   = getText('weapon-1-cat');
      const w1Stats = WEAPON_STATS[w1Cat];
      const w1Main  = w1Stats ? parseAcc(w1Stats.mainAcc) : null;
      const physAtk = getInt('bonus-phys-attack');
      let rows = '';
      if (w1Main !== null) rows += r('Weapon base accuracy', w1Main, w1Cat);
      for (let i = 1; i <= 3; i++) {
        if (getText('class-mod-' + i + '-type') === 'Physical Attack Bonus')
          rows += r('Class Modifier ' + i + ' (Phys Atk)', 1);
      }
      for (let i = 1; i <= 3; i++) {
        const mType = getText('class-mod-' + i + '-type');
        const mCat  = getText('class-mod-' + i + '-category') || '';
        if (mType === 'Weapon Training' && w1Cat && mCat === w1Cat)
          rows += r('Weapon Training (Mod ' + i + ')', 1, w1Cat);
      }
      return {
        title: 'Main Hand Attack Bonus',
        eq: 'Weapon base accuracy + Physical Attack Bonus (class) + Weapon Training',
        body: tbl(rows + tot(fmtMod(physAtk + training.weapon1Attack + (w1Main ?? 0))))
      };
    }
    case 'mh-dmg': {
      const w1Cat = getText('weapon-1-cat');
      const physDmg = getInt('bonus-phys-dmg');
      let rows = '';
      for (let i = 1; i <= 3; i++) {
        if (getText('class-mod-' + i + '-type') === 'Physical Damage')
          rows += r('Class Modifier ' + i + ' (Phys Dmg)', 1);
      }
      for (let i = 1; i <= 3; i++) {
        const mType = getText('class-mod-' + i + '-type');
        const mCat  = getText('class-mod-' + i + '-category') || '';
        if (mType === 'Weapon Training' && w1Cat && mCat === w1Cat)
          rows += r('Weapon Training (Mod ' + i + ')', 1, w1Cat);
      }
      return {
        title: 'Main Hand Damage Bonus',
        eq: 'Physical Damage Bonus (class) + Weapon Training (main hand)',
        body: tbl(rows + tot(fmtMod(physDmg + training.weapon1Dmg)))
      };
    }
    case 'oh-attack': {
      const w2Cat   = getText('weapon-2-cat');
      const w2Stats = WEAPON_STATS[w2Cat];
      const w2Off   = w2Stats ? parseAcc(w2Stats.offAcc) : null;
      const physAtk = getInt('bonus-phys-attack');
      if (w2Stats && w2Off === null) {
        return {
          title: 'Off Hand Attack Bonus',
          eq: '',
          body: '<p class="fm-cat">Category: <strong>' + w2Cat + '</strong></p>' +
                '<p class="fm-empty">This weapon cannot be used off-hand.</p>'
        };
      }
      let rows = '';
      if (w2Off !== null) rows += r('Weapon base accuracy (off-hand)', w2Off, w2Cat);
      for (let i = 1; i <= 3; i++) {
        if (getText('class-mod-' + i + '-type') === 'Physical Attack Bonus')
          rows += r('Class Modifier ' + i + ' (Phys Atk)', 1);
      }
      for (let i = 1; i <= 3; i++) {
        const mType = getText('class-mod-' + i + '-type');
        const mCat  = getText('class-mod-' + i + '-category') || '';
        if (mType === 'Weapon Training' && w2Cat && mCat === w2Cat)
          rows += r('Weapon Training (Mod ' + i + ')', 1, w2Cat);
      }
      return {
        title: 'Off Hand Attack Bonus',
        eq: 'Weapon base accuracy (off-hand) + Physical Attack Bonus (class) + Weapon Training',
        body: tbl(rows + tot(fmtMod(physAtk + training.weapon2Attack + (w2Off ?? 0))))
      };
    }
    case 'oh-dmg': {
      const w2Cat = getText('weapon-2-cat');
      const physDmg = getInt('bonus-phys-dmg');
      let rows = '';
      for (let i = 1; i <= 3; i++) {
        if (getText('class-mod-' + i + '-type') === 'Physical Damage')
          rows += r('Class Modifier ' + i + ' (Phys Dmg)', 1);
      }
      for (let i = 1; i <= 3; i++) {
        const mType = getText('class-mod-' + i + '-type');
        const mCat  = getText('class-mod-' + i + '-category') || '';
        if (mType === 'Weapon Training' && w2Cat && mCat === w2Cat)
          rows += r('Weapon Training (Mod ' + i + ')', 1, w2Cat);
      }
      return {
        title: 'Off Hand Damage Bonus',
        eq: 'Physical Damage Bonus (class) + Weapon Training (off hand)',
        body: tbl(rows + tot(fmtMod(physDmg + training.weapon2Dmg)))
      };
    }
    case 'ment-attack': {
      const total = getInt('bonus-ment-attack');
      let rows = '';
      for (let i = 1; i <= 3; i++) {
        if (getText('class-mod-' + i + '-type') === 'Mental Attack Bonus')
          rows += r('Class Modifier ' + i, 1);
      }
      return {
        title: 'Mental Attack Bonus',
        eq: 'Sum of Mental Attack Bonus class modifiers',
        body: tbl(rows + tot(fmtMod(total)))
      };
    }
    case 'mag-dmg': {
      const total = getInt('bonus-mag-dmg');
      let rows = '';
      for (let i = 1; i <= 3; i++) {
        if (getText('class-mod-' + i + '-type') === 'Magical Damage')
          rows += r('Class Modifier ' + i, 1);
      }
      return {
        title: 'Magical Damage Bonus',
        eq: 'Sum of Magical Damage class modifiers',
        body: tbl(rows + tot(fmtMod(total)))
      };
    }
    default:
      return { title: 'Formula', eq: '', body: '<p>No formula available.</p>' };
  }
}

function showFormulaModal(key, state) {
  const content = buildFormulaContent(key);
  document.getElementById('formula-modal-title').textContent = content.title;
  const body = document.getElementById('formula-modal-body');
  body.innerHTML =
    (content.eq ? '<div class="formula-eq">' + content.eq.replace(/\n/g, '<br>') + '</div>' : '') +
    content.body;
  document.getElementById('formula-modal').classList.add('visible');
  _fmState = state;
}

function hideFormulaModal() {
  document.getElementById('formula-modal').classList.remove('visible');
  _fmState = 'closed';
}

// =====================
// CLASS MODIFIER AUTO-FILL
// =====================

const CLASS_MOD_BONUSES = {
  'Movement Speed':             { 'bonus-speed':     5 },
  'Physical Damage Mitigation': { 'bonus-phys-mit':  1 },
  'Mental Damage Mitigation':   { 'bonus-ment-mit':  1 },
  'Physical Damage':            { 'bonus-phys-dmg':  1 },
  'Magical Damage':             { 'bonus-mag-dmg':   1 },
  'Physical Attack Bonus':      { 'bonus-phys-attack': 1 },
  'Mental Attack Bonus':        { 'bonus-ment-attack': 1 },
  'Resolve':                    { 'bonus-resolve':   2 },
  'Resonance':                  { 'bonus-resonance': 1 },
};

const AUTO_BONUS_FIELDS = [
  'bonus-speed', 'bonus-phys-mit', 'bonus-ment-mit',
  'bonus-phys-dmg', 'bonus-mag-dmg', 'bonus-phys-attack', 'bonus-ment-attack',
  'bonus-resolve', 'bonus-resonance', 'bonus-phys-def',
];

const TRAINING_CATEGORIES = {
  'Weapon Training': ['simple', 'light', 'standard', 'heavy', 'brutal', 'unarmed'],
  'Armor Training':  ['light', 'standard', 'heavy', 'bulwark'],
  'Charm Training':  ['light', 'standard', 'heavy', 'bulwark'],
  'Shield Training': ['small', 'medium', 'large'],
};

function getTrainingBonuses() {
  const armorCat   = getText('armor-cat')    || 'none';
  const shieldSize = getText('shield-size')  || 'none';
  const charmCat   = getText('charm-cat')    || 'none';
  const w1Cat      = getText('weapon-1-cat') || '';
  const w2Cat      = getText('weapon-2-cat') || '';
  const out = {
    physDef: 0, physMit: 0, mentDef: 0, mentMit: 0,
    weapon1Attack: 0, weapon1Dmg: 0, weapon2Attack: 0, weapon2Dmg: 0,
  };
  for (let i = 1; i <= 3; i++) {
    const type = getText('class-mod-' + i + '-type');
    const cat  = getText('class-mod-' + i + '-category') || '';
    if (!cat) continue;
    if (type === 'Weapon Training') {
      if (w1Cat && w1Cat === cat) { out.weapon1Attack++; out.weapon1Dmg++; }
      if (w2Cat && w2Cat === cat) { out.weapon2Attack++; out.weapon2Dmg++; }
    } else if (type === 'Armor Training') {
      if (armorCat !== 'none' && armorCat === cat) { out.physDef++; out.physMit++; }
    } else if (type === 'Charm Training') {
      if (charmCat !== 'none' && charmCat === cat) { out.mentDef++; out.mentMit++; }
    } else if (type === 'Shield Training') {
      if (shieldSize !== 'none' && shieldSize === cat) { out.physDef++; }
    }
  }
  return out;
}

function updateClassModSlot(i) {
  const type    = getText('class-mod-' + i + '-type');
  const cats    = TRAINING_CATEGORIES[type];
  const detailEl = document.getElementById('class-mod-' + i + '-detail');
  const catEl    = document.getElementById('class-mod-' + i + '-category');
  if (!detailEl || !catEl) return;
  if (cats) {
    const current = catEl.value;
    catEl.innerHTML = '<option value="">— Select —</option>';
    for (const cat of cats) {
      const opt = document.createElement('option');
      opt.value = cat;
      opt.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
      catEl.appendChild(opt);
    }
    if (cats.includes(current)) catEl.value = current;
    detailEl.style.display = 'none';
    catEl.style.display = '';
  } else {
    detailEl.style.display = '';
    catEl.style.display = 'none';
  }
}

function initTrainingSlots() {
  for (let i = 1; i <= 3; i++) updateClassModSlot(i);
}

function parseAcc(str) {
  if (!str || str === '—') return null;
  return parseInt(str.replace('−', '-'), 10);
}

function updateBonusDisplays() {
  const training = getTrainingBonuses();
  const physAtk = getInt('bonus-phys-attack');
  const physDmg = getInt('bonus-phys-dmg');

  const w1Cat   = getText('weapon-1-cat');
  const w1Stats = WEAPON_STATS[w1Cat];
  const w1Main  = w1Stats ? parseAcc(w1Stats.mainAcc) : 0;

  const w2Cat   = getText('weapon-2-cat');
  const w2Stats = WEAPON_STATS[w2Cat];
  const w2Off   = w2Stats ? parseAcc(w2Stats.offAcc) : 0;

  const w1DmgDie = w1Stats ? (w1Stats.dmg === 'None' ? 'None' : '1' + w1Stats.dmg) : '—';
  const w2DmgDie = w2Stats ? (w2Stats.dmg === 'None' ? 'None' : '1' + w2Stats.dmg) : '—';

  setText('display-mh-attack',      fmtMod(physAtk + training.weapon1Attack + (w1Main ?? 0)));
  setText('display-mh-weapon-dmg',  w1DmgDie);
  setText('display-mh-dmg',         fmtMod(physDmg + training.weapon1Dmg));
  setText('display-oh-attack',      w2Stats && w2Off === null ? '—' : fmtMod(physAtk + training.weapon2Attack + (w2Off ?? 0)));
  setText('display-oh-weapon-dmg',  w2DmgDie);
  setText('display-oh-dmg',         fmtMod(physDmg + training.weapon2Dmg));
  setText('display-ment-attack',    fmtMod(getInt('bonus-ment-attack')));
  setText('display-mag-dmg',        fmtMod(getInt('bonus-mag-dmg')));

  const ohSection = document.getElementById('oh-bonus-section');
  if (ohSection) ohSection.style.display = w2Cat ? '' : 'none';
}

function updateClassModifierBonuses() {
  for (const id of AUTO_BONUS_FIELDS) setValue(id, 0);
  for (let i = 1; i <= 3; i++) {
    const bonuses = CLASS_MOD_BONUSES[getText('class-mod-' + i + '-type')];
    if (!bonuses) continue;
    for (const [id, amount] of Object.entries(bonuses)) {
      const el = document.getElementById(id);
      if (el) el.value = (parseInt(el.value, 10) || 0) + amount;
    }
  }
  updateBonusDisplays();
  updateWeaponStats(1);
  updateWeaponStats(2);
  updateDerivedStats();
}

// =====================
// CARD COLLAPSE (MOBILE)
// =====================

function initCardToggles() {
  document.querySelectorAll('.card').forEach(function (card) {
    const header = card.querySelector('.card-header');
    if (!header) return;
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'card-toggle';
    btn.textContent = '▾';
    btn.setAttribute('aria-label', 'Toggle section');
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      const collapsed = card.classList.toggle('collapsed');
      btn.textContent = collapsed ? '▸' : '▾';
    });
    header.appendChild(btn);
  });
}

// =====================
// INIT
// =====================

document.addEventListener('DOMContentLoaded', function () {

  // Export / Import buttons
  document.getElementById('export-btn')?.addEventListener('click', exportJSON);
  document.getElementById('import-btn')?.addEventListener('click', function () {
    document.getElementById('import-file')?.click();
  });
  document.getElementById('import-file')?.addEventListener('change', function () {
    importJSON(this);
  });

  // Add buttons
  document.getElementById('add-spec-btn')?.addEventListener('click', function () {
    addSpecialization();
    scheduleAutoSave();
  });
  document.getElementById('add-effect-btn')?.addEventListener('click', function () {
    addFoundationalEffect();
    scheduleAutoSave();
  });

  // Class modifier dropdowns — handle training category UI and auto-fill bonuses
  for (let i = 1; i <= 3; i++) {
    const idx = i;
    document.getElementById('class-mod-' + idx + '-type')?.addEventListener('change', function () {
      updateClassModSlot(idx);
      updateClassModifierBonuses();
    });
    document.getElementById('class-mod-' + idx + '-category')?.addEventListener('change', updateClassModifierBonuses);
  }

  // Magic toggle
  document.getElementById('is-magical')?.addEventListener('change', function () {
    toggleMagic(this.checked);
  });

  // Weapon category changes
  document.getElementById('weapon-1-cat')?.addEventListener('change', function () {
    updateWeaponStats(1);
    updateBonusDisplays();
  });
  document.getElementById('weapon-2-cat')?.addEventListener('change', function () {
    updateWeaponStats(2);
    updateBonusDisplays();
  });

  // Armor / Shield / Charm category changes (display + derived stats)
  document.getElementById('armor-cat')?.addEventListener('change', function () {
    updateArmorDisplay();
    updateDerivedStats();
  });
  document.getElementById('shield-size')?.addEventListener('change', function () {
    updateShieldDisplay();
    updateDerivedStats();
  });
  document.getElementById('charm-cat')?.addEventListener('change', function () {
    updateCharmDisplay();
    updateDerivedStats();
  });

  // All inputs that affect derived stats — delegate to document
  const DERIVED_INPUTS = [
    'level',
    'trait-strength-val', 'trait-speed-val', 'trait-finesse-val',
    'trait-endurance-val', 'trait-balance-val', 'trait-toughness-val',
    'trait-knowledge-val', 'trait-wisdom-val', 'trait-charisma-val',
    'trait-willpower-val', 'trait-awareness-val', 'trait-empathy-val',
    'bonus-phys-def', 'bonus-ment-def', 'bonus-phys-mit', 'bonus-ment-mit',
    'bonus-resolve', 'bonus-resonance', 'bonus-speed',
  ];

  for (const id of DERIVED_INPUTS) {
    document.getElementById(id)?.addEventListener('input', updateDerivedStats);
  }

  // Auto-save on any input or selection change
  document.addEventListener('input', scheduleAutoSave);
  document.addEventListener('change', scheduleAutoSave);

  // Initial render then restore from localStorage
  updateArmorDisplay();
  updateShieldDisplay();
  updateCharmDisplay();
  updateDerivedStats();

  // Rest / Sleep buttons
  document.getElementById('rest-btn')?.addEventListener('click', function () {
    showRestSleepModal('rest');
  });
  document.getElementById('sleep-btn')?.addEventListener('click', function () {
    showRestSleepModal('sleep');
  });
  document.getElementById('rs-modal-cancel')?.addEventListener('click', hideRsModal);
  document.getElementById('rs-modal-backdrop')?.addEventListener('click', hideRsModal);
  document.getElementById('rs-modal-confirm')?.addEventListener('click', function () {
    if (_rsPendingType === 'rest') performRest();
    else if (_rsPendingType === 'sleep') performSleep();
    hideRsModal();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') hideRsModal();
  });

  // Formula modal — wire up all calculated elements
  for (const [elemId, formulaKey] of Object.entries(FORMULA_MAP)) {
    const el = document.getElementById(elemId);
    if (!el) continue;
    el.classList.add('formula-trigger');

    el.addEventListener('click', function (e) {
      e.stopPropagation();
      clearTimeout(_fmHoverTimer);
      if (_fmState === 'clicked') {
        hideFormulaModal();
      } else {
        showFormulaModal(formulaKey, 'clicked');
      }
    });

    el.addEventListener('mouseenter', function () {
      clearTimeout(_fmHoverTimer);
      if (_fmState !== 'clicked') {
        _fmHoverTimer = setTimeout(function () { showFormulaModal(formulaKey, 'hover'); }, 150);
      }
    });

    el.addEventListener('mouseleave', function () {
      clearTimeout(_fmHoverTimer);
      if (_fmState === 'hover') {
        _fmHoverTimer = setTimeout(hideFormulaModal, 250);
      }
    });
  }

  const fmModal = document.getElementById('formula-modal');
  if (fmModal) {
    fmModal.addEventListener('mouseenter', function () { clearTimeout(_fmHoverTimer); });
    fmModal.addEventListener('mouseleave', function () {
      if (_fmState === 'hover') _fmHoverTimer = setTimeout(hideFormulaModal, 250);
    });
  }

  document.getElementById('formula-modal-close')?.addEventListener('click', function (e) {
    e.stopPropagation();
    hideFormulaModal();
  });

  document.addEventListener('click', function (e) {
    if (_fmState === 'clicked' && fmModal && !fmModal.contains(e.target)) {
      hideFormulaModal();
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') hideFormulaModal();
  });

  initCardToggles();
  initTrainingSlots();
  loadFromLocalStorage();
});
