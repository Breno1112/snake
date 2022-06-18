export default class Timer{
    constructor(fpsCount, eventEmitter){
        this.lastUpdatedTime = 0;
        this.fpsCount = fpsCount;
        this.updateThreshold = 1000/fpsCount
        this.eventEmitter = eventEmitter;
    }

    start(){
        requestAnimationFrame((timestamp) => this.loop(timestamp));
    }

    loop(timestamp){
        if (timestamp - this.lastUpdatedTime >= this.updateThreshold){
            this.lastUpdatedTime = timestamp;
            this.update();
        }
        requestAnimationFrame((timestamp) => this.loop(timestamp));
    }

    update(){
        this.eventEmitter.emit({name: 'update_clock'})
    }
}