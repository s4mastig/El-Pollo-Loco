class Bottle extends MovableObject {
    
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
    
    IMAGES = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',   
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png' 
    ];


    constructor() {
        super(); 
        this.loadImage(this.randomBottleImage());
        this.generateBottles();
    }

    randomBottleImage() {
        // Wähle ein zufälliges Bild aus den definierten Flaschenbildern
        return this.IMAGES[Math.floor(Math.random() * this.IMAGES.length)];
    }

    generateBottles() {
        // Setze die y-Koordinate immer auf Bodenhöhe (z.B. 360 für den Boden)
        this.y = 325; // Höhe des Bodens anpassen je nach Spielwelt
        // Wähle zufällig eine X-Position innerhalb des Levels
        this.x = Math.floor(Math.random() * (2500 - this.width)); // 2500 ist die Breite des Levels, und width ist die Breite der Flasche
    }
}