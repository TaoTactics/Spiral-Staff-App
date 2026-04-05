#!/bin/bash
# Nightly offline backup — generates a self-contained HTML file and uploads to Google Drive.
# Runs via cron: 0 22 * * * /var/www/spiral-tracker/scripts/nightly-backup.sh
#
# Requires:
#   - BACKUP_USER and BACKUP_PASS env vars (or set in /var/www/spiral-tracker/.env)
#   - rclone configured with a remote named "gdrive"

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
BACKUP_DIR="${PROJECT_DIR}/backups"
ENV_FILE="${PROJECT_DIR}/.env"
DATE=$(date +%Y-%m-%d)
FILENAME="spiral-backup-${DATE}.html"
LOG_TAG="spiral-backup"

# Load env vars if .env exists
if [ -f "$ENV_FILE" ]; then
  set -a
  source "$ENV_FILE"
  set +a
fi

# Check required vars
if [ -z "${BACKUP_USER:-}" ] || [ -z "${BACKUP_PASS:-}" ]; then
  logger -t "$LOG_TAG" "ERROR: BACKUP_USER and BACKUP_PASS must be set"
  exit 1
fi

# Ensure backup dir exists
mkdir -p "$BACKUP_DIR"

# Fetch offline backup from the running server
HTTP_CODE=$(curl -s -o "${BACKUP_DIR}/${FILENAME}" -w "%{http_code}" \
  -u "${BACKUP_USER}:${BACKUP_PASS}" \
  "http://localhost:3000/api/backup/offline")

if [ "$HTTP_CODE" != "200" ]; then
  logger -t "$LOG_TAG" "ERROR: Backup fetch failed with HTTP ${HTTP_CODE}"
  rm -f "${BACKUP_DIR}/${FILENAME}"
  exit 1
fi

FILE_SIZE=$(stat -c%s "${BACKUP_DIR}/${FILENAME}" 2>/dev/null || echo 0)
if [ "$FILE_SIZE" -lt 1000 ]; then
  logger -t "$LOG_TAG" "ERROR: Backup file suspiciously small (${FILE_SIZE} bytes)"
  exit 1
fi

logger -t "$LOG_TAG" "Backup saved: ${FILENAME} (${FILE_SIZE} bytes)"

# Upload to Google Drive (if rclone is configured)
if command -v rclone &>/dev/null && rclone listremotes 2>/dev/null | grep -q "gdrive:"; then
  rclone copy "${BACKUP_DIR}/${FILENAME}" gdrive:SpiralBackups/ 2>&1 | logger -t "$LOG_TAG"
  logger -t "$LOG_TAG" "Uploaded to Google Drive: SpiralBackups/${FILENAME}"
else
  logger -t "$LOG_TAG" "WARN: rclone not configured — backup saved locally only"
fi

# Keep only last 30 local backups
ls -t "${BACKUP_DIR}"/spiral-backup-*.html 2>/dev/null | tail -n +31 | xargs rm -f 2>/dev/null

logger -t "$LOG_TAG" "Nightly backup complete"
