var GRAVITY = 0.5;
var FLAP_FORCE = -7;
var BIRD_RADIUS = 15;

var OBSTACLE_GAP_SIZE = 50;
var OBSTACLE_WIDTH = 70;
var OBSTACLE_SPEED = 2;

var BACKGROUND_COLOR = [0,0,0];
var BIRD_COLOR = [255,255,255];
var OBSTACLE_COLOR = [255,255,255];

class Bird {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.radius = r;
    this.velocity = 0;
    this.active = true;
  }

  Update() {
    this.radius = BIRD_RADIUS;
    // Update bird velocity
    this.velocity += GRAVITY;
    // Update bird position
    this.y += this.velocity;

    if (this.y >= height) {
      this.y = height;
      this.Die();
    }
  }

  Draw() {
    fill(BIRD_COLOR);
    circle(this.x, this.y, this.radius);
  }

  Flap() {
    if (!this.active)
      return;

    this.velocity = FLAP_FORCE;
  }

  Die() {
    this.active = false;
  }
}

class Obstacle {
  constructor() {
    this.mid = 0;
    this.top = [0, 0, 0, 0]; // x,y,width,height
    this.bottom = [0, 0, 0, 0];
    this.x = width;
    this.active = true;
    this.passed = true;
  }

  RandomizePosition() {
    this.passed = false;
    this.x = width;
    this.mid = Math.random() * ((height - OBSTACLE_GAP_SIZE) - OBSTACLE_GAP_SIZE + 1) + OBSTACLE_GAP_SIZE;

    // Find top and bottom positions
    this.topHeight = this.mid - OBSTACLE_GAP_SIZE;
    this.bottomY = this.mid + OBSTACLE_GAP_SIZE;
    this.bottomHeight = height - this.bottomY;

    this.top = [this.x, 0, OBSTACLE_WIDTH, this.topHeight];
    this.bottom = [this.x, this.bottomY, OBSTACLE_WIDTH, this.bottomHeight];
  }

  Update() {
    if (!this.active)
      return;

    this.x -= OBSTACLE_SPEED;
    if (this.x <= -OBSTACLE_WIDTH)
      this.RandomizePosition();
  }

  Draw() {
    fill(OBSTACLE_COLOR);
    rect(this.x, this.top[1], this.top[2], this.top[3]);
    rect(this.x, this.bottom[1], this.bottom[2], this.bottom[3]);
  }

  DoesCollide(x, y, r) {
    return collideRectCircle(this.x, this.top[1], this.top[2], this.top[3], x, y, r) ||
      collideRectCircle(this.x, this.bottom[1], this.bottom[2], this.bottom[3], x, y, r);
  }
}

// Create BIRD
var bird;
// Create Obstacle
var obstacle;
var start = true;
let score = 0;

function setup() {
  start = true;
  score = 0;
  document.getElementById("score").innerHTML = score.toString();

  var canvas = createCanvas(300, 500);
  canvas.parent("canvas");
  bird = new Bird(width / 4, height / 2, BIRD_RADIUS);
  obstacle = new Obstacle();
}

function draw() {
  background(BACKGROUND_COLOR);
  textSize(width / 20);

  if (start) {
    fill(BIRD_COLOR);
    circle(bird.x, bird.y, BIRD_RADIUS);
    bird.y += Math.sin(millis() / 200);
  } else {
    bird.Update();
    bird.Draw();

    obstacle.Update();
    obstacle.Draw();

    if (obstacle.DoesCollide(bird.x, bird.y, bird.radius)) {
      bird.Die();
    }

    obstacle.active = bird.active;

    if (obstacle.x < bird.x && bird.active && !obstacle.passed) {
      obstacle.passed = true;
      score++;
      document.getElementById("score").innerHTML = score.toString();
    }

    fill(255, 255, 255);
    if (!bird.active)
      text("Press Enter to respawn", width/4, height / 2);
  }
}

function keyPressed() {
  switch (key) {
    case " ":
      if (start) {
        start = false;
      }

      bird.Flap();
      break;
    case "Enter":
      setup();
      break;
  }
}