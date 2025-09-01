import { TILE_SIZE } from "./world-map.js";

export class Camera {
    // Camera's world position in pixels
    private x: number = 0;
    private y: number = 0;
    private canvasWidth: number;
    private canvasHeight: number;
    private worldWidth: number;
    private worldHeight: number;

    constructor (canvasWidth: number, canvasHeight: number, worldWidth: number, worldHeight: number) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.worldWidth = worldWidth;
        this.worldHeight = worldHeight;
    }
    

    public followPlayer(playerPos: [number, number]) {
        // Center camera on player (player world pos minus half the screen size)
        this.x = (playerPos[0] * TILE_SIZE) - (this.canvasWidth / 2);
        this.y = (playerPos[1] * TILE_SIZE) - (this.canvasHeight / 2);

        // Clamp camera to world bounds
        const maxX = (this.worldWidth * TILE_SIZE) - this.canvasWidth;
        const maxY = (this.worldHeight * TILE_SIZE) - this.canvasHeight;
        
        this.x = Math.max(0, Math.min(this.x, maxX));
        this.y = Math.max(0, Math.min(this.y, maxY));
    }

    public worldToScreen(worldX: number, worldY: number): [number, number] {
        return [Math.round(worldX - this.x), Math.round(worldY - this.y)];
    }

    public getVisibleTileBounds() {
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