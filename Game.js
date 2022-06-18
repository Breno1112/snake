import EventEmitter from "./EventEmitter.js";
import Snake from "./Snake.js";
import Timer from "./Timer.js";
import Vector from "./Vector.js";
import KeyboardHandler from "./KeyboardHandler.js";

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
}