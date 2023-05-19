class Background {
    constructor() {
        this.sunY = windowHeight * 0.1;
    }

    show() {
        background(135, 206, 235);

        fill(255, 223, 0);
        noStroke();
        circle(width / 2, this.sunY, 100);

        fill(34, 139, 34);
        noStroke();
        rect(0, height * 0.8, width, height * 0.2);
    }

    update() {
        this.sunY += 0.01;

        if (this.sunY > height) {
            this.sunY = -100;
        }
    }
}