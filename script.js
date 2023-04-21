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
  return circleMove ? "circle" : "cross";
}

function startGame() {
  endGameScreen.classList.add("hidden");
  gameCells.forEach((cell) => {
    cell.classList.add("clickable");
    cell.classList.remove("cross");
    cell.classList.remove("circle");
    cell.addEventListener("click", handleClick, { once: true });
  });
  startGameScreen.classList.toggle("hidden");
  gameScreen.classList.toggle("hidden");
  gameBoard.classList.add(currentPlayer());
}

function handleClick(e) {
  const clickedCell = e.target;
  clickedCell.classList.add(currentPlayer());
  clickedCell.classList.remove("clickable");
  if (checkWin(currentPlayer())) {
    endGame(currentPlayer());
  } else if (checkDraw()) endGame("draw");
  switchPlayer();
  currentPlayer() === "circle"
    ? gameBoard.classList.replace("cross", "circle")
    : gameBoard.classList.replace("circle", "cross");
}

function switchPlayer() {
  circleMove = !circleMove;
  gameBoard.classList.toggle("text--dark-purple");
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
      cell.classList.contains("circle") || cell.classList.contains("cross")
    );
  });
}

function endGame(result) {
  let winMessage;

  switch (result) {
    case "draw":
      winMessage = "It's a draw!";
      break;
    case "circle":
      winMessage = "O's win!";
      break;
    case "cross":
      winMessage = "X's win!";
      break;
  }

  endGameScreen.querySelector(".game-end__text").innerHTML = winMessage;
  endGameScreen.classList.remove("hidden");
}
