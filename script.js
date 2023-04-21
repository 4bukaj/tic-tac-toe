const startGameBtn = Array.from(
  document.getElementsByClassName("startGame-btn")
);
const startGameScreen = document.querySelector(".game-start");
const gameScreen = document.querySelector(".game");
const gameBoard = document.querySelector(".game-board");
const gameCells = Array.from(
  document.getElementsByClassName("game-board__cell")
);
const endGameScreen = document.querySelector(".game-end");
let circleMove = true;

const players = {
  circle: {
    sign: "circle",
    color: "text--yellow",
  },
  cross: {
    sign: "cross",
    color: "text--dark-purple",
  },
};

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

startGameBtn.forEach((button) => button.addEventListener("click", startGame));

function currentPlayer() {
  return circleMove ? players.circle.sign : players.cross.sign;
}

function currentColor() {
  return circleMove ? players.circle.color : players.cross.color;
}

function previousColor() {
  return circleMove ? players.cross.color : players.circle.color;
}

function startGame() {
  endGameScreen.classList.add("hidden");
  //resetting board
  gameCells.forEach((cell) => {
    cell.className = "game-board__cell clickable";
    cell.addEventListener("click", handleClick, { once: true });
  });
  gameBoard.classList.add(currentColor());
  startGameScreen.classList.toggle("hidden");
  gameScreen.classList.toggle("hidden");
  gameBoard.classList.add(currentPlayer());
}

function handleClick(e) {
  const clickedCell = e.target;
  clickedCell.classList.add(currentPlayer());
  clickedCell.classList.remove("clickable");
  clickedCell.classList.add(currentColor());
  gameBoard.className = "game-board " + currentPlayer() + " " + previousColor();

  //checking for winning combination
  if (checkWin(currentPlayer())) {
    endGame(currentPlayer());
  } else if (checkDraw()) endGame("draw");
  switchPlayer();

  //replacing class for players hovers
  currentPlayer() === players.circle.sign
    ? gameBoard.classList.replace(players.cross.sign, players.circle.sign)
    : gameBoard.classList.replace(players.circle.sign, players.cross.sign);
}

function switchPlayer() {
  circleMove = !circleMove;
}

function checkWin(currentPlayer) {
  return winningCombinations.some((combination) => {
    return combination.every((index) => {
      return gameCells[index].classList.contains(currentPlayer);
    });
  });
}

function checkDraw() {
  return gameCells.every((cell) => {
    return (
      cell.classList.contains(players.circle.sign) ||
      cell.classList.contains(players.cross.sign)
    );
  });
}

function endGame(result) {
  let winMessage;

  switch (result) {
    case "draw":
      winMessage = "It's a draw!";
      break;
    case players.circle.sign:
      winMessage = "O's win!";
      break;
    case players.cross.sign:
      winMessage = "X's win!";
      break;
  }

  endGameScreen.querySelector(".game-end__text").innerHTML = winMessage;
  endGameScreen.classList.remove("hidden");
}
