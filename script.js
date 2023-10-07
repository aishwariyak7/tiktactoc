document.addEventListener("DOMContentLoaded", function () {
    const board = document.getElementById("board");
    const cells = document.querySelectorAll("[data-cell]");
    const message = document.getElementById("message");
    const resetButton = document.getElementById("reset-button");

    let currentPlayer = "X";
    let gameBoard = ["", "", "", "", "", "", "", "", ""];
    let gameActive = true;

    // Winning combinations
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    // Event listeners for each cell
    cells.forEach((cell, index) => {
        cell.addEventListener("click", () => {
            if (gameBoard[index] === "" && gameActive) {
                cell.textContent = currentPlayer;
                gameBoard[index] = currentPlayer;
                checkWinner();
                togglePlayer();
            }
        });
    });

    // Function to toggle the current player
    function togglePlayer() {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
    }

    // Function to check if there's a winner
    function checkWinner() {
        for (let combo of winningCombos) {
            const [a, b, c] = combo;
            if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                gameActive = false;
                message.textContent = `${currentPlayer} wins!`;
                break;
            }
        }
        if (!gameBoard.includes("") && gameActive) {
            gameActive = false;
            message.textContent = "It's a draw!";
        }
    }

    // Event listener for the reset button
    resetButton.addEventListener("click", resetGame);

    // Function to reset the game
    function resetGame() {
        currentPlayer = "X";
        gameBoard = ["", "", "", "", "", "", "", "", ""];
        gameActive = true;
        message.textContent = "";
        cells.forEach((cell) => (cell.textContent = ""));
    }
});

