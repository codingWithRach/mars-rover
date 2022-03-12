export interface Coordinate {
  x: number;
  y: number;
}

export function isValidCoordinate(plateau: Coordinate): boolean {
  for (const key of Object.keys(plateau)) {
    if (!Number.isInteger(plateau[key]) || plateau[key] < 0) {
      return false;
    }
  }
  return true;
}

export function isValidCoordinateArray(plateauArray: Array<number>): boolean {
  if (plateauArray.length !== 2) return false;
  for (const dimension of plateauArray) {
    if (Number.isNaN(dimension)) {
      return false;
    }
  }
  return true;
}
