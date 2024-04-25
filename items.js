//Items.js

function getRandomElement(arrayToPickFrom) {
    return arrayToPickFrom[Math.floor(Math.random() * arrayToPickFrom.length)]
}

// Function to create a new item
function createItem(x, y, value) {
    const iteminfo = getBelievableItemName();
    return {
        x: x,
        y: y,
        size: 25,
        color: `rgb(${getRandomInt(0, 255)}, ${getRandomInt(0, 255)}, ${getRandomInt(0, 255)})`, // Random color,
        name: iteminfo[0],
        value: value * iteminfo[1],
        type: iteminfo[2],
        gridSizeX: iteminfo[3],
        gridSizeY: iteminfo[4],
        isDragging: false,
        isInBag: false,
        dragOffsetX: 0,
        dragOffsetY: 0
    };
}

// Function to check if an item is being dropped into the bag
function dropItemInBag(item) {
    for (let i = 0; i < bagCells.cells.length; i++) {
        const cell = bagCells.cells[i];



        // Check if the item's center falls within the cell
        if (item.x + cellSize / 2 >= cell.x && item.x + item.size / 2 < cell.x + cellSize &&
            item.y + item.size / 2 >= cell.y && item.y + item.size / 2 < cell.y + cellSize &&
            !cell.isOccupied) {
            // Snap the item's position to the cell
            item.x = cell.x + 10;
            item.y = cell.y + 10;
            item.isDragging = false;
            item.isInBag = true;
            cell.isOccupied = true;
            // Add the item to the baggedItems array
            baggedItems.push(item);
            return;
        }
    }
}

class ItemAdjective {
    constructor(pWord, pValue) {
        this.word = pWord;
        this.value = pValue;
    }
}

function getBelievableItemName() {
    const owners = ["Jeff", "Andrew", "Stik", "Joe", "Catherine", "Egg", "Plant"];
    const adjectives = [
        new ItemAdjective("Great", 3.0),
        new ItemAdjective("Crappy", -2.0),
        new ItemAdjective("Small", 0.9),
        new ItemAdjective("Blue", 83)
    ];
    const things = ["Weapon", "Armor", "Ring", "Potion"];
    const owner = getRandomElement(owners);
    const adjective = getRandomElement(adjectives);
    const thing = getRandomElement(things);
    // Calculate gridSizeX and gridSizeY based on the item type
    if (thing === "Weapon" || thing === "Armor") {
        gridSizeX = 2;
        gridSizeY = getRandomInt(2, 4); // Random number between 2 and 4 for gridSizeY
    } else {
        gridSizeX = 1;
        gridSizeY = 1;
    }

    return [owner + "'s " + adjective.word + " " + thing, adjective.value, thing, gridSizeX, gridSizeY];
}