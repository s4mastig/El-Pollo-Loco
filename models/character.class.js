class Character extends MovableObject {

    height = 300;
    width = 150;
    y = 128;
    world;
    speed = 5;

    cameraOffset = 100; // Standard Offset
    cameraSpeed = 0.01; // Geschwindigkeit der Kamerabewegung

    jumpingAnimationStarted = false;
    jumpingAnimationCompleted = false;
    isMovementBlocked = false;
    firstMetEndboss = false;
    transitioning = false;
    isLeftOfEndboss = true;
    isRightOfEndboss = false;
    isThrowing = false;
    currentTransitionDirection = 'rightToLeft';


    offset = {
        top: 120,
        bottom: 0,
        left: 40,
        right: 40
    }

    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png',
    ];

    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];

    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ];

    IMAGES_SLEEP = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];

    IMAGES_THROW = [
        'img/2_character_pepe/2_walk/W-23.png'
    ];


    walking_sound = new Audio('audio/running.mp3');


    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_SLEEP);
        this.loadImages(this.IMAGES_THROW);
        this.applyGravity(128);
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.walking_sound.pause();
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x && !this.isMovementBlocked) {
                this.moveRight();
                this.world.level.backgroundObjects.forEach(backgroundObject => {
                    backgroundObject.checkIfMoving('right');
                });
                this.otherDirection = false;
                this.walking_sound.play();
            } else if ((this.world.keyboard.RIGHT && this.x >= this.world.level.level_end_x) || this.isMovementBlocked) {
                this.world.level.backgroundObjects.forEach(backgroundObject => {
                    backgroundObject.checkIfMoving('noMovement');
                });
            }

            if (this.world.keyboard.LEFT && this.x > 0 && !this.isMovementBlocked) {
                this.moveLeft();
                this.world.level.backgroundObjects.forEach(backgroundObject => {
                    backgroundObject.checkIfMoving('left');
                });
                this.otherDirection = true;
                this.walking_sound.play();
            } else if (this.world.keyboard.LEFT && this.x <= 0) {
                this.world.level.backgroundObjects.forEach(backgroundObject => {
                    backgroundObject.checkIfMoving('noMovement');
                });
            }

            if (!this.world.keyboard.LEFT && !this.world.keyboard.RIGHT) {
                this.world.level.backgroundObjects.forEach(backgroundObject => {
                    backgroundObject.checkIfMoving('noMovement');
                });
            }

            if (this.world.keyboard.SPACE && !this.isAboveGround(128) && !this.isMovementBlocked && this.world.keyboard.canJump) {
                console.log("Jump initiated");
                this.currentImage = 0;
                this.jump(30);
                keyboard.canJump = false;
                this.jumpingAnimationStarted = true;
                this.jumpingAnimationCompleted = false;
            }

            this.updateCameraPosition();
        }, 1000 / 60);

        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            } else {
                if ((this.world.keyboard.RIGHT || this.world.keyboard.LEFT) && !this.isMovementBlocked) {
                    if (!this.isAboveGround(128)) {
                        this.playAnimation(this.IMAGES_WALKING);
                    }
                }
            }
        }, 50);

        setInterval(() => {
            if (this.isSmallJumping && !this.isThrowing) {
                this.playAnimation(this.IMAGES_JUMPING.slice(2));
                this.isSmallJumping = false;
                console.log('Playing small JUMPING animation')
            } else if (this.jumpingAnimationStarted && !this.jumpingAnimationCompleted && !this.isHurt() && !this.isMovementBlocked && !this.isThrowing) {
                console.log('Playing JUMPING animation');
                this.playAnimation(this.IMAGES_JUMPING);
                if (!this.isAboveGround(128)) {
                    this.jumpingAnimationCompleted = true;
                    this.jumpingAnimationStarted = false;
                }
            } else if (this.isThrowing) {
                this.playAnimation(this.IMAGES_THROW);
                setTimeout(() => {
                    this.isThrowing = false;
                }, 200);
            }
        }, 200);


        setInterval(() => {
            if (this.isSleeping()) {
                this.playAnimation(this.IMAGES_SLEEP);
            } else if (this.isIdle() && !this.isAboveGround(128) && !this.isHurt() && !this.isDead() && !this.isThrowing) {
                console.log('Playing IDLE animation');
                this.playAnimation(this.IMAGES_IDLE);
                this.world.level.backgroundObjects.forEach(backgroundObject => {
                    backgroundObject.checkIfMoving('noMovement');
                });
            } else if (this.isIdle() && this.isHurt()) {
                this.world.level.backgroundObjects.forEach(backgroundObject => {
                    backgroundObject.checkIfMoving('noMovement');
                });
            }
        }, 200);
    }

    updateCameraPosition() {
        let endboss = this.world.level.enemies.find(enemy => enemy instanceof Endboss);
        let endbossX = endboss.x;
        let endbossWidth = 250; // Breite des Endbosses
        let characterX = this.x;
        let characterWidth = 150; // Breite des Charakters

        // Berechnung der rechten Ränder des Endbosses und des Charakters
        let endbossRight = endbossX + endbossWidth;
        let characterRight = characterX + characterWidth;

        // Prüfen, ob der Charakter vollständig rechts vom Endboss ist
        let isCurrentlyRightOfEndboss = characterRight > endbossRight;
        // Prüfen, ob der Charakter vollständig links vom Endboss ist
        let isCurrentlyLeftOfEndboss = characterX < endbossX;

        // Überprüfen, ob der Charakter von rechts nach links überholt wurde
        if (!this.isRightOfEndboss && isCurrentlyRightOfEndboss) {
            // Von links nach rechts überholt
            this.isLeftOfEndboss = false;
            this.isRightOfEndboss = true;
            this.currentTransitionDirection = 'leftToRight';
            this.transitioning = true;
        } else if (!this.isLeftOfEndboss && isCurrentlyLeftOfEndboss) {
            // Von rechts nach links überholt
            this.isLeftOfEndboss = true;
            this.isRightOfEndboss = false;
            this.currentTransitionDirection = 'rightToLeft';
            this.transitioning = true;
        }

        // Berechnung der Zielposition der Kamera
        let targetCameraX;

        let minCameraX = -characterX + 100;
        let maxCameraX = -characterX + 470;

        // Kamera-Position in den erlaubten Bereich begrenzen (clamping)
        if (this.world.camera_x < minCameraX) {
            this.world.camera_x = minCameraX;
        } else if (this.world.camera_x > maxCameraX) {
            this.world.camera_x = maxCameraX;
        }

        // Wenn eine Transition stattfindet
        if (this.transitioning) {
            if (this.currentTransitionDirection === 'leftToRight') {
                targetCameraX = -characterX + 470;
            } else if (this.currentTransitionDirection === 'rightToLeft') {
                targetCameraX = -characterX + 100;
            }
        } else {
            // Wenn keine Transition stattfindet, fixiere die Kamera auf den Charakter
            targetCameraX = -characterX + (this.isRightOfEndboss ? 470 : 100);
        }

        // Kamera-Update
        if (this.transitioning) {
            this.world.camera_x += (targetCameraX - this.world.camera_x) * this.cameraSpeed;

            // Überprüfen, ob die Kamera nahe genug an der Zielposition ist
            if (Math.abs(targetCameraX - this.world.camera_x) < 5) {
                this.world.camera_x = targetCameraX;
                this.transitioning = false;
                console.log('Transition abgeschlossen');
            }
        } else {
            this.world.camera_x = targetCameraX;
        }

        // Konsolenausgaben zur Überprüfung
        console.log('Transition:', this.transitioning);
    }


    isAboveEnemy(enemy) {
        return this.y + this.height > enemy.y &&
            this.y + this.height <= enemy.y + enemy.height &&
            this.x + this.width > enemy.x &&
            this.x < enemy.x + enemy.width &&
            this.speedY < 0;
    }

    setAboveEnemyState(value) {
        this.isAboveEnemyState = value;
    }

    blockMovement(duration) {
        this.isMovementBlocked = true; // Bewegung blockieren

        // Bewegung nach einer bestimmten Zeitspanne wieder freigeben
        setTimeout(() => {
            this.isMovementBlocked = false;
        }, duration);
    }
}