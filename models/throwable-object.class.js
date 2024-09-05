class ThrowableObject extends MovableObject {

    offset = {
        top: 10,
        bottom: 10,
        left: 20,
        right: 20
    }
    
    constructor(x, y, direction) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.throw(direction);
    }

    throw(direction) {
        this.speedY = 5;
        this.applyGravity();
        let speed = 15 * direction;
        setInterval(() => {
            this.x += speed;
        }, 25);
    }
}