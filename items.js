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
        name: iteminfo[0] + iteminfo[1],
        value: value * iteminfo[2],
        type: iteminfo[1],=8
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

class ItemCategory {
    constructor(pWord, pValue) {
        this.word = pWord;
        this.value = pValue;
    }
}

class Itemtype {
    constructor(type, subType) {
        this.type = type;
        this.subType = subType;
        this.value = pValue;
    }
}


function getItemType() {
    let itemCategory = "";
    let itemType = "";
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

/*function assignItemShape(size){
 pItemsize = size;
switch (pItemsize) {                
        case '1x1':
         shapeAssigned = [(0,0)];
        break;
        case '1x2':
         shapeAssigned = [(0,0),(0,1)];
        break;
        case '1x3':
         shapeAssigned = [(0,0),(0,1),(0,2)];
        break;
        case '1x4':
         shapeAssigned = [(0,0),(0,1),(0,2),(0,3)];
        break;
default:
    console.log(`Error`);
}
}*/

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



function getBelievableItemName(pItemType) {
    itemType = pItemType;
    class ItemAdjective {
    constructor(pWord, pValue) {
        this.word = pWord;
        this.value = pValue;
    }
}
function getItemShape(){
    class ItemShape {
    constructor(pType, pShape) {
        this.type = pType;
        this.shape = pShape;
    }
}
}

    const owners = ["Jeff", "Andrew", "Stik", "Joe", "Catherine", "Egg", "Plant"];
    const 
    const adjectives = [
        new ItemAdjective("Great", 3.0),
        new ItemAdjective("Crappy", -2.0),
        new ItemAdjective("Small", 0.9),
        new ItemAdjective("Blue", 83)
    ];
    const owner = getRandomElement(owners);
    const adjective = getRandomElement(adjectives);				
	
  /*  // Calculate gridSizeX and gridSizeY based on the item type
    if (thing === "Weapon" || thing === "Armor") {
        gridSizeX = 2;
        gridSizeY = getRandomInt(2, 4); // Random number between 2 and 4 for gridSizeY
    } else {
        gridSizeX = 1;
        gridSizeY = 1;
    }*/

    return [owner + "'s " + adjective.word + " ", getItemType(), adjective.value, 2, 4];
}