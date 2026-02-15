import React, { useMemo, useState } from "react";
import { useAppState } from "../state/AppState";
import Footer from "../components/Footer";
import AdminAuth from "../components/AdminAuth";

export default function AdminPage() {
  const { state, updateState, reset } = useAppState();

  const [name, setName] = useState(state.tournament?.name || "");
  const [season, setSeason] = useState(state.tournament?.season || "");
  const [tagline, setTagline] = useState(state.tournament?.tagline || "");
  const [q, setQ] = useState("");
  const [groupFilter, setGroupFilter] = useState("ALL");
  const [saved, setSaved] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);

  function saveTournament() {
    updateState((prev) => ({
      ...prev,
      tournament: { ...prev.tournament, name, season, tagline },
    }));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function updatePlayer(id, patch) {
    updateState((prev) => ({
      ...prev,
      players: prev.players.map((p) => (p.id === id ? { ...p, ...patch } : p)),
    }));
  }

  function handleReset() {
    if (!confirmReset) {
      setConfirmReset(true);
      return;
    }
    reset();
    setName("eFootball Tournament");
    setSeason("Spring 2026");
    setTagline("Legends Start Here");
    setConfirmReset(false);
  }

  const filteredPlayers = useMemo(() => {
    const query = q.trim().toLowerCase();
    return state.players
      .filter((p) => (groupFilter === "ALL" ? true : p.group === groupFilter))
      .filter((p) => {
        if (!query) return true;
        return (
          p.name.toLowerCase().includes(query) ||
          p.id.toLowerCase().includes(query)
        );
      });
  }, [state.players, q, groupFilter]);

  // Stats
  const matchesPlayed = state.matches?.filter((m) => m.played).length || 0;
  const totalMatches = state.matches?.length || 0;

  return (
    <AdminAuth>
      {({ onLogout }) => (
        <div className="container fade-in">
          {/* Header */}
          <div className="card">
            <div className="toolbar">
              <div>
                <h2>⚙️ Admin Panel</h2>
                <div className="sub">
                  Edit tournament settings and players. All changes save to your browser.
                </div>
              </div>

              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <button className="btn success" onClick={saveTournament}>
                  {saved ? "✅ Saved!" : "💾 Save Changes"}
                </button>
                <button
                  className={`btn ${confirmReset ? "danger" : "ghost"}`}
                  onClick={handleReset}
                >
                  {confirmReset ? "⚠️ Confirm Reset?" : "🔄 Reset Template"}
                </button>
                <button className="btn danger" onClick={onLogout} title="Logout from admin">
                  🔒 Logout
                </button>
                {confirmReset && (
                  <button
                    className="btn ghost"
                    onClick={() => setConfirmReset(false)}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid" style={{ marginTop: 16 }}>
            <div className="card span4" style={{ textAlign: "center", padding: 20 }}>
              <div style={{ fontSize: 28, marginBottom: 4 }}>👥</div>
              <div style={{ fontSize: 24, fontWeight: 900, color: "var(--accent)" }}>
                {state.players?.length || 0}
              </div>
              <div className="small">Players</div>
            </div>
            <div className="card span4" style={{ textAlign: "center", padding: 20 }}>
              <div style={{ fontSize: 28, marginBottom: 4 }}>⚽</div>
              <div style={{ fontSize: 24, fontWeight: 900, color: "var(--accent)" }}>
                {matchesPlayed}/{totalMatches}
              </div>
              <div className="small">Matches Played</div>
            </div>
            <div className="card span4" style={{ textAlign: "center", padding: 20 }}>
              <div style={{ fontSize: 28, marginBottom: 4 }}>🏆</div>
              <div style={{ fontSize: 24, fontWeight: 900, color: "var(--accent)" }}>
                {state.knockout?.qf?.length || 0}
              </div>
              <div className="small">Bracket Matches</div>
            </div>
          </div>

          {/* Tournament Settings */}
          <div className="card" style={{ marginTop: 16 }}>
            <h2>🏟️ Tournament Settings</h2>
            <div className="hr" />
            <div className="grid" style={{ alignItems: "end" }}>
              <div className="span6">
                <div className="small" style={{ fontWeight: 700, marginBottom: 6 }}>
                  Tournament Name
                </div>
                <input
                  className="input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Tournament name"
                />
              </div>

              <div className="span6">
                <div className="small" style={{ fontWeight: 700, marginBottom: 6 }}>
                  Season / Subtitle
                </div>
                <input
                  className="input"
                  value={season}
                  onChange={(e) => setSeason(e.target.value)}
                  placeholder="Season subtitle"
                />
              </div>

              <div className="span12">
                <div className="small" style={{ fontWeight: 700, marginBottom: 6 }}>
                  Tagline
                </div>
                <input
                  className="input"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  placeholder="Homepage tagline"
                />
              </div>
            </div>

            {/* Rules reminder */}
            <div
              className="rules-card"
              style={{
                marginTop: 16,
                padding: 14,
                borderRadius: 12,
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: 12,
                  alignItems: "flex-start",
                }}
              >
                <span style={{ fontSize: 20 }}>📋</span>
                <div className="small" style={{ lineHeight: 1.6 }}>
                  <strong style={{ color: "var(--text)" }}>Points Rule:</strong>{" "}
                  Win 2-0 = 3 pts, Win 2-1 = 2 pts (loser gets 1 pt). Tiebreakers:{" "}
                  <span className="kbd">PTS → GD → GF</span>
                </div>
              </div>
            </div>
          </div>

          {/* Players */}
          <div className="card" style={{ marginTop: 16 }}>
            <div className="toolbar">
              <div>
                <h2>👥 Players</h2>
                <div className="sub">
                  Rename players (IDs are fixed: A1..A4, B1..B4, C1..C4).
                </div>
              </div>

              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
                <input
                  className="input"
                  style={{ width: 200, maxWidth: "100%" }}
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="🔍 Search name or ID…"
                />

                <div className="filter-pills">
                  <button
                    className={`filter-pill ${groupFilter === "ALL" ? "active" : ""}`}
                    onClick={() => setGroupFilter("ALL")}
                  >
                    All
                  </button>
                  <button
                    className={`filter-pill ${groupFilter === "A" ? "active" : ""}`}
                    onClick={() => setGroupFilter("A")}
                  >
                    A
                  </button>
                  <button
                    className={`filter-pill ${groupFilter === "B" ? "active" : ""}`}
                    onClick={() => setGroupFilter("B")}
                  >
                    B
                  </button>
                  <button
                    className={`filter-pill ${groupFilter === "C" ? "active" : ""}`}
                    onClick={() => setGroupFilter("C")}
                  >
                    C
                  </button>
                </div>
              </div>
            </div>

            <div className="hr" />

            <div className="table-wrap">
              <table className="table">
                <thead>
                  <tr>
                    <th style={{ width: "15%" }}>ID</th>
                    <th style={{ width: "15%" }}>Group</th>
                    <th>Player Name</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPlayers.map((p) => (
                    <tr key={p.id}>
                      <td>
                        <span className="badge accent">
                          <strong>{p.id}</strong>
                        </span>
                      </td>
                      <td>
                        <span className="badge">Group {p.group}</span>
                      </td>
                      <td>
                        <input
                          className="input"
                          value={p.name}
                          onChange={(e) =>
                            updatePlayer(p.id, { name: e.target.value })
                          }
                          placeholder="Player name"
                          style={{ maxWidth: 300 }}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredPlayers.length === 0 && (
              <div className="empty-state" style={{ padding: 24 }}>
                <div className="icon">🔍</div>
                <h3>No Players Found</h3>
                <p>No players match your current filter.</p>
              </div>
            )}
          </div>

          <Footer />
        </div>
      )}
    </AdminAuth>
  );
}