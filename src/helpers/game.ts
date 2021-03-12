/**
 * Helper for the tic-tac-toe game logic.
 * Currently satisfies for a 3x3 board. Could be extended for a larger size boards.
 */

const SIZE = 3;

/**
 * Returns true if the row has a match in a given index.
 */
export function rowMatch(state: string[], rowIndex: number): boolean {
  let matches = 0;

  if (rowIndex % 3 !== 0) {
    return false;
  }

  for (let j = 1; j < SIZE; j++) {
    if (state[rowIndex] && state[rowIndex] === state[rowIndex + j]) {
      matches++;
    }
  }

  if (matches == SIZE - 1) {
    return true;
  }

  return false;
}

/**
 * Returns true if the column has a match in a given index.
 */
export function colMatch(state: string[], colIndex: number): boolean {
  let matches = 0;

  if (colIndex >= 3) {
    return false;
  }

  for (let j = 1; j < SIZE; j++) {
    if (state[colIndex] && state[colIndex] === state[colIndex + j * SIZE]) {
      matches++;
    }
  }

  if (matches == SIZE - 1) {
    return true;
  }

  return false;
}

/**
 * Returns true if one of the diagonal has a match.
 */
export function diagonalMatch(state: string[], index: number): boolean {
  if (index === 0) {
    let matches = 0;
    for (let j = 1; j < SIZE; j++) {
      if (state[index] && state[index] === state[4 * j]) {
        matches++;
      }
    }
    if (matches === SIZE - 1) {
      return true;
    }
  }

  if (index === 2) {
    let matches = 0;
    for (let j = 1; j < SIZE; j++) {
      if (state[index] && state[index] === state[2 * (j + 1)]) {
        matches++;
      }
    }
    if (matches === SIZE - 1) {
      return true;
    }
  }

  return false;
}

/**
 * Returns true if the board is full.
 */
export function isFull(state: string[]): boolean {
  return state.filter((s) => s).length === SIZE * SIZE;
}

/**
 * Returns true if there is atleast one match in the board.
 */
export function hasMatch(state: string[]): boolean {
  for (let i = 0; i < state.length; i++) {
    if (
      this.rowMatch(state, i) ||
      this.colMatch(state, i) ||
      this.diagonalMatch(state, i)
    ) {
      return true;
    }
  }

  return false;
}
