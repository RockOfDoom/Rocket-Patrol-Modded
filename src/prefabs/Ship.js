class Ship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue, speedMult) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this); //add to current scene
        this.points = pointValue; //retrieve the score players will get for hitting ship
        this.movementSpeed = game.settings.spaceshipSpeed * speedMult; //retrieve the speed at which the ship flies, then multiply it by the ship's speed multiplier
    }

    update() {
        this.x -= this.movementSpeed;
        //if the end of the screen is reached, reset
        if(this.x < -this.width) {
            this.reset();
        }
    }

    //reset ship to right side of screen, and choose new height
    reset() {
        this.x = game.config.width; //reset to right of screen
        this.y = (Math.random() * ((borderUISize * 6 + borderPadding * 4) - borderUISize * 4)) + borderUISize * 4; //randomly choose new height in range borderUISize * 4 to borderUISize * 6 + borderPadding * 4
    }
}