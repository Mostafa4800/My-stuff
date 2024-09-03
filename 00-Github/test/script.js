let acc = [];
let loggedInUser;
let time;
let loggedIn = false;
let message = "";
const musicLibrary = [{
        name: "Golden hour - JVKE",
        audioFile: "assets/goldenhour.mp3",
        banner: "assets/goldenhour.jpeg"
    },
    {
        name: "Viva la Vida - Cold Play",
        audioFile: "assets/Viva la Vida.mp3",
        banner: "assets/Viva la Vida.jpeg"
    },
];

document.addEventListener('DOMContentLoaded', function() {
    acc = getItem('acc') || [];
    acc.forEach(user => {
        if (!user.likedSongs) {
            user.likedSongs = [];
        }
    });
    saveItem('acc', acc);
    showLoginContainer();
    setInterval(updateTime, 1000);
});

function updateTime() {
    const currentDate = new Date();
    time = currentDate.toLocaleTimeString();
    document.getElementById('time').innerText = time;
}

function showLoginContainer() {
    document.getElementById('loginContainer').style.display = 'block';
    document.getElementById('loggedInContainer').style.display = 'none';
}

function showLoggedInContainer(username) {
    console.log(username); // Check if the username is logged correctly
    document.getElementById('loginContainer').style.display = 'none';
    document.getElementById('loggedInContainer').style.display = 'block';

    // Set the username in both loggedInMessage and loggedInUsername
    document.getElementById('loggedInMessage').innerText = `Logged in as: ${username}`;
    document.getElementById('loggedInUsername').innerText = `${username}`;

    displayLikedSongs();

    // Add the loggedIn class to the body to show the #navbarDropdown
    document.body.classList.add('loggedIn');
}


function storeUserData(name, password) {
    const hashedPassword = hashPassword(password);
    acc.push({ "name": name, "pass": hashedPassword, "likedSongs": [] });
    saveItem('acc', acc);
}

function displayLikedSongs() {
    const likedSongsContainer = document.getElementById('likedSongs');
    likedSongsContainer.innerHTML = ''; // Clear the container

    musicLibrary.forEach(song => {
        const isLiked = acc.find(user => user.name === loggedInUser && user.likedSongs.includes(song.name));
        const likeButton = `<button data-song="${song.name}" onclick="toggleLike('${song.name}')">${isLiked ? 'Unlike' : 'Like'}</button>`;
        const songElement = document.createElement('div');
        songElement.classList.add('song-container');
        songElement.innerHTML = `
            <img src="${song.banner}" alt="${song.name} Banner" class="song-banner">
            <div class="song-details">
                <p>${song.name}</p>
                <audio controls id="${song.name.replace(/ /g, '_')}-audio">
                    <source src="${song.audioFile}" type="audio/mp3">
                    Your browser does not support the audio element.
                </audio>
                ${likeButton}
            </div>
        `;
        likedSongsContainer.appendChild(songElement);

        // Set the playback time if the song is liked
        if (isLiked) {
            const audioElement = document.getElementById(`${song.name.replace(/ /g, '_')}-audio`);
            audioElement.currentTime = acc.find(user => user.name === loggedInUser).likedSongsTimestamp[song.name];
        }
    });
}




function toggleLike(songName) {
    const user = acc.find(user => user.name === loggedInUser);
    const index = user.likedSongs.indexOf(songName);

    if (index === -1) {
        user.likedSongs.push(songName);
    } else {
        user.likedSongs.splice(index, 1);
    }

    saveItem('acc', acc);
    // Update only the like button text without refreshing the entire HTML
    const likeButton = document.querySelector(`[data-song="${songName}"]`);
    likeButton.innerText = user.likedSongs.includes(songName) ? 'Unlike' : 'Like';
}




function checkLogin() {
    const enteredUsername = document.getElementById('username').value;
    const enteredPassword = document.getElementById('password').value;

    const user = acc.find(user => user.name === enteredUsername);

    if (user) {
        hashPassword(enteredPassword)
            .then(hashedPassword => {
                if (hashedPassword === user.pass) {
                    loggedIn = true;
                    loggedInUser = enteredUsername; // Set the global variable for the logged-in user
                    showLoggedInContainer(loggedInUser);
                    clearLoginErrors(); // Clear login errors
                    // Display the success message in a full-screen overlay
                    showFullScreenMessage(`Successfully logged in as ${enteredUsername}!`);
                    // Set a timer to clear the message and hide overlay after 3 seconds
                    setTimeout(hideFullScreenMessage, 3000);
                    console.log(acc);
                } else {
                    loggedIn = false;
                    showLoginErrors("Login failed. Please check your credentials.");
                    console.log(acc);
                }
            })
            .catch(error => console.error(error));
    } else {
        loggedIn = false;
        showLoginErrors("Login failed. Please check your credentials.");
        console.log(acc);
    }
}

// Modify signUp function
function signUp() {
    const enteredUsername = document.getElementById('username').value;
    const enteredPassword = document.getElementById('password').value;

    if (!acc.find(user => user.name === enteredUsername)) {
        storeUserData(enteredUsername, enteredPassword)
            .then(() => {
                loggedInUser = enteredUsername; // Set the global variable for the logged-in user
                loggedIn = true;
                showLoggedInContainer(loggedInUser);
                clearLoginErrors(); // Clear login errors
                // Display the success message in a full-screen overlay
                showFullScreenMessage(`Successfully signed up and logged in as ${enteredUsername}!`);
                // Set a timer to clear the message and hide overlay after 3 seconds (adjust as needed)
                setTimeout(hideFullScreenMessage, 3000);

                // Call displayLikedSongs after the user data is successfully stored
                displayLikedSongs();
            })
            .catch(error => console.error(error));
    } else {
        loggedIn = false;
        showLoginErrors("Username already exists. Please choose a different username.");
    }
}

// Add a function to clear login errors
function clearLoginErrors() {
    document.getElementById('loginError').innerText = '';
}

// Add a function to display login errors
function showLoginErrors(errorMessage) {
    document.getElementById('loginError').innerText = errorMessage;
}



function showFullScreenMessage(message) {
    // Display the message in a full-screen overlay
    document.getElementById('fullScreenMessage').innerText = message;
    document.getElementById('fullScreenMessage').style.display = 'flex';
}

function hideFullScreenMessage() {
    // Clear the message and hide the full-screen overlay
    document.getElementById('fullScreenMessage').style.display = 'none';
    document.getElementById('fullScreenMessage').innerText = '';
}

function clearMessage() {
    // Clear the message and hide the containers
    message = "";
    document.getElementById('message').innerText = message;
    document.getElementById('loggedInContainer').style.display = 'none';
    document.getElementById('loginContainer').style.display = 'block';
    // Show the login form again
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    document.getElementById('username').style.display = 'block';
    document.getElementById('password').style.display = 'block';
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('username').focus(); // Focus on the username input
}


// random hashing program i found in stack overflow
function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);

    return crypto.subtle.digest('SHA-256', data)
        .then(hashBuffer => {
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            return hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
        });
}

// random hashing program i found in stack overflow
function storeUserData(name, password) {
    // Hash the password using SHA-256
    return hashPassword(password)
        .then(hashedPassword => {
            acc.push({ "name": name, "pass": hashedPassword, "likedSongs": [] });
            saveItem('acc', acc);
        });
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

function toggleNavbar() {
    const navbarOptions = document.getElementById('navbarOptions');
    navbarOptions.style.display = navbarOptions.style.display === 'none' ? 'block' : 'none';
}

function showLoggedInContainer(username) {
    document.getElementById('loginContainer').style.display = 'none';
    document.getElementById('loggedInContainer').style.display = 'block';
    document.getElementById('loggedInMessage').innerText = `Logged in as: ${username}`;
    displayLikedSongs();

    // Add the loggedIn class to the body to show the #navbarDropdown
    document.body.classList.add('loggedIn');
}

function logout() {
    loggedIn = false;
    loggedInUser = '';
    showLoginContainer();

    // Remove the loggedIn class to hide the #navbarDropdown
    document.body.classList.remove('loggedIn');
}

function deleteAccount() {
    // delete account logic 
    const userIndex = acc.findIndex(user => user.name === loggedInUser);
    if (userIndex !== -1) {
        acc.splice(userIndex, 1);
        saveItem('acc', acc);
        loggedIn = false;
        loggedInUser = '';
        showLoginContainer();


        // Remove the loggedIn class to hide the #navbarDropdown
        document.body.classList.remove('loggedIn');
    }
}