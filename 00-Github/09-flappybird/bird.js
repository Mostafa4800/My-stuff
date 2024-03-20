// Bird constructor function
function Bird() {
  // Vertical position of the bird on the screen
  this.y = height / 2;
  // Horizontal position of the bird on the screen
  this.x = 64;

  // Constant for acceleration due to gravity
  this.gravity = 0.7;
  // Constant for upward force applied when the bird jumps
  this.lift = -12;
  // Variable for current vertical velocity of the bird
  this.velocity = 0;

  // Method to draw the bird as a white ellipse on the screen
  this.show = function () {
    fill(255);
    ellipse(this.x, this.y, 32, 32);
  };

  // Method to increase the bird's vertical velocity by the lift constant, simulating a jump
  this.up = function () {
    this.velocity += this.lift;
  };

  // Method to update the bird's position and velocity based on the game's physics
  this.update = function () {
    // Calculate new vertical position by adding current velocity to previous position
    this.velocity += this.gravity;
    // Update velocity based on gravity constant
    this.y += this.velocity;

    // Ensure the bird stays within the screen boundaries
    if (this.y > height) {
      this.y = height;
      this.velocity = 0;
    }
    if (this.y < 0) {
      this.y = 0;
      this.velocity = 0;
    }
  };
}



  