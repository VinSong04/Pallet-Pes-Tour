import React, { useMemo, useState } from "react";
import { useAppState } from "../state/AppState";
import InfoButton from "../components/InfoButton";

export default function AdminPage() {
  const { state, updateState, reset } = useAppState();

  const [name, setName] = useState(state.tournament?.name || "");
  const [season, setSeason] = useState(state.tournament?.season || "");

  const [q, setQ] = useState("");
  const [groupFilter, setGroupFilter] = useState("ALL");

  function saveTournament() {
    updateState((prev) => ({
      ...prev,
      tournament: { ...prev.tournament, name, season },
    }));
  }

  function updatePlayer(id, patch) {
    updateState((prev) => ({
      ...prev,
      players: prev.players.map((p) => (p.id === id ? { ...p, ...patch } : p)),
    }));
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

  return (
    <div className="container">
      {/* Header */}
      <div className="card">
        <div className="toolbar">
          <div>
            <h2 style={{ marginBottom: 6 }}>Admin</h2>
            <div className="sub" style={{ marginBottom: 0 }}>
              Edit tournament and players. Saves in your browser.
            </div>
          </div>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button className="btn" onClick={saveTournament}>
              Save changes
            </button>
            <button className="btn ghost" onClick={reset}>
              Reset template
            </button>
          </div>
        </div>

        <div className="hr" />

        {/* Tournament settings */}
        <div className="grid" style={{ alignItems: "end" }}>
          <div className="span6">
            <div className="small">Tournament name</div>
            <input
              className="input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Tournament name"
            />
          </div>

          <div className="span6">
            <div className="small">Season / subtitle</div>
            <input
              className="input"
              value={season}
              onChange={(e) => setSeason(e.target.value)}
              placeholder="Season subtitle"
            />
          </div>
        </div>

        {/* Rules reminder (callout style) */}
        <div
          style={{
            marginTop: 14,
            padding: 12,
            border: "1px solid var(--border)",
            borderRadius: 14,
            background: "rgba(0,0,0,0.18)",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 10,
            flexWrap: "wrap",
          }}
        >
          <div className="small" style={{ lineHeight: 1.45 }}>
            <strong style={{ color: "var(--text)" }}>Points rule:</strong>{" "}
            Win 2-0 = 3 pts, Win 2-1 = 2 pts (loser gets 1 pt). Tiebreakers:{" "}
            <span className="kbd">PTS → GD → GF</span>
          </div>

          <InfoButton
            compact={true}
            text="Best-of-3 points: Win 2-0 = 3 pts, Win 2-1 = 2 pts (loser gets 1 pt). Tiebreakers: PTS → GD → GF."
          />
        </div>
      </div>

      {/* Players */}
      <div className="card" style={{ marginTop: 14 }}>
        <div className="toolbar">
          <div>
            <h2 style={{ marginBottom: 6 }}>Players</h2>
            <div className="sub" style={{ marginBottom: 0 }}>
              Rename players (IDs fixed: A1..A4, B1..B4, C1..C4).
            </div>
          </div>

          {/* Controls */}
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <input
              className="input"
              style={{ width: 220 }}
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search name or ID…"
            />

            <select
              value={groupFilter}
              onChange={(e) => setGroupFilter(e.target.value)}
            >
              <option value="ALL">All groups</option>
              <option value="A">Group A</option>
              <option value="B">Group B</option>
              <option value="C">Group C</option>
            </select>
          </div>
        </div>

        <div className="hr" />

        {/* Compact list */}
        <table className="table">
          <thead>
            <tr>
              <th style={{ width: "20%" }}>ID</th>
              <th style={{ width: "20%" }}>Group</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {filteredPlayers.map((p) => (
              <tr key={p.id}>
                <td>
                  <span className="rowtag">
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
                    onChange={(e) => updatePlayer(p.id, { name: e.target.value })}
                    placeholder="Player name"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredPlayers.length === 0 && (
          <div className="small" style={{ marginTop: 10 }}>
            No players match your filter.
          </div>
        )}
      </div>
    </div>
  );
}