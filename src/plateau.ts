export interface Plateau {
  x: number;
  y: number;
}

export function isValidPlateau(plateau: Plateau): boolean {
  for (const key of Object.keys(plateau)) {
    if (!Number.isInteger(plateau[key]) || plateau[key] < 0) {
      return false;
    }
  }
  return true;
}

// creates a plateau from a string in the form '5 5'
export function createPlateau(plateauString: string): Plateau {
  const plateauArray: Array<number> = plateauString
    .split(" ")
    .map((val) => parseInt(val));
  plateauArray.forEach((dimension) => {
    if (Number.isNaN(plateauArray[0])) {
      throw new Error("invalid plateau");
    }
  });
  return { x: plateauArray[0], y: plateauArray[1] };
}
