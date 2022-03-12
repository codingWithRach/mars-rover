import { Coordinate } from "../src/coordinate";
import { createPlateau } from "../src/plateau";
import { Rover } from "../src/rover";

// this flag determines whether or not the rovers being tested are dumb (a single flag applies to all rovers)
// - if true, the rovers are dumb i.e. will fall off the edge of a plateau or collide with another rover
// - if false, the rovers are intelligent i.e. will stop processing when they encounter the edge of a plateau or another rover
let isDumb: boolean;
export function configDumb(dumbFlag: boolean) {
  isDumb = dumbFlag;
}

export function marsRover(
  plateauString: string,
  ...roverInstructions: Array<string>
): string {
  // create plateau from first argument
  let plateau: Coordinate;
  try {
    plateau = createPlateau(plateauString);
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
  for (const rover of rovers) {
    const thisRover = new Rover(plateau, isDumb, rover);
    thisRover.processInstructions();
    endPos.push(thisRover.getPos());
  }
  return endPos.join(", ");
}
