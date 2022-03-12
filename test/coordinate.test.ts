import { Coordinate, isValidCoordinate } from "../src/coordinate";

describe("isValidCoordinate", () => {
  test.each([[{ x: 1, y: 5 }], [{ x: 0, y: 0 }], [{ x: 0, y: 99999 }]])(
    "returns true for valid plateau %p",
    (plateau: Coordinate) => {
      expect(isValidCoordinate(plateau)).toEqual(true);
    }
  );
});

describe("isValidCoordinate", () => {
  test.each([[{ x: -1, y: -5 }], [{ x: 0.4, y: 2 }], [{ x: -0.4, y: 42 }]])(
    "returns false for invalid plateau %p",
    (plateau: Coordinate) => {
      expect(isValidCoordinate(plateau)).toEqual(false);
    }
  );
});
