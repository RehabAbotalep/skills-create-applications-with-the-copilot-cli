/**
 * Unit tests for calculator.js
 *
 * Covers all supported operations:
 *   - add()        : addition
 *   - subtract()   : subtraction
 *   - multiply()   : multiplication
 *   - divide()     : division (including divide-by-zero edge case)
 *   - modulo()     : modulo / remainder
 *   - power()      : exponentiation
 *   - squareRoot() : square root (including negative input edge case)
 *
 * Example operations from the reference image are included as baseline tests.
 */

const { add, subtract, multiply, divide, modulo, power, squareRoot, calculate } = require('../calculator');

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
  test('dispatches modulo', () => expect(calculate(10, '%', 3)).toBe(1));
  test('dispatches power', () => expect(calculate(2, '**', 8)).toBe(256));

  test('throws for unsupported operator', () => {
    expect(() => calculate(1, '^', 2)).toThrow('Unsupported operator');
  });
  test('propagates divide-by-zero error', () => {
    expect(() => calculate(10, '/', 0)).toThrow('Division by zero is not allowed');
  });
});

// ---------------------------------------------------------------------------
// Modulo
// ---------------------------------------------------------------------------
describe('modulo()', () => {
  // baseline from image: 5 % 2 = 1
  test('5 % 2 equals 1', () => expect(modulo(5, 2)).toBe(1));

  test('10 % 3 equals 1', () => expect(modulo(10, 3)).toBe(1));
  test('positive integers with no remainder', () => expect(modulo(9, 3)).toBe(0));
  test('negative dividend', () => expect(modulo(-10, 3)).toBe(-1));
  test('negative divisor', () => expect(modulo(10, -3)).toBe(1));
  test('both negative', () => expect(modulo(-7, -3)).toBe(-1));
  test('floating point numbers', () => expect(modulo(5.5, 2)).toBeCloseTo(1.5));
  test('modulo by 1 always returns 0', () => expect(modulo(99, 1)).toBe(0));
  test('dividend smaller than divisor returns dividend', () => expect(modulo(3, 10)).toBe(3));
  test('modulo of zero returns 0', () => expect(modulo(0, 5)).toBe(0));
  test('modulo by 0 returns NaN', () => expect(modulo(5, 0)).toBeNaN());
});

// ---------------------------------------------------------------------------
// Power
// ---------------------------------------------------------------------------
describe('power()', () => {
  // baseline from image: 2 ^ 3 = 8
  test('2 ^ 3 equals 8', () => expect(power(2, 3)).toBe(8));

  test('2 ** 8 equals 256', () => expect(power(2, 8)).toBe(256));
  test('any base to the power of 0 equals 1', () => expect(power(5, 0)).toBe(1));
  test('any base to the power of 1 returns base', () => expect(power(7, 1)).toBe(7));
  test('0 to any positive power equals 0', () => expect(power(0, 5)).toBe(0));
  test('1 to any power equals 1', () => expect(power(1, 100)).toBe(1));
  test('negative base with even exponent returns positive', () => expect(power(-3, 2)).toBe(9));
  test('negative base with odd exponent returns negative', () => expect(power(-2, 3)).toBe(-8));
  test('negative exponent returns fraction', () => expect(power(2, -1)).toBeCloseTo(0.5));
  test('fractional exponent', () => expect(power(27, 1 / 3)).toBeCloseTo(3));
  test('large exponent', () => expect(power(10, 6)).toBe(1000000));
});

// ---------------------------------------------------------------------------
// Square Root
// ---------------------------------------------------------------------------
describe('squareRoot()', () => {
  // baseline from image: √16 = 4
  test('sqrt(16) equals 4', () => expect(squareRoot(16)).toBe(4));

  test('sqrt(144) equals 12', () => expect(squareRoot(144)).toBe(12));
  test('sqrt(0) equals 0', () => expect(squareRoot(0)).toBe(0));
  test('sqrt(1) equals 1', () => expect(squareRoot(1)).toBe(1));
  test('sqrt(9) equals 3', () => expect(squareRoot(9)).toBe(3));
  test('sqrt(100) equals 10', () => expect(squareRoot(100)).toBe(10));
  test('sqrt(2) is approximately 1.414', () => expect(squareRoot(2)).toBeCloseTo(1.414));
  test('sqrt(0.25) equals 0.5', () => expect(squareRoot(0.25)).toBeCloseTo(0.5));
  test('sqrt of a perfect square is an integer', () => expect(Number.isInteger(squareRoot(25))).toBe(true));

  // Edge cases
  test('throws an error for negative input', () => {
    expect(() => squareRoot(-1)).toThrow('Square root of a negative number is not allowed');
  });
  test('throws for any negative number', () => {
    expect(() => squareRoot(-100)).toThrow('Square root of a negative number is not allowed');
  });
  test('throws for negative decimal', () => {
    expect(() => squareRoot(-0.5)).toThrow('Square root of a negative number is not allowed');
  });
});
