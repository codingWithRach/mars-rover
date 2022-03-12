import { ErrorType } from "../src/error_type";
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

// creates a coordinate from a string in the form '5 5' or '5 5 N'
export function createCoordinate(coordString: string): Coordinate {
  const coordArray: Array<number> = coordString
    .split(" ")
    .filter((val) => !Number.isNaN(Number(val)))
    .map((val) => Number(val));
  if (
    !isValidCoordinateArray(coordArray) ||
    !isValidCoordinate({ x: coordArray[0], y: coordArray[1] })
  )
    throw new Error(ErrorType.ERR_INVALID_COORD);
  return { x: coordArray[0], y: coordArray[1] };
}
