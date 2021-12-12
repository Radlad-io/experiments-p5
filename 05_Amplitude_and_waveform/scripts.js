console.clear();

let audio, amp, fft, fft2;

const bins = 256;
let binWidth;
let peakDetect;
let bgColor = 255;

function preload() {
  audio = loadSound("../assets/void_in_the_night_1.mp3");
}

function setup() {
  const canvas = createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  textSize(32);
  textAlign(CENTER);
  textStyle(NORMAL);
  textFont("IBM Plex Mono");

  amp = new p5.Amplitude();
  fft = new p5.FFT(0, bins);
  fft2 = new p5.FFT(0, 64);

  // Freq low (20), freq high(14000), threshhold
  peakDetect = new p5.PeakDetect(1250, 2200, 0.285);
  peakDetect.onPeak(peakDetected);

  binWidth = width / bins;
  audio.setVolume(0.05);
}

function draw() {
  background(255);
  fill(bgColor);
  stroke(bgColor);

  translate(0, -height / 2);
  // Bars
  const spectrum = fft.analyze();

  peakDetect.update(fft);

  for (let i = 0; i < spectrum.length; i++) {
    const y = map(spectrum[i], 0, 255, height * 2, 0);
    rect(i * binWidth * 2, y, binWidth, height - y);
  }

  push();
  // fill(0);
  // noStroke();
  translate(0, height / 2);
  // const volume = amp.getLevel();
  // const rectSize = map(volume, 0, 0.5, 0, 200);
  // rect(0, 0, rectSize, rectSize);
  // const waveform = fft.waveform();
  // noFill();
  // strokeWeight(3);
  // stroke(255);
  const waveform = fft2.waveform();
  noFill();
  strokeWeight(3);
  stroke(0);

  for (let i = 0; i < waveform.length; i++) {
    const x = map(i, 0, waveform.length, 0, width);
    const y = map(waveform[i], -0.1, 0.1, 0, height);
    point(x, y);
  }
  pop();

  push();
  translate(0, height / 2);
  strokeWeight(0);
  fill(0, 0, 0);
  text(
    !audio.isPlaying() ? "Click to play" : "Click to pause",
    windowWidth / 2,
    windowHeight - 100
  );
  pop();
}

const peakDetected = () => {
  console.log("Peak Detected");
  bgColor = color(random(245), random(245), random(245));
};

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
  binWidth = width / bins;
}
