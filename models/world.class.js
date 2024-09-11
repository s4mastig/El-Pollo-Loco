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
    chickenSpawnInterval;
    maxChickensAtStart = 20; // Feste Anzahl von Hühnern zu Beginn
 
    


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
        this.level.enemies.forEach(enemy => enemy.world = this);
        this.level.backgroundObjects.forEach(backgroundObject => backgroundObject.world = this);
        this.level.coins.forEach(coin => coin.world = this);
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
        }, 50);
        setInterval(() => {
            this.checkThrowObjects();
        }, 150);
        this.spawnInitialChickens();
        this.startChickenSpawn();
        this.placeClouds(); // Beispiel mit 700px Abstand
        // this.startCloudSpawn();
    }

    placeClouds() {
        let currentX = 100;
        let toggle = true;
        let cloudGap = 150;
        let cloudWidth = 500;

        while (currentX < this.level.level_end_x) {
            if (toggle) {
                let cloud = new Cloud('img/5_background/layers/4_clouds/1.png', currentX);
                this.level.clouds.push(cloud);
                cloud.world = this;
                console.log('cloud released');
            } else {
                let differentCloud = new Cloud('img/5_background/layers/4_clouds/2.png', currentX);
                this.level.clouds.push(differentCloud);
                differentCloud.world = this;
            }
            currentX += cloudWidth + cloudGap;
            toggle = !toggle;
        }
    }

    spawnInitialChickens() {
        let lastChickenX = 800; // Startpunkt für das erste Huhn bei 500px
    
        for (let i = 0; i < this.maxChickensAtStart; i++) {
            let newChicken = this.randomChicken();
            newChicken.world = this;
    
            // Erzeuge einen zufälligen Abstand zwischen 100 und 300 Pixeln
            let randomDistance = 200 + Math.random() * 200; 
    
            // Setze das nächste Huhn in einem Abstand vom letzten Huhn
            newChicken.x = lastChickenX + randomDistance;
    
            // Aktualisiere die Position des letzten Huhns
            lastChickenX = newChicken.x;
    
            // Füge das Huhn zur Liste der Gegner hinzu
            this.level.enemies.push(newChicken);
        }
    }

    startChickenSpawn() {
        let spawnInterval = Math.random() * 2000 + 3000;
        this.chickenSpawnInterval = setInterval(() => {
            if (!this.character.firstMetEndboss) {
                this.spawnChicken();
            } 
        }, spawnInterval); // Hühner alle 5 Sekunden spawnen
    }

    spawnChicken() {
            let newChicken = this.randomChicken();
            newChicken.world = this;
            newChicken.x = 7100; // Feste x-Position bei 2000px
            this.level.enemies.push(newChicken); // Füge das Huhn zur Liste der Gegner hinzu
    }

    randomChicken() {
            let newChicken;
            if (Math.random() < 0.5) { // 50% Chance für SmallChicken
                newChicken = new SmallChicken();
            } else {
                newChicken = new Chicken();
            }
            return newChicken;
    }

    checkThrowObjects() {
        let now = Date.now();
        if (this.keyboard.D && this.collectedBottles > 0 && !this.character.isMovementBlocked) {
            if (now - this.lastThrowTime >= this.throwDelay) {
            let direction = this.character.otherDirection ? -1 : 1;
            let startPoint = this.character.otherDirection ? 0 : 100;
            this.character.isThrowing = true;
            let bottle = new ThrowableObject(this.character.x + startPoint, this.character.y + 100, direction);
            bottle.world = this;
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
                if (distance < 360) { // Beispielwert für die Distanz, passe diesen nach Bedarf an
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
                } else if (!this.character.isAboveEnemyState && !enemy.isDead() && !this.character.isInvulnerable(1)) {
                    this.character.hit();
                    console.log('character hit, energy =', this.character.energy);
                    this.statusBar.setPercentage(this.character.energy);
                }
            }
            this.throwableObjects.forEach((bottle) => {  // Überprüfe jede Flasche auf Kollision
                this.level.backgroundObjects.forEach((backgroundObject) => {
                    if (bottle.isColliding(backgroundObject) && 
    (!bottle.isColliding(enemy) || (bottle.isColliding(enemy) && !(enemy instanceof Endboss)))) {
                        console.log('Bottle collided with backgroundObject');
                        bottle.hasCollidedWithGround = true;
                        bottle.setImpact();
                    }
                    // if (bottle.isColliding(enemy) && enemy instanceof Endboss && enemy.isInvulnerable(1.5) && bottle.isColliding(backgroundObject)) {
                    //     bottle.hasCollidedWithGround = true;
                    //     bottle.setImpact();
                    //     console.log('Bottle collided with backgroundObject');
                    // }
                });
                if (!bottle.hasCollidedWithGround && bottle.isColliding(enemy) && !enemy.isInvulnerable(1.5)) {
                    bottle.setImpact();
                    enemy.hit(); 
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
