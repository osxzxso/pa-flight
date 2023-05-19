class Bird {
    constructor() {
        this.spacing = windowHeight * 0.175;
        this.top = random(windowHeight / 6, 3 / 4 * windowHeight);
        this.bottom = windowHeight - (this.top + this.spacing);
        this.x = windowWidth;
        this.w = 60;
        this.h = 30;

        this.hTop = this.top;
        this.hBottom = this.bottom;

        this.bodyColor = color(252, 169, 231);
        this.size = 20;
        this.weight = 50;

        this.highlight = false;
        this.passed = false;
        this.collided = false;
    }

    pass(airplane) {
        if (airplane.x > this.x && !this.passed && !this.collided) {
            this.passed = true;
            return true;
        }
        return false;
    }

    hits(airplane) {
        const airplanePoly = airplane.getCollisionPolygon();
        const birdPolyTop = this.getCollisionPolygonTop();
        const birdPolyBottom = this.getCollisionPolygonBottom();

        if (polygonsIntersect(airplanePoly, birdPolyTop) || polygonsIntersect(airplanePoly, birdPolyBottom)) {
            this.highlight = true;
            this.collided = true;
            return true;
        }

        this.highlight = false;
        return false;
    }

    intersects(box1, box2) {
        return !(box2.x > box1.x + box1.w ||
            box2.x + box2.w < box1.x ||
            box2.y > box1.y + box1.h ||
            box2.y + box2.h < box1.y);
    }

    getCollisionPolygonTop() {
        return [
            { x: this.x, y: 0 },
            { x: this.x + this.w, y: 0 },
            { x: this.x + this.w, y: this.hTop },
            { x: this.x, y: this.hTop },
        ];
    }

    getCollisionPolygonBottom() {
        return [
            { x: this.x, y: height - this.hBottom },
            { x: this.x + this.w, y: height - this.hBottom },
            { x: this.x + this.w, y: height },
            { x: this.x, y: height },
        ];
    }

    show() {

        if (this.highlight) {
            this.bodyColor = color(255, 0, 0);
        } else {
            this.bodyColor = color(252, 169, 231);
        }

        this.drawBird(this.x + this.w / 2, this.top - this.h / 2);

        this.drawBird(this.x + this.w / 2, height - this.bottom + this.h / 2);
    }

    drawBird(x, y) {
        push();
        translate(x, y);

        strokeWeight(20);
        stroke(0);
        line(0, 0, this.weight, random(-this.weight, this.weight));
        line(0, 0, -this.weight, random(-this.weight, this.weight));
        fill(this.bodyColor);

        strokeWeight(0);
        ellipse(0, 0, this.weight, this.weight);

        fill(0);
        ellipse(this.weight / 8, -4, this.weight - 40, this.weight - 35);
        ellipse(-this.weight / 8, -4, this.weight - 40, this.weight - 35);

        pop();
    }

    update() {
        this.x -= scrollSpeed;
    }

    offscreen() {
        if (this.x < -this.w) {
            return true;
        } else {
            return false;
        }
    }
}
