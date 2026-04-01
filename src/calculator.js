/**
 * Node.js CLI Calculator
 *
 * Supported operations:
 *   + addition       : adds two numbers
 *   - subtraction    : finds the difference between two numbers
 *   * multiplication : multiplies two numbers
 *   / division       : divides one number by another (throws on divide-by-zero)
 *
 * Usage:
 *   node calculator.js <number1> <operator> <number2>
 *
 * Examples:
 *   node calculator.js 10 + 5   => 15
 *   node calculator.js 10 - 3   => 7
 *   node calculator.js 4 * 7    => 28
 *   node calculator.js 20 / 4   => 5
 */

// Addition: returns the sum of a and b
function add(a, b) {
  return a + b;
}

// Subtraction: returns the difference of a and b
function subtract(a, b) {
  return a - b;
}

// Multiplication: returns the product of a and b
function multiply(a, b) {
  return a * b;
}

// Division: returns the quotient of a divided by b; throws if b is zero
function divide(a, b) {
  if (b === 0) throw new Error('Division by zero is not allowed');
  return a / b;
}

function calculate(a, operator, b) {
  switch (operator) {
    case '+': return add(a, b);
    case '-': return subtract(a, b);
    case '*': return multiply(a, b);
    case '/': return divide(a, b);
    default:  throw new Error(`Unsupported operator: "${operator}". Use +, -, *, or /`);
  }
}

// CLI entry point
if (require.main === module) {
  const args = process.argv.slice(2);

  if (args.length !== 3) {
    console.error('Usage: node calculator.js <number1> <operator> <number2>');
    console.error('Operators: + (add), - (subtract), * (multiply), / (divide)');
    process.exit(1);
  }

  const a = parseFloat(args[0]);
  const operator = args[1];
  const b = parseFloat(args[2]);

  if (isNaN(a) || isNaN(b)) {
    console.error('Error: Both operands must be valid numbers');
    process.exit(1);
  }

  try {
    const result = calculate(a, operator, b);
    console.log(`${a} ${operator} ${b} = ${result}`);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
}

module.exports = { add, subtract, multiply, divide, calculate };
