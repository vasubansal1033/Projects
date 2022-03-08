class SmartCapsPop {
    constructor(popSize) {
        this.caps = [];
        this.popSize = popSize;
        this.mutationRate = 0.05;
        this.startingPoint = new Vector(60, 420);
        this.targetPoint = new Vector(550, 50);
        this.nextGenBrains = [];
        this.generation = 1;
    }
    init() {
        for (let i = 0; i < this.popSize; i++) {
            if (this.caps[i]) {
                this.caps[i].remove();
            }
            this.caps[i] = new SmartCaps(this.startingPoint.x, this.startingPoint.y + 10, this.startingPoint.x, this.startingPoint.y - 10, 10, 5);
            // this.caps[i].createSteps(250);
        }
    }
    velocitySum() {
        let vSum = 0;
        this.caps.forEach((caps) => {
            vSum += caps.vel.mag();
        })
        return vSum;
    }
    targetAvgDistance() {
        let dSum = 0;
        this.caps.forEach((cap) => {
            dSum += cap.distance(this.targetPoint);
        })
        return dSum / this.popSize;
    }
    setFitness() {
        this.caps.forEach((caps) => {
            // caps.fitness = (1000 / caps.distance(this.targetPoint)) ** 4;
            // console.log(caps.fitness);
            caps.fitness = caps.reward ** 4;
        })
    }
    fitnessSum() {
        let fSum = 0;
        this.caps.forEach((caps) => {
            fSum += caps.fitness;
        })
        return fSum;
    }
    pickCaps() {
        let picker = Math.random();
        let fitnessSum = this.fitnessSum();
        let currentSum = 0;
        for (let i = 0; i < this.caps.length; i++) {
            currentSum += this.caps[i].fitness / fitnessSum;
            if (picker < (currentSum)) {
                this.caps[i].comp[1].color = 'orange';
                return this.caps[i];
            }
        }
    }
    crossOver(parent1, parent2) {
        let newBrain = new NeuralNetwork(5, 5, 4);
        for (let i = 0; i < newBrain.hPerceptron.length; i++) {
            for (let j = 0; j < newBrain.hPerceptron[i].weights.length; j++) {
                newBrain.hPerceptron[i].weights[j] =
                    Math.random() < (parent1.reward / (parent1.reward + parent2.reward)) ?
                        parent1.brain.hPerceptron[i].weights[j] :
                        parent2.brain.hPerceptron[i].weights[j];
            }
            newBrain.hPerceptron[i].bias =
                Math.random() < (parent1.reward / (parent1.reward + parent2.reward)) ?
                    parent1.brain.hPerceptron[i].bias :
                    parent2.brain.hPerceptron[i].bias;
        }

        for (let i = 0; i < newBrain.oPerceptron.length; i++) {
            for (let j = 0; j < newBrain.oPerceptron[i].weights.length; j++) {
                newBrain.oPerceptron[i].weights[j] =
                    Math.random() < (parent1.reward / (parent1.reward + parent2.reward)) ?
                        parent1.brain.oPerceptron[i].weights[j] :
                        parent2.brain.oPerceptron[i].weights[j];
            }
            newBrain.oPerceptron[i].bias =
                Math.random() < (parent1.reward / (parent1.reward + parent2.reward)) ?
                    parent1.brain.oPerceptron[i].bias :
                    parent2.brain.oPerceptron[i].bias;
        }

        return newBrain;
    }
    mutation(brain) {
        for (let i = 0; i < brain.hPerceptron.length; i++) {
            for (let j = 0; j < brain.hPerceptron[i].weights.length; j++) {
                if (Math.random() < this.mutationRate) {
                    brain.hPerceptron[i].weights[j] = Math.random() * 2 - 1;
                }
            }
            if (Math.random() < this.mutationRate) {
                brain.hPerceptron[i].bias = Math.random() * 2 - 1;
            }
        }

        for (let i = 0; i < brain.oPerceptron.length; i++) {
            for (let j = 0; j < brain.oPerceptron[i].weights.length; j++) {
                if (Math.random() < this.mutationRate) {
                    brain.oPerceptron[i].weights[j] = Math.random() * 2 - 1;
                }
            }
            if (Math.random() < this.mutationRate) {
                brain.oPerceptron[i].bias = Math.random() * 2 - 1;
            }
        }
    }
    createNextGen() {
        for (let i = 0; i < this.popSize; i++) {
            let parent1 = this.pickCaps();
            let parent2 = this.pickCaps();
            let newBrain = this.crossOver(parent1, parent2);
            this.mutation(newBrain);
            this.nextGenBrains.push(newBrain);
        }
    }
    replaceNextGen() {
        for (let i = 0; i < this.popSize; i++) {
            this.caps[i].brain = this.nextGenBrains[i];
            this.caps[i].setPosition(this.startingPoint.x, this.startingPoint.y, 0);
            this.caps[i].setColor('lightgreen');
            this.caps[i].comp[1].color = 'yellowgreen';
            this.caps[i].reward = 0;
        }
        this.nextGenBrains = [];
        this.generation++;
    }
}