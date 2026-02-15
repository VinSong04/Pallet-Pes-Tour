# 🔄 How to Update Code - PESTOUR

## Quick Answer
**When you change your code, just save the file!** If `npm run dev` is running, changes appear automatically in the browser. ✨

---

## The Problem You Had (FIXED! ✅)

### Before:
- **Hardcoded text** in JSX files (like "Spring 2026", "Legends Start Here") would reset on refresh
- These values weren't saved to localStorage

### After (Now Fixed):
- **All tournament info is now editable** via the Admin page
- Changes are **saved to localStorage** and persist across refreshes
- You can edit:
  - Tournament Name
  - Season (e.g., "Spring 2026")
  - Tagline (e.g., "Legends Start Here")
  - Player names

---

## How Data Persistence Works

### What Gets Saved Automatically:
✅ Tournament name, season, tagline (via Admin page)
✅ Player names (via Admin page)  
✅ Match results (via Matches page)
✅ Knockout bracket (via Knockout page)
✅ Theme preference (dark/light mode)

### What Doesn't Get Saved:
❌ Changes to the **source code** itself (JSX, CSS files)
❌ Static UI text that's hardcoded in components

---

## Development Workflow

### 1. **Start Development Server** (Do this once)
```bash
cd /Users/kvinn/Desktop/PESTOUR
npm run dev
```
Keep this running in a terminal window.

### 2. **Edit Your Code**
- Make changes to any `.jsx`, `.css`, or other source files
- **Save the file** (Cmd+S)
- Browser automatically refreshes with your changes! 🚀

### 3. **Edit Tournament Data**
- Go to the **Admin page** in your browser
- Edit tournament name, season, tagline, or player names
- Click **"💾 Save Changes"**
- Data is saved to localStorage and persists!

### 4. **Deploy Changes** (When ready to publish)
```bash
npm run deploy
```
This builds and pushes to GitHub Pages.

---

## Commands Reference

| Command | When to Use |
|---------|-------------|
| `npm run dev` | Start dev server (keep running while coding) |
| `npm run build` | Build production version |
| `npm run preview` | Preview production build locally |
| `npm run deploy` | Deploy to GitHub Pages |

---

## Data Storage Location

All your tournament data is stored in:
- **Browser localStorage** (key: `"efootball_dashboard_v1"`)
- **Template file**: `/src/data/template.js` (default values)

To reset all data to defaults, use the **"🔄 Reset Template"** button on the Admin page.

---

## Tips

💡 **Keep `npm run dev` running** - You only need to start it once, then just save files to see changes

💡 **Use Admin page for data** - Don't edit tournament info in the code, use the Admin page instead

💡 **Clear localStorage to reset** - If something breaks, use the Reset button on Admin page

💡 **Deploy when ready** - Only run `npm run deploy` when you want to publish changes to the live site
