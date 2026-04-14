# MEMORY.md
Stable long-term facts for AI agents. Update only when something changes permanently.
For in-progress task state, use SESSION_HANDOFF.md instead.

---

## Stack

| Layer | Detail |
|---|---|
| Runtime | Node.js 20, Express 4 |
| Database | SQLite, `better-sqlite3` (synchronous), WAL mode |
| Sessions | Stored in `sessions` SQLite table; 24 h TTL; hourly cleanup via `setInterval` |
| Frontend | `index.html` (shell) + `public/app.css` + `public/app.js`; no framework, no build step |
| Process manager | PM2, app name `spiral-tracker` (prod, port 3000) + `spiral-test` (test, port 3001), runs as user `spiraldev` |
| Hosting | IONOS VPS; `trust proxy 1` set in Express |
| Backups | Nightly at 22:00 via cron → `scripts/nightly-backup.sh` → self-contained HTML → Google Drive (`gdrive:SpiralBackups/`) via rclone |
| Roles | `superadmin`, `manager`, `staff`, `driver`, `serviceuser`, `carer`, `foss`. FOSS users default to FOSS mode on login but can switch to Spiral. |
| HR system | Staff profiles with 7 categories (personal, employment, qualifications, capabilities, compliance, health, documents). Per-record access control via `hrAccess`. Capability badges shown in rota view. |
| Test server | Git worktree at `/var/www/spiral-tracker-test`, `dev` branch, port 3001, own DB (`spiral-test.db`). No HSTS/upgrade-insecure-requests (plain HTTP). |

---

## Key commands

```bash
pm2 restart spiral-tracker          # deploy production
pm2 restart spiral-test             # deploy test server
pm2 logs                            # production logs
pm2 logs spiral-test                # test server logs
curl localhost:3000/api/health      # production liveness
curl localhost:3001/api/health      # test liveness
ps aux | grep "node.*server"        # check for rogue node processes
curl -u admin:spiral2026 localhost:3000/api/backup/offline -o backup.html  # manual backup
rclone ls gdrive:SpiralBackups/     # check Drive backups
```

---

## Persistent gotchas

- **Two PM2 daemons**: root has its own PM2 at `/root/.pm2` (separate from `spiraldev`'s at `/home/spiraldev/.pm2`). Root's PM2 had `spiral-tracker` registered, causing a competing process on port 3000. Root's PM2 app list has been cleared (`sudo pm2 delete spiral-tracker && sudo pm2 save --force`). If the server behaves unexpectedly again, run `sudo pm2 list` alongside `pm2 list` to check both daemons, and `ps aux | grep "node.*server"` to spot any rogue process.
- **`express.static` is scoped to `public/` only** — do not expand to project root (exposes server.js, .db, uploads/).
- **CSP `scriptSrc` is `'self'`; `scriptSrcAttr` is `'unsafe-inline'`** — the app builds UI via innerHTML with inline event handlers, so `scriptSrcAttr` must stay. `scriptSrc 'self'` still blocks external script loading.
- **Basic Auth colon split** uses `indexOf(':')`, not `split(':')` — handles passwords containing `:`. Don't revert.
- **Data was wiped ~March 26 2026** — a browser with empty/stale state called `save()` which overwrote the DB with empty data. Restored from `backups` table row 74 (March 16 snapshot). Data-loss guards now in place to prevent recurrence.
- **Data-loss guard** (`POST /api/data`) rejects saves that would drop >50% of service users, wipe departments, or wipe schedule. Returns 409. Frontend auto-reloads on 409.
- **`serverDataLoaded` flag** prevents `save()` from pushing to server until server data is successfully loaded — stops stale browser state from overwriting.
- **`resetAll()` requires superadmin + typing "RESET"** — button hidden for non-superadmins.
