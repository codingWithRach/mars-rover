import { Plateau } from "../src/plateau";
export class Rover {
  #plateau: Plateau;
  #x: number;
  #y: number;
  #direction: string;
  #instructions: string;

  constructor(plateau: Plateau, instructions: Array<string>) {
    this.#plateau = plateau;
    let startPos: Array<string> = instructions[0].split(" ");
    this.#x = parseInt(startPos[0]);
    this.#y = parseInt(startPos[1]);
    this.#direction = startPos[2];
    this.#instructions = instructions[1].toUpperCase();
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
    switch (this.#direction) {
      case "N":
        this.#y += 1;
        break;
      case "S":
        this.#y -= 1;
        break;
      case "W":
        this.#x -= 1;
        break;
      case "E":
        this.#x += 1;
        break;
    }
  }

  processInstructions() {
    for (const action of this.#instructions) {
      if (["L", "R"].includes(action)) this.spin(action);
      else if (action === "M") this.move();
      // if the instructions contain an unexpected character, stop processing
      else return;
    }
  }
}
