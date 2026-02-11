import React, { useMemo, useState } from "react";
import { useAppState } from "../state/AppState";
import { getMatchLabel } from "../utils/standings";
import MatchRow from "../components/MatchRow";
import Footer from "../components/Footer";

export default function MatchesPage() {
  const { state, updateState } = useAppState();
  const [group, setGroup] = useState("ALL");

  const groups = useMemo(
    () => Array.from(new Set(state.players.map((p) => p.group))).sort(),
    [state.players]
  );

  const filtered = useMemo(() => {
    if (group === "ALL") return state.matches;
    return state.matches.filter((x) => x.group === group);
  }, [state.matches, group]);

  // Stats
  const totalMatches = state.matches?.length || 0;
  const playedMatches = state.matches?.filter((m) => m.played).length || 0;
  const pendingMatches = totalMatches - playedMatches;

  function updateMatch(nextMatch) {
    updateState((prev) => ({
      ...prev,
      matches: prev.matches.map((m) =>
        m.id === nextMatch.id ? nextMatch : m
      ),
    }));
  }

  return (
    <div className="container fade-in">
      {/* Header */}
      <div className="card">
        <div className="toolbar">
          <div>
            <h2>🎮 Matches</h2>
            <div className="sub">
              Enter <strong>goal scores</strong> for each game in the Best-of-3
              series and tick <span className="kbd">Played</span>.
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
            <span className="badge good">✅ {playedMatches} Played</span>
            <span className="badge warn">⏳ {pendingMatches} Pending</span>
          </div>
        </div>
      </div>

      {/* Filter */}
      <div className="card" style={{ marginTop: 16 }}>
        <div className="toolbar">
          <div className="small" style={{ fontWeight: 700 }}>
            Filter by group:
          </div>
          <div className="filter-pills">
            <button
              className={`filter-pill ${group === "ALL" ? "active" : ""}`}
              onClick={() => setGroup("ALL")}
            >
              All Groups
            </button>
            {groups.map((g) => (
              <button
                key={g}
                className={`filter-pill ${group === g ? "active" : ""}`}
                onClick={() => setGroup(g)}
              >
                Group {g}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Match Rules Quick Info */}
      <div className="card rules-card" style={{ marginTop: 16 }}>
        <div
          style={{
            display: "flex",
            gap: 16,
            alignItems: "flex-start",
            flexWrap: "wrap",
          }}
        >
          <span style={{ fontSize: 24 }}>ℹ️</span>
          <div className="small" style={{ lineHeight: 1.6 }}>
            <strong style={{ color: "var(--text)" }}>
              Best-of-3 Series Rules:
            </strong>{" "}
            First to win 2 games advances. Winner of{" "}
            <span className="kbd">2-0</span> gets{" "}
            <strong>3 pts</strong>, winner of{" "}
            <span className="kbd">2-1</span> gets{" "}
            <strong>2 pts</strong> (loser gets{" "}
            <strong>1 pt</strong>).
          </div>
        </div>
      </div>

      {/* Matches List */}
      <div className="bracket" style={{ marginTop: 16 }}>
        {filtered.length === 0 ? (
          <div className="card">
            <div className="empty-state">
              <div className="icon">🎮</div>
              <h3>No Matches Found</h3>
              <p>
                {group !== "ALL"
                  ? `No matches in Group ${group}. Try a different filter.`
                  : "No matches available yet."}
              </p>
            </div>
          </div>
        ) : (
          filtered.map((m) => {
            const { homeName, awayName } = getMatchLabel(state.players, m);
            return (
              <MatchRow
                key={m.id}
                match={m}
                homeName={homeName}
                awayName={awayName}
                onChange={updateMatch}
              />
            );
          })
        )}
      </div>

      <Footer />
    </div>
  );
}
