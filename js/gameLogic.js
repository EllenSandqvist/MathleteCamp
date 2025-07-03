export function calculateResult(a, b, op) {
  return op === "+" ? a + b : a - b;
}

export function generateRandomNumbers() {
  return [Math.floor(Math.random() * 11), Math.floor(Math.random() * 11)];
}

export function generateRandomOperator(a, b) {
  if (a < b) return "+";
  return Math.random() < 0.5 ? "+" : "-";
}
