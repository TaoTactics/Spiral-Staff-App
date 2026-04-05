const express = require('express');
const Database = require('better-sqlite3');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 3000;
const DB_PATH = process.env.DB_PATH || path.join(__dirname, 'spiral-data.db');

// ====== FILE UPLOAD SETUP ======
const UPLOAD_DIR = path.join(__dirname, 'uploads');
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR);

const ALLOWED_MIME_TYPES = new Set([
  'application/pdf',
  'image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'text/plain', 'text/csv',
  'application/zip', 'application/x-zip-compressed',
]);

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => {
    const safe = file.originalname.replace(/[^a-zA-Z0-9._-]/g, '_');
    cb(null, Date.now() + '-' + safe);
  }
});
const upload = multer({
  storage,
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB max
  fileFilter: (req, file, cb) => {
    if (ALLOWED_MIME_TYPES.has(file.mimetype)) {
      cb(null, true);
    } else {
      cb(Object.assign(new Error(`File type not allowed: ${file.mimetype}`), { status: 400 }));
    }
  }
});

// ====== DATABASE SETUP ======
const db = new Database(DB_PATH);
db.pragma('journal_mode = WAL');

db.exec(`
  CREATE TABLE IF NOT EXISTS app_data (
    id INTEGER PRIMARY KEY CHECK (id = 1),
    data TEXT NOT NULL,
    updated_at TEXT DEFAULT (datetime('now'))
  );
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT DEFAULT 'staff',
    created_at TEXT DEFAULT (datetime('now'))
  );
  CREATE TABLE IF NOT EXISTS backups (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    data TEXT NOT NULL,
    created_at TEXT DEFAULT (datetime('now'))
  );
  CREATE TABLE IF NOT EXISTS files (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    filename TEXT NOT NULL,
    original_name TEXT NOT NULL,
    category TEXT DEFAULT 'General',
    department TEXT DEFAULT 'shared',
    size INTEGER,
    mime_type TEXT,
    uploaded_by TEXT,
    created_at TEXT DEFAULT (datetime('now'))
  );
  CREATE TABLE IF NOT EXISTS sessions (
    token TEXT PRIMARY KEY,
    user_id INTEGER NOT NULL,
    username TEXT NOT NULL,
    role TEXT NOT NULL,
    expires_at INTEGER NOT NULL
  );
`);

// Periodic session cleanup (every hour)
setInterval(() => {
  db.prepare('DELETE FROM sessions WHERE expires_at < ?').run(Date.now());
}, 60 * 60 * 1000);

// ====== SESSION HELPERS ======
function getCookie(req, name) {
  const cookies = req.headers.cookie || '';
  const match = cookies.split(';').map(c => c.trim()).find(c => c.startsWith(name + '='));
  return match ? decodeURIComponent(match.slice(name.length + 1)) : null;
}

function createSession(user) {
  const token = crypto.randomBytes(24).toString('hex');
  const expiresAt = Date.now() + 86400000; // 24h
  db.prepare('INSERT INTO sessions (token, user_id, username, role, expires_at) VALUES (?, ?, ?, ?, ?)')
    .run(token, user.id, user.username, user.role, expiresAt);
  return token;
}

function getSession(token) {
  if (!token) return null;
  return db.prepare('SELECT * FROM sessions WHERE token = ? AND expires_at > ?').get(token, Date.now()) || null;
}

// ====== MIDDLEWARE ======

// Trust the first proxy hop (Plesk reverse proxy) for accurate client IPs
app.set('trust proxy', 1);

// Security headers
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc:   ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
      fontSrc:    ["'self'", 'https://fonts.gstatic.com'],
      scriptSrc:  ["'self'"], // JS now in public/app.js — no unsafe-inline needed
      imgSrc:     ["'self'", 'data:'],
      connectSrc: ["'self'"],
      objectSrc:     ["'none'"],
      frameAncestors: ["'none'"],
      // app.js builds UI via innerHTML with inline onclick/onchange handlers throughout —
      // script-src-attr must allow unsafe-inline for those to work.
      // script-src remains 'self' only, so external script injection is still blocked.
      scriptSrcAttr: ["'unsafe-inline'"],
    }
  },
  hsts: { maxAge: 31536000, includeSubDomains: true },
}));

// Serve frontend assets (CSS, JS) — public/ contains no secrets
// Scoped to public/ only; project root is never exposed statically
app.use(express.static(path.join(__dirname, 'public')));

// Request logging
app.use(morgan('combined'));

// Body parsing
app.use(express.json({ limit: '10mb' }));

// Rate limit Basic Auth credential attempts (does not affect already-authenticated requests)
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => {
    // Only rate-limit requests using Basic Auth without a session cookie
    const hasSession = !!getCookie(req, 'spiral_session');
    const hasBasicAuth = (req.headers.authorization || '').startsWith('Basic ');
    return hasSession || !hasBasicAuth;
  },
  message: { error: 'Too many login attempts. Please try again in 15 minutes.' },
});
app.use(loginLimiter);

// ====== ROLE HELPERS ======
const VALID_ROLES = ['superadmin', 'manager', 'staff', 'driver', 'serviceuser', 'carer', 'foss'];
const PROTECTED_ROLES = ['superadmin', 'admin', 'manager'];

function isAdmin(req) {
  return req.user.role === 'superadmin' || req.user.role === 'admin';
}
function isManagerOrAbove(req) {
  return isAdmin(req) || req.user.role === 'manager';
}

// ====== AUTH MIDDLEWARE ======

// Parses "username:password" from a Basic Auth header, handling colons in passwords
function parseBasicAuth(header) {
  const b64 = header.split(' ')[1];
  if (!b64) return null;
  const decoded = Buffer.from(b64, 'base64').toString('utf8');
  const colonIdx = decoded.indexOf(':');
  if (colonIdx === -1) return null;
  return { username: decoded.slice(0, colonIdx), password: decoded.slice(colonIdx + 1) };
}

// Auth middleware - accepts session cookie OR Basic auth
function auth(req, res, next) {
  const session = getSession(getCookie(req, 'spiral_session'));
  if (session) {
    req.user = { id: session.user_id, username: session.username, role: session.role };
    return next();
  }
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Basic ')) {
    res.set('WWW-Authenticate', 'Basic realm="Spiral Sussex Tracker"');
    return res.status(401).json({ error: 'Login required' });
  }
  const creds = parseBasicAuth(header);
  if (!creds) return res.status(401).json({ error: 'Invalid credentials' });
  const user = db.prepare('SELECT * FROM users WHERE username = ?').get(creds.username);
  if (!user || !bcrypt.compareSync(creds.password, user.password)) {
    res.set('WWW-Authenticate', 'Basic realm="Spiral Sussex Tracker"');
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  req.user = { id: user.id, username: user.username, role: user.role };
  next();
}

// Page auth - creates a session cookie on successful Basic auth
function pageAuth(req, res, next) {
  const session = getSession(getCookie(req, 'spiral_session'));
  if (session) return next();
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Basic ')) {
    res.set('WWW-Authenticate', 'Basic realm="Spiral Sussex Tracker"');
    return res.status(401).send('Login required');
  }
  const creds = parseBasicAuth(header);
  if (!creds) return res.status(401).send('Invalid credentials');
  const user = db.prepare('SELECT * FROM users WHERE username = ?').get(creds.username);
  if (!user || !bcrypt.compareSync(creds.password, user.password)) {
    res.set('WWW-Authenticate', 'Basic realm="Spiral Sussex Tracker"');
    return res.status(401).send('Invalid credentials');
  }
  const token = createSession(user);
  res.cookie('spiral_session', token, { httpOnly: true, maxAge: 86400000, sameSite: 'strict' });
  next();
}

// Serve the main page (auth required; express.static is intentionally absent — see note below)
// NOTE: express.static is NOT used. It would serve all project files (server.js, .db, uploads/)
// without authentication. index.html is the only static asset and is served here under auth.
app.get('/', pageAuth, (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// ====== API ROUTES ======

// Get all data
app.get('/api/data', auth, (req, res) => {
  try {
    const row = db.prepare('SELECT data, updated_at FROM app_data WHERE id = 1').get();
    if (row) {
      res.json({ data: JSON.parse(row.data), updated_at: row.updated_at });
    } else {
      res.json({ data: null, updated_at: null });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Save all data
app.post('/api/data', auth, (req, res) => {
  try {
    const jsonStr = JSON.stringify(req.body.data);

    // Upsert main data
    db.prepare(`
      INSERT INTO app_data (id, data, updated_at) VALUES (1, ?, datetime('now'))
      ON CONFLICT(id) DO UPDATE SET data = ?, updated_at = datetime('now')
    `).run(jsonStr, jsonStr);

    // Auto-backup every save (keep last 50)
    db.prepare('INSERT INTO backups (data) VALUES (?)').run(jsonStr);
    const count = db.prepare('SELECT COUNT(*) as n FROM backups').get().n;
    if (count > 50) {
      db.prepare('DELETE FROM backups WHERE id IN (SELECT id FROM backups ORDER BY id ASC LIMIT ?)').run(count - 50);
    }

    const row = db.prepare('SELECT updated_at FROM app_data WHERE id = 1').get();
    res.json({ ok: true, updated_at: row.updated_at });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// List backups
app.get('/api/backups', auth, (req, res) => {
  try {
    const rows = db.prepare('SELECT id, created_at FROM backups ORDER BY id DESC LIMIT 20').all();
    res.json({ backups: rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Restore a backup
app.post('/api/backups/:id/restore', auth, (req, res) => {
  try {
    if (!isAdmin(req)) return res.status(403).json({ error: 'Admin only' });
    const backup = db.prepare('SELECT data FROM backups WHERE id = ?').get(req.params.id);
    if (!backup) return res.status(404).json({ error: 'Backup not found' });

    db.prepare(`
      INSERT INTO app_data (id, data, updated_at) VALUES (1, ?, datetime('now'))
      ON CONFLICT(id) DO UPDATE SET data = ?, updated_at = datetime('now')
    `).run(backup.data, backup.data);

    res.json({ ok: true, message: 'Restored' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Who am I
app.get('/api/me', auth, (req, res) => {
  res.json({ user: req.user });
});

// Logout
app.post('/api/logout', (req, res) => {
  const token = getCookie(req, 'spiral_session');
  if (token) db.prepare('DELETE FROM sessions WHERE token = ?').run(token);
  res.clearCookie('spiral_session');
  res.json({ ok: true });
});

// Change own password
app.post('/api/change-password', auth, (req, res) => {
  const { current, newPassword } = req.body;
  if (!current || !newPassword) return res.status(400).json({ error: 'Current and new password required' });
  if (newPassword.length < 6) return res.status(400).json({ error: 'Password must be at least 6 characters' });
  const user = db.prepare('SELECT * FROM users WHERE id = ?').get(req.user.id);
  if (!user || !bcrypt.compareSync(current, user.password)) {
    return res.status(401).json({ error: 'Current password is incorrect' });
  }
  const hash = bcrypt.hashSync(newPassword, 10);
  db.prepare('UPDATE users SET password = ? WHERE id = ?').run(hash, req.user.id);
  res.json({ ok: true });
});

// ====== USER MANAGEMENT (manager and above) ======

app.get('/api/users', auth, (req, res) => {
  if (!isManagerOrAbove(req)) return res.status(403).json({ error: 'Manager or above only' });
  const users = db.prepare('SELECT id, username, role, created_at FROM users').all();
  res.json({ users });
});

app.post('/api/users', auth, (req, res) => {
  if (!isManagerOrAbove(req)) return res.status(403).json({ error: 'Manager or above only' });
  const { username, password, role } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'Username and password required' });
  const assignedRole = VALID_ROLES.includes(role) ? role : 'staff';
  if (!isAdmin(req) && PROTECTED_ROLES.includes(assignedRole)) {
    return res.status(403).json({ error: 'Managers cannot create superadmin or manager accounts' });
  }
  try {
    const hash = bcrypt.hashSync(password, 10);
    db.prepare('INSERT INTO users (username, password, role) VALUES (?, ?, ?)').run(username, hash, assignedRole);
    res.json({ ok: true });
  } catch (err) {
    res.status(400).json({ error: 'Username already exists' });
  }
});

app.patch('/api/users/:id', auth, (req, res) => {
  if (!isManagerOrAbove(req)) return res.status(403).json({ error: 'Manager or above only' });
  const { username, password, role } = req.body;
  const userId = parseInt(req.params.id);
  const target = db.prepare('SELECT * FROM users WHERE id = ?').get(userId);
  if (!target) return res.status(404).json({ error: 'User not found' });
  if (!isAdmin(req) && PROTECTED_ROLES.includes(target.role)) {
    return res.status(403).json({ error: 'Managers cannot edit superadmin or manager accounts' });
  }
  if (!isAdmin(req) && role && PROTECTED_ROLES.includes(role)) {
    return res.status(403).json({ error: 'Managers cannot assign that role' });
  }
  try {
    if (username) {
      db.prepare('UPDATE users SET username = ? WHERE id = ?').run(username, userId);
    }
    if (password) {
      const hash = bcrypt.hashSync(password, 10);
      db.prepare('UPDATE users SET password = ? WHERE id = ?').run(hash, userId);
    }
    if (role && VALID_ROLES.includes(role)) {
      if (userId === req.user.id && req.user.role === 'superadmin' && role !== 'superadmin') {
        const count = db.prepare("SELECT COUNT(*) as n FROM users WHERE role = 'superadmin'").get().n;
        if (count <= 1) return res.status(400).json({ error: 'Cannot remove last superadmin' });
      }
      db.prepare('UPDATE users SET role = ? WHERE id = ?').run(role, userId);
    }
    res.json({ ok: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete('/api/users/:id', auth, (req, res) => {
  if (!isManagerOrAbove(req)) return res.status(403).json({ error: 'Manager or above only' });
  if (parseInt(req.params.id) === req.user.id) return res.status(400).json({ error: 'Cannot delete yourself' });
  const target = db.prepare('SELECT * FROM users WHERE id = ?').get(req.params.id);
  if (!target) return res.status(404).json({ error: 'User not found' });
  if (!isAdmin(req) && PROTECTED_ROLES.includes(target.role)) {
    return res.status(403).json({ error: 'Managers cannot delete superadmin or manager accounts' });
  }
  db.prepare('DELETE FROM users WHERE id = ?').run(req.params.id);
  res.json({ ok: true });
});

// ====== FILE MANAGEMENT ======

// List files (optionally filter by department)
app.get('/api/files', auth, (req, res) => {
  try {
    const dept = req.query.department;
    let rows;
    if (dept && dept !== 'all') {
      rows = db.prepare("SELECT * FROM files WHERE department = ? OR department = 'shared' ORDER BY category, original_name").all(dept);
    } else {
      rows = db.prepare('SELECT * FROM files ORDER BY category, original_name').all();
    }
    res.json({ files: rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Upload file
app.post('/api/files', auth, upload.single('file'), (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    const { category, department } = req.body;
    db.prepare(
      'INSERT INTO files (filename, original_name, category, department, size, mime_type, uploaded_by) VALUES (?, ?, ?, ?, ?, ?, ?)'
    ).run(
      req.file.filename,
      req.file.originalname,
      category || 'General',
      department || 'shared',
      req.file.size,
      req.file.mimetype,
      req.user.username
    );
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Multer error handler (catches fileFilter rejections)
app.use((err, req, res, next) => {
  if (err && (err.code === 'LIMIT_FILE_SIZE' || err.status === 400)) {
    return res.status(400).json({ error: err.message });
  }
  next(err);
});

// Download file (auth required; uploads/ is not served as static)
app.get('/api/files/:id/download', auth, (req, res) => {
  try {
    const file = db.prepare('SELECT * FROM files WHERE id = ?').get(req.params.id);
    if (!file) return res.status(404).json({ error: 'File not found' });
    const filePath = path.join(UPLOAD_DIR, file.filename);
    if (!fs.existsSync(filePath)) return res.status(404).json({ error: 'File missing from disk' });
    // Use RFC 5987 encoding to prevent header injection from filenames containing quotes/newlines
    const encodedName = encodeURIComponent(file.original_name);
    res.setHeader('Content-Disposition', `attachment; filename*=UTF-8''${encodedName}`);
    res.setHeader('Content-Type', file.mime_type || 'application/octet-stream');
    res.sendFile(filePath);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete file (manager and above)
app.delete('/api/files/:id', auth, (req, res) => {
  try {
    if (!isManagerOrAbove(req)) return res.status(403).json({ error: 'Manager or above only' });
    const file = db.prepare('SELECT * FROM files WHERE id = ?').get(req.params.id);
    if (!file) return res.status(404).json({ error: 'File not found' });
    const filePath = path.join(UPLOAD_DIR, file.filename);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    db.prepare('DELETE FROM files WHERE id = ?').run(req.params.id);
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ====== OFFLINE BACKUP ======
const { generateOfflineBackup } = require('./backup-template');

app.get('/api/backup/offline', auth, (req, res) => {
  if (!isManagerOrAbove(req)) return res.status(403).json({ error: 'Manager or above only' });
  try {
    const row = db.prepare('SELECT data FROM app_data WHERE id = 1').get();
    const appData = row ? JSON.parse(row.data) : {};
    const users = db.prepare('SELECT username, role FROM users').all();
    const now = new Date().toISOString().replace('T', ' ').slice(0, 19);
    const html = generateOfflineBackup(appData, users, now);
    const date = new Date().toISOString().slice(0, 10);
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename="spiral-backup-${date}.html"`);
    res.send(html);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ ok: true, uptime: process.uptime() });
});

// ====== FIRST-RUN SETUP ======
const userCount = db.prepare('SELECT COUNT(*) as n FROM users').get().n;
if (userCount === 0) {
  const defaultPass = 'spiral2026';
  const hash = bcrypt.hashSync(defaultPass, 10);
  db.prepare('INSERT INTO users (username, password, role) VALUES (?, ?, ?)').run('admin', hash, 'superadmin');
  console.log('');
  console.log('╔══════════════════════════════════════════╗');
  console.log('║  FIRST RUN - Default admin account:      ║');
  console.log('║  Username: admin                         ║');
  console.log('║  Password: spiral2026                    ║');
  console.log('║  CHANGE THIS after first login!          ║');
  console.log('╚══════════════════════════════════════════╝');
  console.log('');
}

// ====== START ======
app.listen(PORT, () => {
  console.log(`Spiral Tracker running on http://localhost:${PORT}`);
  console.log(`Database: ${DB_PATH}`);
  console.log(`Users: ${db.prepare('SELECT COUNT(*) as n FROM users').get().n}`);
});

// Graceful shutdown
process.on('SIGINT',  () => { db.close(); process.exit(0); });
process.on('SIGTERM', () => { db.close(); process.exit(0); });
