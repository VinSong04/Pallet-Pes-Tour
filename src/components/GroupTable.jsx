import React from "react";
import { getPlayerLogoPath } from "../utils/playerLogos";

export default function GroupTable({ group, table }) {
  return (
    <div className="card span6">
      <h2>Group {group}</h2>

      <table className="table">
        <thead>
          <tr>
            <th style={{ width: "44%" }}>Player</th>
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
                  {getPlayerLogoPath(r.name) && (
                    <img
                      src={getPlayerLogoPath(r.name)}
                      alt={r.name}
                      style={{ width: 24, height: 24, borderRadius: 4 }}
                    />
                  )}
                  <strong>{r.name}</strong>
                </span>
              </td>

              <td>{r.P}</td>
              <td>{r.GSW}-{r.GSL}</td>
              <td>{r.GF}</td>
              <td>{r.GA}</td>
              <td>{r.GD}</td>
              <td><strong>{r.PTS}</strong></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}