export class Player {
    private x: number;
    private y: number;

    constructor (startX: number, startY: number) {
        this.x = startX;
        this.y = startY;
    }

    public getPosition(): [number, number] {
        return [this.x, this.y];
    }

    public moveInDirection(direction: [number, number]) {
        this.x += direction[0];
        this.y += direction[1];
    }
}