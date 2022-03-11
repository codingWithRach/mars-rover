import { Rover } from "../src/rover";

describe("Rover class constructor", () => {
  test.each([[["1 2 N", "LMLMLMLMM"]], [["3 3 E", "MMRMMRMRRM"]]])(
    "sets private class variables for starting position and instructions given by %p",
    (roverDefinition: Array<string>) => {
      const rover = new Rover(roverDefinition);
      expect(rover.getPos()).toEqual(roverDefinition[0]);
      expect(rover.getInstructions()).toEqual(roverDefinition[1]);
    }
  );
});

const startPos: string = "1 2 N";
describe("spin function", () => {
  test.each([
    [[startPos, "L"], "1 2 W"],
    [[startPos, "R"], "1 2 E"],
  ])(
    "given instructions %p changes the position to %p",
    (roverDefinition: Array<string>, endPos: string) => {
      const rover = new Rover(roverDefinition);
      rover.spin(roverDefinition[1]);
      expect(rover.getPos()).toEqual(endPos);
    }
  );
});
