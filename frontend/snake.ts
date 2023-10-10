class SnakeGame {
    private snake: HTMLElement;
    private food: HTMLElement;
    private scoreDisplay: HTMLElement;
    private startButton: HTMLElement;
    private gridSize: number = 20;
    private speed: number = 200;
    
    private snakeX: number = 0;
    private snakeY: number = 0;
    private dx: number = this.gridSize;
    private dy: number = 0;
    private foodX: number = 0;
    private foodY: number = 0;
    private score: number = 0;
    private gameInterval: any;
    private snakeBody: { x: number, y: number }[] = [];

    constructor() {
        this.snake = document.getElementById('snake')!;
        this.food = document.getElementById('food')!;
        this.scoreDisplay = document.getElementById('score')!;
        this.startButton = document.getElementById('start-button')!;

        this.startButton.addEventListener('click', () => this.startGame());
        document.addEventListener('keydown', (e) => this.onKeyPress(e));
    }

    private randomPosition(): number {
        return Math.floor(Math.random() * 15) * this.gridSize;
    }

    private updateFoodPosition(): void {
        let foodInsideSnake: boolean = true;
        while (foodInsideSnake) {
            this.foodX = this.randomPosition();
            this.foodY = this.randomPosition();
            foodInsideSnake = false;

            for (let i = 0; i < this.snakeBody.length; i++) {
                if (this.foodX === this.snakeBody[i].x && this.foodY === this.snakeBody[i].y) {
                    foodInsideSnake = true;
                    break;
                }
            }
        }

        this.food.style.left = this.foodX + 'px';
        this.food.style.top = this.foodY + 'px';
    }

    private moveSnake(): void {
        this.snakeX += this.dx;
        this.snakeY += this.dy;

        if (this.snakeX < 0 || this.snakeX >= this.gridSize * 15 || this.snakeY < 0 || this.snakeY >= this.gridSize * 15) {
            this.gameOver();
            return;
        }

        this.snake.style.left = this.snakeX + 'px';
        this.snake.style.top = this.snakeY + 'px';

        this.snakeBody.push({ x: this.snakeX, y: this.snakeY });

        if (this.snakeX === this.foodX && this.snakeY === this.foodY) {
            this.score++;
            this.scoreDisplay.textContent = 'Score: ' + this.score;
            this.updateFoodPosition();
        }

        if (this.snakeBody.length > this.score) {
            const removedSegment = this.snakeBody.shift();
            const removedSegmentElement = document.createElement('div');
            removedSegmentElement.className = 'snake-segment';
            removedSegmentElement.style.left = removedSegment!.x + 'px';
            removedSegmentElement.style.top = removedSegment!.y + 'px';
            this.snake.removeChild(removedSegmentElement);
        }

        for (let i = 1; i < this.snakeBody.length; i++) {
            if (this.snakeX === this.snakeBody[i].x && this.snakeY === this.snakeBody[i].y) {
                this.gameOver();
                return;
            }
        }
    }

    private gameOver(): void {
        clearInterval(this.gameInterval);
        alert('Game Over! Your Score: ' + this.score);
        this.snakeX = 0;
        this.snakeY = 0;
        this.dx = this.gridSize;
        this.dy = 0;
        this.score = 0;
        this.scoreDisplay.textContent = 'Score: ' + this.score;
        this.snake.style.left = '0';
        this.snake.style.top = '0';
        this.updateFoodPosition();
        this.startButton.style.display = 'block';
        this.snakeBody = [];
        const snakeSegments = document.querySelectorAll('.snake-segment');
        snakeSegments.forEach(segment => {
            this.snake.removeChild(segment);
        });
    }

    private onKeyPress(event: KeyboardEvent): void {
        switch (event.key) {
            case 'ArrowUp':
                if (this.dy !== this.gridSize) {
                    this.dx = 0;
                    this.dy = -this.gridSize;
                }
                break;
            case 'ArrowDown':
                if (this.dy !== -this.gridSize) {
                    this.dx = 0;
                    this.dy = this.gridSize;
                }
                break;
            case 'ArrowLeft':
                if (this.dx !== this.gridSize) {
                    this.dx = -this.gridSize;
                    this.dy = 0;
                }
                break;
            case 'ArrowRight':
                if (this.dx !== -this.gridSize) {
                    this.dx = this.gridSize;
                    this.dy = 0;
                }
                break;
        }
    }

    private startGame(): void {
        this.startButton.style.display = 'none';
        this.gameInterval = setInterval(() => this.moveSnake(), this.speed);
        this.updateFoodPosition();
    }
}

const game = new SnakeGame();
