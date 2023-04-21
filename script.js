const startGameBtn = document.getElementById("startGame-btn");
const startGameScreen = document.querySelector(".game-start");
const gameScreen = document.querySelector(".game");
const gameBoard = document.querySelector(".game-board");
const gameCells = document.getElementsByClassName("game-board__cell");
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

startGameBtn.addEventListener("click", startGame);

Array.from(gameCells).map((cell) =>
  cell.addEventListener("click", handleClick, { once: true })
);

function currentPlayer() {
  return circleMove ? "circle" : "cross";
}

function startGame() {
  startGameScreen.classList.add("hidden");
  gameScreen.classList.remove("hidden");
  gameBoard.classList.add(currentPlayer());
}

startGame();

function handleClick(e) {
  const clickedCell = e.target;
  const currentPlayer = currentPlayer();
  clickedCell.classList.add(currentPlayer);
  clickedCell.classList.remove("clickable");
  switchPlayer();
  currentPlayer === "circle"
    ? gameBoard.classList.replace("cross", "circle")
    : gameBoard.classList.replace("circle", "cross");

  if (checkWin(currentPlayer)) {
    alert("wygrales");
  }
}

function switchPlayer() {
  circleMove = !circleMove;
  gameBoard.classList.toggle("text--dark-purple");
}

function checkWin(currentPlayer) {}
