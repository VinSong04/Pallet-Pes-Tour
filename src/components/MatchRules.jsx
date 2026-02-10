import React from "react";
import InfoButton from "./InfoButton";

export default function MatchRules() {
  return (
    <InfoButton
      compact={true}
      label="Points rule"
      text="Best-of-3 points: Win 2-0 = 3 pts, Win 2-1 = 2 pts (loser gets 1 pt). Tiebreakers: PTS → GD → GF."
    />
  );
}