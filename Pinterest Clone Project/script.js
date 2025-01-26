const pinsContainer = document.getElementById('pins-container');
const modals = {
    'signin': document.getElementById('signin-modal'),
    'signup': document.getElementById('signup-modal'),
    'image': document.getElementById('image-modal')
};

const signInButton = document.getElementById('signin');
const signUpButton = document.getElementById('signup');
const signOutButton = document.getElementById('signout');

let isUserSignedIn = false; 
let pins = [];
let currentPage = 1;

function generatePins(page) {
    for (let i = 0; i < 15; i++) {
        const randomId = Math.floor(Math.random() * 1000);
        const pin = {
            image: `https://picsum.photos/300/200?random=${randomId}`,
            description: `Pin #${randomId}`,
            id: randomId
        };
        pins.push(pin);
        const pinElement = document.createElement('div');
        pinElement.classList.add('pin');
        pinElement.innerHTML = `
            <img src="${pin.image}" alt="${pin.description}" onclick="openImageModal(${pin.id})" onerror="this.src='https://via.placeholder.com/300x200?text=Image+Not+Found'">
            <div class="description">${pin.description}</div>
        `;
        pinsContainer.appendChild(pinElement);
    }
}

function openModal(modalName) {
    const modal = modals[modalName];
    if (modal) {
        modal.style.display = 'flex';
    }
}

function closeModal(modalName) {
    const modal = modals[modalName];
    if (modal) {
        modal.style.display = 'none';
    }
}

// Go Back Action
function goBackAction() {
    // Close the image modal when the Go Back button is clicked
    closeModal('image');
}

function openImageModal(pinId) {
    const pin = pins.find(p => p.id === pinId);
    if (pin) {
        document.getElementById('modal-image').src = pin.image;
        document.getElementById('modal-description').textContent = pin.description;

        const relatedImages = document.getElementById('related-images');
        relatedImages.innerHTML = '';

        for (let i = 0; i < 5; i++) {
            const relatedImage = document.createElement('img');
            const randomId = Math.floor(Math.random() * 1000);
            relatedImage.src = `https://picsum.photos/300/200?random=${randomId}`;
            relatedImage.onclick = () => openImageModal(randomId);
            relatedImage.style.width = '100px';
            relatedImages.appendChild(relatedImage);
        }

        openModal('image');
    }
}


function saveImage() {
    alert("Image saved!");
}

function shareImage() {
    const imageLink = document.getElementById('modal-image').src;
    prompt("Copy this image link", imageLink);
}

function signIn() {
const email = document.getElementById('signin-email').value;
const password = document.getElementById('signin-password').value;
if (email && password) {
alert(`Signed in with ${email}`);
closeModal('signin');
isUserSignedIn = true; // Use the global variable directly
toggleAuthButtons();
} else {
alert("Please enter both email and password.");
}
}


function signUp() {
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    if (email && password) {
        alert(`Signed up with ${email}`);
        closeModal('signup');
        isUserSignedIn = true;
        toggleAuthButtons();
    } else {
        alert("Please enter both email and password.");
    }
}

function signOut() {
    alert("You have been signed out.");
    isUserSignedIn = false;
    toggleAuthButtons();
}

function toggleAuthButtons() {
    if (isUserSignedIn) {
        signInButton.style.display = 'none';
        signUpButton.style.display = 'none';
        signOutButton.style.display = 'inline-block';
    } else {
        signInButton.style.display = 'inline-block';
        signUpButton.style.display = 'inline-block';
        signOutButton.style.display = 'none';
    }
}

document.getElementById('explore').addEventListener('click', () => {
    pinsContainer.innerHTML = '';
    pins = [];
    currentPage = 1;
    generatePins(currentPage);
});

signInButton.addEventListener('click', () => openModal('signin'));
signUpButton.addEventListener('click', () => openModal('signup'));
signOutButton.addEventListener('click', signOut);

// Infinite Scroll - Load more pins as the user scrolls to the bottom
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 200) {
        currentPage++;
        generatePins(currentPage);
    }
});

// Initial load
generatePins(currentPage);