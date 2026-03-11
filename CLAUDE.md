# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Spiral Sussex Tracker — a staff operations tool for a community day-service organisation. It tracks departments/tasks, service users, staff, schedules, and rotas.

## Commands

```bash
# Install dependencies
npm install

# Run the server (port 3000)
npm start
# or
node server.js

# Production process management (PM2)
pm2 start server.js --name spiral-tracker
pm2 restart spiral-tracker
pm2 logs
pm2 status
```

There is no build step, linter, or test suite.

## Architecture

### Backend (`server.js`)
- Express 4 + better-sqlite3 (synchronous SQLite) + bcryptjs + multer
- SQLite database at `spiral-data.db` with WAL mode enabled
- **All application state is stored as a single JSON blob** in `app_data` (id=1). Every save overwrites this row and creates a rolling backup (last 50 kept in `backups` table).
- Sessions are **in-memory only** (`sessions` object keyed by token) — they are lost on server restart. Users must re-authenticate after a restart.
- Auth supports HTTP Basic Auth (for API calls) and session cookies (`spiral_session`) for browser sessions.
- File uploads stored on disk in `uploads/` directory, metadata tracked in `files` table.
- Two roles: `admin` and `staff`. Admin-only operations: restore backup, manage users, delete files.
- Default credentials on first run: `admin` / `spiral2026`.

### Frontend (`index.html`)
- A **single self-contained HTML file** — all CSS and JavaScript is inline. No framework, no build tool.
- The app is a client-side SPA that renders by calling `render()` which rebuilds the entire DOM.
- **Global state variables** (declared around line 613):
  - `D` — departments array
  - `staff` — staff name list
  - `serviceUsers` — service user records (with flags, contact info, medical notes)
  - `schedule` — weekly session schedule
  - `staffProfiles` — detailed staff profile objects
  - `rota` — weekly room/session staffing rota
  - `driverRota` — minibus driver assignments
  - `weekSchedules` — per-week schedule overrides
  - `registers` — attendance registers
  - `fossData` — FOSS (funding/outcomes) data
  - `history` — audit/history entries
- **Data flow**: on load, fetches from `/api/data` (falls back to localStorage). On change, `save()` debounces a POST to `/api/data` and also writes to localStorage as a cache.
- `getDataObj()` returns all state as one object that is serialised and sent to the server.
- `applyData(d)` deserialises server data back into all state variables.
- Tabs: Departments, Schedule, Service Users, Staff, Rota (each renders a different section of the single page).
- Large constant arrays near the top of the script define default data (`DEF_SUS`, `DEF_SCHEDULE`, `DEF_STAFF_PROFILES`, `DEFS`), flag metadata (`FLAG_INFO`, `FLAG_COLORS`), room lists, routes, etc.

### Deployment
- Hosted on an IONOS VPS via PM2, reverse-proxied through Plesk to a subdomain.
- The server serves `index.html` as a static file for the root route (with auth middleware).
- Port defaults to `3000`, overridable via `PORT` environment variable.
