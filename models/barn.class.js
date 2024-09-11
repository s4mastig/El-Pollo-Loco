class Barn extends BackgroundObject {
    width = 500;
    height = 350;

    constructor(imagePath, x) {
        super(imagePath, x, 0);

        this.y = 115;
        this.x = x;
        console.log(this.x);
        this.movable = false;
    }
}