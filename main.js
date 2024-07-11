//variable for DOM nodes
const teamDiv = document.querySelector(".team-div");
const startButton = document.querySelector(".start-button");
const setupModal = document.querySelector(".setup-modal");
const blackBoard = document.querySelector(".blackboard");
const checkAnswerBtn = document.getElementById("check-answers-button");
const reloadBtn = document.getElementById("reload-button");
const modal = document.querySelector(".modal");
const closeModal = document.getElementById("link-modal-close");

//variables for chosen team
let teamID = null;
let chosenTeam = "";

//variables for calculation
let randomNumber1 = null;
let randomNumber2 = null;
let operator = "";

let resultArray = [];
let userAnswerArray = [];

let numOfRightAnswers = 0;
let isProcessing = false;

//add eventlistener on teamDiv
teamDiv.addEventListener("click", (e) => {
  const { target } = e;
  let figure;

  if (target.tagName === "FIGURE") {
    figure === target;
  } else if (target.closest("figure")) {
    figure = target.closest("figure");
  }

  if (figure) {
    //Remove "chosen-team" class from all figures:
    document.querySelectorAll(".team-div figure").forEach((fig) => {
      fig.classList.remove("chosen-team");
    });

    figure.classList.add("chosen-team");
    chosenTeam = figure.getAttribute("data-team");
    console.log(chosenTeam);
    handleTeamClick(chosenTeam);
  }
});

function handleTeamClick(team) {
  switch (team) {
    case "barcelona":
      teamID = 133739;
      break;
    case "juventus":
      teamID = 133676;
      break;
    case "bayern-munchen":
      teamID = 133664;
      break;
    case "manchester-city":
      teamID = 133613;
      break;
    case "manchester-united":
      teamID = 133612;
      break;
    case "milan":
      teamID = 133667;
      break;
    case "psg":
      teamID = 133714;
      break;
    case "real-madrid":
      teamID = 133738;
      break;
  }
  console.log(teamID);
}

//add eventlistener on start button
startButton.addEventListener("click", handleStartGame);

function handleStartGame() {
  if (!chosenTeam) {
    alert("Du måste välja ett lag innan du kan starta spelet");
    return;
  }

  setupModal.classList.add("setup-modal-hidden");
}

for (let i = 0; i < 10; i++) {
  //function to generate random numbers
  randomNumbers();
  //function to generate random operator
  randomOperator();

  //create Div and fill with math problem
  const mathDiv = document.createElement("div");
  mathDiv.textContent = `${randomNumber1} ${operator} ${randomNumber2} = `;

  //use index for div id
  mathDiv.id = "div-" + i;
  mathDiv.classList.add("math-div");
  //   console.log(mathDiv.id);

  const userInput = document.createElement("input");
  userInput.type = "number";
  userInput.classList.add("input");
  mathDiv.appendChild(userInput);

  //use index for input id
  userInput.id = "input-" + i;
  //   console.log(userInput.id);

  const outcome = document.createElement("p");
  outcome.classList.add("outcome");
  outcome.id = "outcome-" + i;
  mathDiv.appendChild(outcome);

  blackBoard.appendChild(mathDiv);

  let result = calculateResult(randomNumber1, randomNumber2, operator);
  resultArray.push(result);
  //   console.log(resultArray);
}

//*Function for generating two random numbers
function randomNumbers() {
  randomNumber1 = Math.floor(Math.random() * 11);
  randomNumber2 = Math.floor(Math.random() * 11);
  //   console.log(randomNumber1, randomNumber2);
}

//* Function to generate random operator, + or -
function randomOperator() {
  if (randomNumber1 < randomNumber2) {
    //code used to prevent a negative number as a result of substraction
    operator = "+";
  } else {
    let randomOperatorNumber = Math.floor(Math.random() * 2);
    // console.log(randomOperatorNumber);

    switch (randomOperatorNumber) {
      case 0:
        operator = "+";
        break;
      case 1:
        operator = "-";
        break;
    }
  }
  //   console.log(operator);
}

//* Function to check answers
checkAnswerBtn.addEventListener("click", function () {
  //if statement to prevent user from clicking again before results has been shown
  if (isProcessing) {
    return;
  }

  isProcessing = true;

  for (let i = 0; i < 10; i++) {
    const userInput = document.getElementById("input-" + i);
    const mathDiv = document.getElementById("div-" + i);
    const outcome = document.getElementById("outcome-" + i);
    const userAnswer = userInput.value !== "" ? Number(userInput.value) : null;

    if (mathDiv && !isNaN(userAnswer)) {
      userAnswerArray.push(userAnswer);
      //   console.log("Här nedan är användarens svar:");
      //   console.log(userAnswerArray);

      if (userAnswerArray[i] === resultArray[i]) {
        outcome.textContent += "✅";
        numOfRightAnswers++;
      } else {
        outcome.textContent += "❌";
      }
    }
  }
  showResult(numOfRightAnswers);
});

//* Function to calculate result
function calculateResult(randomNumber1, randomNumber2, operator) {
  let result = null;

  switch (operator) {
    case "+":
      result = randomNumber1 + randomNumber2;
      break;
    case "-":
      result = randomNumber1 - randomNumber2;
      break;
  }

  //   console.log(randomNumber1 + operator + randomNumber2 + "= " + result);

  return result;
}

//* Function to show results
async function showResult(rights) {
  setTimeout(() => modal.classList.remove("modal-hidden"), 2000);

  const resultHeading = document.querySelector(".result-heading");
  const resultText = document.querySelector(".result-text");
  const resultImg = document.createElement("img");
  const imgText = document.createElement("p");

  resultImg.classList.add("result-image");

  let player = await getRandomPlayer(teamID); // Vänta på att getRandomPlayer ska slutföra

  if (rights === 10) {
    try {
      resultHeading.textContent =
        "🏆 ALLA RÄTT! Du är en mattemästare på fotbollsplanen!!! 🏆";
      resultText.textContent = "Grymt jobbat! Du vinner matte-guldbollen!";
      // Använd spelarobjektet här
      resultImg.setAttribute("src", `${player.strRender}`);
      imgText.innerHTML = `<span class="player-name">${player.strPlayer}</span> ~ ${player.strPosition} in ${player.strTeam} `;
      resultText.append(resultImg, imgText);
    } catch (error) {
      console.error("Error fetching random player: ", error);
    }
  } else if (rights < 10 && rights >= 8) {
    resultHeading.textContent = `SNYGGT! Du fick ${rights} rätt av 10. Du dribblar genom talen som en mästare! ⚽`;
    resultText.textContent = "Försök igen och se om du kan få alla rätt.";
    resultImg.setAttribute("src", `${player.strRender}`);
    imgText.innerHTML = `<span class="player-name">${player.strPlayer}</span> ~ ${player.strPosition} in ${player.strTeam} `;
    resultText.append(resultImg, imgText);
    // resultImg.setAttribute("src", `./images/fotball${randomNum}.jpg`);
    // resultText.append(resultImg);
  } else if (rights < 8 && rights >= 6) {
    resultHeading.textContent = `STABILT! Du fick ${rights} rätt av 10. Du är på väg att bli en sann mattehjälte! ⭐`;
    resultText.textContent =
      "Försök igen, nästa gång blir du ännu starkare! 💪🔢";
  } else if (rights < 6 && rights >= 3) {
    resultHeading.textContent = `Godkänt! Du fick ${rights} rätt av 10.`;
    resultText.textContent =
      "Ibland är det svårt, men ge aldrig upp. Fortsätt kämpa, du är fantastisk! 🌟👏";
  } else {
    resultHeading.textContent = `Du fick ${rights} rätt av 10. Träna mer! 💟`;
    resultText.textContent =
      "Ingen fara, stjärna! Ibland har även de bästa dagar när de träffar stolpen.🌈💪";
  }
}

//* Function to get random player from chosen team
async function getRandomPlayer(team) {
  try {
    let response = await fetch(
      `https://www.thesportsdb.com/api/v2/json/3/list/players/${team}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    const randomPlayerIndex = Math.floor(Math.random() * data.players.length);
    console.log(randomPlayerIndex);
    const randomPlayer = data.players[randomPlayerIndex];
    console.log(randomPlayer);
    return randomPlayer;
  } catch (error) {
    console.log("Error fetching player data: ", error);
  }
}

//* Function to hide modal
closeModal.addEventListener("click", () => {
  modal.classList.add("modal-hidden");
  isProcessing = false;
  location.reload();
});

//* Function to generate new numbers
reloadBtn.addEventListener("click", () => location.reload());
