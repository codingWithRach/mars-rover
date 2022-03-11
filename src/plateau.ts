export interface Plateau {
  x: number;
  y: number;
}

export function isValidPlateau(plateau: Plateau): boolean {
  for (const key of Object.keys(plateau)) {
    if (plateau[key] < 0) {
      return false;
    }
  }
  return true;
}
