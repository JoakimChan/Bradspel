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
const cellElements = document.querySelectorAll('[data-cell]')
const winningMessageElement = document.getElementById('winning-message')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
const resetButton = document.getElementById('restart-button')
let whoTurn;

startGame();

resetButton.addEventListener('click', startGame)

function startGame() {
  whoTurn = false
  cellElements.forEach(cell => {
    cell.classList.remove(X_CLASS)
    cell.classList.remove(O_CLASS)
    cell.removeEventListener('click', onClick)
    cell.addEventListener('click', onClick, { once: true })
  })
  winningMessageElement.classList.remove('show')
}

function onClick(e) {
  const cell = e.target
  const currentClass = whoTurn ? O_CLASS : X_CLASS;
  placeMarke(cell, currentClass)
  if (checkWin(currentClass)) {
    endGame(false)
  } else if (isDraw()) {
    endGame(true)
  } else {
    swapTurns()
  }
}

function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerText = `Draw!`
  } else {
    winningMessageTextElement.innerText = `${whoTurn ? "O" : "X"} Wins!`
  }
  winningMessageElement.classList.add('show')
}

function isDraw() {
  return [...cellElements].every(cell => {
    return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS)
  })
}

function placeMarke(cell, currentClass) {
  cell.classList.add(currentClass);
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