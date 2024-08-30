class MovableObject {
    x = 120;
    y = 280;
    img;
    height = 150;
    width = 100;
    imageCache = {};
    currentImage = 0;
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;

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
        return this.y < 128;
    }


    loadImage(path) {
        this.img = new Image(); // this.img = document.getElementById('image') <img id="image"> das gleiche nur js ohne html
        this.img.src = path;
    }

    loadImages(array) {
        array.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });

    }

    moveRight() {
        this.x += this.speed; 
    }

    moveLeft() {
        this.x -= this.speed;
    }

    playAnimation(images) {
        let i = this.currentImage % this.IMAGES_WALKING.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    jump() {
        this.speedY = 30;
    }
}