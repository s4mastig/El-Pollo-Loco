class Character extends MovableObject {

    height = 300;
    width = 150;
    y = 128;
    world;
    speed = 10;

    cameraOffset = 100; // Standard Offset
    cameraSpeed = 0.01; // Geschwindigkeit der Kamerabewegung

    jumpingAnimationStarted = false;
    jumpingAnimationCompleted = false;
    canJump = true;
    isMovementBlocked = false;
    firstMetEndboss = false;
    isLeftOfEndboss = true;
    transitioning = false;
    isLeftOfEndboss = true;


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

    walking_sound = new Audio('audio/running.mp3');


    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_SLEEP);
        this.applyGravity(128);
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.walking_sound.pause();
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x && !this.isMovementBlocked) {
                this.moveRight();
                this.otherDirection = false;
                this.walking_sound.play();
            }

            if (this.world.keyboard.LEFT && this.x > 0 && !this.isMovementBlocked) {
                this.moveLeft();
                this.otherDirection = true;
                this.walking_sound.play();
            }

            if (this.world.keyboard.SPACE && !this.isAboveGround(128) && this.canJump && !this.isMovementBlocked) {
                this.currentImage = 0;
                this.jump();
                this.jumpingAnimationStarted = true;
                this.jumpingAnimationCompleted = false;
                this.canJump = false;
                setTimeout(() => {
                    this.canJump = true;
                }, 1500);
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
            if (this.isSmallJumping) {
                this.playAnimation(this.IMAGES_JUMPING.slice(2));
                this.isSmallJumping = false;
                console.log('Playing small JUMPING animation')
            } else if (this.jumpingAnimationStarted && !this.jumpingAnimationCompleted && !this.isHurt() && !this.isMovementBlocked) {
                console.log('Playing JUMPING animation');
                this.playAnimation(this.IMAGES_JUMPING);
                if (!this.isAboveGround(128)) {
                    this.jumpingAnimationCompleted = true;
                    this.jumpingAnimationStarted = false;
                }
            }
        }, 200);


        setInterval(() => {
            if (this.isSleeping()) {
                this.playAnimation(this.IMAGES_SLEEP);
            } else if (this.isIdle() && !this.isAboveGround(128)) {
                console.log('Playing IDLE animation');
                this.playAnimation(this.IMAGES_IDLE);
            }
        }, 200);
    }
    
    updateCameraPosition() {
        let endbossX = this.world.level.enemies.find(enemy => enemy instanceof Endboss)?.x || 0;
        let characterX = this.x;
    
        // Prüfen, ob der Charakter links oder rechts vom Endboss ist
        let isCurrentlyLeftOfEndboss = characterX < endbossX;
    
        // Falls der Character die Seite wechselt (rechts nach links oder links nach rechts)
        if (isCurrentlyLeftOfEndboss !== this.isLeftOfEndboss) {
            this.transitioning = true; // Startet eine neue Transition
            this.isLeftOfEndboss = isCurrentlyLeftOfEndboss; // Aktualisiert die Position des Charakters relativ zum Endboss
        }
    
        // Zielposition der Kamera abhängig von der relativen Position zum Endboss
        let targetCameraX = isCurrentlyLeftOfEndboss ? -characterX + 100 : -characterX + 400;
    
        // Führe eine sanfte Transition durch, wenn eine Transition aktiv ist
        if (this.transitioning) {
            this.world.camera_x += (targetCameraX - this.world.camera_x) * this.cameraSpeed;
    
            // Wenn die Kamera nahe genug an der Zielposition ist, beende die Transition
            if (Math.abs(targetCameraX - this.world.camera_x) < 5) {
                this.world.camera_x = targetCameraX; // Setze die Kamera exakt auf das Ziel
                this.transitioning = false; // Beende die Transition
                console.log('Transition abgeschlossen');
            }
        } else {
            // Falls keine Transition aktiv ist, bleibt die Kamera fixiert auf der aktuellen Position
            this.world.camera_x = targetCameraX;
        }
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