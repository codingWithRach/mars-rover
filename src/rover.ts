import { Coordinate, isValidCoordinate } from "../src/coordinate";
import { ErrorType } from "../src/error_type";
export class Rover {
  #plateau: Coordinate;
  #isDumb: boolean;
  #position: Coordinate;
  #direction: string;
  #instructions: string;
  #otherRovers: Array<Coordinate>;

  constructor(
    plateau: Coordinate,
    isDumb: boolean,
    instructions: Array<string>,
    otherRovers: Array<Coordinate> = []
  ) {
    this.#plateau = plateau;
    this.#isDumb = isDumb;
    this.#otherRovers = otherRovers.slice();
    let startPos: Array<string> = instructions[0].split(" ");
    this.setPos(parseFloat(startPos[0]), parseFloat(startPos[1]));
    this.setDirection(startPos[2]);
    this.setInstructions(instructions[1]);
  }

  setPos(x: number, y: number) {
    if (
      !isValidCoordinate({ x, y }) ||
      x > this.#plateau.x ||
      y > this.#plateau.y
    ) {
      throw Error(ErrorType.ERR_INVALID_POS);
    }
    if (!this.isOccupied(x, y)) this.#position = { x, y };
  }

  isOccupied(x: number, y: number): boolean {
    for (const roverPos of this.#otherRovers) {
      if (roverPos.x === x && roverPos.y === y) {
        if (this.#isDumb) throw Error(ErrorType.ERR_OCCUPIED_POS);
        else return true;
      }
    }
    return false;
  }

  setDirection(direction: string = "") {
    if (!"NSWE".includes(direction.toUpperCase()) || direction.length !== 1) {
      throw Error(ErrorType.ERR_INVALID_DIR);
    }
    this.#direction = direction.toUpperCase();
  }

  setInstructions(instructions: string = "") {
    this.#instructions = instructions.toUpperCase();
  }

  getPos(): string {
    return `${this.#position.x} ${this.#position.y} ${this.#direction}`;
  }

  getInstructions(): string {
    return this.#instructions;
  }

  getPlateau(): Coordinate {
    return this.#plateau;
  }

  spin(spinDirection: string) {
    const directions: Array<string> = ["N", "W", "S", "E"];
    this.#direction =
      directions[
        (directions.findIndex((dirn) => dirn === this.#direction) +
          (spinDirection === "L" ? 1 : -1) +
          directions.length) %
          directions.length
      ];
  }

  // move the rover only if one of the following applies:
  // - it's dumb i.e. it can call off the edge of the plateau
  // - it's not dumb, but the move would not result in it falling off the edge of the plateau
  move() {
    const doMove = (x: number, y: number): boolean => {
      if (
        this.#isDumb ||
        (x >= 0 &&
          x <= this.#plateau.x &&
          y >= 0 &&
          y <= this.#plateau.y &&
          !this.isOccupied(x, y))
      ) {
        this.setPos(x, y);
        return true;
      } else {
        return false;
      }
    };
    switch (this.#direction) {
      case "N":
        return doMove(this.#position.x, this.#position.y + 1);
      case "S":
        return doMove(this.#position.x, this.#position.y - 1);
      case "W":
        return doMove(this.#position.x - 1, this.#position.y);
      case "E":
        return doMove(this.#position.x + 1, this.#position.y);
    }
  }

  processInstructions() {
    for (const action of this.#instructions) {
      if (["L", "R"].includes(action)) this.spin(action);
      else if (action === "M") {
        // if unable to perform the move, stop processing
        if (!this.move()) {
          return false;
        }
      }
      // if the instructions contain an unexpected character, stop processing
      else return;
    }
  }
}
