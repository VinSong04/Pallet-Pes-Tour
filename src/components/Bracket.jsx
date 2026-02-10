import React from "react";

export default function Bracket({ qf, onUpdate }) {
  function setMatch(idx, patch) {
    const next = qf.slice();
    next[idx] = { ...next[idx], ...patch };
    onUpdate(next);
  }

  return (
    <div className="card">
      <h2>Quarterfinals (Last 8)</h2>
      <div className="sub">Generated from overall seeding (1v8, 2v7, 3v6, 4v5). Enter games won (0–2).</div>

      <div className="bracket">
        {qf.map((m, idx) => (
          <div key={m.id} className="matchbox">
            <div className="title">
              <div>
                <strong>{m.id}</strong>{" "}
                <span className="badge">Seed {m.homeSeed} vs {m.awaySeed}</span>{" "}
                <span className="badge">({m.homeGroup} vs {m.awayGroup})</span>
              </div>
              <label className="small" style={{display:"flex", gap:8, alignItems:"center"}}>
                <input type="checkbox" checked={!!m.played} onChange={(e)=>setMatch(idx, { played: e.target.checked })}/>
                Played
              </label>
            </div>

            <div className="teams">
              <div className="teamline">
                <span><strong>{m.homeName}</strong></span>
                <input className="input" style={{maxWidth: 90, textAlign:"center"}} inputMode="numeric" min={0} max={2}
                  value={m.homeScore ?? ""} placeholder="0-2"
                  onChange={(e)=>setMatch(idx, { homeScore: e.target.value===""?null:Number(e.target.value) })}
                />
              </div>
              <div className="teamline">
                <span><strong>{m.awayName}</strong></span>
                <input className="input" style={{maxWidth: 90, textAlign:"center"}} inputMode="numeric" min={0} max={2}
                  value={m.awayScore ?? ""} placeholder="0-2"
                  onChange={(e)=>setMatch(idx, { awayScore: e.target.value===""?null:Number(e.target.value) })}
                />
              </div>
            </div>

            <div className="small" style={{marginTop: 8}}>
              Use same Best-of-3 input style. (Knockout winner handling can be added if you want.)
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
