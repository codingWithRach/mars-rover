import { Coordinate } from "../src/coordinate";
export class Rover {
  #plateau: Coordinate;
  #isDumb: boolean;
  #x: number;
  #y: number;
  #direction: string;
  #instructions: string;

  constructor(
    plateau: Coordinate,
    isDumb: boolean,
    instructions: Array<string>
  ) {
    this.#plateau = plateau;
    this.#isDumb = isDumb;
    let startPos: Array<string> = instructions[0].split(" ");
    this.setPos(parseInt(startPos[0]), parseInt(startPos[1]));
    this.#direction = startPos[2].toUpperCase();
    this.#instructions = instructions[1].toUpperCase();
  }

  setPos(x: number, y: number) {
    this.#x = x;
    this.#y = y;
  }

  getPos(): string {
    return `${this.#x} ${this.#y} ${this.#direction}`;
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
        (x >= 0 && x <= this.#plateau.x && y >= 0 && y <= this.#plateau.y)
      ) {
        this.setPos(x, y);
        return true;
      } else {
        return false;
      }
    };
    switch (this.#direction) {
      case "N":
        return doMove(this.#x, this.#y + 1);
      case "S":
        return doMove(this.#x, this.#y - 1);
      case "W":
        return doMove(this.#x - 1, this.#y);
      case "E":
        return doMove(this.#x + 1, this.#y);
    }
  }

  processInstructions() {
    for (const action of this.#instructions) {
      if (["L", "R"].includes(action)) this.spin(action);
      else if (action === "M") {
        if (this.move()) {
          if (
            this.#x < 0 ||
            this.#x > this.#plateau["x"] ||
            this.#y < 0 ||
            this.#y > this.#plateau["y"]
          )
            throw Error("rover has fallen off plateau");
        } else {
          // if unable to perform the move, stop processing
          return false;
        }
      }
      // if the instructions contain an unexpected character, stop processing
      else return;
    }
  }
}
