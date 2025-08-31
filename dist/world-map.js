export const TILE_SIZE = 32;
const TILE_COLORS = {
    [0 /* TileType.Grassland */]: "#619906ff",
    [1 /* TileType.Mountains */]: "#7a7a7aff",
    [2 /* TileType.Water */]: "#2362c2ff",
    [3 /* TileType.Forest */]: "#00500bff",
    [4 /* TileType.Town */]: "#4b3311ff",
};
const TILE_NAMES = {
    [0 /* TileType.Grassland */]: "grassland",
    [1 /* TileType.Mountains */]: "mountains",
    [2 /* TileType.Water */]: "water",
    [3 /* TileType.Forest */]: "forest",
    [4 /* TileType.Town */]: "town",
};
export class WorldMap {
    constructor(width, height) {
        this.grid = [];
        // Temporary test code to display every type of tile
        let curTileId = 0;
        for (let y = 0; y < height; y++) {
            const row = [];
            for (let x = 0; x < width; x++) {
                row.push(curTileId);
                curTileId++;
                if (curTileId > 4)
                    curTileId = 0;
            }
            this.grid.push(row);
        }
    }
    getTileName(x, y) {
        return TILE_NAMES[this.getTileType(y, x)];
    }
    getTileColor(x, y) {
        return TILE_COLORS[this.getTileType(x, y)];
    }
    getTileType(x, y) {
        return this.grid[y][x];
    }
    getWidth() {
        return this.grid[0].length;
    }
    getHeight() {
        return this.grid.length;
    }
}
