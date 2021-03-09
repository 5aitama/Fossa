import IFObject from "./IFObject.js";

/**
 * Window object is containing all
 * opengl context methods abstraction.
 */
export default class FScene {
    /**
     * The html canvas element that contain 
     * the context to be interracted with.
     */
    canvas: HTMLCanvasElement

    /**
     * The WebGL rendering context.
     */
    gl: WebGL2RenderingContext | WebGLRenderingContext

    /**
     * The scene objects.
     */
    objects: IFObject[] = [];

    /**
     * Create a new Window.
     * @param canvas The canvas
     */
    constructor( canvas?: HTMLCanvasElement ) {

        if(!canvas)
            throw new Error("Can't create window : Canvas element is null");

        const ctx = (canvas.getContext("webgl2") ?? canvas.getContext("webgl"));
        
        if(!ctx)
            throw new Error("WebGL is not supported on your browser !");
        
        console.log(FScene.IsWebGL2(ctx));
        this.gl = ctx;
        this.canvas = canvas;
    }

    static IsWebGL2(ctx: any): ctx is WebGL2RenderingContext {
        return (ctx as WebGL2RenderingContext).READ_BUFFER !== undefined;
    }

    Render(time: number) {
        this.gl.clearColor( 0, 0, 1, 1 );
        this.gl.clear( this.gl.COLOR_BUFFER_BIT );
    }
}