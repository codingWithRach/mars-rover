import { main, configDumb } from "../src/mars_rover";
import { Errors } from "../src/error_messages";

// describe("marsRover", () => {
//   test.each([["5 5"]])(
//     "returns empty string if passed valid plateau %p but no instructions",
//     (plateauString: string) => {
//       expect(main(plateauString)).toEqual("");
//     }
//   );
// });

// describe("marsRover", () => {
//   test.each([["a b"], ["1"], ["0.4 1"], ["3 -1"]])(
//     "throws error if passed invalid plateau %p but no instructions",
//     (plateauString: string) => {
//       expect(() => {
//         main(plateauString);
//       }).toThrow(Error(Errors.INVALID_PLATEAU));
//     }
//   );
// });

// describe("marsRover", () => {
//   test.each([["5 5", "1 2 N"]])(
//     "returns start position if passed start position for one rover but no movement instructions",
//     (plateauString: string, roverStart: string) => {
//       expect(main(plateauString, roverStart)).toEqual(roverStart);
//     }
//   );
// });

// describe("marsRover", () => {
//   test.each([["5 5", "1 2 N", "", "3 3 E", "1 2 N, 3 3 E"]])(
//     "returns start positions if passed start positions for two rovers with no movement instructions",
//     (
//       plateauString: string,
//       roverOneStart: string,
//       roverOneInstruction: string,
//       roverTwoStart: string,
//       roverEnd: string
//     ) => {
//       expect(
//         main(plateauString, roverOneStart, roverOneInstruction, roverTwoStart)
//       ).toEqual(roverEnd);
//     }
//   );
// });

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
        main(
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
    ["5 5", "10 20 N", "LMLMLMLMM", "3 3 E", "MMRMMRMRRM"],
    ["5 5", "1 2 N", "LMLMLMLMM", "30 30 E", "MMRMMRMRRM"],
    ["5 5", "10 20 N", "LMLMLMLMM", "30 30 E", "MMRMMRMRRM"],
    ["5 5", "", "LMLMLMLMM", "30 30 E", "MMRMMRMRRM"],
    ["5 5", "A B C", "LMLMLMLMM", "30 30 E", "MMRMMRMRRM"],
  ])(
    "throws an error for a rover with an invalid starting position",
    (
      plateauString: string,
      roverOneStart: string,
      roverOneInstruction: string,
      roverTwoStart: string,
      roverTwoInstruction: string
    ) => {
      expect(() => {
        main(
          plateauString,
          roverOneStart,
          roverOneInstruction,
          roverTwoStart,
          roverTwoInstruction
        );
      }).toThrow(Errors.INVALID_POS);
    }
  );
});

describe("marsRover", () => {
  test.each([
    ["5 5", "1 2", "LMLMLMLMM", "3 3 E", "MMRMMRMRRM"],
    ["5 5", "1 2 3 N", "LMLMLMLMM", "3 3 E", "MMRMMRMRRM"],
    ["5 5", "1 2 X", "LMLMLMLMM", "3 3 E", "MMRMMRMRRM"],
    ["5 5", "1 2 L", "LMLMLMLMM", "3 3 E", "MMRMMRMRRM"],
    ["5 5", "1 2 R", "LMLMLMLMM", "3 3 E", "MMRMMRMRRM"],
    ["5 5", "1 2 M", "LMLMLMLMM", "3 3 E", "MMRMMRMRRM"],
    ["5 5", "1 2 ????", "LMLMLMLMM", "3 3 E", "MMRMMRMRRM"],
  ])(
    "throws an error for a rover with an invalid starting direction",
    (
      plateauString: string,
      roverOneStart: string,
      roverOneInstruction: string,
      roverTwoStart: string,
      roverTwoInstruction: string
    ) => {
      expect(() => {
        main(
          plateauString,
          roverOneStart,
          roverOneInstruction,
          roverTwoStart,
          roverTwoInstruction
        );
      }).toThrow(Errors.INVALID_DIR);
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
      expect(main(plateauString, roverStart, instruction)).toEqual(endPos);
    }
  );
});

describe("marsRover", () => {
  const instruction: string = new Array(100000).fill("LMMMMM").join("");
  test("given long instructions, returns expected end position", () => {
    expect(main("5 5", "0 0 S", instruction)).toEqual("0 0 S");
  });
});

describe("marsRover", () => {
  test.each([
    ["5 5", "1 2 N", "LMLMLMLMM", "3 3 E", "MMRMMRMRRM", "1 3 N, 5 1 E"],
    ["5 5", "1 2 N", "", "3 3 E", "MMRMMRMRRM", "1 2 N, 5 1 E"],
    ["5 5", "1 2 N", "LMLMLMLMM", "3 3 E", "", "1 3 N, 3 3 E"],
    ["0 50", "0 2 N", "MLLLLMMMMR", "0 10 S", "RRMMMLLMMMM", "0 7 E, 0 9 S"],
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
        main(
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

describe("marsRover", () => {
  test.each([
    [
      "5 5",
      "1 2 N",
      "LMLMLMLMM",
      "3 3 E",
      "MMRMMRMRRM",
      "0 5 W",
      "LMLMMMMLMLMMLMMMMMR",
      "1 3 N, 5 1 E, 2 0 W",
    ],
  ])(
    "given valid start position and instructions three rovers that don't coincide, returns expected end positions",
    (
      plateauString: string,
      roverOneStart: string,
      roverOneInstruction: string,
      roverTwoStart: string,
      roverTwoInstruction: string,
      roverThreeStart: string,
      roverThreeInstruction: string,
      endPos: string
    ) => {
      expect(
        main(
          plateauString,
          roverOneStart,
          roverOneInstruction,
          roverTwoStart,
          roverTwoInstruction,
          roverThreeStart,
          roverThreeInstruction
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
        main(
          plateauString,
          roverOneStart,
          roverOneInstruction,
          roverTwoStart,
          roverTwoInstruction
        );
      }).toThrow(Errors.OCCUPIED_POS);
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
        main(
          plateauString,
          roverOneStart,
          roverOneInstruction,
          roverTwoStart,
          roverTwoInstruction
        );
      }).toThrow(Errors.OCCUPIED_POS);
    }
  );
  test.each([["5 5", "1 2 N", "LMLMLMLMM", "1 2 N", "MMRMMRMRRM"]])(
    "doesn't allow multiple rovers with the same start position",
    (
      plateauString: string,
      roverOneStart: string,
      roverOneInstruction: string,
      roverTwoStart: string,
      roverTwoInstruction: string
    ) => {
      expect(() => {
        main(
          plateauString,
          roverOneStart,
          roverOneInstruction,
          roverTwoStart,
          roverTwoInstruction
        );
      }).toThrow(Errors.OCCUPIED_POS);
    }
  );
  test.each([
    ["5 5", "1 2 N", "LMMMMMMMMLMLMLMM", "1 3 E", "MMRMMRMRRM"],
    ["0 0", "0 0 N", "LMMMMMMMMLMLMLMM", "1 3 E", "MMRMMRMRRM"],
  ])(
    "if first rover falls off the plateau, the crash stops processing",
    (
      plateauString: string,
      roverOneStart: string,
      roverOneInstruction: string,
      roverTwoStart: string,
      roverTwoInstruction: string
    ) => {
      expect(() => {
        main(
          plateauString,
          roverOneStart,
          roverOneInstruction,
          roverTwoStart,
          roverTwoInstruction
        );
      }).toThrow(Errors.INVALID_POS);
    }
  );
  test.each([["5 5", "1 2 N", "LMLMLMLMM", "3 3 E", "MMMMMMMMMMMRMMRMRRM"]])(
    "if second rover falls off the plateau, the crash stops processing",
    (
      plateauString: string,
      roverOneStart: string,
      roverOneInstruction: string,
      roverTwoStart: string,
      roverTwoInstruction: string
    ) => {
      expect(() => {
        main(
          plateauString,
          roverOneStart,
          roverOneInstruction,
          roverTwoStart,
          roverTwoInstruction
        );
      }).toThrow(Errors.INVALID_POS);
    }
  );
  test.each([
    [
      "5 5",
      "1 2 N",
      "LMLMLXMLMM",
      "3 3 E",
      "MRM MMMMMMMMMRMMRMRRM",
      "0 1 E, 4 2 S",
    ],
    ["5 5", "1 2 N", " ", "3 3 E", "", "1 2 N, 3 3 E"],
  ])(
    "each rover stops processing if it reaches an invalid instruction",
    (
      plateauString: string,
      roverOneStart: string,
      roverOneInstruction: string,
      roverTwoStart: string,
      roverTwoInstruction: string,
      endPos: string
    ) => {
      expect(
        main(
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
        main(
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
        main(
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
    ["5 5", "1 2 N", "LMLMLMLMM", "1 2 N", "MMRMMRMRRM"],
    ["0 0", "0 0 N", "LMMMMMMMMLMLMLMM", "0 0 E", "MMRMMRMRRM"],
  ])(
    "doesn't allow multiple rovers with the same start position",
    (
      plateauString: string,
      roverOneStart: string,
      roverOneInstruction: string,
      roverTwoStart: string,
      roverTwoInstruction: string
    ) => {
      expect(() => {
        main(
          plateauString,
          roverOneStart,
          roverOneInstruction,
          roverTwoStart,
          roverTwoInstruction
        );
      }).toThrow(Errors.OCCUPIED_POS);
    }
  );
  test.each([
    ["5 5", "1 2 N", "LMMMMMMMMLMLMLMM", "3 3 E", "MMRMMRMRRM", "0 2 W, 5 1 E"],
  ])(
    "first rover stops processing instead of falling off plateau, and second rover is processed as normal",
    (
      plateauString: string,
      roverOneStart: string,
      roverOneInstruction: string,
      roverTwoStart: string,
      roverTwoInstruction: string,
      endPos: string
    ) => {
      expect(
        main(
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
    [
      "5 5",
      "1 2 N",
      "LMLMLMLMM",
      "3 3 E",
      "MMMMMMMMMMMRMMRMRRM",
      "1 3 N, 5 3 E",
    ],
  ])(
    "second rover stops processing instead of falling off plateau",
    (
      plateauString: string,
      roverOneStart: string,
      roverOneInstruction: string,
      roverTwoStart: string,
      roverTwoInstruction: string,
      endPos: string
    ) => {
      expect(
        main(
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
    [
      "5 5",
      "1 2 N",
      "LMLMLXMLMM",
      "3 3 E",
      "MRM MMMMMMMMMRMMRMRRM",
      "0 1 E, 4 2 S",
    ],
    ["5 5", "1 2 N", " ", "3 3 E", "", "1 2 N, 3 3 E"],
  ])(
    "each rover stops processing if it reaches an invalid instruction",
    (
      plateauString: string,
      roverOneStart: string,
      roverOneInstruction: string,
      roverTwoStart: string,
      roverTwoInstruction: string,
      endPos: string
    ) => {
      expect(
        main(
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
