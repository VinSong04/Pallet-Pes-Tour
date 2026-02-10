const KEY = "efootball_dashboard_v1";
export function loadState(template) {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return template;
    const parsed = JSON.parse(raw);
    if (!parsed.players || !parsed.matches) return template;
    return parsed;
  } catch { return template; }
}
export function saveState(state) { localStorage.setItem(KEY, JSON.stringify(state)); }
export function resetState(template) { localStorage.setItem(KEY, JSON.stringify(template)); return template; }
