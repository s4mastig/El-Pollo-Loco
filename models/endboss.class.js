class Endboss extends MovableObject {

    width = 250;
    height = 400;
    y = 55;

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

    constructor() {
        super().loadImage(this.IMAGES_ALERT[0]);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
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
            this.playAnimation(this.IMAGES_ATTACK);
        }, 150);
        this.moveLeftInJumps();
    }
    moveLeftInJumps() {
        let jumpDistance = 50;  // Distanz pro Sprung nach links

        setInterval(() => {
            this.x -= jumpDistance; // Bewegt den Endboss nach links
            this.speedY = 10;
        }, 600);
    }
}