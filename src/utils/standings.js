// utils/standings.js
// Best-of-3 standings
// Winner (first to 2 wins) = 3 pts
// GF = total goals, GA = conceded, GD = GF-GA

function safeNum(x) {
  if (x === "" || x === null || x === undefined) return null;
  const n = Number(x);
  return Number.isFinite(n) ? n : null;
}

function readMatch(m) {
  const group = m.group ?? m.Group ?? m.g ?? null;

  const homeId =
    m.homeId ?? m.playerAId ?? m.aId ?? m.p1Id ?? m.home ?? m.A ?? null;

  const awayId =
    m.awayId ?? m.playerBId ?? m.bId ?? m.p2Id ?? m.away ?? m.B ?? null;

  if (!Array.isArray(m.games)) return { played: false };

  let homeWins = 0;
  let awayWins = 0;
  let homeGoals = 0;
  let awayGoals = 0;

  for (const g of m.games) {
    if (homeWins === 2 || awayWins === 2) break;

    const hg = safeNum(g.homeGoals);
    const ag = safeNum(g.awayGoals);

    if (hg === null || ag === null) continue;

    homeGoals += hg;
    awayGoals += ag;

    if (hg > ag) homeWins++;
    else if (ag > hg) awayWins++;
  }

  const played = homeWins === 2 || awayWins === 2;

  return {
    group,
    homeId,
    awayId,
    homeWins,
    awayWins,
    homeGoals,
    awayGoals,
    played
  };
}

function initRow(p, group) {
  return {
    id: p.id,
    name: p.name,
    group,
    P: 0,
    W: 0,
    L: 0,

    // NEW: game wins / losses (series)
    GSW: 0,
    GSL: 0,

    GF: 0,
    GA: 0,
    GD: 0,
    PTS: 0,
    rank: 0,
  };
}

function applyMatch(
  rowsById,
  homeId,
  awayId,
  homeWins,
  awayWins,
  homeGoals,
  awayGoals
) {
  const a = rowsById.get(homeId);
  const b = rowsById.get(awayId);
  if (!a || !b) return;

  // match played
  a.P += 1;
  b.P += 1;

  // goals
  a.GF += homeGoals;
  a.GA += awayGoals;
  b.GF += awayGoals;
  b.GA += homeGoals;

  a.GD = a.GF - a.GA;
  b.GD = b.GF - b.GA;

  const homeWon = homeWins > awayWins;
  const winner = homeWon ? a : b;
  const loser = homeWon ? b : a;

  // match W/L
  winner.W += 1;
  loser.L += 1;

  // store BO3 result (for display)
  if (homeWon) {
    a.GSW += homeWins;
    a.GSL += awayWins;
    b.GSW += awayWins;
    b.GSL += homeWins;
  } else {
    b.GSW += awayWins;
    b.GSL += homeWins;
    a.GSW += homeWins;
    a.GSL += awayWins;
  }

  // 🎯 POINTS LOGIC (THIS WAS MISSING)
  if (
    (homeWins === 2 && awayWins === 0) ||
    (homeWins === 0 && awayWins === 2)
  ) {
    // 2–0
    winner.PTS += 3;
  } else {
    // 2–1
    winner.PTS += 2;
    loser.PTS += 1;
  }
}

function sortAndRank(rows) {
  const sorted = [...rows].sort((x, y) =>
    (y.PTS - x.PTS) ||
    (y.GD - x.GD) ||
    (y.GF - x.GF) ||
    String(x.name).localeCompare(String(y.name))
  );

  sorted.forEach((r, i) => r.rank = i + 1);
  return sorted;
}

function groupPlayers(players) {
  const byGroup = {};
  for (const p of players || []) {
    const g = p.group ?? p.Group ?? p.g;
    if (!g) continue;
    if (!byGroup[g]) byGroup[g] = [];
    byGroup[g].push(p);
  }
  return byGroup;
}

export function computeAllGroups(players, matches) {
  const playersByGroup = groupPlayers(players);
  const result = {};

  for (const [group, groupPlayersArr] of Object.entries(playersByGroup)) {
    const rowsById = new Map();
    for (const p of groupPlayersArr) rowsById.set(p.id, initRow(p, group));

    for (const m of matches || []) {
      const mm = readMatch(m);
      if (!mm.played) continue;
      if (mm.group !== group) continue;

      applyMatch(
        rowsById,
        mm.homeId,
        mm.awayId,
        mm.homeWins,
        mm.awayWins,
        mm.homeGoals,
        mm.awayGoals
      );
    }
    

    result[group] = sortAndRank([...rowsById.values()]);
  }

  return result;
}
export function getMatchLabel(players, match) {
  const playersById = new Map(players.map(p => [p.id, p]));
  const homePlayer = playersById.get(match.homeId ?? match.home);
  const awayPlayer = playersById.get(match.awayId ?? match.away);

  return {
    homeName: homePlayer?.name || match.homeId || match.home || "?",
    awayName: awayPlayer?.name || match.awayId || match.away || "?"
  };
}