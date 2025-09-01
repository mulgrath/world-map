export class WorldMapOverlay {
    constructor(worldMap) {
        this.isVisible = false;
        this.worldMap = worldMap;
    }
    toggle() {
        this.isVisible = !this.isVisible;
    }
    render(ctx, playerPos) {
        if (!this.isVisible)
            return;
        ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        this.renderMiniWorld(ctx, playerPos);
    }
    renderMiniWorld(ctx, playerPos) {
        const miniTileSize = 8;
        const worldWidthPixels = this.worldMap.getWidth() * miniTileSize;
        const worldHeightPixels = this.worldMap.getHeight() * miniTileSize;
        // Center the mini world on canvas
        const offsetX = (ctx.canvas.width - worldWidthPixels) / 2;
        const offsetY = (ctx.canvas.height - worldHeightPixels) / 2;
        // Render all tiles (no viewport culling needed)
        for (let y = 0; y < this.worldMap.getHeight(); y++) {
            for (let x = 0; x < this.worldMap.getWidth(); x++) {
                const screenX = offsetX + (x * miniTileSize);
                const screenY = offsetY + (y * miniTileSize);
                this.drawMiniTile(ctx, screenX, screenY, x, y, miniTileSize);
            }
        }
        // Draw player indicator
        this.drawPlayerIndicator(ctx, playerPos, offsetX, offsetY, miniTileSize);
    }
    drawMiniTile(ctx, screenX, screenY, tileX, tileY, tileSize) {
        const color = this.worldMap.getTileColor(tileX, tileY);
        ctx.fillStyle = color;
        ctx.fillRect(screenX, screenY, tileSize, tileSize);
        // Skip mountains, forests, etc. - too small to see
    }
    drawPlayerIndicator(ctx, playerPos, offsetX, offsetY, tileSize) {
        const playerX = offsetX + (playerPos[0] * tileSize);
        const playerY = offsetY + (playerPos[1] * tileSize);
        ctx.fillStyle = "#ffff00"; // Bright yellow
        ctx.fillRect(playerX, playerY, tileSize, tileSize);
    }
}
