/**
 * Displays the game grid
 * Should be called on every change in the grid
 */
function displayGrid() {
    // Get the table element with id 'grid'
    let table = document.getElementById('grid');

    // Clear the table if it has any child nodes
    if (table.hasChildNodes) {
        table.innerHTML = "";
    }

    // Loop through each row based on the difficulty setting
    for (let i = 0; i < difficulty.rows; i++) {
        // Create a new table row element
        let t_row = document.createElement('tr');
        
        // Loop through each column based on the difficulty setting
        for (let j = 0; j < difficulty.cols; j++) {
            // Create a new table data cell element
            let t_data = document.createElement('td');
            // Create a new button element
            let button = document.createElement('button');

            // Add a CSS class to the button for styling
            button.classList.add("field_button");

            // Add event listeners if the game is in progress
            if (playing) {
                // Left click event
                button.setAttribute("onclick", "clickButton(" + i + ", " + j + ")");
                // Right click event (to flag a mine)
                button.setAttribute("oncontextmenu", "flagButton(" + i + ", " + j + "); return false;");
                // Change smiley face image on mouse down
                button.setAttribute("onmousedown", 'smiley("img/wow.png")');
                // Change smiley face image on mouse up
                button.setAttribute("onmouseup", 'smiley("img/ok.png")');
            }

            // Add flagged styling if the cell is flagged
            if (grid[i][j].isFlagged) {
                button.classList.add("field_button_flagged");
            }

            // If the cell has been clicked
            if (grid[i][j].isClicked) {
                // If the cell is a mine
                if (grid[i][j].isMine) {
                    button.classList.add("field_button");
                    button.classList.add("field_button_mine");
                    // If the mine exploded, set the background color to red
                    if (grid[i][j].isExplodedMine) {
                        button.setAttribute("style", "background-color: red");
                    }
                } else if (grid[i][j].numNeighborMines == 0) {
                    // If the cell has no neighboring mines, style it as empty
                    button.classList.remove("field_button");
                    button.classList.add("field_button_empty");
                }

                // If the cell has neighboring mines, display the number
                if (grid[i][j].numNeighborMines > 0) {
                    button.classList.remove("field_button");
                    // Add an image to the button showing the number of neighboring mines
                    let img = document.createElement('img');
                    img.src = "img/num_of_neighbors/open" + grid[i][j].numNeighborMines + ".png";
                    button.classList.add("field_button_img");
                    button.appendChild(img);
                }
            }

            // Append the button to the table data cell
            t_data.appendChild(button);
            // Append the table data cell to the table row
            t_row.appendChild(t_data);
        }

        // Append the table row to the table
        table.appendChild(t_row);
    }
}

/**
 * Hides or shows the game window
 */
function closeWindow() {
    // Reset the game state
    resetGame();
    unlucky = false;
    // Get the game window element
    let window = document.getElementById("game_window");
    // Toggle the hidden class to show/hide the window
    window.classList.toggle("hidden");
    // Set the difficulty to easy by default
    difficulty = difficulty_presets.easy;

    // Change the start button image based on the window visibility
    if (window.classList.contains("hidden")) {
        document.getElementById("start").src = "img/taskbar_left_inactive.png";
    } else {
        document.getElementById("start").src = "img/taskbar_left_active.png";
        startGame();
    }
}

/**
 * Change the picture of the smiley face
 * @param {string} img Path to image
 */
function smiley(img) {
    // Change the src attribute of the smiley face image
    document.getElementById("smiley").src = img;
}

/**
 * Updates the time in the bottom right corner
 * Called once on page load
 */
function displayTime() {
    // Get the current date and time
    const date = new Date();
    // Format the hours and minutes
    let h = ("0" + date.getHours()).slice(-2);
    let m = ("0" + date.getMinutes()).slice(-2);
    // Combine hours and minutes into a time string
    time = (h + ":" + m);
    // Update the clock element with the formatted time
    document.getElementById("clock").innerHTML = time;
    // Call displayTime again after 2000 milliseconds (2 seconds)
    setTimeout(displayTime, 2000);
}

/**
 * Opens a dropdown for selecting difficulty
 */
function enableDropdown() {
    // Get the dropdown element
    let dropdown = document.getElementById("difficulty_dropdown");
    // Toggle the show class to open/close the dropdown
    dropdown.classList.toggle("show");
    // Get all button elements within the dropdown
    let buttons = dropdown.querySelectorAll("button");

    // Loop through each button
    for (const i in buttons) {
        if (Object.hasOwnProperty.call(buttons, i)) {
            const element = buttons[i];
            // Disable the button if the screen is too small for the difficulty level
            if (element.innerHTML == "Intermediate" && window.innerWidth < 375 || element.innerHTML == "Expert" && window.innerWidth < 684) {
                element.disabled = true;
            } else {
                element.disabled = false;
            }

            // Add a checkmark to the current difficulty level
            if (element.innerHTML == difficulty.name) {
                element.classList.add("checkmark");
            } else {
                element.classList.remove("checkmark");
            }
        }
    }
}

/**
 * Close the dropdown if the user clicks outside of it
 * Source: https://www.w3schools.com/howto/howto_js_dropdown.asp
 */
window.onclick = function (event) {
    // If the click is not on the difficulty button, close the dropdown
    if (!event.target.matches('#difficulty_button')) {
        let dropdowns = document.getElementsByClassName("dropdown-content");
        for (let i = 0; i < dropdowns.length; i++) {
            let openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

/**
 * Changes to easier difficulty if the window is too small
 * Called automatically when the window is resized
 */
window.onresize = function () {
    // If the window width is less than the current difficulty width
    if (window.innerWidth < difficulty.width) {
        // Change to easier difficulty based on current difficulty
        switch (difficulty.name) {
            case "Intermediate":
                difficulty = difficulty_presets.easy;
                break;
            case "Expert":
                difficulty = difficulty_presets.intermediate;
        }
        // Reset the game to apply the new difficulty
        resetGame();
    }
}

/**
 * Pauses the game and hides the game window
 * Called when the user clicks the minimize button or taskbar icon
 */
function toggleWindowVisibility() {
    // Get the game window element
    let window = document.getElementById("game_window");
    // Toggle the hidden class to show/hide the window
    window.classList.toggle("hidden");

    // Change the start button image based on the window visibility
    if (window.classList.contains("hidden")) {
        document.getElementById("start").src = "img/taskbar_left_inactive.png";
        running = false;
    } else {
        document.getElementById("start").src = "img/taskbar_left_active.png";
        // Resume the game if it was running before
        if (playing && !firstClick) {
            running = true;
        } else if (playing && firstClick) {
            // Ensure the window is correctly displayed after it is reopened
            resetGame();
        }
    }
}
