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
| Process manager | PM2, app name `spiral-tracker`, runs as user `spiraldev` |
| Hosting | IONOS VPS, TLS terminated by Plesk; `trust proxy 1` set in Express |
| Backups | Nightly at 22:00 via cron → `scripts/nightly-backup.sh` → self-contained HTML → Google Drive (`gdrive:SpiralBackups/`) via rclone |
| Roles | `superadmin`, `manager`, `staff`, `driver`, `serviceuser`, `carer`, `foss`. FOSS users default to FOSS mode on login but can switch to Spiral. |

---

## Key commands

```bash
pm2 restart spiral-tracker          # deploy
pm2 logs                            # production logs
curl localhost:3000/api/health      # liveness check
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
