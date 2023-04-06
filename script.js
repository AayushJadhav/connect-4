const gridDiv = document.querySelector("#grid")

const gridArray = []

createGrid()

function createGrid() {
    for (var y = 0; y <= 6; y++) {
        for (var x = 0; x <= 6; x++) {
            var square = document.createElement('div')
            gridArray.push([square, x, y])
            if (y == 6) {
                square.classList.add("taken")
            }
            gridDiv.appendChild(square)
        }
    }

    console.log(gridArray)
}