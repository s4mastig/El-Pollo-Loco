class World {

    character = new Character();
    level = level1;
    ctx;
    canvas;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    statusBarCoins = new StatusBarCoins();
    statusBarBottles = new StatusBarBottles();
    statusBarEndboss = new StatusBarEndboss();
    throwableObjects = [];
    collectedCoins = 0;
    collectedBottles = 0;
    isAboveEnemyState = false;
    throwDelay = 500; // Zeit in Millisekunden, die vergehen muss, bevor eine neue Flasche geworfen werden kann
    lastThrowTime = 0;
    


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
        let now = Date.now();
        if (this.keyboard.D && this.collectedBottles > 0) {
            if (now - this.lastThrowTime >= this.throwDelay) {
            let direction = this.character.otherDirection ? -1 : 1;
            let startPoint = this.character.otherDirection ? 0 : 100;
            let bottle = new ThrowableObject(this.character.x + startPoint, this.character.y + 100, direction);
            this.throwableObjects.push(bottle);
            this.statusBarBottles.setBottleAmount(this.collectedBottles);
            this.collectedBottles--;
            this.lastThrowTime = now;
            }
        }
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (enemy instanceof Endboss && this.character.firstMetEndboss == false) {
                let distance = Math.abs(this.character.x - enemy.x);
                if (distance < 400) { // Beispielwert für die Distanz, passe diesen nach Bedarf an
                    this.character.blockMovement(5000);
                    enemy.animate();
                    this.character.firstMetEndboss = true;
                }
            }

            if (this.character.isColliding(enemy) && !enemy.isDead()) {
                if (this.character.isAboveEnemy(enemy) && !(enemy instanceof Endboss)) {
                    this.character.setAboveEnemyState(true);
                    enemy.energy = 0;
                    this.character.smallJump();
                    console.log('Enemy energy after collision:', enemy.energy); // Debugging
                    console.log('Is enemy dead?:', enemy.isDead()); // Debugging
                    return;
                } else if (!this.character.isAboveEnemyState && !enemy.isDead() && !this.character.isInvulnerable()) {
                    this.character.hit();
                    console.log('character hit, energy =', this.character.energy);
                    this.statusBar.setPercentage(this.character.energy);
                }
            }
            this.throwableObjects.forEach((bottle) => {  // Überprüfe jede Flasche auf Kollision
                if (bottle.isColliding(enemy)) {
                    enemy.hit(); // Huhn als getroffen markieren
                    if (enemy instanceof Endboss) {
                        console.log(`Updating Endboss status bar with energy: ${enemy.energy}`);
                        this.statusBarEndboss.setPercentage(enemy.energy);
                    }
                }
            });
        })
        // **Neuer Block für die Münzen**
        this.handleCollectibles(this.level.coins, 'Coin');
        this.handleCollectibles(this.level.bottles, 'Bottle');
    }

    handleCollectibles(collectibles, collectibleType) {
        collectibles.forEach((collectible) => {
            if (this.character.isColliding(collectible)) {
                console.log('Checking collision with bottle at', collectible.x, collectible.y);
                if (collectible.collect(collectibles)) { // Übergibt das Array an collect()
                    console.log(`${collectibleType} collected!`);
                    
                    // Unterscheidet zwischen Münzen und Flaschen
                    if (collectibleType === 'Coin') {
                        this.collectedCoins++; // Zähle eingesammelte Münzen
                        this.statusBarCoins.setCoinAmount(this.collectedCoins);
                    } else if (collectibleType === 'Bottle') {
                        this.collectedBottles++; // Zähle eingesammelte Flaschen
                        this.statusBarBottles.setBottleAmount(this.collectedBottles);
                    }
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
        this.addObjectsToMap(this.level.bottles);
        this.ctx.translate(-this.camera_x, 0)
        // space for fixed objects
        this.addToMap(this.statusBar);
        this.addToMap(this.statusBarCoins);
        this.addToMap(this.statusBarBottles);
        if (this.statusBarEndboss.visible) {
            this.addToMap(this.statusBarEndboss);
        }
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
