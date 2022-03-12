import { Rover } from "../src/rover";
import { Plateau } from "../src/plateau";

const plateau: Plateau = { x: 5, y: 5 };

describe("Rover class constructor", () => {
  const plateau: Plateau = { x: 5, y: 5 };
  test.each([
    [plateau, ["1 2 N", "LMLMLMLMM"]],
    [plateau, ["3 3 E", "MMRMMRMRRM"]],
  ])(
    "on plateau %p sets private class variables for starting position and instructions given by %p",
    (plateau: Plateau, roverDefinition: Array<string>) => {
      const rover = new Rover(plateau, true, roverDefinition);
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
    "on plateau %p, given instructions %p, changes the position to %p",
    (plateau: Plateau, roverDefinition: Array<string>, endPos: string) => {
      const rover = new Rover(plateau, true, roverDefinition);
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
    "on plateau %p, given instructions %p, changes the position to %p",
    (plateau: Plateau, roverDefinition: Array<string>, endPos: string) => {
      const rover = new Rover(plateau, true, roverDefinition);
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
    "on plateau %p, given instructions %p, changes the position to %p",
    (plateau: Plateau, roverDefinition: Array<string>, endPos: string) => {
      const rover = new Rover(plateau, true, roverDefinition);
      rover.processInstructions();
      expect(rover.getPos()).toEqual(endPos);
    }
  );
});

describe("processInstructions", () => {
  test.each([
    [plateau, ["1 2 E", "MMMMMRMLMMMM"]],
    [plateau, ["1 2 W", "MMMMMRMLMMMM"]],
    [plateau, ["1 2 N", "MMMMMRMLMMMM"]],
    [plateau, ["1 2 S", "MMMMMRMLMMMM"]],
  ])(
    "throws error when a dumb rover moves beyond edge of plateau",
    (plateau: Plateau, roverDefinition: Array<string>) => {
      const rover = new Rover(plateau, true, roverDefinition);
      expect(() => {
        rover.processInstructions();
      }).toThrow("rover has fallen off plateau");
    }
  );
});

describe("processInstructions", () => {
  test.each([
    [plateau, ["1 2 E", "MMMMMRMLMMMM"], "5 2 E"],
    [plateau, ["1 2 W", "MMMMMRMLMMMM"], "0 2 W"],
    [plateau, ["1 2 N", "MMMMMRMLMMMM"], "1 5 N"],
    [plateau, ["1 2 S", "MMMMMRMLMMMM"], "1 0 S"],
  ])(
    "stops processing when a non-dumb rover attempts to move beyond edge of plateau",
    (plateau: Plateau, roverDefinition: Array<string>, endPos: string) => {
      const rover = new Rover(plateau, false, roverDefinition);
      rover.processInstructions();
      expect(rover.getPos()).toEqual(endPos);
    }
  );
});
