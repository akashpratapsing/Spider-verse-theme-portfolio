#!/usr/bin/env node
/**
 * Local Admin Tool Server
 * 
 * Binds strictly to 127.0.0.1 (localhost).
 * Provides secure password-only authentication (PBKDF2 600k iterations),
 * file read/write validation restricted to approved portfolio content files,
 * automatic backups, and safe Git process execution.
 */

import http from 'http';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

// Configuration
const DEFAULT_PORT = 3001;
const args = process.argv.slice(2);
let port = process.env.ADMIN_PORT ? parseInt(process.env.ADMIN_PORT, 10) : DEFAULT_PORT;
const portArg = args.find(a => a.startsWith('--port='));
if (portArg) {
  port = parseInt(portArg.split('=')[1], 10);
}

// Approved content files whitelist
const APPROVED_FILES = {
  skills: path.resolve(ROOT_DIR, 'data/skills.json'),
  projects: path.resolve(ROOT_DIR, 'data/projects.json'),
  experience: path.resolve(ROOT_DIR, 'data/experience.json'),
};

const AUTH_FILE = path.resolve(__dirname, '.admin-auth.json');
const BACKUPS_DIR = path.resolve(__dirname, 'backups');

// Ensure backups directory exists
if (!fs.existsSync(BACKUPS_DIR)) {
  fs.mkdirSync(BACKUPS_DIR, { recursive: true });
}

// Rate Limiting & Auth State
const RATE_LIMIT = {
  failedAttempts: 0,
  lockUntil: 0,
  lastAttemptTime: 0,
};

// Sessions store: token -> { expiresAt, lastActive }
const activeSessions = new Map();
const SESSION_MAX_AGE_MS = 4 * 60 * 60 * 1000; // 4 hours
const SESSION_IDLE_TIMEOUT_MS = 30 * 60 * 1000; // 30 minutes

function cleanExpiredSessions() {
  const now = Date.now();
  for (const [token, data] of activeSessions.entries()) {
    if (now > data.expiresAt || (now - data.lastActive) > SESSION_IDLE_TIMEOUT_MS) {
      activeSessions.delete(token);
    }
  }
}
setInterval(cleanExpiredSessions, 60 * 1000);

// Helper: safe PBKDF2 hash with 600,000 iterations
function hashPassword(password, salt) {
  return crypto.pbkdf2Sync(password, salt, 600000, 32, 'sha256');
}

function isAuthSetup() {
  return fs.existsSync(AUTH_FILE);
}

function verifyPassword(password) {
  if (!isAuthSetup()) return false;
  try {
    const raw = fs.readFileSync(AUTH_FILE, 'utf8');
    const { salt, hash, iterations, algo } = JSON.parse(raw);
    const saltBuf = Buffer.from(salt, 'hex');
    const expectedHashBuf = Buffer.from(hash, 'hex');
    const calculatedHashBuf = crypto.pbkdf2Sync(password, saltBuf, iterations || 600000, 32, (algo && algo.includes('sha256')) ? 'sha256' : 'sha256');
    return crypto.timingSafeEqual(expectedHashBuf, calculatedHashBuf);
  } catch (err) {
    console.error('[Admin] Error verifying password:', err.message);
    return false;
  }
}

function savePasswordVerifier(password) {
  const saltBuf = crypto.randomBytes(32);
  const hashBuf = hashPassword(password, saltBuf);
  const record = {
    salt: saltBuf.toString('hex'),
    hash: hashBuf.toString('hex'),
    iterations: 600000,
    algo: 'pbkdf2-sha256',
    createdAt: new Date().toISOString(),
  };
  fs.writeFileSync(AUTH_FILE, JSON.stringify(record, null, 2), { mode: 0o600 });
}

// Git safe runner using spawn with argument array (never shell string)
function runGit(gitArgs, cwd = ROOT_DIR) {
  return new Promise((resolve, reject) => {
    const proc = spawn('git', gitArgs, {
      cwd,
      env: { ...process.env, GIT_TERMINAL_PROMPT: '0' },
      stdio: ['ignore', 'pipe', 'pipe'],
    });

    let stdout = '';
    let stderr = '';

    proc.stdout.on('data', d => stdout += d.toString());
    proc.stderr.on('data', d => stderr += d.toString());

    proc.on('close', code => {
      if (code === 0) {
        resolve({ stdout: stdout.trim(), stderr: stderr.trim() });
      } else {
        const errorMsg = stderr.trim() || stdout.trim() || `Git process exited with code ${code}`;
        const err = new Error(errorMsg);
        err.code = code;
        reject(err);
      }
    });

    proc.on('error', err => reject(err));
  });
}

// JSON parse helper for request body
function parseJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
      if (body.length > 5 * 1024 * 1024) { // 5MB max
        req.destroy();
        reject(new Error('Payload too large'));
      }
    });
    req.on('end', () => {
      if (!body) return resolve({});
      try {
        resolve(JSON.parse(body));
      } catch (err) {
        reject(new Error('Invalid JSON format'));
      }
    });
    req.on('error', reject);
  });
}

// Send standard JSON response
function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store, no-cache, must-revalidate',
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
  });
  res.end(JSON.stringify(data));
}

// Extract session token
function getSessionToken(req) {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7).trim();
  }
  const cookies = req.headers.cookie;
  if (cookies) {
    const match = cookies.match(/(?:^|;\s*)admin_session=([^;]+)/);
    if (match) return decodeURIComponent(match[1]);
  }
  return null;
}

function isAuthenticated(req) {
  const token = getSessionToken(req);
  if (!token) return false;
  const session = activeSessions.get(token);
  if (!session) return false;
  const now = Date.now();
  if (now > session.expiresAt || (now - session.lastActive) > SESSION_IDLE_TIMEOUT_MS) {
    activeSessions.delete(token);
    return false;
  }
  session.lastActive = now;
  return true;
}

// Schema Validators
function validateSkills(skills) {
  if (!Array.isArray(skills)) return 'Skills must be an array of categories';
  for (let i = 0; i < skills.length; i++) {
    const cat = skills[i];
    if (!cat || typeof cat !== 'object') return `Category at index ${i} is invalid`;
    if (!cat.title || typeof cat.title !== 'string' || !cat.title.trim()) {
      return `Category at index ${i} requires a non-empty title`;
    }
    if (!Array.isArray(cat.skills)) {
      return `Category "${cat.title}" must have an array of skills`;
    }
    const seen = new Set();
    for (const s of cat.skills) {
      if (typeof s !== 'string' || !s.trim()) return `Skill in "${cat.title}" must be a non-empty string`;
      const lower = s.trim().toLowerCase();
      if (seen.has(lower)) return `Duplicate skill "${s}" in category "${cat.title}"`;
      seen.add(lower);
    }
  }
  return null;
}

function validateProjects(projects) {
  if (!Array.isArray(projects)) return 'Projects must be an array';
  for (let i = 0; i < projects.length; i++) {
    const p = projects[i];
    if (!p || typeof p !== 'object') return `Project at index ${i} is invalid`;
    if (!p.id || typeof p.id !== 'string') return `Project at index ${i} requires an id`;
    if (!p.title || typeof p.title !== 'string' || !p.title.trim()) {
      return `Project at index ${i} requires a title`;
    }
    if (!p.description || typeof p.description !== 'string') {
      return `Project "${p.title}" requires a description`;
    }
    if (!Array.isArray(p.tags)) {
      return `Project "${p.title}" must have a tags array`;
    }
  }
  return null;
}

function validateExperience(expList) {
  if (!Array.isArray(expList)) return 'Experience must be an array';
  for (let i = 0; i < expList.length; i++) {
    const exp = expList[i];
    if (!exp || typeof exp !== 'object') return `Experience at index ${i} is invalid`;
    if (!exp.id || typeof exp.id !== 'string') return `Experience at index ${i} requires an id`;
    if (!exp.role || typeof exp.role !== 'string' || !exp.role.trim()) {
      return `Experience entry requires a role`;
    }
    if (!exp.company || typeof exp.company !== 'string' || !exp.company.trim()) {
      return `Experience entry requires a company`;
    }
  }
  return null;
}

// HTTP Server
const server = http.createServer(async (req, res) => {
  // 1. Strict Localhost Check (Security Constraint)
  const clientIp = req.socket.remoteAddress;
  const isLoopback = clientIp === '127.0.0.1' || clientIp === '::1' || clientIp === '::ffff:127.0.0.1';
  if (!isLoopback) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('Access denied: Admin tool runs exclusively on 127.0.0.1 local interface.');
    return;
  }

  // Host header validation
  const host = req.headers.host || '';
  if (!host.startsWith('127.0.0.1') && !host.startsWith('localhost')) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('Access denied: Invalid Host header.');
    return;
  }

  const url = new URL(req.url, `http://${host}`);
  const pathname = url.pathname;
  const method = req.method;

  // Global security headers
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');

  try {
    // API Route: Auth Status
    if (pathname === '/api/auth/status' && method === 'GET') {
      const initialized = isAuthSetup();
      const authenticated = isAuthenticated(req);
      const isLocked = RATE_LIMIT.lockUntil > Date.now();
      const remainingLockSec = isLocked ? Math.ceil((RATE_LIMIT.lockUntil - Date.now()) / 1000) : 0;
      return sendJson(res, 200, {
        initialized,
        authenticated,
        isLocked,
        remainingLockSec,
      });
    }

    // API Route: Auth Setup (First-time password creation)
    if (pathname === '/api/auth/setup' && method === 'POST') {
      if (isAuthSetup()) {
        return sendJson(res, 400, { error: 'Admin password has already been configured.' });
      }
      const body = await parseJsonBody(req);
      const password = body.password;
      if (!password || typeof password !== 'string' || password.length < 8) {
        return sendJson(res, 400, { error: 'Password must be at least 8 characters.' });
      }
      savePasswordVerifier(password);
      // Auto-login on setup
      const token = crypto.randomBytes(32).toString('hex');
      activeSessions.set(token, {
        expiresAt: Date.now() + SESSION_MAX_AGE_MS,
        lastActive: Date.now(),
      });
      res.setHeader('Set-Cookie', `admin_session=${token}; HttpOnly; SameSite=Strict; Path=/; Max-Age=14400`);
      return sendJson(res, 200, { success: true, token, message: 'Password configured successfully.' });
    }

    // API Route: Auth Login
    if (pathname === '/api/auth/login' && method === 'POST') {
      if (!isAuthSetup()) {
        return sendJson(res, 400, { error: 'Admin password not set up yet.' });
      }

      // Check Rate Limit
      const now = Date.now();
      if (RATE_LIMIT.lockUntil > now) {
        const remaining = Math.ceil((RATE_LIMIT.lockUntil - now) / 1000);
        return sendJson(res, 429, {
          error: `Too many failed attempts. Login locked for ${remaining} more seconds.`,
          remainingSeconds: remaining,
        });
      }

      const body = await parseJsonBody(req);
      const password = body.password || '';

      const isValid = verifyPassword(password);
      if (!isValid) {
        RATE_LIMIT.failedAttempts += 1;
        RATE_LIMIT.lastAttemptTime = now;
        if (RATE_LIMIT.failedAttempts >= 5) {
          RATE_LIMIT.lockUntil = now + 5 * 60 * 1000; // 5 min lock
          return sendJson(res, 429, {
            error: '5 consecutive failed attempts. System locked for 5 minutes.',
            remainingSeconds: 300,
          });
        }

        // Artificial delay against brute-force (1s, 2s, etc.)
        const delayMs = Math.min(RATE_LIMIT.failedAttempts * 1000, 3000);
        await new Promise(r => setTimeout(r, delayMs));

        return sendJson(res, 401, {
          error: 'Incorrect password.',
          attemptsLeft: 5 - RATE_LIMIT.failedAttempts,
        });
      }

      // Reset rate limit on success
      RATE_LIMIT.failedAttempts = 0;
      RATE_LIMIT.lockUntil = 0;

      const token = crypto.randomBytes(32).toString('hex');
      activeSessions.set(token, {
        expiresAt: Date.now() + SESSION_MAX_AGE_MS,
        lastActive: Date.now(),
      });

      res.setHeader('Set-Cookie', `admin_session=${token}; HttpOnly; SameSite=Strict; Path=/; Max-Age=14400`);
      return sendJson(res, 200, { success: true, token, message: 'Authenticated successfully.' });
    }

    // API Route: Auth Logout
    if (pathname === '/api/auth/logout' && method === 'POST') {
      const token = getSessionToken(req);
      if (token) activeSessions.delete(token);
      res.setHeader('Set-Cookie', 'admin_session=; HttpOnly; SameSite=Strict; Path=/; Max-Age=0');
      return sendJson(res, 200, { success: true });
    }

    // -------------------------------------------------------------
    // PROTECTED ROUTES BELOW (Require authenticated local session)
    // -------------------------------------------------------------
    if (pathname.startsWith('/api/')) {
      if (!isAuthenticated(req)) {
        return sendJson(res, 401, { error: 'Authentication required or session expired.' });
      }
    }

    // API Route: Get All Portfolio Content
    if (pathname === '/api/content' && method === 'GET') {
      const skillsRaw = fs.readFileSync(APPROVED_FILES.skills, 'utf8');
      const projectsRaw = fs.readFileSync(APPROVED_FILES.projects, 'utf8');
      const expRaw = fs.readFileSync(APPROVED_FILES.experience, 'utf8');

      return sendJson(res, 200, {
        skills: JSON.parse(skillsRaw),
        projects: JSON.parse(projectsRaw),
        experience: JSON.parse(expRaw),
      });
    }

    // API Route: Save Content to Approved Files (with automatic backup)
    if (pathname === '/api/content/save' && method === 'POST') {
      const payload = await parseJsonBody(req);
      const { skills, projects, experience } = payload;

      const errSkills = validateSkills(skills);
      if (errSkills) return sendJson(res, 400, { error: errSkills });

      const errProj = validateProjects(projects);
      if (errProj) return sendJson(res, 400, { error: errProj });

      const errExp = validateExperience(experience);
      if (errExp) return sendJson(res, 400, { error: errExp });

      // Create backup of current files before saving
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const backupDir = path.join(BACKUPS_DIR, `backup-${timestamp}`);
      fs.mkdirSync(backupDir, { recursive: true });

      if (fs.existsSync(APPROVED_FILES.skills)) {
        fs.copyFileSync(APPROVED_FILES.skills, path.join(backupDir, 'skills.json'));
      }
      if (fs.existsSync(APPROVED_FILES.projects)) {
        fs.copyFileSync(APPROVED_FILES.projects, path.join(backupDir, 'projects.json'));
      }
      if (fs.existsSync(APPROVED_FILES.experience)) {
        fs.copyFileSync(APPROVED_FILES.experience, path.join(backupDir, 'experience.json'));
      }

      // Write strictly to approved content files
      fs.writeFileSync(APPROVED_FILES.skills, JSON.stringify(skills, null, 2) + '\n', 'utf8');
      fs.writeFileSync(APPROVED_FILES.projects, JSON.stringify(projects, null, 2) + '\n', 'utf8');
      fs.writeFileSync(APPROVED_FILES.experience, JSON.stringify(experience, null, 2) + '\n', 'utf8');

      return sendJson(res, 200, {
        success: true,
        message: 'Content saved successfully to portfolio data files.',
        savedFiles: ['data/skills.json', 'data/projects.json', 'data/experience.json'],
        backupCreated: `backup-${timestamp}`,
      });
    }

    // API Route: Git Status
    if (pathname === '/api/git/status' && method === 'GET') {
      let isGitRepo = false;
      let branch = '';
      let latestCommit = null;
      let remoteUrl = '';
      let statusPorcelain = '';
      let changedApprovedFiles = [];
      let unrelatedChanges = [];

      try {
        await runGit(['rev-parse', '--is-inside-work-tree']);
        isGitRepo = true;
      } catch (e) {
        isGitRepo = false;
      }

      if (isGitRepo) {
        try {
          const branchRes = await runGit(['branch', '--show-current']);
          branch = branchRes.stdout || 'main';
        } catch (e) {
          branch = 'HEAD';
        }

        try {
          const commitRes = await runGit(['log', '-1', '--format=%H|%s|%an|%cI']);
          if (commitRes.stdout) {
            const [hash, subject, author, date] = commitRes.stdout.split('|');
            latestCommit = { hash, subject, author, date };
          }
        } catch (e) {
          latestCommit = null;
        }

        try {
          const remoteRes = await runGit(['config', '--get', 'remote.origin.url']);
          remoteUrl = remoteRes.stdout || '';
        } catch (e) {
          remoteUrl = '';
        }

        try {
          const statusRes = await runGit(['status', '--porcelain']);
          statusPorcelain = statusRes.stdout;
          const lines = statusPorcelain.split('\n').filter(Boolean);

          for (const line of lines) {
            const filePath = line.substring(3).trim();
            if (filePath === 'data/skills.json' || filePath === 'data/projects.json' || filePath === 'data/experience.json') {
              changedApprovedFiles.push(filePath);
            } else {
              unrelatedChanges.push(filePath);
            }
          }
        } catch (e) {
          statusPorcelain = '';
        }
      }

      return sendJson(res, 200, {
        isGitRepo,
        branch,
        latestCommit,
        remoteUrl,
        changedApprovedFiles,
        unrelatedChanges,
        isClean: statusPorcelain.trim().length === 0,
      });
    }

    // API Route: Git Diff on Approved Files
    if (pathname === '/api/git/diff' && method === 'GET') {
      let diff = '';
      try {
        const diffRes = await runGit(['diff', 'HEAD', '--', 'data/skills.json', 'data/projects.json', 'data/experience.json']);
        diff = diffRes.stdout;
      } catch (e) {
        // If no commits yet or diff error, fallback to normal diff
        try {
          const diffRes = await runGit(['diff', '--', 'data/skills.json', 'data/projects.json', 'data/experience.json']);
          diff = diffRes.stdout;
        } catch (err) {
          diff = 'No diff available (or initial commit)';
        }
      }
      return sendJson(res, 200, { diff });
    }

    // API Route: Git Publish (Stage, Commit, Push)
    if (pathname === '/api/git/publish' && method === 'POST') {
      const body = await parseJsonBody(req);
      const commitMessage = (body.commitMessage || 'Update portfolio content').trim();

      // 1. Verify Git Repository
      try {
        await runGit(['rev-parse', '--is-inside-work-tree']);
      } catch (e) {
        return sendJson(res, 400, {
          error: 'This directory is not an active Git repository. Please initialize git or clone from GitHub.',
        });
      }

      // 2. Check for unrelated changes warning
      const statusRes = await runGit(['status', '--porcelain']);
      const lines = statusRes.stdout.split('\n').filter(Boolean);
      const unrelated = lines.filter(line => {
        const p = line.substring(3).trim();
        return p !== 'data/skills.json' && p !== 'data/projects.json' && p !== 'data/experience.json';
      });

      if (unrelated.length > 0 && !body.ignoreUnrelatedWarning) {
        return sendJson(res, 409, {
          error: 'Unrelated working-tree changes detected in your repository.',
          unrelatedFiles: unrelated.map(l => l.substring(3).trim()),
          requiresExplicitConfirmation: true,
          message: 'The admin tool only stages approved data files (data/*.json). Unrelated files will NOT be committed.',
        });
      }

      // 3. Stage ONLY approved data files
      const approvedFilesToStage = [
        'data/skills.json',
        'data/projects.json',
        'data/experience.json',
      ];

      // Check if any of these files have actual changes
      let stagedAny = false;
      for (const relFile of approvedFilesToStage) {
        const absFile = path.resolve(ROOT_DIR, relFile);
        if (fs.existsSync(absFile)) {
          await runGit(['add', relFile]);
          stagedAny = true;
        }
      }

      // Verify staged changes exist
      const diffStaged = await runGit(['diff', '--cached', '--name-only']);
      if (!diffStaged.stdout) {
        return sendJson(res, 400, {
          error: 'No changes detected in portfolio data files. Nothing to commit or publish.',
        });
      }

      // 4. Create Commit with safe argument array
      let commitHash = '';
      try {
        const commitRes = await runGit(['commit', '-m', commitMessage]);
        const hashRes = await runGit(['rev-parse', 'HEAD']);
        commitHash = hashRes.stdout;
      } catch (err) {
        return sendJson(res, 500, {
          error: `Git commit failed: ${err.message}`,
        });
      }

      // 5. Determine branch
      let currentBranch = 'main';
      try {
        const branchRes = await runGit(['branch', '--show-current']);
        currentBranch = branchRes.stdout || 'main';
      } catch (e) {
        currentBranch = 'main';
      }

      // 6. Push to remote using safe process execution
      let pushOutput = '';
      try {
        const pushRes = await runGit(['push', 'origin', currentBranch]);
        pushOutput = pushRes.stderr || pushRes.stdout || 'Push succeeded';
      } catch (err) {
        const errorText = err.message || '';
        let guidance = 'Please verify your local Git credentials or network connection.';
        if (errorText.includes('non-fast-forward') || errorText.includes('fetch first')) {
          guidance = 'Remote has newer commits. Please run `git pull --rebase origin ' + currentBranch + '` on your terminal, then try publishing again.';
        } else if (errorText.includes('Permission denied') || errorText.includes('Authentication failed')) {
          guidance = 'Git authentication failed. Please configure your SSH key (ssh-add) or Git Credential Manager on your local computer.';
        }
        return sendJson(res, 502, {
          error: `Git push failed: ${errorText}`,
          commitCreated: commitHash,
          guidance,
        });
      }

      // Extract GitHub repository URL for Actions link
      let actionsUrl = '';
      try {
        const remoteRes = await runGit(['config', '--get', 'remote.origin.url']);
        const rUrl = remoteRes.stdout;
        if (rUrl.includes('github.com')) {
          const match = rUrl.match(/github\.com[:/]([^/]+)\/([^/.]+)/);
          if (match) {
            actionsUrl = `https://github.com/${match[1]}/${match[2]}/actions`;
          }
        }
      } catch (e) {}

      return sendJson(res, 200, {
        success: true,
        message: 'Successfully committed and published portfolio changes to GitHub!',
        commitHash,
        branch: currentBranch,
        pushOutput,
        actionsUrl,
      });
    }

    // -------------------------------------------------------------
    // SERVE STATIC ADMIN DASHBOARD CLIENT
    // -------------------------------------------------------------
    if (pathname === '/' || pathname === '/index.html') {
      const clientPath = path.join(__dirname, 'client.html');
      if (fs.existsSync(clientPath)) {
        res.writeHead(200, {
          'Content-Type': 'text/html; charset=utf-8',
          'Cache-Control': 'no-cache',
        });
        return fs.createReadStream(clientPath).pipe(res);
      }
    }

    // 404 for unknown routes
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');

  } catch (err) {
    console.error('[Admin Server Error]', err);
    sendJson(res, 500, { error: err.message || 'Internal server error' });
  }
});

// Start listening strictly on 127.0.0.1
server.listen(port, '127.0.0.1', () => {
  console.log(`\n======================================================`);
  console.log(`🕷️  SPIDER-VERSE LOCAL PORTFOLIO ADMIN DASHBOARD`);
  console.log(`======================================================`);
  console.log(`  URL: http://127.0.0.1:${port}`);
  console.log(`  Security: Bound strictly to 127.0.0.1 (Local loopback only)`);
  console.log(`  Auth: Password-protected (PBKDF2 600,000 iterations)`);
  console.log(`  Data files: ${Object.values(APPROVED_FILES).join(', ')}`);
  console.log(`======================================================\n`);
});
