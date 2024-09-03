// Bird function
function Bird() {
    // Vertical position of the bird on the screen
    this.y = height / 2;
    // Horizontal position of the bird on the screen
    this.x = 64;
  
    // Constants for bird physics
    this.gravity = 0.7; // Acceleration due to gravity
    this.lift = -12;    // Upward force applied when the bird jumps
  
    // Variable for current vertical velocity of the bird
    this.velocity = 0;
  
    // Method to draw the bird as a white ellipse on the screen
    this.show = function() {
      fill(255); // White color
      ellipse(this.x, this.y, 32, 32); // Draw bird as ellipse
    };
  
    // Method to make the bird jump
    this.up = function() {
      // Only allow jumping if velocity is not too high
      if (this.velocity > -5) {
        // Reset velocity to 0 before applying lift to prevent excessive jumping
        this.velocity = 0;
        // Apply lift to velocity to simulate jump
        this.velocity += this.lift;
        console.log(this.velocity);
      } else {
        // If velocity is too high, still allow a small jump
        this.velocity += this.lift;
        console.log(this.velocity);
      }
    };
  
    // Method to update the bird's position and velocity based on the game's physics
    this.update = function() {
      // Apply gravity to velocity
      this.velocity += this.gravity;
      // Update vertical position based on velocity
      this.y += this.velocity;
  
      // Ensure the bird stays within the screen boundaries
      if (this.y > height) {
        // If bird falls below the screen, keep it at the bottom and stop its velocity
        this.y = height;
        this.velocity = 0;
      }
      if (this.y < 0) {
        // If bird moves above the screen, keep it at the top and stop its velocity
        this.y = 0;
        this.velocity = 0;
      }
    };
  }
  