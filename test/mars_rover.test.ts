import { marsRover } from "../src/mars_rover";

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
      }).toThrow(Error("invalid plateau"));
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
