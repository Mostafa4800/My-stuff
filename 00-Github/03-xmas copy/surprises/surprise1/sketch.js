let ellipseStartR = 0;
let doorContent;
let speed = 20;
let doors = []
let correctDoor; // Variable to store the correct door number

function setup() {
    createCanvas(windowWidth, windowHeight);

    // Choose a random correct door
    correctDoor = Math.floor(Math.random() * 35) + 1;

    for (let i = 0; i < 35; i += 1) {
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

    // Draw the expanding door last
    for (let i = 0; i < doors.length; i++) {
        if (doors[i].doorOpen) {
            doors[i].display();

            if (doors[i].id === correctDoor) {
                // Redirect the user
                location.href = "../surprise2/index.html";
            } else {
                // Display "you lost" message
                fill("black");
                textAlign(CENTER, CENTER);
                textSize(32);
                text("You lost!", width / 2, height / 2);

                                // redirect the page after 1 seconds
                                setTimeout(function() {
                                    location.href = "../../index.html";
                                   }, 1000);
            }
        }
    }

    // This code is just to make it more convenient when switched from page to page
    if (ellipseStartR > 0) {
        fill("red");
        ellipse(width / 2, height / 2, ellipseStartR);
        ellipseStartR -= speed;
    }

    console.log(correctDoor)

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
            this.radius = 1920;
            ellipse(this.x, this.y, this.radius * 2);
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
            if (this.radius > this.newRadius) {
                this.radius -= 10;
            }
        }
    }
}