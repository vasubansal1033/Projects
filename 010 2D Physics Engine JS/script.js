const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let LEFT, UP, RIGHT, DOWN;
let mu = 0.05 // coefficient of friction
let scale = 100;
let numBalls = 5;
// let audio = new Audio('./audio.mp3');
const Balls = [];
const Walls = [];
const Capsules = [];
const Boxes = [];

// Make all function names uniform across classes

// 2d matrix
class Matrix {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.data = [];

        for (let i = 0; i < this.rows; i++) {
            this.data[i] = [];
            for (let j = 0; j < this.cols; j++) {
                this.data[i][j] = 0;
            }
        }
    }
    multiplyWithVec(v) {
        let res = new Vector(0, 0);
        res.x = this.data[0][0] * v.x + this.data[0][1] * v.y;
        res.y = this.data[1][0] * v.x + this.data[1][1] * v.y;
        return res;
    }

}
// capsule class
class Capsule {
    constructor(x1, y1, x2, y2, r, m, e) {
        this.start = new Vector(x1, y1);
        this.end = new Vector(x2, y2);
        this.r = r;
        this.m = m;
        this.elasticity = e;
        if (this.m == 0) {
            this.inv_m = 0;
        } else {
            this.inv_m = 1 / this.m;
        }

        this.player = false;

        this.pos = this.start.add(this.end).mult(0.5);
        this.length = this.end.sub(this.start).mag();
        this.dir = this.end.sub(this.start).unit();

        // calculating Moment of inertia
        let circleArea = Math.PI * this.r ** 2;
        let rectArea = this.length * 2 * this.r;
        let massDensity = this.m / (circleArea + rectArea);

        let moiRectangle = (rectArea * massDensity / 12) * (this.length ** 2 + 2 * this.r ** 2);
        let moiSemiCircle = (circleArea * massDensity / 2) * (this.r ** 2 + (this.length ** 2) * 0.25);
        this.inertia = moiRectangle + (moiSemiCircle * 2);
        if (this.inertia == 0) {
            this.inv_inertia = 0;
        } else {
            this.inv_inertia = 1 / this.inertia;
        }


        this.acceleration = 1;
        this.acc = new Vector(0, 0);
        this.vel = new Vector(0, 0);

        this.omega = 0.05;
        this.angle = 0;
        this.angVel = 0;

        // these will remain same
        this.refDir = this.end.sub(this.start).unit();
        this.refAngle = Math.acos(Vector.dot(this.refDir, new Vector(1, 0)));

        if (Vector.cross(this.refDir, new Vector(1, 0)) > 0) {
            this.refAngle *= -1;
        }
        Capsules.push(this);

    }
    drawCapsule() {
        ctx.beginPath();
        ctx.arc(this.start.x, this.start.y, this.r, this.angle + this.refAngle + Math.PI / 2, this.angle + this.refAngle - Math.PI / 2);
        ctx.arc(this.end.x, this.end.y, this.r, this.angle + this.refAngle - Math.PI / 2, this.angle + this.refAngle + Math.PI / 2);
        ctx.closePath();


        ctx.strokeStyle = "black";

        // ctx.moveTo(this.start.x, this.start.y);
        // ctx.lineTo(this.end.x, this.end.y);

        ctx.fillStyle = "black";
        ctx.stroke();

        ctx.fillStyle = "lightgreen";
        ctx.fill();
    }
    capsuleKeyControl() {
        if (UP) {
            this.acc = this.dir.mult(-this.acceleration);
        }
        if (DOWN) {
            this.acc = this.dir.mult(this.acceleration);
        }
        if (!UP && !DOWN) {
            this.acc = new Vector(0, 0);
        }
        if (LEFT) {
            this.angVel = -this.omega;
        }
        if (RIGHT) {
            this.angVel = this.omega;
        }

    }
    reposition() {
        this.vel = this.vel.add(this.acc);
        this.vel = this.vel.mult(1 - mu);

        this.pos = this.pos.add(this.vel);

        this.angle += this.angVel;
        this.angVel *= 0.96;

        let rotMat = rotMatrix(this.angle);
        this.dir = rotMat.multiplyWithVec(this.refDir);

        this.start = this.pos.add(this.dir.mult(-this.length / 2));
        this.end = this.pos.add(this.dir.mult(this.length / 2));

    }
}
class Box {
    constructor(x1, y1, x2, y2, w, m, e) {
        this.vertices = [];
        this.vertices[0] = new Vector(x1, y1);
        this.vertices[1] = new Vector(x2, y2);

        this.edge = this.vertices[1].sub(this.vertices[0]);
        this.length = this.edge.mag();
        this.width = w;

        this.elasticity = e;

        this.player = false;

        this.dir = this.edge.unit();
        this.refDir = this.edge.unit();

        this.vertices[2] = this.vertices[1].add(this.dir.normal().mult(this.width));
        this.vertices[3] = this.vertices[2].add(this.dir.mult(-this.length));

        this.m = m;
        if (this.m == 0) {
            this.inv_m = 0;
        } else {
            this.inv_m = 1 / this.m;
        }

        // calculating Moment of inertia      
        this.inertia = this.m * (this.width ** 2 + this.length ** 2) / 12;
        if (this.inertia == 0) {
            this.inv_inertia = 0;
        } else {
            this.inv_inertia = 1 / this.inertia;
        }

        this.pos = this.vertices[0].add(this.dir.mult(this.length / 2)).add(this.dir.normal().mult(this.width / 2));
        this.player = false;

        this.acceleration = 1;
        this.acc = new Vector(0, 0);
        this.vel = new Vector(0, 0);

        this.omega = 0.05;
        this.angle = 0;
        this.angVel = 0;

        Boxes.push(this);
    }
    draw() {
        ctx.beginPath();
        ctx.moveTo(this.vertices[0].x, this.vertices[0].y);
        ctx.lineTo(this.vertices[1].x, this.vertices[1].y);
        ctx.lineTo(this.vertices[2].x, this.vertices[2].y);
        ctx.lineTo(this.vertices[3].x, this.vertices[3].y);
        ctx.lineTo(this.vertices[0].x, this.vertices[0].y);

        ctx.strokeStyle = "black";
        ctx.stroke();
        ctx.closePath();

        drawCircle(this.pos.x, this.pos.y, 10);

    }
    boxKeyControl() {
        if (UP) {
            this.acc = this.dir.mult(-this.acceleration);
        }
        if (DOWN) {
            this.acc = this.dir.mult(this.acceleration);
        }
        if (!UP && !DOWN) {
            this.acc = new Vector(0, 0);
        }
        if (LEFT) {
            this.angVel = -this.omega;
        }
        if (RIGHT) {
            this.angVel = this.omega;
        }
    }
    reposition() {
        this.vel = this.vel.add(this.acc);
        this.vel = this.vel.mult(1 - mu);

        this.pos = this.pos.add(this.vel);

        this.angle += this.angVel;
        this.angVel *= 0.96;

        let rotMat = rotMatrix(this.angle);
        this.dir = rotMat.multiplyWithVec(this.refDir);

        this.vertices[0] = this.pos.add(this.dir.mult(-this.length / 2)).add(this.dir.normal().mult(this.width / 2));
        this.vertices[1] = this.pos.add(this.dir.mult(-this.length / 2)).add(this.dir.normal().mult(-this.width / 2));
        this.vertices[2] = this.pos.add(this.dir.mult(this.length / 2)).add(this.dir.normal().mult(-this.width / 2));
        this.vertices[3] = this.pos.add(this.dir.mult(this.length / 2)).add(this.dir.normal().mult(this.width / 2));

    }

}

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
    static cross(v1, v2) {
        return v1.x * v2.y - v1.y * v2.x;
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

        this.vertices = [];

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
        // ctx.fill(); 
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
    ballKeyControl() {

        if (UP) {
            this.acc.y = -this.acceleration;
        }
        if (DOWN) {
            this.acc.y = this.acceleration
        }
        if (LEFT) {
            this.acc.x = -this.acceleration;
        }
        if (RIGHT) {
            this.acc.x = this.acceleration
        }

        if (!UP && !DOWN) {
            this.acc.y = 0
        }
        if (!LEFT && !RIGHT) {
            this.acc.x = 0
        }

        // ball.acc = ball.acc.unit();
        // ball.reposition();

    }
}
class Wall {
    constructor(x1, y1, x2, y2) {
        this.start = new Vector(x1, y1);
        this.end = new Vector(x2, y2);

        this.vertices = [this.start, this.end];

        this.center = this.start.add(this.end).mult(0.5);
        this.length = this.end.sub(this.start).mag();
        this.angle = 0;

        this.refStart = new Vector(x1, y1);
        this.refEnd = new Vector(x2, y2);
        this.refUnit = this.end.sub(this.start).unit();

        this.dir = this.end.sub(this.start).unit();

        this.omega = 0.1
        this.angVel = 0

        Walls.push(this);
    }
    drawWall() {

        let rotMat = rotMatrix(this.angle);
        let newDir = rotMat.multiplyWithVec(this.refUnit);

        this.start = this.center.add(newDir.mult(-this.length / 2));
        this.end = this.center.add(newDir.mult(this.length / 2));

        this.dir = this.end.sub(this.start).unit();

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
    wallKeyControl() {
        if (LEFT) {
            this.angVel = -this.omega;
        }
        if (RIGHT) {
            this.angVel = this.omega;
        }
    }
    reposition() {
        this.angle += this.angVel;
        this.angVel *= 0.96
    }
}


// detect key presses and releases
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
function createBalls(numBalls) {
    for (let i = 0; i < numBalls; i++) {
        let newX = randInt(100, 500);
        let newY = randInt(50, 400);
        let newR = randInt(20, 50);
        let newM = randInt(1, 20);
        let newE = randInt(0, 100) / 100;
        let newBall = new Ball(newX, newY, newR, newM, newE);
    }
}
function createWalls() {
    Wall1 = new Wall(0, 0, canvas.width, 0);
    Wall2 = new Wall(0, 0, 0, canvas.height);
    Wall3 = new Wall(canvas.width, 0, canvas.width, canvas.height);
    Wall4 = new Wall(0, canvas.height, canvas.width, canvas.height);
    Wall5 = new Wall(100, 100, 300, 300);
}
function drawCircle(x, y, r) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 360 * Math.PI / 180);

    // stroke color
    ctx.strokeStyle = "black";
    ctx.stroke();
}

// rotation matrix
function rotMatrix(angle) {
    let res = new Matrix(2, 2);
    res.data[0][0] = Math.cos(angle);
    res.data[0][1] = -Math.sin(angle);
    res.data[1][0] = Math.sin(angle);
    res.data[1][1] = Math.cos(angle);

    return res;
}
function closestPointOnLine(point, wall) {

    let pointToWallStart = wall.start.sub(point);
    if (Vector.dot(wall.wallUnit(), pointToWallStart) > 0) {
        return wall.start;
    }

    let wallEndToPoint = point.sub(wall.end);
    if (Vector.dot(wall.wallUnit(), wallEndToPoint) > 0) {
        return wall.end;
    }

    let closestDist = Vector.dot(wall.wallUnit(), pointToWallStart);
    let closestVec = wall.wallUnit().mult(closestDist);
    return wall.start.sub(closestVec);
}
function closestPointsCapsules(capsule1, capsule2) {

    let wall1 = new Wall(capsule1.start.x, capsule1.start.y, capsule1.end.x, capsule1.end.y);
    let wall2 = new Wall(capsule2.start.x, capsule2.start.y, capsule2.end.x, capsule2.end.y);

    let temp = closestPointOnLine(capsule1.start, wall2);
    let shortestDist = temp.sub(capsule1.start).mag();
    let closestPoints = [capsule1.start, temp];

    temp = closestPointOnLine(capsule1.end, wall2);
    if (temp.sub(capsule1.end).mag() < shortestDist) {
        shortestDist = temp.sub(capsule1.end).mag();
        closestPoints = [capsule1.end, temp];
    }
    temp = closestPointOnLine(capsule2.start, wall1);
    if (temp.sub(capsule2.start).mag() < shortestDist) {
        shortestDist = temp.sub(capsule2.start).mag();
        closestPoints = [temp, capsule2.start];
    }
    temp = closestPointOnLine(capsule2.end, wall1);
    if (temp.sub(capsule2.end).mag() < shortestDist) {
        shortestDist = temp.sub(capsule2.end).mag();
        closestPoints = [temp, capsule2.end];
    }

    // ctx.strokeStyle = "red";
    // ctx.beginPath();
    // ctx.moveTo(closestPoints[0].x, closestPoints[0].y);
    // ctx.lineTo(closestPoints[1].x, closestPoints[1].y);
    // ctx.closePath();
    // ctx.stroke();

    // drawCircle(closestPoints[0].x, closestPoints[0].y, capsule1.r);
    // drawCircle(closestPoints[1].x, closestPoints[1].y, capsule2.r);

    return closestPoints;
}
function collisionBetweenCapsules(capsule1, capsule2) {
    let cps = closestPointsCapsules(capsule1, capsule2);
    if (capsule1.r + capsule2.r >= cps[0].sub(cps[1]).mag()) {
        return true;
    } else {
        return false;
    }
}
function penetrationResolutionCapsules(capsule1, capsule2) {
    let cps = closestPointsCapsules(capsule1, capsule2);
    let dist = cps[0].sub(cps[1]);
    let penetrationDepth = capsule1.r + capsule2.r - dist.mag();
    let penetrationRes = dist.unit().mult(penetrationDepth / (capsule1.inv_m + capsule2.inv_m));

    capsule1.pos = capsule1.pos.add(penetrationRes.mult(capsule1.inv_m));
    capsule2.pos = capsule2.pos.add(penetrationRes.mult(-capsule2.inv_m));
}
function collisionResolutionCapsules(capsule1, capsule2) {
    let normal = capsule1.pos.sub(capsule2.pos).unit();

    // 1. closing velocity
    let temp = closestPointsCapsules(capsule1, capsule2);
    let collisionArm1 = temp[0].sub(capsule1.pos).add((normal.mult(capsule1.r)));
    let rotVel1 = new Vector(-capsule1.angVel * collisionArm1.y, capsule1.angVel * collisionArm1.x);
    let closeVel1 = capsule1.vel.add(rotVel1);

    let collisionArm2 = temp[1].sub(capsule2.pos).add((normal.mult(capsule2.r)));
    let rotVel2 = new Vector(-capsule2.angVel * collisionArm2.y, capsule2.angVel * collisionArm2.x);
    let closeVel2 = capsule2.vel.add(rotVel2);

    // 2. Impulse augmentation
    let impAug1 = Vector.cross(collisionArm1, normal);
    impAug1 = impAug1 * capsule1.inv_inertia * impAug1;
    let impAug2 = Vector.cross(collisionArm2, normal);
    impAug2 = impAug2 * capsule2.inv_inertia * impAug2;

    let relVel = closeVel1.sub(closeVel2);

    let sepVel = Vector.dot(relVel, normal);
    let newSepVel = -sepVel * Math.min(capsule1.elasticity, capsule2.elasticity);

    let velSep_diff = newSepVel - sepVel;
    let impulse = velSep_diff / (capsule1.inv_m + capsule2.inv_m + impAug1 + impAug2);
    let impulseVec = normal.mult(impulse);

    // 3. Updating the velocities
    capsule1.vel = capsule1.vel.add(impulseVec.mult(capsule1.inv_m));
    capsule2.vel = capsule2.vel.add(impulseVec.mult(-capsule2.inv_m));

    capsule1.angVel += capsule1.inv_inertia * Vector.cross(collisionArm1, impulseVec);
    capsule2.angVel -= capsule2.inv_inertia * Vector.cross(collisionArm2, impulseVec);
}

// Separating Axis Theorem

// returns set of axes for SAT to check
function getAxes(obj1, obj2) {
    let axes1 = [];
    let axes2 = [];

    if ((obj1 instanceof Ball) && (obj2 instanceof Ball)) {
        axes1.push(obj2.pos.sub(obj1.pos).unit());
        return [axes1, axes2];
    }
    if (obj1 instanceof Ball) {
        axes1.push(closestVertexToPoint(obj2, obj1.pos).sub(obj1.pos).unit());
    }
    if (obj2 instanceof Ball) {
        axes2.push(closestVertexToPoint(obj1, obj2.pos).sub(obj2.pos).unit());
    }
    if (obj1 instanceof Wall) {
        axes1.push(obj1.dir.normal());
    }
    if (obj2 instanceof Wall) {
        axes2.push(obj2.dir.normal());
    }

    // utility for convex polygon
    let util = (obj, axes) => {
        for (let i = 0; i < obj.vertices.length; i++) {
            let p1 = obj.vertices[i];
            let p2 = obj.vertices[i + 1 == obj.vertices.length ? 0 : i + 1];
            axes.push(p1.sub(p2).normal().unit());
        }
    }
    if (obj1 instanceof Box) {
        util(obj1, axes1);
    }
    if (obj2 instanceof Box) {
        util(obj2, axes2);
    }

    return [axes1, axes2];
}
function sat(obj1, obj2) {
    let minOverlap = null;
    let smallestAxis;
    let vertexObj;

    let [axes1, axes2] = getAxes(obj1, obj2);

    let P1ContainsP2 = (p1, p2) => {
        return (p1.max > p2.max && p1.min < p2.min)
    }
    let proj1, proj2 = 0;
    for (let i = 0; i < axes1.length; i++) {
        proj1 = projectShapeOnAxis(axes1[i], obj1);
        proj2 = projectShapeOnAxis(axes1[i], obj2);
        let overlap = Math.min(proj1.max, proj2.max) - Math.max(proj1.min, proj2.min);

        // overlap negative  means no intersection along the axis
        // so no collision
        if (overlap < 0) {
            return false;
        }
        // when projection of one is inside the other
        // correct by adding
        if (P1ContainsP2(proj1, proj2) || P1ContainsP2(proj2, proj1)) {

            let dmin = Math.abs(proj1.min - proj2.min);
            let dmax = Math.abs(proj1.max - proj2.max);
            if (dmin < dmax) {
                overlap += dmin;
            } else {
                overlap += dmax;
                axes1[i] = axes1[i].mult(-1);
            }

        }
        if ((overlap < minOverlap) || (minOverlap === null)) {
            minOverlap = overlap;
            smallestAxis = axes1[i];
            vertexObj = obj2;
            if (proj1.max > proj2.max) {
                smallestAxis = axes1[i].mult(-1);
            }
        }

    }

    for (let i = 0; i < axes2.length; i++) {
        proj1 = projectShapeOnAxis(axes2[i], obj1);
        proj2 = projectShapeOnAxis(axes2[i], obj2);
        overlap = Math.min(proj1.max, proj2.max) - Math.max(proj1.min, proj2.min);
        if (overlap < 0) {
            return false;
        }
        if (P1ContainsP2(proj1, proj2) || P1ContainsP2(proj2, proj1)) {

            let dmin = Math.abs(proj1.min - proj2.min);
            let dmax = Math.abs(proj1.max - proj2.max);
            if (dmin < dmax) {
                overlap += dmin;
            } else {
                overlap += dmax;
                axes2[i] = axes2[i].mult(-1);
            }

        }
        if ((overlap < minOverlap) || (minOverlap === null)) {
            minOverlap = overlap;
            smallestAxis = axes2[i];
            vertexObj = obj1;
            if (proj1.max < proj2.max) {
                smallestAxis = axes2[i].mult(-1);
            }
        }
    }

    let contactVertex = projectShapeOnAxis(smallestAxis, vertexObj).collisionVertex;
    smallestAxis.drawVec(contactVertex.x, contactVertex.y, minOverlap, "blue");
    return true;
}

// projects any shape on an axis
// returns the starting and ending point of projection
function projectShapeOnAxis(axis, obj) {

    // if obj is Ball, set vertices
    if (obj instanceof Ball) {
        obj.vertices[0] = obj.pos.add(axis.unit().mult(-obj.r));
        obj.vertices[1] = obj.pos.add(axis.unit().mult(obj.r));
    }

    let min = Vector.dot(axis, obj.vertices[0]);
    let max = min;
    let collisionVertex = obj.vertices[0]

    for (let i = 0; i < obj.vertices.length; i++) {
        let p = Vector.dot(axis, obj.vertices[i]);
        if (p < min) {
            min = p;
            collisionVertex = obj.vertices[i];
        }
        if (p > max) {
            max = p;
        }
    }
    return {
        max: max,
        min: min,
        collisionVertex: collisionVertex
    };

}
// finds closest vertex of obj to point p
function closestVertexToPoint(obj, p) {
    let closestVertex;
    let minDist = null;
    for (let i = 0; i < obj.vertices.length; i++) {
        let temp = p.sub(obj.vertices[i]).mag();
        if (temp < minDist || minDist == null) {
            closestVertex = obj.vertices[i];
            minDist = temp;
        }
    }
    return closestVertex;
}

function initBalls() {
    Balls.forEach((b, idx) => {

        b.drawBall();
        if (b.player) {
            b.ballKeyControl();
        }

        for (let i = 0; i < Walls.length; i++) {
            if (collisionBetweenBallWall(Balls[idx], Walls[i])) {
                // ctx.fillText("collision", 500, 330);
                penetrationResolutionBallWall(Balls[idx], Walls[i]);
                collisionResolutionBallWall(Balls[idx], Walls[i]);
                // audio.play();
            }
        }
        for (let i = idx + 1; i < Balls.length; i++) {
            if (i != idx) {
                if (coll_det(Balls[idx], Balls[i])) {
                    // ctx.fillText("Collision", 500, 330);
                    penetrationResolution(Balls[idx], Balls[i]);
                    collisionResolution(Balls[idx], Balls[i]);
                    // audio.play();
                }
            }
        }
        b.displayLines();
        b.reposition();

    })
}
function initCapsules() {
    Capsules.forEach((c, idx) => {
        c.drawCapsule();
        if (c.player) {
            c.capsuleKeyControl();
        }
        for (let i = idx + 1; i < Capsules.length; i++) {
            if (collisionBetweenCapsules(Capsules[idx], Capsules[i])) {
                ctx.fillText(`Collision between $S{i} and ${idx}`, 550, 300)
                penetrationResolutionCapsules(Capsules[idx], Capsules[i]);
                collisionResolutionCapsules(Capsules[idx], Capsules[i]);
            }
        }
        // closestPointsCapsules(Capsules[0], Capsules[1]);
        c.reposition();
    })
}
function initWalls() {
    Walls.forEach((w) => {
        w.drawWall();
        // comment below lines incase of stationery walls
        // w.wallKeyControl();
        // w.reposition();
    })
}
function initBoxes() {
    Boxes.forEach((b) => {
        b.draw();
        if (b.player) {
            b.boxKeyControl();
        }
        b.reposition();
    })
}
// game loop
function mainLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    initWalls();
    initBalls();
    // initCapsules();
    initBoxes();

    // testing Separating Axis Theorem
    if (sat(Balls[0], Boxes[0])) {
        ctx.fillText("Collision", 500, 400);
    }

    // // testing closest point
    // closestPoint(Balls[0], Walls[0]).sub(Balls[0].pos).drawVec(Balls[0].pos.x, Balls[0].pos.y, 1, "red");

    // momentumDisplay();
    requestAnimationFrame(mainLoop);

}

// createBalls(numBalls);
// createWalls();
// Balls[0].player = true;

// let Wall1 = new Wall(100, 250, 200, 200);
// let Wall2 = new Wall(150, 350, 350, 300);

createBalls(1);
Balls[0].player = true;
let Box1 = new Box(100, 100, 200, 200, 100, 5, 1);
// Box1.player = true;
// let Box2 = new Box(400, 100, 400, 300, 100, 5, 1);

// let capsule1 = new Capsule(200, 200, 100, 200, 20, 5, 1);
// let capsule2 = new Capsule(300, 300, 400, 300, 20, 8, 1);
// capsule1.player = true;

requestAnimationFrame(mainLoop);