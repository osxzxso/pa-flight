class Airplane {
  constructor() {
    this.x = windowWidth * 0.3;
    this.y = windowHeight / 2;
    this.r = 0;

    this.w = 100;
    this.h = 70;
  }

  show() {
    fill(255, 255, 255);
    stroke(0);
    strokeWeight(1);
    translate(this.x, this.y);
    rotate(this.r);
    triangle(35, 10, 25, 20, 120, 70);
    triangle(25, 20, 25, 35, 120, 70);
    triangle(20, 60, 20, 70, 120, 70);
    triangle(20, 30, 0, 60, 120, 70);
  }

  update() {
    if (isUp) {
      this.y -= moveSpeed;
      this.r = 100;
    }

    if (isDown) {
      this.y += moveSpeed;
      this.r = -50;
    }

    if (this.x < 15) {
      this.x = 15;
    }

    if (this.x > windowWidth - 120) {
      this.x = windowWidth - 120;
    }

    if (this.y < 10) {
      this.y = 10;
    }

    if (this.y > height - 100) {
      this.y = height - 100;
    }
  }

  getCollisionPolygon() {
    const points = [
      { x: 35, y: 10 },
      { x: 25, y: 20 },
      { x: 120, y: 70 },
      { x: 20, y: 60 },
      { x: 20, y: 70 },
      { x: 20, y: 30 },
      { x: 0, y: 60 },
    ];

    return points.map((point) => {
      const x = point.x * cos(this.r) - point.y * sin(this.r) + this.x;
      const y = point.x * sin(this.r) + point.y * cos(this.r) + this.y;
      return { x, y };
    });
  }
}