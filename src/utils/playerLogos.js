// Map of player names to their logo assets
const PLAYER_LOGOS = {
  //Group A
  "Dra-Gon": "Dra-Gon.png",
  "Jak-Kroval": "Jak-Kroval.png",
  "Max-88": "Max-88.png",
  "Petter-027": "Petter-027.png",
  //Group B
  "MengZzz": "MengZzz.png",
  "Reach OMG": "Reach OMG.png",
  "Si Dav": "Si Dav.png",
  "SO-R3spec1": "sorespect.png",
  //Group C
  "1AUTO1": "1AUTO1.png",
  "Glanelalala": "Glanelalala.png",
  "Win Me Lbey": "WinMeLbey.png",
  "K-Vinn": "K-Vinn.png",
};

export function getPlayerLogoPath(playerName) {
  // Try exact match first
  if (PLAYER_LOGOS.hasOwnProperty(playerName)) {
    const logoFile = PLAYER_LOGOS[playerName];
    if (logoFile) {
      return new URL(`../assets/${logoFile}`, import.meta.url).href;
    }
    return null; // Logo mapping exists but no file yet
  }
  
  // Try case-insensitive match
  for (const [key, filename] of Object.entries(PLAYER_LOGOS)) {
    if (key.toLowerCase() === playerName.toLowerCase()) {
      if (filename) {
        return new URL(`../assets/${filename}`, import.meta.url).href;
      }
      return null;
    }
  }
  
  // Return null if no match found
  return null;
}
