import {
  Coordinate,
  isValidCoordinate,
  isValidCoordinateArray,
} from "../src/coordinate";
import { ErrorType } from "../src/error_type";

// creates a plateau from a string in the form '5 5'
export function createPlateau(plateauString: string): Coordinate {
  const plateauArray: Array<number> = plateauString
    .split(" ")
    .map((val) => Number(val));
  if (
    !isValidCoordinateArray(plateauArray) ||
    !isValidCoordinate({ x: plateauArray[0], y: plateauArray[1] })
  )
    throw new Error(ErrorType.ERR_INVALID_PLATEAU);
  return { x: plateauArray[0], y: plateauArray[1] };
}
