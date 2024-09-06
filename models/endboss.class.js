class Endboss extends MovableObject {

    width = 250;
    height = 400;
    y = 55;
    energy = 100;

    offset = {
        top: 80,
        bottom: 20,
        left: 20,
        right: 20
    }

    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ]

    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ];

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    constructor() {
        super().loadImage(this.IMAGES_ALERT[0]);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.x = 2500;
        this.applyGravity(55);
        this.alertAnimationStarted = false;
    }

    animate() {
        if (this.alertAnimationStarted) return;
        this.alertAnimationStarted = true;

        let index = 0;
        this.alertInterval = setInterval(() => {
            this.playAnimation([this.IMAGES_ALERT[index]]);
            index++;

            if (index >= this.IMAGES_ALERT.length) {
                clearInterval(this.alertInterval);
                // Nach dem Ende der Alert-Animation zur Attack-Animation wechseln
                this.animateAttack();
            }
        }, 500);
    }


    animateAttack() {
        setInterval(() => {
            this.world.statusBarEndboss.visible = true;
            this.playAnimation(this.IMAGES_ATTACK);
        }, 150);

        this.moveDuringAttack();
    }

    moveDuringAttack() {
        setInterval(() => {
            if (!this.isHurt()) {
                this.adjustDirection();
                this.moveInJumps();
            }

            if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            }
        }, 600);

    }

        adjustDirection() {
            if (this.world.character.x < this.x) {
                // Character ist links vom Endboss
                this.otherDirection = false; // Setzt die Richtung des Endbosses auf links
            } else {
                // Character ist rechts vom Endboss
                this.otherDirection = true; // Setzt die Richtung des Endbosses auf rechts
            }
        }

        moveInJumps() {
            let jumpDistance = 70;  // Distanz pro Sprung nach links

            if (this.otherDirection) {
                this.x += jumpDistance; // Bewegt den Endboss nach links, wenn `otherDirection` wahr ist
            } else {
                this.x -= jumpDistance; // Bewegt den Endboss nach rechts, wenn `otherDirection` falsch ist
            }

        }
}