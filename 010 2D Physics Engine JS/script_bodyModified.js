const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let LEFT, UP, RIGHT, DOWN;
let mu = 0.05 // coefficient of friction
let angMu = 0.99 // angular friction
let scale = 100;
let numBalls = 5;
// let audio = new Audio('./audio.mp3');
const Bodies = [];
const Collisions = [];
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

// shapes
class Line {
    constructor(x0, y0, x1, y1) {
        this.vertices = [];
        this.vertices[0] = new Vector(x0, y0)
        this.vertices[1] = new Vector(x1, y1)
        this.dir = this.vertices[1].sub(this.vertices[0]).unit();
        this.mag = this.vertices[1].sub(this.vertices[0]).mag();

        this.pos = this.vertices[0].add(this.vertices[1]).mult(0.5);
    }
    draw() {
        ctx.beginPath();
        ctx.moveTo(this.vertices[0].x, this.vertices[0].y)
        ctx.lineTo(this.vertices[1].x, this.vertices[1].y)
        ctx.strokeStyle = "black";
        ctx.stroke();
        ctx.closePath();
    }
}
class Circle {
    constructor(x, y, r) {
        this.vertices = [];
        this.pos = new Vector(x, y);
        this.r = r;
    }
    draw(col = "red") {
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.r, 0, 360 * Math.PI / 180);
        ctx.strokeStyle = col;
        ctx.stroke();
        ctx.fillStyle = col;
        ctx.fill();
        ctx.closePath();
    }
}
class Rectangle {
    constructor(x1, y1, x2, y2, w) {
        this.vertices = [];
        this.vertices[0] = new Vector(x1, y1);
        this.vertices[1] = new Vector(x2, y2);

        this.dir = this.vertices[1].sub(this.vertices[0]).unit();
        this.refDir = this.vertices[1].sub(this.vertices[0]).unit();

        this.length = this.vertices[1].sub(this.vertices[0]).mag();
        this.width = w;

        this.vertices[2] = this.vertices[1].add(this.dir.normal().mult(this.width));
        this.vertices[3] = this.vertices[2].add(this.dir.normal().mult(-this.length));
        this.pos = this.vertices[0].add(this.dir.mult(this.length / 2)).add(this.dir.normal().mult(this.width / 2))

        this.angle = 0;
        this.rotMat = new Matrix(2, 2);
    }
    draw(col = "red") {
        ctx.beginPath();
        ctx.moveTo(this.vertices[0].x, this.vertices[0].y);
        ctx.lineTo(this.vertices[1].x, this.vertices[1].y);
        ctx.lineTo(this.vertices[2].x, this.vertices[2].y);
        ctx.lineTo(this.vertices[3].x, this.vertices[3].y);
        ctx.lineTo(this.vertices[0].x, this.vertices[0].y);

        ctx.strokeStyle = col;
        ctx.stroke();

        ctx.fillStyle = col;
        ctx.fill();

        ctx.closePath();

        // drawCircle(this.pos.x, this.pos.y, 10, "black");
    }
    getVertices() {
        this.rotMat.rotMatrix(this.angle);
        this.dir = this.rotMat.multiplyWithVec(this.refDir);

        this.vertices[0] = this.pos.add(this.dir.mult(-this.length / 2)).add(this.dir.normal().mult(this.width / 2));
        this.vertices[1] = this.pos.add(this.dir.mult(-this.length / 2)).add(this.dir.normal().mult(-this.width / 2));
        this.vertices[2] = this.pos.add(this.dir.mult(this.length / 2)).add(this.dir.normal().mult(-this.width / 2));
        this.vertices[3] = this.pos.add(this.dir.mult(this.length / 2)).add(this.dir.normal().mult(this.width / 2));
    }
}
class Triangle {
    constructor(x1, y1, x2, y2, x3, y3) {
        this.vertices = [];
        this.vertices[0] = new Vector(x1, y1);
        this.vertices[1] = new Vector(x2, y2);
        this.vertices[2] = new Vector(x3, y3);
        this.pos = this.vertices[0].add(this.vertices[1]).add(this.vertices[2]).mult(1 / 3);
        this.dir = this.vertices[0].sub(this.pos).unit();
        this.refDir = this.vertices[0].sub(this.pos).unit();
        this.rotMat = new Matrix(2, 2);

        this.angle = 0;
        this.refDia = [];
        this.refDia[0] = this.vertices[0].sub(this.pos);
        this.refDia[1] = this.vertices[1].sub(this.pos);
        this.refDia[2] = this.vertices[2].sub(this.pos);
    }
    draw(col = "red") {
        ctx.beginPath();
        ctx.moveTo(this.vertices[0].x, this.vertices[0].y);
        ctx.lineTo(this.vertices[1].x, this.vertices[1].y);
        ctx.lineTo(this.vertices[2].x, this.vertices[2].y);
        ctx.lineTo(this.vertices[0].x, this.vertices[0].y);

        ctx.fillStyle = col;
        ctx.fill();

        ctx.strokeStyle = col;
        ctx.stroke();


        ctx.closePath();
    }
    getVertices() {
        this.rotMat.rotMatrix(this.angle);
        this.dir = this.rotMat.multiplyWithVec(this.refDir);

        this.vertices[0] = this.pos.add(this.rotMat.multiplyWithVec(this.refDia[0]));
        this.vertices[1] = this.pos.add(this.rotMat.multiplyWithVec(this.refDia[1]));
        this.vertices[2] = this.pos.add(this.rotMat.multiplyWithVec(this.refDia[2]));
    }
}

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
    // rotation matrix
    rotMatrix(angle) {
        this.data[0][0] = Math.cos(angle);
        this.data[0][1] = -Math.sin(angle);
        this.data[1][0] = Math.sin(angle);
        this.data[1][1] = Math.cos(angle);
    }

}

class Body {
    constructor(x, y) {
        this.comp = [];
        this.pos = new Vector(x, y);

        this.m = 0;
        this.inv_m = 0;
        this.inertia = 0;
        this.inv_inertia = 0;
        this.elasticity = 1;

        this.vel = new Vector(0, 0);
        this.acc = new Vector(0, 0);
        this.acceleration = 0.5;
        this.angVel = 0;
        this.player = false;
        Bodies.push(this);
    }
    draw() { }
    display() { }
    reposition() { }
    keyControl() { }
}

// ball class
class Ball extends Body {
    constructor(x, y, r, m, elasticity) {
        super();
        this.comp = [new Circle(x, y, r)];
        this.pos = new Vector(x, y);

        this.m = m;
        this.elasticity = elasticity;
        if (this.m == 0) {
            this.inv_m = 0;
        } else {
            this.inv_m = 1 / this.m;
        }
        this.inertia = this.m * (this.comp[0].r ** 2);
    }
    draw() {
        if(this.player) {
            this.comp[0].draw("purple");
        } else {
            this.comp[0].draw();
        }
        // this.display();
    }
    display() {

        // circle
        // ctx.beginPath();
        // ctx.arc(550, 400, 50, 0, 360 * Math.PI / 180);
        // // stroke color
        // ctx.strokeStyle = "black";
        // ctx.stroke();

        this.vel.drawVec(this.comp[0].pos.x, this.comp[0].pos.y, 10, "green");

        ctx.fillStyle = "black";
        ctx.fillText(`m = ${this.m}`, this.comp[0].pos.x - 10, this.comp[0].pos.y - 5);
        ctx.fillText(`e = ${this.elasticity}`, this.comp[0].pos.x - 10, this.comp[0].pos.y + 5);

        // this.acc.unit().drawVec(550, 400, 50, "blue");
    }
    reposition() {
        this.vel = this.vel.add(this.acc);
        this.vel = this.vel.mult(1 - mu);

        this.comp[0].pos = this.comp[0].pos.add(this.vel);
    }
    keyControl() {

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
// wall class
class Wall extends Body {
    constructor(x1, y1, x2, y2) {
        super();
        this.comp = [new Line(x1, y1, x2, y2)];
        this.omega = 0.1
    }
    draw() {
        this.comp[0].draw();
    }
    wallUnit() {
        return this.end.sub(this.start).unit();
    }
}
// capsule class
class Capsule extends Body {
    constructor(x1, y1, x2, y2, r, m, e) {
        super();
        this.comp = [new Circle(x1, y1, r), new Circle(x2, y2, r)];
        let recV1 = this.comp[1].pos.add(this.comp[1].pos.sub(this.comp[0].pos).normal().unit().mult(r));
        let recV2 = this.comp[0].pos.add(this.comp[1].pos.sub(this.comp[0].pos).normal().unit().mult(r));

        this.comp.unshift(new Rectangle(recV1.x, recV1.y, recV2.x, recV2.y, 2 * r))

        this.m = m;
        this.elasticity = e;
        if (this.m == 0) {
            this.inv_m = 0;
        } else {
            this.inv_m = 1 / this.m;
        }

        // calculating Moment of inertia
        let circleArea = Math.PI * this.comp[1].r ** 2;
        let rectArea = this.comp[0].length * 2 * this.comp[1].r;
        let massDensity = this.m / (circleArea + rectArea);

        let moiRectangle = (rectArea * massDensity / 12) * (this.comp[0].length ** 2 + 2 * this.comp[1].r ** 2);
        let moiSemiCircle = (circleArea * massDensity / 2) * (this.comp[1].r ** 2 + (this.comp[0].length ** 2) * 0.25);
        this.inertia = moiRectangle + (moiSemiCircle * 2);

        if (this.inertia == 0) {
            this.inv_inertia = 0;
        } else {
            this.inv_inertia = 1 / this.inertia;
        }
        this.omega = 0.05;
    }
    draw() {
        for (let i = 0; i < this.comp.length; i++) {
            this.comp[i].draw();
        }
    }
    keyControl() {
        if (UP) {
            this.acc = this.comp[0].dir.mult(-this.acceleration);
        }
        if (DOWN) {
            this.acc = this.comp[0].dir.mult(this.acceleration);
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
        // this.acc = this.acc.unit().mult(this.acceleration);
        this.vel = this.vel.add(this.acc);
        this.vel = this.vel.mult(1 - mu);

        this.comp[0].pos = this.comp[0].pos.add(this.vel);

        this.angVel *= angMu;
        this.comp[0].angle += this.angVel;

        this.comp[0].getVertices();

        this.comp[1].pos = this.comp[0].pos.add(this.comp[0].dir.mult(-this.comp[0].length / 2));
        this.comp[2].pos = this.comp[0].pos.add(this.comp[0].dir.mult(this.comp[0].length / 2));
    }
}
// box class
class Box extends Body {
    constructor(x1, y1, x2, y2, w, m, e) {
        super();
        this.comp = [new Rectangle(x1, y1, x2, y2, w)]

        this.elasticity = e;

        this.m = m;
        if (this.m == 0) {
            this.inv_m = 0;
        } else {
            this.inv_m = 1 / this.m;
        }

        // calculating Moment of inertia      
        this.inertia = this.m * (this.comp[0].width ** 2 + this.comp[0].length ** 2) / 12;
        if (this.inertia == 0) {
            this.inv_inertia = 0;
        } else {
            this.inv_inertia = 1 / this.inertia;
        }
        this.omega = 0.05;
    }
    draw() {
        this.comp[0].draw();
    }
    keyControl() {
        if (UP) {
            this.acc = this.comp[0].dir.mult(-this.acceleration);
        }
        if (DOWN) {
            this.acc = this.comp[0].dir.mult(this.acceleration);
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
        // this.acc = this.acc.unit().mult(this.acceleration);
        this.vel = this.vel.add(this.acc);
        this.vel = this.vel.mult(1 - mu);

        this.comp[0].pos = this.comp[0].pos.add(this.vel);

        this.angVel *= angMu;
        this.comp[0].angle += this.angVel;

        this.comp[0].getVertices();
    }

}
// star class
class Star extends Body {
    constructor(x1, y1, r, m, e) {
        super();
        this.comp = [];
        this.r = r;

        let centeroid = new Vector(x1, y1);
        let upDir = new Vector(0, -1);

        let p1 = centeroid.add(upDir.mult(r));
        let p2 = centeroid.add(upDir.mult(-r / 2)).add(upDir.normal().mult(-r * Math.sqrt(3) / 2));
        let p3 = centeroid.add(upDir.mult(-r / 2)).add(upDir.normal().mult(r * Math.sqrt(3) / 2));
        this.comp.push(new Triangle(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y));

        p1 = centeroid.add(upDir.mult(-r));
        p2 = centeroid.add(upDir.mult(r / 2)).add(upDir.normal().mult(-r * Math.sqrt(3) / 2));
        p3 = centeroid.add(upDir.mult(r / 2)).add(upDir.normal().mult(r * Math.sqrt(3) / 2));
        this.comp.push(new Triangle(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y));

        this.m = m;
        this.elasticity = e;
        if (this.m == 0) {
            this.inv_m = 0;
        } else {
            this.inv_m = 1 / this.m;
        }

        // calculating Moment of inertia
        let sideLength = p2.sub(p1).mag();
        this.inertia = this.m * (sideLength ** 2) / 12;

        if (this.inertia == 0) {
            this.inv_inertia = 0;
        } else {
            this.inv_inertia = 1 / this.inertia;
        }
        this.omega = 0.05;
    }
    draw() {
        for (let i = 0; i < this.comp.length; i++) {
            this.comp[i].draw();
        }
    }
    keyControl() {
        if (UP) {
            this.acc = this.comp[0].dir.mult(-this.acceleration);
        }
        if (DOWN) {
            this.acc = this.comp[0].dir.mult(this.acceleration);
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
        // this.acc = this.acc.unit().mult(this.acceleration);
        this.vel = this.vel.add(this.acc);
        this.vel = this.vel.mult(1 - mu);

        this.angVel *= angMu;
        this.comp[0].angle += this.angVel;

        this.comp[0].pos = this.comp[0].pos.add(this.vel);

        this.comp[0].getVertices();

        this.comp[1].pos = this.comp[0].pos;
        this.comp[1].angle += this.angVel;
        this.comp[1].getVertices();
    }
}

// collision manifold
class CollisionData {
    constructor(obj1, obj2, normal, penetrationDepth, contactPoint) {
        this.obj1 = obj1;
        this.obj2 = obj2;
        this.normal = normal;
        this.penetrationDepth = penetrationDepth;
        this.contactPoint = contactPoint;
    }
    penetrationRes() {
        let penetrationDepth = this.normal.mult(this.penetrationDepth / (this.obj1.inv_m + this.obj2.inv_m));
        this.obj1.comp[0].pos = this.obj1.comp[0].pos.add(penetrationDepth.mult(this.obj1.inv_m));
        this.obj2.comp[0].pos = this.obj2.comp[0].pos.add(penetrationDepth.mult(-this.obj2.inv_m));
    }
    collisionRes() {
        // 1. closing velocity

        let collisionArm1 = this.contactPoint.sub(this.obj1.comp[0].pos);
        let rotVel1 = new Vector(-this.obj1.angVel * collisionArm1.y, this.obj1.angVel * collisionArm1.x);
        let closeVel1 = this.obj1.vel.add(rotVel1);

        let collisionArm2 = this.contactPoint.sub(this.obj2.comp[0].pos);;
        let rotVel2 = new Vector(-this.obj2.angVel * collisionArm2.y, this.obj2.angVel * collisionArm2.x);
        let closeVel2 = this.obj2.vel.add(rotVel2);

        // 2. Impulse augmentation
        let impAug1 = Vector.cross(collisionArm1, this.normal);
        impAug1 = impAug1 * this.obj1.inv_inertia * impAug1;
        let impAug2 = Vector.cross(collisionArm2, this.normal);
        impAug2 = impAug2 * this.obj2.inv_inertia * impAug2;

        let relVel = closeVel1.sub(closeVel2);

        let sepVel = Vector.dot(relVel, this.normal);
        let newSepVel = -sepVel * Math.min(this.obj1.elasticity, this.obj2.elasticity);

        let velSep_diff = newSepVel - sepVel;
        let impulse = velSep_diff / (this.obj1.inv_m + this.obj2.inv_m + impAug1 + impAug2);
        let impulseVec = this.normal.mult(impulse);

        // 3. Updating the velocities
        this.obj1.vel = this.obj1.vel.add(impulseVec.mult(this.obj1.inv_m));
        this.obj2.vel = this.obj2.vel.add(impulseVec.mult(-this.obj2.inv_m));

        this.obj1.angVel += this.obj1.inv_inertia * Vector.cross(collisionArm1, impulseVec);
        this.obj2.angVel -= this.obj2.inv_inertia * Vector.cross(collisionArm2, impulseVec);
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
function randInt(a, b) {
    return Math.floor(Math.random() * (b - a + 1)) + a;
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
    // Wall5 = new Wall(100, 100, 300, 300);
}
function drawCircle(x, y, r, color) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 360 * Math.PI / 180);

    // stroke color
    ctx.strokeStyle = color;
    ctx.stroke();
}

// Separating Axis Theorem

// returns set of axes for SAT to check
function getAxes(obj1, obj2) {
    let axes1 = [];
    let axes2 = [];

    if ((obj1 instanceof Circle) && (obj2 instanceof Circle)) {
        axes1.push(obj2.pos.sub(obj1.pos).unit());
        return [axes1, axes2];
    }
    if (obj1 instanceof Circle) {
        axes1.push(closestVertexToPoint(obj2, obj1.pos).sub(obj1.pos).unit());
    }
    if (obj2 instanceof Circle) {
        axes2.push(closestVertexToPoint(obj1, obj2.pos).sub(obj2.pos).unit());
    }
    if (obj1 instanceof Line) {
        axes1.push(obj1.dir.normal());
    }
    if (obj2 instanceof Line) {
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
    if (obj1 instanceof Rectangle || obj1 instanceof Triangle) {
        util(obj1, axes1);
    }
    if (obj2 instanceof Rectangle || obj1 instanceof Triangle) {
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
            // ??
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
            // ??
            if (proj1.max < proj2.max) {
                smallestAxis = axes2[i].mult(-1);
            }
        }
    }

    let contactVertex = projectShapeOnAxis(smallestAxis, vertexObj).collisionVertex;
    // smallestAxis.drawVec(contactVertex.x, contactVertex.y, minOverlap, "blue");

    // ??
    if (vertexObj === obj2) {
        smallestAxis = smallestAxis.mult(-1);
    }

    return {
        minOverlap: minOverlap,
        smallestAxis: smallestAxis,
        contactVertex: contactVertex
    };
}

// projects any shape on an axis
// returns the starting and ending point of projection
function projectShapeOnAxis(axis, obj) {

    // if obj is Ball, set vertices
    if (obj instanceof Circle) {
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

// game loop
function mainLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    Collisions.length = 0;

    // https://developer.ibm.com/tutorials/wa-build2dphysicsengine/
    Bodies.forEach((b) => {
        b.draw();
        if (b.player) {
            b.keyControl();
        }
        // b.display();
        b.reposition();
    })
    Bodies.forEach((b, x) => {
        for (let y = x + 1; y < Bodies.length; y++) {

            // console.log(x, y, Bodies[x].inertia, Bodies[y].insertia);

            // testing Separating Axis Theorem
            let obj1 = Bodies[x];
            let obj2 = Bodies[y];
            let bestSAT = {
                minOverlap: null,
                smallestAxis: null,
                contactVertex: null,
            }
            for (let i = 0; i < obj1.comp.length; i++) {
                for (let j = 0; j < obj2.comp.length; j++) {
                    let temp = sat(obj1.comp[i], obj2.comp[j])
                    if (temp.minOverlap > bestSAT.minOverlap) {
                        bestSAT = temp;
                        ctx.fillText("Collision", 500, 400);
                    }
                }
            }

            if (bestSAT.minOverlap != null) {

                let contactVertex = bestSAT.contactVertex;
                drawCircle(contactVertex.x, contactVertex.y, 5, "black");

                let smallestAxis = bestSAT.smallestAxis;
                let minOverlap = bestSAT.minOverlap;
                smallestAxis.drawVec(contactVertex.x, contactVertex.y, minOverlap, "blue");

                Collisions.push(new CollisionData(Bodies[x], Bodies[y], smallestAxis, minOverlap, contactVertex))

                // let penetrationRes = smallestAxis.mult(minOverlap / (Bodies[x].inv_m + Bodies[y].inv_m));
                // Bodies[x].comp[0].pos = Bodies[x].comp[0].pos.add(penetrationRes.mult(Bodies[x].inv_m));
                // Bodies[y].comp[0].pos = Bodies[y].comp[0].pos.add(penetrationRes.mult(-Bodies[y].inv_m));

            }
        }

    })
    Collisions.forEach((collision) => {
        collision.penetrationRes();
        collision.collisionRes();
    })

    requestAnimationFrame(mainLoop);

}

createWalls();
let numBodies = 15;
for (let i = 0; i < numBodies; i++) {
    let x0 = randInt(50, 500 - 50);
    let y0 = randInt(50, 500 - 50);

    let x1 = x0 + randInt(-50, 50);
    let y1 = y0 + randInt(-50, 50);
    let r = randInt(15, 20);
    let m = randInt(0.1, 5);
    let e = Math.random(0.01, 1);
    if (i % 4 == 0) {
        let capsule = new Capsule(x0, y0, x1, y1, r, m, e);
    }
    if (i % 4 == 1) {
        let box = new Box(x0, y0, x1, y1, r, m, e);
    }
    if (i % 4 == 2) {
        let ball = new Ball(x0, y0, r, m, e);
    }
    if (i % 4 == 3) {
        let star = new Star(x0, y0, r, m, e);
    }
}

let playerBall = new Ball(320, 320, 10, 5, 1);
playerBall.player = true;

// SAT collision resolution
// might happen that resolution between 1 pair of components
// leads to collision between anyother pair. take care of that

requestAnimationFrame(mainLoop);