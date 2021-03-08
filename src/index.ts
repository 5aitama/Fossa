import FScene from './core/FScene.js';

const scene = new FScene(document.querySelector("#canvas") as HTMLCanvasElement);

function render(time: number = 0) {
    scene.Render(time);
    requestAnimationFrame(render);
}

render();