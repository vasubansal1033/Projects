let startBtn = document.querySelector(".start");
let restartBtn = document.querySelector(".restart");

let box = document.querySelector(".box");
let canvas = document.querySelector(".board");
let tool = canvas.getContext("2d");
let scoreElement = document.querySelector("span");
let score = 0;
let powerLevelElement = document.querySelector(".container .meter span");
let fullPower = 100;

// set canvas size to browser size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// load images in javascript
let spaceImg = new Image();
spaceImg.src = "space.jpg";

let earthImg = new Image();
earthImg.src = "earth.png";

let coronaImg = new Image();
coronaImg.src = "corona.png";

class Planet{
    constructor(x, y, width, height) {

        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

    }
    draw() {
        tool.drawImage(earthImg, this.x, this.y, this.width, this.height);
    }
}
class Bullet{
    constructor(x, y, width, height, velocity) {

        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.velocity = velocity;

    }
    draw() {
        tool.fillStyle = "white";
        tool.fillRect(this.x, this.y, this.width, this.height);
    }
    update() {
        this.draw();
        this.x = this.x+this.velocity.x;
        this.y = this.y = this.y+this.velocity.y;
    }
}
class Corona{
    constructor(x, y, width, height, velocity) {

        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.velocity = velocity;

    }
    draw() {
        tool.fillStyle = "white";
        tool.drawImage(coronaImg, this.x, this.y, this.width, this.height);
    }
    update() {
        this.draw();
        this.x = this.x+this.velocity.x;
        this.y = this.y = this.y+this.velocity.y;
    }
}
class Particle{
    constructor(x, y, radius, velocity) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.velocity = velocity;
        this.alpha = 1;
    }
    draw() {

        // save current state of tool
        tool.save();
        // change the alpha of tool, to draw the particle
        tool.globalAlpha = this.alpha;
        tool.beginPath();
        tool.fillStyle = "white";
        tool.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        tool.fill();
        
        // after drawing the particle, restore the state of tool
        tool.restore();
    }
    update(){
        this.draw();
        this.x = this.x+this.velocity.x;
        this.y = this.y+this.velocity.y;
        this.alpha -= 0.01;
    }
}

bullets = [];
coronas = [];
particles = [];

let animeId;

// earthImg
let earthHeight = 40;
let earthWidth = 40;
let earthx = canvas.width/2;
let earthy = canvas.height/2;
let earth = new Planet(earthx, earthy, earthWidth, earthHeight);

function collisionRect(entity1, entity2) {
    let l1 = entity1.x;
    let l2 = entity2.x;
    let r1 = l1+entity1.width;
    let r2 = l2+entity2.width;
    let t1 = entity1.y+entity1.height;
    let t2 = entity2.y+entity2.height;
    let b1 = entity1.y;
    let b2 = entity2.y;

    if(l1<r2 && l2<r1 && t1>b2 && t2&&b1) {
        return true;
    }
    return false;

}
function restart(){
    restartBtn.style.display = "block";
    startBtn.style.display = "none";
    box.style.display = "flex";
    powerLevelElement.parentElement.style.display = "none";
    document.body.style.backgroundColor = "white";
    canvas.height = 0;
    restartBtn.addEventListener("click", function(){
        window.location.reload();
    })
}
function animate() {
    tool.clearRect(0, 0, canvas.width, canvas.height);

    // load space image, earth image
    tool.fillRect(0, 0, canvas.width, canvas.height);
    tool.drawImage(spaceImg, 0, 0, canvas.width, canvas.height);
    
 
    earth.draw();

    // update particles
    particles.forEach(function(particle, idx){

        if(particle.alpha<=0) {
            // setTimeOut(function(){
                particles.splice(idx, 1);
            // })
        } else{
            particle.update();
        }

    })

    // for bullets
    let blen = bullets.length;
    for(let i=0; i<blen; i++) {
        
        bullets[i].update();     
        if(bullets[i].x<0||bullets[i].y<0||bullets[i].x>canvas.width||bullets[i].y>canvas.height) { 
            
            // https://stackoverflow.com/questions/34573938/how-to-properly-use-settimeout-with-immediately-invoked-function
            setTimeout(function(){
                bullets.splice(i, 1);
            });
        }
    }
    // console.log(bullets);

    // for corona
    coronas.forEach(function(corona, i) {

        corona.update();
        // collision logic
        if(collisionRect(earth, corona)){
            fullPower-=20;
            let s = fullPower.toString()+"%";
            powerLevelElement.style.width = s;

            coronas.splice(i, 1);
            if(fullPower==0) {                
                cancelAnimationFrame(animeId);
                // alert("Game Over!");
                restart();
            }

        }
        bullets.forEach(function(bullet, bulletIndex){
            if(collisionRect(corona, bullet)){

                // explosion
                for(let i=0; i<bullet.width*4; i++) {

                    particles.push(new Particle(bullet.x, bullet.y, Math.random()*2, {
                        x: (Math.random()-0.5)*(Math.random()*6),
                        y: (Math.random()-0.5)*(Math.random()*6)
                    }))
                }
                

                setTimeout(() => {
                    coronas.splice(i, 1);
                    bullets.splice(bulletIndex, 1);
                    score+=10;
                    scoreElement.innerText = score;
                }, 0);

            }
        });

    });

    animeId = requestAnimationFrame(animate);
}
function createCorona() {
    setInterval(function() {
        // console.log("Corona generated", Date.now());
        let x, y;
        let delta = Math.random();
        if(delta<0.5) {
            x = Math.random()<0.5?0:canvas.width;
            y = Math.random()*canvas.height;
        } else {
            x = Math.random()*canvas.width;
            y = Math.random()<0.5?0:canvas.height;
        }

        let angle = Math.atan2(earthy-20-y, earthx-20-x);
        let velocity = {x: Math.cos(angle)*2,
                        y: Math.sin(angle)*2};
                        
        let corona = new Corona(x, y, 30, 30, velocity);
        coronas.push(corona);

    }, 2000)
}

startBtn.addEventListener("click", function(e) {
    // alert("Start the Game!");
    e.stopImmediatePropagation();
    // box hide
    box.style.display="none";

    animate();
    createCorona();

    window.addEventListener("click", function(e) {
        // console.log(e.clientX);
        // console.log(e.clientY);

        let angle = Math.atan2(e.clientY-earthy-20, e.clientX-earthx-20);
        let velocity = {x: Math.cos(angle)*4,
                        y: Math.sin(angle)*4};

        // let bullet = new Bullet(e.clientX, e.clientY, 7, 7, velocity);
        let bullet = new Bullet(earthx+20, earthy+20, 7, 7, velocity);
        bullet.draw();
        bullets.push(bullet);
            
    });

})

window.addEventListener("resize", function(){
    window.location.reload();
})