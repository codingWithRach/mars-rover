export class Coordinate {
  #x: number;
  #y: number;

  constructor(x: number, y: number) {
    this.#x = x;
    this.#y = y;
  }

  get x() {
    return this.#x;
  }
  get y() {
    return this.#y;
  }

  set x(x) {
    this.#x = x;
  }
  set y(y) {
    this.#y = y;
  }

  isValid(): boolean {
    return ![this.#x, this.#y].some((num) => !Number.isInteger(num) || num < 0);
  }
}
