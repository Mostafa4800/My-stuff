let doorContent;
let doors = [];

function preload() {
    doorContent = loadImage("assets/img1.PNG");
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    for (let i = 0; i < 24; i += 1) {
        let photo = doorContent;

        // Randomly generate non-overlapping positions
        let overlapping = true;
        let attemptCount = 0;
        let newDoorX, newDoorY, newRadius;

        while (overlapping && attemptCount < 100) {
            newRadius = random(60, 80); // Adjust the range for random sizes
            newDoorX = random(newRadius, width - newRadius);
            newDoorY = random(newRadius, height - newRadius);

            // Check for overlaps with existing doors
            overlapping = doors.some(door => {
                let distance = dist(newDoorX, newDoorY, door.x, door.y);
                return distance < newRadius + door.radius;
            });

            attemptCount++;
        }

        // Create a door and add it to the array
        doors.push(new Door(newDoorX, newDoorY, newRadius, photo, i + 1)); // Assign a unique number (i + 1) to each door
    }
}

function draw() {
    background(220);

    for (let i = 0; i < doors.length; i++) {
        doors[i].display();
    }
}

function mousePressed() {
    // Check if the mouse is pressed over any door
    for (let i = 0; i < doors.length; i++) {
        // Check if the mouse is inside the current door
        let d = dist(mouseX, mouseY, doors[i].x, doors[i].y);
        if (d < doors[i].radius) {
            doors[i].valueChecker(); // Toggle the value for the clicked door
        }
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);

}


class Door {
    constructor(x, y, radius, photo, id) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.photo = photo;
        this.doorOpen = false;
        this.id = id; // Assign a unique number to each door
    }

    valueChecker() {
        this.doorOpen = !this.doorOpen;
        console.log(`Door ${this.id} is open: ${this.doorOpen}`);
    }

    display() {
        if (this.doorOpen) {
            image(this.photo, this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
            fill("black");
            textAlign(CENTER, CENTER);
            textSize(24);
            // text(`${this.id}`, this.x, this.y);
        } else {
            fill("red");
            ellipse(this.x, this.y, this.radius * 2);
            fill("black");
            textAlign(CENTER, CENTER);
            textSize(24);
            text(` Door ${this.id}`, this.x, this.y);
        }
    }
}