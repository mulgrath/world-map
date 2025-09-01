export class InputHandler {
    constructor() {
        this.inputBlocked = false;
        this.moveDirection = [0, 0];
        window.addEventListener('keydown', (event) => {
            if (event.key === 'm') {
                this.mapToggleCallback?.();
                return;
            }
            if (this.inputBlocked)
                return;
            if (event.key === 'ArrowRight' || event.key === 'd') {
                this.moveRight();
            }
            if (event.key === 'ArrowLeft' || event.key === 'a') {
                this.moveLeft();
            }
            if (event.key === 'ArrowUp' || event.key === 'w') {
                this.moveUp();
            }
            if (event.key === 'ArrowDown' || event.key === 's') {
                this.moveDown();
            }
        });
    }
    setMoveCallback(callback) {
        this.moveCallback = callback;
    }
    setMapToggleCallback(callback) {
        this.mapToggleCallback = callback;
    }
    setInputBlocked(blocked) {
        this.inputBlocked = blocked;
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
