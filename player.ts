export class Player {
    // Tile coords
    private x: number;
    private y: number;

    // Visual coords (can be fractional)
    private visualX: number;
    private visualY: number;

    private isAnimating: boolean = false;
    private animationStartX: number = 0;
    private animationStartY: number = 0;
    private animationTargetX: number = 0;
    private animationTargetY: number = 0;
    private animationProgress: number = 0;  // 0.0 to 1.0
    private animationDuration: number = 250;

    constructor (startX: number, startY: number) {
        this.x = startX;
        this.y = startY;
        this.visualX = startX;
        this.visualY = startY;
    }

    public update(deltaTime: number) {
        if (!this.isAnimating) return;
        if (deltaTime > 20) console.log("Slow frame:", deltaTime); 
        this.animationProgress += deltaTime / this.animationDuration;

        if (this.animationProgress >= 1.0) {
            this.animationProgress = 1.0;
            this.isAnimating = false;
            this.visualX = this.animationTargetX;
            this.visualY = this.animationTargetY;
        } else {
            this.visualX = this.lerp(this.animationStartX, this.animationTargetX, this.animationProgress);
            this.visualY = this.lerp(this.animationStartY, this.animationTargetY, this.animationProgress);
        }
    }

    public getPosition(): [number, number] {
        return [this.x, this.y];
    }

    public getVisualPosition(): [number, number] {
        return [this.visualX, this.visualY];
    }

    public moveInDirection(direction: [number, number]) {
        if (this.isAnimating) return;

        this.animationStartX = this.x;
        this.animationStartY = this.y;
        this.animationTargetX = this.x + direction[0];
        this.animationTargetY = this.y + direction[1];
        this.animationProgress = 0;
        this.isAnimating = true;

        this.x += direction[0];
        this.y += direction[1];
    }

    private lerp(current: number, target: number, speed: number): number {
        return current + (target - current) * speed;
    }
}