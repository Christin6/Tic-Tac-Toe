"use strict";
/* 
X|O|X 
O|X|O 
X|O|X

array board[9] = ["", "", "",
                "", "", "",
                "", "", ""    ]

check winner patterns= [
    [0,1,2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagonal
    ]

    // player = X or O
    function checkPlayerWin(player) {
        for (pattern in patterns) {
            let count = 0;
            for (i in pattern) {
                if board[i] === player {
                    count++
                }
            }
            if (count === 3) {
                console.log(player "win");
            }
        }
    }

*/

function createPlayer(role, playerName) {
	return { role, playerName };
}

const gameBoard = (function () {
	let board = ["", "", "", "", "", "", "", "", ""];

	const winnerPatterns = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8], // rows
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8], // columns
		[0, 4, 8],
		[2, 4, 6], // diagonal
	];

	function fillBoard(player, index) {
		if (board[index] === "") {
			board[index] = player;
		} else {
			console.log("Fill the empty box only!");
		}
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
				console.log(`${player}: ${playerName} wins`);
			}
		}
	}

	return { fillBoard, checkPlayerWin };
})();

(function controller() {
	const player1 = createPlayer("X", "Kaya");
	const player2 = createPlayer("O", "Raya");
	let turn = "player1";

	function playerMove(index) {
		if (turn === "player1") {
			gameBoard.fillBoard(player1.role, index);
			turn = "player2";
		} else if (turn === "player2") {
			gameBoard.fillBoard(player2.role, index);
			turn = "player1";
		}
	}

    /* while (true) {

    } */
    playerMove(0);
    playerMove(5);
    playerMove(1);
    playerMove(8);
    playerMove(2);
    playerMove(7);

	gameBoard.checkPlayerWin(player1.role, player1.playerName);
})();
