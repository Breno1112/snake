export default class KeyboardHandler{
    constructor(){
        this.listeners = [];
        document.addEventListener('keypress', (event) => this.onKeyPress(event));
    }

    addListener(listener){
        this.listeners.push(listener);
    }

    onKeyPress(event){
        this.listeners.forEach(listener => {
            if (listener.name === event.key) {
                listener.callback();
            }
        });
    }
}