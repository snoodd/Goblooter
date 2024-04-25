// bagFunctions.js

//Function to initialize the cells 
class cell {
    constructor(id, pXval, pYval) {
        this.id = id;
        this.x = pXval;
        this.y = pYval;
        this.isOccupied = false;
        this.isHighlighted = false;
        this.color = "";

    }
    drawCell() {
        const ctx = canvas.getContext("2d");
        ctx.beginPath();
        ctx.lineWidth = "1";
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, cellSize, cellSize);
        ctx.stroke();

    }
}
class cellsContainer {
    constructor() {
        this.cells = []
    }
}

function initCells() {

    let index = 0;
    for (let i = 0; i < rows; i++) {
        numbers[i] = [];
        for (let j = 0; j < columns; j++) {
            numbers[i][j] = j + 1 + (i * columns);
            let newC = new cell(index, bagXpos + bagPadding + (j * cellSize), bagYpos + bagPadding + (i * cellSize));
            if ((i + j) % 2 === 0) {
                newC.color = "rgba(255, 255, 255, 0.5)";
            } else {
                newC.color = "rgba(255, 255, 255, 0.25)";
            }
            index++
            bagCells.cells.push(newC);

        }
    }

}
function calculateTotalValue() {
    let totalValue = 0;
    for (const item of baggedItems) {
        totalValue += item.value;
    }
    return totalValue;

}
// Function to draw bagged items inside the bag
function drawBaggedItems(item) {
            ctx.fillStyle = item.color;
            ctx.fillRect(item.x, item.y, (item.size * 1.75) * item.gridSizeX, (item.size * 1.75) * item.gridSizeY);

    for (const item of baggedItems) {
        ctx.fillStyle = item.color;
        ctx.fillRect(item.x, item.y, (item.size * 1.75) * item.gridSizeX, (item.size * 1.75) * item.gridSizeY);
    }
}


// Function to check if item is over the bag grid
function isOverBagGrid(item) {
    return (
        item.x >= bagXpos &&
        item.x + item.size <= bagXpos + bagWidth &&
        item.y >= bagYpos &&
        item.y + item.size <= bagYpos + bagHeight
    );
}


// Function to handle cell highlighting when an item is dragged
function highlightCellsForItem(item) {
	const startX = item.x;
    const startY = item.y;
    const endX = item.x + (item.size * item.gridSizeX);
    const endY = item.y + (item.size * item.gridSizeY);
        for (let i = 0; i < bagCells.cells.length; i++) {
			const cell = bagCells.cells[i];
			const cellEndX = cell.x + (item.gridSizeX * cellSize);
			const cellEndY = cell.y + (item.gridSizeY * cellSize);

        if (startX <= cellEndX && endX >= cell.x && startY <= cellEndY && endY >= cell.y) {
            cell.isHighlighted = true;
			cell.isOccupied = true;
			item.isInBag = true;
            if (!cell.isOccupied) {
                ctx.fillStyle = "rgba(0, 0, 255, 0.5)";
            } else {
                ctx.fillStyle = "rgba(255, 0, 0, 0.5)";
            }

            ctx.fillRect(cell.x, cell.y, cellSize, cellSize);
        } else {
            cell.isHighlighted = false;
			cell.isOccupied = false;
        }
    }
}