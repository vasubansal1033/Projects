const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let LEFT, UP, RIGHT, DOWN;
let mu = 0.05 // coefficient of friction
// let elasticity = 0.7
let scale = 100;
let numBalls = 5;
let audio = new Audio('./audio.mp3');
const colors = ["red", "orange", "green", "blue", "pink", "white"];
const Balls = [];
const Walls = [];

class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    add(v) {
        return new Vector(this.x + v.x, this.y + v.y);
    }
    sub(v) {
        return new Vector(this.x - v.x, this.y - v.y);
    }
    mag() {
        return Math.sqrt((this.x * this.x) + (this.y * this.y));
    }
    mult(e) {
        return new Vector(this.x * e, this.y * e);
    }
    drawVec(start_x, start_y, scale, color) {
        ctx.beginPath();
        ctx.moveTo(start_x, start_y);
        ctx.lineTo(start_x + this.x * scale, start_y + this.y * scale);
        ctx.strokeStyle = color;
        ctx.stroke();
    }
    unit() {
        if (this.mag() == 0) {
            return new Vector(0, 0);
        }
        return new Vector(this.x / this.mag(), this.y / this.mag());
    }
    normal() {
        return new Vector(-this.y, this.x).unit();
    }
    static dot(v1, v2) {
        return (v1.x * v2.x) + (v1.y * v2.y);
    }

}
class Ball {
    constructor(x, y, r, m, elasticity) {
        this.pos = new Vector(x, y);
        this.r = r;

        this.m = m;
        this.elasticity = elasticity;

        if (this.m == 0) {
            this.inv_m = 0;
        } else {
            this.inv_m = 1 / this.m;
        }

        this.vel = new Vector(0, 0);
        this.acc = new Vector(0, 0);

        this.acceleration = 1;

        this.player = false;
        Balls.push(this);
    }
    drawBall() {
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.r, 0, 360 * Math.PI / 180);

        // stroke color
        ctx.strokeStyle = "black";
        ctx.stroke();
        // fill color
        ctx.fillStyle = "yellow";
        ctx.fill();
    }
    displayLines() {

        // circle
        // ctx.beginPath();
        // ctx.arc(550, 400, 50, 0, 360 * Math.PI / 180);
        // // stroke color
        // ctx.strokeStyle = "black";
        // ctx.stroke();

        this.vel.drawVec(this.pos.x, this.pos.y, 10, "green");

        ctx.fillStyle = "black";
        ctx.fillText(`m = ${this.m}`, this.pos.x - 10, this.pos.y - 5);
        ctx.fillText(`e = ${this.elasticity}`, this.pos.x - 10, this.pos.y + 5);

        // this.acc.unit().drawVec(550, 400, 50, "blue");
    }
    reposition() {
        this.vel = this.vel.add(this.acc);
        this.vel = this.vel.mult(1 - mu);

        this.pos = this.pos.add(this.vel);
    }
}
class Wall {
    constructor(x1, y1, x2, y2) {
        this.start = new Vector(x1, y1);
        this.end = new Vector(x2, y2);
        Walls.push(this);
    }
    drawWall() {
        ctx.beginPath();
        ctx.moveTo(this.start.x, this.start.y);
        ctx.lineTo(this.end.x, this.end.y);
        ctx.strokeStyle = "black";
        // ctx.lineWidth = 5;
        ctx.stroke();
        // ctx.lineWidth = 1;
    }
    wallUnit() {
        return this.end.sub(this.start).unit();
    }
}

canvas.addEventListener('keydown', function (e) {
    if (e.key === "ArrowUp") {
        // console.log('UP');
        // y--;
        UP = true;
    }
    if (e.key === "ArrowDown") {
        // console.log('DOWN');
        // y++;
        DOWN = true;
    }
    if (e.key === "ArrowLeft") {
        // console.log('LEFT');
        // x--;
        LEFT = true;
    }
    if (e.key === "ArrowRight") {
        // console.log('RIGHT');
        // x++;
        RIGHT = true;
    }
})
canvas.addEventListener('keyup', function (e) {
    if (e.key === "ArrowUp") {
        // console.log('UP');
        // y--;
        UP = false;
    }
    if (e.key === "ArrowDown") {
        // console.log('DOWN');
        // y++;
        DOWN = false;
    }
    if (e.key === "ArrowLeft") {
        // console.log('LEFT');
        // x--;
        LEFT = false;
    }
    if (e.key === "ArrowRight") {
        // console.log('RIGHT');
        // x++;
        RIGHT = false;
    }
})

// functions
function keyControl(ball) {

    if (UP) {
        ball.acc.y = -ball.acceleration;
    }
    if (DOWN) {
        ball.acc.y = ball.acceleration
    }
    if (LEFT) {
        ball.acc.x = -ball.acceleration;
    }
    if (RIGHT) {
        ball.acc.x = ball.acceleration
    }

    if (!UP && !DOWN) {
        ball.acc.y = 0
    }
    if (!LEFT && !RIGHT) {
        ball.acc.x = 0
    }

    // ball.acc = ball.acc.unit();
    // ball.reposition();

}
function coll_det(ball1, ball2) {
    if (ball1.r + ball2.r >= ball2.pos.sub(ball1.pos).mag()) {
        return true;
    } else {
        return false;
    }
}
function penetrationResolution(ball1, ball2) {
    let dist = ball2.pos.sub(ball1.pos);
    let penetrationDepth = ball1.r + ball2.r - dist.mag();
    let penetrationRes = dist.unit().mult(penetrationDepth / (ball1.inv_m + ball2.inv_m));

    ball1.pos = ball1.pos.add(penetrationRes.mult(-ball1.inv_m));
    ball2.pos = ball2.pos.add(penetrationRes.mult(ball2.inv_m));
}
function collisionResolution(ball1, ball2) {
    let normal = ball1.pos.sub(ball2.pos).unit();
    let relVel = ball1.vel.sub(ball2.vel);

    let sepVel = Vector.dot(relVel, normal);
    let newSepVel = -sepVel * Math.min(ball1.elasticity, ball2.elasticity);

    let velSep_diff = newSepVel - sepVel;
    let impulse = velSep_diff / (ball1.inv_m + ball2.inv_m);
    let impulseVec = normal.mult(impulse);

    ball1.vel = ball1.vel.add(impulseVec.mult(ball1.inv_m));
    ball2.vel = ball2.vel.add(impulseVec.mult(-ball2.inv_m));
}
function momentumDisplay() {
    let momentum = Ball1.vel.add(Ball2.vel).mag();
    ctx.fillText(`Moment: ${Math.round(momentum)}`, 500, 300)
}
function randInt(a, b) {
    return Math.floor(Math.random() * (b - a + 1)) + a;
}
function closestPoint(ball, wall) {

    let ballToWallStart = wall.start.sub(ball.pos);
    if (Vector.dot(wall.wallUnit(), ballToWallStart) > 0) {
        return wall.start;
    }

    let wallEndToBall = ball.pos.sub(wall.end);
    if (Vector.dot(wall.wallUnit(), wallEndToBall) > 0) {
        return wall.end;
    }

    let closestDist = Vector.dot(wall.wallUnit(), ballToWallStart);
    let closestVec = wall.wallUnit().mult(closestDist);
    return wall.start.sub(closestVec);
}
function collisionBetweenBallWall(ball, wall) {
    let cpVector = closestPoint(ball, wall).sub(ball.pos);
    if (cpVector.mag() <= ball.r) {
        return true;
    }
    return false;
}
function penetrationResolutionBallWall(ball, wall) {
    let penetrationVec = ball.pos.sub(closestPoint(ball, wall));
    ball.pos = ball.pos.add(penetrationVec.unit().mult(ball.r - penetrationVec.mag()));
}
function collisionResolutionBallWall(ball, wall) {
    let normal = ball.pos.sub(closestPoint(ball, wall)).unit();
    let sepVel = Vector.dot(ball.vel, normal);

    let newSepVel = -sepVel * ball.elasticity;
    let Vsep_diff = sepVel - newSepVel;
    ball.vel = ball.vel.add(normal.mult(-Vsep_diff));
}

// game loop
function mainLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    Balls.forEach((b, idx) => {
        
        b.drawBall();
        if (b.player) {
            keyControl(b);
        }

        for(let i=0; i<Walls.length; i++) {
            if (collisionBetweenBallWall(Balls[idx], Walls[i])) {
                // ctx.fillText("collision", 500, 330);
                penetrationResolutionBallWall(Balls[idx], Walls[i]);
                collisionResolutionBallWall(Balls[idx], Walls[i]);
                audio.play();
            }
        }
        for (let i = idx + 1; i < Balls.length; i++) {
            if (i != idx) {
                if (coll_det(Balls[idx], Balls[i])) {
                    // ctx.fillText("Collision", 500, 330);
                    penetrationResolution(Balls[idx], Balls[i]);
                    collisionResolution(Balls[idx], Balls[i]);
                    audio.play();
                }
            }
        }
        b.displayLines();
        b.reposition();

    })
    Walls.forEach((w) => {
        w.drawWall();
    })

    // // testing closest point
    // closestPoint(Balls[0], Walls[0]).sub(Balls[0].pos).drawVec(Balls[0].pos.x, Balls[0].pos.y, 1, "red");

    // momentumDisplay();
    requestAnimationFrame(mainLoop);

}

for (let i = 0; i < numBalls; i++) {
    let newX = randInt(100, 500);
    let newY = randInt(50, 400);
    let newR = randInt(20, 50);
    let newM = randInt(1, 20);
    let newE = randInt(0, 100) / 100;
    let newBall = new Ball(newX, newY, newR, newM, newE);
}
Wall1 = new Wall(0, 0, canvas.width, 0);
Wall2 = new Wall(0, 0, 0, canvas.height);
Wall3 = new Wall(canvas.width, 0, canvas.width, canvas.height);
Wall4 = new Wall(0, canvas.height, canvas.width, canvas.height);
Wall5 = new Wall(100, 100, 300, 300);

Balls[0].player = true;
requestAnimationFrame(mainLoop);