import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useAppState } from "../state/AppState";
import { computeAllGroups } from "../utils/standings";
import { getPlayerLogoPath } from "../utils/playerLogos";
import palletLogo from "../assets/pallet.jpg";
import Footer from "../components/Footer";

export default function HomePage() {
  const { state } = useAppState();
  const [showRules, setShowRules] = useState(false);

  // Compute group standings for stats
  const groupTables = useMemo(
    () => computeAllGroups(state.players, state.matches),
    [state.players, state.matches]
  );

  // Stats
  const totalPlayers = state.players?.length || 12;
  const totalGroups = Object.keys(groupTables).length || 3;
  const matchesPlayed = state.matches?.filter((m) => m.played).length || 0;
  const totalMatches = state.matches?.length || 18;
  const progress = totalMatches > 0 ? (matchesPlayed / totalMatches) * 100 : 0;
  const tournamentName = state.tournament?.name || "Pallet Pes Tour";
  const season = state.tournament?.season || "Spring 2026";
  const tagline = state.tournament?.tagline || "Legends Start Here";

  // Top scorers from standings
  const allPlayers = useMemo(() => {
    const all = [];
    for (const g of Object.values(groupTables)) {
      all.push(...g);
    }
    return all.sort((a, b) => b.PTS - a.PTS || b.GD - a.GD || b.GF - a.GF);
  }, [groupTables]);

  const topPlayers = allPlayers.slice(0, 4);

  return (
    <div className="container fade-in">
      {/* Hero Section */}
      <div className="hero">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="live-dot" />
            {season}
          </div>
          <div className="hero-logo-container">
            <img
              src={palletLogo}
              alt="Pallet eFootball Championship"
              className="hero-logo"
            />
          </div>
          <h1 className="hero-title">{tournamentName}</h1>
          <p className="hero-tagline">{tagline}</p>

          <div className="hero-actions">
            <Link to="/standings" className="hero-btn primary">
              📊 View Standings
            </Link>
            <Link to="/matches" className="hero-btn secondary">
              🎮 Enter Scores
            </Link>
          </div>
        </div>
      </div>

      {/* Tournament Progress */}
      <div className="card progress-card">
        <div className="toolbar">
          <h2>🏆 Tournament Progress</h2>
          <span className="badge accent">{Math.round(progress)}% Complete</span>
        </div>
        <div className="progress-bar-container" style={{ marginTop: 12 }}>
          <div className="progress-bar" style={{ width: `${progress}%` }} />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 10,
          }}
        >
          <span className="small">
            {matchesPlayed} of {totalMatches} matches played
          </span>
          <span className="small">
            {matchesPlayed === totalMatches
              ? "✅ Group stage complete!"
              : `${totalMatches - matchesPlayed} remaining`}
          </span>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid stagger" style={{ marginTop: 16 }}>
        <div className="card span3 stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-value">{totalPlayers}</div>
          <div className="stat-label">Players</div>
        </div>
        <div className="card span3 stat-card">
          <div className="stat-icon">🏟️</div>
          <div className="stat-value">{totalGroups}</div>
          <div className="stat-label">Groups</div>
        </div>
        <div className="card span3 stat-card">
          <div className="stat-icon">⚽</div>
          <div className="stat-value">{matchesPlayed}</div>
          <div className="stat-label">Played</div>
        </div>
        <div className="card span3 stat-card">
          <div className="stat-icon">🎯</div>
          <div className="stat-value">8</div>
          <div className="stat-label">Qualify</div>
        </div>
      </div>

      {/* Top Players Preview */}
      {topPlayers.length > 0 && topPlayers.some((p) => p.PTS > 0) && (
        <div className="card" style={{ marginTop: 16 }}>
          <div className="toolbar">
            <h2>🔥 Top Players</h2>
            <Link to="/standings" className="btn ghost" style={{ fontSize: 13 }}>
              View all →
            </Link>
          </div>
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th style={{ width: "8%" }}>#</th>
                  <th style={{ width: "35%" }}>Player</th>
                  <th>Group</th>
                  <th>W-L</th>
                  <th>GD</th>
                  <th>PTS</th>
                </tr>
              </thead>
              <tbody>
                {topPlayers.map((p, i) => (
                  <tr key={p.id}>
                    <td>
                      <span
                        style={{
                          fontSize: i === 0 ? 18 : 14,
                          fontWeight: 800,
                        }}
                      >
                        {i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `${i + 1}`}
                      </span>
                    </td>
                    <td>
                      <span className="rowtag">
                        {getPlayerLogoPath(p.name) && (
                          <img
                            src={getPlayerLogoPath(p.name)}
                            alt={p.name}
                          />
                        )}
                        <strong>{p.name}</strong>
                      </span>
                    </td>
                    <td>
                      <span className="badge">Group {p.group}</span>
                    </td>
                    <td>
                      {p.W}-{p.L}
                    </td>
                    <td
                      style={{
                        color:
                          p.GD > 0
                            ? "var(--good)"
                            : p.GD < 0
                              ? "var(--bad)"
                              : "var(--muted)",
                      }}
                    >
                      {p.GD > 0 ? "+" : ""}
                      {p.GD}
                    </td>
                    <td>
                      <strong style={{ fontSize: 16 }}>{p.PTS}</strong>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Quick Links */}
      <div className="section-title">
        <span className="icon">🚀</span>
        Quick Links
      </div>
      <div className="grid stagger">
        <Link to="/standings" className="card span6 quick-link">
          <span className="ql-icon">📊</span>
          <div>
            <strong>Standings</strong>
            <p className="small">Group tables, rankings & qualification status</p>
          </div>
        </Link>
        <Link to="/matches" className="card span6 quick-link">
          <span className="ql-icon">🎮</span>
          <div>
            <strong>Matches</strong>
            <p className="small">Enter scores & manage match results</p>
          </div>
        </Link>
        <Link to="/knockout" className="card span6 quick-link">
          <span className="ql-icon">🏆</span>
          <div>
            <strong>Knockout</strong>
            <p className="small">Last 8 bracket & elimination rounds</p>
          </div>
        </Link>
        <Link to="/admin" className="card span6 quick-link">
          <span className="ql-icon">⚙️</span>
          <div>
            <strong>Admin</strong>
            <p className="small">Rename players, reset tournament data</p>
          </div>
        </Link>
      </div>

      {/* Rules Section */}
      <div className="card rules-card" style={{ marginTop: 20 }}>
        <div
          className="toolbar"
          style={{ cursor: "pointer" }}
          onClick={() => setShowRules(!showRules)}
        >
          <h2>📋 Tournament Rules</h2>
          <button className="btn ghost" style={{ fontSize: 13 }}>
            {showRules ? "▲ Hide" : "▼ Show"}
          </button>
        </div>
        {showRules && (
          <div className="fade-in">
            <ul className="rules-list">
              <li>
                <span className="rule-icon">🎮</span>
                <div>
                  Each group matchup is a <strong>Best-of-3</strong> series (first to
                  2 game wins).
                </div>
              </li>
              <li>
                <span className="rule-icon">🏆</span>
                <div>
                  <strong>2–0</strong> win → Winner gets{" "}
                  <span className="kbd">3 pts</span>, Loser{" "}
                  <span className="kbd">0 pts</span>
                </div>
              </li>
              <li>
                <span className="rule-icon">⚖️</span>
                <div>
                  <strong>2–1</strong> win → Winner gets{" "}
                  <span className="kbd">2 pts</span>, Loser{" "}
                  <span className="kbd">1 pt</span>
                </div>
              </li>
              <li>
                <span className="rule-icon">✅</span>
                <div>
                  <strong>Qualification:</strong> Top 2 from each group (6) + Best
                  2 third-place (2) = <strong>Last 8</strong>
                </div>
              </li>
              <li>
                <span className="rule-icon">📏</span>
                <div>
                  <strong>Tiebreakers:</strong>{" "}
                  <span className="kbd">PTS</span> →{" "}
                  <span className="kbd">GD</span> →{" "}
                  <span className="kbd">GF</span> → Name
                </div>
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}