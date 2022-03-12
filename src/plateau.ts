import {
  Coordinate,
  isValidCoordinate,
  isValidCoordinateArray,
} from "../src/coordinate";

// creates a plateau from a string in the form '5 5'
export function createPlateau(plateauString: string): Coordinate {
  const plateauArray: Array<number> = plateauString
    .split(" ")
    .map((val) => parseFloat(val));
  if (
    !isValidCoordinateArray(plateauArray) ||
    !isValidCoordinate({ x: plateauArray[0], y: plateauArray[1] })
  )
    throw new Error("invalid plateau");
  return { x: plateauArray[0], y: plateauArray[1] };
}
