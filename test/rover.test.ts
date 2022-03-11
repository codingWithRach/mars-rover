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
describe("spin method", () => {
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

describe("move method", () => {
  test.each([
    [["1 2 N", "M"], "1 3 N"],
    [["1 2 S", "M"], "1 1 S"],
    [["1 2 W", "M"], "0 2 W"],
    [["1 2 E", "M"], "2 2 E"],
  ])(
    "given instructions %p changes the position to %p",
    (roverDefinition: Array<string>, endPos: string) => {
      const rover = new Rover(roverDefinition);
      rover.move();
      expect(rover.getPos()).toEqual(endPos);
    }
  );
});

describe("processInstructions", () => {
  test.each([
    [["1 2 N", "L"], "1 2 W"],
    [["1 2 N", "R"], "1 2 E"],
    [["1 2 N", "M"], "1 3 N"],
    [["1 2 S", "M"], "1 1 S"],
    [["1 2 W", "M"], "0 2 W"],
    [["1 2 E", "M"], "2 2 E"],
    [["1 2 E", " "], "1 2 E"],
    [["1 2 N", "LMLMLMLMM"], "1 3 N"],
    [["3 3 E", "MMRMMRMRRM"], "5 1 E"],
  ])(
    "given instructions %p changes the position to %p",
    (roverDefinition: Array<string>, endPos: string) => {
      const rover = new Rover(roverDefinition);
      rover.processInstructions();
      expect(rover.getPos()).toEqual(endPos);
    }
  );
});
