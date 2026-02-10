import React, { useMemo, useState } from "react";
import { useAppState } from "../state/AppState";
import { getMatchLabel } from "../utils/standings";
import MatchRow from "../components/MatchRow";

export default function MatchesPage() {
  const { state, updateState } = useAppState();
  const [group, setGroup] = useState("ALL");
  const groups = useMemo(() => Array.from(new Set(state.players.map(p => p.group))).sort(), [state.players]);

  const filtered = useMemo(() => {
    if (group === "ALL") return state.matches;
    return state.matches.filter(x => x.group === group);
  }, [state.matches, group]);

  function updateMatch(nextMatch) {
    updateState(prev => ({ ...prev, matches: prev.matches.map(m => m.id === nextMatch.id ? nextMatch : m) }));
  }

  return (
    <div className="container">
      <div className="card">
        <div className="toolbar">
          <div>
            <h2>Matches</h2>
            <div className="sub">Enter <strong>goal scores</strong> for each game in the Best-of-3 series and tick <span className="kbd">Played</span>.</div>
          </div>
          <div style={{display:"flex", gap:10, alignItems:"center"}}>
            <span className="small">Filter:</span>
            <select value={group} onChange={(e)=>setGroup(e.target.value)}>
              <option value="ALL">All Groups</option>
              {groups.map(g => <option key={g} value={g}>Group {g}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="grid">
        <div className="card">
          <div className="small" style={{marginBottom: 10}}>
            Best-of-3 series: First to win 2 games advances. Winner of 2-0 gets 3 pts, winner of 2-1 gets 2 pts and loser gets 1 pt.
          </div>
          <div className="bracket">
            {filtered.map(m => {
              const { homeName, awayName } = getMatchLabel(state.players, m);
              return <MatchRow key={m.id} match={m} homeName={homeName} awayName={awayName} onChange={updateMatch} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
