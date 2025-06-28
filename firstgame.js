const basket = document.getElementById('basket');
const fallingObject = document.getElementById('fallingObject');
const scoreDisplay = document.getElementById('score');
let score = 0;

let basketPosition = 160; // Initial position of the basket
let fallingSpeed = 5; // Speed of falling object
let objectFallInterval; // Interval for falling object

// Function to start the game
function startGame() {
    resetFallingObject();
    
    objectFallInterval = setInterval(() => {
        let fallingTop = parseInt(window.getComputedStyle(fallingObject).getPropertyValue('top'));
        
        if (fallingTop >= 600) {
            resetFallingObject();
        } else {
            fallingObject.style.top = (fallingTop + fallingSpeed) + 'px';
        }

        // Check for collision with the basket
        if (fallingTop + 30 >= 580 && fallingTop <= 600 && basketPosition <= parseInt(fallingObject.style.left) + 30 && basketPosition + 80 >= parseInt(fallingObject.style.left)) {
            score++;
            scoreDisplay.innerText = 'Score: ' + score;
            resetFallingObject();
        }
        
    }, 100);
}

// Function to reset the falling object
function resetFallingObject() {
    const randomX = Math.floor(Math.random() * (370)); // Random horizontal position
    fallingObject.style.left = randomX + 'px';
    fallingObject.style.top = '0px';
}

// Function to move the basket
function moveBasket(e) {
    if (e.key === 'ArrowLeft' && basketPosition > 0) {
        basketPosition -= 20; // Move left
        basket.style.left = basketPosition + 'px';
    } else if (e.key === 'ArrowRight' && basketPosition < 320) {
        basketPosition += 20; // Move right
        basket.style.left = basketPosition + 'px';
    }
}

// Start the game on page load
window.onload = () => {
    startGame();
};

// Event listener for keyboard controls
document.addEventListener('keydown', moveBasket);
