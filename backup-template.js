// Generates a self-contained offline HTML backup of all app data.
// The output is a single file with embedded CSS, JS, and data — opens in any browser, no server needed.

function esc(s) {
  if (!s) return '';
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function generateOfflineBackup(appData, users, generatedAt) {
  const data = appData || {};
  const serviceUsers = data.serviceUsers || [];
  const staffProfiles = data.staffProfiles || [];
  const staff = data.staff || [];
  const departments = data.departments || [];
  const schedule = data.schedule || [];
  const rota = data.rota || {};
  const driverRota = data.driverRota || {};
  const weekSchedules = data.weekSchedules || {};
  const registers = data.registers || {};
  const fossData = data.fossData || { departments: [], staffProfiles: [], contacts: [], completedLog: [] };
  const incidents = data.incidents || [];
  const minibusAllocation = data.minibusAllocation || {};
  const history = data.history || [];

  const DAYS = ['mon', 'tue', 'wed', 'thu', 'fri'];
  const DAY_NAMES = { mon: 'Monday', tue: 'Tuesday', wed: 'Wednesday', thu: 'Thursday', fri: 'Friday' };
  const ROOMS = ['Radio', 'Media', 'Green Room', 'Art', 'Band', 'Outing', 'Training', 'Office'];
  const FLAG_INFO = {
    'E': 'Epilepsy', 'M': 'Mobility', 'V/H': 'Visual/Hearing', 'Di': 'Diabetes',
    'WO': 'Wanders Off', 'WD': 'Wheelchair Dependent', 'Ag': 'Aggression',
    'SH': 'Self Harm', 'T': 'Toileting', 'Al': 'Allergy'
  };

  // Build Service Users table
  let suRows = '';
  serviceUsers.forEach(su => {
    const flags = (su.flags || []).map(f => FLAG_INFO[f] || f).join(', ');
    suRows += `<tr>
      <td><strong>${esc(su.name)}</strong>${su.pn ? ' (' + esc(su.pn) + ')' : ''}</td>
      <td>${esc(flags)}</td>
      <td>${esc(su.dob)}</td>
      <td>${esc(su.ph)}</td>
      <td>${esc(su.cn)}${su.cm ? '<br>' + esc(su.cm) : ''}${su.co ? '<br><em>' + esc(su.co) + '</em>' : ''}</td>
      <td>${esc(su.ec1)}${su.ep1 ? '<br>' + esc(su.ep1) : ''}</td>
      <td>${esc(su.med)}</td>
      <td>${esc(su.ma)}</td>
      <td>${esc(su.diet)}${su.allg ? '<br><strong>Allergy:</strong> ' + esc(su.allg) : ''}</td>
      <td>${esc(su.gp)}${su.surg ? '<br>' + esc(su.surg) : ''}</td>
    </tr>`;
  });

  // Build Staff table
  let staffRows = '';
  staffProfiles.forEach(sp => {
    staffRows += `<tr>
      <td><strong>${esc(sp.name)}</strong></td>
      <td>${esc(sp.role)}</td>
      <td>${esc(sp.phone)}</td>
      <td>${esc(sp.email)}</td>
      <td>${esc(sp.emergency)}</td>
      <td>${esc(sp.notes)}</td>
    </tr>`;
  });

  // Build Schedule table
  let schedRows = '';
  schedule.forEach(sess => {
    const days = DAYS.filter(d => sess[d]).map(d => DAY_NAMES[d]).join(', ');
    const suList = (sess.sus || []).map(s => esc(typeof s === 'string' ? s : s.name || s.id || '')).join(', ');
    schedRows += `<tr>
      <td><strong>${esc(sess.name || '')}</strong></td>
      <td>${esc(sess.period || '')}</td>
      <td>${days}</td>
      <td>${sess.spaces || ''}</td>
      <td>${suList}</td>
    </tr>`;
  });

  // Build Rota table — room × day × period grid
  let rotaHtml = '';
  if (Object.keys(rota).length > 0) {
    // Find the week key(s) — use the latest
    const weeks = [...new Set(Object.keys(rota).map(k => k.split('|')[0]))].sort();
    const wk = weeks[weeks.length - 1] || '';
    rotaHtml += `<p class="meta">Week: ${esc(wk)}</p>`;
    rotaHtml += '<table><thead><tr><th>Room</th>';
    DAYS.forEach(d => { rotaHtml += `<th>${DAY_NAMES[d]} AM</th><th>${DAY_NAMES[d]} PM</th>`; });
    rotaHtml += '</tr></thead><tbody>';
    ROOMS.forEach(room => {
      rotaHtml += `<tr><td><strong>${esc(room)}</strong></td>`;
      DAYS.forEach(d => {
        ['am', 'pm'].forEach(p => {
          const key = `${wk}|${room}|${d}|${p}`;
          const names = rota[key] || [];
          rotaHtml += `<td>${names.map(n => esc(n)).join('<br>') || '—'}</td>`;
        });
      });
      rotaHtml += '</tr>';
    });
    rotaHtml += '</tbody></table>';
  } else {
    rotaHtml = '<p class="empty">No rota data.</p>';
  }

  // Build Driver Rota
  let driverHtml = '';
  if (Object.keys(driverRota).length > 0) {
    const weeks = [...new Set(Object.keys(driverRota).map(k => k.split('|')[0]))].sort();
    const wk = weeks[weeks.length - 1] || '';
    const ROUTES = ['East Sussex', 'West Sussex', 'Hove', 'Brighton'];
    const SHIFTS = ['am', 'pm', 'eve', 'return'];
    driverHtml += `<p class="meta">Week: ${esc(wk)}</p>`;
    driverHtml += '<table><thead><tr><th>Route</th>';
    DAYS.forEach(d => SHIFTS.forEach(s => { driverHtml += `<th>${DAY_NAMES[d]} ${s.toUpperCase()}</th>`; }));
    driverHtml += '</tr></thead><tbody>';
    ROUTES.forEach(route => {
      driverHtml += `<tr><td><strong>${esc(route)}</strong></td>`;
      DAYS.forEach(d => SHIFTS.forEach(s => {
        const key = `${wk}|${route}|${d}|${s}`;
        const val = driverRota[key] || {};
        const txt = val.driver ? `${esc(val.driver)}${val.minibus ? ' (' + esc(val.minibus) + ')' : ''}` : '—';
        driverHtml += `<td>${txt}</td>`;
      }));
      driverHtml += '</tr>';
    });
    driverHtml += '</tbody></table>';
  } else {
    driverHtml = '<p class="empty">No driver rota data.</p>';
  }

  // Build Minibus allocation
  let minibusHtml = '';
  const mbWeeks = Object.keys(minibusAllocation);
  if (mbWeeks.length > 0) {
    const wk = mbWeeks.sort().pop();
    const wkData = minibusAllocation[wk] || {};
    DAYS.forEach(d => {
      const dayData = wkData[d];
      if (!dayData || Object.keys(dayData).length === 0) return;
      minibusHtml += `<h4>${DAY_NAMES[d]}</h4><table><thead><tr><th>Service User</th><th>Pickup Route</th><th>Return Route</th><th>Notes</th></tr></thead><tbody>`;
      Object.entries(dayData).forEach(([suId, info]) => {
        const su = serviceUsers.find(s => s.id === suId);
        minibusHtml += `<tr>
          <td>${esc(su ? su.name : suId)}</td>
          <td>${esc(info.pickupRoute || '—')}</td>
          <td>${esc(info.returnRoute || '—')}</td>
          <td>${esc(info.notes || '')}</td>
        </tr>`;
      });
      minibusHtml += '</tbody></table>';
    });
    if (!minibusHtml) minibusHtml = '<p class="empty">No minibus allocations for the latest week.</p>';
  } else {
    minibusHtml = '<p class="empty">No minibus data.</p>';
  }

  // Build Departments table
  let deptHtml = '';
  departments.forEach(dept => {
    const tasks = dept.tasks || [];
    const done = tasks.filter(t => t.done).length;
    const pct = tasks.length ? Math.round(done / tasks.length * 100) : 0;
    deptHtml += `<h4>${esc(dept.emoji || '')} ${esc(dept.name)} — ${pct}% (${done}/${tasks.length})</h4>`;
    if (tasks.length) {
      deptHtml += '<table><thead><tr><th>Task</th><th>Priority</th><th>Assignee</th><th>Status</th></tr></thead><tbody>';
      tasks.forEach(t => {
        deptHtml += `<tr>
          <td>${esc(t.text)}</td>
          <td>${esc(t.priority || 'med')}</td>
          <td>${esc(t.assignee || '—')}</td>
          <td>${t.done ? '✅ Done' : '⬜ To Do'}</td>
        </tr>`;
      });
      deptHtml += '</tbody></table>';
    }
  });
  if (!deptHtml) deptHtml = '<p class="empty">No departments.</p>';

  // Build FOSS section
  let fossHtml = '';
  const fossDepts = fossData.departments || [];
  const fossStaff = fossData.staffProfiles || [];
  const fossContacts = fossData.contacts || [];
  if (fossDepts.length) {
    fossHtml += '<h4>Departments</h4>';
    fossDepts.forEach(dept => {
      const tasks = dept.tasks || [];
      const done = tasks.filter(t => t.done).length;
      fossHtml += `<h5>${esc(dept.name)} — ${done}/${tasks.length}</h5>`;
      if (tasks.length) {
        fossHtml += '<table><thead><tr><th>Task</th><th>Priority</th><th>Assignee</th><th>Status</th></tr></thead><tbody>';
        tasks.forEach(t => {
          fossHtml += `<tr><td>${esc(t.text)}</td><td>${esc(t.priority || 'med')}</td><td>${esc(t.assignee || '—')}</td><td>${t.done ? '✅' : '⬜'}</td></tr>`;
        });
        fossHtml += '</tbody></table>';
      }
    });
  }
  if (fossStaff.length) {
    fossHtml += '<h4>Team</h4><table><thead><tr><th>Name</th><th>Role</th><th>Phone</th><th>Email</th></tr></thead><tbody>';
    fossStaff.forEach(s => {
      fossHtml += `<tr><td>${esc(s.name)}</td><td>${esc(s.role)}</td><td>${esc(s.phone)}</td><td>${esc(s.email)}</td></tr>`;
    });
    fossHtml += '</tbody></table>';
  }
  if (fossContacts.length) {
    fossHtml += '<h4>Contacts</h4><table><thead><tr><th>Name</th><th>Org</th><th>Role</th><th>Phone</th><th>Email</th></tr></thead><tbody>';
    fossContacts.forEach(c => {
      fossHtml += `<tr><td>${esc(c.name)}</td><td>${esc(c.org)}</td><td>${esc(c.role)}</td><td>${esc(c.phone)}</td><td>${esc(c.email)}</td></tr>`;
    });
    fossHtml += '</tbody></table>';
  }
  if (!fossHtml) fossHtml = '<p class="empty">No FOSS data.</p>';

  // Build Incidents table
  let incRows = '';
  incidents.forEach(inc => {
    incRows += `<tr>
      <td>${esc(inc.date)}</td>
      <td>${esc(inc.time)}</td>
      <td>${esc(inc.type)}</td>
      <td>${esc(inc.severity)}</td>
      <td>${esc(inc.status)}</td>
      <td>${(inc.suNames || []).map(n => esc(n)).join(', ')}</td>
      <td>${esc(inc.description)}</td>
      <td>${esc(inc.actionTaken)}</td>
    </tr>`;
  });

  // Build Users table
  let userRows = '';
  (users || []).forEach(u => {
    userRows += `<tr><td>${esc(u.username)}</td><td>${esc(u.role)}</td></tr>`;
  });

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Spiral Sussex — Offline Backup — ${esc(generatedAt)}</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#f8f9fa;color:#1a1a1a;line-height:1.5}
.header{background:linear-gradient(135deg,#1F2937,#374151);color:white;padding:20px 24px}
.header h1{font-size:20px;font-weight:700}
.header .meta{font-size:12px;opacity:0.7;margin-top:4px}
.toolbar{display:flex;gap:8px;padding:12px 24px;background:white;border-bottom:1px solid #e5e7eb;flex-wrap:wrap;align-items:center}
.tab{padding:6px 14px;border:none;border-radius:8px;font-size:13px;font-weight:600;cursor:pointer;background:#f3f4f6;color:#6b7280}
.tab.on{background:#1F2937;color:white}
.search{padding:6px 12px;border:1px solid #d1d5db;border-radius:8px;font-size:13px;flex:1;min-width:200px;max-width:400px}
.content{padding:16px 24px;max-width:100%;overflow-x:auto}
.tab-panel{display:none}
.tab-panel.on{display:block}
table{width:100%;border-collapse:collapse;margin:8px 0 16px;font-size:12px}
th,td{padding:6px 8px;text-align:left;border:1px solid #e5e7eb;vertical-align:top}
th{background:#f9fafb;font-weight:700;font-size:11px;text-transform:uppercase;color:#6b7280;white-space:nowrap}
tr:nth-child(even){background:#fafafa}
tr.hidden{display:none}
h3{font-size:16px;font-weight:700;margin:16px 0 8px;color:#1F2937}
h4{font-size:14px;font-weight:700;margin:14px 0 6px;color:#374151}
h5{font-size:13px;font-weight:600;margin:10px 0 4px;color:#4b5563}
.empty{color:#9ca3af;font-style:italic;padding:12px 0}
.meta{color:#6b7280;font-size:12px;margin-bottom:8px}
.footer{padding:16px 24px;text-align:center;font-size:11px;color:#9ca3af;border-top:1px solid #e5e7eb;margin-top:24px}
.count{font-size:12px;color:#6b7280;margin-bottom:8px}
@media print{
  .toolbar{display:none}
  .tab-panel{display:block!important;page-break-before:always}
  .tab-panel:first-of-type{page-break-before:auto}
  .header{background:#1F2937!important;-webkit-print-color-adjust:exact;print-color-adjust:exact}
  table{font-size:10px}
  th,td{padding:3px 5px}
}
@media(max-width:768px){
  table{font-size:11px}
  th,td{padding:4px 6px}
  .content{padding:12px}
}
</style>
</head>
<body>
<div class="header">
  <h1>🌀 Spiral Sussex — Offline Backup</h1>
  <div class="meta">Generated: ${esc(generatedAt)} · This is a read-only backup. Open in any browser — no internet required.</div>
</div>
<div class="toolbar">
  <button class="tab on" onclick="showTab('sus')">Service Users (${serviceUsers.length})</button>
  <button class="tab" onclick="showTab('staff')">Staff (${staffProfiles.length})</button>
  <button class="tab" onclick="showTab('sched')">Schedule (${schedule.length})</button>
  <button class="tab" onclick="showTab('rota')">Rota</button>
  <button class="tab" onclick="showTab('minibus')">Minibus</button>
  <button class="tab" onclick="showTab('depts')">Departments (${departments.length})</button>
  <button class="tab" onclick="showTab('foss')">FOSS</button>
  <button class="tab" onclick="showTab('incidents')">Incidents (${incidents.length})</button>
  <button class="tab" onclick="showTab('users')">Users (${(users || []).length})</button>
  <input class="search" type="text" placeholder="Search..." oninput="filterRows(this.value)">
</div>
<div class="content">

  <div id="tab-sus" class="tab-panel on">
    <h3>Service Users</h3>
    <div class="count">${serviceUsers.length} record(s)</div>
    ${serviceUsers.length ? `<table><thead><tr>
      <th>Name</th><th>Flags</th><th>DOB</th><th>Phone</th><th>Carer / Org</th><th>Emergency</th><th>Medical</th><th>Medication Admin</th><th>Diet / Allergies</th><th>GP / Surgery</th>
    </tr></thead><tbody>${suRows}</tbody></table>` : '<p class="empty">No service user records.</p>'}
  </div>

  <div id="tab-staff" class="tab-panel">
    <h3>Staff Profiles</h3>
    <div class="count">${staffProfiles.length} profile(s)</div>
    ${staffProfiles.length ? `<table><thead><tr>
      <th>Name</th><th>Role</th><th>Phone</th><th>Email</th><th>Emergency Contact</th><th>Notes</th>
    </tr></thead><tbody>${staffRows}</tbody></table>` : '<p class="empty">No staff profiles.</p>'}
  </div>

  <div id="tab-sched" class="tab-panel">
    <h3>Schedule</h3>
    <div class="count">${schedule.length} session(s)</div>
    ${schedule.length ? `<table><thead><tr>
      <th>Session</th><th>Period</th><th>Days</th><th>Spaces</th><th>Service Users</th>
    </tr></thead><tbody>${schedRows}</tbody></table>` : '<p class="empty">No schedule data.</p>'}
  </div>

  <div id="tab-rota" class="tab-panel">
    <h3>Room Rota</h3>
    ${rotaHtml}
    <h3>Driver Rota</h3>
    ${driverHtml}
  </div>

  <div id="tab-minibus" class="tab-panel">
    <h3>Minibus Allocations</h3>
    ${minibusHtml}
  </div>

  <div id="tab-depts" class="tab-panel">
    <h3>Departments</h3>
    ${deptHtml}
  </div>

  <div id="tab-foss" class="tab-panel">
    <h3>FOSS — Friends of Spiral Sussex</h3>
    ${fossHtml}
  </div>

  <div id="tab-incidents" class="tab-panel">
    <h3>Incidents</h3>
    <div class="count">${incidents.length} record(s)</div>
    ${incidents.length ? `<table><thead><tr>
      <th>Date</th><th>Time</th><th>Type</th><th>Severity</th><th>Status</th><th>SUs Involved</th><th>Description</th><th>Action Taken</th>
    </tr></thead><tbody>${incRows}</tbody></table>` : '<p class="empty">No incidents recorded.</p>'}
  </div>

  <div id="tab-users" class="tab-panel">
    <h3>User Accounts</h3>
    <div class="count">${(users || []).length} account(s)</div>
    ${(users || []).length ? `<table><thead><tr><th>Username</th><th>Role</th></tr></thead><tbody>${userRows}</tbody></table>` : '<p class="empty">No users.</p>'}
  </div>

</div>
<div class="footer">Spiral Sussex Tracker — Offline Backup — ${esc(generatedAt)} — Read-only, no server required</div>
<script>
function showTab(id){
  document.querySelectorAll('.tab-panel').forEach(function(p){p.classList.remove('on')});
  document.querySelectorAll('.tab').forEach(function(t){t.classList.remove('on')});
  var el=document.getElementById('tab-'+id);
  if(el)el.classList.add('on');
  var tabs=document.querySelectorAll('.tab');
  for(var i=0;i<tabs.length;i++){if(tabs[i].textContent.toLowerCase().indexOf(id)===0||tabs[i].getAttribute('onclick').indexOf("'"+id+"'")!==-1)tabs[i].classList.add('on')}
  document.querySelector('.search').value='';
  filterRows('');
}
function filterRows(q){
  q=q.toLowerCase().trim();
  var active=document.querySelector('.tab-panel.on');
  if(!active)return;
  var rows=active.querySelectorAll('tbody tr');
  for(var i=0;i<rows.length;i++){
    if(!q){rows[i].classList.remove('hidden');continue}
    rows[i].classList.toggle('hidden',rows[i].textContent.toLowerCase().indexOf(q)===-1);
  }
}
</script>
</body>
</html>`;
}

module.exports = { generateOfflineBackup };
