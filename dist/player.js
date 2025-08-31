export class Player {
    constructor(startX, startY) {
        this.x = startX;
        this.y = startY;
    }
    getPosition() {
        return [this.x, this.y];
    }
    moveInDirection(direction) {
        this.x += direction[0];
        this.y += direction[1];
    }
}
