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
  if (!coordString.match("^[0-9]+ [0-9]+ ?[NSEW]*$"))
    throw new Error(ErrorType.ERR_INVALID_COORD);
  return {
    x: Number(coordString.split(" ")[0]),
    y: Number(coordString.split(" ")[1]),
  };
}
