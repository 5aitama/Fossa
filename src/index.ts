import FScene from './core/FScene.js';
import FBuffer, { FGL1BufferTarget, FGL1BufferUsage } from './core/FBuffer.js';

const scene = new FScene(document.querySelector("#canvas") as HTMLCanvasElement);

const buf = new FBuffer(scene.gl, FGL1BufferTarget.ArrayBuffer, FGL1BufferUsage.StaticDraw, 0);

function render(time: number = 0) {
    scene.Render(time);
    requestAnimationFrame(render);
}

render();