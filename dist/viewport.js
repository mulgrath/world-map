import { TILE_SIZE } from "./world-map.js";
export class Viewport {
    constructor(map, canvasContext, camera) {
        this.map = map;
        this.ctx = canvasContext;
        this.camera = camera;
    }
    render() {
        // Clear the entire canvas
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        // Draw everything fresh
        this.drawMap();
        this.drawPlayer(this.map.getPlayerVisualPos());
    }
    drawMap() {
        const bounds = this.camera.getVisibleTileBounds();
        for (let y = bounds.startY; y < bounds.endY; y++) {
            for (let x = bounds.startX; x < bounds.endX; x++) {
                const worldX = x * TILE_SIZE;
                const worldY = y * TILE_SIZE;
                const [screenX, screenY] = this.camera.worldToScreen(worldX, worldY);
                this.drawTile(screenX, screenY, x, y);
            }
        }
    }
    drawTile(screenX, screenY, tileX, tileY) {
        const color = this.map.getTileColor(tileX, tileY);
        this.ctx.fillStyle = color;
        this.ctx.fillRect(screenX, screenY, TILE_SIZE, TILE_SIZE);
        const type = this.map.getTileType(tileX, tileY);
        switch (type) {
            case 0 /* TileType.Grassland */:
                this.drawGrassland(screenX, screenY);
                break;
            case 1 /* TileType.Mountains */:
                this.drawMountain(screenX, screenY);
                break;
            case 2 /* TileType.Water */:
                this.drawWater(screenX, screenY);
                break;
            case 3 /* TileType.Forest */:
                this.drawForest(screenX, screenY);
                break;
            case 4 /* TileType.Town */:
                this.drawTown(screenX, screenY);
                break;
            default: break;
        }
    }
    drawGrassland(pixelX, pixelY) {
    }
    drawMountain(pixelX, pixelY) {
        this.ctx.beginPath();
        this.ctx.moveTo(pixelX + TILE_SIZE / 4, pixelY + TILE_SIZE); // Bottom left
        this.ctx.lineTo(pixelX + TILE_SIZE / 2, pixelY + TILE_SIZE / 4); // Peak
        this.ctx.lineTo(pixelX + 3 * TILE_SIZE / 4, pixelY + TILE_SIZE); // Bottom right
        this.ctx.closePath();
        this.ctx.fillStyle = "#a0a0a0"; // Lighter gray for peak
        this.ctx.fill();
    }
    drawWater(pixelX, pixelY) {
    }
    drawForest(pixelX, pixelY) {
        this.ctx.fillStyle = "#003308"; // Darker green
        this.ctx.fillRect(pixelX + 8, pixelY + 8, 6, 6); // Tree 1
        this.ctx.fillRect(pixelX + 18, pixelY + 12, 6, 6); // Tree 2
    }
    drawTown(pixelX, pixelY) {
        this.ctx.fillStyle = "#8b8b8bff";
        this.ctx.fillRect(pixelX + 6, pixelY + 8, 6, 16);
        this.ctx.fillRect(pixelX + 12, pixelY + 12, 8, 12);
        this.ctx.fillRect(pixelX + 20, pixelY + 8, 6, 16);
    }
    drawPlayer(position) {
        const worldX = position[0] * TILE_SIZE;
        const worldY = position[1] * TILE_SIZE;
        const [screenX, screenY] = this.camera.worldToScreen(worldX, worldY);
        this.ctx.fillStyle = "#ffe600ff";
        this.ctx.fillRect(screenX + 10, screenY + 10, 10, 10);
    }
}
