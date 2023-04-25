const startGameBtn = document.querySelector(".startGame-btn");
const resetGameBtn = document.querySelectorAll(".resetGame-btn");
const previousGamesBtn = document.getElementById("previousGames-btn");
const startGameScreen = document.querySelector(".game-start");
const gameScreen = document.querySelector(".game");
const gameBoard = document.querySelector(".game-board");
const gameCells = Array.from(
  gameBoard.getElementsByClassName("game-board__cell")
);
const endGameScreen = document.querySelector(".game-end");
const previousGamesScreen = document.querySelector(".previous-games");
const previousGamesContainer = previousGamesScreen.querySelector(
  ".previous-games__container"
);
const gamesScore = document.querySelector(".previous-games__score");
let circleMove;

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

const pastGamesCombinations = [];
const score = {
  circle: 0,
  cross: 0,
  draws: 0,
};

startGameBtn.addEventListener("click", startGame);
previousGamesBtn.addEventListener("click", showPreviousGames);
resetGameBtn.forEach((button) => button.addEventListener("click", resetGame));

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
  const selectedPlayer = document.querySelector(
    'input[name="player"]:checked'
  ).value;

  circleMove = selectedPlayer === players.circle.sign ? true : false;

  gameScreen.classList.remove("blurred", "hidden");
  startGameScreen.classList.add("hidden");

  //resetting game cells from all color and player classes
  gameCells.forEach((cell) => {
    cell.className = "game-board__cell clickable";
    cell.addEventListener("click", handleClick, { once: true });
  });

  //resetting and adding starting color and player classes
  gameBoard.className = "game-board";
  gameBoard.classList.add(currentColor());
  gameBoard.classList.add(currentPlayer());
}

function resetGame() {
  startGameScreen.classList.remove("hidden");
  gameScreen.classList.add("hidden");
  previousGamesScreen.classList.add("hidden");
  endGameScreen.classList.add("hidden");
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

  //replacing classes for players hovers
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
      score.draws++;
      break;
    case players.circle.sign:
      winMessage = "O's win!";
      score.circle++;
      break;
    case players.cross.sign:
      winMessage = "X's win!";
      score.cross++;
      break;
  }

  saveGameCombination();
  endGameScreen.querySelector(".game-end__text").innerHTML = winMessage;
  endGameScreen.classList.remove("hidden");
  gameScreen.classList.add("blurred");
}

function saveGameCombination() {
  const lastCombination = [];

  gameCells.forEach((cell) => {
    if (cell.classList.contains(players.circle.sign)) {
      lastCombination.push(players.circle.sign);
    } else if (cell.classList.contains(players.cross.sign)) {
      lastCombination.push(players.cross.sign);
    } else {
      lastCombination.push("emptyCell");
    }
  });

  pastGamesCombinations.unshift(lastCombination);
}

function showPreviousGames() {
  endGameScreen.classList.add("hidden");
  gameScreen.classList.add("hidden");
  previousGamesScreen.classList.remove("hidden");

  generatePreviousBoards(pastGamesCombinations.length);
}

function generatePreviousBoards(games) {
  //clearing previous games container before inserting history
  previousGamesContainer.innerHTML = "";

  //displaying score
  gamesScore.querySelector(".score-x .score").innerHTML = score.cross;
  gamesScore.querySelector(".score-o .score").innerHTML = score.circle;
  gamesScore.querySelector(".score-draw .score").innerHTML = score.draws;

  for (let i = 0; i < games; i++) {
    //creating container for single old game
    const oldGameContainer = document.createElement("div");
    oldGameContainer.classList.add("old-game");

    //creating board for old game
    const oldGameBoard = document.createElement("div");
    oldGameBoard.classList.add("game-board");

    for (let j = 0; j < 9; j++) {
      const oldGameCell = document.createElement("div");
      oldGameCell.classList.add("game-board__cell");
      const sign = pastGamesCombinations[i][j];
      oldGameCell.classList.add(sign);
      if (sign === "circle") oldGameCell.classList.add(players.circle.color);
      else if (sign === "cross") oldGameCell.classList.add(players.cross.color);
      oldGameBoard.appendChild(oldGameCell);
    }
    //apending divs to each other
    oldGameContainer.appendChild(oldGameBoard);
    previousGamesContainer.appendChild(oldGameContainer);
  }
}
