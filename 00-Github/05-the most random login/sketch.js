let acc = [];
let time;
let loggedIn = false;
let loginButton, signupButton;
let usernameInput, passwordInput;
let message = "";
let backgroundImg;

function preload() {
    backgroundImg = loadImage("back1.png");
}

function setup() {
    textFont('Courier New')
        //makes sure that the size of the windowwidth and height utilizes your whole screen
    createCanvas(windowWidth, windowHeight);


    // Create login and signup buttons
    loginButton = createButton('Login');
    loginButton.mousePressed(checkLogin);

    signupButton = createButton('Sign Up');
    signupButton.mousePressed(signUp);

    // Create input fields
    usernameInput = createInput().attribute('placeholder', 'Username').position(width / 2 - 100, height / 2 - 40).size(200, 20);

    passwordInput = createInput('', 'password').attribute('placeholder', 'Password').position(width / 2 - 100, height / 2).size(200, 20);

    acc = JSON.parse(localStorage.getItem('acc')) || [];
    // Log acc data to console, i know its completely stupid for safety but. ihad to see if it works or not
    console.log("acc data:", acc);
}

function draw() {
    textFont('Courier New')

    //timer
    time = nf(hour(), 2) + ":" + nf(minute(), 2) + ":" + nf(second(), 2);
    //draws a background
    background(220);

    // Draw the background image
    image(backgroundImg, 0, 0, width, height);

    textAlign(CENTER, CENTER);
    fill(0);
    textSize(16);
    //texts message position
    text(message, width / 2, height / 2 - 80);



    //checks if the user is logged in
    if (!loggedIn) {
        textSize(20);
        fill("black")
        text("Login or Sign Up", width / 2, height / 2 - 60);
        //timer text
        fill(225, 112, 85, 180)
        textSize(80)
        text(time, width / 2, height / 8);
    } else {
        fill(225, 112, 85, 180)
        textSize(20);
        textAlign(RIGHT, TOP)
        text(time, windowWidth, 0);
        textAlign(LEFT, TOP)
        text("Logged in as: " + usernameInput.value(), 0, 0);
        usernameInput.hide();
        passwordInput.hide();
        loginButton.hide();
        signupButton.hide();
    }


    //the reason to why i put the positions here is so that it can update for whenever u rezize ur screen or whatsoever
    usernameInput.position(width / 2 - 100, height / 2 - 40)
    passwordInput.position(width / 2 - 100, height / 2)
    loginButton.position(width / 2 - 60, height / 2 + 40);
    signupButton.position(width / 2 + 0, height / 2 + 40);
}

function hashPassword(password) {
    // simple hashing algorithm Base64
    return btoa(password);
}

function storeUserData(name, password) {
    // Hash the password before storing it
    const hashedPassword = hashPassword(password);
    acc.push({
        "name": name,
        "pass": hashedPassword,
    });
    localStorage.setItem('acc', JSON.stringify(acc));
}

function checkLogin() {
    const enteredUsername = usernameInput.value();
    const enteredPassword = passwordInput.value();

    const user = acc.find(user => user.name === enteredUsername && hashPassword(enteredPassword) === user.pass);

    //checks if the user logged in if he did he will be able to access the library
    if (user) {
        loggedIn = true;
        message = `Successfully logged in as ${enteredUsername}!`;
    } else {
        loggedIn = false;
        message = "Login failed. Please check your credentials.";
    }
}

function signUp() {
    const enteredUsername = usernameInput.value();
    const enteredPassword = passwordInput.value();

    // Check if the username is not already taken
    if (!acc.find(user => user.name === enteredUsername)) {
        storeUserData(enteredUsername, enteredPassword);
        loggedIn = true;

        message = `Successfully signed up and logged in as ${enteredUsername}!`;

        setTimeout(message = ``, 1000)
    } else {
        loggedIn = false;

        message = "Username already exists. Please choose a different username.";
    }
    // Log acc data to console
    console.log("acc data:", acc);
}

// Save data to localStorage
function saveItem(key, item) {
    localStorage.setItem(key, JSON.stringify(item));
}

// Load data from localStorage
function getItem(key) {
    const data = localStorage.getItem(key);
    return JSON.parse(data || '[]');
}

// Resize the canvas when the
// browser's size changes.
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);

}