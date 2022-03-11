import { Rover } from "../src/rover";
import { Plateau } from "../src/plateau";

const plateau: Plateau = { x: 5, y: 5 };

describe("Rover class constructor", () => {
  const plateau: Plateau = { x: 5, y: 5 };
  test.each([
    [plateau, ["1 2 N", "LMLMLMLMM"]],
    [plateau, ["3 3 E", "MMRMMRMRRM"]],
  ])(
    "sets private class variables for starting position and instructions given by %p",
    (plateau: Plateau, roverDefinition: Array<string>) => {
      const rover = new Rover(plateau, roverDefinition);
      expect(rover.getPos()).toEqual(roverDefinition[0]);
      expect(rover.getInstructions()).toEqual(roverDefinition[1]);
      expect(rover.getPlateau()).toEqual(plateau);
    }
  );
});

const startPos: string = "1 2 N";
describe("spin method", () => {
  test.each([
    [plateau, [startPos, "L"], "1 2 W"],
    [plateau, [startPos, "R"], "1 2 E"],
  ])(
    "given instructions %p changes the position to %p",
    (plateau: Plateau, roverDefinition: Array<string>, endPos: string) => {
      const rover = new Rover(plateau, roverDefinition);
      rover.spin(roverDefinition[1]);
      expect(rover.getPos()).toEqual(endPos);
    }
  );
});

describe("move method", () => {
  test.each([
    [plateau, ["1 2 N", "M"], "1 3 N"],
    [plateau, ["1 2 S", "M"], "1 1 S"],
    [plateau, ["1 2 W", "M"], "0 2 W"],
    [plateau, ["1 2 E", "M"], "2 2 E"],
  ])(
    "given instructions %p changes the position to %p",
    (plateau: Plateau, roverDefinition: Array<string>, endPos: string) => {
      const rover = new Rover(plateau, roverDefinition);
      rover.move();
      expect(rover.getPos()).toEqual(endPos);
    }
  );
});

describe("processInstructions", () => {
  test.each([
    [plateau, ["1 2 N", "L"], "1 2 W"],
    [plateau, ["1 2 N", "R"], "1 2 E"],
    [plateau, ["1 2 N", "M"], "1 3 N"],
    [plateau, ["1 2 S", "M"], "1 1 S"],
    [plateau, ["1 2 W", "M"], "0 2 W"],
    [plateau, ["1 2 E", "M"], "2 2 E"],
    [plateau, ["1 2 E", " "], "1 2 E"],
    [plateau, ["1 2 N", "LMLMLMLMM"], "1 3 N"],
    [plateau, ["3 3 E", "MMRMMRMRRM"], "5 1 E"],
  ])(
    "given instructions %p changes the position to %p",
    (plateau: Plateau, roverDefinition: Array<string>, endPos: string) => {
      const rover = new Rover(plateau, roverDefinition);
      rover.processInstructions();
      expect(rover.getPos()).toEqual(endPos);
    }
  );
});
