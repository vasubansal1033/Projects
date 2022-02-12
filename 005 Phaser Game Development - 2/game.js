class GameScene extends Phaser.Scene {

    init() {
        this.tileWidth = 64;
        this.tileHeight = 64;
        this.Score = 0;
        this.birdSpeed = -280;
        this.birdDelay = 4000;
        this.groundSpeed = -200;
        this.plantDelay = 2000;
    }
    // preload assets
    preload() {
        // this.load.image("tile", "./assets/tile.png");
        this.load.atlas("dino", "assets/atlas/sprite.png", "assets/atlas/sprite.json");
        this.load.image("plant", "assets/cactus.png");
        this.load.spritesheet("bird", './assets/bird.png', {
            frameWidth: 150,
            frameHeight: 108
        })
        this.load.audioSprite("sfx", "./assets/fx_mixdown.json", ["assets/fx_mixdown.mp3", "assets/fx_mixdown.ogg"])
    }
    // create game entities
    create() {

        this.dino = this.physics.add.sprite(200, 343, "dino").setOrigin(0, 0).setScale(0.2, 0.25);
        this.dino.setGravityY(850);

        // change hit area of Dino
        this.dino.setSize(this.dino.width * 0.6, this.dino.height * 0.85, false).setOffset(100, 50)

        // this.add.image(200, 300, "tile").setOrigin(0, 0);
        this.ground = this.physics.add.group();

        this.scoreText = this.add.text(600, 25, "Score: 0", {
            fontSize: "28px",
            fontFamily: "Arial Black",
            stroke: "gray",
            strokeThickness: 5
        })
        this.topScore = localStorage.getItem("topScore") == null ? 0 : localStorage.getItem("topScore");
        this.topScoreText = this.add.text(30, 25, "Max Score: " + this.topScore, {
            fontSize: "28px",
            fontFamily: "Arial Black",
            stroke: "gray",
            strokeThickness: 5
        })
        // this.bird = this.physics.add.sprite(350, 250, "bird");

        this.animation();
        this.handleScore();

        this.dino.anims.play("idle");

        this.spawnBird();
        this.spawnPlant();
        this.addBase(0);

        // this.bird.anims.play("fly");
        // this.bird.setVelocityX(this.birdSpeed);

        this.dino.setCollideWorldBounds(true);
        this.physics.add.collider(this.dino, this.ground);
        this.physics.add.collider(this.plants, this.ground);
        this.physics.add.collider(this.dino, this.birds, this.gameOver, null, this);
        this.physics.add.collider(this.dino, this.plants, this.gameOver, null, this);

        this.cursors = this.input.keyboard.createCursorKeys();
    }
    gameOver() {
        // alert("Game over");
        this.scene.pause();
        this.sound.playAudioSprite("sfx", "shot");
        localStorage.setItem("topScore", Math.max(localStorage.getItem("topScore"), this.Score));
        this.scene.start("restart");
    }
    spawnBird() {
        this.birds = this.physics.add.group();
        this.time.addEvent({
            delay: Math.max(--this.birdDelay, -300),
            loop: true,
            callbackScope: this,
            callback: () => {
                let val = Math.random();
                if (val > 0.5) {
                    this.generateBird(280);
                } else {
                    this.generateBird(360);
                }
            }
        })
    }
    generateBird(y) {
        let bird = this.birds.create(Math.max(Math.random() * 900, 780), y, "bird");
        bird.setScale(0.4).setOrigin(0, 0);
        bird.setSize(bird.width * 0.7, bird.height * 0.85, true);
        bird.setVelocityX(this.birdSpeed);
        bird.anims.play("fly");

        this.time.addEvent({
            delay: 6000, repeat: 0,
            callbackScope: this,
            callback: () => {
                console.log(this.birds.children.size);
                bird.destroy();
            }
        })
    }
    spawnPlant() {
        this.plants = this.physics.add.group();
        this.time.addEvent({
            delay: this.plantDelay,
            loop: true,
            callbackScope: this,
            callback: () => {
                let scale = Math.random();
                if (scale < 0.4) {
                    // create two plants
                    scale = 0.6;
                    this.generatePlant(scale);
                } else if (scale >= 0.9) {
                    scale = 0.9
                    this.generatePlant(scale);
                } else {
                    this.generatePlant(scale);
                }
            }
        })
    }
    generatePlant(scale) {
        let sWidth = this.sys.game.config.width;
        let sHeight = this.sys.game.config.height;
        let plantY = sHeight - this.tileHeight - 110;

        let p1 = this.plants.create(sWidth, plantY, "plant").setOrigin(0, 0).setScale(scale);
        p1.setGravityY(750);
        p1.setVelocityX(Math.max(this.groundSpeed, -200));
        p1.setSize(0.5 * p1.width, 1 * p1.height);

        this.time.addEvent({
            delay: 5000,
            repeat: 0,
            callbackScope: this,
            callback: () => {
                p1.destroy();
            }
        })

        if (scale == 0.6) {
            let p2 = this.plants.create(sWidth + 15, plantY, "plant").setOrigin(0, 0).setScale(scale);
            p2.setGravityY(750);
            p2.setVelocityX(Math.max(this.groundSpeed, -200));
            p2.setSize(0.8 * p2.width, 1 * p2.height);
            this.time.addEvent({
                delay: 5000,
                repeat: 0,
                callbackScope: this,
                callback: () => {
                    p2.destroy();
                }
            })
        }

    }
    handleScore() {
        this.time.addEvent({
            delay: 250,
            loop: true,
            callback: () => {
                this.Score++;
                this.scoreText.setText("Score: " + this.Score);
                if (this.Score % 50 == 0) {
                    this.sound.playAudioSprite("sfx", "ping");
                }
            },
            callbackScope: this
        })
    }
    animation() {
        this.anims.create({
            key: "idle",
            frames: this.anims.generateFrameNames("dino", {
                start: 1, end: 10, prefix: "Idle_", zeroPad: 2, suffix: ".png"

            }),
            frameRate: 15,
            repeat: -1
        })
        this.anims.create({
            key: "run",
            frames: this.anims.generateFrameNames("dino", {
                start: 1, end: 8, prefix: "Run_", zeroPad: 2, suffix: ".png"

            }),
            frameRate: 15,
            repeat: -1
        })
        this.anims.create({
            key: "jump",
            frames: this.anims.generateFrameNames("dino", {
                start: 1, end: 12, prefix: "Jump_", zeroPad: 2, suffix: ".png"

            }),
            frameRate: 10
            // repeat: -1 // jump only once in animation
        })
        this.anims.create({
            key: "fly",
            frames: this.anims.generateFrameNames('bird', {
                start: 0, end: 1
            }),
            frameRate: 20,
            repeat: -1
        })
    }
    addBase(x) {
        let tileNeeded = Math.ceil((this.sys.game.config.width - x) / this.tileWidth);
        let y = this.sys.game.config.height - this.tileHeight;
        for (let i = 0; i < tileNeeded; i++) {
            this.addTile(i * this.tileWidth + x - 5, y);
        }
        // velocity
        this.ground.children.iterate((child) => {
            child.setVelocityX(Math.max(--this.groundSpeed, -300));
            child.setImmovable(true);
        })

    }
    addTile(x, y) {
        this.ground.create(x, y, "tile").setOrigin(0, 0);
    }

    update() {
        this.updateGround();
        this.handleInput();
    }
    handleInput() {
        if (this.cursors.space.isDown && this.dino.body.touching.down) {
            this.dino.setVelocityY(-480);
            this.dino.anims.play("jump");
            this.sound.playAudioSprite("sfx", "numkey");
        } else if (this.dino.body.touching.down) {
            this.dino.anims.play("run", true);
        }
    }
    updateGround() {
        let lastBlock = this.ground.getLast(true);
        let lastBlockX = lastBlock.x;
        let lastPoint = lastBlockX + this.tileWidth;

        if (lastPoint < this.sys.game.config.width) {
            this.addBase(lastPoint);
            console.log(this.ground.children.size);
            this.ground.children.each((child) => {
                if (child.x < (-this.tileWidth * 2)) {
                    child.destroy();
                }
            })
        }

    }

}
class TitleScreen extends Phaser.Scene {
    init() {
        this.tileWidth = 64;
        this.tileHeight = 64;
    }
    preload() {
        this.tileWidth = 64;
        this.tileHeight = 64;
        this.load.image("tile", "./assets/tile.png");
    }
    create() {
        // alert("Hello from title")
        const Title = this.add.text(400, 200, "START NEW GAME", {
            fontSize: 45,
            fontFamily: "Arial Black",
            stroke: "gray",
            strokeThickness: 5
        })
        Title.setOrigin(0.5, 0.5);

        const SubTitle = this.add.text(400, 250, "Press Space to start the Game", {
            fontSize: 25,
            fontFamily: "Arial Black",
            stroke: "gray",
            strokeThickness: 5
        })
        SubTitle.setOrigin(0.5, 0.5);

        this.ground = this.physics.add.group();
        this.addBase(0);

        this.input.keyboard.once("keydown-SPACE", ()=>{
            this.scene.start("game");
        })
    }
    addBase(x) {
        let tileNeeded = Math.ceil((this.sys.game.config.width - x) / this.tileWidth);
        let y = this.sys.game.config.height - this.tileHeight;
        for (let i = 0; i < tileNeeded; i++) {
            this.addTile(i * this.tileWidth + x - 5, y);
        }
    }
    addTile(x, y) {
        this.ground.create(x, y, "tile").setOrigin(0, 0);
    }
    update() {

    }

}
class RestartScreen extends Phaser.Scene {
    init() {
        this.tileWidth = 64;
        this.tileHeight = 64;
    }
    preload() {
        // this.load.image("tile", "./assets/tile.png");
    }
    create() {
        // alert("Hello from title")
        const Title = this.add.text(400, 200, "GAME OVER!", {
            fontSize: 45,
            fontFamily: "Arial Black",
            stroke: "gray",
            strokeThickness: 5
        })
        Title.setOrigin(0.5, 0.5);

        const SubTitle = this.add.text(400, 250, "Press Space to restart the Game", {
            fontSize: 25,
            fontFamily: "Arial Black",
            stroke: "gray",
            strokeThickness: 5
        })
        SubTitle.setOrigin(0.5, 0.5);

        this.ground = this.physics.add.group();
        this.addBase(0);

        this.input.keyboard.once("keydown-SPACE", ()=>{
            this.scene.start("title");
        })
    }
    addBase(x) {
        let tileNeeded = Math.ceil((this.sys.game.config.width - x) / this.tileWidth);
        let y = this.sys.game.config.height - this.tileHeight;
        for (let i = 0; i < tileNeeded; i++) {
            this.addTile(i * this.tileWidth + x - 5, y);
        }
    }
    addTile(x, y) {
        this.ground.create(x, y, "tile").setOrigin(0, 0);
    }
    update() {

    }
}


let config = {
    width: 800,
    height: 500,
    backgroundColor: '0xffe6cc',
    type: Phaser.AUTO,
    physics: {
        default: "arcade",
        arcade: {
            gravity: {
                y: 0
            },
            debug: false
        }
    }
}
const game = new Phaser.Game(config);

game.scene.add("game", GameScene);
game.scene.add("title", TitleScreen);
game.scene.add("restart", RestartScreen);
// game.scene.start("game");
game.scene.start("title");

