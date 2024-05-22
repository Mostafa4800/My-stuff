// source: https://www.geeksforgeeks.org/how-to-create-stopwatch-using-html-css-and-javascript/
// Boolean variable to track if the timer is running
let running = false;

// Start the timer
timer();

// Array to represent the timer digits: hundreds, tens, and ones
let t = [0, 0, 0];

// Function to handle the timer logic
function timer() {
    if (running) {
        // Increment the ones place
        t[2]++;
        
        // If ones place reaches 10, reset it and increment tens place
        if (t[2] == 10) {
            t[2] = 0;
            t[1]++;
            
            // If tens place reaches 10, reset it and increment hundreds place
            if (t[1] == 10) {
                t[1] = 0;
                t[0]++;
                
                // If hundreds place reaches 10, reset it
                if (t[0] == 10) {
                    t[0] = 0;
                }
            }
        }

        // Path to the digit images
        let path = "img/digits/digit";
        let ext = ".png";

        // Update the image source for each digit in the timer
        for (let i = 0; i < 3; i++) {
            document.getElementById("timer" + i).src = path + t[i] + ext;
        }
    }

    // Call the timer function again after 1000 milliseconds (1 second)
    setTimeout(timer, 1000);
}

// Function to stop the timer
function stopTimer() {
    running = false;
}

// Function to reset the timer
function resetTimer() {
    // Stop the timer
    stopTimer();
    
    // Path to the digit image for zero
    let path = "img/digits/digit0.png";

    // Reset the timer digits to zero
    t = [0, 0, 0];

    // Update the image source for each digit to zero
    for (let i = 0; i < 3; i++) {
        document.getElementById("timer" + i).src = path;
    }
}
