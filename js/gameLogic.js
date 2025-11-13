const mathOps = {
  PLUS_MINUS: "plusMinus",
  MULTIPLY_DIVIDE: "multiplyDivide",
};

export function calculateResult(a, b, op) {
  switch (op) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      return a / b;
  }
}

export function generateRandomNumbers(mathOp) {
  let a, b;

  if (mathOp === "plusMinus") {
    a = Math.floor(Math.random() * 11);
    b = Math.floor(Math.random() * 11);
  } else {
    a = Math.random() < 0.04 ? 0 : Math.floor(Math.random() * 10) + 1;
    b = Math.random() < 0.04 ? 0 : Math.floor(Math.random() * 10) + 1;
  }
  return [a, b];
}

export function generateRandomOperator(a, b, mathOp) {
  if (mathOp === mathOps.PLUS_MINUS) {
    if (a < b) return "+";
    return Math.random() < 0.5 ? "+" : "-";
  } else if (mathOp === mathOps.MULTIPLY_DIVIDE) {
    if (a === 0 || b === 0) return "*";
    if (a % b === 0) return Math.random() < 0.2 ? "*" : "/";
    return "*";
  }
}
