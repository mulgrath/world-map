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
let pendingEncounter = null;
let lastTime = 0;
function gameLoop(currentTime) {
    const deltaTime = currentTime - lastTime;
    lastTime = currentTime;
    player.update(deltaTime);
    camera.followPlayer(map.getPlayerVisualPos());
    viewport.render();
    if (pendingEncounter && !player.getIsAnimating()) {
        // Show encounter UI, transition to combat, etc.
        // For now, just show an alert - later integrate with combat system
        showEncounter(pendingEncounter);
        pendingEncounter = null;
    }
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
function showEncounter(enemies) {
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed; top: 50%; left: 50%; 
        transform: translate(-50%, -50%);
        background: rgba(0,0,0,0.8); color: white;
        padding: 20px; border-radius: 10px;
        z-index: 1000;
    `;
    overlay.textContent = `A ${enemies.join(' and ')} appears!`;
    document.body.appendChild(overlay);
    // Auto-remove after 2 seconds
    setTimeout(() => overlay.remove(), 2000);
}
inputHandler.setMoveCallback(handleInput);
requestAnimationFrame(gameLoop);
map.setEncounterCallback((enemies) => {
    console.log("Encounter triggered!", enemies);
    pendingEncounter = enemies;
});
player.setMovementCompleteCallback(() => {
    map.checkForEncounterAtCurrentPosition();
});
