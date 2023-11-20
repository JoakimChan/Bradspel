import { getAllUsers, addUser, getOneUser, updateUser } from "./json-request.js"

let playerArray = []
const registerButton = document.getElementById('register')

registerButton.addEventListener("click", register)

function register() {
  const newPlayerName = document.getElementById('player-name').value
  if (checkForNameExist(newPlayerName)) {
    alert("player already existed")
  } else {
    addUser(newPlayerName)
  }
}

function checkForNameExist(name) {
  playerArray.push(getAllUsers())
  if (playerArray.some(x => x.name == name)) {
    return true;
  }
  return false;
}
