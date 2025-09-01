import { TILE_SIZE } from "./world-map.js";
export class Camera {
    constructor(canvasWidth, canvasHeight, worldWidth, worldHeight) {
        // Camera's world position in pixels
        this.x = 0;
        this.y = 0;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.worldWidth = worldWidth;
        this.worldHeight = worldHeight;
    }
    followPlayer(playerPos) {
        // Center camera on player (player world pos minus half the screen size)
        this.x = (playerPos[0] * TILE_SIZE) - (this.canvasWidth / 2);
        this.y = (playerPos[1] * TILE_SIZE) - (this.canvasHeight / 2);
        // Clamp camera to world bounds
        const maxX = (this.worldWidth * TILE_SIZE) - this.canvasWidth;
        const maxY = (this.worldHeight * TILE_SIZE) - this.canvasHeight;
        this.x = Math.max(0, Math.min(this.x, maxX));
        this.y = Math.max(0, Math.min(this.y, maxY));
    }
    worldToScreen(worldX, worldY) {
        return [Math.round(worldX - this.x), Math.round(worldY - this.y)];
    }
    getVisibleTileBounds() {
        // start = top-left of visible area
        // end = bottom-right of visible area
        return {
            startX: Math.max(0, Math.floor(this.x / TILE_SIZE)),
            endX: Math.min(this.worldWidth, Math.ceil(this.x + this.canvasWidth) / TILE_SIZE),
            startY: Math.max(0, Math.floor(this.y / TILE_SIZE)),
            endY: Math.min(this.worldHeight, Math.ceil((this.y + this.canvasHeight) / TILE_SIZE))
        };
    }
}
