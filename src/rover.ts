export class Rover {
  #x: number;
  #y: number;
  #direction: string;

  constructor(startPos: string) {
    let startPosArray: Array<string> = startPos.split(" ");
    this.#x = parseInt(startPosArray[0]);
    this.#y = parseInt(startPosArray[1]);
    this.#direction = startPosArray[2];
  }

  getPos(): string {
    return `${this.#x} ${this.#y} ${this.#direction}`;
  }
}
