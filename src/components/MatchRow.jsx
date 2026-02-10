import React from "react";
import MatchRules from "./MatchRules";

export default function MatchRow({ match, homeName, awayName, onChange }) {
  function setGame(idx, homeGoals, awayGoals) {
    const games = [...(match.games || [{},{},{}])];
    games[idx] = { homeGoals, awayGoals };
    onChange({ ...match, games });
  }

  return (
    <div className="matchbox">
      <div className="title">
        <div>
          <strong>{match.id}</strong> <span className="badge">Group {match.group}</span>
        </div>
        <label className="small" style={{display:"flex", gap:8, alignItems:"center"}}>
          <input type="checkbox" checked={!!match.played} onChange={(e)=> onChange({...match, played: e.target.checked})} />
          Played
        </label>
      </div>

      <div className="teams">
        {[0, 1, 2].map(gameIdx => {
          const g = (match.games || [{},{},{}])[gameIdx];
          const homeG = g.homeGoals;
          const awayG = g.awayGoals;
          return (
            <div key={gameIdx} style={{marginBottom: 12, paddingBottom: 12, borderBottom: gameIdx < 2 ? "1px solid var(--border)" : "none"}}>
              <div className="small" style={{marginBottom: 8, color: "var(--muted)", fontWeight: 600}}>Game {gameIdx + 1}</div>
              <div style={{display: "grid", gridTemplateColumns: "1fr 60px 60px 1fr", gap: 8, alignItems: "center"}}>
                <span><strong>{homeName}</strong></span>
                <input className="input game-input"
                  inputMode="numeric" min={0}
                  value={homeG ?? ""} placeholder="0"
                  onChange={(e)=> setGame(gameIdx, e.target.value===""?null:Number(e.target.value), awayG)}
                />
                <input className="input game-input"
                  inputMode="numeric" min={0}
                  value={awayG ?? ""} placeholder="0"
                  onChange={(e)=> setGame(gameIdx, homeG, e.target.value===""?null:Number(e.target.value))}
                />
                <span><strong>{awayName}</strong></span>
              </div>
            </div>
          );
        })}
      </div>

      <MatchRules />
    </div>
  );
}
