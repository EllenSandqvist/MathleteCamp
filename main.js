//variable for DOM nodes
const blackBoard = document.querySelector('.blackboard');
const checkAnswerBtn = document.getElementById('check-answers-button');
const reloadBtn = document.getElementById('reload-button');
const modal = document.querySelector('.modal');
const closeModal = document.getElementById('link-modal-close');

//variables for calculation
let randomNumber1 = null;
let randomNumber2 = null;
let operator = '';

let numOfRightAnswers = 0;

let resultArray = [];
let userAnswerArray = [];


for(let i = 0; i < 10; i++){
    randomNumbers();  
    const mathDiv = document.createElement('div');

    mathDiv.textContent = `${randomNumber1} ${operator} ${randomNumber2} = `;

    //use index for div id
    mathDiv.id = 'div-' + i;
    mathDiv.classList.add('math-div');
    console.log(mathDiv.id);

    const userInput = document.createElement('input');
    userInput.type = 'number';
    userInput.classList.add('input');
    mathDiv.appendChild(userInput);
    
    //use index for input id
    userInput.id = 'input-' + i;
    console.log(userInput.id);

    const outcome = document.createElement('p');
    outcome.classList.add('outcome');
    outcome.id = 'outcome-' + i;
    mathDiv.appendChild(outcome);

    blackBoard.appendChild(mathDiv);

    let result = calculateResult(randomNumber1, randomNumber2, operator);
    resultArray.push(result);
    console.log(resultArray);
}

//*Function for generating two random numbers
function randomNumbers(){
    randomNumber1 = Math.floor(Math.random()*11);
    randomNumber2 = Math.floor(Math.random()*11);
    console.log(randomNumber1, randomNumber2); 

    randomOperator(); 
}

//* Function to generate random operator, + or -
function randomOperator(){
    
    if(randomNumber1 < randomNumber2){ //code used to prevent a negative number as a result of substraction
        operator = '+';
    } else {
        let randomOperatorNumber = Math.floor(Math.random()*2);
        console.log(randomOperatorNumber);

        switch(randomOperatorNumber){
            case 0:
                operator = '+';
                break;
            case 1:
                operator = '-';
                break;
        }   
    } 
    console.log(operator);
}

//* Function to check answers
checkAnswerBtn.addEventListener('click', function(){
    for(let i = 0; i < 10; i++){
        const userInput = document.getElementById('input-' + i);
        const mathDiv = document.getElementById('div-' + i);
        const outcome = document.getElementById('outcome-' + i);
        const userAnswer = userInput.value !== ''? Number(userInput.value) : null;

        if(mathDiv && !isNaN(userAnswer)) {
            userAnswerArray.push(userAnswer);
            console.log("Här nedan är användarens svar:");
            console.log(userAnswerArray);

            if(userAnswerArray[i] === resultArray[i]) {
                outcome.textContent += "✅";
                numOfRightAnswers ++;
            } else {
                outcome.textContent += "❌";
            }
        }
    }
    showResult(numOfRightAnswers);
});


//* Function to calculate result
function calculateResult(randomNumber1, randomNumber2, operator){
    let result = null;

    switch(operator){
        case '+':
            result = randomNumber1 + randomNumber2;
            break;
        case '-':
            result = randomNumber1 - randomNumber2;
            break;
    }

    console.log(randomNumber1 + operator + randomNumber2 + "= " + result);

    return result;
};

//* Function to show results
function showResult(rights) {
    setTimeout(() => modal.classList.remove('modal-hidden'), 2000);
    
    const resultHeading = document.querySelector('.result-heading');
    const resultText = document.querySelector('.result-text');
    const resultImg = document.createElement('img');

    resultImg.classList.add('result-image');

    //random number to randomize image
    const randomNum = Math.floor(Math.random() * 10) + 1;
    console.log("slumpnummer= " + randomNum);
    

    if(rights === 10){
        resultHeading.textContent = "🏆 ALLA RÄTT! Ronaldo-klass!!! 🏆";
        resultText.textContent = "Grymt jobbat! Du vinner matte-guldbollen!";  
    } else if (rights < 10 && rights >= 8) {
        resultHeading.textContent = `SNYGGT! Du fick ${rights} rätt av 10. Messi-klass! ⚽`;
        resultText.textContent = "Försök igen och se om du kan få alla rätt.";
    } else if (rights < 8 && rights >= 6) {
        resultHeading.textContent = `STABILT! Du fick ${rights} rätt av 10. Mbappé-klass! ⭐`;
        resultText.textContent = "Försök igen och se om du är bra nog för Real Madrid.";
    } else if (rights < 6 && rights >= 3) {
        resultHeading.textContent = `Godkänt! Du fick ${rights} rätt av 10.`;
        resultText.textContent = "Du är bra nog för Allsvenskan ✅. Försök igen och se om du kan bli utlandsproffs.";
    } else {
        resultHeading.textContent = `Du fick ${rights} rätt av 10. Träna mer! 💟`;
        resultText.textContent = "Härifrån kan det bara bli bättre. Försök igen.";
    }
    resultImg.setAttribute('src', `./images/fotball${randomNum}.jpg`);
    resultText.append(resultImg);
}


//* Function to hide modal
closeModal.addEventListener('click', () => {
    modal.classList.add('modal-hidden');
    location.reload();
});

//* Function to generate new numbers
reloadBtn.addEventListener('click', () => location.reload());