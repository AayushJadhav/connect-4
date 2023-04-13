// const gameMenu = document.querySelector("#game-menu")
const gameArea = document.querySelector("#game-area")
// const endgameArea = document.querySelector("#endgame-area")
const gridDiv = document.querySelector("#grid")
const upperBandDiv = document.querySelector("#upper-band")
// const startBtn = document.querySelector(".start-btn")
const turnH3 = document.querySelector("#current-player")
// const resultH3 = document.querySelectorAll("#result")
const gameAreaH2s = document.querySelectorAll("#game-area h2")

const gridArray = []
const columnArray = []

var currentPlayer = "one"
turnH3.innerHTML = currentPlayer === "one" ? 1 : 2

// startBtn.addEventListener('click', startGame)

startGame()

function startGame() {
	createGrid()
	// gridDiv.addEventListener('click', clickHandler)
}

function createGrid() {
	for (let y = 0; y < 6; y++) {
		let row = []
		for (let x = 0; x < 7; x++) {
			let square = document.createElement('div')
			square.id = x.toString() + '-' + y.toString()
			row.push(square)
			square.addEventListener('click', clickHandler)
			gridDiv.appendChild(square)
		}
		gridArray.push(row)
	}
	console.log(gridArray)

	for (let i = 0; i < gridArray[0].length; i++) {
		columnArray.push(gridArray.length - 1)
	}
	console.log(columnArray)
}

function changeBackground() {
	if (currentPlayer === "one") {
		gameArea.style.backgroundColor = "#333333"
		gameAreaH2s.forEach(h2 => {
			h2.style.color = "#aaaaaa"
		})
	} else if (currentPlayer === "two") {
		gameArea.style.backgroundColor = "#aaaaaa"
		gameAreaH2s.forEach(h2 => {
			h2.style.color = "#333333"
		})
	}
}

function clickHandler({ target }) {
	console.log(target)
	let coords = target.id.split('-')

	console.log(gridArray)

	let currentX = parseInt(coords[0])
	let currentY = parseInt(coords[1])

	console.log('currentY', currentY)
	currentY = columnArray[currentX]

	console.log('currentX', currentX)

	if (!(currentY < 0)) {
		gridArray[currentY][currentX].classList.add("player-" + currentPlayer)

		currentY -= 1
		columnArray[currentX] = currentY

		currentPlayer = currentPlayer === "one" ? "two" : "one"
		turnH3.innerHTML = currentPlayer === "one" ? 1 : 2
		changeBackground()
	} else {
		this.removeEventListener('click', clickHandler)
	}
}

/** For placing disc.
 * Suggestion save x and y co-ordinate of each 'square' 
 * first, create an array with value of [5, 5, 5, 5, 5, 5] i.e. no. of available rows in each column,
 * then access the value of specific element(row number) at specific index(column number)
 * then as you add disc in the grid, subtract that accessed value.
 * refer https://www.youtube.com/watch?v=4ARsthVnCTg
 */