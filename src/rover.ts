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
    startPos: Coordinate,
    direction: string = "",
    instructions: string = "",
    otherRovers: Array<Coordinate> = []
  ) {
    this.#plateau = plateau;
    this.#isDumb = isDumb;
    this.#otherRovers = [...otherRovers];
    this.setPos(startPos.x, startPos.y);
    this.setDirection(direction);
    this.#instructions = instructions.toUpperCase();
  }

  setPos(x: number, y: number) {
    if (!isValidCoordinate({ x, y }) || !this.isOnPlateau(x, y)) {
      throw Error(ErrorType.ERR_INVALID_POS);
    }
    if (!this.isOccupied(x, y)) this.#position = { x, y };
  }

  setDirection(direction: string = "") {
    if (!"NSWE".includes(direction.toUpperCase()) || direction.length !== 1) {
      throw Error(ErrorType.ERR_INVALID_DIR);
    }
    this.#direction = direction.toUpperCase();
  }

  getPosDir(): string {
    return `${this.#position.x} ${this.#position.y} ${this.#direction}`;
  }

  isOnPlateau(x: number, y: number): boolean {
    return x >= 0 && x <= this.#plateau.x && y >= 0 && y <= this.#plateau.y;
  }

  isOccupied(x: number, y: number): boolean {
    const posIsOccupied = this.#otherRovers.some(
      (roverPos) => roverPos.x === x && roverPos.y === y
    );
    if (this.#isDumb && posIsOccupied) throw Error(ErrorType.ERR_OCCUPIED_POS);
    return posIsOccupied;
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
  // - it's dumb i.e. it can call off the edge of the plateau or collide with another rover
  // - it's not dumb, but the move would not result in it falling off the edge of the plateau or colliding with another rover
  move() {
    const doMove = (x: number, y: number): boolean => {
      if (this.#isDumb || (this.isOnPlateau(x, y) && !this.isOccupied(x, y))) {
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

  // process the list of instructions
  // if unable to perform the move or instructions contain an unexpected character, stop processing
  processInstructions() {
    for (const action of this.#instructions) {
      if (["L", "R"].includes(action)) this.spin(action);
      else if (action === "M") {
        if (!this.move()) {
          return;
        }
      } else return;
    }
  }
}
