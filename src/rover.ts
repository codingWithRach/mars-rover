import { Coordinate } from "./coordinate";
import { Errors } from "./error_messages";
export class Rover {
  #isDumb: boolean;
  #position: Coordinate;
  #direction: string;
  #instructions: string;

  constructor(
    isDumb: boolean,
    startPos: Coordinate,
    direction: string = "",
    instructions: string = ""
  ) {
    this.#isDumb = isDumb;
    this.#initPos(startPos);
    this.#initDirection(direction);
    this.#instructions = instructions.toUpperCase();
  }

  #initPos(startPos: Coordinate) {
    this.#position = new Coordinate(startPos.x, startPos.y);
  }

  #initDirection(direction: string = "") {
    if (!"NSWE".includes(direction.toUpperCase()) || direction.length !== 1) {
      throw Error(Errors.INVALID_DIR);
    }
    this.#direction = direction.toUpperCase();
  }

  get instructions(): string {
    return this.#instructions;
  }

  get direction(): string {
    return this.#direction;
  }

  get position(): Coordinate {
    return this.#position;
  }

  get isDumb(): boolean {
    return this.#isDumb;
  }

  get posAndDir(): string {
    return `${this.#position.x} ${this.#position.y} ${this.#direction}`;
  }

  set direction(direction: string) {
    this.#direction = direction;
  }

  set pos(coord: Coordinate) {
    this.#position.x = coord.x;
    this.#position.y = coord.y;
  }
}
