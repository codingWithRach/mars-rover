import { Plateau, createPlateau } from "../src/plateau";

export function marsRover(
  plateauString: string,
  [...roverInstructions]: Array<string> = []
): string {
  try {
    let plateau: Plateau = createPlateau(plateauString);
  } catch (error) {
    throw new Error("invalid plateau");
  }
  return "";
}
