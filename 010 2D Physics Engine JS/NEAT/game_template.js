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
raceWalls.push(new Wall(240, 120, 120, 120));
raceWalls.push(new Wall(120, 120, 120, 360));
raceWalls.push(new Wall(120, 360, 480, 360));
raceWalls.push(new Wall(480, 360, 480, 120));
raceWalls.push(new Wall(360, 0, 360, 240));
raceWalls.push(new Wall(360, 240, 240, 240));



let smartCapsPop = new SmartCapsPop(20)
let targetSign = new Ball(smartCapsPop.targetPoint.x, smartCapsPop.targetPoint.y, 20, 5);
targetSign.layer = -2;
targetSign.setColor('red');

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
  if (capsAreMoving) {
    if (counter % 3 === 0) {
      smartCapsPop.caps.forEach((smartCap) => {

        if (stepCounter < smartCap.brain.length) {
          smartCap.makeMove(stepCounter);
        } else {
          smartCap.stop();
        }
      })
      // console.log(smartCapsPop.velocitySum());
      if (smartCapsPop.velocitySum() < 0.01 && stepCounter > 0) {
        starterButton.disabled = false;
        nextGenButton.disabled = false;
        capsAreMoving = false;
        smartCapsPop.setFitness();
        smartCapsPop.createNextGen();

        genDataField.innerHTML += `<br />Gen ${smartCapsPop.generation} - Avg dist: ${Math.floor(smartCapsPop.targetAvgDistance())}`
        nextGenButton.textContent = `Launch Generation ${smartCapsPop.generation + 1}`;

      }

      counter = 0;
      stepCounter++;
    }
    counter++;
  }


}

// handling the user input and the game loop
// userInput(player);
requestAnimationFrame(mainLoop);