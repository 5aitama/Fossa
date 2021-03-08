export default interface IFObject {
    OnUpdate: (gl: WebGLRenderingContext | WebGL2RenderingContext, time: number) => void;
    OnRender: (gl: WebGLRenderingContext | WebGL2RenderingContext, time: number) => void;
}