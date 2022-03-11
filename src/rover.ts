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
    const increment = spinDirection === "L" ? 1 : -1;
    const directions: Array<string> = ["N", "W", "S", "E"];
    const curIndex = directions.findIndex((dirn) => dirn === this.#direction);
    let newIndex = curIndex + increment;
    if (newIndex >= directions.length) newIndex = 0;
    if (newIndex < 0) newIndex = directions.length - 1;
    this.#direction = directions[newIndex];
  }
}
