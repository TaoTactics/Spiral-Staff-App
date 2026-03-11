#!/usr/bin/env node
// Import service users from CSV into the app database
// Usage: node import-sus.js

const Database = require('better-sqlite3');
const fs = require('fs');

const CSV_FILE = '/var/www/spiral-tracker/uploads/1773230572943-Clients_-_2026_Responses.csv';
const DB_PATH = '/var/www/spiral-tracker/spiral-data.db';

// ── CSV parser (handles quoted fields with embedded newlines/commas) ──────────
function parseCSV(text) {
  const rows = [];
  let row = [], field = '', inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i], nx = text[i + 1];
    if (inQuotes) {
      if (ch === '"' && nx === '"') { field += '"'; i++; }
      else if (ch === '"') { inQuotes = false; }
      else { field += ch; }
    } else {
      if (ch === '"') { inQuotes = true; }
      else if (ch === ',') { row.push(field.trim()); field = ''; }
      else if (ch === '\n' || ch === '\r') {
        if (ch === '\r' && nx === '\n') i++;
        row.push(field.trim()); rows.push(row); row = []; field = '';
      } else { field += ch; }
    }
  }
  if (field || row.length > 0) { row.push(field.trim()); rows.push(row); }
  return rows;
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 7); }

// Clean junk/empty-equivalent values
function clean(v) {
  if (!v) return '';
  const t = v.trim();
  if (['no email', 'no mobile', 'no phone', 'no address', 'n/a', 'na', 'none',
       'nil', '-', 'no', ''].includes(t.toLowerCase())) return '';
  return t;
}

// Convert DD/MM/YYYY → YYYY-MM-DD
function parseDOB(v) {
  const m = (v || '').trim().match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  return m ? `${m[3]}-${m[2].padStart(2,'0')}-${m[1].padStart(2,'0')}` : clean(v);
}

function isYes(v) { return (v || '').trim().toLowerCase() === 'yes'; }

// Return detail text if yes/no col says yes, otherwise ''
function det(yesNoCol, detailCol) {
  return isYes(yesNoCol) ? (clean(detailCol) || 'Yes') : '';
}

// ── Column index map (0-based) ─────────────────────────────────────────────────
// Row 0 = headers, Row 1 = blank, Rows 2+ = data
const C = {
  firstName: 5, middleNames: 6, surname: 7,
  dob: 12, addr: 8, town: 9, pc: 10, ph: 11, em: 13,
  pn: 25, lang: 26, lang2: 27, household: 28, awayExp: 29,
  specialPeople: 30, celebrates: 31, importantEvents: 32,
  excites: 33, favActivities: 34, outdoors: 35, routines: 36,
  angryTriggers: 37, comfortThings: 38, goodAt: 39, needsHelp: 40,
  comm: 41, newPeople: 42, disappointment: 43,
  usualEat: 44, favFoods: 45, favDrinks: 46, dislikes: 47,
  goals: 48, med: 49, beh: 50, diet: 51, allg: 52,
  surg: 53, gp: 54, clinicAddr: 55, clinicContact: 56, clinicPhone: 57,
  vhYN: 58, vhDet: 59, mYN: 60, mDet: 61,
  dsYN: 62, dsXray: 63,
  eYN: 64, eFreq: 65, eMed: 66, eAdd: 67,
  diYN: 68, diFreq: 69, diMed: 70, diAdd: 71,
  aYN: 72, aFreq: 73, aMed: 74, aHosp: 75, aAdd: 76,
  hYN: 77, hClinic: 78, hPrec: 79,
  otherMedYN: 80, otherMedDet: 81,
  hospYN: 82, hospDet: 83,
  foodAllergyYN: 84, foodAllergyDet: 85,
  vegetarian: 86, otherDietReq: 87, otherDietDet: 88,
  agYN: 89, agDet: 90,
  shYN: 91, shDet: 92,
  inappropriateYN: 93, inappropriateDet: 94,
  walkOffYN: 95, walkOffDet: 96,
  walkDiffYN: 97, walkDiffDet: 98,
  toiletingYN: 99, toiletingDet: 100,
  snoreYN: 101, snoreDet: 102,
  otherSupportYN: 103, otherSupportDet: 104,
  maType: 107, signedBy: 110,
  co: 14, cn: 15, chp: 16, cm: 17, cem: 18, cadr: 19, cadr2: 20,
  ec1: 21, ep1: 22, ec2: 23, ep2: 24,
};

function rowToSU(cols) {
  const c = i => (cols[i] || '').trim();

  const name = [c(C.firstName), c(C.middleNames), c(C.surname)].filter(Boolean).join(' ');
  if (!name) return null;

  const flags = [];
  if (isYes(c(C.vhYN)))   flags.push('V/H');
  if (isYes(c(C.mYN)))    flags.push('M');
  if (isYes(c(C.dsYN)))   flags.push('DS');
  if (isYes(c(C.eYN)))    flags.push('E');
  if (isYes(c(C.diYN)))   flags.push('Di');
  if (isYes(c(C.aYN)))    flags.push('A');
  if (isYes(c(C.hYN)))    flags.push('H');
  if (isYes(c(C.agYN)))   flags.push('Ag');
  if (isYes(c(C.shYN)))   flags.push('SH');
  if (isYes(c(C.walkOffYN)))   flags.push('WO');
  if (isYes(c(C.walkDiffYN)))  flags.push('WD');
  if (isYes(c(C.toiletingYN))) flags.push('T');

  const su = { id: uid(), name, flags, days: [] };
  const set = (k, v) => { const val = v; if (val) su[k] = val; };

  set('pn',           clean(c(C.pn)));
  set('dob',          parseDOB(c(C.dob)));
  set('addr',         clean(c(C.addr)));
  set('town',         clean(c(C.town)));
  set('pc',           clean(c(C.pc)));
  set('ph',           clean(c(C.ph)));
  set('em',           clean(c(C.em)));
  set('lang',         clean(c(C.lang)));
  set('lang2',        clean(c(C.lang2)));
  set('household',    clean(c(C.household)));
  set('awayExp',      clean(c(C.awayExp)));
  set('specialPeople',clean(c(C.specialPeople)));
  set('celebrates',   clean(c(C.celebrates)));
  set('importantEvents', clean(c(C.importantEvents)));
  set('excites',      clean(c(C.excites)));
  set('favActivities',clean(c(C.favActivities)));
  set('outdoors',     clean(c(C.outdoors)));
  set('routines',     clean(c(C.routines)));
  set('angryTriggers',clean(c(C.angryTriggers)));
  set('comfortThings',clean(c(C.comfortThings)));
  set('goodAt',       clean(c(C.goodAt)));
  set('needsHelp',    clean(c(C.needsHelp)));
  set('comm',         clean(c(C.comm)));
  set('newPeople',    clean(c(C.newPeople)));
  set('disappointment', clean(c(C.disappointment)));
  set('usualEat',     clean(c(C.usualEat)));
  set('favFoods',     clean(c(C.favFoods)));
  set('favDrinks',    clean(c(C.favDrinks)));
  set('dislikes',     clean(c(C.dislikes)));
  set('goals',        clean(c(C.goals)));
  set('med',          clean(c(C.med)));
  set('beh',          clean(c(C.beh)));
  set('diet',         clean(c(C.diet)));
  set('allg',         clean(c(C.allg)));
  set('surg',         clean(c(C.surg)));
  set('gp',           clean(c(C.gp)));
  set('clinicAddr',   clean(c(C.clinicAddr)));
  set('clinicContact',clean(c(C.clinicContact)));
  set('clinicPhone',  clean(c(C.clinicPhone)));
  set('vhDetails',    clean(c(C.vhDet)));
  set('mobilityDetails', clean(c(C.mDet)));
  set('dsXray',       clean(c(C.dsXray)));
  set('epilepsyFreq', clean(c(C.eFreq)));
  set('epilepsyMed',  clean(c(C.eMed)));
  set('epilepsyAdd',  clean(c(C.eAdd)));
  set('diabetesFreq', clean(c(C.diFreq)));
  set('diabetesMed',  clean(c(C.diMed)));
  set('diabetesAdd',  clean(c(C.diAdd)));
  set('asthmaFreq',   clean(c(C.aFreq)));
  set('asthmaMed',    clean(c(C.aMed)));
  set('asthmaHosp',   clean(c(C.aHosp)));
  set('asthmaAdd',    clean(c(C.aAdd)));
  set('heartClinic',  clean(c(C.hClinic)));
  set('heartPrecautions', clean(c(C.hPrec)));
  set('otherMed',     det(c(C.otherMedYN), c(C.otherMedDet)));
  set('hospitalHistory', det(c(C.hospYN), c(C.hospDet)));
  set('foodAllergyDet', det(c(C.foodAllergyYN), c(C.foodAllergyDet)));
  set('vegetarian',   isYes(c(C.vegetarian)) ? 'Yes' : '');
  set('otherDietReq', [clean(c(C.otherDietReq)), clean(c(C.otherDietDet))].filter(Boolean).join(' — '));
  set('aggressiveDet',  det(c(C.agYN), c(C.agDet)));
  set('selfHarmDet',    det(c(C.shYN), c(C.shDet)));
  set('inappropriateDet', det(c(C.inappropriateYN), c(C.inappropriateDet)));
  set('walkOffDet',    det(c(C.walkOffYN), c(C.walkOffDet)));
  set('walkDiffDet',   det(c(C.walkDiffYN), c(C.walkDiffDet)));
  set('toiletingDet',  det(c(C.toiletingYN), c(C.toiletingDet)));
  set('snoreDet',      det(c(C.snoreYN), c(C.snoreDet)));
  set('otherSupportDet', det(c(C.otherSupportYN), c(C.otherSupportDet)));
  set('co',   clean(c(C.co)));
  set('cn',   clean(c(C.cn)));
  set('chp',  clean(c(C.chp)));
  set('cm',   clean(c(C.cm)));
  set('cem',  clean(c(C.cem)));
  set('cadr', clean(c(C.cadr)) || clean(c(C.cadr2)));
  set('ec1',  clean(c(C.ec1)));
  set('ep1',  clean(c(C.ep1)));
  set('ec2',  clean(c(C.ec2)));
  set('ep2',  clean(c(C.ep2)));
  set('maType',   clean(c(C.maType)));
  set('signedBy', clean(c(C.signedBy)));

  return su;
}

// ── Main ──────────────────────────────────────────────────────────────────────
const csvText = fs.readFileSync(CSV_FILE, 'utf8');
const rows = parseCSV(csvText);
console.log(`Parsed ${rows.length} total rows`);

// Skip header (row 0) and blank row (row 1)
const dataRows = rows.slice(2).filter(r => r.some(v => v.trim()));
console.log(`Data rows: ${dataRows.length}`);

const newSUs = dataRows.map(rowToSU).filter(Boolean);
console.log(`\nService users parsed from CSV:`);
newSUs.forEach(su => console.log(`  ✓ ${su.name} | flags: [${su.flags.join(', ') || 'none'}] | dob: ${su.dob || '?'}`));

// Load DB
const db = new Database(DB_PATH);
const row = db.prepare('SELECT data FROM app_data WHERE id = 1').get();
if (!row) { console.error('No app_data found'); process.exit(1); }

const appData = JSON.parse(row.data);
const existing = appData.serviceUsers || [];
console.log(`\nExisting service users in database: ${existing.length}`);

const existingNames = new Set(existing.map(s => s.name.toLowerCase().trim()));
const toAdd    = newSUs.filter(s => !existingNames.has(s.name.toLowerCase().trim()));
const toUpdate = newSUs.filter(s =>  existingNames.has(s.name.toLowerCase().trim()));

// Merge: CSV data wins for all fields, but preserve existing id/days/notes
const updated = existing.map(ex => {
  const match = toUpdate.find(s => s.name.toLowerCase().trim() === ex.name.toLowerCase().trim());
  if (!match) return ex;
  // Spread CSV data over existing, but keep id and preserve days/notes if already set
  return Object.assign({}, match, {
    id: ex.id,
    days: ex.days && ex.days.length ? ex.days : (match.days || []),
  });
});

if (toUpdate.length) console.log(`Updated: ${toUpdate.map(s => s.name).join(', ')}`);
console.log(`Adding: ${toAdd.map(s => s.name).join(', ')}`);

appData.serviceUsers = [...updated, ...toAdd];
const jsonStr = JSON.stringify(appData);

db.prepare(`INSERT INTO app_data (id, data, updated_at) VALUES (1, ?, datetime('now'))
  ON CONFLICT(id) DO UPDATE SET data = ?, updated_at = datetime('now')`).run(jsonStr, jsonStr);
db.prepare('INSERT INTO backups (data) VALUES (?)').run(jsonStr);

console.log(`\n✓ Done. Added ${toAdd.length} service users.`);
db.close();
