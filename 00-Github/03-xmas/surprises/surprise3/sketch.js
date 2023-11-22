let player1;
let player2;
let y;
let x;
const speed = 10;
let score1 = 0;
let score2 = 0;
let start;
let p1Win;
let p2Win;
let pressT;
var scoreSound;
let ellipseStartR = 1920;
let ellipseEndR = 0;
let backButton;
let fadeSpeed = 10;

function preload() {
    scoreSound = loadSound("Score.mp3");
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    allSprites.collider = 'static';

    y = height;
    x = width;

    wallTop = new Sprite(width / 2, 0, width, 2);
    wallTop.color = 'white';

    wallBottom = new Sprite(width / 2, height, width, 2);
    wallBottom.color = 'white';

    player1 = new Sprite();
    player1.color = 'Blue';
    player1.w = 10;
    player1.h = height * 0.2;
    player1.pos = { x: width * 0.1, y: height / 2 };

    player2 = new Sprite();
    player2.color = 'Red';
    player2.w = 10;
    player2.h = height * 0.2;
    player2.pos = { x: width * 0.9, y: height / 2 };

    s1 = new Sprite();
    s1.textColor = "white";
    s1.color = "black";
    s1.textSize = width * 0.03;
    s1.pos = { x: width * 0.2, y: height * 0.1 };
    s1.stroke = "black";
    s1.collider = 'none';

    s2 = new Sprite();
    s2.textColor = "white";
    s2.color = "black";
    s2.textSize = width * 0.03;
    s2.pos = { x: width * 0.8, y: height * 0.1 };
    s2.stroke = "black";
    s2.collider = 'none';

    start = new Sprite();
    start.textColor = "white";
    start.color = "black";
    start.textSize = width * 0.05;
    start.pos = { x: width / 2, y: height / 2 - height * 0.1 };
    start.text = 'Press T to start a game';
    start.stroke = "black";
    start.collider = 'none';
    start.visible = true;

    p1Win = new Sprite();
    p1Win.textColor = "blue";
    p1Win.color = "black";
    p1Win.textSize = width * 0.05;
    p1Win.pos = { x: width / 2, y: height / 2 - height * 0.15 };
    p1Win.text = 'Player 1 Wins';
    p1Win.stroke = "black";
    p1Win.collider = 'none';
    p1Win.visible = false;

    p2Win = new Sprite();
    p2Win.textColor = "Red";
    p2Win.color = "black";
    p2Win.textSize = width * 0.05;
    p2Win.pos = { x: width / 2, y: height / 2 - height * 0.15 };
    p2Win.text = 'Player 2 Wins';
    p2Win.stroke = "black";
    p2Win.collider = 'none';
    p2Win.visible = false;

    pressT = new Sprite();
    pressT.textColor = "white";
    pressT.color = "black";
    pressT.textSize = width * 0.05;
    pressT.pos = { x: width / 2, y: height / 2 - height * 0.1 };
    pressT.text = 'Press T to start a new game';
    pressT.stroke = "black";
    pressT.collider = 'none';
    pressT.visible = false;

    ball = new Sprite(width / 2, height / 2, width * 0.015, width * 0.015, 'dynamic');

    ball.collide(player1, () => {
        ball.direction -= (ball.y - player1.y) * 0.5;
        ball.speed = speed;
    });

    ball.collide(player2, () => {
        ball.direction += (ball.y - player2.y) * 0.5;
        ball.speed = speed;
    });

    ball.bounciness = 1;
    ball.rotationLock = true;
    ball.speed = 0;
    ball.friction = 0;
    ball.color = 'white';

    backButton = createButton("Go back");
    backButton.position(20, 20);
    backButton.hide();
    backButton.mousePressed(goBack);
}

function draw() {
    clear();
    background(0);

    if (start.visible == true && kb.pressing('t')) {
        start.visible = false;
        ball.speed = speed;
    }

    s1.text = score1;
    s2.text = score2;

    if (kb.pressing('w') && player1.y > wallTop.y) {
        player1.y -= height * 0.03;
    } else if (kb.pressing('s') && player1.y < wallBottom.x) {
        player1.y += height * 0.03;
    }

    if (kb.pressing('i') && player2.y > wallTop.y) {
        player2.y -= height * 0.03;
    } else if (kb.pressing('k') && player2.y < wallBottom.x) {
        player2.y += height * 0.03;
    }

    if (ball.x < -width * 0.1) {
        ball.direction = 0;
        score2 += 1;
        scoreSound.play();
    } else if (ball.x > width + width * 0.1) {
        ball.direction = 180;
        score1 += 1;
        scoreSound.play();
    }

    if (ball.x < -width * 0.1 || ball.x > width + width * 0.1) {
        ball.x = width / 2;
        ball.y = height / 2;
        ball.speed = speed;
    }

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

    if (ellipseStartR > 0) {
        fill("red");
        ellipse(width / 2, height / 2, ellipseStartR);
        ellipseStartR -= fadeSpeed;

        // If the circle is fully drawn, show the button
        if (ellipseStartR <= 0) {
            backButton.show();
        }
    }
}

function goBack() {
    backButton.hide();
    if (ellipseEndR < width) {

        fill("red");
        ellipse(width / 2, height / 2, ellipseEndR);
        ellipseEndR += 10;
        requestAnimationFrame(goBack);
    } else {
        window.location.href = "../../index.html";
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}