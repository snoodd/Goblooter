//Items.js

 function getRandomElement(arrayToPickFrom) {
              return arrayToPickFrom[Math.floor(Math.random()*arrayToPickFrom.length)]
            }

                        // Function to create a new item
                function createItem(x, y, value) {
                    const iteminfo = getBelievableItemName();
                    return {
                        x: x,
                        y: y,
                        size: 25,
                        color:`rgb(${getRandomInt(0, 255)}, ${getRandomInt(0, 255)}, ${getRandomInt(0, 255)})`, // Random color,
                        name: iteminfo[0],
                        value: value * iteminfo[1],
                        type: iteminfo[2],
                        gridSizeX: iteminfo[3],
                        gridSizeY: iteminfo[4],
                        isDragging: false,
                        dragOffsetX: 0,
                        dragOffsetY: 0
                    };
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
                      new ItemAdjective("Blue", 83)];
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