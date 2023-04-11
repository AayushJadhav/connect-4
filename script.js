const gameMenu = document.querySelector("#game-menu")
const gameArea = document.querySelector("#game-area")
const endgameArea = document.querySelector("#endgame-area")
const gridDiv = document.querySelector("#grid")
const upperBandDiv = document.querySelector("#upper-band")
const startBtn = document.querySelector(".start-btn")
const turnH3 = document.querySelector("#current-player")
const resultH3 = document.querySelectorAll("#result")
const gameAreaH2s = document.querySelectorAll("#game-area h2")

const upperBandArray = []
const gridArray = []

var currentPlayer = "one"
turnH3.innerHTML = currentPlayer == "one" ? 1 : 2

var currentIndex = 19

startBtn.addEventListener('click', startGame)

function startGame() {
    gameMenu.style.display = "none"
    gameArea.style.display = "flex"
    createGrid()
    addEventListener('keyup', eventHandler)
    // console.log(upperBandArray)
    // console.log(gridArray)
}

function createGrid() {
    for (let i = 0; i <= 19; i++) {
        var upperSquare = document.createElement('div')
        upperBandArray.push(upperSquare)
        upperSquare.classList.add("upper-squares")
        upperSquare.id = i
        if (i == 19) {
            upperSquare.classList.add("player" + '-' + currentPlayer)
        }
        upperBandDiv.appendChild(upperSquare)
    }

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

function changeBackground() {
    if (currentPlayer == "two") {
        gameArea.style.backgroundColor = "#cccccc"
        gameAreaH2s.forEach(h2 => h2.style.color = "#333333")
    } else if (currentPlayer == "one") {
        gameArea.style.backgroundColor = "#333333"
        gameAreaH2s.forEach(h2 => h2.style.color = "#cccccc")
    }
}

function eventHandler({ key }) {
    // console.log(e)

    switch (key) {
        case "ArrowLeft":
            upperBandArray[currentIndex].classList.remove("player" + "-" + currentPlayer)
            if (currentIndex != 0) {
                currentIndex -= 1
            }
            upperBandArray[currentIndex].classList.add("player" + "-" + currentPlayer)

            break
        case "ArrowRight":
            upperBandArray[currentIndex].classList.remove("player" + "-" + currentPlayer)
            if (currentIndex != 19) {
                currentIndex += 1
            }
            upperBandArray[currentIndex].classList.add("player" + "-" + currentPlayer)
            break
        case " ":
            upperBandArray[currentIndex].classList.remove("player" + "-" + currentPlayer)
            handleSpaceBarPress(currentIndex)
            upperBandArray[currentIndex].classList.remove("player" + "-" + currentPlayer)
            currentIndex = 19
            currentPlayer = currentPlayer == "one" ? "two" : "one"
            turnH3.innerHTML = currentPlayer
            changeBackground()
            upperBandArray[19].classList.add("player" + "-" + currentPlayer)
            break
    }
}

function handleSpaceBarPress(currentIndex) {
    // console.log(emptyDivsArray())
}

function emptyDivsArray() {
    var emptyDivsArray = []

    gridArray.forEach(arr => {
        if (!arr[0].classList.contains("player-one") & !arr[0].classList.contains("player-two")) {
            emptyDivsArray.push(arr[0])
        }
    })

    return emptyDivsArray
}

addEventListener('keyup', eventHandler)