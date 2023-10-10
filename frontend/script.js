const snake = document.getElementById('snake');
const food = document.getElementById('food');
const scoreDisplay = document.getElementById('score');
const startButton = document.getElementById('start-button');
const gridSize = 20;
const speed = 200;

let snakeX = 0;
let snakeY = 0;
let dx = gridSize;
let dy = 0;
let foodX = 0;
let foodY = 0;
let score = 0;
let gameInterval;
let snakeBody = [];

function randomPosition() {
    return Math.floor(Math.random() * 15) * gridSize;
}

function updateFoodPosition() {
    let foodInsideSnake = true;
    while (foodInsideSnake) {
        foodX = randomPosition();
        foodY = randomPosition();
        foodInsideSnake = false;

        for (let i = 0; i < snakeBody.length; i++) {
            if (foodX === snakeBody[i].x && foodY === snakeBody[i].y) {
                foodInsideSnake = true;
                break;
            }
        }
    }

    food.style.left = foodX + 'px';
    food.style.top = foodY + 'px';
}

function moveSnake() {
    snakeX += dx;
    snakeY += dy;

    if (snakeX < 0 || snakeX >= gridSize * 15 || snakeY < 0 || snakeY >= gridSize * 15) {
        gameOver();
        return;
    }

    snake.style.left = snakeX + 'px';
    snake.style.top = snakeY + 'px';

    snakeBody.push({ x: snakeX, y: snakeY });

    // بررسی برخورد با غذا
    if (snakeX === foodX && snakeY === foodY) {
        score++;
        scoreDisplay.textContent = 'Score: ' + score;
        updateFoodPosition();
    }

    // بررسی طول مار و اضافه کردن بدن جدید
    if (snakeBody.length > score) {
        const removedSegment = snakeBody.shift();
        const removedSegmentElement = document.createElement('div');
        removedSegmentElement.className = 'snake-segment';
        removedSegmentElement.style.left = removedSegment.x + 'px';
        removedSegmentElement.style.top = removedSegment.y + 'px';
        snake.removeChild(removedSegmentElement);
    }

    // بررسی برخورد با خود مار
    for (let i = 1; i < snakeBody.length; i++) {
        if (snakeX === snakeBody[i].x && snakeY === snakeBody[i].y) {
            gameOver();
            return;
        }
    }
}

function gameOver() {
    clearInterval(gameInterval);
    alert('Game Over! Your Score: ' + score);
    snakeX = 0;
    snakeY = 0;
    dx = gridSize;
    dy = 0;
    score = 0;
    scoreDisplay.textContent = 'Score: ' + score;
    snake.style.left = '0';
    snake.style.top = '0';
    updateFoodPosition();
    startButton.style.display = 'block';
    snakeBody = [];
    const snakeSegments = document.querySelectorAll('.snake-segment');
    snakeSegments.forEach(segment => {
        snake.removeChild(segment);
    });
}

document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowUp':
            if (dy !== gridSize) {
                dx = 0;
                dy = -gridSize;
            }
            break;
        case 'ArrowDown':
            if (dy !== -gridSize) {
                dx = 0;
                dy = gridSize;
            }
            break;
        case 'ArrowLeft':
            if (dx !== gridSize) {
                dx = -gridSize;
                dy = 0;
            }
            break;
        case 'ArrowRight':
            if (dx !== -gridSize) {
                dx = gridSize;
                dy = 0;
            }
            break;
    }
});

startButton.addEventListener('click', () => {
    startButton.style.display = 'none';
    gameInterval = setInterval(moveSnake, speed);
    updateFoodPosition();
});
