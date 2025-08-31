import { WorldMap, TILE_SIZE, TileType } from "./world-map.js";

export class Viewport {
    private map: WorldMap;
    private ctx: CanvasRenderingContext2D;

    constructor (map: WorldMap, canvasContext: CanvasRenderingContext2D) {
        this.map = map;
        this.ctx = canvasContext;
    }

    public render(): void {
        // Clear the entire canvas
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        
        // Draw everything fresh
        this.drawMap();
        this.drawPlayer(this.map.getPlayerVisualPos());
    }

    private drawMap() {
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
                    case TileType.Grassland: this.drawGrassland(pixelX, pixelY); break;
                    case TileType.Mountains: this.drawMountain(pixelX, pixelY); break;
                    case TileType.Water: this.drawWater(pixelX, pixelY); break;
                    case TileType.Forest: this.drawForest(pixelX, pixelY); break;
                    case TileType.Town: this.drawTown(pixelX, pixelY); break;
                    default: break;
                }
            }
        }
    }

    private drawGrassland(pixelX: number, pixelY: number) {

    }

    private drawMountain(pixelX: number, pixelY: number) {
        this.ctx.beginPath();
        this.ctx.moveTo(pixelX + TILE_SIZE/4, pixelY + TILE_SIZE);     // Bottom left
        this.ctx.lineTo(pixelX + TILE_SIZE/2, pixelY + TILE_SIZE/4);   // Peak
        this.ctx.lineTo(pixelX + 3*TILE_SIZE/4, pixelY + TILE_SIZE);   // Bottom right
        this.ctx.closePath();
        this.ctx.fillStyle = "#a0a0a0"; // Lighter gray for peak
        this.ctx.fill();
    }

    private drawWater(pixelX: number, pixelY: number) {

    }

    private drawForest(pixelX: number, pixelY: number) {
        this.ctx.fillStyle = "#003308"; // Darker green
        this.ctx.fillRect(pixelX + 8, pixelY + 8, 6, 6);   // Tree 1
        this.ctx.fillRect(pixelX + 18, pixelY + 12, 6, 6); // Tree 2
    }

    private drawTown(pixelX: number, pixelY: number) {
        this.ctx.fillStyle = "#8b8b8bff";
        this.ctx.fillRect(pixelX + 6, pixelY + 8, 6, 16);
        this.ctx.fillRect(pixelX + 12, pixelY + 12, 8, 12);
        this.ctx.fillRect(pixelX + 20, pixelY + 8, 6, 16);
    }

    private drawPlayer(position: [number, number]) {
        const pixelX = position[0] * TILE_SIZE;
        const pixelY = position[1] * TILE_SIZE;
        this.ctx.fillStyle = "#ffe600ff";
        this.ctx.fillRect(pixelX + 10, pixelY + 10, 10, 10)
    }
}