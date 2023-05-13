// Do not change the import statement
import placeholderQuestions from "./placeholder-questions.js";
console.log({ placeholderQuestions });

// Wait for the Round 2 page to load
window.addEventListener("load", function () {
    const params = new URLSearchParams(window.location.search);
    const player1Score = parseInt(params.get("player1Score"));
    const player2Score = parseInt(params.get("player2Score"));
    document.querySelector(".P1-Score span:last-child").innerText =
        player1Score;
    document.querySelector(".P2-Score span:last-child").innerText =
        player2Score;
    if (document.getElementById("round-num").innerText === "2") {
        // Display a notification that it is player 1's turn to choose
        alert("Player 1, it's your turn to choose!");
    }
});

const round = document.getElementById("round-num").innerText; //Round is a piece of text that has a number in it, refereced in the html by all of class r
let currentPlayer = 1; //starting player for the round is Player 1
let secondGuess = false; 
//implemented in code where if first player guesses incorrectly, then it returns true for the other player; and if other player guesses wrong, it returns false

// Get the modal and its components
const modal = document.getElementById("myModal");
const question = document.getElementById("question");
const answer = document.getElementById("answer");
const guessBtn = document.getElementById("guess-btn");
const passBtn = document.getElementById("pass-btn");

// Function to handle the Pass button click event
passBtn.addEventListener("click", () => {
    // Switch the turn to the other player
    currentPlayer = currentPlayer === 1 ? 2 : 1;

    // Update the notification area with the current player's turn
    alert(`Player ${currentPlayer}, it's your turn to choose!`);

    // Hide the modal
    modal.style.display = "none";
});

for (let i = 1; i < 6; i++) {
    // i is row number
    const rowClass = `.r${i}`; // for each run through loop: .r1, .r2, etc.

    for (const div of document.querySelectorAll(rowClass)) {
        // div
        const divClasses = div.className.split(" ");

        // for each run through inner loop: c1, c2, etc.
        const colClass = divClasses.find((c) => c.startsWith("c"));
        // example: colClass is 'c2'

        // j is column number
        const j = colClass[1];

        //same explanation in index.js, but this time all of the offsets have gottn rid of questions 1-5.
        //In this div.addEventListener, we're pulling question and answers 6-10 for each category

        div.addEventListener("click", () => { 
            answer.value = "";

            const colOffset = (j - 1) * 10;
            const roundOffset = (parseInt(round) - 1) * 5;
            const rowOffset = i - 1;
            const offset = colOffset + roundOffset + rowOffset;
            console.log(`${colOffset} + ${roundOffset} + ${rowOffset}`);
            console.log(placeholderQuestions[offset]);

            // Set the question and answer in the modal
            question.textContent = placeholderQuestions[offset].question;
            answer.textContent = placeholderQuestions[offset].answer;

            // Show the modal
            modal.style.display = "block";

            // Function to handle the Guess button click event
            guessBtn.onclick = function () {
                // Get the user's answer from the input field
                var userAnswer = answer.value;

                // Get the point value of the clicked grid item
                const pointValue = div.innerText;

                // Check if the user's answer is correct
                if (
                    userAnswer.toLowerCase() ===
                    placeholderQuestions[offset].answer.toLowerCase()
                ) {
                    // Award the player the point value
                    alert(`Correct! You earned ${pointValue} points.`);

                    // Update the player's score with the point value
                    const scoreClass =
                        currentPlayer === 1
                            ? ".P1-Score span:last-child"
                            : ".P2-Score span:last-child";
                    const scoreElement = document.querySelector(scoreClass);
                    const currentScore = parseInt(scoreElement.innerText);
                    scoreElement.innerText =
                        currentScore + parseInt(pointValue); //adding point value to player's score

                    // Blank out the point value in the grid item
                    div.innerText = "";

                    // Hide the modal
                    modal.style.display = "none";

                    // Reset the input value
                    answer.value = "";

                    // Check if the game should move to the Final Round
                    if (
                        parseInt(document.querySelector(".P1-Score span:last-child").innerText) >= 30000 ||
                        parseInt(document.querySelector(".P2-Score span:last-child").innerText) >= 30000 ||
                        checkForCompletion()
                    ) { //^^End of Round 2 story
                        const params = new URLSearchParams(window.location.search);
                        const player1Score = parseInt(
                            document.querySelector(".P1-Score span:last-child").innerText
                        );
                        const player2Score = parseInt(
                            document.querySelector(".P2-Score span:last-child").innerText
                        );
                        params.set("player1Score", player1Score);
                        params.set("player2Score", player2Score);
                        alert(
                            "Congratulations players! Either the board has been cleared or one of you has accumulated 30000 points or more! Let's move on to the Final Round!"
                        );
                        modal.style.display = "none";
                        const fButton = document.getElementById("f-button");
                        fButton.disabled = false; //enables the final round button to be clicked on
                        fButton.addEventListener("click", function () {
                            window.location.href = "final-jeopardy.html?" + params.toString();
                        });
                    }

                } else if (secondGuess === false) {
                    // Subtract the point value from the player's score
                    const scoreClass =
                        currentPlayer === 1
                            ? ".P1-Score span:last-child"
                            : ".P2-Score span:last-child";
                    const scoreElement = document.querySelector(scoreClass);
                    const currentScore = parseInt(scoreElement.innerText);
                    scoreElement.innerText =
                        currentScore - parseInt(pointValue); //subtracts the point value from player's score

                    // Reset the player's turn
                    currentPlayer = currentPlayer === 1 ? 2 : 1;

                    // Alert that it is the other player's turn
                    alert(
                        `Incorrect! It's now Player ${currentPlayer}'s turn.`
                    );

                    // If no one guesses correctly, the original player gets to choose a question
                    secondGuess = true;

                    // Reset the input value
                    answer.value = "";
                } else {
                    // Reset the player's turn
                    currentPlayer = currentPlayer === 1 ? 2 : 1;

                    // Alert that it is the other player's turn
                    alert(
                        `Incorrect! It's now Player ${currentPlayer}'s turn.`
                    );

                    // Blank out the point value in the grid item
                    div.innerText = "";

                    // Hide the modal
                    modal.style.display = "none";

                    // Reset the input value
                    answer.value = "";

                    secondGuess = false;
                }
            };

            if (div.innerText === "") { //if a div is blank and they click on it, this message appears
                alert("This question has already been answered. Please choose another question.");
                // Show the modal
                modal.style.display = "none";
                return;
            };
        });
    }
}
function checkForCompletion() { //this code checks if all grid items under the q class have been cleared or not
    const qs = document.getElementsByClassName("q");
    for (const q of qs) {
        if (q.innerText !== "") {
            return false;
        }
    }
    return true;
}
