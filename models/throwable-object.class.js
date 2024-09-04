class ThrowableObject extends MovableObject {

    offset = {
        top: 10,
        bottom: 10,
        left: 20,
        right: 20
    }
    
    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.throw();
    }

    throw() {
        this.speedY = 5;
        this.applyGravity();
        setInterval(() => {
            this.x += 15;
        }, 25);
    }
}