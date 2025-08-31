import { Player } from "./player.js";

export const TILE_SIZE: number = 32;

export const enum TileType {
    Grassland,
    Mountains,
    Water,
    Forest,
    Town,
}

const mapString: string = 
   `WWWMMMMMWWWWWWWWWMMM
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
    private player: Player;

    constructor (width: number, height: number, player: Player) {
        const cleanMapString = mapString.replace(/\s+/g, "");
        let curTileId = 0;
        for (let y = 0; y < height; y++) {
            const row: number[] = [];
            for (let x = 0; x < width; x++) {
                const mapChar: string = cleanMapString.charAt(curTileId);
                
                row.push(this.getTypeByChar(mapChar));
                curTileId++;
            }
            this.grid.push(row);
        }

        this.player = player;
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

    public isValidMove(direction: [number, number]): boolean {
        const curPos = this.player.getPosition();
        const xDir = curPos[0] + direction[0];
        const yDir = curPos[1] + direction[1];
        

        if (xDir < 0 || xDir >= this.getWidth() || yDir < 0 || yDir >= this.getHeight()) {
            return false;
        }
        
        const destTile = this.getTileType(curPos[0] + direction[0], curPos[1] + direction[1]);
        if (destTile === TileType.Mountains || destTile === TileType.Water) {
            return false;
        }
        else {
            return true;
        }
    }

    public getPlayerVisualPos(): [number, number] {
        return this.player.getVisualPosition();
    }

    public getPlayerPosition(): [number, number] {
        return this.player.getPosition();
    }

    private getTypeByChar(char: string): number {
        switch (char) {
            case "G":
                return TileType.Grassland;
            case "M":
                return TileType.Mountains;
            case "W":
                return TileType.Water;
            case "F":
                return TileType.Forest;
            case "T":
                return TileType.Town;
            default:
                throw new Error("Invalid tile character.");
        }
    }
}