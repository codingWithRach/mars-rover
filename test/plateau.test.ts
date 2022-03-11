import { Plateau, isValidPlateau } from "../src/plateau";

describe("isValidPlateau", () => {
  test.each([[{ x: 1, y: 5 }], [{ x: 0, y: 0 }], [{ x: 0, y: 99999 }]])(
    "returns true if plateau is valid",
    (plateau: Plateau) => {
      expect(isValidPlateau(plateau)).toEqual(true);
    }
  );
});

describe("isValidPlateau", () => {
  test.each([[{ x: -1, y: -5 }], [{ x: 0.4, y: 2 }], [{ x: -0.4, y: 42 }]])(
    "returns false if plateau is invalid",
    (plateau: Plateau) => {
      expect(isValidPlateau(plateau)).toEqual(false);
    }
  );
});
