const level1 = new Level(
    [
        new Endboss()
    ],
    [

    ],
    [
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin()
    ],
    [
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle()
    ],
    [
        new BackgroundObject('img/5_background/layers/air.png', -719, 0),
        new BackgroundObject('img/5_background/layers/air.png', 0, 0),
        new BackgroundObject('img/5_background/layers/air.png', 719, 0),
        new BackgroundObject('img/5_background/layers/air.png', 719 * 2, 0),
        new BackgroundObject('img/5_background/layers/air.png', 719 * 3, 0),
        new BackgroundObject('img/5_background/layers/air.png', 719 * 4, 0),
        new BackgroundObject('img/5_background/layers/air.png', 719 * 5, 0),
        new BackgroundObject('img/5_background/layers/air.png', 719 * 6, 0),
        new BackgroundObject('img/5_background/layers/air.png', 719 * 7, 0),
        new BackgroundObject('img/5_background/layers/air.png', 719 * 8, 0),
        new BackgroundObject('img/5_background/layers/air.png', 719 * 9, 0),
        new BackgroundObject('img/5_background/layers/air.png', 719 * 10, 0),
        new BackgroundObject('img/5_background/layers/air.png', 719 * 11, 0),
        new BackgroundObject('img/5_background/layers/air.png', 719 * 12, 0),
        new BackgroundObject('img/5_background/layers/air.png', 719 * 13, 0),
        new BackgroundObject('img/5_background/layers/air.png', 719 * 14, 0),
        new BackgroundObject('img/5_background/layers/air.png', 719 * 15, 0),
        new BackgroundObject('img/5_background/layers/air.png', 719 * 16, 0),
        new BackgroundObject('img/5_background/layers/air.png', 719 * 17, 0),

        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -719, 0.5),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0, 0.5),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719, 0.5),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 2, 0.5),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 3, 0.5),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 4, 0.5),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 5, 0.5),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 6, 0.5),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 7, 0.5),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 8, 0.5),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 9, 0.5),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 10, 0.5),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 11, 0.5),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 12, 0.5),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 13, 0.5),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 14, 0.5),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 15, 0.5),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 16, 0.5),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 17, 0.5),

        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -719, 1),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0, 1),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719, 1),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 2, 1),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 3, 1),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 4, 1),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 5, 1),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 6, 1),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 7, 1),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 8, 1),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 9, 1),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 10, 1),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 11, 1),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 12, 1),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 13, 1),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 14, 1),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 15, 1),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 16, 1),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 17, 1),

        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -719, 0),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0, 0),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719, 0),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 2, 0),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 3, 0),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 4, 0),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 5, 0),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 6, 0),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 7, 0),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 8, 0),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 9, 0),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 10, 0),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 11, 0),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 12, 0),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 13, 0),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 14, 0),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 15, 0),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 16, 0),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 17, 0),

        new Barn('img/barn.png', 6900, 0)
    ]
);