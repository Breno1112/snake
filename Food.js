import Entity from "./Entity.js";

export default class Food extends Entity{
    constructor(videoContext, position){
        super(videoContext, position);
        this.color = "#FFFFFF";
    }

    draw(){
        this.videoContext.fillStyle=this.color;
        this.videoContext.fillRect(this.position.x, this.position.y, this.position.width, this.position.height);
    }
}