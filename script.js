let userScore = 0;
let computerScore = 0;
let currentRound = 1;
const maxRounds = 5;

let userHistory = {
    rock: 0,
    paper: 0,
    scissor: 0
};

function getComputerChoice(userChoice) {
    const choices = ["rock", "paper", "scissor"];
    const lastMove = userHistory.lastMove;
    const isRepeat = lastMove === userChoice;

    userHistory.lastMove = userChoice;

    if (isRepeat || userHistory[userChoice] >= 2) {
        return choices[Math.floor(Math.random() * 3)];
    }

    return choices[Math.floor(Math.random() * 3)];
}

function play(userChoice) {

    // Don't allow playing after Game 5
    if (!document.getElementById("next-round-btn").disabled) {
        return;
    }

    userHistory[userChoice]++;

    const computerChoice = getComputerChoice(userChoice);

    const resultDiv = document.getElementById("result");
    const userEl = document.getElementById("user_choice");
    const compEl = document.getElementById("computer_choice");

    userEl.textContent = emoji(userChoice);
    compEl.textContent = emoji(computerChoice);

    userEl.classList.remove("choice-animate");
    compEl.classList.remove("choice-animate");

    void userEl.offsetWidth;

    userEl.classList.add("choice-animate");
    compEl.classList.add("choice-animate");

    resultDiv.classList.remove("bounce","shake");

    if (userChoice === computerChoice){

        resultDiv.textContent = "🤝 It's a Tie!";
        resultDiv.classList.add("bounce");

    }else if(
        (userChoice==="rock" && computerChoice==="scissor") ||
        (userChoice==="paper" && computerChoice==="rock") ||
        (userChoice==="scissor" && computerChoice==="paper")
    ){

        resultDiv.textContent = "✅ You Win!";
        userScore++;
        resultDiv.classList.add("bounce");

    }else{

        resultDiv.textContent = "❌ You Lose!";
        computerScore++;
        resultDiv.classList.add("shake");
    }

    document.getElementById("user-score").textContent = userScore;
    document.getElementById("computer-score").textContent = computerScore;

    // Finished 5 games?
    if(currentRound === maxRounds){

        document.querySelectorAll(".choice-btn").forEach(btn=>{
            btn.disabled = true;
        });

        document.getElementById("next-round-btn").disabled = false;

        if(userScore > computerScore){
            resultDiv.textContent = "🏆 You won the Best of 5!";
        }
        else if(computerScore > userScore){
            resultDiv.textContent = "🤖 Computer won the Best of 5!";
        }
        else{
            resultDiv.textContent = "🤝 Best of 5 ends in a Draw!";
        }

        return;
    }

    currentRound++;

    document.getElementById("game-number").textContent =
        `${currentRound}/${maxRounds}`;
}

function nextRound(){

    currentRound = 1;

    userScore = 0;
    computerScore = 0;

    userHistory = {
        rock:0,
        paper:0,
        scissor:0
    };

    document.getElementById("user-score").textContent = 0;
    document.getElementById("computer-score").textContent = 0;

    document.getElementById("game-number").textContent = "1/5";

    document.getElementById("computer_choice").textContent = "❔";
    document.getElementById("user_choice").textContent = "❔";

    document.getElementById("result").textContent = "Make your move!";

    document.querySelectorAll(".choice-btn").forEach(btn=>{
        btn.disabled = false;
    });

    document.getElementById("next-round-btn").disabled = true;
}

function resetGame(){

    userScore = 0;
    computerScore = 0;

    currentRound = 1;

    userHistory = {
        rock:0,
        paper:0,
        scissor:0
    };

    document.getElementById("user-score").textContent = 0;
    document.getElementById("computer-score").textContent = 0;

    document.getElementById("game-number").textContent = "1/5";

    document.getElementById("computer_choice").textContent = "❔";
    document.getElementById("user_choice").textContent = "❔";

    document.getElementById("result").textContent = "Game Reset!";

    document.querySelectorAll(".choice-btn").forEach(btn=>{
        btn.disabled = false;
    });

    document.getElementById("next-round-btn").disabled = true;
}

function emoji(choice) {
    switch (choice) {
        case "rock": return "👊";
        case "paper": return "✋";
        case "scissor": return "✌️";
        default: return "❔";
    }
}
