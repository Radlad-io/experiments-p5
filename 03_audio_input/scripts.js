console.clear();

let audio, amp;

function preload() {
  audio = loadSound("../assets/void_in_the_night_1.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  audio.setVolume(0.05);
  amp = new p5.Amplitude();
  textSize(32);
  textAlign(CENTER);
  textStyle(NORMAL);
  textFont("IBM Plex Mono");
}

function draw() {
  noStroke();
  background(255, 255, 255);
  const volume = amp.getLevel();
  const mapVolume = map(volume, 0, 0.05, 0, 1000);
  const mapColor = map(volume, 0, 0.05, 125, 0);

  fill(mapColor, mapColor, mapColor);
  translate(width / 2, height / 2);
  rect(0, 0, mapVolume, 500);

  push();
  fill(0, 0, 0);
  text(
    !audio.isPlaying() ? "Click to play" : "Click to pause",
    0,
    windowHeight / 2 - 100
  );
  pop();
}

function mouseClicked() {
  if (audio.isPlaying()) {
    audio.pause();
  } else {
    audio.play();
  }
  return;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
