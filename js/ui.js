import {
  generateRandomNumbers,
  generateRandomOperator,
  calculateResult,
} from "./gameLogic.js";

export function generateQuestions(blackBoard, resultArray, mathOp) {
  blackBoard.innerHTML = "";
  resultArray.length = 0;

  for (let i = 0; i < 10; i++) {
    const [a, b] = generateRandomNumbers(mathOp);
    const op = generateRandomOperator(a, b, mathOp);
    const result = calculateResult(a, b, op);
    resultArray.push(result);

    //create Div and fill with math problem
    const mathDiv = document.createElement("div");
    mathDiv.classList.add("math-div");
    mathDiv.id = "div-" + i;
    mathDiv.textContent = `${a} ${op} ${b} = `;

    const userInput = document.createElement("input");
    userInput.type = "number";
    userInput.id = "input-" + i;
    userInput.classList.add("input");
    mathDiv.appendChild(userInput);

    const outcome = document.createElement("p");
    outcome.classList.add("outcome");
    outcome.id = "outcome-" + i;
    mathDiv.appendChild(outcome);

    blackBoard.appendChild(mathDiv);
  }
}
