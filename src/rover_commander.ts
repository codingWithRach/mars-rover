import { Rover } from "./rover";
import { Coordinate } from "./coordinate";
import { Errors } from "./error_messages";

export class RoverCommander {
  #plateau: Coordinate;
  #rovers: Array<Rover>;

  constructor(plateau: Coordinate, rovers: Array<Rover>) {
    this.#plateau = new Coordinate(plateau.x, plateau.y);
    this.#rovers = [];
    rovers.forEach((rover) => {
      if (!this.isValidPos(rover, rover.position.x, rover.position.y, [])) {
        throw Error(Errors.INVALID_POS);
      }
      this.#rovers.push(rover);
    });
  }

  get plateau(): Coordinate {
    return this.#plateau;
  }

  get rovers(): Array<Rover> {
    return this.#rovers;
  }

  processRovers(): Array<string> {
    const endPos: Array<string> = [];
    const remainingRovers = [];
    this.#rovers.forEach((rover) => remainingRovers.push(rover));
    while (remainingRovers.length > 0) {
      const rover = remainingRovers.shift();
      const otherRovers: Array<Coordinate> = getAllRoverPositions(
        endPos,
        remainingRovers
      );
      this.processInstructions(rover, otherRovers);
      endPos.push(rover.getPosDir());
    }
    return endPos;
  }

  // if unable to perform the move or instructions contain an unexpected character, stop processing
  processInstructions(rover: Rover, otherRovers: Array<Coordinate>) {
    for (const action of rover.instructions) {
      if (["L", "R"].includes(action)) this.spin(rover, action);
      else if (action === "M") {
        if (!this.move(rover, otherRovers)) {
          return;
        }
      } else return;
    }
  }

  spin(rover: Rover, spinDirection: string) {
    const directions: Array<string> = ["N", "W", "S", "E"];
    rover.direction =
      directions[
        (directions.findIndex((dirn) => dirn === rover.direction) +
          (spinDirection === "L" ? 1 : -1) +
          directions.length) %
          directions.length
      ];
  }

  move(rover: Rover, otherRovers: Array<Coordinate>) {
    let x: number = rover.position.x;
    let y: number = rover.position.y;
    switch (rover.direction) {
      case "N":
        y += 1;
        break;
      case "S":
        y -= 1;
        break;
      case "W":
        x -= 1;
        break;
      case "E":
        x += 1;
        break;
    }
    return this.setPos(rover, x, y, otherRovers);
  }

  setPos(
    rover: Rover,
    x: number,
    y: number,
    otherRovers: Array<Coordinate>
  ): boolean {
    const validPos = this.isValidPos(rover, x, y, otherRovers);
    if (!validPos && rover.isDumb) throw Error(Errors.INVALID_POS);
    if (validPos) rover.setPos(x, y);
    return validPos;
  }

  isValidPos(
    rover: Rover,
    x: number,
    y: number,
    otherRovers: Array<Coordinate>
  ): boolean {
    const pos = new Coordinate(x, y);
    if (!pos.isValid() || !this.isOnPlateau(x, y)) return false;
    return !this.isOccupied(rover, x, y, otherRovers);
  }

  isOnPlateau(x: number, y: number): boolean {
    return x >= 0 && x <= this.#plateau.x && y >= 0 && y <= this.#plateau.y;
  }

  isOccupied(
    rover: Rover,
    x: number,
    y: number,
    otherRovers: Array<Coordinate>
  ): boolean {
    const posIsOccupied = otherRovers.some(
      (roverPos) => roverPos.x === x && roverPos.y === y
    );
    if (rover.isDumb && posIsOccupied) throw Error(Errors.OCCUPIED_POS);
    return posIsOccupied;
  }
}

function getAllRoverPositions(
  endPos: Array<string>,
  rovers: Array<Rover>
): Array<Coordinate> {
  return [
    ...endPos.map((pos) => {
      const [x, y]: Array<number> = pos.split(" ").map((str) => Number(str));
      return new Coordinate(x, y);
    }),
    ...rovers.map((rover) => rover.position),
  ];
}
