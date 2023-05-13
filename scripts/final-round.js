window.addEventListener("load", function () {
    const params = new URLSearchParams(window.location.search);
    const player1Score = parseInt(params.get("player1Score"));
    const player2Score = parseInt(params.get("player2Score"));
    document.querySelector(".P1-Score span:last-child").innerText =
        player1Score;
    document.querySelector(".P2-Score span:last-child").innerText =
        player2Score;
    if (document.getElementById("round-final").innerText === "ROUND") {
        // Display a notification that it is player 1's turn to choose
        alert(
            "Congratulations on making it to the Final Round!\n\nBefore we go into our final category, each player must make a wager.\n\nPlayer 1, enter your wager and then click the BET button to submit it.\n\nYou can wager up to the points you currently have."
        ); 
    }
});

let currentPlayer = 1;
let player1Wager = 0;
let player2Wager = 0;

// Get the modal and its components
const modal = document.getElementById("myModal");
const question = document.getElementById("question");
const answer = document.getElementById("f-answer");
const guessBtn = document.getElementById("guess-btn");

// Get the wager input field and bet button
const wageInput = document.getElementById("wage");
const betButton = document.querySelector(".Bet-Button button");

betButton.addEventListener("click", function () {
    const wage = parseInt(wageInput.value);
    const currentPlayerScore =
        currentPlayer === 1
            ? parseInt(
                  document.querySelector(".P1-Score span:last-child").innerText
              )
            : parseInt(
                  document.querySelector(".P2-Score span:last-child").innerText
              );

    if (wage <= currentPlayerScore) {
        if (currentPlayer === 1) {
            // Update player 1's wager
            player1Wager = wage;
            // Clear the input field
            wageInput.value = "";
            // Switch to player 2's turn
            currentPlayer = 2;
            // Display a notification that it is player 2's turn to choose
            alert(
                "Player 1 has placed their wager. Now it's Player 2's turn.\n\nPlayer 2, enter your wager and then click the BET button to submit it.\n\nYou can wager up to the points you currently have."
            );
        } else {
            // Update player 2's wager
            player2Wager = wage;
            // Clear the input field
            wageInput.value = "";
            // Set currentPlayer to 1
            currentPlayer = 1;
            // Display a notification that it is player 1's turn to choose
            alert(
                "Player 2 has placed their wager.\n\nThe Final Category can now be clicked on and each player can give their best guess on what the answer is!\n\nPlayer 1, you're up first!"
            );

            // Hide the bet button and wage input after Playe 2 submits their wage
            betButton.style.display = "none";
            wageInput.style.display = "none";

            // Enable the final question and make it clickable
            const finalQuestion = document.querySelector(".Final-Question");
            finalQuestion.classList.add("enabled");
            finalQuestion.addEventListener("click", function () {
                // Set the question text and display the modal box
                question.innerText =
                    "What name was the bootcamp formerly known as?";
                modal.style.display = "block";

                // Add event listener to guess button
                guessBtn.onclick = function () {
                    const finalAnswer = answer.value.trim().toLowerCase();
                    if (finalAnswer === "burlington code academy") {
                        // Update the player's score
                        const p1Score = parseInt(
                            document.querySelector(".P1-Score span:last-child")
                                .innerText
                        );
                        const p2Score = parseInt(
                            document.querySelector(".P2-Score span:last-child")
                                .innerText
                        );
                        if (currentPlayer === 1) {
                            currentPlayer = 2;
                            answer.value = "";
                            alert(
                                "Player 1 has entered their answer.\n\nIt is now Player 2's turn.\n\nGood luck!"
                            );
                        } else {
                            answer.value = "";
                            alert(
                                "Player 2 has entered their answer. Let's find out who won!"
                            );

                            document.querySelector(".P1-Score span:last-child").innerText =
                            p1Score + player1Wager;
                            document.querySelector(".P2-Score span:last-child").innerText =
                            p2Score + player2Wager;

                            // Notify the users who won based on the final score
                            if (p1Score > p2Score) {
                                // Close the modal box
                                modal.style.display = "none";
                                alert(`The answer was: Burlington Code Academy!\n\nBased on the current scores, Player 1 has the higher score of ${p1Score + player1Wager}, so Player 1 wins!\n\n Thank you for playing!`);
                                window.location.href = "index.html"; // Redirect to index.html
                            } else if (p2Score > p1Score) {
                                // Close the modal box
                                modal.style.display = "none";
                                alert(`The answer was: Burlington Code Academy!\n\nBased on the current scores, Player 1 has the higher score of ${p2Score + player2Wager}, so Player 2 wins!\n\n Thank you for playing!`);
                                window.location.href = "index.html"; // Redirect to index.html
                            } else {
                                // Close the modal box
                                modal.style.display = "none";
                                alert(`The answer was: Burlington Code Academy!\n\nBased on the current scores, both players have the same score, so it's officially a tie!!\n\n Thank you for playing!`);
                                window.location.href = "index.html"; // Redirect to index.html
                            }

                        }
                        // Close the modal box
                        modal.style.display = "none";


                    } else if (finalAnswer !== "burlington code academy") {
                        // Update the player's score
                        const p1Score = parseInt(
                            document.querySelector(".P1-Score span:last-child")
                                .innerText
                        );
                        const p2Score = parseInt(
                            document.querySelector(".P2-Score span:last-child")
                                .innerText
                        );
                        if (currentPlayer === 1) {
                            currentPlayer = 2;
                            answer.value = "";
                            alert(
                                "Player 1 has entered their answer.\n\nIt is now Player 2's turn.\n\nGood luck!"
                            );
                        } else {
                            answer.value = "";
                            alert(
                                "Player 2 has entered their answer. Let's find out who won!"
                            );

                            document.querySelector(".P1-Score span:last-child").innerText =
                            p1Score - player1Wager;
                            document.querySelector(".P2-Score span:last-child").innerText =
                            p2Score - player2Wager;

                            // Notify the users who won based on the final score
                            if (p1Score > p2Score) {
                                // Close the modal box
                                modal.style.display = "none";
                                alert(`The answer was: Burlington Code Academy!\n\nBased on the current scores, Player 1 has the higher score of ${p1Score + player1Wager}, so Player 1 wins!\n\n Thank you for playing!`);
                                window.location.href = "index.html"; // Redirect to index.html
                            } else if (p2Score > p1Score) {
                                // Close the modal box
                                modal.style.display = "none";
                                alert(`The answer was: Burlington Code Academy!\n\nBased on the current scores, Player 1 has the higher score of ${p2Score + player2Wager}, so Player 2 wins!\n\n Thank you for playing!`);
                                window.location.href = "index.html"; // Redirect to index.html
                            } else {
                                // Close the modal box
                                modal.style.display = "none";
                                alert(`The answer was: Burlington Code Academy!\n\nBased on the current scores, both players have the same score, so it's officially a tie!!\n\n Thank you for playing!`);
                                window.location.href = "index.html"; // Redirect to index.html
                            }
                        }
                        // Close the modal box
                        modal.style.display = "none";
                    }
                };
            });
        }
    } else {
        alert("Try again.");
    }
});
