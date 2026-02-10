import React, { useMemo } from "react";
import { useAppState } from "../state/AppState";
import { computeAllGroups } from "../utils/standings";
import { getQualifiers } from "../utils/qualifiers";
import { generateQuarterfinals } from "../utils/bracket";
import Bracket from "../components/Bracket";

export default function KnockoutPage() {
  const { state, updateState } = useAppState();
  const groupTables = useMemo(() => computeAllGroups(state.players, state.matches), [state.players, state.matches]);
  const q = useMemo(() => getQualifiers(groupTables), [groupTables]);
  const canGenerate = q.seeded.length === 8;

  function generate() {
    if (!canGenerate) return;
    const qf = generateQuarterfinals(q.seeded);
    updateState(prev => ({ ...prev, knockout: { ...prev.knockout, qf } }));
  }

  function updateQF(nextQf) {
    updateState(prev => ({ ...prev, knockout: { ...prev.knockout, qf: nextQf } }));
  }

  return (
    <div className="container">
      <div className="card">
        <div className="toolbar">
          <div>
            <h2>Knockout</h2>
            <div className="sub">Last 8 (Quarterfinals) generated from qualified 8.</div>
          </div>
          <div style={{display:"flex", gap:10, alignItems:"center"}}>
            <button className="btn" onClick={generate} disabled={!canGenerate}>Generate bracket</button>
            {!canGenerate && <span className="small">Need 8 qualifiers (finish group results).</span>}
          </div>
        </div>
      </div>

      {state.knockout?.qf?.length ? (
        <Bracket qf={state.knockout.qf} onUpdate={updateQF} />
      ) : (
        <div className="card">
          <h2>No bracket yet</h2>
          <div className="sub">Finish group stage results, then click <strong>Generate bracket</strong>.</div>
        </div>
      )}

      <div className="card" style={{marginTop: 14}}>
        <h2>Qualified 8 (for bracket)</h2>
        <div className="sub">This list drives bracket generation.</div>
        <table className="table">
          <thead>
            <tr>
              <th style={{width:"45%"}}>Player</th>
              <th>Group</th><th>PTS</th><th>GD</th><th>GF</th><th>Seed</th>
            </tr>
          </thead>
          <tbody>
            {q.seeded.map(r => (
              <tr key={r.id}>
                <td><strong>{r.seed}. {r.name}</strong></td>
                <td>{r.group}</td>
                <td><strong>{r.PTS}</strong></td>
                <td>{r.GD}</td>
                <td>{r.GF}</td>
                <td><span className="badge good">#{r.seed}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
