export class InputHandler {
    constructor() {
        this.moveDirection = [0, 0];
        window.addEventListener('keydown', (event) => {
            if (event.key === 'ArrowRight' || event.key === 'd') {
                this.moveRight();
            }
        });
        window.addEventListener('keydown', (event) => {
            if (event.key === 'ArrowLeft' || event.key === 'a') {
                this.moveLeft();
            }
        });
        window.addEventListener('keydown', (event) => {
            if (event.key === 'ArrowUp' || event.key === 'w') {
                this.moveUp();
            }
        });
        window.addEventListener('keydown', (event) => {
            if (event.key === 'ArrowDown' || event.key === 's') {
                this.moveDown();
            }
        });
    }
    setMoveCallback(callback) {
        this.moveCallback = callback;
    }
    getDirection() {
        return this.moveDirection;
    }
    resetDirection() {
        this.moveDirection = [0, 0];
    }
    moveRight() {
        this.moveDirection = [1, 0];
        if (this.moveCallback)
            this.moveCallback();
    }
    moveLeft() {
        this.moveDirection = [-1, 0];
        if (this.moveCallback)
            this.moveCallback();
    }
    moveDown() {
        this.moveDirection = [0, 1];
        if (this.moveCallback)
            this.moveCallback();
    }
    moveUp() {
        this.moveDirection = [0, -1];
        if (this.moveCallback)
            this.moveCallback();
    }
}
