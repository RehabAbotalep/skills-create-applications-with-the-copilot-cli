/**
 * Unit tests for calculator.js
 *
 * Covers all four supported operations:
 *   - add()      : addition
 *   - subtract() : subtraction
 *   - multiply() : multiplication
 *   - divide()   : division (including divide-by-zero edge case)
 *
 * Example operations from the reference image are included as baseline tests.
 */

const { add, subtract, multiply, divide, calculate } = require('../calculator');

// ---------------------------------------------------------------------------
// Addition
// ---------------------------------------------------------------------------
describe('add()', () => {
  // baseline from image: 2 + 3 = 5
  test('2 + 3 equals 5', () => expect(add(2, 3)).toBe(5));

  test('positive integers', () => expect(add(10, 20)).toBe(30));
  test('adding zero returns same number', () => expect(add(7, 0)).toBe(7));
  test('negative numbers', () => expect(add(-4, -6)).toBe(-10));
  test('positive and negative numbers', () => expect(add(10, -3)).toBe(7));
  test('floating point numbers', () => expect(add(1.5, 2.5)).toBeCloseTo(4));
  test('large numbers', () => expect(add(1000000, 2000000)).toBe(3000000));
});

// ---------------------------------------------------------------------------
// Subtraction
// ---------------------------------------------------------------------------
describe('subtract()', () => {
  // baseline from image: 10 - 4 = 6
  test('10 - 4 equals 6', () => expect(subtract(10, 4)).toBe(6));

  test('positive integers', () => expect(subtract(20, 8)).toBe(12));
  test('subtracting zero returns same number', () => expect(subtract(5, 0)).toBe(5));
  test('result is negative', () => expect(subtract(3, 10)).toBe(-7));
  test('negative numbers', () => expect(subtract(-5, -3)).toBe(-2));
  test('floating point numbers', () => expect(subtract(5.5, 2.5)).toBeCloseTo(3));
  test('subtracting itself returns 0', () => expect(subtract(99, 99)).toBe(0));
});

// ---------------------------------------------------------------------------
// Multiplication
// ---------------------------------------------------------------------------
describe('multiply()', () => {
  // baseline from image: 45 * 2 = 90
  test('45 * 2 equals 90', () => expect(multiply(45, 2)).toBe(90));

  test('positive integers', () => expect(multiply(6, 7)).toBe(42));
  test('multiply by zero returns 0', () => expect(multiply(100, 0)).toBe(0));
  test('multiply by one returns same number', () => expect(multiply(9, 1)).toBe(9));
  test('negative numbers', () => expect(multiply(-3, -4)).toBe(12));
  test('positive and negative numbers', () => expect(multiply(5, -3)).toBe(-15));
  test('floating point numbers', () => expect(multiply(2.5, 4)).toBeCloseTo(10));
  test('large numbers', () => expect(multiply(1000, 1000)).toBe(1000000));
});

// ---------------------------------------------------------------------------
// Division
// ---------------------------------------------------------------------------
describe('divide()', () => {
  // baseline from image: 20 / 5 = 4
  test('20 / 5 equals 4', () => expect(divide(20, 5)).toBe(4));

  test('positive integers', () => expect(divide(100, 4)).toBe(25));
  test('divide by one returns same number', () => expect(divide(7, 1)).toBe(7));
  test('negative dividend', () => expect(divide(-12, 3)).toBe(-4));
  test('negative divisor', () => expect(divide(12, -3)).toBe(-4));
  test('both negative', () => expect(divide(-10, -2)).toBe(5));
  test('floating point result', () => expect(divide(10, 3)).toBeCloseTo(3.333));
  test('zero divided by a number returns 0', () => expect(divide(0, 5)).toBe(0));

  // Edge case: divide by zero
  test('throws an error when dividing by zero', () => {
    expect(() => divide(10, 0)).toThrow('Division by zero is not allowed');
  });
  test('throws for negative numerator divided by zero', () => {
    expect(() => divide(-5, 0)).toThrow('Division by zero is not allowed');
  });
});

// ---------------------------------------------------------------------------
// calculate() dispatcher
// ---------------------------------------------------------------------------
describe('calculate()', () => {
  test('dispatches addition', () => expect(calculate(2, '+', 3)).toBe(5));
  test('dispatches subtraction', () => expect(calculate(10, '-', 4)).toBe(6));
  test('dispatches multiplication', () => expect(calculate(45, '*', 2)).toBe(90));
  test('dispatches division', () => expect(calculate(20, '/', 5)).toBe(4));

  test('throws for unsupported operator', () => {
    expect(() => calculate(1, '^', 2)).toThrow('Unsupported operator');
  });
  test('propagates divide-by-zero error', () => {
    expect(() => calculate(10, '/', 0)).toThrow('Division by zero is not allowed');
  });
});
