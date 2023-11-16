const X_CLASS = 'x';
const O_CLASS = 'o';
const winningCombination = [
  // row
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  // col
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  // diag
  [0, 4, 8],
  [2, 4, 6]
]
const rondText = document.getElementById('rond-text')
const cellElements = document.querySelectorAll('[data-cell]')
const winningMessageElement = document.getElementById('winning-message')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
const resetButton = document.getElementById('restart-button')
let ronds = 0;
let whoTurn;
let markArray = [];

startGame();

resetButton.addEventListener('click', startGame)

function startGame() {
  whoTurn = false
  cellElements.forEach(cell => {
    cell.classList.remove(X_CLASS)
    cell.classList.remove(O_CLASS)
    cell.removeEventListener('click', onClick)
    cell.addEventListener('click', onClick)
  })
  winningMessageElement.classList.remove('show')
}

function onClick(e) {
  const cell = e.target
  const currentClass = whoTurn ? O_CLASS : X_CLASS;
  if (checkCellEmpty(cell)) {
    if (currentClass === X_CLASS) {
      ronds++
      rondText.innerHTML = `Rond: ${ronds}`
    }
    placeMarke(cell, currentClass)
  }
}

function checkCellEmpty(cell) {
  if (cell.classList.contains("x") || cell.classList.contains("o")) {
    return false
  }
  return true
}

function endGame() {
  winningMessageTextElement.innerText = `${whoTurn ? "O" : "X"} Wins!`
  ronds = 0
  markArray = [];
  winningMessageElement.classList.add('show')
}

function placeMarke(cell, currentClass) {
  markArray.push(cell)
  cell.classList.add(currentClass);
  if (checkWin(currentClass)) {
    endGame()
  } else {
    swapTurns()
    if (markArray.length > 6) {
      const oldestMask = markArray.shift();
      oldestMask.classList.remove(currentClass);
    }
  }
}

function swapTurns() {
  whoTurn = !whoTurn
}

function checkWin(currentClass) {
  return winningCombination.some(cobination => {
    return cobination.every(index => {
      return cellElements[index].classList.contains(currentClass)
    })
  })
}