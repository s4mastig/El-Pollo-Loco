class StatusBarCoins extends DrawableObject {
    IMAGES = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png'
    ];

    coinAmount = 0;

    constructor() {
        super();
        this.x = 170;
        this.y = 0;
        this.width = 140;
        this.height = 40;
        this.loadImages(this.IMAGES);
        this.setCoinAmount(0);
    }

    setCoinAmount(coinAmount) {
        this.coinAmount = coinAmount;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    resolveImageIndex() {
        if(this.coinAmount == 20) {
            return 5;
        } else if (this.coinAmount > 16) {
            return 4;
        } else if (this.coinAmount > 12) {
            return 3;
        } else if (this.coinAmount > 8) {
            return 2;
        } else if (this.coinAmount > 4) {
            return 1;
        } else {
            return 0;
        }
    }
}