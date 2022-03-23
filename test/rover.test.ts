import { Rover } from "../src/rover";
import { Coordinate } from "../src/coordinate";
import { Errors } from "../src/error_messages";

const plateau: Coordinate = { x: 5, y: 5 };

describe("Rover class constructor", () => {
  test.each([
    [{ x: 1, y: 2 }, "N", "LMLMLMLMM", "1 2 N"],
    [{ x: 3, y: 3 }, "E", "MMRMMRMRRM", "3 3 E"],
  ])(
    "sets private class variables for starting position %p, directions %p and instructions %p",
    (
      startPos: Coordinate,
      direction: string,
      instructions: string,
      endPos: string
    ) => {
      const rover = new Rover(plateau, true, startPos, direction, instructions);
      expect(rover.getPosDir()).toEqual(endPos);
    }
  );
});

const startPos: Coordinate = { x: 1, y: 2 };
describe("spin method", () => {
  test.each([
    ["L", "1 2 W"],
    ["R", "1 2 E"],
  ])(
    "given direction %p and instructions %p, changes the position to %p",
    (instructions: string, endPos: string) => {
      const rover = new Rover(plateau, true, startPos, "N", instructions);
      rover.spin(instructions);
      expect(rover.getPosDir()).toEqual(endPos);
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
      const rover = new Rover(plateau, true, startPos, direction, instructions);
      rover.move();
      expect(rover.getPosDir()).toEqual(endPos);
    }
  );
});

describe("processInstructions", () => {
  test.each([
    [{ x: 1, y: 2 }, "N", "L", "1 2 W"],
    [{ x: 1, y: 2 }, "N", "R", "1 2 E"],
    [{ x: 1, y: 2 }, "N", "M", "1 3 N"],
    [{ x: 1, y: 2 }, "S", "M", "1 1 S"],
    [{ x: 1, y: 2 }, "W", "M", "0 2 W"],
    [{ x: 1, y: 2 }, "E", "M", "2 2 E"],
    [{ x: 1, y: 2 }, "E", " ", "1 2 E"],
    [{ x: 1, y: 2 }, "N", "LMLMLMLMM", "1 3 N"],
    [{ x: 3, y: 3 }, "E", "MMRMMRMRRM", "5 1 E"],
  ])(
    "given start position %p, direction %p and instructions %p, changes the position to %p",
    (
      startPos: Coordinate,
      direction: string,
      instructions: string,
      endPos: string
    ) => {
      const rover = new Rover(plateau, true, startPos, direction, instructions);
      rover.processInstructions();
      expect(rover.getPosDir()).toEqual(endPos);
    }
  );
});

describe("processInstructions", () => {
  test.each([
    [{ x: 1, y: 2 }, "E", "MMMMMRMLMMMM"],
    [{ x: 1, y: 2 }, "W", "MMMMMRMLMMMM"],
    [{ x: 1, y: 2 }, "N", "MMMMMRMLMMMM"],
    [{ x: 1, y: 2 }, "S", "MMMMMRMLMMMM"],
  ])(
    "throws error when a dumb rover moves beyond edge of plateau",
    (startPos: Coordinate, direction: string, instructions: string) => {
      const rover = new Rover(plateau, true, startPos, direction, instructions);
      expect(() => {
        rover.processInstructions();
      }).toThrow(Errors.INVALID_POS);
    }
  );
});

describe("processInstructions", () => {
  test.each([
    [{ x: 1, y: 2 }, "E", "MMMMMRMLMMMM", "5 2 E"],
    [{ x: 1, y: 2 }, "W", "MMMMMRMLMMMM", "0 2 W"],
    [{ x: 1, y: 2 }, "N", "MMMMMRMLMMMM", "1 5 N"],
    [{ x: 1, y: 2 }, "S", "MMMMMRMLMMMM", "1 0 S"],
  ])(
    "stops processing when a non-dumb rover attempts to move beyond edge of plateau",
    (
      startPos: Coordinate,
      direction: string,
      instructions: string,
      endPos: string
    ) => {
      const rover = new Rover(
        plateau,
        false,
        startPos,
        direction,
        instructions
      );
      rover.processInstructions();
      expect(rover.getPosDir()).toEqual(endPos);
    }
  );
});

describe("processInstructions", () => {
  test.each([
    [{ x: 1, y: 2 }, "n", "lmlmlmlmm", "1 3 N"],
    [{ x: 3, y: 3 }, "e", "mmrmmrmrrm", "5 1 E"],
  ])(
    "processes lowercase instructions",
    (
      startPos: Coordinate,
      direction: string,
      instructions: string,
      endPos: string
    ) => {
      const rover = new Rover(plateau, true, startPos, direction, instructions);
      rover.processInstructions();
      expect(rover.getPosDir()).toEqual(endPos);
    }
  );
});

const singleSquare: Coordinate = { x: 0, y: 0 };
describe("processInstructions", () => {
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
      const rover = new Rover(
        singleSquare,
        false,
        singleSquare,
        direction,
        instructions
      );
      rover.processInstructions();
      expect(rover.getPosDir()).toEqual(endPos);
    }
  );
});

describe("processInstructions", () => {
  test.each([
    ["N", "L", "0 0 W"],
    ["N", "R", "0 0 E"],
    ["N", "LLLLL", "0 0 W"],
    ["N", "RRRRR", "0 0 E"],
  ])(
    "works as expected for a non-dumb rover attempting to turn on a single square plateau",
    (direction: string, instructions: string, endPos: string) => {
      const rover = new Rover(
        singleSquare,
        true,
        singleSquare,
        direction,
        instructions
      );
      rover.processInstructions();
      expect(rover.getPosDir()).toEqual(endPos);
    }
  );
});

describe("processInstructions", () => {
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
      const rover = new Rover(
        singleSquare,
        true,
        singleSquare,
        direction,
        instructions
      );
      expect(() => {
        rover.processInstructions();
      }).toThrow(Errors.INVALID_POS);
    }
  );
});

describe("processInstructions", () => {
  test.each([
    [{ x: 10, y: 2 }, "N", "L", true],
    [{ x: 10, y: 2 }, "N", "R", false],
    [{ x: 10, y: 2 }, "N", "M", true],
    [{ x: 10, y: 2 }, "S", "M", false],
    [{ x: 10, y: 2 }, "W", "M", true],
    [{ x: 10, y: 2 }, "E", "M", false],
    [{ x: 10, y: 2 }, "E", " ", true],
    [{ x: 10, y: 2 }, "N", "LMLMLMLMM", false],
    [{ x: 30, y: 3 }, "E", "MMRMMRMRRM", true],
  ])(
    "throws an error for a rover whose starting point is off the edge of the plateau",
    (
      startPos: Coordinate,
      direction: string,
      instructions: string,
      isDumb: boolean
    ) => {
      expect(() => {
        const rover = new Rover(
          plateau,
          isDumb,
          startPos,
          direction,
          instructions
        );
      }).toThrow(Errors.INVALID_POS);
    }
  );
});

describe("processInstructions", () => {
  test.each([
    [{ x: -1, y: 2 }, "N", ""],
    [{ x: 0, y: 2.4 }, "N", ""],
  ])(
    "throws an error for a rover with an invalid starting position",
    (startPos: Coordinate, direction: string, instructions: string) => {
      expect(() => {
        const rover = new Rover(
          plateau,
          true,
          startPos,
          direction,
          instructions
        );
      }).toThrow(Errors.INVALID_POS);
    }
  );
});

describe("processInstructions", () => {
  test.each([[""], ["X"], ["L"], ["R"], ["M"], ["NS"]])(
    "throws an error for a rover with an invalid starting direction",
    (direction: string) => {
      expect(() => {
        const rover = new Rover(plateau, true, { x: 1, y: 2 }, direction, "");
      }).toThrow(Errors.INVALID_DIR);
    }
  );
});

describe("processInstructions", () => {
  test.each([
    [{ x: 1, y: 2 }, "N", "1 2 N"],
    [{ x: 3, y: 3 }, "E", "3 3 E"],
  ])(
    "returns start position when no instructions provided",
    (startPos: Coordinate, direction: string, endPos: string) => {
      const rover = new Rover(plateau, true, startPos, direction);
      rover.processInstructions();
      expect(rover.getPosDir()).toEqual(endPos);
    }
  );
});

describe("Rover class constructor", () => {
  test.each([
    [[{ x: 1, y: 2 }]],
    [
      [
        { x: 2, y: 4 },
        { x: 1, y: 2 },
      ],
    ],
  ])(
    "fails to set initial position if another rover is already there",
    (otherRovers: Array<Coordinate>) => {
      expect(() => {
        const rover = new Rover(
          plateau,
          true,
          { x: 1, y: 2 },
          "N",
          "LMLMLMLMM",
          otherRovers
        );
      }).toThrow(Errors.OCCUPIED_POS);
    }
  );
});

describe("processInstructions", () => {
  const otherRovers: Array<Coordinate> = [
    { x: 4, y: 4 },
    { x: 3, y: 2 },
  ];
  test.each([[{ x: 1, y: 2 }, "N", "LMLMLMLMM", "1 3 N"]])(
    "processes correctly if other rovers are on the plateau but don't interfere with this rover",
    (
      startPos: Coordinate,
      direction: string,
      instructions: string,
      endPos: string
    ) => {
      const rover = new Rover(
        plateau,
        true,
        startPos,
        direction,
        instructions,
        otherRovers
      );
      rover.processInstructions();
      expect(rover.getPosDir()).toEqual(endPos);
    }
  );
});

describe("processInstructions", () => {
  const otherRovers: Array<Coordinate> = [{ x: 1, y: 3 }];
  test.each([[{ x: 1, y: 2 }, "N", "LMLMLMLMM"]])(
    "for a dumb rover, throws error if attempt to move to a position already occupied by another rover",
    (startPos: Coordinate, direction: string, instructions: string) => {
      const rover = new Rover(
        plateau,
        true,
        startPos,
        direction,
        instructions,
        otherRovers
      );
      expect(() => {
        rover.processInstructions();
      }).toThrow(Errors.OCCUPIED_POS);
    }
  );
});

describe("processInstructions", () => {
  const otherRovers: Array<Coordinate> = [{ x: 0, y: 2 }];
  test.each([[{ x: 1, y: 2 }, "N", "LMLMLMLMM", "1 2 W"]])(
    "for a non-dumb rover, stops processing if attempt to move to a position already occupied by another rover",
    (
      startPos: Coordinate,
      direction: string,
      instructions: string,
      endPos: string
    ) => {
      const rover = new Rover(
        plateau,
        false,
        startPos,
        direction,
        instructions,
        otherRovers
      );
      rover.processInstructions();
      expect(rover.getPosDir()).toEqual(endPos);
    }
  );
});
