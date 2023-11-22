let player1;
//player 1 is on the left
let player2;
//player 2 is on the right
let y = 540;
let x = 960;
//this is the speed as the ball have been set as
const speed = 10;
//This will keep the score for Player 1
let score1 = 0;
//This will keep the score for Player 2
let score2 = 0;

//start game
let start;

//win screen p1 and p2
let p1Win;
let p2Win;
let pressT;

//scoring sound for when u get a point
var scoreSound;

let ellipseStartR = 1920;
let ellipseEndR = 0;
let backButton;

function preload() {
    scoreSound = loadSound("Score.mp3");
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    allSprites.collider = 'static';


    //top and bottom walls
    wallTop = new Sprite(width / 2, 0, width, 2);
    wallTop.color = 'white';
    wallBottom = new Sprite(width / 2, height, width, 2);
    wallBottom.color = 'white';

    player1 = new Sprite();
    player1.color = 'Blue';
    player1.w = 10;
    player1.h = 100;
    player1.pos = { x: 80, y: y / 2 };


    player2 = new Sprite();
    player2.color = 'Red';
    player2.w = 10;
    player2.h = 100;
    player2.pos = { x: 880, y: y / 2 };

    //score text display
    s1 = new Sprite();
    s1.textColor = "white";
    s1.color = "black";
    s1.textSize = 20;
    s1.pos = { x: 460, y: 80 };
    s1.stroke = "black";
    s1.collider = 'none';

    s2 = new Sprite();
    s2.textColor = "white";
    s2.color = "black";
    s2.textSize = 20;
    s2.pos = { x: 500, y: 80 };
    s2.stroke = "black";
    s2.collider = 'none';

    start = new Sprite();
    start.textColor = "white";
    start.color = "black";
    start.textSize = 40;
    start.pos = { x: x / 2, y: y / 2 - 100 };
    start.text = 'Press T to start a game';
    start.stroke = "black";
    start.collider = 'none';
    start.visible = true;

    p1Win = new Sprite();
    p1Win.textColor = "blue";
    p1Win.color = "black";
    p1Win.textSize = 40;
    p1Win.pos = { x: x / 2, y: y / 2 - 150 };
    p1Win.text = 'Player 1 Wins';
    p1Win.stroke = "black";
    p1Win.collider = 'none';
    p1Win.visible = false;

    p2Win = new Sprite();
    p2Win.textColor = "Red";
    p2Win.color = "black";
    p2Win.textSize = 40;
    p2Win.pos = { x: x / 2, y: y / 2 - 150 };
    p2Win.text = 'Player 2 Wins';
    p2Win.stroke = "black";
    p2Win.collider = 'none';
    p2Win.visible = false;

    pressT = new Sprite();
    pressT.textColor = "white";
    pressT.color = "black";
    pressT.textSize = 40;
    pressT.pos = { x: x / 2, y: y / 2 - 100 };
    pressT.text = 'Press T to start a new game';
    pressT.stroke = "black";
    pressT.collider = 'none';
    pressT.visible = false;

    ball = new Sprite(width / 2, height / 2, 10, 10, 'dynamic');

    ball.collide(player1, () => {
        ball.direction -= (ball.y - player1.y) * 0.5;
        ball.speed = speed;
    });

    ball.collide(player2, () => {
        ball.direction += (ball.y - player2.y) * 0.5;
        ball.speed = speed;
    });

    ball.diameter = 15;
    ball.bounciness = 1;
    ball.rotationLock = true;
    ball.speed = 0;
    ball.friction = 0;
    ball.color = 'white';

    // Create the button but initially hide it
    backButton = createButton("Go back");
    backButton.position(20, 20);
    backButton.hide();

    // Set up mousePressed event for the button
    backButton.mousePressed(goBack);
}




function draw() {
    clear();
    background(0);

    //start game
    if (start.visible == true && kb.pressing('t')) {
        start.visible = false;
        ball.speed = speed;
    }

    //text for point
    s1.text = score1;
    s2.text = score2;

    if (kb.pressing('w') && player1.y > wallTop.y) {
        player1.y -= 12;
    } else if (kb.pressing('s') && player1.y < wallBottom.x) {
        player1.y += 12;
    }

    if (kb.pressing('i') && player2.y > wallTop.y) {
        player2.y -= 12;
    } else if (kb.pressing('k') && player2.y < wallBottom.x) {
        player2.y += 12;
    }

    //changes direction depending on what side of the border it went out
    if (ball.x < -100) {
        //makes the ball go to the right
        ball.direction = 0;
        score2 += 1;
        scoreSound.play();
    } else if (ball.x > width + 100) {
        //Makes the ball go to the left
        ball.direction = 180;
        score1 += 1;
        scoreSound.play();
    }


    //puts back the ball in the middle when out of the border
    if (ball.x < -100 || ball.x > width + 100) {
        ball.x = width / 2;
        ball.y = height / 2;
        ball.speed = speed;
    }

    //winner scene aka score reset
    if (score1 == 5) {
        score1 = 0;
        score2 = 0;
        ball.speed = 0;
        p1Win.visible = true;
        pressT.visible = true;
    } else if (score2 == 5) {
        score1 = 0;
        score2 = 0;
        ball.speed = 0;
        p2Win.visible = true;
        pressT.visible = true;
    }

    if (pressT.visible == true && kb.pressing('t')) {
        pressT.visible = false;
        p1Win.visible = false;
        p2Win.visible = false;
        ball.speed = speed;
    }

    // This code is just to make it more convenient when switched from page to page
    if (ellipseStartR > 0) {
        fill("red");
        ellipse(width / 2, height / 2, ellipseStartR);
        ellipseStartR -= 10;

        // If the circle is fully drawn, show the button
        if (ellipseStartR <= 0) {
            backButton.show();
        }
    }

}




function goBack() {
    backButton.hide();
    if (ellipseEndR < 1920) {
        background(220); // Clear the canvas on each frame
        fill("red");
        ellipse(width / 2, height / 2, ellipseEndR);
        ellipseEndR += 10;
        requestAnimationFrame(goBack); // Call the function again on the next frame
    } else {
        window.location.href = "../../index.html";
    }
}


function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}