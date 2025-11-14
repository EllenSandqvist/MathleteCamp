import { generateQuestions } from "./ui.js";
import { showResult } from "./resultHandler.js";

//variable for DOM nodes
const mathOpBtns = document.querySelectorAll('input[name="mathOp"]');
const mathOpDiv = document.querySelector(".mathOperation-div");
const teamDiv = document.querySelector(".team-div");
const startButton = document.querySelector(".start-button");
const missingMathChoice = document.querySelector(".missingMathChoice");
const missingTeamChoice = document.querySelector(".missingTeamChoice");
const blackBoard = document.querySelector(".blackboard");
const timerText = document.querySelector(".timer-text");
const checkAnswerBtn = document.getElementById("check-answers-button");
const reloadBtn = document.getElementById("reload-button");
const modal = document.querySelector(".modal");
const closeModal = document.getElementById("link-modal-close");

// Game settings
const gameState = {
  mathOp: "",
  teamID: null,
  chosenTeam: "",
  resultArray: [],
  userAnswerArray: [],
  numOfRightAnswers: 0,
  isProcessing: false,
  timer: {
    startTime: null,
    elapsed: 0,
    intervalId: null,
  },
};

// === HELPERS ===
function updateStartButtonState() {
  const { mathOp, chosenTeam } = gameState;

  if (mathOp) {
    mathOpDiv.classList.remove("missingChoice");
    missingMathChoice.classList.add("hidden");
  }
  if (chosenTeam) {
    teamDiv.classList.remove("missingChoice");
    missingTeamChoice.classList.add("hidden");
  }
  if (mathOp && chosenTeam) startButton.classList.remove("disabled");
}

function showMissingChoice(type) {
  if (type === "math") {
    mathOpDiv.classList.add("missingChoice");
    missingMathChoice.classList.remove("hidden");
  } else if (type === "team") {
    teamDiv.classList.add("missingChoice");
    missingTeamChoice.classList.remove("hidden");
  }
}

function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const tenths = Math.floor((ms % 1000) / 100);
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  return `${minutes}:${seconds}:${tenths}`;
}

function startTimer() {
  gameState.timer.startTime = Date.now();

  gameState.timer.intervalId = setInterval(() => {
    gameState.timer.elapsed = Date.now() - gameState.timer.startTime;
    timerText.textContent = formatTime(gameState.timer.elapsed);
  }, 100);

  console.log("Timern startar: " + gameState.timer.startTime);
}

function stopTimer() {
  let { elapsed } = gameState.timer;
  elapsed = Date.now() - gameState.timer.startTime;
  clearInterval(gameState.timer.intervalId);
  console.log("Timern stoppas: " + elapsed);
}

// === EVENT HANDLERS ===

function handleMathOpSelection(e) {
  gameState.mathOp = e.target.value;
  updateStartButtonState();
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

  const teamMap = {
    barcelona: 133739,
    juventus: 133676,
    "bayern-munchen": 133664,
    "manchester-city": 133613,
    "manchester-united": 133612,
    milan: 133667,
    psg: 133714,
    "real-madrid": 133738,
  };

  gameState.teamID = teamMap[gameState.chosenTeam] || null;
  updateStartButtonState();
}

function handleStartGame() {
  const { mathOp, chosenTeam } = gameState;

  if (!mathOp) return showMissingChoice("math");
  if (!chosenTeam) return showMissingChoice("team");

  document.querySelector(".setup-modal").classList.add("setup-modal-hidden");
  startTimer();
  generateQuestions(blackBoard, gameState.resultArray, mathOp);
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
  stopTimer();
  showResult(
    gameState.numOfRightAnswers,
    gameState.teamID,
    gameState.timer.elapsed,
    modal
  );
}

function handleReload() {
  location.reload();
}
function handleCloseModal() {
  modal.classList.add("modal-hidden");
  gameState.isProcessing = false;
}

window.addEventListener("DOMContentLoaded", () => {
  if (window.hasInitialized) return;
  window.hasInitialized = true;
  for (const mathOpbtn of mathOpBtns) {
    mathOpbtn.addEventListener("change", handleMathOpSelection);
  }
  teamDiv.addEventListener("click", handleTeamSelection);
  startButton.addEventListener("click", handleStartGame);
  checkAnswerBtn.addEventListener("click", handleCheckAnswers);
  closeModal.addEventListener("click", handleCloseModal);
  reloadBtn.addEventListener("click", handleReload);
});
