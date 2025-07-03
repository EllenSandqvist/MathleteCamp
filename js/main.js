import { generateQuestions } from "./ui.js";
import { showResult } from "./resultHandler.js";

//variable for DOM nodes
const teamDiv = document.querySelector(".team-div");
const startButton = document.querySelector(".start-button");
const blackBoard = document.querySelector(".blackboard");
const checkAnswerBtn = document.getElementById("check-answers-button");
const reloadBtn = document.getElementById("reload-button");
const modal = document.querySelector(".modal");
const closeModal = document.getElementById("link-modal-close");

// Game settings
const gameState = {
  teamID: null,
  chosenTeam: "",
  resultArray: [],
  userAnswerArray: [],
  numOfRightAnswers: 0,
  isProcessing: false,
};

function handleTeamClick(team) {
  const map = {
    barcelona: 133739,
    juventus: 133676,
    "bayern-munchen": 133664,
    "manchester-city": 133613,
    "manchester-united": 133612,
    milan: 133667,
    psg: 133714,
    "real-madrid": 133738,
  };
  gameState.teamID = map[team] || null;
  startButton.disabled = false;
}

function handleTeamSelection(e) {
  const teamFigure =
    e.target.tagName === "FIGURE" ? e.target : e.target.closest("figure");
  if (!teamFigure) return;

  document
    .querySelectorAll(".team-div figure")
    .forEach((el) => el.classList.remove("chosen-team"));
  teamFigure.classList.add("chosen-team");

  gameState.chosenTeam = teamFigure.dataset.team;
  handleTeamClick(gameState.chosenTeam);
}

function handleStartGame() {
  document.querySelector(".setup-modal").classList.add("setup-modal-hidden");
  generateQuestions(blackBoard, gameState.resultArray);
}

function handleCheckAnswers() {
  if (gameState.isProcessing) return;
  gameState.isProcessing = true;
  gameState.numOfRightAnswers = 0;

  for (let i = 0; i < 10; i++) {
    const userAnswerInput = document.getElementById("input-" + i);
    const userInput = userAnswerInput.value.trim();
    const outcome = document.getElementById("outcome-" + i);
    outcome.textContent = "";

    if (!userInput) {
      alert(`Var snäll och fyll i svar för fråga ${i + 1}`);
      userAnswerInput.classList.add("missing-value");

      userAnswerInput.addEventListener("input", function handler() {
        userAnswerInput.classList.remove("missing-value");
        userAnswerInput.removeEventListener("input", handler);
      });
      gameState.isProcessing = false;
      return;
    }

    const userAnswer = Number(userInput);

    if (isNaN(userAnswer)) {
      alert(`Svaret på fråga ${i + 1} måste vara ett nummer`);
      gameState.isProcessing = false;
      return;
    }

    if (userAnswer === gameState.resultArray[i]) {
      outcome.textContent += "✅";
      gameState.numOfRightAnswers++;
    } else {
      outcome.textContent += "❌";
    }
  }

  showResult(gameState.numOfRightAnswers, gameState.teamID, modal);
}

function handleReload() {
  location.reload();
}
function handleCloseModal() {
  modal.classList.add("modal-hidden");
  gameState.isProcessing = false;
}

window.addEventListener("DOMContentLoaded", () => {
  teamDiv.addEventListener("click", handleTeamSelection);
  startButton.addEventListener("click", handleStartGame);
  checkAnswerBtn.addEventListener("click", handleCheckAnswers);
  closeModal.addEventListener("click", handleCloseModal);
  reloadBtn.addEventListener("click", handleReload);
});
