import { marsRover, configDumb } from "../src/mars_rover";
import { ErrorType } from "../src/error_type";

// configure whether or not the rovers being tested are dumb (a single flag applies to all rovers)
// - if true, the rovers are dumb i.e. will fall off the edge of a plateau or collide with another rover
// - if false, the rovers are intelligent i.e. will stop processing when they encounter the edge of a plateau or another rover
beforeAll(() => configDumb(true));

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

// 2 rovers that coincide
// first coincides with position of second - first crashes/stops and second still processes
// first completes and second coincides with end pos of first - second crashes/stops but still return end pos of first

// first rover falls off edge - check second still processes

// then add more complex tests and consider edge cases

// before final check-in, ensure that all tests run with configDumb(true)  and with configDumb(false)
