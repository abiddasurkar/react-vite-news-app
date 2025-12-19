# NewsHub - React + Vite News Application

## Quick Setup Guide

### 1️⃣ Prerequisites
```bash
node --version   # v16+
npm --version    # v7+
```
Install from [Node.js](https://nodejs.org/) if missing.

---

### 2️⃣ Get Your API Key
1. Visit [NewsData.io](https://newsdata.io) → Get API Key.
2. Copy the key for local development or CI/CD.

---

### 3️⃣ Project Setup
```bash
# Navigate to project
cd news-app-abid

# Install dependencies
npm install
```

#### Configure API Key

**For local dev**:
```bash
# Create .env.local
notepad .env.local  # Windows
# Or nano .env.local  # Mac/Linux
```
Add:
```
VITE_NEWSDATA_API_KEY=your_actual_api_key_here
```
> **Note:** For CI/CD, add `VITE_NEWSDATA_API_KEY` as a **GitHub secret** (Settings → Secrets → Actions).

---

### 4️⃣ Run Locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000).

---

### 5️⃣ Test Features
- Login with any valid credentials (email + password ≥ 6 chars)
- Check console logs for JSON login data
- Browse news feed with infinite scroll
- Filter by country and search articles
- Verify login history in `localStorage`
```javascript
// Browser Console:
JSON.parse(localStorage.getItem('loginHistory'))
```

---

### 6️⃣ Build for Production
```bash
npm run build
# Output in 'dist' folder
```

---

### 7️⃣ Deployment (GitHub Pages)
- App deployed via **GitHub Actions CI/CD**
- GH Pages link: [https://abiddasurkar.github.io/react-vite-news-app](https://abiddasurkar.github.io/react-vite-news-app)
- CI/CD pipeline automatically builds & deploys on push to `main`.

**Workflow file**: `.github/workflows/deploy.yml`
```yaml
name: Deploy React App to GitHub Pages

on:
  push:
    branches:
      - main

permissions:
  contents: write

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 18
      - run: npm ci
      - run: npm run build
        env:
          VITE_NEWSDATA_API_KEY: ${{ secrets.VITE_NEWSDATA_API_KEY }}
      - uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

---

### 8️⃣ Project Structure
```
news-app-abid/
├── src/components/
│   ├── Login.jsx       ← Login form
│   ├── NewsList.jsx    ← News feed + infinite scroll
│   └── NewsCard.jsx    ← Individual articles
├── src/App.jsx         ← Main component
├── index.html          ← Entry point
├── .env.local          ← API key (local)
├── vite.config.js      ← Vite settings
├── tailwind.config.js  ← Tailwind CSS config
├── package.json
└── README.md           ← Documentation
```

---

### 9️⃣ Notes
- Local `.env.local` for development
- GitHub Secrets for CI/CD
- Vite `base` in `vite.config.js` set to `/react-vite-news-app/` for GH P