import React, { useMemo, useState } from "react";
import { useAppState } from "../state/AppState";
import { getMatchLabel } from "../utils/standings";
import MatchRow from "../components/MatchRow";
import Footer from "../components/Footer";
import { isAdminAuthenticated } from "../components/AdminAuth";
import { Link } from "react-router-dom";

export default function MatchesPage() {
  const { state, updateState } = useAppState();
  const [group, setGroup] = useState("ALL");
  const isAdmin = isAdminAuthenticated();

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
              {isAdmin ? (
                <>
                  Enter <strong>goal scores</strong> for each game in the Best-of-3
                  series and tick <span className="kbd">Played</span>.
                </>
              ) : (
                <>View match results and scores from the group stage.</>
              )}
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
            <span className="badge good">✅ {playedMatches} Played</span>
            <span className="badge warn">⏳ {pendingMatches} Pending</span>
          </div>
        </div>
      </div>

      {/* Admin/Public Banner */}
      {isAdmin ? (
        <div className="card" style={{
          marginTop: 16,
          background: "linear-gradient(135deg, rgba(34, 197, 94, 0.08), rgba(16, 185, 129, 0.05))",
          border: "1px solid rgba(34, 197, 94, 0.2)"
        }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "4px 0"
          }}>
            <span style={{ fontSize: 24 }}>🔓</span>
            <div style={{ flex: 1 }}>
              <div style={{
                fontWeight: 700,
                fontSize: 14,
                color: "var(--good)",
                marginBottom: 2
              }}>
                Admin Access Granted
              </div>
              <div className="small" style={{ opacity: 0.8 }}>
                You can edit match scores and mark matches as played.
              </div>
            </div>
            <span className="badge good" style={{
              background: "rgba(34, 197, 94, 0.15)",
              border: "1px solid rgba(34, 197, 94, 0.3)"
            }}>
              ⚙️ ADMIN
            </span>
          </div>
        </div>
      ) : (
        <div className="card" style={{
          marginTop: 16,
          background: "linear-gradient(135deg, rgba(251, 191, 36, 0.08), rgba(245, 158, 11, 0.05))",
          border: "1px solid rgba(251, 191, 36, 0.2)"
        }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "4px 0"
          }}>
            <span style={{ fontSize: 24 }}>🔒</span>
            <div style={{ flex: 1 }}>
              <div style={{
                fontWeight: 700,
                fontSize: 14,
                color: "var(--warn)",
                marginBottom: 2
              }}>
                Read-Only Mode
              </div>
              <div className="small" style={{ opacity: 0.8 }}>
                Match editing is restricted to admins. <Link to="/admin" style={{
                  color: "var(--warn)",
                  textDecoration: "underline",
                  fontWeight: 600
                }}>Login as admin</Link> to edit scores.
              </div>
            </div>
            <span className="badge warn" style={{
              background: "rgba(251, 191, 36, 0.15)",
              border: "1px solid rgba(251, 191, 36, 0.3)"
            }}>
              👁️ VIEW ONLY
            </span>
          </div>
        </div>
      )}

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
                readOnly={!isAdmin}
              />
            );
          })
        )}
      </div>

      <Footer />
    </div>
  );
}
