export const TILE_SIZE: number = 32;

export const enum TileType {
    Grassland,
    Mountains,
    Water,
    Forest,
    Town,
}

const TILE_COLORS = {
    [TileType.Grassland]: "#619906ff",
    [TileType.Mountains]: "#7a7a7aff",
    [TileType.Water]: "#2362c2ff",
    [TileType.Forest]: "#00500bff",
    [TileType.Town]: "#4b3311ff",
}

const TILE_NAMES = {
    [TileType.Grassland]: "grassland",
    [TileType.Mountains]: "mountains",
    [TileType.Water]: "water",
    [TileType.Forest]: "forest",
    [TileType.Town]: "town",
}

export class WorldMap {
    private grid: number[][] = [];

    constructor (width: number, height: number) {
        // Temporary test code to display every type of tile
        let curTileId = 0;
        for (let y = 0; y < height; y++) {
            const row: number[] = [];
            for (let x = 0; x < width; x++) {
                row.push(curTileId);
                curTileId++;
                if (curTileId > 4) curTileId = 0;
            }
            this.grid.push(row);
        }
    }

    public getTileName(x: number, y: number): string {
        return TILE_NAMES[this.getTileType(y, x)];
    }

    public getTileColor(x: number, y: number): string {
        return TILE_COLORS[this.getTileType(x, y)];
    }

    public getTileType(x: number, y: number): TileType {
        return this.grid[y][x];
    }

    public getWidth() {
        return this.grid[0].length;
    }

    public getHeight() {
        return this.grid.length;
    }
}