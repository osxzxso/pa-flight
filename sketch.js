let backgroundObj;
let clouds = [];
let trees = [];

let birds = [];

let scrollSpeed = 10;

let airplane;
let moveSpeed = 10;
let isUp = false;
let isDown = false;

let spaceBeenHit = 0;
let score = 0;
let arcadeFont;

function preload() {

  soundFormats("wav", "mp3");

  background_song = loadSound("assets/background.mp3");
  collision = loadSound("assets/collision.wav");
  pass_obstacle = loadSound("assets/pass.wav");
  lost_game = loadSound("assets/lost.wav");

  background_song.setVolume(0.5);
  collision.setVolume(0.1);
  pass_obstacle.setVolume(0.1);
  lost_game.setVolume(0.1);

  arcadeFont = loadFont('assets/arcadefont.ttf');
}

function setup() {

  createCanvas(windowWidth, windowHeight);
  airplane = new Airplane();
  backgroundObj = new Background();

  for (let i = 0; i < 5; i++) {
    clouds[i] = new Cloud();
  }

  for (let i = 0; i < 7; i++) {
    trees[i] = new Tree();
  }

  birds.push(new Bird());
  textFont(arcadeFont);

  gameStart();

}

function draw() {
  backgroundObj.show();
  backgroundObj.update();

  for (let i = 0; i < clouds.length; i++) {
    clouds[i].show();
    clouds[i].update();
  }

  for (let i = 0; i < trees.length; i++) {
    trees[i].show();
    trees[i].update();
  }

  drawScore();

  for (var i = birds.length - 1; i >= 0; i--) {
    birds[i].show();
    birds[i].update();

    if (birds[i].hits(airplane)) {
      score = 0;

    } else if (birds[i].pass(airplane)) {
      score++;
    }

    if (birds[i].offscreen()) {
      birds.splice(i, 1);
    }
  }

  airplane.show();
  airplane.update();

  if (frameCount % 100 == 0) {
    birds.push(new Bird());
  }
}

function drawScore() {
  fill(255, 0, 0);
  textAlign(LEFT);
  textSize(20);
  text('Score:' + score, 50, 50);

  if (spaceBeenHit == 0) {

    fill(0, 0, 0, 100);
    rect(0, 0, width, height);

    textAlign(CENTER);
    textSize(35);
    fill(255);
    text('PA Flight!', width / 2, height / 6);

    textAlign(CENTER);
    textSize(15);
    fill(255);
    text('Tilt airplane UP to fly up!', width / 2, height / 4);
    text('Tilt airplane DOWN to fly down!', width / 2, height / 3.4);
    text('Fly between birds to score points!', width / 2, height / 2.5);
    text('Press SPACE BAR to play/pause!', width / 2, height / 2.25);
    text('Press BACKSPACE to quit!', width / 2, height / 2.05);
  }

}

function gameStart() {
  if (spaceBeenHit % 2 == 1) {
    loop();
  } else {
    noLoop();
  }
}

function keyPressed() {

  if (key == " ") {
    spaceBeenHit++;
    gameStart();
  }

  if (keyCode == BACKSPACE) {
    window.location.reload();
  }

  if (keyCode == UP_ARROW) {
    isUp = true;
  }

  if (keyCode == DOWN_ARROW) {
    isDown = true;
  }
}

function keyReleased() {

  if (keyCode == UP_ARROW) {
    isUp = false;
    airplane.r = 0;
  }

  if (keyCode == DOWN_ARROW) {
    isDown = false;
    airplane.r = 0;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  backgroundObj = new Background();
  airplane = new Airplane();

  for (let i = 0; i < 5; i++) {
    clouds[i] = new Cloud();
  }

  for (let i = 0; i < 7; i++) {
    trees[i] = new Tree();
  }
}

function polygonsIntersect(poly1, poly2) {
  for (let i = 0; i < poly1.length; i++) {
    const a1 = poly1[i];
    const a2 = poly1[(i + 1) % poly1.length];
    const normal = { x: a2.y - a1.y, y: a1.x - a2.x };

    const [minA, maxA] = projectPolygon(normal, poly1);
    const [minB, maxB] = projectPolygon(normal, poly2);

    if (maxA < minB || maxB < minA) {
      return false;
    }
  }

  for (let i = 0; i < poly2.length; i++) {
    const a1 = poly2[i];
    const a2 = poly2[(i + 1) % poly2.length];
    const normal = { x: a2.y - a1.y, y: a1.x - a2.x };

    const [minA, maxA] = projectPolygon(normal, poly1);
    const [minB, maxB] = projectPolygon(normal, poly2);

    if (maxA < minB || maxB < minA) {
      return false;
    }
  }

  return true;
}

function projectPolygon(axis, polygon) {
  let min = dotProduct(axis, polygon[0]);
  let max = min;
  for (let i = 1; i < polygon.length; i++) {
    const p = dotProduct(axis, polygon[i]);
    if (p < min) {
      min = p;
    } else if (p > max) {
      max = p;
    }
  }
  return [min, max];
}

function dotProduct(a, b) {
  return a.x * b.x + a.y * b.y;
}