let doorContent;
let doorX = 40;
let doorY = 40;
let doors = [];
let radius = 40;
let surprise = [{
        "type": "image",
        "url": "jul.jpg"
    },
    {
        "type": "video",
        "url": "christmas.avi"
    },
    {
        "type": "image",
        "url": "winter.png"
    },
]


function preload() {
    doorContent = loadImage("assets/img1.PNG");
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    // Create a number of doors
    for (let i = 0; i < 24; i += 1) {
        let photo = doorContent;
        // Create a door and add it to the array
        doors.push(new Door(doorX, doorY, radius, photo));
        doorX += radius * 2;
        if (doorX > width - radius * 2) {
            doorX = radius;
            doorY += 80;
        }
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

class Door {
    constructor(x, y, radius, photo) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.photo = photo;
        this.doorOpen = false; // Each door has its own state
    }

    valueChecker() {
        this.doorOpen = !this.doorOpen;
        console.log(this.doorOpen);
    }

    display() {
        if (this.doorOpen) {
            image(this.photo, this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
            text("door is open", 20, 20);
        } else {
            fill("red");
            ellipse(this.x, this.y, this.radius * 2);
            fill("black");
            text("door is closed", 20, 20);
        }
    }
}