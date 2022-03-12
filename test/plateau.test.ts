import { Coordinate } from "../src/coordinate";
import { createPlateau } from "../src/plateau";

describe("createPlateau", () => {
  test.each([
    ["1 5", { x: 1, y: 5 }],
    ["0 0", { x: 0, y: 0 }],
    ["0, 99999", { x: 0, y: 99999 }],
  ])(
    "creates a plateau given a string %p in a valid format",
    (plateauString: string, plateau: Coordinate) => {
      expect(createPlateau(plateauString)).toEqual(plateau);
    }
  );
});

describe("createPlateau", () => {
  test.each([["a b"], ["12"], ["1 2 3"], ["hello"], ["4 -3"], ["0 0.1"]])(
    "throws error given a string %p in an invalid format",
    (plateauString: string) => {
      expect(() => {
        createPlateau(plateauString);
      }).toThrow(Error("invalid plateau"));
    }
  );
});
