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
        size: cellSize / 2,
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
	const startX = item.x;
    const startY = item.y;
    const endX = item.x + (item.size * item.gridSizeX);
    const endY = item.y + (item.size * item.gridSizeY);
    
	for (let i = 0; i < bagCells.cells.length; i++) {
        const cell = bagCells.cells[i];
        const cellStartX = cell.x - cellSize;
        const cellStartY = cell.y - cellSize;		
        const cellEndX = cell.x + cellSize;
        const cellEndY = cell.y + cellSize;


        // Check if the item's center falls within the cell
        if (startX <= cellEndX && endX >= cell.x && startY <= cellEndY && endY >= cell.y &&
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
    const things = ["Weapon", "Armor", "Accessory"];
    const owner = getRandomElement(owners);
    const adjective = getRandomElement(adjectives);
    const thing = getRandomElement(things);
	const weaponTypes = ["Sword","Axe","Dagger","Polearm","Staff"];
	const armorTypes = ["Head","Shoulder","Chest","Waist","Wrist","Hands","Feet","Back"];
	const accessoryTypes = ["Neck","Ring","Trinket"];
	const itemType = "";
	const swordTypes = ["Claymore",
						"Rapier",
						"Katana",
						"Cutlass",
						"Longsword",
						"Scimitar",
						"Sabre",
						"Bastard sword",
						"Epee",
						"Gladius"]
						
	const axeTypes	= ["Wood Axe",
						"Tomahawk",
						"Labrys",
						"Bearded axe",
						"Throwing axe",
						"Bardiche",
						"Double Axe",
						"Cleaver",
						"Broad Axe"
						"Battle-axe"]
						
	const daggerTypes = ["Kris",
						"Dirk",
						"Main-gauche",
						"Stiletto",
						"Rondel",
						"Baselard"]
						
	const polearmTypes = ["Glaive",
						"Halberd",
						"Pike",
						"Partisan",
						"Naginata",
						"Voulge",
						"Bec de corbin",
						"War scythe",
						"Ranseur"]
						
	const staffTypes = ["Bo staff",
						"Quarterstaff",
						"Jo staff",
						"Shillelagh",
						"Yari",
						"Gunbai",
						"Sansetsukon"]
	const selectedSwordType = getRandomElement(swordTypes);
	const selectedAxeType = getRandomElement(axeTypes);
	const selectedDaggerType = getRandomElement(daggerTypes);
	const selectedPolearmType = getRandomElement(polearmTypes);
	const selectedStaffType = getRandomElement(staffTypes);
	
	switch (thing) {
		case 'Weapon':
			let itemType = getRandomElement(weaponTypes)
		break;
		case 'Armor':
			let itemType = getRandomElement(armorTypes)
		break;
		case 'Accessory':
			let itemType = getRandomElement(accessoryTypes)
		break;
  default:
    console.log(`Error`);
}

	switch (itemType) {
		case 'Sword':
			let itemType = getRandomElement(selectedSwordType)
		break;
		case 'Axe':
			let itemType = getRandomElement(selectedAxeType)
		break;
		case 'Dagger':
			let itemType = getRandomElement(selectedDaggerType)
		break;
		case 'Polearm':
			let itemType = getRandomElement(selectedPolearmType)
		break;
		case 'Staff':
			let itemType = getRandomElement(selectedStaffType)
		break;
		
  default:
    console.log(`Error`);
}
						
	
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