# AGENTS.md
Shared rules for all agents (Claude, Codex, etc.). Keep this up to date.

---

## Project overview

Spiral Sussex Tracker — staff operations tool for a community day-service organisation. Manages departments, tasks, service users, staff profiles, schedules, rotas, attendance registers, incidents, and funding/outcomes (FOSS).

Stack: **Node.js / Express 4 / SQLite** backend + **single-file vanilla JS** frontend. No framework, no build step.

---

## Important files and directories

| Path | Purpose |
|---|---|
| `server.js` | Express server — all API routes, auth, file uploads |
| `index.html` | Thin HTML shell — links to `public/app.css` and `public/app.js` |
| `public/app.css` | All styles |
| `public/app.js` | All frontend JavaScript |
| `spiral-data.db` | SQLite database (WAL mode) — never edit directly while server is running |
| `uploads/` | Uploaded files — not served statically; requires auth via `/api/files/:id/download` |
| `backup-template.js` | Generates the self-contained offline backup HTML |
| `scripts/nightly-backup.sh` | Cron script: fetches backup, uploads to Google Drive via rclone |
| `backups/` | Local backup HTML files (last 30 days, gitignored) |
| `.env` | Backup credentials (gitignored) |
| `MEMORY.md` | Stable long-term facts for agents |
| `SESSION_HANDOFF.md` | In-progress task state — fill in before stopping |

---

## How to run

**Development**
```bash
npm install       # first time only
node server.js    # http://localhost:3000
```
Default credentials (fresh DB): `admin` / `spiral2026`.
Override DB path: `DB_PATH=/path/to/file.db node server.js`.

**Production (PM2)**
```bash
pm2 restart spiral-tracker    # deploy changes
pm2 logs                      # tail logs
pm2 status                    # health check
curl localhost:3000/api/health # liveness
```

---

## Tests, lint, build

None. After changes:
- Restart the server and test the affected feature manually in the browser.
- Check `pm2 logs` / terminal for errors.
- For API changes, verify with curl or the network tab.

---

## Coding conventions

- **Backend**: synchronous `better-sqlite3` (no async/await for DB). Follow existing route patterns.
- **Frontend**: all state in globals — `D`, `staff`, `serviceUsers`, `schedule`, `staffProfiles`, `rota`, `driverRota`, `weekSchedules`, `registers`, `fossData`, `history`. Mutations need `save()` then usually `render()`.
- **App data**: serialised as one JSON blob in `app_data` (id=1). Add new fields inside the blob; do not create new SQLite tables for app state.
- **Frontend files**: edit `public/app.css` for styles, `public/app.js` for logic. `index.html` is just the shell — don't put CSS or JS back into it. No bundler, no framework.
- **Style**: smallest safe change. Don't refactor unrelated code or add comments to untouched lines.

---

## Constraints — do not change casually

- **`app_data` schema** — add fields; never rename or remove without a data migration.
- **Auth middleware** (`auth`, `pageAuth`) — changes here can expose the entire app.
- **`express.static`** — scoped to `public/` only. Do not expand it to the project root (that would expose `server.js`, `.db`, `uploads/`).
- **Public frontend bundle** (`index.html`, `public/app.js`, `public/app.css`) — never embed real service-user PII/medical seed data here. Sensitive records must come from authenticated server data or explicit imports only.
- **Helmet / CSP** — `scriptSrc` is `'self'` only (JS lives in `public/app.js`). `scriptSrcAttr` is `'unsafe-inline'` — required because app.js builds all UI via innerHTML with inline `onclick`/`onchange` handlers. Do not remove either directive.
- **`loginLimiter`** — rate-limits Basic Auth attempts. Do not remove.
- **Backup window** — currently 50 rolling backups. Reducing it silently deletes recovery points.
- **Global state variable names** in `public/app.js` — load-bearing; rename only with a full find-and-replace.
- **`DEF_*` arrays** near the top of `public/app.js` — seed data for fresh installs.
- **Nightly backup cron** — runs at 22:00 daily via `scripts/nightly-backup.sh`. Uploads to Google Drive (`gdrive:SpiralBackups/`). Do not remove without providing an alternative.

---

## Definition of done

A task is done when:
1. The feature works correctly in the browser (or the bug is confirmed fixed).
2. No new errors in `pm2 logs` / terminal.
3. Code is committed with a clear message explaining what changed and why.
4. `SESSION_HANDOFF.md` is either cleared (if finished) or updated (if handing off mid-task).

---

## Handoff procedure

Before stopping on an unfinished task, update `SESSION_HANDOFF.md`. The next agent must be able to continue without reading conversation history. See `SESSION_HANDOFF.md` for the template.
