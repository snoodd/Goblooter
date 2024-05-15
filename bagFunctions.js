// bagFunctions.js

//Function to initialize the cells 
class cell {
    constructor(position, pXval, pYval) {
        this.position = position;
        this.x = pXval;
        this.y = pYval;
        this.isOccupied = false;
        this.isHighlighted = false;
        this.color = "";
		this.occupyingItem;

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
            let newC = new cell([i,j], bagXpos + bagPadding + (j * cellSize), bagYpos + bagPadding + (i * cellSize));
			//console.log(newC);
            if ((i + j) % 2 === 0) {
                newC.color = "rgba(255, 255, 255, 0.5)";
            } else {
                newC.color = "rgba(255, 255, 255, 0.25)";
            }
            index++
            bagCells.cells.push(newC);
console.log(newC);
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
function drawBaggedItems(pItems) {
		baggedItemsToBeDrawn = pItems;
           // ctx.fillStyle = item.color;
            //ctx.fillRect(item.x, item.y, (item.size * 1.75) * item.gridSizeX, (item.size * 1.75) * item.gridSizeY);
if(baggedItemsToBeDrawn.length >= 1){
    for (const item of baggedItemsToBeDrawn) {
        ctx.fillStyle = item.color;
        ctx.fillRect(item.x, item.y, ((item.size * 1.75) * item.gridSizeX), (item.size * 1.75) * item.gridSizeY);
    }
}
}


// Function to check if item is over the bag grid
function isOverBagGrid(item) {
    return (
        item.x >= bagXpos &&
        item.x + cellSize <= bagXpos + bagWidth &&
        item.y >= bagYpos &&
        item.y + cellSize <= bagYpos + bagHeight

    );
}




// Function to handle cell highlighting when an item is dragged
function highlightCells(item) {
	cellInfo = getCellInfo(item);
        for (let i = 0; i < cellInfo.length; i++) {
			const cell = cellInfo[i];        
            if (!cell.isOccupied) {
                ctx.fillStyle = "rgba(0, 0, 255, 0.5)";
            } else {
                ctx.fillStyle = "rgba(255, 0, 0, 0.5)";
            }
                ctx.fillRect(cell.x, cell.y, cellSize, cellSize);	
		}
}

function getinitialCellPosition(item) {
    let cellPosX = 0;
    let cellPosY = 0;
    for (let i = 0; i < bagCells.cells.length; i++) {
        const cell = bagCells.cells[i];

        if (item.x >= cell.x  && item.x < cell.x + cellSize  && item.y >= cell.y && item.y < cell.y + cellSize) {

            cellPosX = cell.position[1];
            cellPosY = cell.position[0];
            return [cellPosX, cellPosY];
        }
        }   

}
function reportCellPositions(item) {
	shape = item.shape;
	initialCell = getinitialCellPosition(item);
    const positions = [];
    let currentX = initialCell[0],
        currentY = initialCell[1];

    shape.forEach(([dx, dy]) => {
        let newX = currentX + dx;
        let newY = currentY + dy;
        positions.push([newY, newX]);
        
    });
    return positions;
}
function getCellInfo(item){
	cellPositions = reportCellPositions(item)
    result = bagCells.cells.filter(cell => {
        return cellPositions.some(entry => {
                return entry[0] === cell.position[0] && entry[1] === cell.position[1];
        });
    });
    return result;
}

function clearOccupiedCells(item) {
    cellsInfo = getCellInfo(item);
    cellsInfo.forEach(cell => {
        cell.isOccupied = false;
        cell.occupyingItem = null;
    });
    item.isInBag = false;
    // Remove item from baggedItems array
    const index = baggedItems.indexOf(item);
    if (index > -1) {
        baggedItems.splice(index, 1);
    }
}
