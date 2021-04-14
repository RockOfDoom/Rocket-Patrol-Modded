class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    init() {
        //prepare timer for update
        this.timer = 0.0;
    }

    preload() {
        this.load.image("starfield", './assets/starfield.png');
        this.load.image("rocket", './assets/rocket.png');
        this.load.image("spaceship", './assets/spaceship.png');
        this.load.spritesheet("explosion", './assets/explosion.png', 
            {frameWidth: 64, frameHeight: 32, startFrame:0, endFrame: 9});
    }

    create() {
        //display starfield
        this.starfield = this.add.tileSprite(0, 
            0, 
            640, 
            480, 
            "starfield").setOrigin(0,0);
        
        //display rocket
        this.p1Rocket = new Rocket(this, 
            game.config.width / 2, 
            game.config.height - borderUISize - borderPadding, 
            "rocket").setOrigin(0.5, 0);
        
        //display ships
        this.ship1 = new Ship(this, 
            game.config.width + borderUISize * 6, 
            borderUISize * 4, 
            "spaceship", 
            0, 
            30).setOrigin(0, 0);
        
        this.ship2 = new Ship(this, 
            game.config.width + borderUISize * 3, 
            borderUISize * 5 + borderPadding * 2, 
            "spaceship", 
            0, 
            20).setOrigin(0, 0);
        this.ship3 = new Ship(this, 
            game.config.width, 
            borderUISize * 6 + borderPadding * 4, 
            "spaceship", 
            0, 
            10).setOrigin(0, 0);
        
        //animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers("explosion", 
                {start: 0, end: 9, first: 0}),
            frameRate: 30
        });

        //green UI background
        this.add.rectangle(0, 
            borderUISize + borderPadding, 
            game.config.width, 
            borderUISize * 2,
            0x00FF00).setOrigin(0,0);
        
        //white borders
        this.add.rectangle(0, 
            0, 
            game.config.width, 
            borderUISize, 
            0xFFFFFF).setOrigin(0 ,0);
	    this.add.rectangle(0, 
            game.config.height - borderUISize, 
            game.config.width, 
            borderUISize, 
            0xFFFFFF).setOrigin(0 ,0);
	    this.add.rectangle(0, 
            0, 
            borderUISize, 
            game.config.height, 
            0xFFFFFF).setOrigin(0 ,0);
	    this.add.rectangle(game.config.width - borderUISize, 
            0, 
            borderUISize, 
            game.config.height, 
            0xFFFFFF).setOrigin(0 ,0);
        
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        //initialize score
        this.p1Score = 0;

        //display score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100,
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, 
            borderUISize + borderPadding * 2, 
            this.p1Score, 
            scoreConfig);
        
        //initialize clock
        this.clock = game.settings.gameTimer / 1000;



        //GAME OVER flag
        this.gameOver = false;
        
        //play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width / 2, 
                game.config.height / 2, 
                "GAME OVER", 
                scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width / 2,
                game.config.height / 2 + 64,
                "Press (R) to Restart or ← for Menu", scoreConfig).setOrigin(0.5);
            this.gameOver = true;

        
        }, null, this);
    }

    update(time, delta) {
        this.timer += delta;

        while(this.timer >= 16.66666) {
            if(this.gameOver) {
                if(Phaser.Input.Keyboard.JustDown(keyR)) {
                    this.scene.restart();
                }
                if(Phaser.Input.Keyboard.JustDown(keyLEFT)) {
                    this.scene.start("menuScene");
                }
            } else {
                this.starfield.tilePositionX -= 4;
                this.p1Rocket.update();
                this.ship1.update();
                this.ship2.update();
                this.ship3.update();
            }

            this.checkCollision(this.p1Rocket, this.ship1);
            this.checkCollision(this.p1Rocket, this.ship2);
            this.checkCollision(this.p1Rocket, this.ship3);

            this.timer -= 16.66666;
        }
    }

    checkCollision(rocket, ship) {
        if( rocket.x < ship.x + ship.width && 
            rocket.x + rocket.width > ship.x && 
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship. y) {
                rocket.reset();
                this.shipExplode(ship);
            }
    }

    shipExplode(ship) {
        ship.alpha = 0;

        let boom = this.add.sprite(ship.x, ship.y, "explosion").setOrigin(0, 0);
        boom.anims.play('explode');
        this.sound.play('sfx_explosion');
        boom.on('animationcomplete', () => {
            ship.reset();
            ship.alpha = 1;
            boom.destroy();
        });

        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;
    }
}
