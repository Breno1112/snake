import Entity from './Entity.js';
export default class Snake extends Entity{
    constructor(videoContext, position){
        super(videoContext, position);
        this.color = "#ff2936"
    }

    update(){
        this.position.x += this.position.xVel * this.position.width;
        this.position.y += this.position.yVel * this.position.height;
        if (this.position.x > this.videoContext.canvas.width) {
            this.position.x = 0;
        } else if (this.position.x < 0) {
            this.position.x = this.videoContext.canvas.width;
        } else  if (this.position.y < 0){
            this.position.y = this.videoContext.canvas.height;
        } else if (this.position.y > this.videoContext.canvas.height){
            this.position.y = 0;
        }
    }

    draw(){
        this.videoContext.fillStyle=this.color;
        this.videoContext.fillRect(this.position.x, this.position.y, this.position.width, this.position.height);
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
}