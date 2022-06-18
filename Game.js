import EventEmitter from "./EventEmitter.js";
import Snake from "./Snake.js";
import Timer from "./Timer.js";
import Vector from "./Vector.js";
import KeyboardHandler from "./KeyboardHandler.js";
import Food from "./Food.js";

export default class Game {
    constructor(){
        this.canvas = document.getElementById("screen");
        this.videoContext = this.canvas.getContext('2d');
        this.eventEmitter = new EventEmitter();
        this.timer = new Timer(5, this.eventEmitter);
        this.keyboardHandler = new KeyboardHandler();
        this.entities = [];
    }

    start(){
        this.repaintBackground();
        this.eventEmitter.addListener({name: 'update_clock', callback: () => this.update(), times: 1});
        const snakePos = new Vector(0, 0, 10, 10, 1, 0);
        const snake = new Snake(this.videoContext, snakePos, this.keyboardHandler);
        this.entities.push(snake);
        this.generateFood();
        this.timer.start();
    }

    update(){
        this.repaintBackground();
        this.entities.forEach(entity => {
            entity.update();
            entity.draw();
        });
    }

    repaintBackground(){
        this.videoContext.fillStyle="black";
        this.videoContext.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    generateFood(){
        var foodPos = this.generateFoodVector();
        const snake = this.findSnake();
        while (this.checkSingleCollision(foodPos, snake.position) || this.checkCollision(foodPos, snake.tail)){
            foodPos = this.generateFood();
        }
        const food = new Food(this.videoContext, foodPos);
        this.entities.push(food);
    }

    generateFoodVector(){
        const badX = Math. floor(Math. random() * (600 - 0 + 1)) + 0;
        const badY = Math. floor(Math. random() * (600 - 0 + 1)) + 0;
        const greatX = badX - (badX % 10);
        const greatY = badY - (badY % 10);
        return new Vector(greatX, greatY, 10, 10, 0, 0);
    }

    findSnake(){
        return this.entities.filter(entity => entity.player)[0];
    }

    checkCollision(vec1, vec2List){
        let found = false;
        vec2List.forEach(vec2 => {
            if (this.checkSingleCollision(vec1, vec2)){
                found = true;
            }
        });
        return found;
    }

    checkSingleCollision(vec1, vec2){
        return vec1.x == vec2.x && vec1.y == vec2.y;
    }
}