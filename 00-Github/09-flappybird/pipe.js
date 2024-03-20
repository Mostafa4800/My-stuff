// Pipe function creates a new pipe object with specific properties and methods
function Pipe() {

    // The spacing property sets the space between the top and bottom pipes
    this.spacing = 175;
  
    // The top property sets the top y-coordinate of the top pipe
    this.top = random(height / 6, 3 / 4 * height);
  
    // The bottom property sets the bottom y-coordinate of the bottom pipe
    this.bottom = height - (this.top + this.spacing);
  
    // The x property sets the initial x-coordinate of the pipe
    this.x = width;
  
    // The w property sets the width of the pipe
    this.w = 80;
  
    // The speed property sets the speed at which the pipe moves
    this.speed = 10;
  
    // The highlight property indicates whether the pipe is highlighted or not
    this.highlight = false;
  
    // The hits method checks if the bird hits the pipe
    this.hits = function(bird) {
      if (bird.y < this.top || bird.y > height - this.bottom) {
        if (bird.x > this.x && bird.x < this.x + this.w) {
          this.highlight = true;
          return true;
        }
      }
      this.highlight = false;
      return false;
    }
  
    // The show method draws the pipe on the canvas
    this.show = function() {
      fill(255);
      if (this.highlight) {
        fill(255, 0, 0); // Change the color to red when highlighted
      }
      rect(this.x, 0, this.w, this.top); // Draw the top pipe
      rect(this.x, height - this.bottom, this.w, this.bottom); // Draw the bottom pipe
    }
  
    // The update method updates the position of the pipe
    this.update = function() {
      this.x -= this.speed;
    }
  
    // The offscreen method checks if the pipe is offscreen
    this.offscreen = function() {
      if (this.x < -this.w) {
        return true;
      } else {
        return false;
      }
    }
  
  }