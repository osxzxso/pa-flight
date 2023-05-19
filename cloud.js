class Cloud {
    constructor() {
        this.x = random(windowWidth);
        this.y = random(windowHeight * 0.1, windowHeight * 0.5);
    }

    show() {
        let cloudColor = color(255);

        let overlapCount = 0;
        for (let i = 0; i < clouds.length; i++) {
            if (this !== clouds[i] && this.overlaps(clouds[i])) {
                let thisIndex = clouds.indexOf(this);
                let otherIndex = clouds.indexOf(clouds[i]);
                if (thisIndex < otherIndex) {
                    overlapCount++;
                }
            }
        }

        if (overlapCount > 0) {
            cloudColor = lerpColor(cloudColor, color(220, 220, 220), 0.15 * overlapCount);
        }

        fill(cloudColor);
        noStroke();
        ellipse(this.x, this.y, 100, 70);
        ellipse(this.x - 30, this.y, 70, 50);
        ellipse(this.x + 30, this.y, 70, 50);
    }

    overlaps(otherCloud) {
        let d = dist(this.x, this.y, otherCloud.x, otherCloud.y);
        return d < 100;
    }

    update() {
        this.x -= 2;

        if (this.x < -50) {
            this.x = width + 50;
            this.y = random(height * 0.1, height * 0.5);
        }
    }
}