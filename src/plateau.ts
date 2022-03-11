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

function isValidPlateauArray(plateauArray: Array<number>): boolean {
  if (plateauArray.length !== 2) return false;
  for (const dimension of plateauArray) {
    if (Number.isNaN(dimension)) {
      return false;
    }
  }
  return true;
}

// creates a plateau from a string in the form '5 5'
export function createPlateau(plateauString: string): Plateau {
  const plateauArray: Array<number> = plateauString
    .split(" ")
    .map((val) => parseFloat(val));
  if (
    !isValidPlateauArray(plateauArray) ||
    !isValidPlateau({ x: plateauArray[0], y: plateauArray[1] })
  )
    throw new Error("invalid plateau");
  return { x: plateauArray[0], y: plateauArray[1] };
}
