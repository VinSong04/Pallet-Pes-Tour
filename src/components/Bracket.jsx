import React from "react";

export default function Bracket({ qf, onUpdate }) {
  function setMatch(idx, patch) {
    const next = qf.slice();
    next[idx] = { ...next[idx], ...patch };
    onUpdate(next);
  }

  return (
    <div className="ko-bracket-section">
      <div className="section-title" style={{ marginTop: 16 }}>
        <span className="icon">⚔️</span>
        Quarterfinals (Last 8)
      </div>

      <div className="ko-bracket-grid">
        {qf.map((m, idx) => {
          const homeWin = m.homeScore !== null && m.awayScore !== null && m.homeScore > m.awayScore;
          const awayWin = m.homeScore !== null && m.awayScore !== null && m.awayScore > m.homeScore;

          return (
            <div
              key={m.id}
              className="ko-matchcard"
              style={{
                animationDelay: `${idx * 0.08}s`,
                ...(m.played ? { borderColor: "rgba(52, 211, 153, 0.2)" } : {}),
              }}
            >
              {/* Header */}
              <div className="ko-matchcard-header">
                <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                  <strong style={{ fontSize: 15, fontFamily: "var(--font-heading)" }}>{m.id}</strong>
                  <span className="badge accent" style={{ fontSize: 10 }}>
                    Seed {m.homeSeed} vs {m.awaySeed}
                  </span>
                  {m.played && (
                    <span className="match-status played">✅ Complete</span>
                  )}
                </div>
                <label
                  className="small"
                  style={{
                    display: "flex",
                    gap: 8,
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={!!m.played}
                    onChange={(e) =>
                      setMatch(idx, { played: e.target.checked })
                    }
                  />
                  <span style={{ fontWeight: 600 }}>Played</span>
                </label>
              </div>

              {/* Body - Team rows */}
              <div className="ko-matchcard-body">
                {/* Home Team */}
                <div className={`ko-team-row ${homeWin ? "winner-row" : ""}`}>
                  <div className="ko-team-info">
                    <span className="ko-seed">#{m.homeSeed}</span>
                    <span className="ko-team-name">
                      {homeWin && "🏆 "}{m.homeName}
                    </span>
                  </div>
                  <input
                    className="ko-score-input"
                    inputMode="numeric"
                    min={0}
                    max={2}
                    value={m.homeScore ?? ""}
                    placeholder="–"
                    onChange={(e) =>
                      setMatch(idx, {
                        homeScore:
                          e.target.value === "" ? null : Number(e.target.value),
                      })
                    }
                  />
                </div>

                {/* VS divider */}
                <div style={{
                  textAlign: "center",
                  padding: "4px 0",
                  fontSize: 11,
                  fontWeight: 800,
                  color: "var(--muted)",
                  letterSpacing: "0.15em",
                  background: "rgba(0, 0, 0, 0.1)",
                }}>
                  VS
                </div>

                {/* Away Team */}
                <div className={`ko-team-row ${awayWin ? "winner-row" : ""}`}>
                  <div className="ko-team-info">
                    <span className="ko-seed">#{m.awaySeed}</span>
                    <span className="ko-team-name">
                      {awayWin && "🏆 "}{m.awayName}
                    </span>
                  </div>
                  <input
                    className="ko-score-input"
                    inputMode="numeric"
                    min={0}
                    max={2}
                    value={m.awayScore ?? ""}
                    placeholder="–"
                    onChange={(e) =>
                      setMatch(idx, {
                        awayScore:
                          e.target.value === "" ? null : Number(e.target.value),
                      })
                    }
                  />
                </div>
              </div>

              {/* Winner banner */}
              {m.played && (homeWin || awayWin) && (
                <div className="ko-winner-banner">
                  <span className="winner-tag">
                    🏆 {homeWin ? m.homeName : m.awayName} advances
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
