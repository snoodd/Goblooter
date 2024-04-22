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
					 drawCell(){
						const ctx = canvas.getContext("2d");
						ctx.beginPath();
						ctx.lineWidth = "1";
						ctx.fillStyle = this.color; 
						ctx.fillRect(this.x, this.y, cellSize,cellSize);
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
								for (let j = 0; j < columns; j++){
									numbers[i][j] = j + 1 + (i*columns);
									let newC = new cell(index, bagXpos + bagPadding + (j * cellSize) ,bagYpos + bagPadding + (i * cellSize));
									 if((i+j) % 2 === 0)
                                                        {
                                                            newC.color = "rgba(255, 255, 255, 0.5)";
                                                        } 
                                                        else
                                                        {
                                                            newC.color = "rgba(255, 255, 255, 0.25)";
                                                        }
									index++
									 bagCells.cells.push(newC);

								}
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
					for (let i = 0; i < bagCells.cells.length; i++) {
						const cell = bagCells.cells[i];

						
						// Check if the cell falls within the range of the item
						if (item.x >= cell.x  && item.x < cell.x + cellSize  && item.y >= cell.y && item.y < cell.y + cellSize) {

							cell.isHighlighted = true;
							ctx.fillStyle = "rgba(0, 0, 255, 0.5)"; 
							ctx.fillRect(cell.x, cell.y, ((item.size * 2) * item.gridSizeX), ((item.size * 2) * item.gridSizeY));

			  
							
						} else {
							// Set the cell's isHighlighted property to false if it's not within the range
							cell.isHighlighted = false;
						}
					}
				}
				
