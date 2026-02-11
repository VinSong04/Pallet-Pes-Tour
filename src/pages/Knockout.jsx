import React, { useMemo } from "react";
import { useAppState } from "../state/AppState";
import { computeAllGroups } from "../utils/standings";
import { getQualifiers } from "../utils/qualifiers";
import { generateQuarterfinals } from "../utils/bracket";
import Bracket from "../components/Bracket";
import { getPlayerLogoPath } from "../utils/playerLogos";
import Footer from "../components/Footer";

export default function KnockoutPage() {
  const { state, updateState } = useAppState();

  const groupTables = useMemo(
    () => computeAllGroups(state.players, state.matches),
    [state.players, state.matches]
  );

  const q = useMemo(() => getQualifiers(groupTables), [groupTables]);
  const canGenerate = q.seeded.length === 8;

  function generate() {
    if (!canGenerate) return;
    const qf = generateQuarterfinals(q.seeded);
    updateState((prev) => ({
      ...prev,
      knockout: { ...prev.knockout, qf },
    }));
  }

  function updateQF(nextQf) {
    updateState((prev) => ({
      ...prev,
      knockout: { ...prev.knockout, qf: nextQf },
    }));
  }

  function clearBracket() {
    updateState((prev) => ({
      ...prev,
      knockout: { ...prev.knockout, qf: [] },
    }));
  }

  // Count completed QF matches
  const completedQF = (state.knockout?.qf || []).filter((m) => m.played).length;
  const totalQF = (state.knockout?.qf || []).length;

  return (
    <div className="container fade-in">
      {/* Header */}
      <div className="card">
        <div className="toolbar">
          <div>
            <h2>🏆 Knockout Stage</h2>
            <div className="sub">
              Last 8 (Quarterfinals) generated from the qualified 8 seeding.
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
            {totalQF > 0 && (
              <span className="badge accent">
                {completedQF}/{totalQF} Complete
              </span>
            )}
            <button className="btn success" onClick={generate} disabled={!canGenerate}>
              ⚡ Generate Bracket
            </button>
            {state.knockout?.qf?.length > 0 && (
              <button className="btn danger" onClick={clearBracket}>
                🗑️ Clear
              </button>
            )}
          </div>
        </div>
        {!canGenerate && (
          <div
            className="small"
            style={{
              marginTop: 10,
              padding: "10px 14px",
              borderRadius: 10,
              background: "rgba(251, 191, 36, 0.06)",
              border: "1px solid rgba(251, 191, 36, 0.15)",
            }}
          >
            ⚠️ Need <strong>8 qualifiers</strong> to generate the bracket.
            Currently {q.seeded.length}/8 — finish group stage results first.
          </div>
        )}
      </div>

      {/* Bracket Display */}
      {state.knockout?.qf?.length > 0 ? (
        <Bracket qf={state.knockout.qf} onUpdate={updateQF} />
      ) : (
        <div className="card" style={{ marginTop: 16 }}>
          <div className="empty-state">
            <div className="icon">🏆</div>
            <h3>No Bracket Generated</h3>
            <p>
              Finish group stage results, then click{" "}
              <strong>Generate Bracket</strong> above.
            </p>
          </div>
        </div>
      )}

      {/* Qualified 8 for Bracket */}
      <div className="card" style={{ marginTop: 16 }}>
        <div className="toolbar">
          <div>
            <h2>🎯 Qualified 8 (Seeding)</h2>
            <div className="sub">
              This seeding order drives bracket generation (1v8, 2v7, 3v6, 4v5).
            </div>
          </div>
          <span className="badge accent">{q.seeded.length}/8 Players</span>
        </div>

        {q.seeded.length > 0 ? (
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th style={{ width: "8%" }}>Seed</th>
                  <th style={{ width: "35%" }}>Player</th>
                  <th>Group</th>
                  <th>PTS</th>
                  <th>GD</th>
                  <th>GF</th>
                  <th>Match</th>
                </tr>
              </thead>
              <tbody>
                {q.seeded.map((r) => (
                  <tr key={r.id}>
                    <td>
                      <span className="badge good">#{r.seed}</span>
                    </td>
                    <td>
                      <span className="rowtag">
                        {getPlayerLogoPath(r.name) && (
                          <img
                            src={getPlayerLogoPath(r.name)}
                            alt={r.name}
                          />
                        )}
                        <strong>{r.name}</strong>
                      </span>
                    </td>
                    <td>
                      <span className="badge">Group {r.group}</span>
                    </td>
                    <td>
                      <strong>{r.PTS}</strong>
                    </td>
                    <td
                      style={{
                        color:
                          r.GD > 0
                            ? "var(--good)"
                            : r.GD < 0
                              ? "var(--bad)"
                              : "var(--muted)",
                      }}
                    >
                      {r.GD > 0 ? "+" : ""}
                      {r.GD}
                    </td>
                    <td>{r.GF}</td>
                    <td className="small">
                      vs #{9 - r.seed}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty-state">
            <div className="icon">🏟️</div>
            <h3>No Qualifiers Yet</h3>
            <p>Complete group stage matches to determine the qualified 8.</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
