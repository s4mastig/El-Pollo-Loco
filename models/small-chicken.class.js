class SmallChicken extends MovableObject {

    height = 70;
    width = 70;
    y = 347;
    energy = 4;
    differentSpeed = 3; // Geschwindigkeit des Sprungs
    normalspeed;
    jumpSpeed;

    offset = {
        top: 5,
        bottom: 5,
        left: 10,
        right: 10
    }

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'        
    ];

    IMAGES_JUMP = [
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png'
    ];

    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/2_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMP);
        this.loadImages(this.IMAGES_DEAD);
        
        this.speed = 0.6
        this.normalSpeed = this.speed;
        this.applyGravity(347);

        this.animate();
    }

    animate() {
        setInterval(() => {
            if (!this.isDead()) {
                if (Math.random() < 0.5) {
                    this.jumpSpeed = this.normalSpeed;
                } else {
                    this.jumpSpeed = this.differentSpeed;
                }
                this.jump(30);
            }
        }, 3000);

        setInterval(() => {
            if (!this.isDead()) {
                this.moveLeft();
            }
        }, 1000 / 60);

        setInterval(() => {
            if (!this.isDead() && !this.isAboveGround(347)) {
                this.playAnimation(this.IMAGES_WALKING);
                this.speed = this.normalSpeed;
            } 
            if (this.isAboveGround(347)) {
                this.playAnimation(this.IMAGES_JUMP);
                this.speed = this.jumpSpeed;
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
