class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    init() {
        this.playerCountSelected = false;
        this.twoP = false;
    }

    preload() {
        //load audio
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/explosion38.wav');
        this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
    }

    create() {
        //set style for menu text
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0,
        }

        //show menu text
        this.rocketPatrolTitle = this.add.text(game.config.width / 2, 
            game.config.height / 2 - 2*(borderUISize + borderPadding), 
            "ROCKET PATROL", 
            menuConfig).setOrigin(0.5);
        this.menuText1 = this.add.text(game.config.width / 2, 
            game.config.height / 2 - (borderUISize + borderPadding), 
            "", 
            menuConfig).setOrigin(0.5);
        this.menuText2 = this.add.text(game.config.width / 2, 
            game.config.height / 2, 
            "", 
            menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#00FF00';
        menuConfig.color = '#000';
        this.actionText = this.add.text(game.config.width / 2,
            game.config.height / 2 + (borderUISize + borderPadding),
            "Press ← for 1P or → for 2P", 
            menuConfig).setOrigin(0.5);
        
        //define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
        if(this.playerCountSelected) { //run this after the number of players has been selected
            if(!this.twoP) { //run this if game is in one player mode
                this.menuText1.text = "";
                this.menuText2.text = "Use ← → arrows to move & (F) to fire";
                this.actionText.text = "Press ← for Novice or → for Expert";
                if(Phaser.Input.Keyboard.JustDown(keyLEFT)) {
                    //easy mode
                    game.settings = {
                        spaceshipSpeed: 3,
                        gameTimer: 60000,
                        twoPlayers: this.twoP
                    }
                    this.sound.play('sfx_select');
                    this.scene.start('playScene');
                }
                if(Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
                    //hard mode
                    game.settings = {
                        spaceshipSpeed: 4,
                        gameTimer: 45000,
                        twoPlayers: this.twoP
                    }
                    this.sound.play('sfx_select');
                    this.scene.start('playScene');
                }
            }
            else { //run this if game is in two player mode
                this.menuText1.style.backgroundColor = "#00f2ff";
                this.menuText1.style.color = "#000";
                this.menuText1.text = "P1: (A)(D) keys to move & (W) to fire";
                this.menuText2.style.backgroundColor = "#f2ff00";
                this.menuText2.style.color = "#000";
                this.menuText2.text = "P2: ← → arrows to move & ↑ to fire";
                this.actionText.text = "Press ← for Novice or → for Expert";
                if(Phaser.Input.Keyboard.JustDown(keyLEFT)) {
                    //easy mode
                    game.settings = {
                        spaceshipSpeed: 3,
                        gameTimer: 60000,
                        twoPlayers: this.twoP
                    }
                    this.sound.play('sfx_select');
                    this.scene.start('playScene');
                }
                if(Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
                    //hard mode
                    game.settings = {
                        spaceshipSpeed: 4,
                        gameTimer: 45000,
                        twoPlayers: this.twoP
                    }
                    this.sound.play('sfx_select');
                    this.scene.start('playScene');
                }
            }
        }
        else { //run this before the number of players has been selected
            if(Phaser.Input.Keyboard.JustDown(keyLEFT)) {
                //1 player mode
                this.twoP = false;
                this.sound.play('sfx_select');
                this.playerCountSelected = true;
            }
            if(Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
                //2 player mode
                this.twoP = true;
                this.sound.play('sfx_select');
                this.playerCountSelected = true;
            }
        }
    }
}
