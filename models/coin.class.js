class Coin extends MovableObject {
    x;
    y;
    width = 100; 
    height = 100;
    isCollected = false;
    
    offset = {
        top: 30,
        bottom: 30,
        left: 30,
        right: 30
    }


    IMAGES_COIN = [
        'img/8_coin/coin_1.png'
    ];
    
    constructor() {
        super(); 
        this.loadImage('img/8_coin/coin_1.png');
        this.generateCoins();
    }

    generateCoins() {
        // Hier definieren wir mögliche Höhenstufen für die Münzen
        const heights = [40, 130, 280];
        // Wähle zufällig eine Höhe aus den definierten Höhenstufen
        this.y = heights[Math.floor(Math.random() * heights.length)];
        // Wähle zufällig eine X-Position innerhalb des Levels
        this.x = Math.floor(Math.random() * (2500 - this.width)); // 2500 ist die Breite des Levels, und width ist die Breite der Münze
    }
}