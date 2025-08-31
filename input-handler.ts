export class InputHandler {
    private moveDirection: [number, number];
    private moveCallback?: () => void;

    constructor () {
        this.moveDirection = [0, 0];

        window.addEventListener('keydown', (event: KeyboardEvent) => {
            if (event.key === 'RightArrow' || event.key === 'd') {
                this.moveRight();
            }
        });

        window.addEventListener('keydown', (event: KeyboardEvent) => {
            if (event.key === 'LeftArrow' || event.key === 'a') {
                this.moveLeft();
            }
        });

        window.addEventListener('keydown', (event: KeyboardEvent) => {
            if (event.key === 'UpArrow' || event.key === 'w') {
                this.moveUp();
            }
        });

        window.addEventListener('keydown', (event: KeyboardEvent) => {
            if (event.key === 'DownArrow' || event.key === 's') {
                this.moveDown();
            }
        });
    }

    public setMoveCallback(callback: () => void) {
        this.moveCallback = callback;
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
