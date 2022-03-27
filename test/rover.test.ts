import { Rover } from "../src/rover";
import { RoverCommander } from "../src/rover_commander";
import { Coordinate } from "../src/coordinate";

const plateau = new Coordinate(5, 5);

describe("Rover class constructor", () => {
  test.each([
    [1, 2, "N", "LMLMLMLMM", "1 2 N"],
    [3, 3, "E", "MMRMMRMRRM", "3 3 E"],
  ])(
    "sets private class variables for starting position %p, directions %p and instructions %p",
    (
      x: number,
      y: number,
      direction: string,
      instructions: string,
      endPos: string
    ) => {
      const rover = new Rover(
        true,
        new Coordinate(x, y),
        direction,
        instructions
      );
      expect(rover.posAndDir).toEqual(endPos);
    }
  );
});

const startPos = new Coordinate(1, 2);
describe("spin method", () => {
  test.each([
    ["L", "1 2 W"],
    ["R", "1 2 E"],
  ])(
    "given direction %p and instructions %p, changes the position to %p",
    (instructions: string, endPos: string) => {
      const rover = new Rover(true, startPos, "N", instructions);
      const roverCommander = new RoverCommander(plateau, [rover]);
      roverCommander.commandRovers();
      expect(rover.posAndDir).toEqual(endPos);
    }
  );
});

describe("move method", () => {
  test.each([
    ["N", "M", "1 3 N"],
    ["S", "M", "1 1 S"],
    ["W", "M", "0 2 W"],
    ["E", "M", "2 2 E"],
  ])(
    "given direction % and instructions %p, changes the position to %p",
    (direction: string, instructions: string, endPos: string) => {
      const rover = new Rover(true, startPos, direction, instructions);
      const roverCommander = new RoverCommander(plateau, [rover]);
      roverCommander.commandRovers();
      expect(rover.posAndDir).toEqual(endPos);
    }
  );
});

describe("commandRovers", () => {
  test.each([
    [1, 2, "N", "L", "1 2 W"],
    [1, 2, "N", "R", "1 2 E"],
    [1, 2, "N", "M", "1 3 N"],
    [1, 2, "S", "M", "1 1 S"],
    [1, 2, "W", "M", "0 2 W"],
    [1, 2, "E", "M", "2 2 E"],
    [1, 2, "E", " ", "1 2 E"],
    [1, 2, "N", "LMLMLMLMM", "1 3 N"],
    [3, 3, "E", "MMRMMRMRRM", "5 1 E"],
  ])(
    "given start position %p, direction %p and instructions %p, changes the position to %p",
    (
      x: number,
      y: number,
      direction: string,
      instructions: string,
      endPos: string
    ) => {
      const rover = new Rover(
        true,
        new Coordinate(x, y),
        direction,
        instructions
      );
      const roverCommander = new RoverCommander(plateau, [rover]);
      roverCommander.commandRovers();
      expect(rover.posAndDir).toEqual(endPos);
    }
  );
});

describe("commandRovers", () => {
  test.each([
    [1, 2, "E", "MMMMMRMLMMMM"],
    [1, 2, "W", "MMMMMRMLMMMM"],
    [1, 2, "N", "MMMMMRMLMMMM"],
    [1, 2, "S", "MMMMMRMLMMMM"],
  ])(
    "throws error when a dumb rover moves beyond edge of plateau",
    (x: number, y: number, direction: string, instructions: string) => {
      const rover = new Rover(
        true,
        new Coordinate(x, y),
        direction,
        instructions
      );
      const roverCommander = new RoverCommander(plateau, [rover]);
      expect(() => {
        roverCommander.commandRovers();
      }).toThrow();
    }
  );
});

describe("commandRovers", () => {
  test.each([
    [1, 2, "E", "MMMMMRMLMMMM", "5 2 E"],
    [1, 2, "W", "MMMMMRMLMMMM", "0 2 W"],
    [1, 2, "N", "MMMMMRMLMMMM", "1 5 N"],
    [1, 2, "S", "MMMMMRMLMMMM", "1 0 S"],
  ])(
    "stops processing when a non-dumb rover attempts to move beyond edge of plateau",
    (
      x: number,
      y: number,
      direction: string,
      instructions: string,
      endPos: string
    ) => {
      const rover = new Rover(
        false,
        new Coordinate(x, y),
        direction,
        instructions
      );
      const roverCommander = new RoverCommander(plateau, [rover]);
      roverCommander.commandRovers();
      expect(rover.posAndDir).toEqual(endPos);
    }
  );
});

describe("commandRovers", () => {
  test.each([
    [1, 2, "n", "lmlmlmlmm", "1 3 N"],
    [3, 3, "e", "mmrmmrmrrm", "5 1 E"],
  ])(
    "processes lowercase instructions",
    (
      x: number,
      y: number,
      direction: string,
      instructions: string,
      endPos: string
    ) => {
      const rover = new Rover(
        true,
        new Coordinate(x, y),
        direction,
        instructions
      );
      const roverCommander = new RoverCommander(plateau, [rover]);
      roverCommander.commandRovers();
      expect(rover.posAndDir).toEqual(endPos);
    }
  );
});

const singleSquare = new Coordinate(0, 0);
describe("commandRovers", () => {
  test.each([
    ["N", "L", "0 0 W"],
    ["N", "R", "0 0 E"],
    ["N", "M", "0 0 N"],
    ["S", "M", "0 0 S"],
    ["W", "M", "0 0 W"],
    ["E", "M", "0 0 E"],
    ["E", " ", "0 0 E"],
    ["N", "LLLLL", "0 0 W"],
    ["N", "RRRRR", "0 0 E"],
    ["N", "LMLMLMLMM", "0 0 W"],
    ["E", "MMRMMRMRRM", "0 0 E"],
  ])(
    "works as expected for a non-dumb rover attempting to move on a single square plateau",
    (direction: string, instructions: string, endPos: string) => {
      const rover = new Rover(false, singleSquare, direction, instructions);
      const roverCommander = new RoverCommander(singleSquare, [rover]);
      roverCommander.commandRovers();
      expect(rover.posAndDir).toEqual(endPos);
    }
  );
});

describe("commandRovers", () => {
  test.each([
    ["N", "L", "0 0 W"],
    ["N", "R", "0 0 E"],
    ["N", "LLLLL", "0 0 W"],
    ["N", "RRRRR", "0 0 E"],
  ])(
    "works as expected for a non-dumb rover attempting to turn on a single square plateau",
    (direction: string, instructions: string, endPos: string) => {
      const rover = new Rover(true, singleSquare, direction, instructions);
      const roverCommander = new RoverCommander(singleSquare, [rover]);
      roverCommander.commandRovers();
      expect(rover.posAndDir).toEqual(endPos);
    }
  );
});

describe("commandRovers", () => {
  test.each([
    ["N", "M"],
    ["S", "M"],
    ["W", "M"],
    ["E", "M"],
    ["N", "LMLMLMLMM"],
    ["E", "MMRMMRMRRM"],
  ])(
    "throws an error for a dumb rover attempting to move on a single square plateau",
    (direction: string, instructions: string) => {
      const rover = new Rover(true, singleSquare, direction, instructions);
      const roverCommander = new RoverCommander(singleSquare, [rover]);
      expect(() => {
        roverCommander.commandRovers();
      }).toThrow();
    }
  );
});

describe("new RoverCommander", () => {
  test.each([
    [10, 2, "N", "L", true],
    [10, 2, "N", "R", false],
    [10, 2, "N", "M", true],
    [10, 2, "S", "M", false],
    [10, 2, "W", "M", true],
    [10, 2, "E", "M", false],
    [10, 2, "E", " ", true],
    [10, 2, "N", "LMLMLMLMM", false],
    [30, 3, "E", "MMRMMRMRRM", true],
  ])(
    "throws an error for a rover whose starting point is off the edge of the plateau",
    (
      x: number,
      y: number,
      direction: string,
      instructions: string,
      isDumb: boolean
    ) => {
      const rover = new Rover(
        isDumb,
        new Coordinate(x, y),
        direction,
        instructions
      );
      expect(() => {
        const roverCommander = new RoverCommander(plateau, [rover]);
      }).toThrow();
    }
  );
});

describe("new RoverCommander", () => {
  test.each([
    [-1, 2, "N", ""],
    [0, 2.4, "N", ""],
  ])(
    "throws an error for a rover with an invalid starting position",
    (x: number, y: number, direction: string, instructions: string) => {
      const rover = new Rover(
        true,
        new Coordinate(x, y),
        direction,
        instructions
      );
      expect(() => {
        const roverCommander = new RoverCommander(plateau, [rover]);
      }).toThrow();
    }
  );
});

describe("new Rover", () => {
  test.each([[""], ["X"], ["L"], ["R"], ["M"], ["NS"]])(
    "throws an error for a rover with an invalid starting direction",
    (direction: string) => {
      expect(() => {
        const rover = new Rover(true, new Coordinate(1, 2), direction, "");
      }).toThrow();
    }
  );
});

describe("commandRovers", () => {
  test.each([
    [1, 2, "N", "1 2 N"],
    [3, 3, "E", "3 3 E"],
  ])(
    "returns start position when no instructions provided",
    (x: number, y: number, direction: string, endPos: string) => {
      const rover = new Rover(true, new Coordinate(x, y), direction);
      const roverCommander = new RoverCommander(plateau, [rover]);
      roverCommander.commandRovers();
      expect(rover.posAndDir).toEqual(endPos);
    }
  );
});

describe("Rover class constructor", () => {
  test.each([
    [[new Rover(true, new Coordinate(1, 2), "N", "")]],
    [
      [
        new Rover(true, new Coordinate(2, 4), "N", ""),
        new Rover(true, new Coordinate(1, 2), "N", ""),
      ],
    ],
  ])(
    "fails to set initial position if another rover is already there",
    (otherRovers: Array<Rover>) => {
      const rover = new Rover(true, new Coordinate(1, 2), "N", "LMLMLMLMM");
      const roverCommander = new RoverCommander(plateau, [
        rover,
        ...otherRovers,
      ]);
      expect(() => {
        roverCommander.commandRovers();
      }).toThrow();
    }
  );
});

describe("commandRovers", () => {
  const otherRovers: Array<Rover> = [
    new Rover(true, new Coordinate(4, 4), "N", ""),
    new Rover(true, new Coordinate(3, 2), "N", ""),
  ];
  test.each([[1, 2, "N", "LMLMLMLMM", "1 3 N"]])(
    "processes correctly if other rovers are on the plateau but don't interfere with this rover",
    (
      x: number,
      y: number,
      direction: string,
      instructions: string,
      endPos: string
    ) => {
      const rover = new Rover(
        true,
        new Coordinate(x, y),
        direction,
        instructions
      );
      const roverCommander = new RoverCommander(plateau, [
        rover,
        ...otherRovers,
      ]);
      roverCommander.commandRovers();
      expect(rover.posAndDir).toEqual(endPos);
    }
  );
});

describe("commandRovers", () => {
  test.each([[1, 2, "N", "LMLMLMLMM"]])(
    "for a dumb rover, throws error if attempt to move to a position already occupied by another rover",
    (x: number, y: number, direction: string, instructions: string) => {
      const rover = new Rover(
        true,
        new Coordinate(x, y),
        direction,
        instructions
      );
      const otherRover = new Rover(true, new Coordinate(1, 3), "N", "");
      const roverCommander = new RoverCommander(plateau, [rover, otherRover]);
      expect(() => {
        roverCommander.commandRovers();
      }).toThrow();
    }
  );
});

describe("commandRovers", () => {
  test.each([[1, 2, "N", "LMLMLMLMM", "1 2 W"]])(
    "for a non-dumb rover, stops processing if attempt to move to a position already occupied by another rover",
    (
      x: number,
      y: number,
      direction: string,
      instructions: string,
      endPos: string
    ) => {
      const rover = new Rover(
        false,
        new Coordinate(x, y),
        direction,
        instructions
      );
      const otherRover = new Rover(false, new Coordinate(0, 2), "N", "");
      const roverCommander = new RoverCommander(plateau, [rover, otherRover]);
      roverCommander.commandRovers();
      expect(rover.posAndDir).toEqual(endPos);
    }
  );
});
