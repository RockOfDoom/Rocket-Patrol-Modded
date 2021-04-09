class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.movementSpeed = 2;
        this.firing = false;
    }

    update() {
        if(this.firing) {
            this.y -= this.movementSpeed;
            if(this.y < borderUISize * 3) {
                this.y =  game.config.height - borderUISize - borderPadding;
                this.firing = false;
            }
        } else {
            if(keyLEFT.isDown) {
                this.x -= this.movementSpeed;
            }
            if(keyRIGHT.isDown) {
                this.x += this.movementSpeed;
            }

            if(Phaser.Input.Keyboard.JustDown(keyF)) {
                this.firing = true;
            }

            this.x = Phaser.Math.Clamp(this.x, 
                borderUISize + borderPadding, 
                game.config.width - borderUISize - borderPadding);
        }
    }
}