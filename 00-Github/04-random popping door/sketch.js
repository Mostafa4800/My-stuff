let doorContent;
let speed = 20;
let popSound;
let doors = []

function preload() {
    popSound = loadSound("pop.mp3");
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    for (let i = 0; i < 40; i += 1) {
        let photo = doorContent;

        // Randomly generate non-overlapping positions
        let overlapping = true;
        let attemptCount = 0;
        let newDoorX, newDoorY, newRadius;

        while (overlapping && attemptCount < 100000) {
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
        doors.push(new Door(newDoorX, newDoorY, newRadius, newRadius, photo, i + 1)); // Assign a unique number (i + 1) to each door
    }
}

function draw() {
    background(220);


    // Draw doors that are not being clicked
    for (let i = 0; i < doors.length; i++) {
        if (!doors[i].doorOpen) {
            doors[i].display();
        }
    }

    // pop the door when its true
    for (i = doors.length - 1; i >= 0; i--) {
        if (doors[i].doorOpen) {
            doors.splice(i, 1); // Remove the element at index i
            console.log(doors);

            popSound.play()
        }
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
    constructor(x, y, radius, dRadius, photo, id) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.newRadius = dRadius;
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
            fill("red")
            ellipse(this.x, this.y, this.radius * 2);
            fill("black");
            textAlign(CENTER, CENTER);
            textSize(24);
            // text(`${this.id}`, this.x, this.y);
        } else {
            fill(random(0, 255), random(0, 255), random(0, 255), random(0, 255));
            ellipse(this.x, this.y, this.radius * 2);
            fill("black");
            textAlign(CENTER, CENTER);
            textSize(24);
            //text(` Door ${this.id} is closed`, this.x, this.y);
            if (this.radius > this.newRadius) {
                this.radius -= 10;
            }
        }
    }
}