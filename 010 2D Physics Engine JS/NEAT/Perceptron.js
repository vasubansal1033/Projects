class Perceptron {
    constructor(size) {
        this.inputs = [];
        this.weights = [];
        for (let i = 0; i < size; i++) {
            this.weights[i] = Math.random() * 2 - 1;
        }

        this.bias = Math.random() * 2 - 1;
        this.size = size;
        this.output;
    }
    setInputs(inputArray) {
        if (inputArray.length === this.size) {
            for (let i = 0; i < this.size; i++) {
                this.inputs[i] = inputArray[i];
            }
        } else {
            console.log("Wrong size");
        }
    }
    setWeights(weightsArray) {
        if (weightsArray.length == this.size) {
            for (let i = 0; i < this.size; i++) {
                this.weights[i] = weightsArray[i];
            }
        } else {
            console.log("Wrong size");
        }
    }
    weightedSum() {
        let sum = 0;
        for (let i = 0; i < this.size; i++) {
            sum += this.inputs[i] * this.weights[i];
        }
        sum += this.bias;
        return sum;
    }
    activation(sum) {
        return sum < 0 ? -1 : 1;
    }
    getOutput() {
        // return this.weightedSum();
        let output = this.activation(this.weightedSum());
        return output;
    }

}