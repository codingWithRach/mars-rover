export class Rover {
  #x: number;
  #y: number;
  #direction: string;
  #instructions: string;

  constructor(instructions: Array<string>) {
    let startPos: Array<string> = instructions[0].split(" ");
    this.#x = parseInt(startPos[0]);
    this.#y = parseInt(startPos[1]);
    this.#direction = startPos[2];
    this.#instructions = instructions[1];
  }

  getPos(): string {
    return `${this.#x} ${this.#y} ${this.#direction}`;
  }

  getInstructions(): string {
    return this.#instructions;
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
}
