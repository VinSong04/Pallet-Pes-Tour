function sameGroup(a,b){ return a?.group && b?.group && a.group === b.group; }

export function generateQuarterfinals(seeded) {
  const s = seeded.slice().sort((a,b)=>a.seed-b.seed);
  let pairs = [[s[0],s[7]],[s[1],s[6]],[s[2],s[5]],[s[3],s[4]]];

  for (let i=0;i<pairs.length;i++){
    if (!sameGroup(pairs[i][0], pairs[i][1])) continue;
    for (let j=i+1;j<pairs.length;j++){
      const a1=pairs[i][0], b1=pairs[i][1], a2=pairs[j][0], b2=pairs[j][1];
      if (!sameGroup(a1,b2) && !sameGroup(a2,b1)){
        pairs[i][1]=b2; pairs[j][1]=b1; break;
      }
    }
  }

  return pairs.map((p, idx)=>({
    id:`QF${idx+1}`, round:"QF",
    homeId:p[0].id, awayId:p[1].id,
    homeName:p[0].name, awayName:p[1].name,
    homeSeed:p[0].seed, awaySeed:p[1].seed,
    homeGroup:p[0].group, awayGroup:p[1].group,
    homeScore:null, awayScore:null, played:false
  }));
}
