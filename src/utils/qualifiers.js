export function getQualifiers(groupTables) {
  const groups = Object.keys(groupTables).sort();
  const qualified = [];
  const thirds = [];

  for (const g of groups) {
    const table = groupTables[g];
    if (!table || table.length === 0) continue;
    qualified.push(...table.slice(0,2).map(r => ({...r, qualifyAs: `${g}${r.rank}`})));
    if (table[2]) thirds.push({...table[2], qualifyAs: `${g}3`});
  }

  thirds.sort((a,b)=> (b.PTS-a.PTS) || (b.GD-a.GD) || (b.GF-a.GF) || a.name.localeCompare(b.name));
  const bestThirds = thirds.slice(0,2).map(r => ({...r, qualifyAs: "Best3"}));

  const seeded = [...qualified, ...bestThirds]
    .sort((a,b)=> (b.PTS-a.PTS) || (b.GD-a.GD) || (b.GF-a.GF) || a.name.localeCompare(b.name))
    .map((r,i)=> ({...r, seed:i+1}));

  return { groups, top2: qualified, thirdCandidates: thirds, bestThirds, seeded };
}
