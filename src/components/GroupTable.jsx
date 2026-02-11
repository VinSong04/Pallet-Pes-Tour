import React from "react";
import { getPlayerLogoPath } from "../utils/playerLogos";

export default function GroupTable({ group, table, bestThirdIds }) {
  return (
    <div className="card span6" style={{ animationDelay: `${(group.charCodeAt(0) - 65) * 0.1}s` }}>
      <div className="toolbar" style={{ marginBottom: 12 }}>
        <h2>
          <span style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 32,
            height: 32,
            borderRadius: 10,
            background: "linear-gradient(135deg, var(--accent), var(--accent2))",
            color: "#fff",
            fontFamily: "var(--font-heading)",
            fontWeight: 900,
            fontSize: 14,
            marginRight: 10,
          }}>
            {group}
          </span>
          Group {group}
        </h2>
        <span className="badge accent">{table.length} Players</span>
      </div>

      <div className="table-wrap">
        <table className="table">
          <thead>
            <tr>
              <th style={{ width: "40%" }}>Player</th>
              <th>M</th>
              <th>Game</th>
              <th>GF</th>
              <th>GA</th>
              <th>GD</th>
              <th>PTS</th>
            </tr>
          </thead>

          <tbody>
            {table.map((r) => (
              <tr
                key={r.id}
                className={
                  r.rank <= 2
                    ? "row-top2"
                    : r.rank === 3
                      ? "row-top3"
                      : ""
                }
              >
                <td>
                  <span className="rowtag">
                    <span style={{
                      minWidth: 20,
                      textAlign: "center",
                      fontWeight: 800,
                      fontSize: 13,
                      color: r.rank <= 2 ? "var(--good)" : r.rank === 3 ? "var(--warn)" : "var(--muted)",
                    }}>
                      {r.rank}
                    </span>
                    {getPlayerLogoPath(r.name) && (
                      <img
                        src={getPlayerLogoPath(r.name)}
                        alt={r.name}
                      />
                    )}
                    <strong>{r.name}</strong>
                  </span>
                </td>

                <td>{r.P}</td>
                <td>
                  <span style={{ fontWeight: 600 }}>
                    {r.GSW}-{r.GSL}
                  </span>
                </td>
                <td>{r.GF}</td>
                <td>{r.GA}</td>
                <td style={{
                  color: r.GD > 0 ? "var(--good)" : r.GD < 0 ? "var(--bad)" : "var(--muted)",
                  fontWeight: 700,
                }}>
                  {r.GD > 0 ? "+" : ""}{r.GD}
                </td>
                <td>
                  <strong style={{ fontSize: 16 }}>{r.PTS}</strong>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}