# eFootball Tournament Dashboard (React)

A complete local-first standings + knockout dashboard for:

- **12 players**
- **3 groups (A/B/C), 4 players each**
- **Group stage (round-robin inside each group)**
- Qualification to **Last 8**:
  - Top 2 in each group (6 total)
  - **Best 2 third-place** players (2 total)

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

## Run locally

```bash
npm install
npm run dev
```

Open the URL shown (usually http://localhost:5173).

## Using the dashboard

- **Admin**: rename tournament + player names
- **Matches**: enter **games won** + tick **Played** (only valid results count: 2–0, 2–1, 0–2, 1–2)
- **Standings**: auto-updates + best-3rd ranking + qualified 8 seeding
- **Knockout**: generate Last 8 bracket from seeded qualifiers

## Reset data

On **Admin** page, click **Reset to template**.

---

Want semifinals/final auto-advance or head-to-head tiebreakers? Tell me and I’ll extend it.
