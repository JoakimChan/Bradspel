const X_CLASS = 'x';
const O_CLASS = 'o';
const cellElements = document.querySelectorAll('[data-cell]')
let whoTurn;

startGame();

function startGame() {
  whoTurn = false
  cellElements.forEach(cell => {
    cell.addEventListener('click', onClick, { once: true })
  })
}

function onClick(e) {
  const cell = e.target
  const currentClass = whoTurn ? O_CLASS : X_CLASS;
  placeMarke(cell, currentClass)
  swapTurns()
}

function placeMarke(cell, currentClass) {
  cell.classList.add(currentClass);
}

function swapTurns() {
  whoTurn = !whoTurn
}