class Pipe {
    constructor() {
        this.spacing = windowHeight * 0.175;
        this.top = random(windowHeight / 6, 3 / 4 * windowHeight);
        this.bottom = windowHeight - (this.top + this.spacing);
        this.x = windowWidth;
        this.w = 50;

        this.hTop = this.top;
        this.hBottom = this.bottom;

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
        let boxAirplane = airplane.getBoundingBox();
        let boxPipeTop = this.getBoundingBoxTop();
        let boxPipeBottom = this.getBoundingBoxBottom();

        if (this.intersects(boxAirplane, boxPipeTop) || this.intersects(boxAirplane, boxPipeBottom)) {
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

    getBoundingBoxTop() {
        return { x: this.x, y: 0, w: this.w, h: this.hTop };
    }

    getBoundingBoxBottom() {
        return { x: this.x, y: height - this.hBottom, w: this.w, h: this.hBottom };
    }

    show() {
        fill(255);
        if (this.highlight) {
            fill(255, 0, 0);
        }
        rect(this.x, 0, this.w, this.top);
        rect(this.x, height - this.bottom, this.w, this.bottom);
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