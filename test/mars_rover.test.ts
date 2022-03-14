import { marsRover, configDumb } from "../src/mars_rover";
import { ErrorType } from "../src/error_type";

describe("marsRover", () => {
  test.each([["5 5"]])(
    "returns empty string if passed valid plateau %p but no instructions",
    (plateauString: string) => {
      expect(marsRover(plateauString)).toEqual("");
    }
  );
});

describe("marsRover", () => {
  test.each([["a b"]])(
    "throws error if passed invalid plateau %p but no instructions",
    (plateauString: string) => {
      expect(() => {
        marsRover(plateauString);
      }).toThrow(Error(ErrorType.ERR_INVALID_PLATEAU));
    }
  );
});

describe("marsRover", () => {
  test.each([["5 5", "1 2 N"]])(
    "returns start position %p if passed start position for one rover but no movement instructions",
    (plateauString: string, roverStart: string) => {
      expect(marsRover(plateauString, roverStart)).toEqual(roverStart);
    }
  );
});

describe("marsRover", () => {
  test.each([["5 5", "1 2 N", "", "3 3 E", "1 2 N, 3 3 E"]])(
    "returns start positions if passed start positions for two rovers with no movement instructions",
    (
      plateauString: string,
      roverOneStart: string,
      roverOneInstruction: string,
      roverTwoStart: string,
      roverEnd: string
    ) => {
      expect(
        marsRover(
          plateauString,
          roverOneStart,
          roverOneInstruction,
          roverTwoStart
        )
      ).toEqual(roverEnd);
    }
  );
});

describe("marsRover", () => {
  test.each([["5 5", "1 2 N", "", "3 3 E", "", "1 2 N, 3 3 E"]])(
    "returns start positions if passed start positions for two rovers with no movement instructions",
    (
      plateauString: string,
      roverOneStart: string,
      roverOneInstruction: string,
      roverTwoStart: string,
      roverTwoInstruction: string,
      roverEnd: string
    ) => {
      expect(
        marsRover(
          plateauString,
          roverOneStart,
          roverOneInstruction,
          roverTwoStart,
          roverTwoInstruction
        )
      ).toEqual(roverEnd);
    }
  );
});

describe("marsRover", () => {
  test.each([
    ["5 5", "1 2 N", "LMLMLMLMM", "1 3 N"],
    ["5 5", "3 3 E", "MMRMMRMRRM", "5 1 E"],
  ])(
    "given valid start position and instructions for a single rover, returns expected end position",
    (
      plateauString: string,
      roverStart: string,
      instruction: string,
      endPos: string
    ) => {
      expect(marsRover(plateauString, roverStart, instruction)).toEqual(endPos);
    }
  );
});

describe("marsRover", () => {
  test.each([
    ["5 5", "1 2 N", "LMLMLMLMM", "3 3 E", "MMRMMRMRRM", "1 3 N, 5 1 E"],
    ["5 5", "1 2 N", "", "3 3 E", "MMRMMRMRRM", "1 2 N, 5 1 E"],
    ["5 5", "1 2 N", "LMLMLMLMM", "3 3 E", "", "1 3 N, 3 3 E"],
  ])(
    "given valid start position and instructions two rovers that don't coincide, returns expected end positions",
    (
      plateauString: string,
      roverOneStart: string,
      roverOneInstruction: string,
      roverTwoStart: string,
      roverTwoInstruction: string,
      endPos: string
    ) => {
      expect(
        marsRover(
          plateauString,
          roverOneStart,
          roverOneInstruction,
          roverTwoStart,
          roverTwoInstruction
        )
      ).toEqual(endPos);
    }
  );
});

// if a rover is dumb, it will fall off the edge of a plateau or collide with another rover
describe("for a dumb rover, marsRover", () => {
  beforeEach(() => configDumb(true));
  test.each([["5 5", "1 2 N", "LMLMLMLMM", "1 3 E", "MMRMMRMRRM"]])(
    "if first rover coincides with start position of second rover, first rover crashes",
    (
      plateauString: string,
      roverOneStart: string,
      roverOneInstruction: string,
      roverTwoStart: string,
      roverTwoInstruction: string
    ) => {
      expect(() => {
        marsRover(
          plateauString,
          roverOneStart,
          roverOneInstruction,
          roverTwoStart,
          roverTwoInstruction
        );
      }).toThrow(ErrorType.ERR_OCCUPIED_POS);
    }
  );
  test.each([["5 5", "1 2 N", "LMLMLMLMM", "3 3 E", "LMLMLMRMMLMMR"]])(
    "if second rover coincides with end position of first rover, second rover crashes",
    (
      plateauString: string,
      roverOneStart: string,
      roverOneInstruction: string,
      roverTwoStart: string,
      roverTwoInstruction: string
    ) => {
      expect(() => {
        marsRover(
          plateauString,
          roverOneStart,
          roverOneInstruction,
          roverTwoStart,
          roverTwoInstruction
        );
      }).toThrow(ErrorType.ERR_OCCUPIED_POS);
    }
  );
});

// if a rover is intelligent, it will stop processing when it encounters the edge of a plateau or another rover
describe("for an intelligent rover, marsRover", () => {
  beforeEach(() => configDumb(false));
  test.each([
    ["5 5", "1 2 N", "LMLMLMLMM", "1 3 E", "MMRMMRMRRM", "1 2 N, 3 1 E"],
  ])(
    "if first rover coincides with start position of second rover, first rover stops processing",
    (
      plateauString: string,
      roverOneStart: string,
      roverOneInstruction: string,
      roverTwoStart: string,
      roverTwoInstruction: string,
      endPos: string
    ) => {
      expect(
        marsRover(
          plateauString,
          roverOneStart,
          roverOneInstruction,
          roverTwoStart,
          roverTwoInstruction
        )
      ).toEqual(endPos);
    }
  );
  test.each([
    ["5 5", "1 2 N", "LMLMLMLMM", "3 3 E", "LMLMLMRMMLMMR", "1 3 N, 2 3 W"],
  ])(
    "if second rover coincides with end position of first rover, second rover stops processing",
    (
      plateauString: string,
      roverOneStart: string,
      roverOneInstruction: string,
      roverTwoStart: string,
      roverTwoInstruction: string,
      endPos: string
    ) => {
      expect(
        marsRover(
          plateauString,
          roverOneStart,
          roverOneInstruction,
          roverTwoStart,
          roverTwoInstruction
        )
      ).toEqual(endPos);
    }
  );
});

// 2 rovers that coincide
// first completes and second coincides with end pos of first - second crashes/stops

// two rovers with the same start point

// first rover falls off edge - check second still processes
// second rover falls off edge

// check for invalid instructions (dumb/intelligent)

// check for different shapes of plateau (inc straight line, single point)

// then add more complex tests (including more than two rovers) and consider edge cases
