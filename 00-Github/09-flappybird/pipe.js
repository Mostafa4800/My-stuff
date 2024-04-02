// function for Pipe
function Pipe() {
    // Properties
    this.spacing = 175; // Space between top and bottom pipes
    this.top = random(height / 6, 3 / 4 * height); // Top y-coordinate of top pipe
    this.bottom = height - (this.top + this.spacing); // Bottom y-coordinate of bottom pipe
    this.x = width; // Initial x-coordinate of the pipe
    this.w = 80; // Width of the pipe
    this.speed = 10; // Speed of pipe movement
    this.highlight = false; // Indicates if the pipe is highlighted

// Check if the bird hits the pipe
this.hits = function(bird) {  
    // Check if the bird's y-coordinate is above the top of the pipe or below the bottom of the pipe
    if (bird.y < this.top || bird.y > height - this.bottom) {
        // Check if the bird's x-coordinate is within the horizontal range of the pipe
        if (bird.x > this.x && bird.x < this.x + this.w) {
            // If both conditions are met, it means the bird is inside the pipe
            // Set this.highlight to true to highlight the pipe
            this.highlight = true;
            // Return true indicating the bird hit the pipe
            return true;
        }
    }
    // If the bird doesn't meet both conditions, it means it didn't hit the pipe
    // Set this.highlight to false to remove any highlight
    this.highlight = false;
    // Return false indicating the bird didn't hit the pipe
    return false;
}


    // Method: Draw the pipe on the canvas
    this.show = function() {
        fill(255);
        if (this.highlight) {
            fill(255, 0, 0); // Change color to red if highlighted
        }
        rect(this.x, 0, this.w, this.top); // Draw top pipe
        rect(this.x, height - this.bottom, this.w, this.bottom); // Draw bottom pipe
    }

    // Method: Update the position of the pipe
    this.update = function() {
        this.x -= this.speed; // Move the pipe to the left
    }

    // Method: Check if the pipe is offscreen
    this.offscreen = function() {
        return this.x < -this.w; // Return true if pipe is offscreen
    }
}
