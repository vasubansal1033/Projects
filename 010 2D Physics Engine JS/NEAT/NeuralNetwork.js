class NeuralNetwork {
    constructor(i, h, o) {
        this.iLayerSize = i;
        this.hLayerSize = h;
        this.oLayerSize = o;
        this.iInputValues = Array.from({ length: i }, v => 1);

        this.hPerceptron = [];
        for (let i = 0; i < this.hLayerSize; i++) {
            this.hPerceptron.push(new Perceptron(this.iLayerSize));
        }
        this.hOutputValues = [];

        this.oPerceptron = [];
        for (let i = 0; i < this.oLayerSize; i++) {
            this.oPerceptron.push(new Perceptron(this.hLayerSize));
        }
        this.oOutputValues = [];
    }
    setInputValues(inputArray) {
        if (inputArray.length !== this.iLayerSize) {
            console.log('Wrong size');
        } else {
            inputArray.forEach((input, i) => {
                this.iInputValues[i] = input;
            })
        }
    }
    feedForward() {

        this.hOutputValues = [];
        this.oOutputValues = [];

        this.hPerceptron.forEach(perceptron => {
            perceptron.setInputs(this.iInputValues);
            this.hOutputValues.push(perceptron.getOutput());
        })
        this.oPerceptron.forEach(perceptron => {
            perceptron.setInputs(this.hOutputValues);
            this.oOutputValues.push(perceptron.getOutput());
        })

        return this.oOutputValues;
    }
}