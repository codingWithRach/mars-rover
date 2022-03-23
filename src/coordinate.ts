import { Errors } from "./error_messages";
export interface Coordinate {
  x: number;
  y: number;
}

export function isValidCoordinate(coordinate: Coordinate): boolean {
  return ![...Object.values(coordinate)].some(
    (num) => !Number.isInteger(num) || num < 0
  );
}

// creates a coordinate from a string in the form '5 5'
export function createCoordinate(coordString: string): Coordinate {
  if (!coordString.match("^[0-9]+ [0-9]+"))
    throw new Error(Errors.INVALID_COORD);
  return {
    x: Number(coordString.split(" ")[0]),
    y: Number(coordString.split(" ")[1]),
  };
}
