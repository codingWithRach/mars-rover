import { Rover } from "../src/rover";
import { Coordinate } from "../src/coordinate";

const plateau: Coordinate = { x: 5, y: 5 };

describe("Rover class constructor", () => {
  const plateau: Coordinate = { x: 5, y: 5 };
  test.each([[["1 2 N", "LMLMLMLMM"]], [["3 3 E", "MMRMMRMRRM"]]])(
    "sets private class variables for starting position and instructions given by %p",
    (roverDefinition: Array<string>) => {
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
    [[startPos, "L"], "1 2 W"],
    [[startPos, "R"], "1 2 E"],
  ])(
    "given instructions %p, changes the position to %p",
    (roverDefinition: Array<string>, endPos: string) => {
      const rover = new Rover(plateau, true, roverDefinition);
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
    "given instructions %p, changes the position to %p",
    (roverDefinition: Array<string>, endPos: string) => {
      const rover = new Rover(plateau, true, roverDefinition);
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
    "given instructions %p, changes the position to %p",
    (roverDefinition: Array<string>, endPos: string) => {
      const rover = new Rover(plateau, true, roverDefinition);
      rover.processInstructions();
      expect(rover.getPos()).toEqual(endPos);
    }
  );
});

describe("processInstructions", () => {
  test.each([
    [["1 2 E", "MMMMMRMLMMMM"]],
    [["1 2 W", "MMMMMRMLMMMM"]],
    [["1 2 N", "MMMMMRMLMMMM"]],
    [["1 2 S", "MMMMMRMLMMMM"]],
  ])(
    "throws error when a dumb rover moves beyond edge of plateau",
    (roverDefinition: Array<string>) => {
      const rover = new Rover(plateau, true, roverDefinition);
      expect(() => {
        rover.processInstructions();
      }).toThrow("rover has fallen off plateau");
    }
  );
});

describe("processInstructions", () => {
  test.each([
    [["1 2 E", "MMMMMRMLMMMM"], "5 2 E"],
    [["1 2 W", "MMMMMRMLMMMM"], "0 2 W"],
    [["1 2 N", "MMMMMRMLMMMM"], "1 5 N"],
    [["1 2 S", "MMMMMRMLMMMM"], "1 0 S"],
  ])(
    "stops processing when a non-dumb rover attempts to move beyond edge of plateau",
    (roverDefinition: Array<string>, endPos: string) => {
      const rover = new Rover(plateau, false, roverDefinition);
      rover.processInstructions();
      expect(rover.getPos()).toEqual(endPos);
    }
  );
});

describe("processInstructions", () => {
  test.each([
    [["1 2 n", "lmlmlmlmm"], "1 3 N"],
    [["3 3 e", "mmrmmrmrrm"], "5 1 E"],
  ])(
    "processes lowercase instructions",
    (roverDefinition: Array<string>, endPos: string) => {
      const rover = new Rover(plateau, true, roverDefinition);
      rover.processInstructions();
      expect(rover.getPos()).toEqual(endPos);
    }
  );
});

const singleSquarePlateau: Coordinate = { x: 0, y: 0 };
describe("processInstructions", () => {
  test.each([
    [["0 0 N", "L"], "0 0 W"],
    [["0 0 N", "R"], "0 0 E"],
    [["0 0 N", "M"], "0 0 N"],
    [["0 0 S", "M"], "0 0 S"],
    [["0 0 W", "M"], "0 0 W"],
    [["0 0 E", "M"], "0 0 E"],
    [["0 0 E", " "], "0 0 E"],
    [["0 0 N", "LLLLL"], "0 0 W"],
    [["0 0 N", "RRRRR"], "0 0 E"],
    [["0 0 N", "LMLMLMLMM"], "0 0 W"],
    [["0 0 E", "MMRMMRMRRM"], "0 0 E"],
  ])(
    "works as expected for a non-dumb rover attempting to move on a single square plateau",
    (roverDefinition: Array<string>, endPos: string) => {
      const rover = new Rover(singleSquarePlateau, false, roverDefinition);
      rover.processInstructions();
      expect(rover.getPos()).toEqual(endPos);
    }
  );
});

describe("processInstructions", () => {
  test.each([
    [["0 0 N", "L"], "0 0 W"],
    [["0 0 N", "R"], "0 0 E"],
    [["0 0 N", "LLLLL"], "0 0 W"],
    [["0 0 N", "RRRRR"], "0 0 E"],
  ])(
    "works as expected for a non-dumb rover attempting to turn on a single square plateau",
    (roverDefinition: Array<string>, endPos: string) => {
      const rover = new Rover(singleSquarePlateau, true, roverDefinition);
      rover.processInstructions();
      expect(rover.getPos()).toEqual(endPos);
    }
  );
});

describe("processInstructions", () => {
  test.each([
    [["0 0 N", "M"]],
    [["0 0 S", "M"]],
    [["0 0 W", "M"]],
    [["0 0 E", "M"]],
    [["0 0 N", "LMLMLMLMM"]],
    [["0 0 E", "MMRMMRMRRM"]],
  ])(
    "throws an error for a dumb rover attempting to move on a single square plateau",
    (roverDefinition: Array<string>) => {
      const rover = new Rover(singleSquarePlateau, true, roverDefinition);
      expect(() => {
        rover.processInstructions();
      }).toThrow("invalid position or rover has fallen off plateau");
    }
  );
});

describe("processInstructions", () => {
  test.each([
    [["10 2 N", "L"], true],
    [["10 2 N", "R"], false],
    [["10 2 N", "M"], true],
    [["10 2 S", "M"], false],
    [["10 2 W", "M"], true],
    [["10 2 E", "M"], false],
    [["10 2 E", " "], true],
    [["10 2 N", "LMLMLMLMM"], false],
    [["30 3 E", "MMRMMRMRRM"], true],
  ])(
    "throws an error for a rover whose starting point is off the edge of the plateau",
    (roverDefinition: Array<string>, isDumb: boolean) => {
      expect(() => {
        const rover = new Rover(plateau, isDumb, roverDefinition);
      }).toThrow("invalid position or rover has fallen off plateau");
    }
  );
});

describe("processInstructions", () => {
  test.each([[["-1 2 N", ""]], [["0 2.4 N", ""]], [["A B N", ""]]])(
    "throws an error for a rover with an invalid starting position",
    (roverDefinition: Array<string>) => {
      expect(() => {
        const rover = new Rover(plateau, true, roverDefinition);
      }).toThrow("invalid position or rover has fallen off plateau");
    }
  );
});

describe("processInstructions", () => {
  test.each([
    [["1 2", ""]],
    [["1 2 X", ""]],
    [["1 2 L", ""]],
    [["1 2 R", ""]],
    [["1 2 M", ""]],
    [["1 2 NS", ""]],
  ])(
    "throws an error for a rover with an invalid starting direction",
    (roverDefinition: Array<string>) => {
      expect(() => {
        const rover = new Rover(plateau, true, roverDefinition);
      }).toThrow("invalid starting direction");
    }
  );
});
