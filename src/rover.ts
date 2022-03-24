import { Coordinate } from "./coordinate";
import { Errors } from "./error_messages";
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
    this.initPos(startPos);
    this.setDirection(direction);
    this.#instructions = instructions.toUpperCase();
  }

  initPos(startPos: Coordinate) {
    if (!this.isValidPos(startPos.x, startPos.y)) {
      throw Error(Errors.INVALID_COORD);
    }
    this.#position = new Coordinate(startPos.x, startPos.y);
  }

  setPos(x: number, y: number): boolean {
    const validPos = this.isValidPos(x, y);
    if (!validPos && this.#isDumb) throw Error(Errors.INVALID_POS);
    if (validPos) {
      this.#position.x = x;
      this.#position.y = y;
    }
    return validPos;
  }

  isValidPos(x: number, y: number): boolean {
    const pos = new Coordinate(x, y);
    if (!pos.isValid() || !this.isOnPlateau(x, y)) return false;
    return !this.isOccupied(x, y);
  }

  setDirection(direction: string = "") {
    if (!"NSWE".includes(direction.toUpperCase()) || direction.length !== 1) {
      throw Error(Errors.INVALID_DIR);
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
    if (this.#isDumb && posIsOccupied) throw Error(Errors.OCCUPIED_POS);
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

  move() {
    switch (this.#direction) {
      case "N":
        return this.setPos(this.#position.x, this.#position.y + 1);
      case "S":
        return this.setPos(this.#position.x, this.#position.y - 1);
      case "W":
        return this.setPos(this.#position.x - 1, this.#position.y);
      case "E":
        return this.setPos(this.#position.x + 1, this.#position.y);
    }
  }

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
