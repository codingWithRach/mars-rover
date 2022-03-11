import { Plateau } from "../src/plateau";
export class Rover {
  #plateau: Plateau;
  #isDumb: boolean;
  #x: number;
  #y: number;
  #direction: string;
  #instructions: string;

  constructor(plateau: Plateau, isDumb: boolean, instructions: Array<string>) {
    this.#plateau = plateau;
    this.#isDumb = isDumb;
    let startPos: Array<string> = instructions[0].split(" ");
    this.setPos(parseInt(startPos[0]), parseInt(startPos[1]));
    this.#direction = startPos[2];
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

  getPlateau(): Plateau {
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

  move() {
    const doMove = (x: number, y: number) => this.setPos(x, y);
    switch (this.#direction) {
      case "N":
        doMove(this.#x, this.#y + 1);
        break;
      case "S":
        doMove(this.#x, this.#y - 1);
        break;
      case "W":
        doMove(this.#x - 1, this.#y);
        break;
      case "E":
        doMove(this.#x + 1, this.#y);
        break;
    }
  }

  processInstructions() {
    for (const action of this.#instructions) {
      if (["L", "R"].includes(action)) this.spin(action);
      else if (action === "M") {
        this.move();
        if (this.#x > this.#plateau["x"])
          throw Error("rover has fallen off plateau");
      }
      // if the instructions contain an unexpected character, stop processing
      else return;
    }
  }
}
