export class Player {
    constructor(startX, startY) {
        this.isAnimating = false;
        this.animationStartX = 0;
        this.animationStartY = 0;
        this.animationTargetX = 0;
        this.animationTargetY = 0;
        this.animationProgress = 0; // 0.0 to 1.0
        this.animationDuration = 250;
        this.x = startX;
        this.y = startY;
        this.visualX = startX;
        this.visualY = startY;
    }
    update(deltaTime) {
        if (!this.isAnimating)
            return;
        if (deltaTime > 20)
            console.log("Slow frame:", deltaTime);
        this.animationProgress += deltaTime / this.animationDuration;
        if (this.animationProgress >= 1.0) {
            this.animationProgress = 1.0;
            this.isAnimating = false;
            this.visualX = this.animationTargetX;
            this.visualY = this.animationTargetY;
            if (this.movementCompleteCallback) {
                this.movementCompleteCallback();
            }
        }
        else {
            this.visualX = this.lerp(this.animationStartX, this.animationTargetX, this.animationProgress);
            this.visualY = this.lerp(this.animationStartY, this.animationTargetY, this.animationProgress);
        }
    }
    getPosition() {
        return [this.x, this.y];
    }
    getIsAnimating() {
        return this.isAnimating;
    }
    getVisualPosition() {
        return [this.visualX, this.visualY];
    }
    setMovementCompleteCallback(callback) {
        this.movementCompleteCallback = callback;
    }
    moveInDirection(direction) {
        if (this.isAnimating)
            return;
        this.animationStartX = this.x;
        this.animationStartY = this.y;
        this.animationTargetX = this.x + direction[0];
        this.animationTargetY = this.y + direction[1];
        this.animationProgress = 0;
        this.isAnimating = true;
        this.x += direction[0];
        this.y += direction[1];
    }
    lerp(current, target, speed) {
        return current + (target - current) * speed;
    }
}
