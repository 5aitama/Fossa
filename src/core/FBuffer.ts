import FContext from './FContext.js'

/**
 * The WebGL target enums.
 */
export enum FGL1BufferTarget {
    ArrayBuffer         = WebGLRenderingContext.ARRAY_BUFFER,
    ElementArrayBuffer  = WebGLRenderingContext.ELEMENT_ARRAY_BUFFER,
}

/**
 * The WebGL 2 target enums.
 */
export enum FGL2BufferTarget {
    // TODO: Fill me with only WebGL2 buffer target enums !
}

/**
 * The WebGL usage enums.
 */
export enum FGL1BufferUsage {
    StaticDraw  = WebGLRenderingContext.STATIC_DRAW,
    DynamicDraw = WebGLRenderingContext.DYNAMIC_DRAW,
}

/**
 * The WebGL2 usage enums.
 */
export enum FGL2BufferUsage {
    // TODO: Fill me with only WebGL2 buffer usage enums !
}

/**
 * The WebGL usage enums. This is
 * compatible with WebGL2.
 */
export type FBufferUsage = FGL1BufferUsage | FGL2BufferUsage;

/**
 * The WebGL target enums. This is
 * compatible with WebGL2.
 */
export type FBufferTarget = FGL1BufferTarget | FGL2BufferTarget;

export type FDataOffsetRange = { data: ArrayBufferView, srcOffset: number, length: number | null }

export function IsOffsetRange(x: any) : x is FDataOffsetRange {
    return (x as FDataOffsetRange).srcOffset !== undefined && 
           (x as FDataOffsetRange).length !== undefined &&
           (x as FDataOffsetRange).data !== undefined;
}

/**
 * Represent a WebGLBuffer. This class was build 
 * on top of WebGLBuffer and it was designed to 
 * manipulate a WebGLBuffer more easly with a
 * minimum overhead 😌
 */
export default class FBuffer {

    private rawBuffer: WebGLBuffer;
    private target: FBufferTarget;
    private usage: FBufferUsage;
    private gl: FContext;

    constructor( gl: FContext, target: FBufferTarget, usage: FBufferUsage, params: number | BufferSource | FDataOffsetRange ) {
        const buffer = gl.createBuffer();

        if(!buffer) throw new Error("Failed to create buffer !");

        this.rawBuffer = buffer;
        this.target = target;
        this.usage = usage;
        this.gl = gl;

        // Bind the buffer
        this.gl.bindBuffer( this.target.valueOf(), this.rawBuffer );

        // Set the buffer data depends of params arg...
        if(typeof params === 'number') {
            gl.bufferData( target.valueOf(), params, usage.valueOf() );
        } else if(IsOffsetRange(params)) {
            gl.bufferData( target.valueOf(), params.data, usage.valueOf(), params.srcOffset, params.length ?? undefined );
        } else {
            gl.bufferData( target.valueOf(), params, usage.valueOf() );
        }

        // Unbind the buffer
        this.gl.bindBuffer( this.target.valueOf(), null );
    }

    /**
     * Get the buffer target type.
     */
    GetTarget() {
        return this.target;
    }

    /**
     * Get the buffer usage type.
     */
    GetUsage() {
        return this.usage;
    }

    /**
     * Updates a subset of a GPU buffer.
     * @param data Data to be copied in the GPU buffer.
     * @param dstByteOffset The destination byte offset.
     */
    SubData( data: BufferSource, dstByteOffset: number ) {
        this.gl.bindBuffer( this.target.valueOf(), this.rawBuffer );
        this.gl.bufferSubData( this.target.valueOf(), dstByteOffset, data );
    }

    /**
     * Update a subset of a GPU buffer.
     * @param data Data to be filled in buffer.
     * @param dstByteOffset The destination byte offset.
     * @param srcOffset The start offset in data array
     * @param length The amount of element to be copied from data to the buffer.
     */
    SubDataRange( data: ArrayBufferView, dstByteOffset: number, srcOffset: number, length?: number ) {
        this.gl.bindBuffer( this.target.valueOf(), this.rawBuffer );
        this.gl.bufferSubData( this.target.valueOf(), dstByteOffset, data, srcOffset, length );
    }

    /**
     * Get the WebGLBuffer.
     */
    GetRawBuffer() {
        return this.rawBuffer
    }
}