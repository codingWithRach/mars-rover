import { Rover } from "../src/rover";
import { Coordinate } from "../src/coordinate";

const plateau: Coordinate = { x: 5, y: 5 };

describe("Rover class constructor", () => {
  const plateau: Coordinate = { x: 5, y: 5 };
  test.each([
    [plateau, ["1 2 N", "LMLMLMLMM"]],
    [plateau, ["3 3 E", "MMRMMRMRRM"]],
  ])(
    "on plateau %p sets private class variables for starting position and instructions given by %p",
    (plateau: Coordinate, roverDefinition: Array<string>) => {
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
    (plateau: Coordinate, roverDefinition: Array<string>, endPos: string) => {
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
    (plateau: Coordinate, roverDefinition: Array<string>, endPos: string) => {
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
    (plateau: Coordinate, roverDefinition: Array<string>, endPos: string) => {
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
    (plateau: Coordinate, roverDefinition: Array<string>) => {
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
    (plateau: Coordinate, roverDefinition: Array<string>, endPos: string) => {
      const rover = new Rover(plateau, false, roverDefinition);
      rover.processInstructions();
      expect(rover.getPos()).toEqual(endPos);
    }
  );
});

describe("processInstructions", () => {
  test.each([
    [plateau, ["1 2 n", "lmlmlmlmm"], "1 3 N"],
    [plateau, ["3 3 e", "mmrmmrmrrm"], "5 1 E"],
  ])(
    "processes lowercase instructions",
    (plateau: Coordinate, roverDefinition: Array<string>, endPos: string) => {
      const rover = new Rover(plateau, true, roverDefinition);
      rover.processInstructions();
      expect(rover.getPos()).toEqual(endPos);
    }
  );
});

const singleSquarePlateau: Coordinate = { x: 0, y: 0 };
describe("processInstructions", () => {
  test.each([
    [singleSquarePlateau, ["0 0 N", "L"], "0 0 W"],
    [singleSquarePlateau, ["0 0 N", "R"], "0 0 E"],
    [singleSquarePlateau, ["0 0 N", "M"], "0 0 N"],
    [singleSquarePlateau, ["0 0 S", "M"], "0 0 S"],
    [singleSquarePlateau, ["0 0 W", "M"], "0 0 W"],
    [singleSquarePlateau, ["0 0 E", "M"], "0 0 E"],
    [singleSquarePlateau, ["0 0 E", " "], "0 0 E"],
    [singleSquarePlateau, ["0 0 N", "LLLLL"], "0 0 W"],
    [singleSquarePlateau, ["0 0 N", "RRRRR"], "0 0 E"],
    [singleSquarePlateau, ["0 0 N", "LMLMLMLMM"], "0 0 W"],
    [singleSquarePlateau, ["0 0 E", "MMRMMRMRRM"], "0 0 E"],
  ])(
    "works as expected for a non-dumb rover attempting to move on a single square plateau",
    (plateau: Coordinate, roverDefinition: Array<string>, endPos: string) => {
      const rover = new Rover(plateau, false, roverDefinition);
      rover.processInstructions();
      expect(rover.getPos()).toEqual(endPos);
    }
  );
});

describe("processInstructions", () => {
  test.each([
    [singleSquarePlateau, ["0 0 N", "L"], "0 0 W"],
    [singleSquarePlateau, ["0 0 N", "R"], "0 0 E"],
    [singleSquarePlateau, ["0 0 N", "LLLLL"], "0 0 W"],
    [singleSquarePlateau, ["0 0 N", "RRRRR"], "0 0 E"],
  ])(
    "works as expected for a non-dumb rover attempting to turn on a single square plateau",
    (plateau: Coordinate, roverDefinition: Array<string>, endPos: string) => {
      const rover = new Rover(plateau, true, roverDefinition);
      rover.processInstructions();
      expect(rover.getPos()).toEqual(endPos);
    }
  );
});

describe("processInstructions", () => {
  test.each([
    [singleSquarePlateau, ["0 0 N", "M"]],
    [singleSquarePlateau, ["0 0 S", "M"]],
    [singleSquarePlateau, ["0 0 W", "M"]],
    [singleSquarePlateau, ["0 0 E", "M"]],
    [singleSquarePlateau, ["0 0 N", "LMLMLMLMM"]],
    [singleSquarePlateau, ["0 0 E", "MMRMMRMRRM"]],
  ])(
    "throws an error for a dumb rover attempting to move on a single square plateau",
    (plateau: Coordinate, roverDefinition: Array<string>) => {
      const rover = new Rover(plateau, true, roverDefinition);
      expect(() => {
        rover.processInstructions();
      }).toThrow("rover has fallen off plateau");
    }
  );
});
