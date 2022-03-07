class SmartCaps extends Capsule {
    constructor(x1, y1, x2, y2, r, m) {
        super(x1, y1, x2, y2, r, m);
        this.brain = [];

        this.layer = -1;
        this.friction = 0.06;
        this.angFriction = 0.05;
        this.setColor('lightgreen');
        this.comp[2].color = 'yellowgreen';
        this.fitness = 0;
    }
    createSteps(size) {
        for(let i=0; i<size; i++) {
            this.brain[i] = randInt(0, 15).toString(2).padStart(4, '0');
        }
    }
    makeMove(currentStep) {
        this.left = false;
        this.right = false;
        this.up = false;
        this.down = false;

        if (parseInt(this.brain[currentStep][0], 2)) {
            this.left = true;
        }
        if (parseInt(this.brain[currentStep][1], 2)) {
            this.right = true;
        }
        if (parseInt(this.brain[currentStep][2], 2)) {
            this.up = true;
        }
        if (parseInt(this.brain[currentStep][3], 2)) {
            this.down = true;
        }
    }
    distance(v) {
        return this.pos.subtr(v).mag();
    }
    stop() {
        this.left = false;
        this.right = false;
        this.up = false;
        this.down = false;
        this.acc.set(0, 0);
    }
}
