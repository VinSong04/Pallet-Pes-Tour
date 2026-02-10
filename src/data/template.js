export const TEMPLATE = {
  tournament: {
    name: "eFootball Tournament",
    season: "Group Stage → Last 8",
    qualifyRule: "Top 2 each group + Best 2 third-place → Last 8",
    pointsRule: "Best-of-3: 2-0 = 3/0 pts, 2-1 = 2/1 pts",
    tiebreakers: ["PTS", "GD", "GF"]
  },
  players: [
    { id: "A1", name: "1AUTO1", group: "A" },
    { id: "A2", name: "Dra-Gon", group: "A" },
    { id: "A3", name: "Glanelalala", group: "A" },
    { id: "A4", name: "WinMeLbey", group: "A" },
    { id: "B1", name: "K-Vinn", group: "B" },
    { id: "B2", name: "Max-88", group: "B" },
    { id: "B3", name: "Reach OMG", group: "B" },
    { id: "B4", name: "so respec1", group: "B" },
    { id: "C1", name: "Petter-027", group: "C" },
    { id: "C2", name: "Player C2", group: "C" },
    { id: "C3", name: "Player C3", group: "C" },
    { id: "C4", name: "Player C4", group: "C" },
  ],
  matches: [
    // Group A (6 series)
    { id: "GA1", group: "A", home: "A1", away: "A2", games: [{homeGoals: null, awayGoals: null}, {homeGoals: null, awayGoals: null}, {homeGoals: null, awayGoals: null}], played: false },
    { id: "GA2", group: "A", home: "A3", away: "A4", games: [{homeGoals: null, awayGoals: null}, {homeGoals: null, awayGoals: null}, {homeGoals: null, awayGoals: null}], played: false },
    { id: "GA3", group: "A", home: "A1", away: "A3", games: [{homeGoals: null, awayGoals: null}, {homeGoals: null, awayGoals: null}, {homeGoals: null, awayGoals: null}], played: false },
    { id: "GA4", group: "A", home: "A2", away: "A4", games: [{homeGoals: null, awayGoals: null}, {homeGoals: null, awayGoals: null}, {homeGoals: null, awayGoals: null}], played: false },
    { id: "GA5", group: "A", home: "A1", away: "A4", games: [{homeGoals: null, awayGoals: null}, {homeGoals: null, awayGoals: null}, {homeGoals: null, awayGoals: null}], played: false },
    { id: "GA6", group: "A", home: "A2", away: "A3", games: [{homeGoals: null, awayGoals: null}, {homeGoals: null, awayGoals: null}, {homeGoals: null, awayGoals: null}], played: false },
    // Group B
    { id: "GB1", group: "B", home: "B1", away: "B2", games: [{homeGoals: null, awayGoals: null}, {homeGoals: null, awayGoals: null}, {homeGoals: null, awayGoals: null}], played: false },
    { id: "GB2", group: "B", home: "B3", away: "B4", games: [{homeGoals: null, awayGoals: null}, {homeGoals: null, awayGoals: null}, {homeGoals: null, awayGoals: null}], played: false },
    { id: "GB3", group: "B", home: "B1", away: "B3", games: [{homeGoals: null, awayGoals: null}, {homeGoals: null, awayGoals: null}, {homeGoals: null, awayGoals: null}], played: false },
    { id: "GB4", group: "B", home: "B2", away: "B4", games: [{homeGoals: null, awayGoals: null}, {homeGoals: null, awayGoals: null}, {homeGoals: null, awayGoals: null}], played: false },
    { id: "GB5", group: "B", home: "B1", away: "B4", games: [{homeGoals: null, awayGoals: null}, {homeGoals: null, awayGoals: null}, {homeGoals: null, awayGoals: null}], played: false },
    { id: "GB6", group: "B", home: "B2", away: "B3", games: [{homeGoals: null, awayGoals: null}, {homeGoals: null, awayGoals: null}, {homeGoals: null, awayGoals: null}], played: false },
    // Group C
    { id: "GC1", group: "C", home: "C1", away: "C2", games: [{homeGoals: null, awayGoals: null}, {homeGoals: null, awayGoals: null}, {homeGoals: null, awayGoals: null}], played: false },
    { id: "GC2", group: "C", home: "C3", away: "C4", games: [{homeGoals: null, awayGoals: null}, {homeGoals: null, awayGoals: null}, {homeGoals: null, awayGoals: null}], played: false },
    { id: "GC3", group: "C", home: "C1", away: "C3", games: [{homeGoals: null, awayGoals: null}, {homeGoals: null, awayGoals: null}, {homeGoals: null, awayGoals: null}], played: false },
    { id: "GC4", group: "C", home: "C2", away: "C4", games: [{homeGoals: null, awayGoals: null}, {homeGoals: null, awayGoals: null}, {homeGoals: null, awayGoals: null}], played: false },
    { id: "GC5", group: "C", home: "C1", away: "C4", games: [{homeGoals: null, awayGoals: null}, {homeGoals: null, awayGoals: null}, {homeGoals: null, awayGoals: null}], played: false },
    { id: "GC6", group: "C", home: "C2", away: "C3", games: [{homeGoals: null, awayGoals: null}, {homeGoals: null, awayGoals: null}, {homeGoals: null, awayGoals: null}], played: false },
  ],
  knockout: { qf: [], sf: [], f: [] }
}
