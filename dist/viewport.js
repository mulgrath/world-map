import { TILE_SIZE } from "./world-map.js";
export class Viewport {
    constructor(map, canvasContext) {
        this.map = map;
        this.ctx = canvasContext;
    }
    render() {
        const width = this.map.getWidth();
        const height = this.map.getHeight();
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const color = this.map.getTileColor(x, y);
                this.ctx.fillStyle = color;
                const pixelX = x * TILE_SIZE;
                const pixelY = y * TILE_SIZE;
                this.ctx.fillRect(pixelX, pixelY, TILE_SIZE, TILE_SIZE);
                const type = this.map.getTileType(x, y);
                switch (type) {
                    case 0 /* TileType.Grassland */:
                        this.drawGrassland(pixelX, pixelY);
                        break;
                    case 1 /* TileType.Mountains */:
                        this.drawMountain(pixelX, pixelY);
                        break;
                    case 2 /* TileType.Water */:
                        this.drawWater(pixelX, pixelY);
                        break;
                    case 3 /* TileType.Forest */:
                        this.drawForest(pixelX, pixelY);
                        break;
                    case 4 /* TileType.Town */:
                        this.drawTown(pixelX, pixelY);
                        break;
                    default:
                        break;
                }
            }
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
        this.ctx.fillRect(pixelX + 6, pixelY + 4, 6, 16);
        this.ctx.fillRect(pixelX + 12, pixelY + 8, 8, 12);
        this.ctx.fillRect(pixelX + 20, pixelY + 4, 6, 16);
    }
}
