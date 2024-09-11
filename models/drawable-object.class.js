class DrawableObject {
    x = 120;
    y = 280;
    img;
    height = 150;
    width = 100;
    imageCache = {};
    currentImage = 0;

    loadImage(path) {
        this.img = new Image(); // this.img = document.getElementById('image') <img id="image"> das gleiche nur js ohne html
        this.img.src = path;
    }

    draw(ctx) {
        try {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        } catch(e) { 
            console.log('could not load image', this.img.src);
        }
    }

    loadImages(array) {
        array.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof SmallChicken || this instanceof Endboss || this instanceof ThrowableObject) {
            ctx.beginPath();
            ctx.lineWidth = '10';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }

    drawFrameOffset(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof SmallChicken || this instanceof Endboss || this instanceof ThrowableObject || this instanceof Coin || this instanceof BackgroundObject) {
            ctx.beginPath();
            ctx.lineWidth = '2'; // Anpassung der Linienstärke für eine präzisere Darstellung
            ctx.strokeStyle = 'red';
    
            // Berechne die Position und Größe des Rechtecks unter Berücksichtigung des Offsets
            const offsetX = this.x + this.offset.left;
            const offsetY = this.y + this.offset.top;
            const offsetWidth = this.width - this.offset.left - this.offset.right;
            const offsetHeight = this.height - this.offset.top - this.offset.bottom;
    
            // Zeichne das Rechteck mit den berechneten Werten
            ctx.rect(offsetX, offsetY, offsetWidth, offsetHeight);
            ctx.stroke();
        }
    }
}