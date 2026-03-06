const express = require('express');
const Database = require('better-sqlite3');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// ====== FILE UPLOAD SETUP ======
const UPLOAD_DIR = path.join(__dirname, 'uploads');
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR);

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const safe = file.originalname.replace(/[^a-zA-Z0-9._-]/g, '_');
    cb(null, Date.now() + '-' + safe);
  }
});
const upload = multer({ storage, limits: { fileSize: 20 * 1024 * 1024 } }); // 20MB max

// ====== DATABASE SETUP ======
const DB_PATH = path.join(__dirname, 'spiral-data.db');
const db = new Database(DB_PATH);

// Enable WAL mode for better performance
db.pragma('journal_mode = WAL');

// Create tables
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
`);

// ====== MIDDLEWARE ======
app.use(express.json({ limit: '10mb' }));
app.use(express.static(__dirname, {
  index: 'index.html',
  extensions: ['html']
}));

// Generate a simple session token
const crypto = require('crypto');
const SESSION_SECRET = crypto.randomBytes(32).toString('hex');
const sessions = {}; // token -> {username, role, created}

function createSession(user) {
  const token = crypto.randomBytes(24).toString('hex');
  sessions[token] = { username: user.username, role: user.role, id: user.id, created: Date.now() };
  // Clean old sessions (>24h)
  for (const [k, v] of Object.entries(sessions)) {
    if (Date.now() - v.created > 86400000) delete sessions[k];
  }
  return token;
}

// Cookie parser helper
function getCookie(req, name) {
  const cookies = req.headers.cookie || '';
  const match = cookies.split(';').map(c => c.trim()).find(c => c.startsWith(name + '='));
  return match ? match.split('=')[1] : null;
}

// Auth middleware - accepts Basic auth OR session cookie
function auth(req, res, next) {
  // Try session cookie first
  const token = getCookie(req, 'spiral_session');
  if (token && sessions[token]) {
    req.user = sessions[token];
    return next();
  }
  // Fall back to Basic auth
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Basic ')) {
    res.set('WWW-Authenticate', 'Basic realm="Spiral Sussex Tracker"');
    return res.status(401).json({ error: 'Login required' });
  }
  const decoded = Buffer.from(header.split(' ')[1], 'base64').toString();
  const [username, password] = decoded.split(':');
  
  const user = db.prepare('SELECT * FROM users WHERE username = ?').get(username);
  if (!user || !bcrypt.compareSync(password, user.password)) {
    res.set('WWW-Authenticate', 'Basic realm="Spiral Sussex Tracker"');
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  req.user = { id: user.id, username: user.username, role: user.role };
  next();
}

// Auth for HTML pages - sets session cookie on success
function pageAuth(req, res, next) {
  // Check session cookie
  const token = getCookie(req, 'spiral_session');
  if (token && sessions[token]) return next();
  
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Basic ')) {
    res.set('WWW-Authenticate', 'Basic realm="Spiral Sussex Tracker"');
    return res.status(401).send('Login required');
  }
  const decoded = Buffer.from(header.split(' ')[1], 'base64').toString();
  const [username, password] = decoded.split(':');
  
  const user = db.prepare('SELECT * FROM users WHERE username = ?').get(username);
  if (!user || !bcrypt.compareSync(password, user.password)) {
    res.set('WWW-Authenticate', 'Basic realm="Spiral Sussex Tracker"');
    return res.status(401).send('Invalid credentials');
  }
  // Set session cookie so API calls work
  const sessionToken = createSession(user);
  res.cookie('spiral_session', sessionToken, { httpOnly: true, maxAge: 86400000, sameSite: 'strict' });
  next();
}

// Protect the main page
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
    if (req.user.role !== 'admin') return res.status(403).json({ error: 'Admin only' });
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

// ====== USER MANAGEMENT (admin only) ======

app.get('/api/users', auth, (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Admin only' });
  const users = db.prepare('SELECT id, username, role, created_at FROM users').all();
  res.json({ users });
});

app.post('/api/users', auth, (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Admin only' });
  const { username, password, role } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'Username and password required' });
  try {
    const hash = bcrypt.hashSync(password, 10);
    db.prepare('INSERT INTO users (username, password, role) VALUES (?, ?, ?)').run(username, hash, role || 'staff');
    res.json({ ok: true });
  } catch (err) {
    res.status(400).json({ error: 'Username already exists' });
  }
});

app.delete('/api/users/:id', auth, (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Admin only' });
  if (parseInt(req.params.id) === req.user.id) return res.status(400).json({ error: 'Cannot delete yourself' });
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

// Download file
app.get('/api/files/:id/download', auth, (req, res) => {
  try {
    const file = db.prepare('SELECT * FROM files WHERE id = ?').get(req.params.id);
    if (!file) return res.status(404).json({ error: 'File not found' });
    const filePath = path.join(UPLOAD_DIR, file.filename);
    if (!fs.existsSync(filePath)) return res.status(404).json({ error: 'File missing from disk' });
    res.setHeader('Content-Disposition', 'attachment; filename="' + file.original_name + '"');
    res.setHeader('Content-Type', file.mime_type || 'application/octet-stream');
    res.sendFile(filePath);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete file (admin only)
app.delete('/api/files/:id', auth, (req, res) => {
  try {
    if (req.user.role !== 'admin') return res.status(403).json({ error: 'Admin only' });
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

// ====== FIRST-RUN SETUP ======
const userCount = db.prepare('SELECT COUNT(*) as n FROM users').get().n;
if (userCount === 0) {
  const defaultPass = 'spiral2026';
  const hash = bcrypt.hashSync(defaultPass, 10);
  db.prepare('INSERT INTO users (username, password, role) VALUES (?, ?, ?)').run('admin', hash, 'admin');
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
process.on('SIGINT', () => { db.close(); process.exit(0); });
process.on('SIGTERM', () => { db.close(); process.exit(0); });
