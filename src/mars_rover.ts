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
  let endPos: Array<string> = [];
  let rovers: Array<Array<string>> = [];
  let allStartPos: Array<string> = [];
  for (let i = 1; i < roverInstructions.length; i += 2) {
    rovers.push([roverInstructions[i - 1], roverInstructions[i]]);
    const thisStartPos: Array<string> = roverInstructions[i - 1].split(" ");
    thisStartPos.pop();
    allStartPos.push(thisStartPos.join(" "));
  }

  // if the number of instructions is odd, there's a rover left over with no instructions so add this to the array
  if (roverInstructions.length % 2 === 1) {
    rovers.push([roverInstructions.pop(), ""]);
  }

  // check whether any of the rovers shares a start position
  if (
    allStartPos.filter((item, index) => allStartPos.indexOf(item) != index)
      .length > 0
  ) {
    throw Error(ErrorType.ERR_OCCUPIED_POS);
  }

  // for each of the rovers, follow the instructions and add the end position to the array
  const roversToProcess = rovers.slice();
  for (const rover of rovers) {
    // remove this rover from the array of rovers still to be processed
    roversToProcess.shift();

    // before processing this rover, need to construct an array of positions for all the other rovers, to ensure they don't collide
    // first look at the end positions of the rovers that have already been processed
    const otherProcessedRovers: Array<Coordinate> = endPos.map((pos) => {
      return createCoordinate(pos);
    });
    // now look at the start positions of the rovers that haven't yet been processed
    const otherUnprocessedRovers: Array<Coordinate> = roversToProcess.map(
      (pos) => {
        return createCoordinate(pos[0]);
      }
    );

    // now proccess this rover and update the array of end positions
    const thisRover = new Rover(plateau, isDumb, rover, [
      ...otherProcessedRovers,
      ...otherUnprocessedRovers,
    ]);
    thisRover.processInstructions();
    endPos.push(thisRover.getPos());
  }

  // return a comma separated list of end positions
  return endPos.join(", ");
}
