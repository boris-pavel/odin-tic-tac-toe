const gameBoard = (function () {
  let board = ["", "", "", "", "", "", "", "", ""];
  const Player = (sign, name) => {
    const score = 0;
    const username = name;
    return { sign, score, username };
  };

  const player = Player("x", "Player");
  const computer = Player("o", "Computer");

  // cache DOM
  const game = document.querySelector(".game-board");
  const cells = game.querySelectorAll(".cell");
  const playBtn = game.querySelector(".play");
  const winnerDiv = game.querySelector(".winner");
  const playAgainBtn = game.querySelector(".play-again");
  const playerOneScore = document.querySelector(".player-one-score");
  const playerTwoScore = document.querySelector(".player-two-score");
  const playerOneName = document.querySelector(".player-one-name");
  const playerTwoName = document.querySelector(".player-two-name");
  const inputDiv = document.querySelector(".player-name");
  const input = document.querySelector(".player-name > input");

  function checkBoardFull() {
    // eslint-disable-next-line no-restricted-syntax
    for (const sign of board) {
      if (sign === "") return false;
    }
    return true;
  }

  function updateScore() {
    playerOneScore.textContent = player.score;
    playerTwoScore.textContent = computer.score;
    playerOneName.textContent = player.username;
    playerTwoName.textContent = computer.username;
  }

  function render() {
    let counter = 0;
    cells.forEach((cell) => {
      cell.textContent = board[counter];
      if (cell.textContent !== "") cell.style["pointer-events"] = "none";
      counter += 1;
    });
  }

  function randomNumber() {
    return Math.floor(Math.random() * 9);
  }

  function startGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    console.log(input.value);
    player.username = input.value;
    cells.forEach((cell) => {
      cell.classList.toggle("hide");
      cell.style["pointer-events"] = "auto";
    });
    playBtn.style.display = "none";
    playAgainBtn.style.display = "none";
    winnerDiv.style.display = "none";
    inputDiv.style.display = "none";
    render();
  }

  function displayWinner(winner) {
    cells.forEach((cell) => cell.classList.add("hide"));
    winnerDiv.textContent = `${winner === 'x'?player.username:computer.username} has won!`;
    if (winner === "draw") winnerDiv.textContent = "It's a draw";
    winnerDiv.style.display = "flex";
    playAgainBtn.style.display = "flex";
    if (winner === player.sign) {
      player.score += 1;
      updateScore();
    } else if (winner === computer.sign) {
      computer.score += 1;
      updateScore();
    }
  }

  function checkWin() {
    const combs = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    let winner;
    combs.forEach((comb) => {
      if (
        board[comb[0]] === board[comb[1]] &&
        board[comb[1]] === board[comb[2]] &&
        board[comb[0]] !== ""
      )
        winner = board[comb[0]];
    });
    if (checkBoardFull()) {
      winner = "draw";
      return true;
    }

    if (winner) {
      displayWinner(winner);
      return true;
    }
    return false;
  }

  function makeComputerMove() {
    if (checkBoardFull()) {
      displayWinner("draw");
      return true;
    }
    let random = randomNumber();
    while (board[random] !== "") {
      random = randomNumber();
    }
    board[random] = computer.sign;
    render();
    return false;
  }

  function placeSign(cell) {
    if (cell.textContent === "") {
      board[cell.classList.value.replace(/^\D+/g, "")] = player.sign;
      render();
    }
    makeComputerMove();
    checkWin();
  }

  // bind events
  playBtn.addEventListener("click", startGame);
  cells.forEach((cell) =>
    cell.addEventListener("click", () => {
      placeSign(cell);
    })
  );
  playAgainBtn.addEventListener("click", startGame);
  return {input};
})();
