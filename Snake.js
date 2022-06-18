import { checkCollision } from './CollisionDetection.js';
import Entity from './Entity.js';
import Vector from './Vector.js';
export default class Snake extends Entity{
    constructor(videoContext, position, keyboardHandler, eventEmitter){
        super(videoContext, position);
        this.eventEmitter = eventEmitter;
        this.headColor = "#27FF89";
        this.color = "#ff2936"
        this.keyboardHandler = keyboardHandler;
        this.tail = [];
        this.lastPosition = this.position;
        this.size = 3
        this.player = true;
        this.setup();
    }

    setup(){
        this.keyboardHandler.addListener({name: 'w', callback: () => this.up()});
        this.keyboardHandler.addListener({name: 's', callback: () => this.down()});
        this.keyboardHandler.addListener({name: 'a', callback: () => this.left()});
        this.keyboardHandler.addListener({name: 'd', callback: () => this.right()});
    }

    update(){
        this.lastPosition = Object.assign(Object.create(Object.getPrototypeOf(this.position)), this.position);
        if (this.tail.length > this.size){
            this.tail.shift();
        }
        this.tail.push(this.lastPosition);
        this.position.x += this.position.xVel * this.position.width;
        this.position.y += this.position.yVel * this.position.height;
        if (this.position.x > this.videoContext.canvas.width - this.position.width) {
            this.position.x = 0;
        } else if (this.position.x < 0) {
            this.position.x = this.videoContext.canvas.width - this.position.width;
        } else  if (this.position.y < 0){
            this.position.y = this.videoContext.canvas.height - this.position.height;
        } else if (this.position.y > this.videoContext.canvas.height - this.position.height){
            this.position.y = 0;
        }
        if(this.ateItself()){
            this.position.xVel = 0;
            this.position.yVel = 0;
            this.eventEmitter.emit({name: 'snake_collided'});
        }
    }

    draw(){
        this.videoContext.fillStyle=this.headColor;
        this.videoContext.fillRect(this.position.x, this.position.y, this.position.width, this.position.height);
        this.videoContext.fillStyle=this.color;
        this.tail.forEach(element => {
            this.videoContext.fillRect(element.x, element.y, element.width, element.height);
        });
    }

    up(){
        this.position.yVel = -1;
        this.position.xVel = 0;
    }
    
    down(){
        this.position.yVel = 1;
        this.position.xVel = 0;
    }

    left(){
        this.position.yVel = 0;
        this.position.xVel = -1;
    }

    right(){
        this.position.yVel = 0;
        this.position.xVel = 1;
    }

    grow(){
        this.size ++;
    }

    ateItself(){
        return checkCollision(this.position, this.tail);
    }
}