
export default class Window {
    
    canvas: HTMLCanvasElement

    constructor(canvas?: HTMLCanvasElement) {

        if(!canvas)
            throw new Error("Can't create window : Canvas element is null");

        this.canvas = canvas;
    }
}