class BackgroundObject extends MovableObject {

    isMovable = true;
    direction;
    speedBackground;
    offset = {
        top: 404,
        bottom: 0,
        left: 0,
        right: 0
    }
    height = 480;
    width = 720;
    constructor(imagePath, x, speed) {

        super().loadImage(imagePath);
        this.y = 480 - this.height; // höhe der canvas minus 400, der Höhe aller Backgroundobjects;
        this.speedBackground = speed;
        this.animate()
        this.x = x;
    }

    animate() {
        console.log('animating');
        setInterval(() => {
            // Bewege das Objekt basierend auf der aktuellen Richtung
            this.speed = this.speedBackground;
            if (this.isMovable && this.direction === 'left') {
                this.moveLeft();
            } else if (this.isMovable && this.direction === 'right') {
                this.moveRight();
            }
        }, 1000 / 60); // 60 FPS
    }

    checkIfMoving(direction) {
        this.direction = direction;
    }
}