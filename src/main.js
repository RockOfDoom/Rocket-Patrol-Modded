//list of mods:
//5 pts  - Rocket accelerates after being fired for juice reasons (in Rocket.js)
//10 pts  - Game updates 60 times per second regardless of FPS (in Play.js)
//5 pts  - Score display updates incrementally (1pt per frame) rather than all at once for juice (in Play.js)
//10 pts - Play timer is visible to player (in Play.js)
//! 30 pts - Simultaneous two-player mode (in Menu.js, Play.js, & Rocket.js)
//20 pts - Add time to clock for successful hits (in Play.js)
//10 pts - Parallax scrolling (in Play.js)
//5 pts - Ships reset at random heights and can take a speed multiplier to modify each ship's speed individually (in Play.js and Ship.js)
//5 pts - Speed of ships increase after 30 seconds (in Play.js)

let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [Menu, Play],
};

let game = new Phaser.Game(config);

let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

let keyLEFT, keyRIGHT, keyF, keyR, keyA, keyD, keyW, keyUP;