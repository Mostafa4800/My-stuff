let doorOpen = false;
let doorContent;
let doorX = 40;
let doorY = 40;
let doors = [];
let radius = 40;

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

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function mousePressed() {
    doorOpen = !doorOpen;
    console.log(doorOpen)
}



// Defining a Door class
class Door {
    constructor(x, y, radius, photo) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.photo = photo;


    }


    // Display the Door
    display() {


        if (doorOpen) {
            //show the content behind it
            //ellipse(this.x, this.y, this.radius * 2)
            image(this.photo, this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
            text("door is open", 20, 20)
        } else {
            fill("red")
            ellipse(this.x, this.y, this.radius * 2)
            fill("black")
            text("door is closed", 20, 20)
        }
    }


}