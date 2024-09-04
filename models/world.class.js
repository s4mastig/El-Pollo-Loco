class World {

    character = new Character();
    level = level1;
    ctx;
    canvas;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    statusBarCoins = new StatusBarCoins();
    throwableObjects = [];

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run()
    }

    setWorld() {
        this.character.world = this;
        this.throwableObjects.forEach(obj => obj.world = this);
        this.level.enemies.forEach(enemy => enemy.world = this);
        this.level.coins.forEach(coin => coin.world = this);
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
        }, 50);
        setInterval(() => {
            this.checkThrowObjects();
        }, 150);
    }

    checkThrowObjects() {
        if (this.keyboard.D) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(bottle);
        }
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && !enemy.isDead()) {
                if (this.character.isAboveEnemy(enemy) && !enemy == this.endboss) {
                    enemy.energy = 0;
                    console.log('Enemy energy after collision:', enemy.energy); // Debugging
                    console.log('Is enemy dead?:', enemy.isDead()); // Debugging
                } else if (!enemy.isDead() && !this.character.isInvulnerable()) {
                    this.character.hit();
                    console.log('collision with character, energy', this.character.energy);
                    this.statusBar.setPercentage(this.character.energy);
                }
            }
            this.throwableObjects.forEach((bottle) => {  // Überprüfe jede Flasche auf Kollision
                if (bottle.isColliding(enemy)) {
                    enemy.hit(); // Huhn als getroffen markieren
                }
            });
        })
        // **Neuer Block für die Münzen**
        this.level.coins.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                if (coin.collect()) { // Münze einsammeln
                    console.log('Coin collected!');
                    // Hier kannst du andere Logik hinzufügen, wenn nötig
                }
            }
        });
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0)

        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.coins);
        this.ctx.translate(-this.camera_x, 0)
        // space for fixed objects
        this.addToMap(this.statusBar);
        this.addToMap(this.statusBarCoins);
        this.ctx.translate(this.camera_x, 0)
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);


        this.ctx.translate(-this.camera_x, 0)

        self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    };

    addObjectsToMap(objects) {
        objects.forEach(object => {
            this.addToMap(object);
        });
    }

    addToMap(mo) { // mo = movableObject
        if (mo.otherDirection) {
            this.flipImage(mo);
        }

        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);
        mo.drawFrameOffset(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
} 
