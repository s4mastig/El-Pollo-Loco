class ThrowableObject extends MovableObject {
    world;
    impact = false;
    hasCollidedWithGround = false;

    offset = {
        top: 10,
        bottom: 10,
        left: 20,
        right: 20
    }

    IMAGES_ROTATION = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    IMAGES_IMPACT = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    constructor(x, y, direction) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGES_ROTATION);
        this.loadImages(this.IMAGES_IMPACT);
        this.x = x;
        this.y = y;
        this.height = 70;
        this.width = 60;

        this.startRotation(direction);
    }

    startRotation(direction) {
        this.rotationInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_ROTATION);
        }, 50);
        this.throw(direction);
    }

    throw(direction) {
        this.speedY = 6;
        this.applyGravity();
        let speedBottle = 20 * direction;
        let speedSplash = 5 * direction;
        setInterval(() => {
            if (!this.impact) {
                this.x += speedBottle;
            } else {
                this.speedY = 1;  // Langsames Fallen nach dem Aufprall
                this.acceleration = 1;
                this.x += speedSplash;
                console.log(this.impact);
                clearInterval(this.rotationInterval);
                this.playAnimation(this.IMAGES_IMPACT);
                if (!this.hasBeenRemoved) {
                    this.hasBeenRemoved = true;
                    setTimeout(() => {
                        this.removeFromWorld(this.world.throwableObjects);
                        this.impact = false;
                        this.hasCollidedWithGround = false;
                    }, 300);
                }
            }
        }, 50);
    }

    setImpact() {
        this.impact = true;
    }
}
