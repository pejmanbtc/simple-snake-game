import pygame
import random

# تنظیمات بازی
pygame.init()
width, height = 400, 400
screen = pygame.display.set_mode((width, height))
pygame.display.set_caption("Snake Game")
clock = pygame.time.Clock()
grid_size = 20

# رنگ‌ها
white = (255, 255, 255)
black = (0, 0, 0)
red = (255, 0, 0)

# تعریف متغیرهای بازی
snake = [(100, 50), (90, 50), (80, 50)]
snake_direction = (grid_size, 0)
food = (random.randrange(1, (width//grid_size)) * grid_size, random.randrange(1, (height//grid_size)) * grid_size)
score = 0

# توابع
def draw_snake(snake):
    for segment in snake:
        pygame.draw.rect(screen, black, pygame.Rect(segment[0], segment[1], grid_size, grid_size))

def draw_food(food):
    pygame.draw.rect(screen, red, pygame.Rect(food[0], food[1], grid_size, grid_size))

def collision_with_boundaries(snake_head):
    if (
        snake_head[0] >= width
        or snake_head[0] < 0
        or snake_head[1] >= height
        or snake_head[1] < 0
    ):
        return True
    return False

def collision_with_self(snake):
    snake_head = snake[0]
    if snake_head in snake[1:]:
        return True
    return False

def main():
    global snake_direction, food, score

    while True:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                quit()
            elif event.type == pygame.KEYDOWN:
                if event.key == pygame.K_UP and snake_direction != (0, grid_size):
                    snake_direction = (0, -grid_size)
                if event.key == pygame.K_DOWN and snake_direction != (0, -grid_size):
                    snake_direction = (0, grid_size)
                if event.key == pygame.K_LEFT and snake_direction != (grid_size, 0):
                    snake_direction = (-grid_size, 0)
                if event.key == pygame.K_RIGHT and snake_direction != (-grid_size, 0):
                    snake_direction = (grid_size, 0)

        snake_head = (snake[0][0] + snake_direction[0], snake[0][1] + snake_direction[1])

        if snake_head == food:
            score += 1
            food = (random.randrange(1, (width//grid_size)) * grid_size, random.randrange(1, (height//grid_size)) * grid_size)
        else:
            snake.pop()

        snake.insert(0, snake_head)

        if collision_with_boundaries(snake_head) or collision_with_self(snake):
            pygame.quit()
            quit()

        screen.fill(white)
        draw_snake(snake)
        draw_food(food)

        pygame.display.flip()
        clock.tick(15)

if __name__ == "__main__":
    main()
