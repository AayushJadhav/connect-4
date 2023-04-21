const gameMenu = document.querySelector("#game-menu")
const gameArea = document.querySelector("#game-area")
const endgameArea = document.querySelector("#endgame-area")
const gridDiv = document.querySelector("#grid")
const upperBandDiv = document.querySelector("#upper-band")
const startBtn = document.querySelectorAll(".start-btn")
const turnH3 = document.querySelector("#current-player")
const resultH3 = document.querySelector("#result")
const gameAreaH2s = document.querySelectorAll("#game-area h2")

var gridArray = []
var columnArray = []

var currentPlayer = "one"
turnH3.innerHTML = currentPlayer === "one" ? 1 : 2

document.body.onload = function () {
	gameMenu.style.display = "flex"
	gameArea.style.display = "none"
	endgameArea.style.display = "none"

	startBtn[0].addEventListener('click', startGame)
}

function startGame() {
	gameMenu.style.display = "none"
	gameArea.style.display = "flex"
	endgameArea.style.display = "none"
	
	createGrid()

	document.querySelectorAll(".disc").forEach(disc => disc.style.backgroundColor = currentPlayer === "one" ? "#333333" : "#aaaaaa")
}

function createGrid() {
	for (let y = 0; y < 6; y++) {
		let row = []
		for (let x = 0; x < 7; x++) {
			let square = document.createElement('div')
			square.id = x.toString() + '-' + y.toString()
			square.classList.add("disc")
			row.push(square)
			square.addEventListener('click', clickHandler)
			gridDiv.appendChild(square)
		}
		gridArray.push(row)
	}

	for (let i = 0; i < gridArray[0].length; i++) {
		columnArray.push(gridArray.length - 1)
	}
}

function changeBackground() {
	document.querySelectorAll(".player-one").forEach(disc => disc.style.backgroundColor = "#ffffff")
	document.querySelectorAll(".player-two").forEach(disc => disc.style.backgroundColor = "#000000")
	if (currentPlayer === "one") {
		gameArea.style.backgroundColor = "#333333"
		gameAreaH2s.forEach(h2 => {
			h2.style.color = "#aaaaaa"
		})
		document.querySelectorAll(".disc").forEach(disc => disc.style.backgroundColor = "#333333")
	} else if (currentPlayer === "two") {
		gameArea.style.backgroundColor = "#aaaaaa"
		gameAreaH2s.forEach(h2 => {
			h2.style.color = "#333333"
		})
		document.querySelectorAll(".disc").forEach(disc => disc.style.backgroundColor = "#aaaaaa")
	}
}

function clickHandler({ target }) {
	let coords = target.id.split('-')

	let currentX = parseInt(coords[0])
	let currentY = parseInt(coords[1])

	currentY = columnArray[currentX]

	if (!(currentY < 0)) {
		gridArray[currentY][currentX].classList.remove("disc")
		gridArray[currentY][currentX].classList.add("player-" + currentPlayer)

		currentY -= 1
		columnArray[currentX] = currentY

		checkWinner()

		currentPlayer = currentPlayer === "one" ? "two" : "one"
		turnH3.innerHTML = currentPlayer === "one" ? 1 : 2
		changeBackground()
	} else {
		this.removeEventListener('click', clickHandler)
		alert("There is no place!")
	}
}

function checkWinner() {
	// horizontal check
	for (let y = 0; y < gridArray.length; y++) {
		for (let x = 0; x < (gridArray[y].length - 3); x++) {
			if (gridArray[y][x] != " ") {
				if (gridArray[y][x].className == "player-one" &&
					gridArray[y][x + 1].className == "player-one" &&
					gridArray[y][x + 2].className == "player-one" &&
					gridArray[y][x + 3].className == "player-one" ||
					gridArray[y][x].className == "player-two" &&
					gridArray[y][x + 1].className == "player-two" &&
					gridArray[y][x + 2].className == "player-two" &&
					gridArray[y][x + 3].className == "player-two")
				{
					gameOver(y, x)
				}
			}
		}
	}
	// vertical check
	for (let y = 0; y < (gridArray.length - 3); y++) {
		for (let x = 0; x < gridArray[y].length; x++) {
			if (gridArray[y][x] != " ") {
				if (gridArray[y][x].className == "player-one" &&
					gridArray[y + 1][x].className == "player-one" &&
					gridArray[y + 2][x].className == "player-one" &&
					gridArray[y + 3][x].className == "player-one" ||
					gridArray[y][x].className == "player-two" &&
					gridArray[y + 1][x].className == "player-two" &&
					gridArray[y + 2][x].className == "player-two" &&
					gridArray[y + 3][x].className == "player-two")
				{
					gameOver(y, x)
				}
			}
		}
	}

	// diagonal check
	for (let y = 0; y < (gridArray.length - 3); y++) {
		for (let x = 0; x < (gridArray[y].length - 3); x++) {
			if (gridArray[y][x] != " ") {
				gridArray[y][x].classList.add('test')
			}
		}
	}
}

function gameOver(y, x) {
	gameMenu.style.display = "none"
	gameArea.style.display = "none"
	endgameArea.style.display = "flex"

	let winnerPlayer = gridArray[y][x].className == "player-one" ? 1 : 2
	resultH3.innerHTML = "Player " + winnerPlayer + " won!"

	gridArray.forEach(arr => {
		arr.forEach(div => div.remove())
	})

	currentPlayer = winnerPlayer == 1 ? "one" : "two"
	turnH3.innerHTML = currentPlayer === "one" ? 1 : 2

	gridArray = []
	columnArray = []

	startBtn[1].addEventListener('click', startGame)
}