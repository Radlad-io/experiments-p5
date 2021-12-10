console.clear();

let audio, amp;

function preload() {
  audio = loadSound("../assets/void_in_the_night_1.mp3");
}

function setup() {
  frameRate(10);
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
  background(255, 255, 255);
  translate(0, height / 2);
  const volume = amp.getLevel();
  const mapVolume = map(volume, 0, 0.05, 0, 150);
  const duration = audio.duration();
  const currentTime = audio.currentTime();
  const mapPlayhead = map(currentTime, 0, duration, 45, windowWidth);

  strokeWeight(1);
  stroke(mapVolume, mapVolume, mapVolume);
  const waveform = audio.getPeaks();

  push();
  strokeWeight(1);
  stroke(222, mapVolume, mapVolume);
  for (let i = 0; i < waveform.length; i++) {
    line(
      i + 15,
      waveform[i] * mapVolume * 4,
      i - 15,
      waveform[i] * -mapVolume * 4,
      -10,
      -10
    );
  }
  pop();

  for (let i = 0; i < waveform.length; i++) {
    line(i, waveform[i] * 125, i, waveform[i] * -125);
  }

  push();
  noStroke();
  fill(255, 255, 255);
  if (audio.isPlaying()) {
    ellipse(mapPlayhead, 0, 15, 15);
  }
  pop();

  push();
  strokeWeight(0);
  fill(0, 0, 0);
  text(
    !audio.isPlaying() ? "Click to play" : "Click to pause",
    windowWidth / 2,
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
