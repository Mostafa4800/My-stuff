let ellipseStartR = 1920;
let doorContent;
let speed = 20;
let doors = []
let surprises = [
    "surprises/surprise1/index.html",
    "surprises/surprise2/index.html",
    "surprises/surprise3/index.html",
    "surprises/surprise4/index.html",
    "surprises/surprise5/index.html",
    "surprises/surprise6/index.html",
    "surprises/surprise7/index.html",
    "surprises/surprise8/index.html",
    "surprises/surprise9/index.html",
    "surprises/surprise10/index.html",
    "surprises/surprise11/index.html",
    "surprises/surprise12/index.html",
    "surprises/surprise13/index.html",
    "surprises/surprise14/index.html",
    "surprises/surprise15/index.html",
    "surprises/surprise16/index.html",
    "surprises/surprise17/index.html",
    "surprises/surprise18/index.html",
    "surprises/surprise19/index.html",
    "surprises/surprise20/index.html",
    "surprises/surprise21/index.html",
    "surprises/surprise22/index.html",
    "surprises/surprise23/index.html",
    "surprises/surprise24/index.html"
];

function setup() {
    createCanvas(windowWidth, windowHeight);

    for (let i = 0; i < 24; i += 1) {
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

        }
        if (doors[i].radius >= (width + height) / 1.5) {
            location.href = surprises[i]
        }
    }

    // This code is just to make it more convenient when switched from page to page
    if (ellipseStartR > 0) {
        fill("red");
        ellipse(width / 2, height / 2, ellipseStartR);
        ellipseStartR -= speed;
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
            if (this.radius < (width + height) / 1.5) {
                this.radius += speed;
            }
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