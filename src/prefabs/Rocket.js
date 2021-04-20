class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, lKey, rKey, fKey) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this); //add to current scene
        this.sfxRocket = scene.sound.add('sfx_rocket', {volume: 0.5}); //load launch sound effect
        this.movementSpeed = 2; //set aiming movement speed
        this.launchSpeed = 2.5 * this.movementSpeed; //set initial firing movement speed
        this.launchAccel = 1.045; //set acceleration of rocket once it has been fired
        this.firing = false; //set whether or not the rocket is currently firing
        this.leftKey = lKey;
        this.rightKey = rKey;
        this.fireKey = fKey;

    }

    update() {
        //if the rocket is firing, remove player control and start
        //accelerating upwards
        if(this.firing) {
            this.y -= this.launchSpeed;
            this.launchSpeed *= this.launchAccel;
            if(this.y <= borderUISize * 3 + borderPadding) {
                this.reset();
            }
        } else { //if the rocket isn't firing, allow player to aim and fire
            if(this.leftKey.isDown) {
                this.x -= this.movementSpeed;
            }
            if(this.rightKey.isDown) {
                this.x += this.movementSpeed;
            }

            if(Phaser.Input.Keyboard.JustDown(this.fireKey)) {
                this.firing = true;
                this.sfxRocket.play();
            }
            //keep the rocket on-screen
            this.x = Phaser.Math.Clamp(this.x, 
                borderUISize + borderPadding, 
                game.config.width - borderUISize - borderPadding);
        }
    }

    //return the rocket to the bottom of the screen, reset the rocket's launch speed,
    //and return control to the player
    reset() {
        this.y =  game.config.height - borderUISize - borderPadding;
        this.firing = false;
        this.launchSpeed = 2.5 * this.movementSpeed;
    }
}