# eFootball Tournament Dashboard (React)

A complete tournament dashboard with **real-time sync** across all devices:

- **12 players**
- **3 groups (A/B/C), 4 players each**
- **Group stage (round-robin inside each group)**
- Qualification to **Last 8**:
  - Top 2 in each group (6 total)
  - **Best 2 third-place** players (2 total)
- **🔥 Real-time Firebase sync** - All devices see the same data instantly!

## ✨ Features

- 🔥 **Real-time sync** via Firebase - Changes appear instantly on all devices
- 📱 **Multi-device support** - Update from phone, see on computer immediately
- 💾 **Cloud storage** - Data persists across devices
- 🎨 **Modern UI** - Beautiful, responsive design with dark/light themes
- 📊 **Live standings** - Auto-calculated rankings and qualifications
- 🏆 **Knockout bracket** - Automatic seeding for Last 8

## Best-of-3 series points system (your rule)

Each group matchup is a **Best-of-3** series. You enter **games won** (0–2):

- **2–0** win → Winner **3 pts**, Loser **0 pts**
- **2–1** win → Winner **2 pts**, Loser **1 pt**

In this ruleset, columns mean:
- **GF** = Games won
- **GA** = Games lost
- **GD** = Game difference (GF − GA)

Tiebreakers used in the app:
**PTS → GD → GF → name**

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Locally (Without Firebase)
```bash
npm run dev
```
Open the URL shown (usually http://localhost:5173).

Data will be stored in **localStorage** (per-device only).

### 3. Enable Real-Time Sync (Optional but Recommended!)

To sync data across all devices in real-time:

1. **Follow the Firebase setup guide**: See [FIREBASE_SETUP.md](FIREBASE_SETUP.md)
2. **Or use the setup script**:
   ```bash
   ./setup-firebase.sh
   ```
3. **Restart dev server**:
   ```bash
   npm run dev
   ```

You'll see a 🔥 **Live Sync** badge in the navigation when Firebase is active!

## Using the dashboard

- **Home**: Tournament overview, progress, and top players
- **Standings**: Group tables, best 3rd place ranking, qualified 8 seeding
- **Matches**: Enter match results (games won) + mark as played
- **Knockout**: Generate and manage Last 8 bracket
- **Admin**: Edit tournament name, season, tagline, and player names

## 🔄 Data Sync Modes

### Without Firebase (Default)
- ✅ Works immediately, no setup needed
- ❌ Each device has separate data
- 💾 Data stored in browser localStorage

### With Firebase (Recommended)
- ✅ All devices share the same data
- ✅ Real-time updates across devices
- ✅ Cloud backup
- 💾 Data stored in Firebase + localStorage backup

## Reset data

On **Admin** page, click **Reset to template**.

If using Firebase, this resets the cloud data for all devices.

## 📦 Deploy

```bash
npm run deploy
```

Deploys to GitHub Pages. Make sure to set up Firebase environment variables for production!

---

## 📚 Documentation

- [FIREBASE_SETUP.md](FIREBASE_SETUP.md) - Complete Firebase setup guide
- [HOW_TO_UPDATE.md](HOW_TO_UPDATE.md) - How to update code and data

---

**Built with React + Vite + Firebase** 🚀

