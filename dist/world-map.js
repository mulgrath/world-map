export const TILE_SIZE = 32;
const mapString = `WWWMMMMMWWWWWWWWWMMM
    WWFGGFFMMWWMGGGFWFMM
    WWWTGGFFMWMMMGGFTGFM
    WWFGGGFGFWWMGGFFGFMM
    WWFGGGFFFWWMGGFFFGMM
    WWGFGFFFFWWMMGGFFFMM
    WWWGGFFFWWWMMGFFFFMM
    WWWGGGFFFWMMGFFFFGGM
    WWWWGGFFWWMGFFFFGGMM
    WWWWGGFFFFFFFFMGGMMM
    WWWGGGFFFFFFFGMMGMMM
    WWWWGWWMMGFGMMMMMMMM
    WWFGGWWWWWWWWWWMMMMM
    WWGTGWWWWWWWWWWWWMMM
    WWWWWWWWWWWWWWWWWWWW`;
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
    constructor(width, height, player) {
        this.grid = [];
        const cleanMapString = mapString.replace(/\s+/g, "");
        let curTileId = 0;
        for (let y = 0; y < height; y++) {
            const row = [];
            for (let x = 0; x < width; x++) {
                const mapChar = cleanMapString.charAt(curTileId);
                row.push(this.getTypeByChar(mapChar));
                curTileId++;
            }
            this.grid.push(row);
        }
        this.player = player;
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
    isValidMove(direction) {
        const curPos = this.player.getPosition();
        const destTile = this.getTileType(curPos[0] + direction[0], curPos[1] + direction[1]);
        if (destTile === 1 /* TileType.Mountains */ || destTile === 2 /* TileType.Water */) {
            return false;
        }
        else {
            return true;
        }
    }
    getPlayerTilePos() {
        return this.player.getPosition();
    }
    getTypeByChar(char) {
        switch (char) {
            case "G":
                return 0 /* TileType.Grassland */;
            case "M":
                return 1 /* TileType.Mountains */;
            case "W":
                return 2 /* TileType.Water */;
            case "F":
                return 3 /* TileType.Forest */;
            case "T":
                return 4 /* TileType.Town */;
            default:
                throw new Error("Invalid tile character.");
        }
    }
}
