class Cloud extends MovableObject {

    width = 500;
    height = 250;

    constructor(path, x) {
        super().loadImage(path);

        this.y = 20;
        this.x = Math.random() * 700;
        this.animate();
        this.x = x;
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
        },)
    }
}