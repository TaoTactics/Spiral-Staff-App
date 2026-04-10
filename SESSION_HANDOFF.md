# SESSION HANDOFF
Fill in all sections before stopping on an unfinished task.
Clear this file (reset to dashes) once a task is fully complete and committed.

---

## Current objective
- Build comprehensive HR system with staff detail pages, per-record access control, and rota capability badges.

## Completed
- Phase 1: Data model — added hrAccess global, expanded staffProfiles with nested sub-objects (personal, employment, qualifications, capabilities, compliance, health, documents), backfill defaults in applyData() and loadFromLS()
- Phase 2: Staff tab — added Staff tab to Spiral mode tab bar and mobile nav, staff list view with cards, search, capability badges
- Phase 3: Staff detail page — 7 sub-tabs (Personal, Employment, Qualifications, Skills, DBS/Compliance, Health, Documents) with full CRUD
- Phase 4: Rota integration — capability badges shown in rota legend and cell edit popups
- Phase 5: Per-record access control — server endpoints (GET/PATCH /api/staff/:staffId, GET/PUT /api/staff/:staffId/access), frontend access checking, Manage Access modal for superadmins
- Phase 6: Dashboard compliance alerts — expiry warnings for DBS, qualifications, safeguarding, right to work
- Updated backup-template.js with expanded staff columns

## Files changed
- `public/app.js` — new globals, helper functions, Staff tab rendering, detail pages, rota badges
- `public/app.css` — HR form styles, capability badge styles, staff card styles
- `server.js` — canAccessStaffRecord helper, 4 new API endpoints
- `backup-template.js` — expanded staff table in offline backup

## Tests / checks run
- `node --check public/app.js` — pass
- `node --check server.js` — pass
- `node --check backup-template.js` — pass
- `pm2 restart spiral-tracker` — running, no errors
- `curl localhost:3000/api/health` — ok
- `curl -u admin:spiral2026 localhost:3000/api/staff/sp1` — returns 403 (correct, no profiles synced yet)

## Current branch
- `main`

## Next exact step
- Test in browser: log in, verify Staff tab appears, open a profile, test all 7 sub-tabs, verify rota badges work
- Commit and push when confirmed working

## Blockers / notes
- Staff profiles are created via syncStaffFromUsers() which runs when Users tab is loaded — profiles will populate on first visit to Users tab after restart
- Documents sub-tab uses existing /api/files endpoint — no new upload endpoint was needed
- Per-record access control works client-side for now; server endpoints exist but frontend still uses generic save() for simplicity (can switch to PATCH later for full server-side enforcement)
