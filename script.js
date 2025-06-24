"use strict";

const info = document.querySelector("#info");
let boardTiles = document.querySelectorAll(".board-tile");
const winningDialog = document.querySelector("#winning-dialog");

function createPlayer(role, playerName) {
	return { role, playerName };
}

const gameBoard = (function () {
	let board = ["", "", "", "", "", "", "", "", ""];
    let moveCount = 0;

	const winnerPatterns = [
		[0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
		[0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
		[0, 4, 8], [2, 4, 6], // diagonal
	];

	function fillBoard(player, index) {
		if (board[index] === "") {
			board[index] = player;
            boardTiles[index].textContent = player;
            moveCount++;
            return true;
		} else {
			info.textContent = "Fill the empty box only!";

            setTimeout(() => {
                updateTurnDisplay();
            }, 2000);

            return false;
		}
	}

    function resetBoard() {
        board = ["", "", "", "", "", "", "", "", ""];
        moveCount = 0;
        for (let i=0; i<9; i++) {
            boardTiles[i].textContent = "";
        }
        info.textContent = "";
    }

    function createWinnerDialog(player, playerName) {
        winningDialog.innerHTML = "";
        const resetButton = document.createElement("button");
        const newGame = document.createElement("button");
        const textParagraph = document.createElement("p");

        textParagraph.textContent = `🎉 ${player}: ${playerName} wins`;

        newGame.textContent = "New Game";
        newGame.addEventListener("click", () => {
            location.reload();
        });

        resetButton.textContent = "Play Again";
        resetButton.addEventListener("click", () => {
            resetBoard();
            winningDialog.close();
        });

        winningDialog.append(textParagraph, resetButton, newGame);
        winningDialog.showModal();
    }

    function checkTie() {
        if (moveCount === 9) {
            resetBoard();
            createTieDialog();
        }
    }

    function createTieDialog() {
        winningDialog.innerHTML = "";
        const textParagraph = document.createElement("p");
        const resetButton = document.createElement("button");
        const newGame = document.createElement("button");

        textParagraph.textContent = "🤝 It's a tie! Good game!";

        resetButton.textContent = "Play Again";
        resetButton.addEventListener("click", () => {
            resetBoard();
            winningDialog.close();
        });

        newGame.textContent = "New Game";
        newGame.addEventListener("click", () => {
            location.reload();
        });

        winningDialog.append(textParagraph, resetButton, newGame);
        winningDialog.showModal();
    }

	function checkPlayerWin(player, playerName) {
		for (let pattern of winnerPatterns) {
			let count = 0;
			for (let i of pattern) {
				if (board[i] === player) {
					count++;
				}
			}
			if (count === 3) {
                createWinnerDialog(player, playerName);
			}
		}
	}

	return { fillBoard, checkPlayerWin, checkTie };
})();

(function controller() {
    const playerInfoDialog = document.getElementById("player-info-dialog");
    const player1Input = document.getElementById("player-name1");
    const player2Input = document.getElementById("player-name2");
    const startButton = document.getElementById("start-game");

    let gameInitialized = false;
    let turn, player1, player2;

    playerInfoDialog.showModal();
    
    startButton.addEventListener("click", () => {
        let playerName1 = "player1";
        let playerName2 = "player2";

        if (player1Input.value !== "") {
            playerName1 = player1Input.value;
        }
        if (player2Input.value !== "") {
            playerName2 = player2Input.value;
        }

        player1 = createPlayer("X", playerName1);
        player2 = createPlayer("O", playerName2);
        turn = "player1";
        updateTurnDisplay();
        playerInfoDialog.close();
        initializeGame();
    });

    function updateTurnDisplay() {
        if (turn === "player1") {
            info.textContent = `${player1.role}: ${player1.playerName}'s turn`;
        } else {
            info.textContent = `${player2.role}: ${player2.playerName}'s turn`;
        }
    }

    function initializeGame() {
        if (!gameInitialized) {
            for (let i=0; i<9; i++) {
                boardTiles[i].addEventListener("click", () => {
                    playerMove(i);
                    checkWhoWin();
                    gameBoard.checkTie();
                })
            }
            gameInitialized = true;
        }

        function playerMove(index) {
            if (turn === "player1") {
                if (gameBoard.fillBoard(player1.role, index)) { // no need to call fillBoard again, it's already called when used in if else condition
                    turn = "player2";
                    updateTurnDisplay();
                }
            } else if (turn === "player2") {
                if (gameBoard.fillBoard(player2.role, index)) {
                    turn = "player1";
                    updateTurnDisplay();
                }
            }
        }

        function checkWhoWin() {
            gameBoard.checkPlayerWin(player1.role, player1.playerName);
            gameBoard.checkPlayerWin(player2.role, player2.playerName);
        }
    }

    window.updateTurnDisplay = updateTurnDisplay;
})();
