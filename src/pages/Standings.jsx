import React, { useMemo } from "react";
import { useAppState } from "../state/AppState";
import { computeAllGroups } from "../utils/standings";
import { getQualifiers } from "../utils/qualifiers";
import { getPlayerLogoPath } from "../utils/playerLogos";
import GroupTable from "../components/GroupTable";
import Footer from "../components/Footer";
import palletLogo from "../assets/pallet.jpg";

export default function StandingsPage() {
  const { state } = useAppState();

  const groupTables = useMemo(
    () => computeAllGroups(state.players, state.matches),
    [state.players, state.matches]
  );

  const qualifiers = useMemo(() => getQualifiers(groupTables), [groupTables]);

  const bestThirdIds = useMemo(
    () => new Set(qualifiers.bestThirds.map((x) => x.id)),
    [qualifiers.bestThirds]
  );

  const renderPlayerCell = (name) => (
    <span className="rowtag">
      {getPlayerLogoPath(name) && (
        <img
          src={getPlayerLogoPath(name)}
          alt={name}
        />
      )}
      <strong>{name}</strong>
    </span>
  );

  return (
    <div className="container fade-in">
      {/* Tournament Header */}
      <div className="card tourneyHeader">
        <div className="tourneyHeaderInner">
          <div className="tourneyLeft">
            <img
              className="tourneyLogo"
              src={palletLogo}
              alt="Tournament logo"
            />
            <div>
              <div className="tourneyKicker">STANDINGS • GROUP STAGE</div>
              <div className="tourneyTitle">
                {state.tournament?.name || "eFootball Tournament"}
              </div>
              <div className="tourneySub">
                {state.tournament?.stage || "Group Stage → Last 8"}
              </div>
            </div>
          </div>

          <div className="tourneyRight">
            <span className="badge good">✅ Top 2 qualify</span>
            <span className="badge warn">🔄 Best 3rd place</span>
            <span className="badge accent">🎮 Best-of-3</span>
          </div>
        </div>
      </div>

      {/* Group Tables */}
      <div className="section-title">
        <span className="icon">📊</span>
        Group Standings
      </div>
      <div className="grid stagger">
        {Object.keys(groupTables)
          .sort()
          .map((group) => (
            <GroupTable
              key={group}
              group={group}
              table={groupTables[group]}
              bestThirdIds={bestThirdIds}
            />
          ))}
      </div>

      {/* Legend */}
      <div className="card" style={{ marginTop: 16 }}>
        <div style={{ display: "flex", gap: 20, flexWrap: "wrap", alignItems: "center" }}>
          <span className="small" style={{ fontWeight: 700, color: "var(--text)" }}>
            Legend:
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span
              style={{
                width: 14,
                height: 14,
                borderRadius: 4,
                background: "rgba(52, 211, 153, 0.2)",
                border: "2px solid var(--good)",
              }}
            />
            <span className="small">Top 2 (Qualified)</span>
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span
              style={{
                width: 14,
                height: 14,
                borderRadius: 4,
                background: "rgba(251, 191, 36, 0.15)",
                border: "2px solid var(--warn)",
              }}
            />
            <span className="small">3rd Place (may qualify)</span>
          </span>
        </div>
      </div>

      {/* Best Third-Place Ranking */}
      <div className="card" style={{ marginTop: 16 }}>
        <div className="toolbar">
          <div>
            <h2>🔄 Best Third-Place Ranking</h2>
            <div className="sub">
              Top 2 third-place finishers qualify for the Last 8.
            </div>
          </div>
          <span className="badge accent">
            {qualifiers.bestThirds.length}/2 Qualified
          </span>
        </div>

        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th style={{ width: "35%" }}>Player</th>
                <th>Group</th>
                <th>M</th>
                <th>Game</th>
                <th>GF</th>
                <th>GA</th>
                <th>GD</th>
                <th>PTS</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {qualifiers.thirdCandidates.map((record) => {
                const isQualified = qualifiers.bestThirds.some(
                  (x) => x.id === record.id
                );

                return (
                  <tr
                    key={record.id}
                    className={isQualified ? "row-best-third" : "row-third"}
                  >
                    <td>{renderPlayerCell(record.name)}</td>
                    <td>
                      <span className="badge">Group {record.group}</span>
                    </td>
                    <td>{record.P}</td>
                    <td>
                      {record.W}-{record.L}
                    </td>
                    <td>{record.GF}</td>
                    <td>{record.GA}</td>
                    <td
                      style={{
                        color:
                          record.GD > 0
                            ? "var(--good)"
                            : record.GD < 0
                              ? "var(--bad)"
                              : "var(--muted)",
                      }}
                    >
                      {record.GD > 0 ? "+" : ""}
                      {record.GD}
                    </td>
                    <td>
                      <strong>{record.PTS}</strong>
                    </td>
                    <td>
                      {isQualified ? (
                        <span className="badge good">✅ Qualified</span>
                      ) : (
                        <span className="badge bad">❌ Eliminated</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Qualified 8 (Seeding) */}
      <div className="card" style={{ marginTop: 16 }}>
        <div className="toolbar">
          <div>
            <h2>🎯 Qualified 8 (Seeding)</h2>
            <div className="sub">
              These players advance to the Last 8 knockout round.
            </div>
          </div>
          <span className="badge good">
            {qualifiers.seeded.length}/8 Spots Filled
          </span>
        </div>

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
                <th>Qualify As</th>
              </tr>
            </thead>

            <tbody>
              {qualifiers.seeded.map((record) => (
                <tr key={record.id} className="row-qualified">
                  <td>
                    <strong
                      style={{
                        fontSize: 16,
                        color: record.seed <= 2 ? "var(--good)" : "var(--accent)",
                      }}
                    >
                      #{record.seed}
                    </strong>
                  </td>
                  <td>{renderPlayerCell(record.name)}</td>
                  <td>
                    <span className="badge">Group {record.group}</span>
                  </td>
                  <td>
                    <strong>{record.PTS}</strong>
                  </td>
                  <td
                    style={{
                      color:
                        record.GD > 0
                          ? "var(--good)"
                          : record.GD < 0
                            ? "var(--bad)"
                            : "var(--muted)",
                    }}
                  >
                    {record.GD > 0 ? "+" : ""}
                    {record.GD}
                  </td>
                  <td>{record.GF}</td>
                  <td>
                    <span className="badge good">{record.qualifyAs}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {qualifiers.seeded.length === 0 && (
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