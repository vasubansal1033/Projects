// STEP 1: setting up the environment
// creating the starting objects and variables before starting the main loop
// for example:
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.focus();

let counter = 0;
let stepCounter = 0;

putWallsAround(0, 0, canvas.clientWidth, canvas.clientHeight);
let raceWalls = [];
raceWalls.push(new Wall(240, 120, 120, 120))
raceWalls.push(new Wall(120, 120, 120, 360))
raceWalls.push(new Wall(120, 360, 480, 360))
raceWalls.push(new Wall(480, 360, 480, 120))
raceWalls.push(new Wall(360, 0, 360, 240))
raceWalls.push(new Wall(360, 240, 240, 240))
raceWalls.push(new Wall(0, 0, 640, 0))
raceWalls.push(new Wall(640, 0, 640, 480))
raceWalls.push(new Wall(640, 480, 0, 480))
raceWalls.push(new Wall(0, 480, 0, 0))
raceWalls.push(new Wall(600, 0, 600, 480))

let checkLines = []
checkLines.push(new Wall(10, 360, 110, 360))
checkLines.push(new Wall(10, 240, 110, 240))
checkLines.push(new Wall(10, 120, 110, 120))
checkLines.push(new Wall(120, 10, 120, 110))
checkLines.push(new Wall(240, 10, 240, 110))
checkLines.push(new Wall(250, 120, 350, 120))
checkLines.push(new Wall(240, 130, 240, 230))
checkLines.push(new Wall(130, 240, 230, 240))
checkLines.push(new Wall(240, 250, 240, 350))
checkLines.push(new Wall(360, 250, 360, 350))
checkLines.push(new Wall(370, 240, 470, 240))
checkLines.push(new Wall(370, 120, 470, 120))
checkLines.push(new Wall(480, 10, 480, 110))
checkLines.push(new Wall(490, 120, 590, 120))
checkLines.push(new Wall(490, 240, 590, 240))
checkLines.push(new Wall(490, 360, 590, 360))
checkLines.push(new Wall(480, 370, 480, 470))
checkLines.push(new Wall(360, 370, 360, 470))
checkLines.push(new Wall(240, 370, 240, 470))
checkLines.push(new Wall(120, 370, 120, 470))
checkLines.forEach(line => {
  line.layer = -2
  line.setColor("#ffaacc")
})

// let nn = new NeuralNetwork(5, 5, 4);
// nn.setInputValues([1, 2, 3, 4, 5])
// console.log(nn.feedForward())

// let player = new SmartCaps(60, 430, 60, 410, 10, 5);


let smartCapsPop = new SmartCapsPop(20)
// let targetSign = new Ball(smartCapsPop.targetPoint.x, smartCapsPop.targetPoint.y, 20, 5);
// targetSign.layer = -2;
// targetSign.setColor('red');

let capsAreMoving = false;

let starterButton = document.getElementById('relaunch')
let nextGenButton = document.getElementById('nextGen');
let genDataField = document.getElementById('genData');

nextGenButton.disabled = true;

starterButton.onclick = () => {
  starterButton.disabled = true;
  nextGenButton.disabled = true;
  genDataField.innerHTML = '';
  smartCapsPop.generation = 1;
  smartCapsPop.nextGenBrains = [];

  capsAreMoving = true;
  smartCapsPop.init();
  counter = 0;
  stepCounter = 0;
}
nextGenButton.onclick = () => {
  smartCapsPop.replaceNextGen();
  counter = 0;
  stepCounter = 0;
  capsAreMoving = true;
  starterButton.disabled = true;
  nextGenButton.disabled = true;
}


// STEP 2: defining the game logic
function gameLogic() {
  // this gets called periodically as part of the main loop
  // define the rules here

  // gameLogic is 60fps, so are doing %6
  // to get 10 commands per second

  // player.getSensorData(raceWalls);

  if (capsAreMoving) {
    if (counter % 3 === 0) {
      smartCapsPop.caps.forEach((smartCap) => {

        if (stepCounter < 200) {
          smartCap.brain.setInputValues(smartCap.getSensorData(raceWalls));
          smartCap.brain.feedForward();
          smartCap.makeMove();
        } else {
          smartCap.stop();
        }
        smartCap.getReward();

      })
      // console.log(smartCapsPop.velocitySum());
      if (smartCapsPop.velocitySum() < 0.01 && stepCounter > 0) {
        starterButton.disabled = false;
        nextGenButton.disabled = false;
        capsAreMoving = false;
        smartCapsPop.setFitness();
        smartCapsPop.createNextGen();

        genDataField.innerHTML += `<br />Gen ${smartCapsPop.generation} - Avg fitness: ${Math.floor(smartCapsPop.fitnessSum() / smartCapsPop.popSize)}`
        nextGenButton.textContent = `Launch Generation ${smartCapsPop.generation + 1}`;

      }

      counter = 0;
      stepCounter++;
    }
    counter++;
  }
  smartCapsPop.caps.forEach(caps => {
    ctx.fillStyle = 'white';
    ctx.fillText(caps.reward, caps.comp[1].pos.x, caps.comp[1].pos.y)
  })


}

// handling the user input and the game loop
// userInput(player);
requestAnimationFrame(mainLoop);