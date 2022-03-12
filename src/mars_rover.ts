import { Coordinate } from "../src/coordinate";
import { createPlateau } from "../src/plateau";

export function marsRover(
  plateauString: string,
  ...roverInstructions: Array<string>
): string {
  // create plateau from first argument
  try {
    let plateau: Coordinate = createPlateau(plateauString);
  } catch (error) {
    throw new Error("invalid plateau");
  }

  // process remaining arguments
  if (roverInstructions.length === 0) return "";
  let endPos: Array<string> = [];
  let rovers: Array<Array<string>> = [];
  for (let i = 1; i < roverInstructions.length; i += 2) {
    rovers.push([roverInstructions[i - 1], roverInstructions[i]]);
  }
  if (roverInstructions.length % 2 === 1) {
    rovers.push([roverInstructions.pop(), ""]);
  }
  rovers.forEach((rover) => {
    endPos.push(rover[0]);
  });
  return endPos.join(", ");
}
