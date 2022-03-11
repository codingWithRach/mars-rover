import { Plateau, createPlateau } from "../src/plateau";

export function marsRover(
  plateauString: string,
  ...roverInstructions: Array<string>
): string {
  // create plateau from first argument
  try {
    let plateau: Plateau = createPlateau(plateauString);
  } catch (error) {
    throw new Error("invalid plateau");
  }

  // process remaining arguments
  let endPos: string = "";
  if (roverInstructions.length === 1) {
    endPos = roverInstructions[0];
  }
  return endPos;
}
