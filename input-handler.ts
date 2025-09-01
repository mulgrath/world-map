export class InputHandler {
    private moveDirection: [number, number];
    private inputBlocked: boolean = false;
    private moveCallback?: () => void;
    private mapToggleCallback?: () => void;

    constructor () {
        this.moveDirection = [0, 0];

        window.addEventListener('keydown', (event: KeyboardEvent) => {
            if (event.key === 'm') {
                this.mapToggleCallback?.();
                return;
            }

            if (this.inputBlocked) return;

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

    public setMoveCallback(callback: () => void) {
        this.moveCallback = callback;
    }

    public setMapToggleCallback(callback: () => void) {
        this.mapToggleCallback = callback;
    }

    public setInputBlocked(blocked: boolean) {
        this.inputBlocked = blocked;
    }

    public getDirection(): [number, number] {
        return this.moveDirection;
    }

    public resetDirection() {
        this.moveDirection = [0, 0];
    }

    private moveRight() {
        this.moveDirection = [1, 0];
        if (this.moveCallback) this.moveCallback();
    }

    private moveLeft() {
        this.moveDirection = [-1, 0];
        if (this.moveCallback) this.moveCallback();
    }

    private moveDown() {
        this.moveDirection = [0, 1];
        if (this.moveCallback) this.moveCallback();
    }

    private moveUp() {
        this.moveDirection = [0, -1];
        if (this.moveCallback) this.moveCallback();
    }
}
