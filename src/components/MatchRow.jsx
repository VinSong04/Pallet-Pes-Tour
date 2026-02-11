import React, { useMemo } from "react";

export default function MatchRow({ match, homeName, awayName, onChange }) {
  function setGame(idx, homeGoals, awayGoals) {
    const games = [...(match.games || [{}, {}, {}])];
    games[idx] = { homeGoals, awayGoals };
    onChange({ ...match, games });
  }

  // Calculate series score
  const seriesScore = useMemo(() => {
    let homeWins = 0;
    let awayWins = 0;
    for (const g of match.games || []) {
      if (g.homeGoals !== null && g.awayGoals !== null && g.homeGoals !== undefined && g.awayGoals !== undefined) {
        if (g.homeGoals > g.awayGoals) homeWins++;
        else if (g.awayGoals > g.homeGoals) awayWins++;
      }
      if (homeWins === 2 || awayWins === 2) break;
    }
    return { homeWins, awayWins };
  }, [match.games]);

  const isComplete = seriesScore.homeWins === 2 || seriesScore.awayWins === 2;

  return (
    <div className="matchbox" style={match.played ? { borderColor: "rgba(52, 211, 153, 0.2)" } : {}}>
      <div className="title">
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          <strong style={{ fontSize: 15 }}>{match.id}</strong>
          <span className="badge">Group {match.group}</span>
          {match.played && (
            <span className="match-status played">✅ Played</span>
          )}
          {!match.played && isComplete && (
            <span className="match-status pending">⚡ Ready</span>
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
            checked={!!match.played}
            onChange={(e) => onChange({ ...match, played: e.target.checked })}
          />
          <span style={{ fontWeight: 600 }}>Played</span>
        </label>
      </div>

      {/* Series Score Summary */}
      <div
        style={{
          textAlign: "center",
          padding: "10px 0",
          marginBottom: 12,
          borderRadius: 10,
          background: "rgba(108, 140, 255, 0.04)",
          border: "1px solid rgba(108, 140, 255, 0.08)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 16 }}>
          <span style={{
            fontWeight: 800,
            fontSize: 15,
            color: seriesScore.homeWins >= seriesScore.awayWins ? "var(--text)" : "var(--muted)",
          }}>
            {homeName}
          </span>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "4px 16px",
            borderRadius: 10,
            background: "rgba(0, 0, 0, 0.2)",
            fontFamily: "var(--font-heading)",
          }}>
            <span style={{
              fontSize: 22,
              fontWeight: 900,
              color: seriesScore.homeWins > seriesScore.awayWins ? "var(--good)" : "var(--text)",
            }}>
              {seriesScore.homeWins}
            </span>
            <span style={{ color: "var(--muted)", fontWeight: 600 }}>–</span>
            <span style={{
              fontSize: 22,
              fontWeight: 900,
              color: seriesScore.awayWins > seriesScore.homeWins ? "var(--good)" : "var(--text)",
            }}>
              {seriesScore.awayWins}
            </span>
          </div>
          <span style={{
            fontWeight: 800,
            fontSize: 15,
            color: seriesScore.awayWins >= seriesScore.homeWins ? "var(--text)" : "var(--muted)",
          }}>
            {awayName}
          </span>
        </div>
      </div>

      {/* Individual Games */}
      <div className="teams">
        {[0, 1, 2].map((gameIdx) => {
          const g = (match.games || [{}, {}, {}])[gameIdx];
          const homeG = g.homeGoals;
          const awayG = g.awayGoals;
          const gameComplete = homeG !== null && homeG !== undefined && awayG !== null && awayG !== undefined;
          const homeWon = gameComplete && homeG > awayG;
          const awayWon = gameComplete && awayG > homeG;

          // Don't show Game 3 if series is already decided after 2 games
          const seriesDecidedBefore = (() => {
            let hw = 0, aw = 0;
            for (let i = 0; i < gameIdx; i++) {
              const gi = (match.games || [{}, {}, {}])[i];
              if (gi.homeGoals !== null && gi.homeGoals !== undefined && gi.awayGoals !== null && gi.awayGoals !== undefined) {
                if (gi.homeGoals > gi.awayGoals) hw++;
                else if (gi.awayGoals > gi.homeGoals) aw++;
              }
            }
            return hw === 2 || aw === 2;
          })();

          if (seriesDecidedBefore && !gameComplete) return null;

          return (
            <div
              key={gameIdx}
              style={{
                padding: "10px 14px",
                borderBottom: gameIdx < 2 ? "1px solid var(--border)" : "none",
                borderRadius: gameIdx === 0 ? "12px 12px 0 0" : gameIdx === 2 ? "0 0 12px 12px" : 0,
                background: "rgba(255, 255, 255, 0.02)",
              }}
            >
              <div
                className="small"
                style={{
                  marginBottom: 8,
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                Game {gameIdx + 1}
                {gameComplete && (
                  <span
                    style={{
                      fontSize: 10,
                      padding: "1px 6px",
                      borderRadius: 999,
                      background: homeWon || awayWon ? "rgba(52, 211, 153, 0.1)" : "rgba(251, 191, 36, 0.1)",
                      color: homeWon || awayWon ? "var(--good)" : "var(--warn)",
                      fontWeight: 700,
                    }}
                  >
                    {homeWon ? `${homeName} wins` : awayWon ? `${awayName} wins` : "Draw"}
                  </span>
                )}
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 60px 60px 1fr",
                  gap: 8,
                  alignItems: "center",
                }}
              >
                <span style={{ fontWeight: homeWon ? 800 : 600, color: homeWon ? "var(--good)" : "inherit" }}>
                  {homeName}
                </span>
                <input
                  className="input game-input"
                  inputMode="numeric"
                  min={0}
                  value={homeG ?? ""}
                  placeholder="0"
                  onChange={(e) =>
                    setGame(
                      gameIdx,
                      e.target.value === "" ? null : Number(e.target.value),
                      awayG
                    )
                  }
                />
                <input
                  className="input game-input"
                  inputMode="numeric"
                  min={0}
                  value={awayG ?? ""}
                  placeholder="0"
                  onChange={(e) =>
                    setGame(
                      gameIdx,
                      homeG,
                      e.target.value === "" ? null : Number(e.target.value)
                    )
                  }
                />
                <span
                  style={{
                    textAlign: "right",
                    fontWeight: awayWon ? 800 : 600,
                    color: awayWon ? "var(--good)" : "inherit",
                  }}
                >
                  {awayName}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
