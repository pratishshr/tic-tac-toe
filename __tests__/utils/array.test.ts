import * as array from '../../src/utils/array';

describe('array.isEqual', () => {
  test('should return true when two arrays have same data', () => {
    const inputs = [
      { a: ['a'], b: ['a'] },
      { a: ['a', 'b', 'c'], b: ['a', 'b', 'c'] },
      { a: [1, 2, 3], b: [1, 2, 3] },
    ];

    inputs.forEach((input) => {
      expect(array.isEqual(input.a, input.b)).toBe(true);
    });
  });

  test('should return false when two arrays have different data', () => {
    const inputs = [
      { a: ['a'], b: ['b'] },
      { a: ['a', 'b', 'c'], b: ['a', 'b'] },
      { a: [1], b: [1, 2, 3] },
    ];

    inputs.forEach((input) => {
      expect(array.isEqual(input.a, input.b)).toBe(false);
    });
  });
});
