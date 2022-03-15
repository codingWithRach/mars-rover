import { ErrorType } from "../src/error_type";
export interface Coordinate {
  x: number;
  y: number;
}

export function isValidCoordinate(plateau: Coordinate): boolean {
  return ![...Object.values(plateau)].some(
    (num) => !Number.isInteger(num) || num < 0
  );
}

// creates a coordinate from a string in the form '5 5' or '5 5 N'
export function createCoordinate(coordString: string): Coordinate {
  const coordArray: Array<number> = coordString
    .split(" ")
    .filter((val) => !Number.isNaN(Number(val)))
    .map((val) => Number(val));
  if (!isValidCoordinate({ x: coordArray[0], y: coordArray[1] }))
    throw new Error(ErrorType.ERR_INVALID_COORD);
  return { x: coordArray[0], y: coordArray[1] };
}
