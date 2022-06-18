import EventEmitter from "./EventEmitter.js";
import Snake from "./Snake.js";
import Timer from "./Timer.js";
import Vector from "./Vector.js";
import KeyboardHandler from "./KeyboardHandler.js";
import Food from "./Food.js";
import {checkSingleCollision, checkCollision} from './CollisionDetection.js'

export default class Game {
    constructor(){
        this.canvas = document.getElementById("screen");
        this.videoContext = this.canvas.getContext('2d');
        this.eventEmitter = new EventEmitter();
        this.timer = new Timer(5, this.eventEmitter);
        this.keyboardHandler = new KeyboardHandler();
        this.entities = [];
        this.running = false;
    }

    start(){
        this.repaintBackground();
        this.eventEmitter.addListener({name: 'update_clock', callback: () => this.update(), times: 1});
        this.eventEmitter.addListener({name: 'snake_collided', callback: () => this.end(), times: 1});
        const snakePos = new Vector(0, 0, 10, 10, 1, 0);
        const snake = new Snake(this.videoContext, snakePos, this.keyboardHandler, this.eventEmitter);
        this.entities.push(snake);
        this.generateFood(snake);
        this.timer.start();
        this.running = true;
        window.game = this;
    }

    update(){
        if(this.running){
            this.repaintBackground();
            this.checkSnakeAteFood();
            this.entities.forEach(entity => {
                entity.update();
                entity.draw();
            });
        }
    }

    repaintBackground(){
        this.videoContext.fillStyle="black";
        this.videoContext.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    generateFood(snake){
        var foodPos = this.generateFoodVector();
        while (checkSingleCollision(foodPos, snake.position) || checkCollision(foodPos, snake.tail)){
            foodPos = this.generateFood(snake);
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

    checkSnakeAteFood(){
        const snake = this.findSnake();
        this.entities.forEach((entity, idx) => {
            if (entity.food && snake.position.x == entity.position.x && snake.position.y == entity.position.y){
                this.entities.splice(idx);
                this.generateFood(snake);
                snake.grow();
            }
        });
    }

    end(){
        console.log('ended game');
        this.running = false;
    }
}