const gameMenu = document.querySelector("#game-menu")
const gameArea = document.querySelector("#game-area")
const endgameArea = document.querySelector("#endgame-area")
const gridDiv = document.querySelector("#grid")
const startBtn = document.querySelector(".start-btn")
const turnH3 = document.querySelector("#currentPlayer")
const resultH3 = document.querySelectorAll("#result")

const gridArray = []

var currentPlayer = 1
turnH3.innerHTML = currentPlayer

startBtn.addEventListener('click', startGame)

function startGame() {
    gameMenu.style.display = "none"
    gameArea.style.display = "flex"
    createGrid()
}

function createGrid() {
    for (let y = 0; y <= 19; y++) {
        for (let x = 0; x <= 19; x++) {
            var square = document.createElement('div')
            gridArray.push([square, x, y])
            gridDiv.appendChild(square)
        }
    }

    for (let i = 0; i < gridArray.length; i++) {
        gridArray[i].push(i)
        gridArray[i][0].id = i
    }
}