import { Rover } from "./rover";
import { Coordinate } from "./coordinate";
import { Errors } from "./error_messages";

export class RoverCommander {
  #plateau: Coordinate;
  #rovers: Array<Rover>;
  #roverInMotion: Rover;
  #obstacles: Array<Coordinate>;

  constructor(plateau: Coordinate, rovers: Array<Rover>) {
    this.#plateau = new Coordinate(plateau.x, plateau.y);
    this.#obstacles = [];
    this.#rovers = [];
    rovers.forEach((rover) => {
      this.#roverInMotion = rover;
      this.#checkValidStartPos();
      this.#rovers.push(rover);
    });
  }

  get plateau(): Coordinate {
    return this.#plateau;
  }

  get rovers(): Array<Rover> {
    return this.#rovers;
  }

  commandRovers(): Array<string> {
    const endPos: Array<string> = [];
    const remainingRovers = [];
    this.#rovers.forEach((rover) => remainingRovers.push(rover));
    while (remainingRovers.length > 0) {
      this.#roverInMotion = remainingRovers.shift();
      this.#obstacles = this.#getObstacles(endPos, remainingRovers);
      this.#processInstructions();
      endPos.push(this.#roverInMotion.posAndDir);
    }
    return endPos;
  }

  // if unable to perform the move or instructions contain an unexpected character, stop processing
  #processInstructions() {
    for (const action of this.#roverInMotion.instructions) {
      if (["L", "R"].includes(action)) this.#spin(action);
      else if (action === "M") {
        if (!this.#move()) {
          return;
        }
      } else return;
    }
  }

  #spin(spinDirection: string) {
    const directions: Array<string> = ["N", "W", "S", "E"];
    this.#roverInMotion.direction =
      directions[
        (directions.findIndex(
          (dirn) => dirn === this.#roverInMotion.direction
        ) +
          (spinDirection === "L" ? 1 : -1) +
          directions.length) %
          directions.length
      ];
  }

  #move() {
    let x: number = this.#roverInMotion.position.x;
    let y: number = this.#roverInMotion.position.y;
    switch (this.#roverInMotion.direction) {
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
    return this.#setPos(x, y);
  }

  #setPos(x: number, y: number): boolean {
    const validPos = this.#isValidPos(x, y);
    if (!validPos && this.#roverInMotion.isDumb)
      throw Error(Errors.INVALID_POS);
    if (validPos) this.#roverInMotion.pos = new Coordinate(x, y);
    return validPos;
  }

  #checkValidStartPos() {
    if (
      !this.#isValidPos(
        this.#roverInMotion.position.x,
        this.#roverInMotion.position.y
      )
    ) {
      throw Error(Errors.INVALID_POS);
    }
  }

  #isValidPos(x: number, y: number): boolean {
    const pos = new Coordinate(x, y);
    if (!pos.isValid() || !this.#isOnPlateau(x, y)) return false;
    return !this.#isOccupied(x, y);
  }

  #isOnPlateau(x: number, y: number): boolean {
    return x >= 0 && x <= this.#plateau.x && y >= 0 && y <= this.#plateau.y;
  }

  #isOccupied(x: number, y: number): boolean {
    const posIsOccupied = this.#obstacles.some(
      (roverPos) => roverPos.x === x && roverPos.y === y
    );
    if (this.#roverInMotion.isDumb && posIsOccupied)
      throw Error(Errors.OCCUPIED_POS);
    return posIsOccupied;
  }

  #getObstacles(
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
}
