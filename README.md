# 🕷️ Akash Pratap Singh — Spider-Verse Architect Portfolio

A high-energy, comic-book styled portfolio for a backend and AI engineer, featuring halftone patterns, spider-web skill nodes, multiverse experience timeline, and glitch effects inspired by *Spider-Man: Into the Spider-Verse*.

---

## 🚀 Quick Start

### 1. Run Public Portfolio
To run the public React + TypeScript portfolio in development mode:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 2. Build for Production
To build the static distribution for deployment:
```bash
npm run build
```

---

## 🛠️ Local Admin Dashboard (Offline & Secure)

Manage your skills, categories, projects, and experience through a UI that runs **strictly on your local computer** (`127.0.0.1`) and publishes directly to GitHub via your local Git installation.

### Start the Admin Tool
```bash
npm run admin
```
Or specify a custom port:
```bash
npm run admin -- --port=3002
# or
ADMIN_PORT=3002 npm run admin
```
Access the dashboard at:
👉 **[http://127.0.0.1:3001](http://127.0.0.1:3001)**

---

## 🔒 Security Architecture

- **Bound to `127.0.0.1` only:** Network interface isolation prevents any remote or LAN connections.
- **Password-Only Protection:** No username needed. First run prompts you to create your local password (min 8 characters).
- **PBKDF2 Key Derivation:** Uses 600,000 iterations of SHA-256 with a unique 32-byte cryptographically random salt (`crypto.pbkdf2Sync`) and constant-time verification (`crypto.timingSafeEqual`).
- **Brute-Force Rate Limiting:** Increasing delays after failed attempts and automatic 5-minute lockout after 5 consecutive failures.
- **Short-Lived Sessions:** Auto-expires after 30 minutes of inactivity.
- **No Token in Frontend/Storage:** No GitHub tokens or credentials stored in browser localStorage or frontend source code. Git operations use your local machine's pre-configured SSH keys or Git Credential Manager.
- **Whitelisted File Staging:** The publish workflow **strictly stages only** approved content files (`data/skills.json`, `data/projects.json`, `data/experience.json`). It will never run `git add .` or touch unrelated source files.
- **Safe Process Spawning:** Invokes `git` via `child_process.spawn` with explicit argument arrays, preventing shell interpolation or injection.

---

## 📂 Content Data Files

Portfolio content is stored in version-controlled JSON files:

- `data/skills.json` — Categorized technical skills, category order, and Spider-Verse accent colors.
- `data/projects.json` — Projects, descriptions, tech stacks, cover images, live demo links, and GitHub links.
- `data/experience.json` — Roles, companies, timelines, employment types, locations, and bullet points.

When editing in the Admin Tool, changes are kept in an in-memory draft until you click **"Save to Disk"** (which also creates an automatic timestamped backup in `admin-tool/backups/`).

---

## 🌐 Publishing to GitHub & Automated Deployment

1. Make edits in the **Skills**, **Projects**, or **Experience** tabs.
2. Review your changes in the **Live Preview** pane.
3. Switch to the **🚀 Publish** tab.
4. Click **"Save to Disk"** to persist changes.
5. Review the **Git Diff** to verify additions/removals.
6. Enter a commit message (e.g. `Update portfolio content`) and click **"Publish to GitHub"**.
7. The admin tool will:
   - Verify Git status and current branch.
   - Stage approved files: `git add data/skills.json data/projects.json data/experience.json`.
   - Commit: `git commit -m "<message>"`.
   - Push: `git push origin <branch>`.
8. GitHub Actions (`.github/workflows/deploy.yml`) will automatically trigger, build the portfolio, and deploy it to GitHub Pages / your hosting provider.

---

## 🛟 Troubleshooting & Recovery

- **Remote has newer commits (non-fast-forward push):**  
  Run `git pull --rebase origin main` in your terminal to incorporate remote changes, then re-publish.
- **Git authentication failed:**  
  Ensure your SSH key is added (`ssh-add ~/.ssh/id_ed25519`) or configure your GitHub CLI / Git Credential Manager (`gh auth login`).
- **Reset Admin Password:**  
  Delete `admin-tool/.admin-auth.json` and restart `npm run admin` to set a fresh password.
