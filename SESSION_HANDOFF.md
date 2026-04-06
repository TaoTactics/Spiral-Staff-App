# SESSION HANDOFF
Fill in all sections before stopping on an unfinished task.
Clear this file (reset to dashes) once a task is fully complete and committed.

---

## Current objective
- Remove public exposure of service-user PII/medical seed data from the frontend bundle and push the fix to GitHub.

## Completed
- Replaced the public `DEF_SUS` seed dataset in `public/app.js` with an empty default so service-user records only come from authenticated server data or explicit imports.
- Added a guardrail to `AGENTS.md` forbidding real service-user PII/medical data in the public frontend bundle.
- Cleared the stray mode-only diff on `setup.sh`.

## Files changed
- `public/app.js`
- `AGENTS.md`
- `SESSION_HANDOFF.md`

## Tests / checks run
- `node --check public/app.js`
- `rg -n "Aaran Reed|Maureen Prescott|Zoe Pearce|Dennis|Spinc|Downs Syndrome, Hearing impairment" public/app.js`

## Current branch
- `main`

## Next exact step
- Commit the current changes and push `main` to `origin`.

## Blockers / notes
- Fresh installs and `Reset to defaults` now start with an empty service-user list unless records are loaded from the authenticated server or imported.
