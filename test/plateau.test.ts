import { Plateau, isValidPlateau, createPlateau } from "../src/plateau";

describe("isValidPlateau", () => {
  test.each([[{ x: 1, y: 5 }], [{ x: 0, y: 0 }], [{ x: 0, y: 99999 }]])(
    "returns true for valid plateau %p",
    (plateau: Plateau) => {
      expect(isValidPlateau(plateau)).toEqual(true);
    }
  );
});

describe("isValidPlateau", () => {
  test.each([[{ x: -1, y: -5 }], [{ x: 0.4, y: 2 }], [{ x: -0.4, y: 42 }]])(
    "returns false for invalid plateau %p",
    (plateau: Plateau) => {
      expect(isValidPlateau(plateau)).toEqual(false);
    }
  );
});

describe("createPlateau", () => {
  test.each([
    ["1 5", { x: 1, y: 5 }],
    ["0 0", { x: 0, y: 0 }],
    ["0, 99999", { x: 0, y: 99999 }],
  ])(
    "creates a plateau given a string %p in a valid format",
    (plateauString: string, plateau: Plateau) => {
      expect(createPlateau(plateauString)).toEqual(plateau);
    }
  );
});

describe("createPlateau", () => {
  test.each([["a b"], ["12"], ["1 2 3"], ["hello"]])(
    "throws error given a string %p in an invalid format",
    (plateauString: string) => {
      expect(() => {
        createPlateau(plateauString);
      }).toThrow(Error("invalid plateau"));
    }
  );
});
