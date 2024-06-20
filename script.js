
var squareSize = 20;
var row = 20;
var col = 20;
var board;
var context;

var velocityX = 0;
var velocityY = 0;


//snake head
var snakeX = squareSize * 1;
var snakeY = squareSize * 1;

//snakebody
var snakeBody = [];

//food
var foodX;
var foodY;

var directionChanged = false;
var gameState;

window.onload = function(){
    board = document.getElementById("gameBoard");
    board.height = row * squareSize;
    board.width = col * squareSize;
    context = board.getContext("2d")

    placeFood();
    document.addEventListener("keyup", changeDirection);

    setInterval(update, 1000/10);
}

function update(){
    if(gameState == "gameover"){
        document.getElementById("gameoverContainer").style.display = "block";
        board.classList.add("blurred");
        return;
    }

    if(snakeX < 0 || snakeX > col * squareSize || snakeY < 0 || snakeY > row * squareSize){
        gameState = "gameover";
    }

    for (let i = 0; i < snakeBody.length; i++){
        if(snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]){
            gameState = "gameover";
        }
    }
    context.fillStyle="lime";
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle="blue";
    context.fillRect(foodX, foodY, squareSize, squareSize);

    if(snakeX == foodX && snakeY == foodY){
        snakeBody.push([foodX, foodY]);
        placeFood();
    }

    for (let i = snakeBody.length-1; i > 0; i--){
        snakeBody[i] = snakeBody[i-1];
    }
    if(snakeBody.length){
        snakeBody[0] = [snakeX, snakeY];
    }

    context.fillStyle="red"
    snakeX += velocityX * squareSize;
    snakeY += velocityY * squareSize;
    context.fillRect(snakeX, snakeY, squareSize, squareSize);
    for (let i = 0; i < snakeBody.length; i++){
        context.fillRect(snakeBody[i][0], snakeBody[i][1], squareSize, squareSize);
    }

    directionChanged = false;
}

function changeDirection(e){
    if(e.code == "Space"){
        gameState = "restart";
        reStart();
    }
    if(!directionChanged){
        if(e.code == "KeyW" && velocityY != 1){
            velocityX = 0;
            velocityY = -1;
        }
        else if(e.code == "KeyS" && velocityY != -1){
            velocityX = 0;
            velocityY = 1;
        }
        else if(e.code == "KeyA" && velocityX != 1){
            velocityX = -1;
            velocityY = 0;
        }
        else if(e.code == "KeyD" && velocityX != -1){
            velocityX = 1;
            velocityY = 0;
        }
        directionChanged = true;
    }
 }
    

function placeFood(){
    let foodOnSnake;

    do{
        foodOnSnake = false;
        foodX = Math.floor(Math.random() * col) * squareSize;
        foodY = Math.floor(Math.random() * row) * squareSize;

        if(snakeX === foodX && snakeY === foodY){
            foodOnSnake = true;
        }
        for (let i = 0; i < snakeBody.length; i++){
            if (snakeBody[i][0] === foodX && snakeBody[i][1] === foodY){
                foodOnSnake = true;
                break;
            }
        }
    }while(foodOnSnake);
}

function reStart(){
    if (gameState == "restart"){
        snakeBody = [];
        velocityX = 0;
        velocityY = 0;
        snakeX = squareSize * 1;
        snakeY = squareSize * 1;
        document.getElementById("gameoverContainer").style.display = "none";
        board.classList.remove("blurred");
        placeFood();
    }
}