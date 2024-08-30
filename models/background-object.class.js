class BackgroundObject extends MovableObject{

    height = 480;
    width = 720;
    constructor(imagePath, x) {

        super().loadImage(imagePath);
        this.x = x;
        this.y = 480 - this.height; // höhe der canvas minus 400, der Höhe aller Backgroundobjects;
    }
}