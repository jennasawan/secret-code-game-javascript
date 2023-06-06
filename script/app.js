let guesses = [];
let secretCode = [];
let secretString = '';


function getRandomNumber() {
    return Math.floor(Math.random() * Math.floor(9)) + 1;
  }

function hideGameScreen(){
    
    const gameScreen = document.getElementById("game-screen");
    gameScreen.classList.add('hidden');
    
}

function showGameScreen(){
    
    const gameScreen = document.getElementById("game-screen");
    const startMenu = document.getElementById("start-menu");
    gameScreen.classList.remove('hidden');
    startMenu.classList.add('hidden');

}

function showInstructions(){
    const startMenu = document.getElementById("start-menu");
    startMenu.classList.add('hidden');
    const instructionsScreen = document.getElementById("instruction-screen");
    instructionsScreen.classList.remove('hidden')
    
}

function hideInstructionScreen(){
    const instructionsScreen = document.getElementById("instruction-screen");
    instructionsScreen.classList.add('hidden')
    const startMenu = document.getElementById('start-menu');
    startMenu.classList.remove('hidden')

}

function generateSecretCode(){

    for(let i = 0; i < 5; i++){
        let digit = getRandomNumber();
        if(secretCode.indexOf(digit) === -1){
            secretCode.push(digit);
        }else{
          i--;
        }
    }

    secretString = secretCode.join('');

    console.log(secretString)

    return secretString;

}

function checkGuess(guess){

    console.log(secretString)

    const perfect = '*';
    const close = '!';
    const wrong = '0';
    let perfCount = 0;
    let closeCount = 0;
    let wrongCount = 0;
    let eval = '';
    let result = '';
    let nonrepeat = [];
        

    console.log(guess)

    for(let i = 0; i < 5; i++){
        if((secretString.indexOf(guess.charAt(i)) != -1) && (!nonrepeat.includes(guess.charAt(i)))) {
         if(secretString.indexOf(guess.charAt(i)) === guess.indexOf(guess.charAt(i))){
             perfCount++;
             nonrepeat.push(guess.charAt(i))
         }else{
             closeCount++;
             nonrepeat.push(guess.charAt(i))
         }   
        }else{
            wrongCount++;
        }
    }

    if(perfCount === 5){
        gameOver();
    }else{
        eval = perfect.repeat(perfCount) + close.repeat(closeCount) + wrong.repeat(wrongCount);
        result = guess + " : " + eval;

        submitGuess(result);

        console.log(result)
    }

}



function submitGuess(userGuess){

    const guessList = document.getElementById('past-guesses')
    
    guesses.push(userGuess);
    let li = document.createElement("li");
    li.innerText = userGuess;
    guessList.appendChild(li);

}



function resetInput(){

    const userGuess = document.getElementById('user-input');
    userGuess.value = '';

}

function gameOver(){

    hideGameScreen();
    const endScreen = document.getElementById('game-over');
    endScreen.classList.remove('hidden');
    const answerReveal = document.getElementById('answer-reveal')
    answerReveal.innerText = secretString;



}

function hideEndScreen(){
    
    const endScreen = document.getElementById('game-over');
    endScreen.classList.add('hidden');
}




document.addEventListener('DOMContentLoaded', () => {

    hideGameScreen();
    hideEndScreen();
    hideInstructionScreen();

    const instructionsBtn = document.getElementById('instructions');

    instructionsBtn.addEventListener('click', (event) => {
        showInstructions();
    })

    const backToMenu = document.getElementById("back-to-main");

    backToMenu.addEventListener('click', (event) => {
        hideInstructionScreen();
        
    })

    const startBtn = document.getElementById("start");

    startBtn.addEventListener('click', (event) => { 
        
        showGameScreen();
        generateSecretCode();

    })

    const userGuess = document.getElementById('user-input');

    userGuess.addEventListener('keyup', (event) => {

        if(event.key === 'Enter'){
            if(event.target.value.length === 5){
                checkGuess(event.target.value);
            }else{
            alert("Answer must be five digits long.")
        }
        resetInput();
    }
        
    })

    const playAgain = document.getElementById("play-again");

    playAgain.addEventListener('click', (event) => {

        secretCode = [];
        secretString = [];

        let guessList = document.getElementById('past-guesses');

        while(guessList.firstChild){
            guessList.removeChild(guessList.firstChild)
        }

        hideEndScreen();
        showGameScreen();
        generateSecretCode();
        
        

    })




    
    




})