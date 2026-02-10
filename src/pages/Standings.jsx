import React, { useMemo } from "react";
import { useAppState } from "../state/AppState";
import { computeAllGroups } from "../utils/standings";
import { getQualifiers } from "../utils/qualifiers";
import { getPlayerLogoPath } from "../utils/playerLogos";
import GroupTable from "../components/GroupTable";

export default function StandingsPage() {
  const { state } = useAppState();

  const groupTables = useMemo(
    () => computeAllGroups(state.players, state.matches),
    [state.players, state.matches]
  );

  const qualifiers = useMemo(() => getQualifiers(groupTables), [groupTables]);

  // Best 2 third-place (IDs) for blue highlight
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
          style={{ width: 24, height: 24, borderRadius: 4, objectFit: "cover" }}
        />
      )}
      <strong>{name}</strong>
    </span>
  );

  return (
    <div className="container">
      {/* Tournament Info */}
{/* Tournament Header */}
<div className="card tourneyHeader">
  <div className="tourneyHeaderInner">
    <div className="tourneyLeft">
      <img className="tourneyLogo" src="/assets/pallet.jpg" alt="Tournament logo" />
      <div>
        <div className="tourneyKicker">STANDINGS • GROUP STAGE</div>
        <div className="tourneyTitle">
          {state.tournament?.name || "eFootball Tournament"}
        </div>
        <div className="tourneySub">
          {state.tournament?.season || "Group Stage → Last 8"}
        </div>
      </div>
    </div>

    <div className="tourneyRight">
      <span className="badge good">Top 2 qualify</span>
      <span className="badge warn">Best 3rd place</span>
      <span className="badge">Best-of-3</span>
    </div>
  </div>
</div>

      {/* Group Tables */}
      <div className="grid">
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

      {/* Best Third-Place Ranking */}
      <div className="card" style={{ marginTop: 14 }}>
        <h2>Best Third-Place Ranking</h2>

        <table className="table">
          <thead>
            <tr>
              <th style={{ width: "40%" }}>Player</th>
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
                  <td>{record.group}</td>
                  <td>{record.P}</td>
                  <td>
                    {record.W}-{record.L}
                  </td>
                  <td>{record.GF}</td>
                  <td>{record.GA}</td>
                  <td>{record.GD}</td>
                  <td>
                    <strong>{record.PTS}</strong>
                  </td>
                  <td>{isQualified ? "Qualified" : "Ban hx Srak "}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Qualified 8 (Seeding) */}
      <div className="card" style={{ marginTop: 14 }}>
        <h2>Qualified 8 (Seeding)</h2>

        <table className="table">
          <thead>
            <tr>
              <th style={{ width: "45%" }}>Player</th>
              <th>Group</th>
              <th>PTS</th>
              <th>GD</th>
              <th>GF</th>
              <th>Qualify as</th>
              <th>Seed</th>
            </tr>
          </thead>

          <tbody>
            {qualifiers.seeded.map((record) => (
              <tr key={record.id} className="row-qualified">
                <td>{renderPlayerCell(record.name)}</td>
                <td>{record.group}</td>
                <td>
                  <strong>{record.PTS}</strong>
                </td>
                <td>{record.GD}</td>
                <td>{record.GF}</td>
                <td>{record.qualifyAs}</td>
                <td>
                  <strong>#{record.seed}</strong>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}