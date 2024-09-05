class StatusBarBottles extends DrawableObject {
    IMAGES = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png'
    ];

    bottleAmount = 0;

    constructor() {
        super();
        this.x = 320;
        this.y = 0;  // Position unterhalb der Münzenanzeige
        this.width = 140;
        this.height = 40;
        this.loadImages(this.IMAGES);
        this.setBottleAmount(0);
    }

    setBottleAmount(bottleAmount) {
        this.bottleAmount = bottleAmount;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    resolveImageIndex() {
        if (this.bottleAmount == 10) {
            return 5;
        } else if (this.bottleAmount > 8) {
            return 4;
        } else if (this.bottleAmount > 6) {
            return 3;
        } else if (this.bottleAmount > 4) {
            return 2;
        } else if (this.bottleAmount > 2) {
            return 1;
        } else {
            return 0;
        }
    }
}