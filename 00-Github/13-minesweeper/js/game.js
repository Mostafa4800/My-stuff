// Define difficulty presets for easy, intermediate, and expert levels
let difficulty_presets = {
    easy: {
        rows: 9,
        cols: 9,
        mines: 10,
        name: "Easy",
        width: 220
    },
    intermediate: {
        rows: 16,
        cols: 16,
        mines: 40,
        name: "Intermediate",
        width: 375
    },
    expert: {
        rows: 16,
        cols: 30,
        mines: 99,
        name: "Expert",
        width: 684
    }
}

// Initialize game variables
let difficulty = difficulty_presets.easy // Set initial difficulty to easy
let playing = true // Game state indicating if the game is active
let firstClick = true // Flag to handle the first click scenario
let unlucky = false // Flag to determine if the "feeling lucky" option is activated

/**
 * Sets the difficulty of the game.
 * @param {*} diff - Must be one of the presets (e.g. difficulty_presets.easy)
 */
function setDifficulty(diff) {
    // Check if the current window width is sufficient for the chosen difficulty level
    switch (difficulty) {
        case difficulty_presets.intermediate:
            if (window.innerWidth < 375) {
                return
            }
            break
        case difficulty_presets.expert:
            if (window.innerWidth < 684) {
                return
            }
            break
    }
    difficulty = diff // Update the difficulty
    resetGame() // Reset the game with the new difficulty
}

/**
 * Opens or closes the help window.
 */
function toggleHelp() {
    document.getElementById("get_help").classList.toggle("hidden")
}

// Class representing a square on the game grid
class Square {
    constructor() {
        this.isClicked = false // Indicates if the square has been clicked
        this.isFlagged = false // Indicates if the square is flagged
        this.isMine = false // Indicates if the square contains a mine
        this.isExplodedMine = false // Indicates if the mine exploded
        this.numNeighborMines = 0 // Number of neighboring mines
    }
}

/**
 * Creates a grid of Squares at the start of the game.
 */
function createGrid() {
    for (let i = 0; i < difficulty.rows; i++) {
        grid[i] = [] // Initialize a new row
        for (let j = 0; j < difficulty.cols; j++) {
            grid[i][j] = new Square() // Add a new Square to the row
        }
    }
}

/**
 * Places mines at random squares when the game starts.
 */
function placeMines() {
    let placedMines = 0
    while (placedMines < difficulty.mines) {
        // Generate random coordinates for placing a mine
        let x = Math.floor(Math.random() * difficulty.rows)
        let y = Math.floor(Math.random() * difficulty.cols)
        if (!grid[x][y].isMine) { // Check if the square is already a mine
            grid[x][y].isMine = true // Place a mine
            placedMines++ // Increment the placed mines counter
        }
    }
}

/**
 * Counts how many neighbors of a square are mines.
 */
function countNeighborMines() {
    for (let i = 0; i < difficulty.rows; i++) {
        for (let j = 0; j < difficulty.cols; j++) {
            if (!grid[i][j].isMine) { // Only count neighbors for non-mine squares
                let neighbors = 0
                // Check all neighboring squares
                for (let i_offset = -1; i_offset < 2; i_offset++) {
                    for (let j_offset = -1; j_offset < 2; j_offset++) {
                        if (
                            i + i_offset >= 0 && // Ensure within grid bounds
                            i + i_offset < difficulty.rows &&
                            j + j_offset >= 0 &&
                            j + j_offset < difficulty.cols
                        ) {
                            if (grid[i + i_offset][j + j_offset].isMine) { // Check if neighbor is a mine
                                neighbors++
                            }
                        }
                    }
                }
                grid[i][j].numNeighborMines = neighbors // Set the neighbor mine count
            }
        }
    }
}

/**
 * Reveals what's under a square.
 * @param {int} x - Horizontal position of the square.
 * @param {int} y - Vertical position of the square.
 */
function clickSquare(x, y) {
    let square = grid[x][y]
    if (!square.isClicked && !square.isFlagged) { // Only proceed if the square is not clicked or flagged
        square.isFlagged = false // Ensure the square is not flagged
        square.isClicked = true // Mark the square as clicked
        if (square.numNeighborMines == 0) { // If the square has no neighboring mines
            // Recursively click all neighboring squares
            for (let i_offset = -1; i_offset < 2; i_offset++) {
                for (let j_offset = -1; j_offset < 2; j_offset++) {
                    if (
                        x + i_offset >= 0 && // Ensure within grid bounds
                        x + i_offset < difficulty.rows &&
                        y + j_offset >= 0 &&
                        y + j_offset < difficulty.cols
                    ) {
                        if (!grid[x + i_offset][y + j_offset].isFlagged && !grid[x + i_offset][y + j_offset].isMine) {
                            clickSquare(x + i_offset, y + j_offset)
                        }
                    }
                }
            }
        }
    }
}

/**
 * Called when any square is clicked.
 * @param {int} x - Horizontal position of the button.
 * @param {int} y - Vertical position of the button.
 */
function clickButton(x, y) {
    if (firstClick) { // Handle the first click scenario
        // Ensure the first click is not on a mine
        while (unlucky != grid[x][y].isMine) {
            createGrid()
            placeMines()
        }
        countNeighborMines()
        updateFlagCounter()
        displayGrid()
        firstClick = false
    }
    if (!grid[x][y].isFlagged) { // Only proceed if the square is not flagged
        running = true // Set the game to running state
        clickSquare(x, y) // Click the square
        checkLose(x, y) // Check if the game is lost
        checkWin() // Check if the game is won
        displayGrid() // Update the grid display
    }
}

/**
 * Checks if the clicked square is a mine and ends the game if true.
 * @param {int} x - Horizontal position of the square.
 * @param {int} y - Vertical position of the square.
 */
function checkLose(x, y) {
    if (grid[x][y].isMine) { // If the square is a mine
        grid[x][y].isExplodedMine = true // Mark the mine as exploded
        document.getElementById("smiley").src = "img/dead.png" // Update the smiley face to dead
        // Reveal all mines
        for (let i = 0; i < difficulty.rows; i++) {
            for (let j = 0; j < difficulty.cols; j++) {
                if (grid[i][j].isMine) {
                    grid[i][j].isFlagged = false
                    grid[i][j].isClicked = true
                }
            }
        }
        playing = false // Set the game state to not playing
        stopTimer() // Stop the game timer
    }
}

/**
 * Checks if the player has won the game.
 */
function checkWin() {
    if (playing && noTilesLeft()) { // If the game is still active and there are no tiles left to reveal
        document.getElementById("smiley").src = "img/win.png" // Update the smiley face to win
        for (let i = 0; i < difficulty.rows; i++) {
            for (let j = 0; j < difficulty.cols; j++) {
                let el = grid[i][j]
                if (el.isMine) {
                    el.isFlagged = true // Flag all mines
                }
            }
        }
        playing = false // Set the game state to not playing
        stopTimer() // Stop the game timer
    }
}

/**
 * Checks if there are no mines left to click and ends the game.
 * @returns {boolean} true if you won, or false if the game isn't finished yet.
 */
function noTilesLeft() {
    for (let i = 0; i < difficulty.rows; i++) {
        for (let j = 0; j < difficulty.cols; j++) {
            let el = grid[i][j]
            if (!el.isMine && !el.isClicked) { // If there are still non-mine squares that are not clicked
                return false
            }
        }
    }
    return true // All non-mine squares are clicked
}

/**
 * Adds or removes a flag from a square.
 * @param {int} x - Horizontal position of the square.
 * @param {int} y - Vertical position of the square.
 */
function flagButton(x, y) {
    if (!grid[x][y].isClicked) { // Only allow flagging if the square is not clicked
        grid[x][y].isFlagged = !grid[x][y].isFlagged // Toggle the flag status
        displayGrid() // Update the grid display
    }
    updateFlagCounter() // Update the flag counter
}

/**
 * Updates the counter to the number of unflagged mines.
 */
function updateFlagCounter() {
    let mines_unflagged = difficulty.mines // Start with the total number of mines
    for (let i = 0; i < difficulty.rows; i++) {
        for (let j = 0; j < difficulty.cols; j++) {
            if (grid[i][j].isFlagged) {
                mines_unflagged-- // Decrease count for each flagged square
            }
        }
    }
    let str = mines_unflagged.toString() // Convert the count to a string

    let mines = ["0", "0", "0"] // Initialize an array to hold the digits
    // Fill the array based on the length of the count string
    switch (str.length) {
        case 1:
            mines[2] = str
            break
        case 2:
            mines[1] = str[0]
            mines[2] = str[1]
            break
        case 3:
            mines[0] = str[0]
            mines[1] = str[1]
            mines[2] = str[2]
            break
        case 4: // Handle the case where the count is negative
            mines[0] = str[1]
            mines[1] = str[2]
            mines[2] = str[3]
    }

    // Update the display of the flag counter
    for (let i = 0; i < 3; i++) {
        document.getElementById("flags" + i).src = "img/digits/digit" + mines[i] + ".png"
    }
}

/**
 * Makes the game impossible to win by ensuring the first click is on a mine.
 */
function feelingLucky() {
    unlucky = true // Activate the unlucky flag
    toggleHelp() // Close the help window if open
}

/**
 * Starts the game.
 */
function startGame() {
    playing = true // Set the game state to playing
    firstClick = true // Reset the first click flag
    createGrid() // Create the grid
    placeMines() // Place the mines
    countNeighborMines() // Count neighboring mines for each square
    updateFlagCounter() // Update the flag counter
    displayGrid() // Display the grid
}

/**
 * Resets the game.
 */
function resetGame() {
    resetTimer() // Reset the game timer
    document.getElementById("smiley").src = "img/ok.png" // Reset the smiley face
    startGame() // Start a new game
}

// Initialize the game when the script is loaded
startGame()
