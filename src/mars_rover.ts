import { Coordinate, createCoordinate } from "../src/coordinate";
import { Rover } from "../src/rover";
import { ErrorType } from "../src/error_type";

// this flag determines whether or not the rovers being tested are dumb (a single flag applies to all rovers)
// - if true, the rovers are dumb i.e. will fall off the edge of a plateau or collide with another rover
// - if false, the rovers are intelligent i.e. will stop processing when they encounter the edge of a plateau or another rover
let isDumb: boolean = false;
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
    plateau = createCoordinate(plateauString);
  } catch (error) {
    throw new Error(ErrorType.ERR_INVALID_PLATEAU);
  }

  // if no rovers have been received, no action is required
  if (roverInstructions.length === 0) return "";

  // process remaining arguments to create an array of rovers.  Each rover element is an array with:
  // - the first element being the start position of the rover
  // - the second element being the instructions
  let rovers: Array<Array<string>> = [];
  for (let i = 1; i < roverInstructions.length; i += 2) {
    rovers.push([roverInstructions[i - 1], roverInstructions[i]]);
  }

  // if the number of instructions is odd, there's a rover left over with no instructions so add this to the array
  if (roverInstructions.length % 2 === 1) {
    rovers.push([roverInstructions.pop(), ""]);
  }

  // check whether any of the rovers shares a start position
  const allStartPos = rovers.map((rover) =>
    rover[0].split(" ").slice(0, 2).join(" ")
  );
  if (
    allStartPos.filter((item, index) => allStartPos.indexOf(item) != index)
      .length > 0
  ) {
    throw Error(ErrorType.ERR_OCCUPIED_POS);
  }

  // for each of the rovers, follow the instructions and add the end position to the array
  let endPos: Array<string> = [];
  while (rovers.length > 0) {
    const roverDetails: Array<string> = rovers.shift();

    // before processing this rover, need to construct an array of positions for all the other rovers, to ensure they don't collide
    const otherRoverPositions = [
      ...endPos.map((pos) => createCoordinate(pos)),
      ...rovers.map((pos) => createCoordinate(pos[0])),
    ];

    let startPos: Coordinate;
    try {
      startPos = createCoordinate(roverDetails[0]);
    } catch (error) {
      throw new Error(ErrorType.ERR_INVALID_POS);
    }

    // create the rover
    const rover = new Rover(
      plateau,
      isDumb,
      startPos,
      roverDetails[0].split(" ")[2],
      roverDetails[1],
      otherRoverPositions
    );

    // process the rover instructions and update the array of end positions
    rover.processInstructions();
    endPos.push(rover.getPos());
  }

  // return a comma separated list of end positions
  return endPos.join(", ");
}
