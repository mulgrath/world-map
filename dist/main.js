import { WorldMap } from "./world-map.js";
import { Viewport } from "./viewport.js";
import { Player } from "./player.js";
import { InputHandler } from "./input-handler.js";
import { Camera } from "./camera.js";
const worldWidth = 40;
const worldHeight = 30;
const player = new Player(2, 6);
const map = new WorldMap(worldWidth, worldHeight, player);
const inputHandler = new InputHandler();
const canvas = document.getElementById('map-canvas');
const ctx = canvas.getContext('2d');
if (!ctx) {
    throw new Error("Missing HTML elements!");
}
const camera = new Camera(canvas.width, canvas.height, worldWidth, worldHeight);
const viewport = new Viewport(map, ctx, camera);
let lastTime = 0;
function gameLoop(currentTime) {
    const deltaTime = currentTime - lastTime;
    lastTime = currentTime;
    player.update(deltaTime);
    camera.followPlayer(map.getPlayerVisualPos());
    viewport.render();
    requestAnimationFrame(gameLoop);
}
function handleInput() {
    const moveDir = inputHandler.getDirection();
    if (moveDir[0] !== 0 || moveDir[1] !== 0) {
        if (map.isValidMove(moveDir)) {
            player.moveInDirection(moveDir);
            inputHandler.resetDirection();
        }
        else {
            inputHandler.resetDirection();
        }
    }
}
inputHandler.setMoveCallback(handleInput);
requestAnimationFrame(gameLoop);
