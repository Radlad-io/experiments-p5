console.clear();

function preload() {}

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  colorMode(HSL);
}

function draw() {
  noStroke();
  background(225, 225, 225);
  translate(width / 2, height / 2);
  rect(0, 0, 500, 500);
  push();
  fill(255, 0, 0);
  ellipse(0, 0, 50);
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
