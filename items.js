//Items.js

function getRandomElement(arrayToPickFrom) {
    return arrayToPickFrom[Math.floor(Math.random() * arrayToPickFrom.length)]
}


const itemShapes = [
  { type: "shortThin",
    items: [ { id: 01, name: 'dagger'},
             { id: 02, name: 'wand'},
             { id: 03, name: 'bracer'}],
    shape: [[0,0],
            [0,1]]},
  { type: "mediumThin",
    items: [ { id: 01, name: 'longsword'},
             { id: 02, name: 'large axe'},
             { id: 03, name: 'short staff'}],
    shape: [[0,0],
            [0,1],
            [0,2]]},
  { type: "longThin",
    items: [ { id: 01, name: 'Lance'},
             { id: 02, name: 'Longspear'},
             { id: 03, name: 'Staff'}],
    shape: [[0,0],
            [0,1],
            [0,2],
            [0,3]]},
   { type: "shortWide",
    items: [ { id: 01, name: 'helm'},
             { id: 02, name: 'small shield'},
             { id: 03, name: 'double throwing axes'}],
    shape: [[0,0],[1,0],
            [0,1],[1,1]]},
   { type: "mediumWide",
    items: [ { id: 01, name: 'hauberk'},
             { id: 02, name: 'legplates'},
             { id: 03, name: 'tunic'}],
    shape: [[0,0],[1,0],
            [0,1],[1,1],
            [0,2],[1,2]]},
    { type: "longWide",
    items: [ { id: 01, name: 'robe'},
             { id: 02, name: 'tower shield'},
             { id: 03, name: 'two handed axe'}],
    shape: [[0,0],[1,0],
            [0,1],[1,1],
            [0,2],[1,2],
            [0,3],[1,3]]} 
 ];

// Function to choose a random type and a random item from that type
function chooseRandomItem() {
  // Choose a random type
  const selectedType = getRandomElement(itemShapes);
  // Choose a random item from the selected type
  const selectedItem = getRandomElement(selectedType.items);
  // Return the name of the selected item and the shape of the selected type
  return {
    itemName: selectedItem.name,
    shape: selectedType.shape
  };
  console.log("randomly selected item: " ,itemName,shape);
}

function calculateDimensions(pShape) {
	let shape = pShape;
    const lastPair = shape[shape.length - 1];
    if (!lastPair || lastPair.length !== 2) {
        return { width: 0, height: 0 }; // Return 0 for width and height if the last pair is missing or invalid
    }

    const [lastX, lastY] = lastPair;
    return { width: lastX + 1, height: lastY + 1 };
}

function reverseShape(item) {
    item.shape = item.shape.map(([x, y]) => [y, x]);
    // Update the item's gridSizeX and gridSizeY to reflect the reversed shape
    [item.gridSizeX, item.gridSizeY] = [item.gridSizeY, item.gridSizeX];
}


function getBelievableItemName() {
    class ItemAdjective {
    constructor(pWord, pValue) {
        this.word = pWord;
        this.value = pValue;
    }
}



    const { itemName, shape } = chooseRandomItem();
	const dimensions = calculateDimensions(shape);
	console.log(itemName, dimensions);
    const owners = ["Jeff", "Andrew", "Stik", "Joe", "Catherine", "Egg", "Plant"];
    const adjectives = [
        new ItemAdjective("Great", 3.0),
        new ItemAdjective("Crappy", -2.0),
        new ItemAdjective("Small", 0.9),
        new ItemAdjective("Blue", 83)
    ];
    const owner = getRandomElement(owners);
    const adjective = getRandomElement(adjectives);             

    return [owner + "'s " + adjective.word + " ", itemName, adjective.value, dimensions.width, dimensions.height,shape];
}


// Function to generate a random integer between min and max (inclusive)
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to generate items
function generateItems() {
    if (gameStarted) {
        const numItems = getRandomInt(3, 5);
        for (let i = 0; i < numItems; i++) {
            const x = getRandomInt(560, 560 + mainWidth - size); // Random x-coordinate within the canvas
            const y = getRandomInt(240, 240 + mainHeight - size); // Random y-coordinate within the canvas
            items.push(createItem(x, y, getRandomInt(1, 100))); // Create and add item to the array
        }
    }
}

// Function to create a new item
function createItem(x, y, value) {

    const iteminfo = getBelievableItemName();
    return {
        x: x,
        y: y,
        size: cellSize / 2,
        color: `rgb(${getRandomInt(0, 255)}, ${getRandomInt(0, 255)}, ${getRandomInt(0, 255)})`, // Random color,
        name: iteminfo[0] + iteminfo[1],
        value: value * iteminfo[2] * Math.pow(1.2, currentLevel - 1),
        type: iteminfo[1],
        shape: iteminfo[5],
        gridSizeX: iteminfo[3],
        gridSizeY: iteminfo[4],
        isDragging: false,
        isInBag: false,
        dragOffsetX: 0,
        dragOffsetY: 0
    };
console.log(createItem);
}



// Function to check if an item is being dropped into the bag
function dropItemInBag(item) {
	let cellInfo = getCellInfo(item);
	let unoccupiedCellCount = 0;
	// Count the number of unoccupied cells in cellInfo
	const unoccupiedCells = cellInfo.filter(cell => !cell.isOccupied);



// Check if the number of unoccupied cells matches the number of cells required by the item's shape
    if (unoccupiedCells.length === item.shape.length) {
        // Snap the item's position to the cell
        item.x = unoccupiedCells[0].x + 5;
        item.y = unoccupiedCells[0].y + 5;
        item.isDragging = false;
        item.isInBag = true;

        // Mark the cells as occupied
        unoccupiedCells.forEach(cell => {
            cell.isOccupied = true;
			cell.occupyingItem = item;
        });
		console.log(unoccupiedCells);
        // Add the item to the baggedItems array
        baggedItems.push(item);
        console.log("bagged items" + baggedItems);
		//totalValue = calculateTotalValue();
    } else {
		console.log("empty cells " + unoccupiedCells.length + " Item Shape Length " + item.shape.length )
		console.log("item not bagged" + baggedItems);
		item.isDragging = false;
		item.isInBag = false;
        // If the item cannot fit in the bag, reset its position
        item.x = getRandomInt(560, 560 + mainWidth - size);
        item.y = getRandomInt(240, 240 + mainHeight - size);
    
}

}
/*


function getItemType() {
    let itemCategory = "";
    let itemType = "";
    const itemShapes = ["1x1","1x2","1x3","1x4","2x2","2x3","2x4"]; 
    const things = ["Weapon", "Armor", "Accessory"];
    const thing = getRandomElement(things);
    const weaponTypes = ["Sword","Axe","Dagger","Polearm","Staff"];
    const armorTypes = ["Head","Shoulder","Chest","Waist","Wrist","Hands","Feet","Back"];
    const accessoryTypes = ["Neck", "Ring", "Trinket"];
    const head_armor = ["Helm", "Crown", "Skullcap", "Circlet", "Visor"];
    const shoulder_armor = ["Spaulders", "Mantle", "Pauldrons", "Epaulets", "Shoulderplates"];
    const chest_armor = ["Breastplate", "Plate Mail", "Chainmail", "Robes", "Hauberk"];
    const waist_armor = ["Belt", "Sash", "Girdle", "Waistband", "Cord"];
    const wrist_armor = ["Bracers", "Cuffs", "Bands", "Vambraces", "Armguards"];
    const hands_armor = ["Gauntlets", "Gloves", "Mitts", "Handguards", "Grips"];
    const feet_armor = ["Boots", "Greaves", "Sabatons", "Shoes", "Sandals"];
    const back_armor = ["Cloak", "Cape", "Mantle", "Shawl", "Wrap"];
    const ring_types = ["Band", "Loop", "Seal", "Circle", "Signet"];
    const necklace_types = ["Pendant", "Choker", "Chain", "Collar", "Torc"];
    const trinket_types = ["Charm", "Bauble", "Token", "Ornament", "Relic"];



const swordTypes = ["Claymore",
                    "Rapier",
                    "Katana",
                    "Cutlass",
                    "Longsword",
                    "Scimitar",
                    "Sabre",
                    "Bastard sword",
                    "Falchion",
                    "Gladius"]
class itemShape {
    constructor(pSize,pVal) {
        this.size = pSize;
        this.val = pVal;
    }
}

function getItemShape(){
    class ItemTypeInfo {
    constructor(pType, pShape) {
        this.type = pType;
        this.shape = pShape;
    }
}
}


        new ItemTypeInfo (getItemType(),      

                        
    const axeTypes  =   [
        new ItemTypeInfo ("Wood Axe",      [(0,0),(1,0),(0,1),(1,1),(0,2),(1,2),(0,3),(1,3)]),
        new ItemTypeInfo ("Tomahawk",      [(0,0),(0,1),(0,2)]),        
        new ItemTypeInfo ("Labrys",        [(0,0),(0,1),(0,2)]),
        new ItemTypeInfo ("Bearded axe",   [(0,0),(0,1),(0,2)]),
        new ItemTypeInfo ("Throwing axe",  [(0,0),(0,1)]),
        new ItemTypeInfo ("Bardiche",      [(0,0),(0,1),(0,2)]),
        new ItemTypeInfo ("Double Axe",    [(0,0),(0,1),(0,2)]),
        new ItemTypeInfo ("Hatchet",       [(0,0),(0,1),(0,2),(0,3)]),
        new ItemTypeInfo ("Cleaver",       [(0,0),(0,1),(0,2)]),
        new ItemTypeInfo ("Broad Axe",     [(0,0),(0,1),(0,2)]),
        new ItemTypeInfo ("Battle-axe",    [(0,0),(0,1),(0,2)])
                        ];

                        
    const daggerTypes = ["Kris",
                        "Dirk",
                        "Main-gauche",
                        "Stiletto",
                        "Rondel",
                        "Baselard"];
                        
    const polearmTypes = ["Glaive",
                        "Halberd",
                        "Pike",
                        "Partisan",
                        "Naginata",
                        "Voulge",
                        "Bec de corbin",
                        "War scythe",
                        "Ranseur"];
                        
    const staffTypes = ["Bo staff",
                        "Quarterstaff",
                        "Jo staff",
                        "Shillelagh",
                        "Yari",
                        "Gunbai",
                        "Sansetsukon"];



    switch (thing) {                
        case 'Weapon':
         itemCategory = getRandomElement(weaponTypes);
        break;
        case 'Armor':
         itemCategory = getRandomElement(armorTypes);
        break;
        case 'Accessory':
         itemCategory = getRandomElement(accessoryTypes);
        break;
  default:
    console.log(`Error`);
}
    switch (itemCategory) {                  
        case 'Sword':
         itemType = getRandomElement(swordTypes);
        break;
        case 'Axe':
         itemType = getRandomElement(axeTypes);
        break;
        case 'Dagger':
         itemType = getRandomElement(daggerTypes);
        break;
        case 'Polearm':
         itemType = getRandomElement(polearmTypes);
        break;
        case 'Staff':
         itemType = getRandomElement(staffTypes);
        break;        
        case 'Head':
         itemType = getRandomElement(head_armor);
        break;
        case 'Shoulder':
         itemType = getRandomElement(shoulder_armor);
        break;
        case 'Chest':
         itemType = getRandomElement(chest_armor);
        break;
        case 'Waist':
         itemType = getRandomElement(waist_armor);
        break;
        case 'Wrist':
         itemType = getRandomElement(wrist_armor);
        break; 
        case 'Hands':
         itemType = getRandomElement(hands_armor);
        break;
        case 'Feet':
         itemType = getRandomElement(feet_armor);
        break;
        case 'Back':
         itemType = getRandomElement(back_armor);
        break;
        case 'Ring'
         itemType = getRandomElement(ring_types);
        break;
        case 'Neck'
         itemType = getRandomElement(necklace_types);
        break; 
        case 'Trinket'
         itemType = getRandomElement(trinket_types);
        break;         
  default:
    console.log(`Error`);
}
return itemType;

function getItemShape(pItemType){
    itemType = pItemType;
}

*/