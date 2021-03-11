/**
 * Checks if two arrays are equal
 */
export function isEqual(a: string[], b: string[]): boolean {
  if (!a || !b) {
    return false;
  }

  if (a.length !== b.length) {
    return false;
  }

  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      return false;
    }
  }

  return true;
}
