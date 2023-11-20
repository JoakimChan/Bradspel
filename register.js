import { getAllUsers, addUser, getOneUser, updateUser } from "./json-request.js"

const playerArray = []
const registerButton = document.getElementById('register')

registerButton.addEventListener("click", register())

function register() {
  const newPlayerName = document.getElementById('player-name').value
  if (checkForNameExist(newPlayerName)) {
    alert("player already existed")
  } else {
    addUser(newPlayerName)
  }
}

function checkForNameExist(name) {
  playerArray = getAllUsers()
  if (playerArray.some(x => x.name = name)) {
    return true;
  }
  return false;
}
