class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;
    lastIdleTime = 0;
    sleepThreshold = 7000;

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }

            if (!this.isAboveGround()) {
                this.y = 128;  // Setzt y direkt auf 128, wenn der Charakter den Boden erreicht
                this.speedY = 0;  // Stoppt die vertikale Bewegung
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        }
        return this.y < 128;
    }

    isColliding(mo) {
        return this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x + mo.width &&
            this.y < mo.y + mo.height;
    }

    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit; //difference in ms
        timePassed = timePassed / 1000; // difference in s
        return timePassed < 1; // only if timePassed < 5s isHurt = true;
    }

    isDead() {
        return this.energy == 0;
    }

    isIdle() {
        return !this.world.keyboard.RIGHT && !this.world.keyboard.LEFT && !this.world.keyboard.SPACE;
    }

    isSleeping() {
        if (this.isIdle()) {
            if (this.lastIdleTime === 0) {
                this.lastIdleTime = new Date().getTime(); // Zeitstempel setzen
            }
            let idleDuration = new Date().getTime() - this.lastIdleTime;
            if (idleDuration >= this.sleepThreshold) {
                return true; // Spieler schläft
            }
        } else {
            this.lastIdleTime = 0; // Idle-Zeit zurücksetzen
        }
        return false;
    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    jump() {
        this.speedY = 30;
    }
}