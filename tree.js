class Tree {
    constructor() {
        this.x = random(windowWidth);
        this.y = windowHeight * 0.8;
        this.w = 50;
        this.h = random(50, 150);
        this.trunkWidth = this.w * 0.4;
        this.trunkHeight = this.h * 0.4;
        this.topWidth = this.w * 1.5;
        this.topHeight = this.h * 0.6;
    }

    show() {
        let trunkColor = color(139, 69, 19);
        let treeTopColor = color(34, 139, 34);

        let overlapCount = 0;
        for (let i = 0; i < trees.length; i++) {
            if (this !== trees[i] && this.overlaps(trees[i])) {
                let thisIndex = trees.indexOf(this);
                let otherIndex = trees.indexOf(trees[i]);
                if (thisIndex < otherIndex) {
                    overlapCount++;
                }
            }
        }

        if (overlapCount > 0) {
            trunkColor = lerpColor(trunkColor, color(0, 0, 0), 0.15 * overlapCount);
            treeTopColor = lerpColor(treeTopColor, color(0, 0, 0), 0.15 * overlapCount);
        }

        fill(trunkColor);
        noStroke();
        rect(this.x - this.trunkWidth / 2, this.y - this.trunkHeight, this.trunkWidth, this.trunkHeight);

        fill(treeTopColor);
        ellipse(this.x, this.y - this.h + this.topHeight / 2 + this.trunkHeight * 0.125, this.topHeight, this.topHeight);
    }

    overlaps(otherTree) {
        return abs(this.x - otherTree.x) < this.w;
    }

    update() {
        this.x -= 5;

        if (this.x < -this.w) {
            this.x = width + this.w;
            this.h = random(50, 150);
            this.trunkHeight = this.h * 0.4;
            this.topHeight = this.h * 0.6;
        }
    }
}