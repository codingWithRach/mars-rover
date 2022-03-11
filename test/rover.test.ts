import { Rover } from "../src/rover";

describe("Rover class constructor", () => {
  test.each([["1 2 N"], ["3 3 E"]])(
    "sets private class variables for starting position %p",
    (startPos) => {
      const rover = new Rover(startPos);
      expect(rover.getPos()).toEqual(startPos);
    }
  );
});
