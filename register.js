import fs from 'fs'
const playerArray = []

document.addEventListener('DOMContentLoaded', () => {
  const registerButtom = document.getElementById('register')

  registerButtom.addEventListener('click', register)
})

function register() {
  console.log('1')
  fetchData()
  const newPlayerName = document.getElementById('player-name').value
  console.log('3')
  if (checkForNameExist(newPlayerName)) {
    alert("player already existed")
  } else {
    console.log('5')
    const player = new NewPlayer(newPlayerName)

    playerArray.push(player.dataInfo())
    writeToJson();
  }
}

function fetchData() {
  console.log('2')
  const jsonSting = fs.readFileSync("playerList.json");
  const data = JSON.parse(jsonSting)

  for (let i = 0; i < data.lengt; i++) {
    playerArray.push(data[i])
  }
}

function checkForNameExist(name) {
  console.log('4')
  if (playerArray.some(x => x.playerName = name)) {
    return true;
  }
  return false;
}


function writeToJson() {
  fs.writeFileSync('./playerList.json', JSON.stringify(playerArray, null, 2), (err) => {
    if (err) throw err;
    console.log('data writen to file')
  })
}

class NewPlayer {
  constructor(name) {
    this.name = name
  }

  dataInfo() {
    return {
      playerName: this.name,
      won: 0,
      loses: 0,
      games: []
    }
  }
}