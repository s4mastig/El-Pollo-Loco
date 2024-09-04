class Chicken extends MovableObject {

    height = 90;
    width = 90;
    y = 332;
    energy = 4;
    hasBeenRemoved = false;

    offset = {
        top: 5,
        bottom: 5,
        left: 10,
        right: 10
    }

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);

        this.x = 700 + Math.random() * 500; // zufällige Zahl zwischen 0 und 1 * 500 -> Zahl zwischen 200 und 700
        this.speed = 0.15 + Math.random() * 0.5;

        this.animate();
    }

    animate() {
        setInterval(() => {
            if (!this.isDead()) {
                this.moveLeft();
            }
        }, 1000 / 60);

        setInterval(() => {
            if (!this.isDead()) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 150)

        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
                if (!this.hasBeenRemoved) {
                    this.hasBeenRemoved = true;
                    setTimeout(() => {
                        this.removeFromWorld(this.world.level.enemies);
                    }, 1000);
                }
            }
        }, 150);
    }
}