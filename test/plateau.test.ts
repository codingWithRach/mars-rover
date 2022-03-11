import { Plateau, isValidPlateau } from "../src/plateau";

const plateau: Plateau = { x: 1, y: 5 };

describe("isValidPlateau", () => {
  test("returns true if plateau is valid", () => {
    expect(isValidPlateau(plateau)).toEqual(true);
  });
});
