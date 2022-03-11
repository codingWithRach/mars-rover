import { Plateau, isValidPlateau } from "../src/plateau";

describe("isValidPlateau", () => {
  test.each([[{ x: 1, y: 5 }]])(
    "returns true if plateau is valid",
    (plateau: Plateau) => {
      expect(isValidPlateau(plateau)).toEqual(true);
    }
  );
});

describe("isValidPlateau", () => {
  test.each([[{ x: -1, y: -5 }]])(
    "returns false if plateau is invalid",
    (plateau: Plateau) => {
      expect(isValidPlateau(plateau)).toEqual(false);
    }
  );
});
