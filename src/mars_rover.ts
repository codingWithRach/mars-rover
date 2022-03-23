import { Coordinate, createCoordinate } from "../src/coordinate";
import { Rover } from "../src/rover";
import { Errors } from "./error_messages";
import { Input } from "./input";

// this flag determines whether or not the rovers being tested are dumb (a single flag applies to all rovers)
// - if true, the rovers are dumb i.e. will fall off the edge of a plateau or collide with another rover
// - if false, the rovers are intelligent i.e. will stop processing when they encounter the edge of a plateau or another rover
let isDumb: boolean = false;
export function configDumb(dumbFlag: boolean) {
  isDumb = dumbFlag;
}

export function main(
  plateauString: string,
  ...roverInstructions: Array<string>
): string {
  let plateau: Coordinate;
  try {
    plateau = createCoordinate(plateauString);
  } catch (error) {
    throw new Error(Errors.INVALID_PLATEAU);
  }
  if (roverInstructions.length === 0) return "";
  let rovers: Array<Input> = parseInput(roverInstructions);
  checkSharedStartPos(rovers);
  return processRovers(plateau, rovers);
}

function parseInput(roverInstructions: Array<string>): Array<Input> {
  let rovers: Array<Input> = [];
  for (let i = 1; i < roverInstructions.length; i += 2) {
    rovers.push({
      startPosition: roverInstructions[i - 1],
      instructions: roverInstructions[i],
    });
  }

  // if the number of instructions is odd, there's a rover left over with no instructions so add this to the array
  if (roverInstructions.length % 2 === 1) {
    rovers.push({ startPosition: roverInstructions.pop(), instructions: "" });
  }
  return rovers;
}

function checkSharedStartPos(rovers: Array<Input>): void {
  const allStartPos = rovers.map((rover) =>
    rover.startPosition.split(" ").slice(0, 2).join(" ")
  );
  if (
    allStartPos.filter((item, index) => allStartPos.indexOf(item) != index)
      .length > 0
  ) {
    throw Error(Errors.OCCUPIED_POS);
  }
}

function processRovers(plateau: Coordinate, rovers: Array<Input>): string {
  let endPos: Array<string> = [];
  while (rovers.length > 0) {
    const roverDetails: Input = rovers.shift();
    const rover = new Rover(
      plateau,
      isDumb,
      getStartPos(roverDetails),
      getStartDir(roverDetails),
      roverDetails.instructions,
      getAllRoverPositions(endPos, rovers)
    );
    rover.processInstructions();
    endPos.push(rover.getPosDir());
  }
  return endPos.join(", ");
}

function getAllRoverPositions(
  endPos: Array<string>,
  rovers: Array<Input>
): Array<Coordinate> {
  return [
    ...endPos.map((pos) => createCoordinate(pos)),
    ...rovers.map((pos) => createCoordinate(pos.startPosition)),
  ];
}

function getStartPos(roverDetails: Input): Coordinate {
  try {
    return createCoordinate(roverDetails.startPosition);
  } catch (error) {
    throw new Error(Errors.INVALID_POS);
  }
}

function getStartDir(roverDetails: Input): string {
  return roverDetails.startPosition.split(" ")[2];
}
