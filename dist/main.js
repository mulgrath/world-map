import { WorldMap } from "./world-map.js";
import { Viewport } from "./viewport.js";
import { Player } from "./player.js";
import { InputHandler } from "./input-handler.js";
const player = new Player(3, 1);
const map = new WorldMap(20, 15, player);
const inputHandler = new InputHandler();
const canvas = document.getElementById('map-canvas');
const ctx = canvas.getContext('2d');
if (!ctx) {
    throw new Error("Missing HTML elements!");
}
const viewport = new Viewport(map, ctx);
viewport.render();
function handleInput() {
    const moveDir = inputHandler.getDirection();
    if (moveDir[0] !== 0 || moveDir[1] !== 0) {
        if (map.isValidMove(moveDir)) {
            player.moveInDirection(moveDir);
            inputHandler.resetDirection();
            viewport.render();
        }
        else {
            inputHandler.resetDirection();
        }
    }
}
inputHandler.setMoveCallback(handleInput);
